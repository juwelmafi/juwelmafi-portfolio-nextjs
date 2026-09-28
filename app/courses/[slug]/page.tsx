import { Metadata } from "next";
import Footer from "@/components/layout/Footer";
import CoursePlayer from "@/components/CoursePlayer";
import { getCourseBySlug, getCourses } from "@/lib/data";
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
  const course = await getCourseBySlug(slug);

  if (!course || !course.lessons || course.lessons.length === 0) {
    notFound();
  }

  return (
    <div style={{ background: "var(--bg-base)", minHeight: "100vh" }} className="py-8 px-4 sm:px-6 lg:pl-12 lg:pr-28">
      <div>
        <CoursePlayer course={course} />
      </div>
      <Footer />
    </div>
  );
}
