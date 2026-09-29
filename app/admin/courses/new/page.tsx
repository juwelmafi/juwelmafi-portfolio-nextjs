import Link from "next/link";
import { FaArrowLeft, FaGraduationCap } from "react-icons/fa";
import CourseForm from "@/components/admin/CourseForm";

export default function NewCoursePage() {
  return (
    <div className="w-full max-w-5xl space-y-6">
      <div className="flex items-center gap-4 pb-3">
        <Link
          href="/admin/courses"
          className="w-9 h-9 rounded-xl flex items-center justify-center bg-white/5 text-[#8E95B3] hover:text-white hover:bg-white/10 transition shadow-sm"
        >
          <FaArrowLeft />
        </Link>
        <div>
          <h1 className="heading-font text-[26px] lg:text-[32px] font-bold text-white flex items-center gap-2.5 leading-tight">
            <FaGraduationCap className="text-[#00DE51]" /> Add New Video Course
          </h1>
          <p className="text-xs sm:text-sm mt-0.5 text-[#888899]">
            Create a new course with YouTube video lessons, code snippets, and duration
          </p>
        </div>
      </div>

      <CourseForm />
    </div>
  );
}
