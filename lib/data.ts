import { connectDB } from "@/lib/mongodb";
import ProjectModel from "@/models/Project";
import BlogModel from "@/models/Blog";
import CourseModel from "@/models/Course";
import ServiceModel from "@/models/Service";
import SiteContentModel from "@/models/SiteContent";
import SeoMetaModel from "@/models/SeoMeta";
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

export const DEFAULT_SITE_CONTENT: Record<string, string> = {
  // Hero
  "hero.eyebrow": "FULL-STACK ENGINEER & SHOPIFY DEVELOPER",
  "hero.name": "Juwel Hossain",
  "hero.headline": "Engineering High-Impact Web Applications & Scalable Platforms.",
  "hero.tagline": "I build scalable full-stack web applications, custom Shopify stores, and modern digital platforms. Specialized in React, Next.js, Node.js, and MongoDB with clean architecture and pixel-perfect design.",
  "hero.cta": "Explore My Work →",
  "hero.ctaSecondary": "Start a Project",
  "hero.subtext": "Available for freelance projects, full-stack contracts, and remote engineering roles.",
  "hero.subtextLink": "View selected production cases and live deployments.",
  "hero.check1": "FAST PERFORMANCE",
  "hero.check2": "CLEAN ARCHITECTURE",
  "hero.check3": "MODERN TECH STACK",
  "hero.check4": "ON-TIME DELIVERY",
  "hero.stickerRound": "100%",
  "hero.stickerOval": "PRODUCTION READY",
  "hero.avatar": "/assets/images/avatar/juwel_retro.png",
  "hero.certIssuer": "JUWELMAFI.DEV",
  "hero.certSerial": "JH-ENG-001",
  "hero.certTitle": "Verified Engineer Dossier",
  "hero.certSubtitle": "Full-Stack Web & E-Commerce Developer",
  "hero.certStatus": "STATUS: AVAILABLE",
  "hero.certIssued": "01 OCT 2026",
  "hero.certExpires": "INDEFINITE",
  "hero.certStatement": "Proven expertise in end-to-end full-stack architectures, custom Shopify solutions, responsive frontends, and database optimization.",
  "hero.certStamp": "VERIFIED ENGINEER",
  "hero.certMrz": "SWE<MERN000001<JUWEL<HOSSAIN<<<<<<<<<<<<<<<<<<\nSTATUS<ACTIVE<20261001<NEXTJS<REACT<NODE<MONGO<<<<",

  // The Stack / Technical Skills
  "stack.eyebrow": "TECHNICAL EXPERTISE",
  "stack.title": "Introducing The Stack.",
  "stack.desc": "Designed without bloat. Engineered for production. Scalable architectures powering modern full-stack web applications and custom e-commerce platforms.",
  "stack.boxTitle": "What's in my toolkit?",
  "stack.boxDesc": "MERN Stack, Next.js 15, React 19, Shopify Themes, WordPress, TypeScript, Node.js, MongoDB Atlas. Scalable, clean, and tested for production.",
  "stack.sticker": "certified clean",
  "stack.specTitle": "TECHNICAL SPECIFICATION",
  "stack.skillMern": "MongoDB, Express, React & Node.js",
  "stack.skillNextjs": "Next.js 15, App Router, React 19 & SSR",
  "stack.skillShopify": "Custom Theme Dev, Liquid & Store Customization",
  "stack.skillWordpress": "Custom Themes, WooCommerce & Headless CMS",
  "stack.skillLanguages": "TypeScript (Strict), JavaScript ES6+, HTML5/CSS3",
  "stack.skillBackend": "Node.js, Express API, MongoDB Atlas & REST/GraphQL",
  "stack.skillTools": "TailwindCSS, Git, Vercel, Docker & Cloudinary",
  "stack.skillQuality": "Clean Architecture & Zero Bloat",

  // Projects & Works
  "projects.eyebrow": "01 / THE WORK",
  "projects.headerTitle": "Featured Projects & Deployments",
  "projects.headerDesc": "Real-world full-stack web applications, custom platforms, and production systems built with Next.js, React, Node.js, and MongoDB.",

  // Services & Solutions
  "services.eyebrow": "SERVICES & SOLUTIONS",
  "services.title": "Handcrafted Engineering Services.",
  "services.desc": "Choose the exact service your project needs. Every solution is engineered from scratch with clean architecture, zero bloat, and full production care.",
  "services.bottomNote": "Need a custom project or have a unique requirement? Send an inquiry through the contact form and I will review your specifications within 24 hours.",

  // Education & Ledger
  "education.eyebrow": "02 / CREDENTIALS & ACADEMIA",
  "education.title": "Academic Ledger & Formal Study",
  "education.desc": "Verified university degrees and foundational academic milestones powering real-world engineering problem solving.",
  "education.rec1.institution": "Sonargaon University",
  "education.rec1.qualification": "B.Sc in Computer Science and Engineering (CSE)",
  "education.rec1.period": "2026 - Present · CURRENTLY ENROLLED",
  "education.rec1.description": "Deepening academic foundations in algorithmic complexity, distributed systems, software engineering patterns, database internal structures, and full-stack web platforms.",
  "education.rec1.courses": "Data Structures & Algorithms, Database Management Systems, Object Oriented Programming, Software Engineering Architecture, Computer Networks",
  "education.rec2.institution": "Government Barhamgonj College, Shibchar",
  "education.rec2.qualification": "Higher Secondary Certificate (HSC) — Science",
  "education.rec2.period": "2020 - 2022 · COMPLETED",
  "education.rec2.description": "Graduated with a strong STEM background focusing on advanced mathematics, physics, and introductory computer science fundamentals.",
  "education.rec2.courses": "Higher Mathematics, Physics, Information & Communication Technology",

  // Explore CTA
  "explore.ticketNumber": "TICKET #EXP-2026",
  "explore.heading": "Want to explore more?",
  "explore.desc": "Read comprehensive technical breakdowns, study MERN stack architectures, watch full YouTube masterclasses, and browse continuous learning guides.",
  "explore.btnText": "Explore More (Blogs & Courses) →",
  "explore.stickyNote": "“No gatekeeping. Every tutorial, course, and essay is open for everyone to learn.”",

  // Contact Page & Form
  "contact.eyebrow": "DISPATCH #001 · REACH OUT",
  "contact.title": "Transmit a message.",
  "contact.desc": "Tell me about your product requirements, team needs, or questions. I read every message and respond promptly with actionable insights.",
  "contact.cardEyebrow": "COMMUNICATION DOSSIER",
  "contact.cardTitle": "Let's talk software.",
  "contact.cardDesc": "Have a project in mind, need consultation on modern full-stack architectures, or looking to collaborate? Drop me a message below.",
  "contact.email": "juwelhossain16457@gmail.com",
  "contact.location": "Dhaka, Bangladesh · Global Remote",
  "contact.availability": "Available for Freelance & Engineering",
  "contact.formTitle": "Transmit a Message",
  "contact.guaranteeText": "0% SPAM GUARANTEE",

  // Header Nav
  "header.work": "Work",
  "header.stack": "The Stack",
  "header.services": "Services",
  "header.education": "Education",
  "header.explore": "Writing & Courses",
  "header.cta": "Let's talk",

  // About Me
  "about.tag": "About Me",
  "about.title": "Full-Stack & Shopify Engineer crafting scalable web platforms with clean architecture",
  "about.bio": "I’m a full-stack engineer based in Bangladesh specializing in MERN stack, Next.js, and custom Shopify development. I enjoy building interactive, accessible, and high-converting web applications with clean architecture and pixel-perfect design.",
  "about.location": "Dhaka, Bangladesh · Global Remote",
  "about.email": "juwelmafi@gmail.com",
  "about.phone": "+880 1859-797307",

  // Social Links
  "social.youtube": "https://www.youtube.com/@juwelmafi",
  "social.linkedin": "https://www.linkedin.com/in/juwelmafi",
  "social.github": "https://github.com/juwelmafi",
  "social.twitter": "https://x.com/juwelmafi",
  "social.facebook": "https://facebook.com/juwelmafi",

  // Site Settings
  "site.logo": "/assets/images/logo/favicon.svg",
  "site.logoText": "jh.",
  "site.favicon": "/assets/images/logo/favicon.svg",
  "site.resumeUrl": "https://drive.google.com/file/d/1NyyfiNHplq8Dy3rrW8qe_1fTP97MqJfE/view?usp=sharing",
  "site.footerTitle": "JUWEL HOSSAIN",
  "site.footerTagline": "Full-Stack Engineer & Shopify Developer",
  "site.footerDesc": "Full-stack engineer specializing in MERN stack, Next.js, and high-performance Shopify e-commerce platforms.",
  "site.footerLedgerLine": "================ OFFICIAL DISPATCH & SUMMARY ================",
  "site.footerSerial": "JH-PORTFOLIO-2026",
  "site.copyright": "© 2026 Juwel Hossain. All rights reserved.",
};

