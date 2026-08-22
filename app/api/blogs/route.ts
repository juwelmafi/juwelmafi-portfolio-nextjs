import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import BlogModel from "@/models/Blog";
import { auth } from "@/auth";

// GET /api/blogs?published=true|false&slug=xxx
export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const slug      = searchParams.get("slug");
  const published = searchParams.get("published");

  try {
    await connectDB();

    // Fetch by slug
    if (slug) {
      const blog = await BlogModel.findOne({ slug }).lean();
      if (!blog) return NextResponse.json({ error: "Not found" }, { status: 404 });
      const result = { ...blog, id: (blog._id as unknown as { toString(): string }).toString(), _id: undefined, __v: undefined };
      return NextResponse.json(result);
    }

    // List — admin can see all, public sees only published
    const session = await auth();
    const filter =
      published === "false" && session
        ? {} // admin: all posts
        : { published: true }; // public: published only

    const blogs = await BlogModel.find(filter).sort({ createdAt: -1 }).lean();
    const result = blogs.map((b) => ({
      ...b,
      id: (b._id as unknown as { toString(): string }).toString(),
      _id: undefined,
      __v: undefined,
    }));
    return NextResponse.json(result);
  } catch (err) {
    console.error("[GET /api/blogs]", err);
    return NextResponse.json({ error: "Failed to fetch blogs" }, { status: 500 });
  }
}

// POST /api/blogs — admin only
export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    await connectDB();
    const body = await req.json();
    const blog = await BlogModel.create(body);
    const result = { ...blog.toObject(), id: blog._id.toString(), _id: undefined, __v: undefined };
    return NextResponse.json(result, { status: 201 });
  } catch (err) {
    console.error("[POST /api/blogs]", err);
    return NextResponse.json({ error: "Failed to create blog" }, { status: 500 });
  }
}
