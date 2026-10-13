import { Metadata } from "next";
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

    const title = `${course.title} — Juwel Hossain Mafi (juwelmafi)`;
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
        images: course.thumbnail ? [{ url: course.thumbnail, alt: course.title }] : undefined,
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
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <CoursePlayer course={course} />
      </main>
      <FooterRetro content={content} />
    </div>
  );
}