export async function getSiteContentMap(): Promise<Record<string, string>> {
  try {
    await connectDB();
    const docs = await SiteContentModel.find().lean();
    const result: Record<string, string> = { ...DEFAULT_SITE_CONTENT };
    if (Array.isArray(docs)) {
      docs.forEach((d: { key?: string; value?: string }) => {
        if (d && d.key && typeof d.value === "string" && d.value.trim() !== "") {
          result[d.key] = d.value;
        }
      });
    }
    return result;
  } catch (err) {
    console.warn("Error fetching site content from MongoDB:", err);
    return { ...DEFAULT_SITE_CONTENT };
  }
}

export async function getPageSeo(pageKey: string) {
  try {
    await connectDB();
    const doc = await SeoMetaModel.findOne({ pageKey }).lean();
    if (doc) {
      return {
        metaTitle: doc.metaTitle || undefined,
        metaDescription: doc.metaDescription || undefined,
        ogTitle: doc.ogTitle || undefined,
        ogDescription: doc.ogDescription || undefined,
        ogImage: doc.ogImage || undefined,
        twitterTitle: doc.twitterTitle || undefined,
        twitterDescription: doc.twitterDescription || undefined,
        canonicalUrl: doc.canonicalUrl || undefined,
      };
    }
  } catch (err) {
    console.warn(`Error fetching SEO for ${pageKey}:`, err);
  }
  return null;
}

