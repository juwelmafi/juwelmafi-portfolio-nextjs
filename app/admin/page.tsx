"use client";
import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  FaSearch,
  FaArrowUp,
  FaProjectDiagram,
  FaGraduationCap,
  FaCogs,
  FaBlog,
  FaPlus,
  FaExternalLinkAlt,
  FaCalendarAlt,
  FaDatabase
} from "react-icons/fa";
import Swal from "sweetalert2";

interface ProjectItem {
  id?: string;
  _id?: string;
  title: string;
  category?: string;
  slug?: string;
}

interface CourseItem {
  id?: string;
  _id?: string;
  title: string;
  slug?: string;
  totalLessons?: number;
}

interface BlogItem {
  id?: string;
  _id?: string;
  title: string;
  slug?: string;
  published?: boolean;
}

interface ServiceItem {
  id?: string;
  _id?: string;
  title: string;
}

function CircularGauge({
  percentage,
  strokeColor = "#00DE51",
  size = 52,
  strokeWidth = 4.5,
}: {
  percentage: number;
  strokeColor?: string;
  size?: number;
  strokeWidth?: number;
}) {
  const radius = (size - strokeWidth * 2) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div
      className="relative flex items-center justify-center flex-shrink-0 rounded-full bg-[#0D101C] shadow-inner"
      style={{ width: size + 6, height: size + 6 }}
    >
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="rgba(255,255,255,0.08)"
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          fill="transparent"
          style={{ transition: "stroke-dashoffset 1s ease-in-out" }}
        />
      </svg>
      <span className="absolute text-[11px] font-extrabold text-white tracking-tight">
        {percentage}%
      </span>
    </div>
  );
}

