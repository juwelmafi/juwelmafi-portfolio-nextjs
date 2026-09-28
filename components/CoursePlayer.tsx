"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Course, Lesson } from "@/types";

interface Props {
  course: Course;
}

export default function CoursePlayer({ course }: Props) {
  const [activeLesson, setActiveLesson] = useState<Lesson>(course.lessons[0]);

  return (
    /* Full page wrapper — no max-w restriction so it fills the viewport properly */
    <div className="w-full min-h-screen" style={{ background: "var(--bg-base)" }}>
      {/* Page header bar */}
      <div
        className="w-full px-4 sm:px-6 lg:px-10 py-4 flex items-center gap-3"
        style={{ borderBottom: "1px solid var(--border)", background: "var(--bg-elevated)" }}
      >
        <Link
          href="/courses"
          className="inline-flex items-center gap-2 text-sm transition-colors hover:text-white"
          style={{ color: "var(--text-muted)" }}
        >
          ← All Courses
        </Link>
        <span className="text-white/20 text-xs">•</span>
        <span className="text-sm text-white/60 truncate">{course.title}</span>
      </div>

      {/* Two-column layout: video + playlist */}
      <div className="flex flex-col xl:flex-row gap-0 w-full">

        {/* ── LEFT: Video + lesson info ─────────────────────── */}
        <div className="flex-1 min-w-0 px-4 sm:px-6 lg:px-8 xl:px-10 py-8">

          {/* Video player */}
          <div
            className="relative w-full rounded-2xl overflow-hidden shadow-2xl"
            style={{
              aspectRatio: "16/9",
              background: "#000",
              boxShadow: "0 0 80px rgba(0,222,81,0.10), 0 20px 60px rgba(0,0,0,0.6)",
            }}
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
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-white/40 text-lg">Video unavailable</span>
              </div>
            )}
          </div>

          {/* Active lesson info */}
          <div className="mt-6">
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <span
                className="text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider"
                style={{ background: "rgba(0,222,81,0.12)", color: "var(--accent)" }}
              >
                {course.category}
              </span>
              <span className="text-xs font-medium" style={{ color: "var(--text-subtle)" }}>
                ⏱ {activeLesson.duration}
              </span>
            </div>

            <h1
              className="text-white font-bold text-xl sm:text-2xl lg:text-3xl leading-tight mb-3"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              {activeLesson.title}
            </h1>

            {activeLesson.summary && (
              <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                {activeLesson.summary}
              </p>
            )}
          </div>

          {/* Code snippet */}
          {activeLesson.codeSnippet && (
            <div
              className="rounded-xl overflow-hidden mt-6"
              style={{ background: "#0d1117", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <div
                className="flex items-center gap-2 px-4 py-2.5"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  borderBottom: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <span className="w-3 h-3 rounded-full bg-red-500/70" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
                <span className="w-3 h-3 rounded-full bg-green-500/70" />
                <span
                  className="text-xs ml-3"
                  style={{ color: "var(--text-subtle)", fontFamily: "JetBrains Mono, monospace" }}
                >
                  code.tsx
                </span>
              </div>
              <pre
                className="text-xs sm:text-sm p-5 overflow-x-auto leading-relaxed"
                style={{ color: "#e6edf3", fontFamily: "JetBrains Mono, monospace" }}
              >
                <code>{activeLesson.codeSnippet}</code>
              </pre>
            </div>
          )}

          {/* About this course */}
          <div
            className="mt-8 p-6 rounded-2xl"
            style={{ background: "var(--bg-elevated)", border: "1px solid var(--border)" }}
          >
            <h2 className="text-white font-bold text-base mb-2">About This Course</h2>
            <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
              {course.description}
            </p>
            <div className="flex flex-wrap gap-6 mt-5">
              {[
                { label: "Level",   value: course.level },
                { label: "Lessons", value: course.lessons.length },
                { label: "Price",   value: "Free", accent: true },
              ].map((item) => (
                <div key={item.label}>
                  <span
                    className="text-xs uppercase tracking-wider block mb-1"
                    style={{ color: "var(--text-subtle)" }}
                  >
                    {item.label}
                  </span>
                  <span
                    className="text-sm font-bold"
                    style={{ color: item.accent ? "var(--accent)" : "white" }}
                  >
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom padding so footer doesn't clip content */}
          <div className="h-16" />
        </div>

        {/* ── RIGHT: Lesson Playlist sidebar ───────────────── */}
        <div
          className="xl:w-96 shrink-0 xl:sticky xl:top-16 xl:self-start xl:max-h-[calc(100vh-4rem)] xl:overflow-y-auto"
          style={{ borderLeft: "1px solid var(--border)" }}
        >
          {/* Course thumbnail */}
          <div className="relative h-44 overflow-hidden shrink-0">
            {course.thumbnail ? (
              <Image src={course.thumbnail} alt={course.title} fill className="object-cover" />
            ) : (
              <div className="w-full h-full" style={{ background: "linear-gradient(135deg, #0A0A14, #1A1A2E)" }} />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-base)] via-black/30 to-transparent" />
            <div className="absolute bottom-0 left-0 p-4">
              <p className="text-white font-bold text-sm leading-tight line-clamp-2 pr-2">{course.title}</p>
              <p className="text-xs mt-1" style={{ color: "var(--accent)" }}>
                {course.lessons.length} lessons · Free
              </p>
            </div>
          </div>

          {/* Playlist header */}
          <div
            className="px-4 py-3"
            style={{ borderBottom: "1px solid var(--border)", background: "var(--bg-elevated)" }}
          >
            <p className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--text-subtle)" }}>
              Course Content · {course.lessons.length} Lessons
            </p>
          </div>

          {/* Lesson list */}
          <div>
            {course.lessons.map((lesson, index) => {
              const isActive = activeLesson.youtubeId === lesson.youtubeId ||
                               (!activeLesson.youtubeId && index === 0);
              return (
                <button
                  key={lesson.id || index}
                  onClick={() => setActiveLesson(lesson)}
                  className="w-full text-left px-4 py-4 flex items-start gap-3 transition-all duration-200"
                  style={{
                    background: isActive ? "rgba(0,222,81,0.08)" : "transparent",
                    borderLeft: isActive ? "3px solid var(--accent)" : "3px solid transparent",
                    borderBottom: "1px solid var(--border)",
                  }}
                >
                  {/* Number / play icon */}
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                    style={{
                      background: isActive ? "var(--accent)" : "rgba(255,255,255,0.07)",
                    }}
                  >
                    {isActive ? (
                      <svg className="w-3.5 h-3.5 ml-0.5" fill="#000" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    ) : (
                      <span className="text-xs font-bold" style={{ color: "var(--text-muted)" }}>
                        {index + 1}
                      </span>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p
                      className="text-xs font-semibold leading-snug"
                      style={{
                        color: isActive ? "var(--accent)" : "var(--text-primary)",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {lesson.title}
                    </p>
                    <p className="text-[10px] mt-1" style={{ color: "var(--text-subtle)" }}>
                      {lesson.duration}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
