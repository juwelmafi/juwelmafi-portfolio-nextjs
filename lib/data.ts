import { connectDB } from "@/lib/mongodb";
import ProjectModel from "@/models/Project";
import BlogModel from "@/models/Blog";
import { Project, Blog } from "@/types";

export async function getProjects(): Promise<Project[]> {
  try {
    await connectDB();
    const docs = await ProjectModel.find().sort({ order: 1 }).lean();
    return docs.map((p) => ({
      ...p,
      id: (p._id as unknown as { toString(): string }).toString(),
      _id: undefined,
      __v: undefined,
      createdAt: p.createdAt ? new Date(p.createdAt).toISOString() : undefined,
    })) as unknown as Project[];
  } catch (err) {
    console.error("Error fetching projects:", err);
    return [];
  }
}

export async function getBlogs(publishedOnly = true): Promise<Blog[]> {
  try {
    await connectDB();
    const filter = publishedOnly ? { published: true } : {};
    const docs = await BlogModel.find(filter).sort({ createdAt: -1 }).lean();
    return docs.map((b) => ({
      ...b,
      id: (b._id as unknown as { toString(): string }).toString(),
      _id: undefined,
      __v: undefined,
      createdAt: b.createdAt ? new Date(b.createdAt).toISOString() : undefined,
      updatedAt: b.updatedAt ? new Date(b.updatedAt).toISOString() : undefined,
    })) as unknown as Blog[];
  } catch (err) {
    console.error("Error fetching blogs:", err);
    return [];
  }
}

export async function getBlogBySlug(slug: string): Promise<Blog | null> {
  try {
    await connectDB();
    const doc = await BlogModel.findOne({ slug }).lean();
    if (!doc) return null;
    return {
      ...doc,
      id: (doc._id as unknown as { toString(): string }).toString(),
      _id: undefined,
      __v: undefined,
      createdAt: doc.createdAt ? new Date(doc.createdAt).toISOString() : undefined,
      updatedAt: doc.updatedAt ? new Date(doc.updatedAt).toISOString() : undefined,
    } as unknown as Blog;
  } catch (err) {
    console.error("Error fetching blog by slug:", err);
    return null;
  }
}
