import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { getBlogBySlug, getBlogs } from "@/lib/data";
import { notFound } from "next/navigation";
import { FaArrowLeft, FaCalendar, FaTag } from "react-icons/fa";

interface Props {
  params: Promise<{ slug: string }>;
}

export const revalidate = 60;

export async function generateStaticParams() {
  try {
    const blogs = await getBlogs(true);
    return blogs.map((b) => ({ slug: b.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const blog = await getBlogBySlug(slug);
    if (!blog) return { title: "Post Not Found" };
    return {
      title: `${blog.title} — Juwel Hossain`,
      description: blog.excerpt,
    };
  } catch {
    return { title: "Blog Post" };
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog) notFound();

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24" style={{ background: "var(--bg-base)" }}>
        {/* Cover */}
        {blog.coverImage && (
          <div className="relative w-full h-72 lg:h-96">
            <Image src={blog.coverImage} alt={blog.title} fill className="object-cover" />
            <div
              className="absolute inset-0"
              style={{ background: "linear-gradient(to bottom, rgba(10,10,20,0.3), var(--bg-base))" }}
            />
          </div>
        )}

        <div className="max-w-3xl mx-auto px-6 lg:px-10 py-12">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm mb-8 transition-colors"
            style={{ color: "var(--text-muted)" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-primary)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
          >
            <FaArrowLeft className="text-xs" /> All Posts
          </Link>

          {/* Tags */}
          {blog.tags?.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {blog.tags.map((tag) => (
                <span
                  key={tag}
                  className="flex items-center gap-1 text-xs px-2 py-1 rounded-full"
                  style={{ background: "var(--accent-glow)", color: "var(--accent)", border: "1px solid var(--border-accent)" }}
                >
                  <FaTag className="text-[9px]" /> {tag}
                </span>
              ))}
            </div>
          )}

          {/* Title */}
          <h1 className="heading-font text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight">
            {blog.title}
          </h1>

          {/* Meta */}
          <div className="flex items-center gap-3 mb-10 pb-8" style={{ borderBottom: "1px solid var(--border)" }}>
            <div className="flex items-center gap-1.5 text-sm" style={{ color: "var(--text-subtle)" }}>
              <FaCalendar className="text-xs" />
              {blog.createdAt
                ? new Date(blog.createdAt as string).toLocaleDateString("en-US", {
                    weekday: "long", month: "long", day: "numeric", year: "numeric",
                  })
                : "Published"}
            </div>
          </div>

          {/* Content */}
          <article className="prose-dark">
            {blog.content.split("\n").map((line, i) => {
              if (line.startsWith("## ")) return <h2 key={i}>{line.slice(3)}</h2>;
              if (line.startsWith("# "))  return <h1 key={i}>{line.slice(2)}</h1>;
              if (line.startsWith("### ")) return <h3 key={i}>{line.slice(4)}</h3>;
              if (line === "") return <br key={i} />;
              return <p key={i}>{line}</p>;
            })}
          </article>

          {/* Author card */}
          <div
            className="mt-16 p-6 rounded-2xl flex items-center gap-5"
            style={{ background: "var(--bg-elevated)", border: "1px solid var(--border)" }}
          >
            <div
              className="w-14 h-14 rounded-full overflow-hidden flex-shrink-0"
              style={{ border: "2px solid var(--border-accent)" }}
            >
              <Image
                src="https://i.ibb.co/xKd3jY5K/20250629-181542.png"
                alt="Juwel Hossain"
                width={56}
                height={56}
                className="object-cover w-full h-full"
              />
            </div>
            <div>
              <p className="heading-font font-semibold text-white text-sm">Juwel Hossain</p>
              <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
                MERN Stack Developer · Content Creator
              </p>
            </div>
            <Link href="/#contact" className="ml-auto btn-accent-outline text-xs px-4 py-2">
              Contact
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