export default function AdminDashboard() {
  const [counts, setCounts] = useState({ services: 0, projects: 0, blogs: 0, courses: 0 });
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [courses, setCourses] = useState<CourseItem[]>([]);
  const [blogs, setBlogs] = useState<BlogItem[]>([]);
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [seeding, setSeeding] = useState(false);

  const refreshData = () => {
    Promise.all([
      fetch("/api/services?all=true").then((r) => r.json()).catch(() => []),
      fetch("/api/projects").then((r) => r.json()).catch(() => []),
      fetch("/api/blogs?published=false").then((r) => r.json()).catch(() => []),
      fetch("/api/courses?all=true").then((r) => r.json()).catch(() => []),
    ]).then(([servicesData, projectsData, blogsData, coursesData]) => {
      const s = Array.isArray(servicesData) ? servicesData : [];
      const p = Array.isArray(projectsData) ? projectsData : [];
      const b = Array.isArray(blogsData) ? blogsData : [];
      const c = Array.isArray(coursesData) ? coursesData : [];

      setServices(s);
      setProjects(p);
      setBlogs(b);
      setCourses(c);

      setCounts({
        services: s.length,
        projects: p.length,
        blogs: b.length,
        courses: c.length,
      });
      setLoading(false);
    });
  };

  useEffect(() => {
    refreshData();
  }, []);

  const handleSeed = async () => {
    const confirm = await Swal.fire({
      title: "Seed Default Data?",
      text: "This will seed default projects, blogs, and starter video courses into MongoDB if missing.",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#00DE51",
      cancelButtonColor: "#2C3148",
      confirmButtonText: "Yes, seed database",
      background: "#121422",
      color: "#F0F0F5",
    });

    if (!confirm.isConfirmed) return;

    setSeeding(true);
    try {
      const res = await fetch("/api/seed", { method: "POST" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to seed");

      await Swal.fire({
        title: "Success!",
        text: data.message,
        icon: "success",
        background: "#121422",
        color: "#F0F0F5",
        confirmButtonColor: "#00DE51",
      });
      refreshData();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to seed";
      Swal.fire({
        title: "Notice",
        text: msg,
        icon: "info",
        background: "#121422",
        color: "#F0F0F5",
      });
    } finally {
      setSeeding(false);
    }
  };

  // Metric percentages for circular gauges
  const projectPct = Math.min(100, Math.max(15, counts.projects > 0 ? Math.min(100, counts.projects * 15) : 75));
  const coursePct  = Math.min(100, Math.max(25, counts.courses > 0 ? Math.min(100, counts.courses * 35) : 88));
  const blogPct    = Math.min(100, Math.max(10, counts.blogs > 0 ? Math.min(100, counts.blogs * 20) : 20));

  // Dynamic notes derived from live database
  const notes = useMemo(() => {
    const list: Array<{ id: string; title: string; subtitle: string; date: string; link: string; icon: string }> = [];

    if (projects.length > 0) {
      list.push({
        id: "proj-" + (projects[0].id || "1"),
        title: projects[0].title,
        subtitle: "Production web application & live deployment registered in database.",
        date: "28 Sep",
        link: "/admin/projects",
        icon: "🚀",
      });
    } else {
      list.push({
        id: "proj-def",
        title: "Next.js Full-Stack Architecture",
        subtitle: "Dynamic SSR and MongoDB aggregation pipelines connected.",
        date: "12 June",
        link: "/admin/projects",
        icon: "⚡",
      });
    }

    if (courses.length > 0) {
      list.push({
        id: "course-" + (courses[0].id || "2"),
        title: courses[0].title,
        subtitle: `Course published with ${courses[0].totalLessons || 6} interactive video lessons.`,
        date: "18 June",
        link: "/admin/courses",
        icon: "🎓",
      });
    } else {
      list.push({
        id: "course-def",
        title: "MERN Stack Mastery Series",
        subtitle: "Comprehensive curriculum with video tutorials and code repositories.",
        date: "15 June",
        link: "/admin/courses",
        icon: "🎥",
      });
    }

    if (blogs.length > 0) {
      list.push({
        id: "blog-" + (blogs[0].id || "3"),
        title: blogs[0].title,
        subtitle: "Technical article written with markdown support and live read metrics.",
        date: "25 June",
        link: "/admin/blogs",
        icon: "✍️",
      });
    } else {
      list.push({
        id: "service-def",
        title: "Core Services & API Engineering",
        subtitle: "Custom SaaS dashboards, REST APIs, and high-performance UI solutions.",
        date: "21 June",
        link: "/admin/services",
        icon: "🛠️",
      });
    }

    if (!searchQuery) return list;
    return list.filter((n) =>
      n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.subtitle.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [projects, courses, blogs, searchQuery]);

  return (
    <div className="flex-1 flex flex-col justify-between space-y-5 lg:space-y-6">
      {/* ── Top Workspace Header (Max 32px desktop, 26px phone heading scale) ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
        <div>
          <h1 className="text-[26px] lg:text-[32px] font-bold tracking-tight text-white leading-tight">
            Hello Juwel
          </h1>
          <p className="text-xs sm:text-sm text-[#888899] mt-0.5 font-medium">
            MERN Stack portfolio control, live analytics &amp; content engine
          </p>
        </div>

        {/* Search input & User Avatar Pill (High-contrast emerald theme) */}
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex items-center flex-1 sm:flex-initial w-full sm:w-auto">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search..."
              className="w-full sm:w-52 md:w-60 bg-[#161928] text-white text-xs sm:text-sm pl-4 pr-10 py-2 rounded-full placeholder-[#888899] focus:outline-none focus:ring-1 focus:ring-[#00DE51]/70 transition-all border-none"
            />
            <FaSearch className="absolute right-3.5 text-xs text-[#00DE51] pointer-events-none" />
          </div>

          {/* Avatar with emerald green ring & fallback initial JH */}
          <div className="w-10 h-10 rounded-full ring-2 ring-[#00DE51] ring-offset-2 ring-offset-[#0F111D] bg-[#00DE51]/20 flex items-center justify-center font-bold text-sm text-[#00DE51] overflow-hidden flex-shrink-0 relative shadow-md">
            <span className="font-bold text-sm text-[#00DE51]">JH</span>
            <Image
              src="/assets/images/user/user-1.jpg"
              alt="Juwel"
              width={40}
              height={40}
              className="w-full h-full object-cover absolute inset-0"
              onError={(e) => {
                // Keep fallback JH visible
                (e.currentTarget as HTMLElement).style.display = "none";
              }}
            />
          </div>
        </div>
      </div>

      {/* ── Overview Section (3 Circular Gauge Glass Drop Cards) ── */}
      <div>
        <h2 className="text-[18px] lg:text-[20px] font-bold text-[#00DE51] mb-3 tracking-wide">
          Overview
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4 lg:gap-5">
          {/* Card 1: Projects */}
          <Link
            href="/admin/projects"
            className="dashboard-metric-card group no-underline"
          >
            <CircularGauge
              percentage={loading ? 75 : projectPct}
              strokeColor="#00DE51"
            />
            <div className="flex-1 min-w-0">
              <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-[#00DE51] transition-colors">
                Projects
              </h3>
              <p className="text-xs text-[#888899] truncate mt-0.5">
                {counts.projects} live works
              </p>
            </div>
            <div className="flex items-center gap-1 text-[11px] font-semibold text-[#00DE51] bg-[#00DE51]/10 px-2 py-0.5 rounded-md flex-shrink-0">
              <FaArrowUp className="text-[9px]" />
              <span>+15%</span>
            </div>
          </Link>

          {/* Card 2: Courses */}
          <Link
            href="/admin/courses"
            className="dashboard-metric-card group no-underline"
          >
            <CircularGauge
              percentage={loading ? 88 : coursePct}
              strokeColor="#33FF77"
            />
            <div className="flex-1 min-w-0">
              <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-[#00DE51] transition-colors">
                Courses
              </h3>
              <p className="text-xs text-[#888899] truncate mt-0.5">
                {counts.courses} masterclasses
              </p>
            </div>
            <div className="flex items-center gap-1 text-[11px] font-semibold text-[#00DE51] bg-[#00DE51]/10 px-2 py-0.5 rounded-md flex-shrink-0">
              <FaArrowUp className="text-[9px]" />
              <span>+21%</span>
            </div>
          </Link>

          {/* Card 3: Offerings & Blogs */}
          <Link
            href="/admin/blogs"
            className="dashboard-metric-card group no-underline sm:col-span-2 lg:col-span-1"
          >
            <CircularGauge
              percentage={loading ? 20 : blogPct}
              strokeColor="#20C997"
            />
            <div className="flex-1 min-w-0">
              <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-[#00DE51] transition-colors">
                Articles
              </h3>
              <p className="text-xs text-[#888899] truncate mt-0.5">
                {counts.blogs} published blogs
              </p>
            </div>
            <div className="flex items-center gap-1 text-[11px] font-semibold text-[#00DE51] bg-[#00DE51]/10 px-2 py-0.5 rounded-md flex-shrink-0">
              <FaArrowUp className="text-[9px]" />
              <span>+12%</span>
            </div>
          </Link>
        </div>
      </div>

      {/* ── Bottom Grid (Timeline Wave Area Chart + Notes Stack) ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-5 flex-1">
        
        {/* Left Column: Timeline (~65% width = 7/12 or 8/12 on lg) */}
        <div className="lg:col-span-7 xl:col-span-8 dashboard-content-card flex flex-col justify-between relative overflow-hidden">
          {/* Header Row */}
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="text-[18px] lg:text-[20px] font-bold text-white">Timeline</h3>
              <p className="text-xs text-[#888899]">Visitor trends &amp; weekly portfolio interaction</p>
            </div>

            {/* Elevated Metric Pill in Top Right */}
            <div className="bg-[#1A1E2F] px-3 py-1 rounded-xl flex flex-col items-end shadow-sm">
              <span className="text-[11px] font-medium text-white/90">Portfolio Reach</span>
              <span className="text-[11px] text-[#00DE51] font-bold flex items-center gap-1">
                <FaArrowUp className="text-[9px]" /> +21%
              </span>
            </div>
          </div>

          {/* SVG Wave Chart (Black & Emerald glowing curves) */}
          <div className="relative w-full h-48 sm:h-56 lg:h-64 my-auto">
            {/* Y-Axis Labels */}
            <div className="absolute left-0 top-0 bottom-6 flex flex-col justify-between text-[11px] text-[#888899] font-medium pr-2">
              <span>100</span>
              <span>80</span>
              <span>60</span>
              <span>40</span>
              <span>20</span>
              <span>0</span>
            </div>

            {/* Grid Lines + Wave SVG Container */}
            <div className="ml-8 h-full flex flex-col justify-between relative">
              {/* Subtle Horizontal Grid Lines */}
              <div className="absolute inset-0 bottom-6 flex flex-col justify-between pointer-events-none">
                <div className="w-full h-[1px] bg-white/[0.03]" />
                <div className="w-full h-[1px] bg-white/[0.03]" />
                <div className="w-full h-[1px] bg-white/[0.03]" />
                <div className="w-full h-[1px] bg-white/[0.03]" />
                <div className="w-full h-[1px] bg-white/[0.03]" />
                <div className="w-full h-[1px] bg-white/[0.03]" />
              </div>

              {/* Multi-Wave SVG (Emerald Green Glow) */}
              <svg
                viewBox="0 0 600 200"
                preserveAspectRatio="none"
                className="w-full h-[calc(100%-1.5rem)] relative z-10 overflow-visible"
              >
                <defs>
                  {/* Glowing Emerald Gradient Fill */}
                  <linearGradient id="emeraldGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#00DE51" stopOpacity="0.45" />
                    <stop offset="60%" stopColor="#00B843" stopOpacity="0.12" />
                    <stop offset="100%" stopColor="#0A0A14" stopOpacity="0" />
                  </linearGradient>

                  {/* Secondary Cyan/Teal Gradient Fill */}
                  <linearGradient id="mintGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#20C997" stopOpacity="0.22" />
                    <stop offset="100%" stopColor="#0A0A14" stopOpacity="0" />
                  </linearGradient>
                </defs>

                {/* Wave 3: Deep subtle backing area */}
                <path
                  d="M 0 145 C 60 120, 110 155, 170 120 C 230 85, 280 140, 340 100 C 400 65, 460 135, 520 110 C 560 95, 580 120, 600 125 L 600 200 L 0 200 Z"
                  fill="url(#mintGradient)"
                />

                {/* Wave 1: Main Filled Emerald Gradient Area */}
                <path
                  d="M 0 130 C 60 95, 110 145, 170 105 C 230 65, 270 130, 330 90 C 390 55, 430 130, 490 105 C 540 85, 570 115, 600 110 L 600 200 L 0 200 Z"
                  fill="url(#emeraldGradient)"
                />

                {/* Wave 1 Emerald Stroke Contour Line */}
                <path
                  d="M 0 130 C 60 95, 110 145, 170 105 C 230 65, 270 130, 330 90 C 390 55, 430 130, 490 105 C 540 85, 570 115, 600 110"
                  fill="none"
                  stroke="#00DE51"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />

                {/* Wave 2: Glowing Overlapping White/Silver Stroke Curve */}
                <path
                  d="M 0 115 C 50 125, 95 65, 155 85 C 215 110, 275 40, 335 90 C 395 140, 455 45, 525 75 C 565 90, 585 105, 600 110"
                  fill="none"
                  stroke="rgba(255, 255, 255, 0.9)"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>

              {/* X-Axis Days Labels (Day 1 through Day 8) */}
              <div className="flex items-center justify-between text-[11px] text-[#888899] pt-2 font-medium px-1">
                <span>Day 1</span>
                <span>Day 2</span>
                <span>Day 3</span>
                <span>Day 4</span>
                <span>Day 5</span>
                <span>Day 6</span>
                <span>Day 7</span>
                <span>Day 8</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Notes (~35% width = 5/12 or 4/12 on lg) */}
        <div className="lg:col-span-5 xl:col-span-4 dashboard-content-card flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-[18px] lg:text-[20px] font-bold text-white">Notes</h3>
              <span className="text-xs text-[#00DE51] font-semibold bg-[#00DE51]/10 px-2 py-0.5 rounded-full">
                {notes.length} updates
              </span>
            </div>

            {/* Stack of 3 Borderless Glass Drop Item Pills */}
            <div className="space-y-2">
              {notes.map((note) => (
                <Link
                  key={note.id}
                  href={note.link}
                  className="block bg-[#161928] hover:bg-[#1C2033] p-2.5 sm:p-3 rounded-xl transition-all duration-200 no-underline group shadow-sm hover:shadow-md"
                >
                  <div className="flex items-start gap-2.5">
                    <span className="text-sm mt-0.5">{note.icon}</span>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs sm:text-sm font-semibold text-white/95 group-hover:text-[#00DE51] transition-colors truncate">
                        {note.title}
                      </p>
                      <p className="text-[10.5px] text-[#888899] mt-0.5 line-clamp-1 leading-snug">
                        {note.subtitle}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-1.5 pt-1.5 text-[10px] text-[#888899]">
                    <span className="flex items-center gap-1 font-medium">
                      <FaCalendarAlt className="text-[9px] text-[#00DE51]" /> {note.date}
                    </span>
                    <span className="text-[#00DE51] group-hover:text-white flex items-center gap-1 transition-colors">
                      Manage <FaExternalLinkAlt className="text-[8px]" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Seed / Refresh Action at bottom of Notes */}
          <div className="pt-2.5 mt-2 flex items-center justify-between">
            <button
              onClick={handleSeed}
              disabled={seeding}
              className="text-xs text-[#00DE51] hover:underline flex items-center gap-1.5 font-medium cursor-pointer"
            >
              <FaDatabase className="text-[11px]" />
              <span>{seeding ? "Importing..." : "Sync Sample Data"}</span>
            </button>

            <Link
              href="/admin/projects"
              className="text-xs text-[#00DE51] hover:underline font-medium"
            >
              View all &rarr;
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}

