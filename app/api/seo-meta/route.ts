import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import SeoMetaModel from "@/models/SeoMeta";
import { auth } from "@/auth";

// GET /api/seo-meta — returns all page SEO entries
export async function GET() {
  try {
    await connectDB();
    const docs = await SeoMetaModel.find().sort({ pageKey: 1 }).lean();
    return NextResponse.json(docs.map((d) => ({
      ...d,
      id: (d._id as unknown as { toString(): string }).toString(),
      _id: undefined,
      __v: undefined,
    })));
  } catch (err) {
    console.error("[GET /api/seo-meta]", err);
    return NextResponse.json({ error: "Failed to fetch SEO meta" }, { status: 500 });
  }
}

// PUT /api/seo-meta — upsert a page's SEO data (admin only)
export async function PUT(req: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    await connectDB();
    const body = await req.json();
    const { pageKey, ...rest } = body;
    if (!pageKey) return NextResponse.json({ error: "pageKey required" }, { status: 400 });

    const doc = await SeoMetaModel.findOneAndUpdate(
      { pageKey },
      { pageKey, ...rest },
      { upsert: true, new: true }
    );
    return NextResponse.json({
      ...doc.toObject(),
      id: doc._id.toString(),
      _id: undefined,
      __v: undefined,
    });
  } catch (err) {
    console.error("[PUT /api/seo-meta]", err);
    return NextResponse.json({ error: "Failed to save SEO meta" }, { status: 500 });
  }
}
