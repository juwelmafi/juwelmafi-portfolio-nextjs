import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { getBlogs } from "@/lib/data";
import { FaArrowLeft, FaCalendar, FaTag } from "react-icons/fa";

export const metadata: Metadata = {
  title: "Blog — Juwel Hossain",
  description: "Articles and thoughts on web development, MERN stack, and self-growth.",
};

export const revalidate = 60;

export default async function BlogPage() {
  const blogs = await getBlogs(true);

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24" style={{ background: "var(--bg-base)" }}>
        {/* Hero */}
        <div
          className="relative py-20 text-center"
          style={{ background: "var(--bg-elevated)", borderBottom: "1px solid var(--border)" }}
        >
          <span className="section-label">Writing</span>
          <h1 className="heading-font text-5xl font-bold text-white mt-3 mb-3">Blog</h1>
          <p className="text-base max-w-lg mx-auto px-6" style={{ color: "var(--text-muted)" }}>
            Thoughts on web development, the MERN stack, and the journey of self-learning.
          </p>
        </div>

        <div className="max-w-5xl mx-auto px-6 lg:px-10 py-16">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm mb-10 transition-colors"
            style={{ color: "var(--text-muted)" }}
          >
            <FaArrowLeft className="text-xs" /> Back to Portfolio
          </Link>

          {blogs.length === 0 ? (
            <div className="text-center py-24">
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
                  className="group glass-card overflow-hidden flex flex-col no-underline"
                >
                  {post.coverImage && (
                    <div className="relative h-44 overflow-hidden">
                      <Image
                        src={post.coverImage}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  )}
                  <div className="p-5 flex flex-col gap-3 flex-1">
                    <div className="flex flex-wrap gap-1.5">
                      {post.tags?.slice(0, 3).map((tag: string) => (
                        <span
                          key={tag}
                          className="flex items-center gap-1 text-xs px-2 py-0.5 rounded-full"
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
                    <h2 className="heading-font text-sm font-semibold text-white group-hover:text-[var(--accent)] transition-colors line-clamp-2">
                      {post.title}
                    </h2>
                    <p className="text-xs leading-relaxed flex-1 line-clamp-3" style={{ color: "var(--text-muted)" }}>
                      {post.excerpt}
                    </p>
                    <div className="flex items-center gap-1.5 text-xs mt-auto pt-3" style={{ borderTop: "1px solid var(--border)", color: "var(--text-subtle)" }}>
                      <FaCalendar className="text-[9px]" />
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
