import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

// Initialize Cloudinary with either CLOUDINARY_URL or individual variables
function getCloudinaryConfig() {
  if (process.env.CLOUDINARY_URL) {
    cloudinary.config({ secure: true });
    return {
      configured: true,
      cloudName: cloudinary.config().cloud_name || null,
    };
  }

  const isConfigured = Boolean(
    process.env.CLOUDINARY_CLOUD_NAME &&
    process.env.CLOUDINARY_API_KEY &&
    process.env.CLOUDINARY_API_SECRET
  );

  if (isConfigured) {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
      secure: true,
    });
  }

  return {
    configured: isConfigured,
    cloudName: process.env.CLOUDINARY_CLOUD_NAME || null,
  };
}

/**
 * GET /api/upload
 * Returns whether Cloudinary is configured
 */
export async function GET() {
  const { configured, cloudName } = getCloudinaryConfig();

  return NextResponse.json({
    configured,
    cloudName: cloudName ? `${cloudName.slice(0, 3)}***` : null,
  });
}

/**
 * POST /api/upload
 * Accepts multipart/form-data with a "file" field, uploads to Cloudinary,
 * and returns { url, public_id }
 */
export async function POST(req: NextRequest) {
  try {
    const { configured } = getCloudinaryConfig();

    if (!configured) {
      return NextResponse.json(
        {
          error: "Cloudinary credentials not configured yet. Please add CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET (or CLOUDINARY_URL) to your .env.local file.",
          notConfigured: true,
        },
        { status: 503 }
      );
    }

    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided in form data" }, { status: 400 });
    }

    // Validate mime type
    if (!file.type.startsWith("image/")) {
      return NextResponse.json(
        { error: "Only image files (JPG, PNG, WebP, GIF, SVG) are allowed" },
        { status: 400 }
      );
    }

    // Convert file to buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload to Cloudinary via upload_stream
    const folder = process.env.CLOUDINARY_FOLDER || "portfolio";

    const uploadResult = await new Promise<{ secure_url: string; public_id: string }>(
      (resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder,
            resource_type: "auto",
          },
          (err, result) => {
            if (err || !result) {
              reject(err || new Error("Cloudinary upload failed"));
            } else {
              resolve({
                secure_url: result.secure_url,
                public_id: result.public_id,
              });
            }
          }
        );
        stream.end(buffer);
      }
    );

    return NextResponse.json({
      success: true,
      url: uploadResult.secure_url,
      publicId: uploadResult.public_id,
    });
  } catch (error: any) {
    console.error("[API Upload Error]:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to upload image" },
      { status: 500 }
    );
  }
}
