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
      <div className="py-20 flex flex-col items-center justify-center gap-3">
        <div className="w-8 h-8 border-2 border-[#191712] border-t-transparent rounded-full animate-spin" />
        <p className="font-typewriter text-xs text-[#78716C]">LOADING COURSE DETAILS...</p>
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="w-full max-w-xl mx-auto text-center py-20 hand-box p-8 bg-[#FFFFFF]">
        <h2 className="font-script font-bold text-3xl text-[#191712] mb-2">Course Not Found</h2>
        <p className="font-hand text-base text-[#C2410C] mb-6">{error || "Could not find the requested course."}</p>
        <Link href="/admin/courses" className="btn-small">
          Back to Courses
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full space-y-6">
      <div className="flex items-center gap-4 border-b-2 border-[#191712] pb-4">
        <Link
          href="/admin/courses"
          className="w-9 h-9 border-2 border-[#191712] rounded bg-[#FAF7EE] hover:bg-[#FFE45E] flex items-center justify-center text-[#191712] shadow-[2px_2px_0px_#191712] transition-colors"
          title="Back to Courses"
        >
          <FaArrowLeft />
        </Link>
        <div>
          <span className="font-typewriter text-xs text-[#C2410C] font-bold uppercase tracking-wider block">
            COURSE DOSSIER EDIT
          </span>
          <h1 className="font-script font-bold text-3xl sm:text-4xl text-[#191712] flex items-center gap-2.5 leading-tight">
            <FaGraduationCap className="text-[#191712]" /> Edit Video Course
          </h1>
          <p className="font-hand text-base text-[#57534E] mt-0.5 truncate max-w-xl">
            {course.title}
          </p>
        </div>
      </div>

      <CourseForm initialData={course} isEditing={true} />
    </div>
  );
}
