import { connectDB } from "@/lib/mongodb";
import ProjectModel from "@/models/Project";
import BlogModel from "@/models/Blog";
import CourseModel from "@/models/Course";
import ServiceModel from "@/models/Service";
import { Project, Blog, Course, Service } from "@/types";
import fs from "fs";
import path from "path";

// Fallback projects loader from local json if DB is empty or unreachable
function getDefaultProjects(): Project[] {
  try {
    const jsonPath = path.join(process.cwd(), "public", "projects.json");
    if (fs.existsSync(jsonPath)) {
      const data = JSON.parse(fs.readFileSync(jsonPath, "utf-8"));
      return data.map((p: Record<string, unknown>, i: number) => ({
        id: String(p.id || i + 1),
        title: String(p.title || ""),
        desc: String(p.desc || ""),
        tech: Array.isArray(p.tech) ? p.tech : [],
        img: String(p.img || ""),
        screenshot: String(p.screenshot || ""),
        live: String(p.live || ""),
        client: String(p.client || ""),
        server: String(p.server || ""),
        details: String(p.details || ""),
        challenge: String(p.challenge || ""),
        goal: String(p.goal || ""),
        category: p.category ? String(p.category) : undefined,
        reverse: Boolean(p.reverse),
        order: i,
      }));
    }
  } catch (e) {
    console.warn("Failed to load fallback projects.json", e);
  }
  return [];
}

// Fallback starter courses with working technical YouTube tutorials
export const DEFAULT_COURSES: Course[] = [
  {
    id: "course-nextjs-fullstack",
    title: "Full-Stack Next.js 15 & MERN Masterclass",
    slug: "nextjs-fullstack-masterclass",
    description: "Learn modern full-stack web development from scratch with Next.js 15 App Router, React 19, MongoDB Atlas, and Tailwind CSS.",
    thumbnail: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80",
    category: "Next.js & MERN",
    level: "All Levels",
    badge: "Featured Masterclass",
    published: true,
    order: 0,
    lessons: [
      {
        id: "les-1",
        title: "01. Next.js 15 App Router Architecture & Server Components",
        youtubeUrl: "https://www.youtube.com/watch?v=wm5gMKuwSYk",
        youtubeId: "wm5gMKuwSYk",
        duration: "24:15",
        summary: "Comprehensive introduction to Next.js 15 App Router, Server vs Client components, and streaming architecture.",
        codeSnippet: `// Next.js 15 Server Component Example
export default async function Page() {
  const data = await fetch('https://api.example.com/data');
  const items = await data.json();
  return <ItemsList items={items} />;
}`,
        order: 0,
      },
      {
        id: "les-2",
        title: "02. MongoDB Atlas & Mongoose Connection Pooling in Serverless",
        youtubeUrl: "https://www.youtube.com/watch?v=b8ZUb_OkxH0",
        youtubeId: "b8ZUb_OkxH0",
        duration: "19:40",
        summary: "How to properly manage global Mongoose connection caching in Next.js to prevent connection spikes.",
        codeSnippet: `import mongoose from "mongoose";
let cached = (global as any).mongoose || { conn: null, promise: null };`,
        order: 1,
      },
      {
        id: "les-3",
        title: "03. Building Secure Authentication with NextAuth.js v5",
        youtubeUrl: "https://www.youtube.com/watch?v=1MTyCvS05V4",
        youtubeId: "1MTyCvS05V4",
        duration: "31:10",
        summary: "Step-by-step setup of Credentials provider, JWT session tokens, and route protection middleware.",
        codeSnippet: `import NextAuth from "next-auth";
export const { handlers, auth, signIn, signOut } = NextAuth({ ... });`,
        order: 2,
      },
      {
        id: "les-4",
        title: "04. Tailwind CSS v4 & Glassmorphism Design Systems",
        youtubeUrl: "https://www.youtube.com/watch?v=sOnBC5i0g2w",
        youtubeId: "sOnBC5i0g2w",
        duration: "22:50",
        summary: "Creating high-converting modern UIs with responsive grids, cyber-glow accents, and subtle animations.",
        order: 3,
      },
    ],
  },
  {
    id: "course-react-fundamentals",
    title: "Modern React 19 & Component Architecture",
    slug: "modern-react-architecture",
    description: "Deep dive into React 19 hooks, component composition, state management, and real-world frontend performance.",
    thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=1200&q=80",
    category: "Frontend Development",
    level: "Intermediate",
    badge: "Popular",
    published: true,
    order: 1,
    lessons: [
      {
        id: "les-201",
        title: "01. Mastering React 19 State & Action Hooks",
        youtubeUrl: "https://www.youtube.com/watch?v=bMknfKXIFA8",
        youtubeId: "bMknfKXIFA8",
        duration: "18:20",
        summary: "Exploring useActionState, useOptimistic, and modern form handling without third-party libraries.",
        order: 0,
      },
      {
        id: "les-202",
        title: "02. Building Reusable UI Design Systems",
        youtubeUrl: "https://www.youtube.com/watch?v=SqcY0GlETPk",
        youtubeId: "SqcY0GlETPk",
        duration: "26:45",
        summary: "Patterns for highly modular, accessible, and scalable UI components.",
        order: 1,
      },
    ],
  },
];

export async function getProjects(): Promise<Project[]> {
  try {
    await connectDB();
    const docs = await ProjectModel.find().sort({ order: 1 }).lean();
    if (docs && docs.length > 0) {
      return docs.map((p) => ({
        ...p,
        id: (p._id as unknown as { toString(): string }).toString(),
        _id: undefined,
        __v: undefined,
        createdAt: p.createdAt ? new Date(p.createdAt).toISOString() : undefined,
      })) as unknown as Project[];
    }
  } catch (err) {
    console.warn("MongoDB getProjects unavailable, using fallback:", err);
  }
  return getDefaultProjects();
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
    console.warn("Error fetching blogs from MongoDB:", err);
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
    console.warn("Error fetching blog by slug:", err);
    return null;
  }
}

