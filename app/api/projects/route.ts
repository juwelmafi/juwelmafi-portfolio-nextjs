import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import ProjectModel from "@/models/Project";
import { auth } from "@/auth";

// GET /api/projects — public, returns all projects ordered by `order`
export async function GET() {
  try {
    await connectDB();
    const projects = await ProjectModel.find().sort({ order: 1 }).lean();
    const result = projects.map((p) => ({
      ...p,
      id: (p._id as unknown as { toString(): string }).toString(),
      _id: undefined,
      __v: undefined,
    }));
    return NextResponse.json(result);
  } catch (err) {
    console.error("[GET /api/projects]", err);
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 });
  }
}

// POST /api/projects — admin only
export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    await connectDB();
    const body = await req.json();
    const project = await ProjectModel.create(body);
    return NextResponse.json(
      { id: project._id.toString(), ...project.toObject(), _id: undefined },
      { status: 201 }
    );
  } catch (err) {
    console.error("[POST /api/projects]", err);
    return NextResponse.json({ error: "Failed to create project" }, { status: 500 });
  }
}
