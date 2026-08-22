"use client";
import Link from "next/link";
import Image from "next/image";
import { FaArrowRight, FaCalendar, FaTag } from "react-icons/fa";
import { Blog } from "@/types";

interface BlogPreviewProps {
  blogs: Blog[];
}

export default function BlogPreview({ blogs }: BlogPreviewProps) {
  if (blogs.length === 0) return null;

  return (
    <section
      id="blog"
      className="relative py-24 lg:py-32"
      style={{ background: "var(--bg-elevated)" }}
    >
      {/* Accent top line */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, var(--border-accent), transparent)" }}
      />

      <div className="max-w-6xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
          <div>
            <span className="section-label">Blog</span>
            <h2 className="heading-font text-4xl lg:text-5xl font-bold text-white mt-2">
              Latest Articles
            </h2>
            <div className="section-divider mt-4" />
          </div>
          <Link
            href="/blog"
            className="btn-accent-outline self-start sm:self-auto whitespace-nowrap"
          >
            View All Posts <FaArrowRight />
          </Link>
        </div>

        {/* Blog Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="group glass-card overflow-hidden flex flex-col no-underline"
            >
              {/* Cover Image */}
              {post.coverImage && (
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div
                    className="absolute inset-0"
                    style={{ background: "linear-gradient(to bottom, transparent 60%, var(--bg-card))" }}
                  />
                </div>
              )}

              <div className="p-6 flex flex-col gap-3 flex-1">
                {/* Tags */}
                {post.tags?.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {post.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="flex items-center gap-1 text-xs px-2 py-0.5 rounded-full"
                        style={{
                          background: "var(--accent-glow)",
                          color: "var(--accent)",
                          border: "1px solid var(--border-accent)",
                        }}
                      >
                        <FaTag className="text-[9px]" />
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Title */}
                <h3
                  className="heading-font text-base font-semibold leading-snug text-white group-hover:text-[var(--accent)] transition-colors duration-200 line-clamp-2"
                >
                  {post.title}
                </h3>

                {/* Excerpt */}
                <p className="text-xs leading-relaxed flex-1 line-clamp-3" style={{ color: "var(--text-muted)" }}>
                  {post.excerpt}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between mt-auto pt-3" style={{ borderTop: "1px solid var(--border)" }}>
                  {post.createdAt && (
                    <span className="flex items-center gap-1.5 text-xs" style={{ color: "var(--text-subtle)" }}>
                      <FaCalendar className="text-[10px]" />
                      {new Date(post.createdAt as string).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  )}
                  <span
                    className="flex items-center gap-1 text-xs font-medium transition-all duration-200 group-hover:gap-2"
                    style={{ color: "var(--accent)" }}
                  >
                    Read <FaArrowRight className="text-[10px]" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
