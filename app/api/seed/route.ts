import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import ProjectModel from "@/models/Project";
import BlogModel from "@/models/Blog";
import { auth } from "@/auth";
import fs from "fs";
import path from "path";

export async function POST() {
  const session = await auth();
  if (!session && process.env.NODE_ENV === "production") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectDB();

    // Check if projects already exist
    const count = await ProjectModel.countDocuments();
    if (count > 0) {
      return NextResponse.json({ message: "Projects already seeded", count });
    }

    const jsonPath = path.join(process.cwd(), "public", "projects.json");
    if (!fs.existsSync(jsonPath)) {
      return NextResponse.json({ error: "projects.json not found" }, { status: 404 });
    }

    const rawData = fs.readFileSync(jsonPath, "utf-8");
    const projects = JSON.parse(rawData);

    // Insert projects
    const toInsert = projects.map((p: Record<string, unknown>, i: number) => ({
      title: p.title || "",
      desc: p.desc || "",
      tech: p.tech || [],
      img: p.img || "",
      screenshot: p.screenshot || "",
      live: p.live || "",
      client: p.client || "",
      server: p.server === "#" ? "" : p.server || "",
      details: p.details || "",
      challenge: p.challenge || "",
      goal: p.goal || "",
      reverse: Boolean(p.reverse),
      order: i,
    }));

    await ProjectModel.insertMany(toInsert);

    // Optional starter blog
    const blogCount = await BlogModel.countDocuments();
    if (blogCount === 0) {
      await BlogModel.create({
        title: "Welcome to My Modern Portfolio & Blog",
        slug: "welcome-to-my-modern-portfolio",
        excerpt: "A look into how I built my personal brand portfolio using Next.js 15, MongoDB, and modern web design aesthetics.",
        content: `# Welcome to my portfolio!

I'm **Juwel Hossain**, a passionate MERN Stack & Next.js Developer from Bangladesh.

## Why I Built This
Personal branding is crucial for modern developers. This portfolio showcases my best works, real-world full-stack applications, and architectural decisions.

## Tech Stack
- **Next.js 15** with App Router & Server Components
- **MongoDB Atlas** with Mongoose
- **NextAuth.js v5** for secure administrative control
- **Tailwind CSS** with a custom dark-mode aesthetic

Stay tuned for more articles on web development, React performance, and my self-learning journey!`,
        tags: ["Next.js", "MongoDB", "Web Dev", "Career"],
        coverImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80",
        published: true,
      });
    }

    return NextResponse.json({
      success: true,
      message: `Successfully seeded ${toInsert.length} projects and starter blog post`,
    });
  } catch (err) {
    console.error("[POST /api/seed]", err);
    return NextResponse.json({ error: "Failed to seed database" }, { status: 500 });
  }
}
