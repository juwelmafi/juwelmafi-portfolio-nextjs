import Link from "next/link";
import { FaArrowLeft, FaGraduationCap } from "react-icons/fa";
import CourseForm from "@/components/admin/CourseForm";

export default function NewCoursePage() {
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
            COURSE DOSSIER ARCHIVE
          </span>
          <h1 className="font-script font-bold text-3xl sm:text-4xl text-[#191712] flex items-center gap-2.5 leading-tight">
            <FaGraduationCap className="text-[#191712]" /> Add New Video Course
          </h1>
          <p className="font-hand text-base text-[#57534E] mt-0.5">
            Create a new course with YouTube video lessons, code snippets, and duration.
          </p>
        </div>
      </div>

      <CourseForm />
    </div>
  );
}
