"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Blog, Course } from "@/types";

interface ExploreHubClientProps {
  blogs: Blog[];
  courses: Course[];
}

export default function ExploreHubClient({ blogs, courses }: ExploreHubClientProps) {
  // Master Switch Tab: 'blogs' or 'courses'
  const [activeMasterTab, setActiveMasterTab] = useState<"blogs" | "courses">("blogs");

  // Blog category filters
  const blogCategories = [
    "All",
    "Tech",
    "Skill",
    "Personal Brand",
    "Self-Development",
    "Other",
  ];

  const [activeBlogCat, setActiveBlogCat] = useState("All");

  const filteredBlogs = useMemo(() => {
    if (activeBlogCat === "All") return blogs;
    return blogs.filter((b) => {
      const cat = (b.category || "").toLowerCase().trim();
      const target = activeBlogCat.toLowerCase().trim();
      if (target === "other") {
        return (
          !cat ||
          !["tech", "skill", "personal brand", "self-development"].includes(cat)
        );
      }
      return cat.includes(target);
    });
  }, [blogs, activeBlogCat]);

  return (
    <div className="py-8 sm:py-12">
      
      {/* Master Switch Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
        <button
          type="button"
          onClick={() => setActiveMasterTab("blogs")}
          className={`font-hand text-lg sm:text-xl font-bold py-3 px-7 border-2 border-[#191712] rounded-full transition-all cursor-pointer ${
            activeMasterTab === "blogs"
              ? "bg-[#191712] text-[#FBF6E6] shadow-[3px_3px_0px_#191712] translate-x-0.5 translate-y-0.5"
              : "bg-[#FFFFFF] text-[#191712] shadow-[3px_3px_0px_#191712] hover:bg-[#FFE45E]"
          }`}
        >
          Articles &amp; Essays ({blogs.length})
        </button>

        <button
          type="button"
          onClick={() => setActiveMasterTab("courses")}
          className={`font-hand text-lg sm:text-xl font-bold py-3 px-7 border-2 border-[#191712] rounded-full transition-all cursor-pointer ${
            activeMasterTab === "courses"
              ? "bg-[#191712] text-[#FBF6E6] shadow-[3px_3px_0px_#191712] translate-x-0.5 translate-y-0.5"
              : "bg-[#FFFFFF] text-[#191712] shadow-[3px_3px_0px_#191712] hover:bg-[#FFE45E]"
          }`}
        >
          Masterclasses &amp; Video Courses ({courses.length})
        </button>
      </div>

      {/* ======================================================== */}
      {/* TAB 1: BLOGS & ARTICLES (Matching Project Card Structure) */}
      {/* ======================================================== */}
      {activeMasterTab === "blogs" && (
        <div>
          {/* Category Filter Tabs (Same pill style as Projects) */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
            {blogCategories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveBlogCat(cat)}
                className={`px-4 py-1.5 border-2 border-[#191712] rounded-full font-hand text-base transition-all ${
                  activeBlogCat === cat
                    ? "bg-[#191712] text-[#FBF6E6] shadow-[2px_2px_0px_#191712]"
                    : "bg-[#FFFFFF] text-[#191712] hover:bg-[#FFE45E]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Blogs Grid (2 columns, identical to project cards) */}
          {filteredBlogs.length === 0 ? (
            <div className="hand-box p-12 text-center bg-[#FFFFFF] max-w-xl mx-auto">
              <span className="stamp-gold-cert mx-auto mb-4">NO ARTICLES</span>
              <p className="font-hand text-lg text-[#57534E]">
                No articles published under this category yet. Check back soon!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredBlogs.map((blog, idx) => {
                const articleId = `ART-${String(idx + 1).padStart(3, "0")}`;
                const dateStr = blog.createdAt
                  ? new Date(blog.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })
                  : "Latest";
                const readTime = `${Math.max(1, Math.ceil((blog.content?.split(/\s+/).length || 200) / 200))} min read`;
                const displayImg = blog.coverImage || "/assets/images/portfolio/portfolio-1.jpg";

                return (
                  <article
                    key={blog.id || idx}
                    className="hand-box flex flex-col bg-[#FFFFFF] overflow-hidden"
                  >
                    {/* Docket Header (Identical to project card) */}
                    <div className="flex items-center justify-between border-b-2 border-[#191712] px-5 py-3 bg-[#FAF7EE]">
                      <span className="font-typewriter font-bold text-xs text-[#191712]">
                        {articleId}
                      </span>
                      <span className="font-typewriter text-[11px] bg-[#E7DFCE] border border-[#191712] px-2 py-0.5 rounded text-[#191712]">
                        {blog.category || "General"}
                      </span>
                    </div>

                    {/* Screenshot / Cover Image */}
                    <div className="relative border-b-2 border-[#191712] bg-[#191712]/5 overflow-hidden group">
                      <img
                        src={displayImg}
                        alt={blog.title}
                        className="w-full h-52 sm:h-60 object-cover object-top transition-transform duration-300 group-hover:scale-[1.02]"
                        loading="lazy"
                      />
                    </div>

                    {/* Content Section */}
                    <div className="p-6 flex-1 flex flex-col justify-between">
                      <div>
                        {/* Date & Read time */}
                        <div className="flex items-center gap-3 font-typewriter text-xs text-[#78716C] mb-2.5">
                          <span>DATE: {dateStr}</span>
                          <span>•</span>
                          <span>{readTime}</span>
                        </div>

                        <h3 className="font-script font-bold text-2xl sm:text-3xl text-[#191712] mb-2 leading-tight">
                          <Link href={`/blog/${blog.slug}`} className="hover:underline">
                            {blog.title}
                          </Link>
                        </h3>

                        <p className="font-hand text-base sm:text-lg text-[#57534E] leading-relaxed mb-4 line-clamp-3">
                          {blog.excerpt || "Explore technical principles, architecture breakdowns, and full-stack implementation details."}
                        </p>

                        {/* Tags */}
                        {blog.tags && blog.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 mb-6">
                            {blog.tags.slice(0, 3).map((t, i) => (
                              <span
                                key={i}
                                className="font-typewriter text-[11px] bg-[#FAF7EE] border border-[#191712] px-2 py-0.5 text-[#191712]"
                              >
                                #{t}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Actions Footer */}
                      <div className="flex items-center justify-between pt-4 border-t border-[#191712]/20">
                        <Link
                          href={`/blog/${blog.slug}`}
                          className="btn-small"
                        >
                          Read Article →
                        </Link>
                        <span className="font-typewriter text-[11px] text-[#78716C]">
                          FREE ACCESS
                        </span>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 2: MASTERCLASSES & COURSES (Matching Project Cards)  */}
      {/* ======================================================== */}
      {activeMasterTab === "courses" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {courses.map((course, idx) => {
            const courseSerial = `CRS-${String(idx + 1).padStart(3, "0")}`;
            const lessonCount = course.lessons?.length || 0;
            const displayImg = course.thumbnail || "/assets/images/section/service-1.jpg";

            return (
              <article
                key={course.id || idx}
                className="hand-box flex flex-col bg-[#FFFFFF] overflow-hidden"
              >
                {/* Docket Header (Identical to project card) */}
                <div className="flex items-center justify-between border-b-2 border-[#191712] px-5 py-3 bg-[#FAF7EE]">
                  <span className="font-typewriter font-bold text-xs text-[#191712]">
                    {courseSerial}
                  </span>
                  <span className="font-typewriter text-[11px] bg-[#E7DFCE] border border-[#191712] px-2 py-0.5 rounded text-[#191712]">
                    {course.category || "Full-Stack Development"}
                  </span>
                </div>

                {/* Cover Thumbnail with Free Course Ribbon */}
                <div className="relative border-b-2 border-[#191712] bg-[#191712]/5 overflow-hidden group">
                  <img
                    src={displayImg}
                    alt={course.title}
                    className="w-full h-52 sm:h-60 object-cover object-top transition-transform duration-300 group-hover:scale-[1.02]"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3 bg-[#FFE45E] text-[#191712] border-2 border-[#191712] px-2.5 py-0.5 font-hand text-xs font-bold shadow-[2px_2px_0px_#191712]">
                    ★ FREE COURSE
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Meta info */}
                    <div className="flex items-center gap-3 font-typewriter text-xs text-[#78716C] mb-2.5">
                      <span>LEVEL: {course.level || "Intermediate"}</span>
                      <span>•</span>
                      <span>{lessonCount} LESSONS</span>
                    </div>

                    <h3 className="font-script font-bold text-2xl sm:text-3xl text-[#191712] mb-2 leading-tight">
                      <Link href={`/courses/${course.slug}`} className="hover:underline">
                        {course.title}
                      </Link>
                    </h3>

                    <p className="font-hand text-base sm:text-lg text-[#57534E] leading-relaxed mb-4">
                      {course.description}
                    </p>

                    {/* Curriculum Preview Box */}
                    {course.lessons && course.lessons.length > 0 && (
                      <div className="bg-[#FAF7EE] border-2 border-[#191712] rounded-md p-3.5 mb-5 font-hand text-sm text-[#191712]">
                        <span className="font-typewriter font-bold text-[11px] uppercase tracking-wider text-[#78716C] block mb-2">
                          Curriculum Preview:
                        </span>
                        <ul className="space-y-1">
                          {course.lessons.slice(0, 2).map((l, i) => (
                            <li key={i} className="flex items-center gap-2 truncate">
                              <span className="text-[#C2410C]">▶</span>
                              <span className="truncate">{l.title}</span>
                              {l.duration && (
                                <span className="font-typewriter text-[10px] text-[#78716C] shrink-0">
                                  ({l.duration})
                                </span>
                              )}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Actions Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-[#191712]/20">
                    <Link
                      href={`/courses/${course.slug}`}
                      className="btn-small"
                    >
                      Start Masterclass →
                    </Link>
                    <span className="font-typewriter text-[11px] text-[#78716C]">
                      VIDEO TUTORIALS
                    </span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}

    </div>
  );
}
