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
    return {
      title: `${course.title} — Juwel Hossain`,
      description: course.description,
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

  return (
    <div className="retro-page-container">
      <HeaderRetro content={content} />
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <CoursePlayer course={course} />
      </main>
      <FooterRetro content={content} />
    </div>
  );
}
