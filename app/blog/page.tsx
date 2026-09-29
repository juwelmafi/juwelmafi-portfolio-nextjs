"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Footer from "@/components/layout/Footer";
import { FaCalendar, FaTag } from "react-icons/fa";

const CATEGORIES = ["All", "Tech", "Skill", "Personal Brand", "Self-Development", "Other"];

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  tags: string[];
  category: string;
  coverImage: string;
  published: boolean;
  createdAt?: string;
}

export default function BlogPage() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState<Record<string, string>>({});

  useEffect(() => {
    fetch("/api/blogs")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) setBlogs(data);
      })
      .catch(console.error)
      .finally(() => setLoading(false));

    fetch("/api/site-content")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) {
          const map: Record<string, string> = {};
          data.forEach((d) => {
            if (d && d.key && typeof d.value === "string") {
              map[d.key] = d.value;
            }
          });
          setContent(map);
        }
      })
      .catch(() => {});
  }, []);

  const headerTitle = content["blog.headerTitle"] || "Blog & Knowledge Base";
  const headerDesc =
    content["blog.headerDesc"] ||
    "Thoughts on web development, the MERN stack, Next.js architecture, and the journey of continuous engineering.";

  const filtered =
    activeCategory === "All"
      ? blogs
      : blogs.filter((b) => b.category === activeCategory);

  return (
    <>
      <main
        className="min-h-screen py-12 md:py-16 px-4 sm:px-6 md:px-10 lg:pl-16 lg:pr-28"
        style={{ background: "var(--bg-base)" }}
      >
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-10">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider mb-6 transition-colors hover:text-white"
              style={{ color: "var(--accent)" }}
            >
              ← Back to Portfolio
            </Link>
            <div>
              <span className="section-label">Articles &amp; Writing</span>
              <h1 className="heading-font text-3xl sm:text-4xl md:text-5xl font-bold text-white mt-3 mb-3">
                {headerTitle}
              </h1>
              <p
                className="text-sm sm:text-base max-w-2xl leading-relaxed"
                style={{ color: "var(--text-muted)" }}
              >
                {headerDesc}
              </p>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2 mb-10">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="text-xs sm:text-sm px-4 py-2 rounded-full border-none font-medium transition-all duration-200"
                style={{
                  background:
                    activeCategory === cat
                      ? "var(--accent)"
                      : "rgba(255,255,255,0.06)",
                  color: activeCategory === cat ? "#0A0A14" : "var(--text-muted)",
                  backdropFilter: "blur(8px)",
                  boxShadow:
                    activeCategory === cat
                      ? "0 4px 16px rgba(0,222,81,0.3)"
                      : "none",
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="flex justify-center py-24">
              <div className="w-10 h-10 border-2 border-[#00DE51] border-t-transparent rounded-full animate-spin" />
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-24 glass-card rounded-3xl p-12">
              <h2 className="heading-font text-xl font-semibold text-white mb-2">
                No posts in this category yet
              </h2>
              <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                Check back soon — articles are coming!
              </p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="group glass-card rounded-2xl overflow-hidden flex flex-col no-underline transition-all duration-300 hover:scale-[1.02]"
                >
                  {post.coverImage && (
                    <div className="relative h-48 overflow-hidden rounded-t-2xl">
                      <Image
                        src={post.coverImage}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  )}
                  <div className="p-6 flex flex-col gap-3.5 flex-1">
                    <div className="flex flex-wrap gap-1.5">
                      {post.category && (
                        <span
                          className="text-xs px-2.5 py-1 rounded-full font-semibold"
                          style={{
                            background: "var(--accent-glow)",
                            color: "var(--accent)",
                          }}
                        >
                          {post.category}
                        </span>
                      )}
                      {post.tags?.slice(0, 2).map((tag: string) => (
                        <span
                          key={tag}
                          className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-full font-medium"
                          style={{
                            background: "rgba(255,255,255,0.05)",
                            color: "var(--text-subtle)",
                          }}
                        >
                          <FaTag className="text-[8px]" /> {tag}
                        </span>
                      ))}
                    </div>
                    <h2 className="heading-font text-base font-bold text-white group-hover:text-[var(--accent)] transition-colors line-clamp-2">
                      {post.title}
                    </h2>
                    <p
                      className="text-xs leading-relaxed flex-1 line-clamp-3"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {post.excerpt}
                    </p>
                    <div
                      className="flex items-center gap-2 text-xs mt-auto pt-4 border-t border-white/10"
                      style={{ color: "var(--text-subtle)" }}
                    >
                      <FaCalendar className="text-[10px]" />
                      {post.createdAt
                        ? new Date(post.createdAt).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })
                        : "Draft"}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer content={content} />
    </>
  );
}
