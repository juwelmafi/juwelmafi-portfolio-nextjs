import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import ServiceModel from "@/models/Service";
import { auth } from "@/auth";

// GET /api/services — public or all if ?all=true
export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const all = searchParams.get("all") === "true";

    const filter = all ? {} : { published: true };
    const services = await ServiceModel.find(filter).sort({ order: 1, createdAt: -1 }).lean();

    const result = services.map((s) => ({
      ...s,
      id: (s._id as unknown as { toString(): string }).toString(),
      _id: undefined,
      __v: undefined,
    }));
    return NextResponse.json(result);
  } catch (err) {
    console.error("[GET /api/services]", err);
    return NextResponse.json({ error: "Failed to fetch services" }, { status: 500 });
  }
}

// POST /api/services — admin only
export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    await connectDB();
    const body = await req.json();

    const service = await ServiceModel.create(body);
    return NextResponse.json(
      { id: service._id.toString(), ...service.toObject(), _id: undefined },
      { status: 201 }
    );
  } catch (err) {
    console.error("[POST /api/services]", err);
    return NextResponse.json({ error: "Failed to create service" }, { status: 500 });
  }
}
