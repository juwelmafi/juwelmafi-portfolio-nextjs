import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Footer from "@/components/layout/Footer";
import { getBlogs } from "@/lib/data";
import { FaCalendar, FaTag } from "react-icons/fa";

export const metadata: Metadata = {
  title: "Blog — Juwel Hossain",
  description: "Articles and thoughts on web development, MERN stack, and self-growth.",
};

export const revalidate = 60;

export default async function BlogPage() {
  const blogs = await getBlogs(true);

  return (
    <>
      <main className="min-h-screen py-12 md:py-16 px-4 sm:px-6 md:px-10 lg:pl-16 lg:pr-28" style={{ background: "var(--bg-base)" }}>
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
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
                Blog &amp; Knowledge Base
              </h1>
              <p className="text-sm sm:text-base max-w-2xl leading-relaxed" style={{ color: "var(--text-muted)" }}>
                Thoughts on web development, the MERN stack, Next.js architecture, and the journey of continuous engineering.
              </p>
            </div>
          </div>

          {blogs.length === 0 ? (
            <div className="text-center py-24 glass-card rounded-3xl p-12">
              <p className="text-5xl mb-4">✍️</p>
              <h2 className="heading-font text-xl font-semibold text-white mb-2">No posts yet</h2>
              <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                Check back soon — articles are coming!
              </p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogs.map((post) => (
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
                      {post.tags?.slice(0, 3).map((tag: string) => (
                        <span
                          key={tag}
                          className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-full font-medium"
                          style={{
                            background: "var(--accent-glow)",
                            color: "var(--accent)",
                            border: "1px solid var(--border-accent)",
                          }}
                        >
                          <FaTag className="text-[8px]" /> {tag}
                        </span>
                      ))}
                    </div>
                    <h2 className="heading-font text-base font-bold text-white group-hover:text-[var(--accent)] transition-colors line-clamp-2">
                      {post.title}
                    </h2>
                    <p className="text-xs leading-relaxed flex-1 line-clamp-3" style={{ color: "var(--text-muted)" }}>
                      {post.excerpt}
                    </p>
                    <div className="flex items-center gap-2 text-xs mt-auto pt-4 border-t border-white/10" style={{ color: "var(--text-subtle)" }}>
                      <FaCalendar className="text-[10px]" />
                      {post.createdAt
                        ? new Date(post.createdAt as string).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
                        : "Draft"}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
