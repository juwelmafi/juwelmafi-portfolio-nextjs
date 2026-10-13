import { Metadata } from "next";
import Link from "next/link";
import HeaderRetro from "@/components/retro/HeaderRetro";
import FooterRetro from "@/components/retro/FooterRetro";
import { getBlogBySlug, getBlogs, getSiteContentMap } from "@/lib/data";
import { notFound } from "next/navigation";

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

    const siteUrl =
      process.env.NEXT_PUBLIC_SITE_URL ||
      (process.env.NEXTAUTH_URL && !process.env.NEXTAUTH_URL.includes("localhost")
        ? process.env.NEXTAUTH_URL
        : "https://juwelmafi.vercel.app");

    const rawTitle = blog.metaTitle || blog.title;
    const title = rawTitle.includes("Juwel") ? { absolute: rawTitle } : rawTitle;
    const description = blog.metaDescription || blog.excerpt;
    const ogImage = blog.ogImage || blog.coverImage;

    return {
      title,
      description,
      keywords: blog.metaKeywords?.length
        ? blog.metaKeywords
        : blog.tags,
      authors: [{ name: "Juwel Hossain Mafi", url: siteUrl }],
      alternates: {
        canonical: blog.canonicalUrl || `${siteUrl}/blog/${blog.slug}`,
      },
      openGraph: {
        type: "article",
        title: blog.ogTitle || title,
        description: blog.ogDescription || description,
        url: `${siteUrl}/blog/${blog.slug}`,
        images: ogImage ? [{ url: ogImage, width: 1200, height: 630, alt: blog.coverImageAlt || blog.title }] : undefined,
        publishedTime: blog.createdAt,
        modifiedTime: blog.updatedAt,
        authors: ["Juwel Hossain"],
        tags: blog.tags,
      },
      twitter: {
        card: "summary_large_image",
        title: blog.ogTitle || title,
        description: blog.ogDescription || description,
        images: ogImage ? [ogImage] : undefined,
      },
      robots: {
        index: blog.published,
        follow: true,
      },
    };
  } catch {
    return { title: "Blog Post" };
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const [blog, allBlogs, content] = await Promise.all([
    getBlogBySlug(slug),
    getBlogs(true),
    getSiteContentMap(),
  ]);

  if (!blog) notFound();

  // Related articles (Internal linking for SEO cluster authority)
  const relatedBlogs = allBlogs
    .filter((b) => b.slug !== slug)
    .slice(0, 2);

  // Parse Table of Contents items from markdown headings
  const tocItems: { text: string; id: string; level: number }[] = [];
  const contentBlocks = (blog.content || "").split("\n\n");
  contentBlocks.forEach((block) => {
    const trimmed = block.trim();
    if (trimmed.startsWith("## ")) {
      const text = trimmed.slice(3).trim();
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
      tocItems.push({ text, id, level: 2 });
    } else if (trimmed.startsWith("### ")) {
      const text = trimmed.slice(4).trim();
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
      tocItems.push({ text, id, level: 3 });
    }
  });

  const formattedDate = blog.createdAt
    ? new Date(blog.createdAt as string).toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "Published";

  const readTime = `${Math.max(1, Math.ceil((blog.content?.split(/\s+/).length || 200) / 200))} MIN READ`;
  const coverAlt = blog.coverImageAlt || `${blog.title} — Tutorial by Juwel Hossain Mafi (juwelmafi)`;

  return (
    <div className="retro-page-container">
      {/* JSON-LD structured data for Google Search rich results */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Article",
              headline: blog.metaTitle || blog.title,
              description: blog.metaDescription || blog.excerpt,
              image: blog.ogImage || blog.coverImage || undefined,
              author: {
                "@type": "Person",
                name: "Juwel Hossain Mafi",
                alternateName: "juwelmafi",
                url: process.env.NEXT_PUBLIC_SITE_URL || "https://juwelmafi.vercel.app",
              },
              publisher: {
                "@type": "Person",
                name: "Juwel Hossain Mafi",
                url: process.env.NEXT_PUBLIC_SITE_URL || "https://juwelmafi.vercel.app",
              },
              datePublished: blog.createdAt,
              dateModified: blog.updatedAt || blog.createdAt,
              mainEntityOfPage: {
                "@type": "WebPage",
                "@id": blog.canonicalUrl || `https://juwelmafi.vercel.app/blog/${blog.slug}`,
              },
              keywords: blog.metaKeywords?.length ? blog.metaKeywords.join(", ") : blog.tags?.join(", "),
            },
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "Home",
                  item: "https://juwelmafi.vercel.app",
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: "Explore",
                  item: "https://juwelmafi.vercel.app/explore",
                },
                {
                  "@type": "ListItem",
                  position: 3,
                  name: blog.title,
                  item: `https://juwelmafi.vercel.app/blog/${blog.slug}`,
                },
              ],
            },
          ],
        }) }}
      />
      <HeaderRetro content={content} />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        
        {/* Navigation Breadcrumb */}
        <div className="mb-8">
          <Link
            href="/explore"
            className="inline-flex items-center gap-2 font-hand text-lg text-[#191712] hover:underline"
          >
            ← Return to Explore Hub
          </Link>
        </div>

        {/* Notebook Article Sheet */}
        <div className="relative">
          
          {/* Masking tape on top of the notebook page */}
          <div className="tape tape-top" aria-hidden="true" />

          {/* Sticky Note Pin at Top Right */}
          <div className="hidden sm:block absolute -top-6 -right-6 w-52 p-3.5 bg-[#FFEAA0] border-2 border-[#191712] shadow-[3px_4px_0px_#191712] rotate-[4deg] z-10">
            <p className="font-hand text-base text-[#191712] leading-snug">
              &ldquo;Engineering notes written with care. No AI slop.&rdquo;
            </p>
          </div>

          {/* Main Hand-drawn Notebook Sheet Container */}
          <article className="hand-box p-6 sm:p-12 lg:p-16 bg-[#FFFFFF] relative mb-12">
            
            {/* Docket Header */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-[#191712] pb-4 mb-6 font-typewriter text-xs">
              <div className="flex items-center gap-2.5">
                <span className="text-[#C2410C] font-bold uppercase tracking-widest">
                  DISPATCH #{blog.slug.slice(0, 10).toUpperCase()}
                </span>
                <span className="bg-[#FFE45E] border border-[#191712] px-2 py-0.5 text-[11px] font-bold text-[#191712]">
                  {blog.category || "General"}
                </span>
              </div>
              <div className="text-[#78716C]">
                DATE: {formattedDate}
              </div>
            </div>

            {/* Handwritten Main Title */}
            <h1 className="font-script font-bold text-4xl sm:text-5xl lg:text-6xl text-[#191712] mb-5 leading-[1.08]">
              {blog.title}
            </h1>

            {/* Reading Meta & Author signature */}
            <div className="flex flex-wrap items-center gap-4 text-xs font-typewriter text-[#57534E] mb-8 pb-4 border-b border-[#191712]/20">
              <span>EST. READING TIME: {readTime}</span>
              <span>•</span>
              <span>AUTHOR: JUWEL HOSSAIN MAFI</span>
              <span>•</span>
              <span>CERTIFIED DISPATCH</span>
            </div>

            {/* Cover Image in Notebook Frame */}
            {blog.coverImage && (
              <div className="border-2 border-[#191712] rounded-sm overflow-hidden mb-10 shadow-[4px_5px_0px_#191712]">
                <img
                  src={blog.coverImage}
                  alt={coverAlt}
                  className="w-full max-h-[460px] object-cover"
                />
              </div>
            )}

            {/* Interactive Table of Contents (TOC) with Jump Anchors */}
            {tocItems.length >= 2 && (
              <nav aria-label="Table of Contents" className="hand-box p-6 sm:p-7 bg-[#FAF7EE] mb-10">
                <div className="flex items-center justify-between border-b-2 border-[#191712] pb-2.5 mb-4 font-typewriter text-xs text-[#191712]">
                  <span className="font-bold uppercase tracking-wider flex items-center gap-2">
                    <span className="w-2.5 h-2.5 bg-[#FFE45E] border border-[#191712] inline-block"></span>
                    Table of Contents • Quick Navigation
                  </span>
                  <span className="bg-[#191712] text-[#FBF6E6] px-2 py-0.5 text-[10px] font-bold">
                    {tocItems.length} SECTIONS
                  </span>
                </div>
                <ol className="space-y-2 font-hand text-lg text-[#191712]">
                  {tocItems.map((item, idx) => (
                    <li key={idx} className={item.level === 3 ? "pl-5 text-base" : ""}>
                      <a
                        href={`#${item.id}`}
                        className="hover:underline hover:text-[#C2410C] flex items-baseline gap-2 transition-colors"
                      >
                        <span className="font-mono text-xs text-[#78716C]">
                          {String(idx + 1).padStart(2, "0")}.
                        </span>
                        <span>{item.text}</span>
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            )}

            {/* Article Content in Readable Patrick Hand with 34px Line Height */}
            <div className="font-hand text-xl text-[#292524] leading-[34px] space-y-6">
              {contentBlocks.map((block, i) => {
                const trimmed = block.trim();
                if (!trimmed) return null;

                if (trimmed.startsWith("## ")) {
                  const headingText = trimmed.slice(3).trim();
                  const headingId = headingText.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
                  return (
                    <h2
                      key={i}
                      id={headingId}
                      className="font-script font-bold text-3xl sm:text-4xl text-[#191712] pt-8 pb-2 border-b-2 border-[#191712] scroll-mt-24 group flex items-center justify-between"
                    >
                      <span className="marked">{headingText}</span>
                      <a
                        href={`#${headingId}`}
                        className="opacity-0 group-hover:opacity-100 font-mono text-sm text-[#78716C] hover:text-[#191712] transition-opacity ml-2"
                        title="Direct Section Link"
                      >
                        #
                      </a>
                    </h2>
                  );
                }
                if (trimmed.startsWith("# ")) {
                  return (
                    <h1
                      key={i}
                      className="font-script font-bold text-4xl sm:text-5xl text-[#191712] pt-6"
                    >
                      {trimmed.slice(2)}
                    </h1>
                  );
                }
                if (trimmed.startsWith("### ")) {
                  const headingText = trimmed.slice(4).trim();
                  const headingId = headingText.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
                  return (
                    <h3
                      key={i}
                      id={headingId}
                      className="font-script font-bold text-2xl sm:text-3xl text-[#191712] pt-6 scroll-mt-24 group flex items-center justify-between"
                    >
                      <span>{headingText}</span>
                      <a
                        href={`#${headingId}`}
                        className="opacity-0 group-hover:opacity-100 font-mono text-sm text-[#78716C] hover:text-[#191712] transition-opacity ml-2"
                        title="Direct Section Link"
                      >
                        #
                      </a>
                    </h3>
                  );
                }
                if (trimmed.startsWith("> ")) {
                  return (
                    <blockquote
                      key={i}
                      className="p-5 my-6 bg-[#FFC9DC] border-2 border-[#191712] rounded-md shadow-[3px_3px_0px_#191712] font-hand text-xl text-[#191712] rotate-[-0.6deg]"
                    >
                      {trimmed.slice(2)}
                    </blockquote>
                  );
                }
                if (trimmed.startsWith("```")) {
                  const lines = trimmed.split("\n");
                  const code = lines.slice(1, -1).join("\n");
                  return (
                    <div
                      key={i}
                      className="my-6 border-2 border-[#191712] rounded-md bg-[#FAF7EE] overflow-hidden"
                    >
                      <div className="flex items-center justify-between border-b-2 border-[#191712] px-4 py-2 bg-[#E7DFCE] font-typewriter text-xs text-[#191712]">
                        <span>SOURCE CODE</span>
                        <span>TERMINAL</span>
                      </div>
                      <pre className="p-4 sm:p-5 overflow-x-auto font-typewriter text-xs sm:text-sm text-[#191712] leading-relaxed">
                        <code>{code}</code>
                      </pre>
                    </div>
                  );
                }

                return (
                  <p key={i}>
                    {trimmed}
                  </p>
                );
              })}
            </div>

            {/* Tags & Completion Stamp at Bottom of Article */}
            <div className="mt-12 pt-6 border-t-2 border-[#191712] flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div>
                <span className="font-typewriter text-xs uppercase tracking-wider text-[#78716C] block mb-2 font-bold">
                  Document Tags:
                </span>
                <div className="flex flex-wrap gap-2">
                  {blog.tags?.map((t, idx) => (
                    <span
                      key={idx}
                      className="font-typewriter text-xs bg-[#FAF7EE] border border-[#191712] px-3 py-1 text-[#191712]"
                    >
                      #{t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Rubber Stamp */}
              <div className="stamp-gold-cert shrink-0 self-center sm:self-auto">
                <span className="font-bold">VERIFIED</span>
                <span>DISPATCH</span>
              </div>
            </div>

            {/* E-E-A-T Author Dossier Card */}
            <section className="mt-12 hand-box p-6 sm:p-8 bg-[#FAF7EE] border-2 border-[#191712] shadow-[4px_4px_0px_#191712]">
              <div className="flex items-center justify-between border-b-2 border-[#191712] pb-3 mb-6 font-typewriter text-xs text-[#191712]">
                <span className="font-bold uppercase tracking-wider text-[#C2410C]">
                  AUTHOR CREDENTIALS &amp; E-E-A-T VERIFICATION
                </span>
                <span className="bg-[#191712] text-[#FBF6E6] px-2.5 py-0.5 font-bold text-[11px]">
                  CERTIFIED ENGINEER
                </span>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-6">
                <div className="w-20 h-20 sm:w-24 sm:h-24 border-2 border-[#191712] bg-[#FFFFFF] overflow-hidden shrink-0 shadow-[2px_2px_0px_#191712]">
                  <img
                    src={content?.["hero.avatar"] || "/assets/images/avatar/juwel_retro.png"}
                    alt={content?.["hero.avatarAlt"] || "Juwel Hossain Mafi (juwelmafi) — Software Engineer & Author"}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h3 className="font-script font-bold text-2xl sm:text-3xl text-[#191712]">
                      Juwel Hossain Mafi
                    </h3>
                    <span className="font-typewriter text-xs bg-[#FFE45E] border border-[#191712] px-2 py-0.5 font-bold text-[#191712]">
                      @juwelmafi
                    </span>
                  </div>

                  <p className="font-hand text-base sm:text-lg text-[#57534E] leading-relaxed mb-3">
                    Full-Stack Software Engineer &amp; Shopify Specialist enrolled in B.Sc CSE at Sonargaon University. Passionate about clean architecture, Next.js App Router performance, and publishing open, accessible developer tutorials.
                  </p>

                  <div className="flex flex-wrap items-center gap-3 font-typewriter text-xs text-[#191712]">
                    <a
                      href={content?.["social.github"] || "https://github.com/juwelmafi"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline flex items-center gap-1 text-[#191712] font-bold"
                    >
                      GitHub ↗
                    </a>
                    <span>•</span>
                    <a
                      href={content?.["social.linkedin"] || "https://www.linkedin.com/in/juwelmafi"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline flex items-center gap-1 text-[#191712] font-bold"
                    >
                      LinkedIn ↗
                    </a>
                    <span>•</span>
                    <a
                      href={content?.["social.youtube"] || "https://www.youtube.com/@juwelmafi"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline flex items-center gap-1 text-[#191712] font-bold"
                    >
                      YouTube ↗
                    </a>
                    <span>•</span>
                    <Link href="/contact" className="hover:underline text-[#C2410C] font-bold">
                      Get in Touch →
                    </Link>
                  </div>
                </div>
              </div>
            </section>

            {/* Related Articles & Internal Linking */}
            {relatedBlogs.length > 0 && (
              <section className="mt-12 pt-8 border-t-2 border-[#191712]">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <span className="font-typewriter text-xs font-bold text-[#C2410C] uppercase tracking-wider block">
                      CURATED KNOWLEDGE
                    </span>
                    <h2 className="font-script font-bold text-3xl sm:text-4xl text-[#191712]">
                      Related Articles &amp; Further Study
                    </h2>
                  </div>
                  <Link href="/explore" className="font-hand text-base text-[#191712] hover:underline hidden sm:block">
                    Explore All Articles →
                  </Link>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  {relatedBlogs.map((rel, rIdx) => (
                    <article
                      key={rel.id || rIdx}
                      className="hand-box flex flex-col bg-[#FFFFFF] overflow-hidden group hover:translate-x-0.5 hover:translate-y-0.5 transition-transform"
                    >
                      {rel.coverImage && (
                        <div className="relative border-b-2 border-[#191712] h-40 overflow-hidden bg-[#191712]/5">
                          <img
                            src={rel.coverImage}
                            alt={rel.coverImageAlt || `${rel.title} — Tutorial by Juwel Hossain Mafi`}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            loading="lazy"
                          />
                        </div>
                      )}
                      <div className="p-5 flex-1 flex flex-col justify-between">
                        <div>
                          <span className="font-typewriter text-[11px] bg-[#E7DFCE] border border-[#191712] px-2 py-0.5 rounded text-[#191712] inline-block mb-2 font-bold">
                            {rel.category || "General"}
                          </span>
                          <h3 className="font-script font-bold text-2xl text-[#191712] mb-2 leading-tight">
                            <Link href={`/blog/${rel.slug}`} className="hover:underline">
                              {rel.title}
                            </Link>
                          </h3>
                          <p className="font-hand text-sm text-[#57534E] line-clamp-2 leading-relaxed">
                            {rel.excerpt}
                          </p>
                        </div>
                        <div className="mt-4 pt-3 border-t border-[#191712]/15 flex items-center justify-between">
                          <span className="font-typewriter text-[11px] text-[#78716C]">
                            {rel.createdAt ? new Date(rel.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "Article"}
                          </span>
                          <Link
                            href={`/blog/${rel.slug}`}
                            className="font-hand text-sm font-bold text-[#191712] hover:underline flex items-center gap-1"
                          >
                            Read Article →
                          </Link>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            )}

            {/* Return Action */}
            <div className="mt-10 pt-6 border-t border-[#191712]/20 flex flex-wrap items-center justify-between gap-4">
              <Link
                href="/explore"
                className="btn-hand-black"
              >
                ← Back to All Articles
              </Link>
              <Link
                href="/contact"
                className="btn-hand-pink"
              >
                Discuss This Article →
              </Link>
            </div>

          </article>

        </div>

      </main>

      <FooterRetro content={content} />
    </div>
  );
}
