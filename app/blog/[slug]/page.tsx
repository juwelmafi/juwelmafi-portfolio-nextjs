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
  const [blog, content] = await Promise.all([
    getBlogBySlug(slug),
    getSiteContentMap(),
  ]);

  if (!blog) notFound();

  const formattedDate = blog.createdAt
    ? new Date(blog.createdAt as string).toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "Published";

  const readTime = `${Math.max(1, Math.ceil((blog.content?.split(/\s+/).length || 200) / 200))} MIN READ`;

  return (
    <div className="retro-page-container">
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
              <span>AUTHOR: JUWEL HOSSAIN</span>
              <span>•</span>
              <span>CERTIFIED DISPATCH</span>
            </div>

            {/* Cover Image in Notebook Frame */}
            {blog.coverImage && (
              <div className="border-2 border-[#191712] rounded-sm overflow-hidden mb-10 shadow-[4px_5px_0px_#191712]">
                <img
                  src={blog.coverImage}
                  alt={blog.title}
                  className="w-full max-h-[460px] object-cover"
                />
              </div>
            )}

            {/* Article Content in Readable Patrick Hand with 34px Line Height */}
            <div className="font-hand text-xl text-[#292524] leading-[34px] space-y-6">
              {blog.content.split("\n\n").map((block, i) => {
                const trimmed = block.trim();
                if (!trimmed) return null;

                if (trimmed.startsWith("## ")) {
                  return (
                    <h2
                      key={i}
                      className="font-script font-bold text-3xl sm:text-4xl text-[#191712] pt-6 pb-2 border-b-2 border-[#191712]"
                    >
                      <span className="marked">{trimmed.slice(3)}</span>
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
                  return (
                    <h3
                      key={i}
                      className="font-script font-bold text-2xl sm:text-3xl text-[#191712] pt-4"
                    >
                      {trimmed.slice(4)}
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
