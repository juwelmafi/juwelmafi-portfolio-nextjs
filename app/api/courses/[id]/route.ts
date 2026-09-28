import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import CourseModel, { ILesson } from "@/models/Course";
import { auth } from "@/auth";
import { extractYouTubeId } from "@/lib/youtube";
import type { Document } from "mongoose";

interface Params {
  params: Promise<{ id: string }>;
}

function toPlain(doc: Document & { _id?: unknown; __v?: unknown }) {
  const obj = doc.toObject();
  obj.id = obj._id?.toString();
  delete obj._id;
  delete obj.__v;
  return obj;
}

// GET /api/courses/[id]
export async function GET(_: NextRequest, { params }: Params) {
  const { id } = await params;
  try {
    await connectDB();
    const course = await CourseModel.findById(id);
    if (!course) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(toPlain(course));
  } catch (err) {
    console.error("[GET /api/courses/[id]]", err);
    return NextResponse.json({ error: "Failed to fetch course" }, { status: 500 });
  }
}

// PUT /api/courses/[id] — admin only
export async function PUT(req: NextRequest, { params }: Params) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  try {
    await connectDB();
    const body = await req.json();

    if (Array.isArray(body.lessons)) {
      body.lessons = body.lessons.map((lesson: ILesson, idx: number) => ({
        ...lesson,
        youtubeId: extractYouTubeId(lesson.youtubeUrl),
        order: typeof lesson.order === "number" ? lesson.order : idx,
      }));
    }

    const course = await CourseModel.findByIdAndUpdate(id, body, { new: true });
    if (!course) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(toPlain(course));
  } catch (err) {
    console.error("[PUT /api/courses/[id]]", err);
    return NextResponse.json({ error: "Failed to update course" }, { status: 500 });
  }
}

// DELETE /api/courses/[id] — admin only
export async function DELETE(_: NextRequest, { params }: Params) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  try {
    await connectDB();
    await CourseModel.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[DELETE /api/courses/[id]]", err);
    return NextResponse.json({ error: "Failed to delete course" }, { status: 500 });
  }
}
