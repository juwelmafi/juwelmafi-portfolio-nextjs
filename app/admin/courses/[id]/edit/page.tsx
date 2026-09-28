"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { FaArrowLeft, FaGraduationCap } from "react-icons/fa";
import { Course } from "@/types";
import CourseForm from "@/components/admin/CourseForm";

export default function EditCoursePage() {
  const params = useParams();
  const id = params?.id as string;

  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    fetch(`/api/courses/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Course not found");
        return res.json();
      })
      .then((data) => {
        if (data) setCourse(data);
      })
      .catch((err) => {
        setError(err.message || "Failed to load course");
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="py-16 flex flex-col items-center justify-center gap-4">
        <div className="w-8 h-8 border-2 border-[#00DE51] border-t-transparent rounded-full animate-spin" />
        <p className="text-xs font-mono text-white/50">Loading course details...</p>
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="w-full max-w-xl mx-auto text-center py-20">
        <h2 className="heading-font text-[18px] lg:text-[20px] font-bold text-white mb-2">Course Not Found</h2>
        <p className="text-sm text-red-400 mb-6">{error || "Could not find the requested course."}</p>
        <Link href="/admin/courses" className="btn-primary">
          Back to Courses
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full max-w-5xl space-y-6">
      <div className="flex items-center gap-4 pb-3 border-b border-white/5">
        <Link
          href="/admin/courses"
          className="w-9 h-9 rounded-xl flex items-center justify-center bg-white/5 text-[#8E95B3] hover:text-white hover:bg-white/10 transition shadow-sm"
        >
          <FaArrowLeft />
        </Link>
        <div>
          <h1 className="heading-font text-[26px] lg:text-[32px] font-bold text-white flex items-center gap-2.5 leading-tight">
            <FaGraduationCap className="text-[#00DE51]" /> Edit Video Course
          </h1>
          <p className="text-xs sm:text-sm mt-0.5 truncate max-w-xl text-[#888899]">
            {course.title}
          </p>
        </div>
      </div>

      <CourseForm initialData={course} isEditing={true} />
    </div>
  );
}