export async function getCourses(publishedOnly = true): Promise<Course[]> {
  try {
    await connectDB();
    const filter = publishedOnly ? { published: true } : {};
    const docs = await CourseModel.find(filter).sort({ order: 1, createdAt: -1 }).lean();
    if (docs && docs.length > 0) {
      return docs.map((c) => ({
        ...c,
        id: (c._id as unknown as { toString(): string }).toString(),
        _id: undefined,
        __v: undefined,
        createdAt: c.createdAt ? new Date(c.createdAt).toISOString() : undefined,
        updatedAt: c.updatedAt ? new Date(c.updatedAt).toISOString() : undefined,
      })) as unknown as Course[];
    }
  } catch (err) {
    console.warn("Error fetching courses from MongoDB:", err);
  }
  return DEFAULT_COURSES;
}

export async function getCourseBySlug(slug: string): Promise<Course | null> {
  try {
    await connectDB();
    const doc = await CourseModel.findOne({ slug }).lean();
    if (doc) {
      return {
        ...doc,
        id: (doc._id as unknown as { toString(): string }).toString(),
        _id: undefined,
        __v: undefined,
        createdAt: doc.createdAt ? new Date(doc.createdAt).toISOString() : undefined,
        updatedAt: doc.updatedAt ? new Date(doc.updatedAt).toISOString() : undefined,
      } as unknown as Course;
    }
  } catch (err) {
    console.warn("Error fetching course by slug:", err);
  }
  return DEFAULT_COURSES.find((c) => c.slug === slug) || null;
}

export const DEFAULT_SERVICES: Service[] = [
  {
    id: "service-1",
    title: "Full-Stack Web Development",
    desc: "I build end-to-end scalable web applications using modern MERN and Next.js architectures with clean code, secure authentication, and performant databases.",
    tags: ["Next.js & React", "Node.js & Express", "MongoDB Integration", "REST & GraphQL APIs"],
    img1: "/assets/images/section/service-1.jpg",
    img2: "/assets/images/section/service-2.jpg",
    features: [
      "Custom Full-Stack Web Applications",
      "Server-Side Rendering (SSR) & Static Site Generation (SSG)",
      "Role-Based Authentication & Authorization (NextAuth / JWT)",
      "Database Schema Design & Query Optimization",
      "Secure REST & GraphQL API Integration",
    ],
    order: 0,
    published: true,
  },
  {
    id: "service-2",
    title: "Frontend Engineering & UI/UX Design",
    desc: "Crafting fluid, high-converting interfaces that delight users. Every pixel is optimized for accessibility, cross-browser compatibility, and lightning-fast load times.",
    tags: ["Responsive Layouts", "TailwindCSS", "Framer Motion", "Performance Tuning"],
    img1: "/assets/images/section/service-3.jpg",
    img2: "/assets/images/section/service-4.jpg",
    features: [
      "Pixel-Perfect Responsive UI/UX Systems",
      "Liquid Glass & Modern Cyber-Dark Aesthetics",
      "Micro-Animations, Smooth Scroll & Transitions",
      "Core Web Vitals & Lighthouse 95+ Performance",
      "WCAG Accessibility Compliance",
    ],
    order: 1,
    published: true,
  },
  {
    id: "service-3",
    title: "Database Architecture & Cloud Deployment",
    desc: "From database schema design to serverless API routes and cloud deployments, I deliver secure and reliable web infrastructure tailored to your business needs.",
    tags: ["MongoDB Schema Design", "NextAuth & JWT", "Vercel Hosting", "API Optimization"],
    img1: "/assets/images/section/service-5.jpg",
    img2: "/assets/images/section/service-6.jpg",
    features: [
      "MongoDB Atlas Cluster Configuration & Indexing",
      "Serverless Deployment & CI/CD Pipelines on Vercel",
      "Stripe & Payment Gateway Integration",
      "Environment Security & Data Encryption",
      "24/7 Monitoring & Load Resilience",
    ],
    order: 2,
    published: true,
  },
];

export async function getServices(publishedOnly = true): Promise<Service[]> {
  try {
    await connectDB();
    const filter = publishedOnly ? { published: true } : {};
    const docs = await ServiceModel.find(filter).sort({ order: 1, createdAt: -1 }).lean();
    if (docs && docs.length > 0) {
      return docs.map((s) => ({
        ...s,
        id: (s._id as unknown as { toString(): string }).toString(),
        _id: undefined,
        __v: undefined,
        createdAt: s.createdAt ? new Date(s.createdAt).toISOString() : undefined,
        updatedAt: s.updatedAt ? new Date(s.updatedAt).toISOString() : undefined,
      })) as unknown as Service[];
    }
  } catch (err) {
    console.warn("Error fetching services from MongoDB, using fallback:", err);
  }
  return DEFAULT_SERVICES;
}

export async function getServiceById(id: string): Promise<Service | null> {
  try {
    await connectDB();
    const doc = await ServiceModel.findById(id).lean();
    if (doc) {
      return {
        ...doc,
        id: (doc._id as unknown as { toString(): string }).toString(),
        _id: undefined,
        __v: undefined,
      } as unknown as Service;
    }
  } catch (err) {
    console.warn("Error fetching service by id:", err);
  }
  return DEFAULT_SERVICES.find((s) => s.id === id) || null;
}
