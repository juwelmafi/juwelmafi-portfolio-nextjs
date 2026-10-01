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
      confirmButtonColor: "#DC2626",
      cancelButtonColor: "#78716C",
      confirmButtonText: "Yes, delete",
      background: "#FAF6EC",
      color: "#191712",
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
        background: "#FAF6EC",
        color: "#191712",
        confirmButtonColor: "#191712",
      });
    } catch {
      Swal.fire({
        title: "Error",
        text: "Failed to delete course.",
        icon: "error",
        background: "#FAF6EC",
        color: "#191712",
        confirmButtonColor: "#191712",
      });
    }
  };

  return (
    <div className="w-full space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 gap-3 border-b-2 border-[#191712]">
        <div>
          <p className="retro-eyebrow !mb-1">CURRICULUM DOSSIERS</p>
          <h1 className="font-script font-bold text-3xl sm:text-4xl text-[#191712] flex items-center gap-3 leading-tight">
            <FaGraduationCap className="text-[#191712]" /> Video <span className="marked">Masterclasses</span>
          </h1>
          <p className="font-hand text-base text-[#57534E] mt-0.5">
            Manage YouTube video courses, playlist chapters, and learning materials
          </p>
        </div>
        <Link href="/admin/courses/new" className="btn-primary self-start sm:self-auto">
          <FaPlus /> Add New Course
        </Link>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-16">
          <div className="w-8 h-8 border-2 border-[#191712] border-t-transparent rounded-full animate-spin mb-3" />
          <p className="font-typewriter text-xs text-[#78716C]">LOADING CURRICULUM...</p>
        </div>
      ) : courses.length === 0 ? (
        <div className="text-center py-16 hand-box bg-[#FFFFFF]">
          <div className="w-14 h-14 mx-auto mb-4 rounded-full border-2 border-[#191712] bg-[#FFE45E] flex items-center justify-center shadow-[2px_2px_0px_#191712]">
            <FaGraduationCap className="text-2xl text-[#191712]" />
          </div>
          <h2 className="font-script font-bold text-2xl text-[#191712] mb-1">No courses yet</h2>
          <p className="font-hand text-base mb-6 text-[#57534E]">
            Add your first video course or seed default courses from the control desk.
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
              className="hand-box p-5 bg-[#FFFFFF] flex flex-col md:flex-row md:items-center justify-between gap-4 hover:-translate-y-0.5 transition-transform"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2.5 flex-wrap mb-1.5">
                  <span className="font-typewriter text-[11px] font-bold text-[#C2410C]">
                    COURSE
                  </span>
                  {course.badge && (
                    <span className="font-typewriter text-[10px] uppercase px-2 py-0.5 rounded border border-[#191712] bg-[#FAF7EE] text-[#191712] font-bold">
                      {course.badge}
                    </span>
                  )}
                  <span
                    className={`font-typewriter text-[11px] px-2.5 py-0.5 rounded font-bold border border-[#191712] shadow-[1px_1px_0px_#191712] ${
                      course.published
                        ? "bg-[#FFE45E] text-[#191712]"
                        : "bg-[#E7E5E4] text-[#78716C]"
                    }`}
                  >
                    {course.published ? "Published" : "Draft"}
                  </span>
                </div>

                <h3 className="font-script font-bold text-2xl text-[#191712] truncate">
                  {course.title}
                </h3>

                <p className="font-hand text-sm text-[#57534E] line-clamp-1 mb-2 mt-0.5">
                  {course.description || "No description provided."}
                </p>

                <div className="flex items-center gap-3 text-xs font-typewriter text-[#78716C] flex-wrap">
                  <span className="flex items-center gap-1.5 text-[#DC2626] font-bold">
                    <FaYoutube /> {course.lessons?.length || 0} Lessons
                  </span>
                  <span>•</span>
                  <span>{course.category || "Full-Stack"}</span>
                  <span>•</span>
                  <span>{course.level || "All Levels"}</span>
                  <span>•</span>
                  <span className="text-[#191712] font-bold">/courses/{course.slug}</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5 flex-shrink-0 self-end md:self-center">
                <Link
                  href={`/courses/${course.slug}`}
                  target="_blank"
                  className="w-9 h-9 rounded border-2 border-[#191712] bg-[#FAF7EE] hover:bg-[#FFE45E] text-[#191712] flex items-center justify-center transition shadow-[2px_2px_0px_#191712]"
                  title="View Course on Site"
                >
                  <FaEye size={13} />
                </Link>
                <Link
                  href={`/admin/courses/${course.id}/edit`}
                  className="w-9 h-9 rounded border-2 border-[#191712] bg-[#FAF7EE] hover:bg-[#FFE45E] text-[#191712] flex items-center justify-center transition shadow-[2px_2px_0px_#191712]"
                  title="Edit Course"
                >
                  <FaEdit size={13} />
                </Link>
                <button
                  type="button"
                  onClick={() => handleDelete(course.id!, course.title)}
                  className="w-9 h-9 rounded border-2 border-[#191712] bg-[#FEE2E2] hover:bg-[#FECACA] text-[#DC2626] flex items-center justify-center transition shadow-[2px_2px_0px_#191712] cursor-pointer"
                  title="Delete Course"
                >
                  <FaTrash size={12} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
