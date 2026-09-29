import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Footer from "@/components/layout/Footer";
import { getCourses } from "@/lib/data";
import { FaVideo, FaFilm } from "react-icons/fa";

export const metadata: Metadata = {
  title: "Courses — Juwel Hossain",
  description: "Free web development courses and tutorials on Next.js, React, MERN stack, and more.",
};

export const revalidate = 60;

export default async function CoursesPage() {
  const courses = await getCourses(true);

  return (
    <>
      <main className="min-h-screen py-12 md:py-16 px-4 sm:px-6 md:px-10 lg:pl-16 lg:pr-28" style={{ background: "var(--bg-base)" }}>
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="mb-10">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider mb-6 transition-colors hover:text-white"
              style={{ color: "var(--accent)" }}
            >
              ← Back to Portfolio
            </Link>
            <div>
              <span className="section-label">Free Learning</span>
              <h1 className="heading-font text-3xl sm:text-4xl md:text-5xl font-bold text-white mt-3 mb-3">
                Courses &amp; Tutorials
              </h1>
              <p className="text-sm sm:text-base max-w-2xl leading-relaxed" style={{ color: "var(--text-muted)" }}>
                Practical web development courses — Next.js, MERN stack, React, and beyond. All free.
              </p>
            </div>
          </div>

          {courses.length === 0 ? (
            <div className="text-center py-24 glass-card rounded-3xl p-12">
              <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-[#00DE51]/10 flex items-center justify-center">
                <FaVideo className="text-2xl text-[#00DE51]" />
              </div>
              <h2 className="heading-font text-xl font-semibold text-white mb-2">No courses yet</h2>
              <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                Check back soon — video content is on the way!
              </p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course) => (
                <Link
                  key={course.id || course.slug}
                  href={`/courses/${course.slug}`}
                  className="group block no-underline"
                >
                  <div className="glass-card rounded-2xl h-full flex flex-col overflow-hidden transition-all duration-300 hover:scale-[1.02]">
                    {/* Thumbnail */}
                    <div className="relative h-52 overflow-hidden rounded-t-2xl">
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
                          <FaFilm className="text-4xl text-[#00DE51]/50" />
                        </div>
                      )}

                      {/* Play overlay */}
                      <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                        <div
                          className="w-16 h-16 rounded-full flex items-center justify-center shadow-2xl"
                          style={{ background: "var(--accent)" }}
                        >
                          <svg className="w-6 h-6 ml-1" fill="#000" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </div>

                      {course.badge && (
                        <div className="absolute top-3 left-3">
                          <span
                            className="text-xs font-bold px-2.5 py-1 rounded-full"
                            style={{ background: "var(--accent)", color: "#000" }}
                          >
                            {course.badge}
                          </span>
                        </div>
                      )}

                      <div className="absolute bottom-3 right-3">
                        <span
                          className="text-xs font-semibold px-2.5 py-1 rounded-full backdrop-blur-sm"
                          style={{ background: "rgba(0,0,0,0.75)", color: "white" }}
                        >
                          {course.lessons?.length || 0} lessons
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex flex-col flex-1 gap-3 p-6">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span
                          className="text-[10px] font-semibold px-2.5 py-0.5 rounded-full uppercase tracking-wider"
                          style={{ background: "rgba(0,222,81,0.1)", color: "var(--accent)" }}
                        >
                          {course.category}
                        </span>
                        <span
                          className="text-[10px] px-2.5 py-0.5 rounded-full"
                          style={{ background: "rgba(255,255,255,0.07)", color: "var(--text-muted)" }}
                        >
                          {course.level}
                        </span>
                      </div>

                      <h2 className="heading-font text-base font-bold text-white group-hover:text-[var(--accent)] transition-colors line-clamp-2">
                        {course.title}
                      </h2>
                      <p className="text-xs leading-relaxed line-clamp-3 flex-1" style={{ color: "var(--text-muted)" }}>
                        {course.description}
                      </p>

                      <div
                        className="flex items-center justify-between pt-4 mt-auto"
                        style={{ borderTop: "1px solid var(--border)" }}
                      >
                        <span className="text-xs" style={{ color: "var(--text-subtle)" }}>
                          Free · {course.lessons?.length || 0} lessons
                        </span>
                        <span className="text-xs font-semibold" style={{ color: "var(--accent)" }}>
                          Start Learning →
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
