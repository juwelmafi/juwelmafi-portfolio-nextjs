import Link from "next/link";
import Image from "next/image";
import { getBlogs } from "@/lib/data";
import { Blog } from "@/types";
import { FaNewspaper } from "react-icons/fa";

export default async function BlogsSection() {
  let blogs: Blog[] = [];
  try {
    blogs = await getBlogs(true);
  } catch {
    blogs = [];
  }

  if (blogs.length === 0) return null;

  const featured = blogs[0];
  const rest     = blogs.slice(1, 4);

  return (
    <div id="blogs" className="flat-spacing">
      {/* Section Header */}
      <div className="sect-tag text-caption fw-medium effectFade fadeUp no-div">
        <i className="icon icon-high-light"></i>Latest Articles
      </div>
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
        <h4 className="s-title letter-space--2 text-white split-text effect-blur-fade font-bold text-2xl md:text-3xl">
          Blog & Insights
        </h4>
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-xs font-semibold px-5 py-2.5 rounded-xl transition-all hover:scale-105 shrink-0"
          style={{
            background: "rgba(0, 222, 81, 0.12)",
            color: "var(--accent)",
            border: "1px solid rgba(0, 222, 81, 0.3)",
          }}
        >
          View All Posts →
        </Link>
      </div>

      <div className="flex flex-col gap-5">
        {/* Featured Post — full-width horizontal card */}
        <Link href={`/blog/${featured.slug}`} className="group block no-underline">
          <div className="water-drop-card overflow-hidden transition-all duration-300 hover:scale-[1.01]" style={{ padding: 0 }}>
            {/* Cover image at top */}
            {featured.coverImage && (
              <div className="relative h-48 w-full overflow-hidden rounded-t-[28px]">
                <Image
                  src={featured.coverImage}
                  alt={featured.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                {/* Featured badge on image */}
                <div className="absolute top-4 left-4">
                  <span
                    className="text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-widest"
                    style={{ background: "var(--accent)", color: "#000" }}
                  >
                    Featured
                  </span>
                </div>
              </div>
            )}

            <div className="p-6">
              {/* Tags */}
              {featured.tags?.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {featured.tags.slice(0, 3).map((tag: string) => (
                    <span
                      key={tag}
                      className="text-[10px] px-2.5 py-0.5 rounded-full font-medium"
                      style={{
                        background: "rgba(0,222,81,0.1)",
                        color: "var(--accent)",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              <h3 className="text-white font-bold text-lg leading-snug group-hover:text-[var(--accent)] transition-colors mb-2">
                {featured.title}
              </h3>
              <p className="text-sm leading-relaxed line-clamp-2" style={{ color: "var(--text-muted)" }}>
                {featured.excerpt}
              </p>

              <div
                className="flex items-center justify-between mt-5 pt-4"
                style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
              >
                <span className="text-xs" style={{ color: "var(--text-subtle)" }}>
                  {featured.createdAt
                    ? new Date(featured.createdAt as string).toLocaleDateString("en-US", {
                        month: "long", day: "numeric", year: "numeric",
                      })
                    : ""}
                </span>
                <span className="text-xs font-semibold" style={{ color: "var(--accent)" }}>
                  Read Article →
                </span>
              </div>
            </div>
          </div>
        </Link>

        {/* Remaining posts — compact horizontal list (same pattern as courses) */}
        {rest.map((post) => (
          <Link key={post.id} href={`/blog/${post.slug}`} className="group block no-underline">
            <div
              className="water-drop-card flex gap-4 items-start overflow-hidden transition-all duration-300 hover:scale-[1.01]"
              style={{ padding: "1.25rem 1.5rem" }}
            >
              {/* Thumbnail */}
              <div
                className="relative shrink-0 rounded-xl overflow-hidden"
                style={{ width: "72px", height: "72px", minWidth: "72px" }}
              >
                {post.coverImage ? (
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                ) : (
                  <div
                    className="w-full h-full flex items-center justify-center"
                    style={{ background: "linear-gradient(135deg, #0A0A14, #1A1A2E)" }}
                  >
                    <FaNewspaper className="text-2xl text-[#00DE51]/50" />
                  </div>
                )}
              </div>

              {/* Text */}
              <div className="flex-1 min-w-0">
                {post.tags?.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-1.5">
                    {post.tags.slice(0, 2).map((tag: string) => (
                      <span
                        key={tag}
                        className="text-[10px] px-2 py-0.5 rounded-full"
                        style={{ background: "rgba(0,222,81,0.08)", color: "var(--accent)" }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                <h4 className="text-white font-semibold text-sm leading-snug group-hover:text-[var(--accent)] transition-colors line-clamp-2 mb-1">
                  {post.title}
                </h4>
                <span className="text-[10px]" style={{ color: "var(--text-subtle)" }}>
                  {post.createdAt
                    ? new Date(post.createdAt as string).toLocaleDateString("en-US", {
                        month: "short", day: "numeric", year: "numeric",
                      })
                    : ""}
                </span>
              </div>

              {/* Arrow */}
              <div
                className="shrink-0 self-center text-sm font-bold group-hover:translate-x-1 transition-transform"
                style={{ color: "var(--accent)" }}
              >
                →
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
