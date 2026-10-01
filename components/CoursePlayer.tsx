"use client";

import { useState } from "react";
import Link from "next/link";
import { Course, Lesson } from "@/types";

interface Props {
  course: Course;
}

export default function CoursePlayer({ course }: Props) {
  const [activeLesson, setActiveLesson] = useState<Lesson>(course.lessons[0]);

  return (
    <div className="w-full">
      
      {/* Return to Explore Hub Breadcrumb */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <Link
          href="/explore"
          className="inline-flex items-center gap-2 font-hand text-lg text-[#191712] hover:underline"
        >
          ← Return to Explore Hub
        </Link>
        <span className="font-typewriter text-xs text-[#78716C]">
          COURSE DOSSIER: #{course.slug.toUpperCase()}
        </span>
      </div>

      {/* Two-Column Grid: Video Player + Playlist Docket */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

        {/* ── LEFT COLUMN (8 cols): Video + Active Lesson Info + Code ── */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Main Hand-drawn Video Card */}
          <div className="hand-box p-5 sm:p-7 bg-[#FFFFFF] relative">
            
            {/* Top Docket Bar */}
            <div className="flex items-center justify-between border-b-2 border-[#191712] pb-3 mb-5 font-typewriter text-xs text-[#191712]">
              <span className="font-bold">
                LESSON #{String((course.lessons.findIndex(l => l.title === activeLesson.title) + 1)).padStart(2, "0")} OF {String(course.lessons.length).padStart(2, "0")}
              </span>
              <span className="bg-[#FFE45E] border border-[#191712] px-2 py-0.5 text-[11px] font-bold">
                NOW PLAYING
              </span>
            </div>

            {/* Video Iframe Container */}
            <div
              className="relative w-full border-2 border-[#191712] rounded-md overflow-hidden shadow-[4px_5px_0px_#191712] bg-[#191712]"
              style={{ aspectRatio: "16/9" }}
            >
              {activeLesson.youtubeId ? (
                <iframe
                  key={activeLesson.youtubeId}
                  className="absolute inset-0 w-full h-full"
                  src={`https://www.youtube.com/embed/${activeLesson.youtubeId}?rel=0&modestbranding=1`}
                  title={activeLesson.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center font-hand text-xl text-[#FBF6E6]">
                  Video unavailable for this lesson
                </div>
              )}
            </div>

            {/* Active Lesson Meta & Title */}
            <div className="mt-6">
              <div className="flex flex-wrap items-center gap-3 mb-2 font-typewriter text-xs text-[#78716C]">
                <span className="text-[#C2410C] font-bold uppercase tracking-wider">
                  {course.category}
                </span>
                <span>•</span>
                <span>⏱ {activeLesson.duration || "20 mins"}</span>
              </div>

              <h1 className="font-script font-bold text-3xl sm:text-4xl text-[#191712] leading-tight mb-3">
                {activeLesson.title}
              </h1>

              {activeLesson.summary && (
                <p className="font-hand text-lg text-[#57534E] leading-relaxed">
                  {activeLesson.summary}
                </p>
              )}
            </div>

            {/* Code Snippet Box (Retro Notebook Style) */}
            {activeLesson.codeSnippet && (
              <div className="mt-8 border-2 border-[#191712] rounded-md bg-[#FAF7EE] overflow-hidden">
                <div className="flex items-center justify-between border-b-2 border-[#191712] px-4 py-2 bg-[#E7DFCE] font-typewriter text-xs text-[#191712]">
                  <span className="font-bold">DOCUMENT: code.tsx</span>
                  <span>SNIPPET</span>
                </div>
                <pre className="p-4 sm:p-5 overflow-x-auto font-typewriter text-xs sm:text-sm text-[#191712] leading-relaxed">
                  <code>{activeLesson.codeSnippet}</code>
                </pre>
              </div>
            )}

          </div>

          {/* About This Course Card */}
          <div className="hand-box p-6 sm:p-8 bg-[#FFFFFF]">
            <p className="retro-eyebrow mb-1">
              CURRICULUM SPECIFICATION
            </p>
            <h2 className="font-script font-bold text-2xl sm:text-3xl text-[#191712] mb-2">
              About This Masterclass
            </h2>
            <p className="font-hand text-base sm:text-lg text-[#57534E] leading-relaxed mb-6">
              {course.description}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-[#191712]/20 font-typewriter text-xs">
              <div>
                <span className="text-[#78716C] block uppercase mb-1">Level</span>
                <strong className="text-sm text-[#191712]">{course.level || "Intermediate"}</strong>
              </div>
              <div>
                <span className="text-[#78716C] block uppercase mb-1">Lessons</span>
                <strong className="text-sm text-[#191712]">{course.lessons.length} Modules</strong>
              </div>
              <div>
                <span className="text-[#78716C] block uppercase mb-1">Access</span>
                <strong className="text-sm text-[#16A34A]">100% Free</strong>
              </div>
              <div>
                <span className="text-[#78716C] block uppercase mb-1">Format</span>
                <strong className="text-sm text-[#191712]">HD Video + Code</strong>
              </div>
            </div>
          </div>

        </div>

        {/* ── RIGHT COLUMN (4 cols): Playlist Docket ── */}
        <div className="lg:col-span-4 sticky top-24 space-y-6">
          
          <div className="hand-box p-5 sm:p-6 bg-[#FFFFFF]">
            
            {/* Playlist Header */}
            <div className="border-b-2 border-[#191712] pb-4 mb-4">
              <span className="font-typewriter text-[11px] uppercase tracking-wider text-[#C2410C] font-bold block mb-1">
                COURSE PLAYLIST
              </span>
              <h2 className="font-script font-bold text-2xl text-[#191712] leading-tight">
                {course.title}
              </h2>
              <span className="font-typewriter text-xs text-[#78716C] block mt-1">
                {course.lessons.length} Lessons Available
              </span>
            </div>

            {/* Lesson List */}
            <div className="space-y-2">
              {course.lessons.map((lesson, idx) => {
                const isActive = lesson.title === activeLesson.title;
                const lessonNum = String(idx + 1).padStart(2, "0");

                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveLesson(lesson)}
                    className={`w-full text-left p-3 rounded-md transition-all flex items-start gap-3 cursor-pointer ${
                      isActive
                        ? "bg-[#FFE45E] border-2 border-[#191712] text-[#191712] shadow-[2px_2px_0px_#191712]"
                        : "hover:bg-[#FAF7EE] border border-transparent text-[#292524]"
                    }`}
                  >
                    <span className="font-typewriter font-bold text-xs shrink-0 pt-0.5">
                      {lessonNum}.
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="font-hand font-bold text-base leading-snug truncate">
                        {lesson.title}
                      </p>
                      {lesson.duration && (
                        <span className="font-typewriter text-[10px] text-[#78716C]">
                          {lesson.duration}
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Bottom Support / Inquire Note */}
            <div className="mt-6 pt-4 border-t border-[#191712]/20 text-center">
              <p className="font-hand text-sm text-[#78716C] mb-3">
                Have questions or need technical support?
              </p>
              <a
                href="/contact"
                className="btn-small text-xs py-1.5 px-4 w-full justify-center"
              >
                Ask a Question →
              </a>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
