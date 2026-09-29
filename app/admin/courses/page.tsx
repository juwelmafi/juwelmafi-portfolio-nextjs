"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Course } from "@/types";
import { FaPlus, FaEdit, FaTrash, FaGraduationCap, FaYoutube, FaEye } from "react-icons/fa";
import Swal from "sweetalert2";

export default function AdminCoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCourses = () =>
    fetch("/api/courses?all=true")
      .then((r) => r.json())
      .then((data) => setCourses(Array.isArray(data) ? data : []))
      .catch(console.error)
      .finally(() => setLoading(false));

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleDelete = async (id: string, title: string) => {
    const result = await Swal.fire({
      title: "Delete Course?",
      text: `"${title}" and all its lessons will be permanently deleted.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#f87171",
      cancelButtonColor: "#3A3D4D",
      confirmButtonText: "Yes, delete",
      background: "#12121E",
      color: "#F0F0F5",
    });
    if (!result.isConfirmed) return;

    try {
      const res = await fetch(`/api/courses/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete course");
      setCourses((prev) => prev.filter((c) => c.id !== id));
      Swal.fire({
        title: "Deleted!",
        text: "Course has been removed.",
        icon: "success",
        background: "#12121E",
        color: "#F0F0F5",
        confirmButtonColor: "#00DE51",
      });
    } catch {
      Swal.fire({
        title: "Error",
        text: "Failed to delete course.",
        icon: "error",
        background: "#12121E",
        color: "#F0F0F5",
      });
    }
  };

  return (
    <div className="w-full space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 gap-3">
        <div>
          <h1 className="heading-font text-[26px] lg:text-[32px] font-bold text-white flex items-center gap-3 leading-tight">
            <FaGraduationCap className="text-[#00DE51]" /> Video Courses &amp; Tutorials
          </h1>
          <p className="text-xs sm:text-sm mt-0.5 text-[#888899]">
            Manage YouTube video courses, playlist chapters, and learning materials
          </p>
        </div>
        <Link href="/admin/courses/new" className="btn-primary self-start sm:self-auto">
          <FaPlus /> Add New Course
        </Link>
      </div>

      {loading ? (
        <div className="flex justify-center py-16">
          <div className="w-8 h-8 border-2 border-[#00DE51] border-t-transparent rounded-full animate-spin" />
        </div>
      ) : courses.length === 0 ? (
        <div className="text-center py-20 glass-card">
          <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-[#00DE51]/10 flex items-center justify-center">
            <FaGraduationCap className="text-2xl text-[#00DE51]" />
          </div>
          <h2 className="heading-font text-[18px] lg:text-[20px] font-semibold text-white mb-2">No courses yet</h2>
          <p className="text-sm mb-6 text-[#888899]">
            Add your first video course or seed the default courses from the dashboard.
          </p>
          <Link href="/admin/courses/new" className="btn-primary">
            <FaPlus /> Add Course
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {courses.map((course) => (
            <div
              key={course.id}
              className="glass-card p-5 flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2.5 flex-wrap mb-1.5">
                  <h3 className="heading-font font-bold text-white text-base sm:text-lg truncate">
                    {course.title}
                  </h3>
                  {course.badge && (
                    <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-[#00DE51]/10 text-[#00DE51]">
                      {course.badge}
                    </span>
                  )}
                  <span
                    className={`text-[11px] font-mono px-2.5 py-0.5 rounded-full ${
                      course.published
                        ? "bg-[#00DE51]/15 text-[#00DE51]"
                        : "bg-white/10 text-white/60"
                    }`}
                  >
                    {course.published ? "Published" : "Draft"}
                  </span>
                </div>

                <p className="text-xs text-white/60 line-clamp-1 mb-2">
                  {course.description || "No description provided."}
                </p>

                <div className="flex items-center gap-4 text-xs font-mono text-white/50 flex-wrap">
                  <span className="flex items-center gap-1.5 text-red-400">
                    <FaYoutube /> {course.lessons?.length || 0} Lessons
                  </span>
                  <span>•</span>
                  <span>{course.category || "Full-Stack"}</span>
                  <span>•</span>
                  <span>{course.level || "All Levels"}</span>
                  <span>•</span>
                  <span className="text-white/40">/courses/{course.slug}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                <Link
                  href={`/courses/${course.slug}`}
                  target="_blank"
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-sm bg-white/5 text-[#8E95B3] hover:text-white hover:bg-white/10 transition shadow-sm"
                  title="View Course on Site"
                >
                  <FaEye />
                </Link>
                <Link
                  href={`/admin/courses/${course.id}/edit`}
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-sm bg-[#00DE51]/15 text-[#00DE51] hover:bg-[#00DE51]/25 transition shadow-sm"
                  title="Edit Course"
                >
                  <FaEdit />
                </Link>
                <button
                  type="button"
                  onClick={() => handleDelete(course.id!, course.title)}
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-sm bg-red-500/10 text-red-400 hover:bg-red-500/20 transition shadow-sm cursor-pointer"
                  title="Delete Course"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
