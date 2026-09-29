import Link from "next/link";
import Image from "next/image";
import { getCourses } from "@/lib/data";
import { Course } from "@/types";
import { FaFilm } from "react-icons/fa";

export default async function CoursesSection() {
  let courses: Course[] = [];
  try {
    courses = await getCourses(true);
  } catch {
    courses = [];
  }

  if (courses.length === 0) return null;

  return (
    <div id="courses" className="flat-spacing">
      {/* Section Header */}
      <div className="sect-tag text-caption fw-medium effectFade fadeUp no-div">
        <i className="icon icon-high-light"></i>Free Learning
      </div>
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
        <h4 className="s-title letter-space--2 text-white split-text effect-blur-fade font-bold text-2xl md:text-3xl">
          Courses & Tutorials
        </h4>
        <Link
          href="/courses"
          className="inline-flex items-center gap-2 text-xs font-semibold px-5 py-2.5 rounded-xl transition-all hover:scale-105 shrink-0"
          style={{
            background: "rgba(0, 222, 81, 0.12)",
            color: "var(--accent)",
            border: "1px solid rgba(0, 222, 81, 0.3)",
          }}
        >
          Browse All →
        </Link>
      </div>

      {/* Single-column list — fits well in the narrow homepage sidebar column */}
      <div className="flex flex-col gap-4 sm:gap-5">
        {courses.slice(0, 3).map((course) => (
          <Link
            key={course.id || course.slug}
            href={`/courses/${course.slug}`}
            className="group block no-underline"
          >
            <div
              className="water-drop-card flex flex-col sm:flex-row gap-3.5 sm:gap-5 items-stretch sm:items-start overflow-hidden transition-all duration-300 hover:scale-[1.01]"
              style={{ padding: "1.15rem 1.25rem" }}
            >
              {/* Thumbnail: 16:9 banner on mobile, square fixed on desktop */}
              <div
                className="relative shrink-0 rounded-xl overflow-hidden w-full h-40 sm:w-[92px] sm:h-[92px] sm:min-w-[92px]"
              >
                {course.thumbnail ? (
                  <Image
                    src={course.thumbnail}
                    alt={course.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div
                    className="w-full h-full flex items-center justify-center"
                    style={{ background: "linear-gradient(135deg, #0A0A14, #1A1A2E)" }}
                  >
                    <FaFilm className="text-2xl text-[#00DE51]/50" />
                  </div>
                )}
                {/* Play icon overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 sm:opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <div
                    className="w-10 h-10 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shadow-lg"
                    style={{ background: "var(--accent)" }}
                  >
                    <svg className="w-4 h-4 sm:w-3 sm:h-3 ml-0.5" fill="#000" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Text content */}
              <div className="flex-1 min-w-0 flex flex-col justify-between">
                <div>
                  {/* Category + badge row */}
                  <div className="flex flex-wrap items-center gap-1.5 mb-1.5">
                    <span
                      className="text-[9.5px] sm:text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider"
                      style={{ background: "rgba(0,222,81,0.1)", color: "var(--accent)" }}
                    >
                      {course.category}
                    </span>
                    {course.badge && (
                      <span
                        className="text-[9.5px] sm:text-[10px] font-bold px-2 py-0.5 rounded-full"
                        style={{ background: "var(--accent)", color: "#000" }}
                      >
                        {course.badge}
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h4 className="text-white font-bold text-xs sm:text-sm leading-snug group-hover:text-[var(--accent)] transition-colors line-clamp-2 mb-2">
                    {course.title}
                  </h4>
                </div>

                {/* Meta row & Arrow */}
                <div className="flex items-center justify-between pt-2 border-t border-white/5 sm:border-0 sm:pt-0 mt-auto">
                  <div className="flex items-center gap-2 sm:gap-3 text-[10.5px] sm:text-[11px] text-white/50">
                    <span>{course.level}</span>
                    <span>·</span>
                    <span>{course.lessons?.length || 0} lessons</span>
                    <span>·</span>
                    <span style={{ color: "var(--accent)" }} className="font-semibold">Free</span>
                  </div>
                  <div
                    className="text-xs sm:text-sm font-bold group-hover:translate-x-1 transition-transform ml-2 shrink-0"
                    style={{ color: "var(--accent)" }}
                  >
                    →
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
