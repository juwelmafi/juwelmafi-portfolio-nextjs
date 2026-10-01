import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import ProjectModel from "@/models/Project";
import { auth } from "@/auth";

// GET /api/projects — public, returns all projects ordered by `order`
export async function GET() {
  try {
    await connectDB();
    const projects = await ProjectModel.find().sort({ order: 1 }).lean();
    const result = projects.map((p) => {
      // Auto-derive category if somehow missing
      let category = p.category;
      if (!category || category === "undefined") {
        const techList = Array.isArray(p.tech) ? p.tech.map((t: string) => t.toLowerCase()) : [];
        if (techList.includes("shopify")) category = "Shopify";
        else if (techList.includes("wordpress") || techList.includes("woocommerce")) category = "WordPress";
        else if (techList.includes("landing page") || techList.includes("landing")) category = "Landing Page";
        else if (techList.includes("figma") || techList.includes("ui/ux design") || techList.includes("designs")) category = "Designs";
        else category = "MERN";
      }

      return {
        ...p,
        id: (p._id as unknown as { toString(): string }).toString(),
        category,
        _id: undefined,
        __v: undefined,
      };
    });
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

    const project = await ProjectModel.create(body);

    // Guaranteed direct collection update in case Mongoose model was cached
    await ProjectModel.collection.updateOne(
      { _id: project._id },
      { $set: { category } }
    );

    const doc = project.toObject();
    return NextResponse.json(
      { id: project._id.toString(), ...doc, category, _id: undefined },
      { status: 201 }
    );
  } catch (err) {
    console.error("[POST /api/projects]", err);
    return NextResponse.json({ error: "Failed to create project" }, { status: 500 });
  }
}
