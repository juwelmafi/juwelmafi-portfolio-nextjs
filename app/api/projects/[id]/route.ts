import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import ProjectModel from "@/models/Project";
import { auth } from "@/auth";
import mongoose from "mongoose";

interface Params { params: Promise<{ id: string }> }

function toPlain(doc: mongoose.Document & { _id?: unknown; __v?: unknown; category?: string; tech?: string[] }) {
  const obj = doc.toObject();
  obj.id = obj._id?.toString();

  // Ensure category is always returned
  if (!obj.category || obj.category === "undefined") {
    const techList = Array.isArray(obj.tech) ? obj.tech.map((t: string) => t.toLowerCase()) : [];
    if (techList.includes("shopify")) obj.category = "Shopify";
    else if (techList.includes("wordpress") || techList.includes("woocommerce")) obj.category = "WordPress";
    else if (techList.includes("landing page") || techList.includes("landing")) obj.category = "Landing Page";
    else if (techList.includes("figma") || techList.includes("ui/ux design") || techList.includes("designs")) obj.category = "Designs";
    else obj.category = "MERN";
  }

  delete obj._id;
  delete obj.__v;
  return obj;
}

// GET /api/projects/[id]
export async function GET(_: NextRequest, { params }: Params) {
  const { id } = await params;
  try {
    await connectDB();
    const project = await ProjectModel.findById(id);
    if (!project) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(toPlain(project));
  } catch (err) {
    console.error("[GET /api/projects/[id]]", err);
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}

// PUT /api/projects/[id] — admin only
export async function PUT(req: NextRequest, { params }: Params) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  try {
    await connectDB();
    const body = await req.json();

    // Auto-derive or sanitize category:
    let category = (body.category || "").trim();
    if (!category || category === "undefined") {
      const techList = Array.isArray(body.tech) ? body.tech.map((t: string) => t.toLowerCase()) : [];
      if (techList.includes("shopify")) category = "Shopify";
      else if (techList.includes("wordpress") || techList.includes("woocommerce")) category = "WordPress";
      else if (techList.includes("landing page") || techList.includes("landing")) category = "Landing Page";
      else if (techList.includes("figma") || techList.includes("ui/ux design") || techList.includes("designs")) category = "Designs";
      else category = "MERN";
    }
    body.category = category;

    const project = await ProjectModel.findByIdAndUpdate(id, body, { new: true, strict: false });
    if (!project) return NextResponse.json({ error: "Not found" }, { status: 404 });

    // Explicitly update collection directly to bypass any schema caching
    if (mongoose.Types.ObjectId.isValid(id)) {
      await ProjectModel.collection.updateOne(
        { _id: new mongoose.Types.ObjectId(id) },
        { $set: { category, ...body } }
      );
    }

    project.category = category;
    return NextResponse.json(toPlain(project));
  } catch (err) {
    console.error("[PUT /api/projects/[id]]", err);
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}

// DELETE /api/projects/[id] — admin only
export async function DELETE(_: NextRequest, { params }: Params) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  try {
    await connectDB();
    await ProjectModel.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[DELETE /api/projects/[id]]", err);
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}
