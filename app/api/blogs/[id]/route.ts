import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import BlogModel from "@/models/Blog";
import { auth } from "@/auth";
import mongoose from "mongoose";

interface Params { params: Promise<{ id: string }> }

function toPlain(doc: mongoose.Document & { _id?: unknown; __v?: unknown }) {
  const obj = doc.toObject();
  obj.id = obj._id?.toString();
  delete obj._id;
  delete obj.__v;
  return obj;
}

// GET /api/blogs/[id]
export async function GET(_: NextRequest, { params }: Params) {
  const { id } = await params;
  try {
    await connectDB();
    const blog = await BlogModel.findById(id);
    if (!blog) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(toPlain(blog));
  } catch (err) {
    console.error("[GET /api/blogs/[id]]", err);
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}

// PUT /api/blogs/[id] — admin only
export async function PUT(req: NextRequest, { params }: Params) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  try {
    await connectDB();
    const body = await req.json();
    const blog = await BlogModel.findByIdAndUpdate(id, body, { new: true });
    if (!blog) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(toPlain(blog));
  } catch (err) {
    console.error("[PUT /api/blogs/[id]]", err);
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}

// DELETE /api/blogs/[id] — admin only
export async function DELETE(_: NextRequest, { params }: Params) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  try {
    await connectDB();
    await BlogModel.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[DELETE /api/blogs/[id]]", err);
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}
