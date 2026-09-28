import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import CourseModel, { ILesson } from "@/models/Course";
import { auth } from "@/auth";
import { extractYouTubeId } from "@/lib/youtube";

// GET /api/courses — returns courses ordered by `order`
export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const all = searchParams.get("all") === "true";

    const filter = all ? {} : { published: true };
    const courses = await CourseModel.find(filter).sort({ order: 1, createdAt: -1 }).lean();

    const result = courses.map((c) => ({
      ...c,
      id: (c._id as unknown as { toString(): string }).toString(),
      _id: undefined,
      __v: undefined,
    }));
    return NextResponse.json(result);
  } catch (err) {
    console.error("[GET /api/courses]", err);
    return NextResponse.json({ error: "Failed to fetch courses" }, { status: 500 });
  }
}

// POST /api/courses — admin only
export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

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

    if (!body.slug && body.title) {
      body.slug = body.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
    }

    const course = await CourseModel.create(body);
    return NextResponse.json(
      { id: course._id.toString(), ...course.toObject(), _id: undefined },
      { status: 201 }
    );
  } catch (err) {
    console.error("[POST /api/courses]", err);
    return NextResponse.json({ error: "Failed to create course" }, { status: 500 });
  }
}
