import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import ServiceModel from "@/models/Service";
import { auth } from "@/auth";

interface RouteParams {
  params: Promise<{ id: string }>;
}

// GET /api/services/[id]
export async function GET(_req: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    await connectDB();
    const service = await ServiceModel.findById(id).lean();
    if (!service) return NextResponse.json({ error: "Service not found" }, { status: 404 });
    return NextResponse.json({
      ...service,
      id: (service._id as unknown as { toString(): string }).toString(),
      _id: undefined,
      __v: undefined,
    });
  } catch (err) {
    console.error("[GET /api/services/[id]]", err);
    return NextResponse.json({ error: "Failed to fetch service" }, { status: 500 });
  }
}

// PUT /api/services/[id] — admin only
export async function PUT(req: NextRequest, { params }: RouteParams) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { id } = await params;
    await connectDB();
    const body = await req.json();

    const updated = await ServiceModel.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    }).lean();

    if (!updated) return NextResponse.json({ error: "Service not found" }, { status: 404 });

    return NextResponse.json({
      ...updated,
      id: (updated._id as unknown as { toString(): string }).toString(),
      _id: undefined,
      __v: undefined,
    });
  } catch (err) {
    console.error("[PUT /api/services/[id]]", err);
    return NextResponse.json({ error: "Failed to update service" }, { status: 500 });
  }
}

// DELETE /api/services/[id] — admin only
export async function DELETE(_req: NextRequest, { params }: RouteParams) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { id } = await params;
    await connectDB();
    const deleted = await ServiceModel.findByIdAndDelete(id);
    if (!deleted) return NextResponse.json({ error: "Service not found" }, { status: 404 });
    return NextResponse.json({ success: true, message: "Service deleted successfully" });
  } catch (err) {
    console.error("[DELETE /api/services/[id]]", err);
    return NextResponse.json({ error: "Failed to delete service" }, { status: 500 });
  }
}
