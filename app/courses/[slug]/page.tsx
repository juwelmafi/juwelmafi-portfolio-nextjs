import { Metadata } from "next";
import Link from "next/link";
import HeaderRetro from "@/components/retro/HeaderRetro";
import FooterRetro from "@/components/retro/FooterRetro";
import CoursePlayer from "@/components/CoursePlayer";
import { getCourseBySlug, getCourses, getSiteContentMap } from "@/lib/data";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ slug: string }>;
}

export const revalidate = 60;

export async function generateStaticParams() {
  try {
    const courses = await getCourses(true);
    return courses.map((c) => ({ slug: c.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const course = await getCourseBySlug(slug);
    if (!course) return { title: "Course Not Found" };

    const siteUrl =
      process.env.NEXT_PUBLIC_SITE_URL ||
      (process.env.NEXTAUTH_URL && !process.env.NEXTAUTH_URL.includes("localhost")
        ? process.env.NEXTAUTH_URL
        : "https://juwelmafi.vercel.app");

    const title = course.title;
    const description = course.description;

    return {
      title,
      description,
      alternates: {
        canonical: `${siteUrl}/courses/${course.slug}`,
      },
      openGraph: {
        type: "video.other",
        title,
        description,
        url: `${siteUrl}/courses/${course.slug}`,
        images: course.thumbnail ? [{ url: course.thumbnail, alt: course.thumbnailAlt || course.title }] : undefined,
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: course.thumbnail ? [course.thumbnail] : undefined,
      },
    };
  } catch {
    return { title: "Course" };
  }
}

export default async function CourseDetailPage({ params }: Props) {
  const { slug } = await params;
  const [course, content] = await Promise.all([
    getCourseBySlug(slug),
    getSiteContentMap(),
  ]);

  if (!course || !course.lessons || course.lessons.length === 0) {
    notFound();
  }

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.NEXTAUTH_URL && !process.env.NEXTAUTH_URL.includes("localhost")
      ? process.env.NEXTAUTH_URL
      : "https://juwelmafi.vercel.app");

  const courseJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Course",
        name: course.title,
        description: course.description,
        provider: {
          "@type": "Person",
          name: "Juwel Hossain Mafi",
          alternateName: "juwelmafi",
          url: siteUrl,
        },
        image: course.thumbnail,
        hasCourseInstance: {
          "@type": "CourseInstance",
          courseMode: "online",
          courseWorkload: `${course.lessons.length} lessons`,
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: siteUrl,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Explore",
            item: `${siteUrl}/explore`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: course.title,
            item: `${siteUrl}/courses/${course.slug}`,
          },
        ],
      },
    ],
  };

  return (
    <div className="retro-page-container">
      {/* Course & Breadcrumb JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseJsonLd) }}
      />
      <HeaderRetro content={content} />
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
        <CoursePlayer course={course} />

        {/* E-E-A-T Instructor & Author Dossier Card */}
        <section className="hand-box p-6 sm:p-8 bg-[#FAF7EE] border-2 border-[#191712] shadow-[4px_4px_0px_#191712]">
          <div className="flex items-center justify-between border-b-2 border-[#191712] pb-3 mb-6 font-typewriter text-xs text-[#191712]">
            <span className="font-bold uppercase tracking-wider text-[#C2410C]">
              INSTRUCTOR CREDENTIALS &amp; E-E-A-T VERIFICATION
            </span>
            <span className="bg-[#191712] text-[#FBF6E6] px-2.5 py-0.5 font-bold text-[11px]">
              VERIFIED INSTRUCTOR
            </span>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-6">
            <div className="w-20 h-20 sm:w-24 sm:h-24 border-2 border-[#191712] bg-[#FFFFFF] overflow-hidden shrink-0 shadow-[2px_2px_0px_#191712]">
              <img
                src={content?.["hero.avatar"] || "/assets/images/avatar/juwel_retro.png"}
                alt={content?.["hero.avatarAlt"] || "Juwel Hossain Mafi (juwelmafi) — Software Engineer & Instructor"}
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
                Full-Stack Software Engineer &amp; Shopify Specialist enrolled in B.Sc CSE at Sonargaon University. Creates in-depth, hands-on programming masterclasses and tutorials with zero bloat and clean architecture.
              </p>

              <div className="flex flex-wrap items-center gap-3 font-typewriter text-xs text-[#191712]">
                <a
                  href={content?.["social.youtube"] || "https://www.youtube.com/@juwelmafi"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline flex items-center gap-1 text-[#191712] font-bold"
                >
                  YouTube Channel ↗
                </a>
                <span>•</span>
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
                <Link href="/contact" className="hover:underline text-[#C2410C] font-bold">
                  Ask a Question →
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <FooterRetro content={content} />
    </div>
  );
}
