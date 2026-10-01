import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import SiteContentModel from "@/models/SiteContent";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

// GET /api/site-content — returns all content as { key: value } map
export async function GET() {
  try {
    await connectDB();
    const docs = await SiteContentModel.find().sort({ group: 1, key: 1 }).lean();
    return NextResponse.json(docs.map((d) => ({
      ...d,
      id: (d._id as unknown as { toString(): string }).toString(),
      _id: undefined,
      __v: undefined,
    })));
  } catch (err) {
    console.error("[GET /api/site-content]", err);
    return NextResponse.json({ error: "Failed to fetch site content" }, { status: 500 });
  }
}

// POST /api/site-content — upsert a content item (admin only)
export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    await connectDB();
    const body = await req.json();
    const { key, label, value, type, group } = body;
    if (!key) return NextResponse.json({ error: "key is required" }, { status: 400 });

    const doc = await SiteContentModel.findOneAndUpdate(
      { key },
      { key, label, value, type, group },
      { upsert: true, new: true }
    );
    revalidatePath("/");
    revalidatePath("/contact");
    revalidatePath("/explore");
    revalidatePath("/admin/contents");

    return NextResponse.json({
      ...doc.toObject(),
      id: doc._id.toString(),
      _id: undefined,
      __v: undefined,
    });
  } catch (err) {
    console.error("[POST /api/site-content]", err);
    return NextResponse.json({ error: "Failed to save content" }, { status: 500 });
  }
}

// PUT /api/site-content — bulk update array of content items (admin only)
export async function PUT(req: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    await connectDB();
    const items: Array<{ key: string; value: string; label?: string; type?: string; group?: string }> = await req.json();
    const ops = items.map((item) => ({
      updateOne: {
        filter: { key: item.key },
        update: {
          $set: {
            value: item.value,
            ...(item.label ? { label: item.label } : {}),
            ...(item.type ? { type: item.type } : {}),
            ...(item.group ? { group: item.group } : {}),
          },
        },
        upsert: true,
      },
    }));
    await SiteContentModel.bulkWrite(ops);

    revalidatePath("/");
    revalidatePath("/contact");
    revalidatePath("/explore");
    revalidatePath("/admin/contents");

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[PUT /api/site-content]", err);
    return NextResponse.json({ error: "Failed to update content" }, { status: 500 });
  }
}
