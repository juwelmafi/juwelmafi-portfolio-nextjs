"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import {
  FaSearch,
  FaProjectDiagram,
  FaGraduationCap,
  FaCogs,
  FaBlog,
  FaPlus,
  FaDatabase,
  FaEdit,
  FaArrowRight,
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
      text: "This will seed default projects, blogs, and video courses into MongoDB if missing.",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#191712",
      cancelButtonColor: "#A8A29E",
      confirmButtonText: "Yes, seed database",
      background: "#FAF6EC",
      color: "#191712",
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
        background: "#FAF6EC",
        color: "#191712",
        confirmButtonColor: "#191712",
      });
      refreshData();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to seed";
      Swal.fire({
        title: "Notice",
        text: msg,
        icon: "info",
        background: "#FAF6EC",
        color: "#191712",
      });
    } finally {
      setSeeding(false);
    }
  };

  const filteredProjects = useMemo(() => {
    if (!searchQuery) return projects;
    return projects.filter((p) =>
      p.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [projects, searchQuery]);

  return (
    <div className="space-y-8">
      
      {/* ── Top Workspace Header ─────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 border-[#191712] pb-6">
        <div>
          <p className="retro-eyebrow !mb-1">
            CONTROL DESK · PORTFOLIO OS
          </p>
          <h1 className="font-script font-bold text-4xl sm:text-5xl text-[#191712] leading-tight">
            Hello, <span className="marked">Juwel.</span>
          </h1>
          <p className="font-hand text-lg text-[#57534E] mt-0.5">
            Manage your live works, masterclasses, essays, and consulting tiers.
          </p>
        </div>

        {/* Search input & Quick Seed Button */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex items-center">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search dossiers..."
              className="bg-[#FAF7EE] border-2 border-[#191712] rounded-md px-3 py-1.5 font-hand text-base text-[#191712] placeholder:text-[#A8A29E] focus:outline-none focus:bg-[#FFFFFF] focus:ring-2 focus:ring-[#FFE45E] w-48 sm:w-56"
            />
            <FaSearch className="absolute right-3 text-xs text-[#78716C] pointer-events-none" />
          </div>

          <button
            type="button"
            onClick={handleSeed}
            disabled={seeding}
            className="btn-small text-xs py-1.5 px-3 cursor-pointer"
          >
            <FaDatabase size={11} className="mr-1.5" />
            {seeding ? "Seeding..." : "Seed DB"}
          </button>
        </div>
      </div>

      {/* ── Metric Cards Grid (Matching Reference Pricing / Project Cards) ── */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-script font-bold text-2xl sm:text-3xl text-[#191712]">
            Database <span className="marked">Ledger</span>
          </h2>
          <span className="font-typewriter text-xs text-[#78716C]">
            LIVE RECORD COUNT
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          
          {/* Card 1: Projects */}
          <Link
            href="/admin/projects"
            className="hand-box p-5 bg-[#FFFFFF] hover:-translate-y-1 transition-transform relative group no-underline"
          >
            <div className="flex items-center justify-between border-b border-[#191712]/20 pb-2 mb-3">
              <span className="font-typewriter text-[11px] font-bold text-[#C2410C]">
                DOSSIER #01
              </span>
              <FaProjectDiagram className="text-[#191712]" />
            </div>
            <strong className="font-script font-bold text-5xl text-[#191712] block leading-none mb-1">
              {loading ? "..." : counts.projects}
            </strong>
            <p className="font-hand font-bold text-lg text-[#191712]">
              Live Projects
            </p>
            <p className="font-hand text-xs text-[#78716C]">
              Web apps &amp; repositories
            </p>
          </Link>

          {/* Card 2: Courses */}
          <Link
            href="/admin/courses"
            className="hand-box p-5 bg-[#FFFFFF] hover:-translate-y-1 transition-transform relative group no-underline"
          >
            <div className="flex items-center justify-between border-b border-[#191712]/20 pb-2 mb-3">
              <span className="font-typewriter text-[11px] font-bold text-[#C2410C]">
                DOSSIER #02
              </span>
              <FaGraduationCap className="text-[#191712]" />
            </div>
            <strong className="font-script font-bold text-5xl text-[#191712] block leading-none mb-1">
              {loading ? "..." : counts.courses}
            </strong>
            <p className="font-hand font-bold text-lg text-[#191712]">
              Masterclasses
            </p>
            <p className="font-hand text-xs text-[#78716C]">
              Video curriculum series
            </p>
          </Link>

          {/* Card 3: Articles */}
          <Link
            href="/admin/blogs"
            className="hand-box p-5 bg-[#FFFFFF] hover:-translate-y-1 transition-transform relative group no-underline"
          >
            <div className="flex items-center justify-between border-b border-[#191712]/20 pb-2 mb-3">
              <span className="font-typewriter text-[11px] font-bold text-[#C2410C]">
                DOSSIER #03
              </span>
              <FaBlog className="text-[#191712]" />
            </div>
            <strong className="font-script font-bold text-5xl text-[#191712] block leading-none mb-1">
              {loading ? "..." : counts.blogs}
            </strong>
            <p className="font-hand font-bold text-lg text-[#191712]">
              Articles &amp; Essays
            </p>
            <p className="font-hand text-xs text-[#78716C]">
              Technical documentation
            </p>
          </Link>

          {/* Card 4: Services */}
          <Link
            href="/admin/services"
            className="hand-box p-5 bg-[#FFFFFF] hover:-translate-y-1 transition-transform relative group no-underline"
          >
            <div className="flex items-center justify-between border-b border-[#191712]/20 pb-2 mb-3">
              <span className="font-typewriter text-[11px] font-bold text-[#C2410C]">
                DOSSIER #04
              </span>
              <FaCogs className="text-[#191712]" />
            </div>
            <strong className="font-script font-bold text-5xl text-[#191712] block leading-none mb-1">
              {loading ? "..." : counts.services}
            </strong>
            <p className="font-hand font-bold text-lg text-[#191712]">
              Services &amp; Tiers
            </p>
            <p className="font-hand text-xs text-[#78716C]">
              Consulting offerings
            </p>
          </Link>

        </div>
      </div>

      {/* ── Quick Action Buttons Row ──────────────────────────────── */}
      <div className="flex flex-wrap items-center gap-3 pt-2">
        <Link href="/admin/projects/new" className="btn-hand-black text-sm py-2 px-5">
          + New Project
        </Link>
        <Link href="/admin/blogs/new" className="btn-hand-pink text-sm py-2 px-5">
          + New Blog
        </Link>
        <Link href="/admin/courses/new" className="btn-small text-sm py-2 px-5">
          + New Course
        </Link>
        <Link href="/admin/services/new" className="btn-hand-white text-sm py-2 px-5">
          + New Service
        </Link>
      </div>

      {/* ── Recent Projects Ledger ───────────────────────────────── */}
      <div className="hand-box p-6 bg-[#FFFFFF]">
        <div className="flex items-center justify-between border-b-2 border-[#191712] pb-3 mb-5">
          <div>
            <span className="font-typewriter text-xs text-[#C2410C] font-bold uppercase tracking-wider block">
              PORTFOLIO SHOWCASE
            </span>
            <h3 className="font-script font-bold text-2xl text-[#191712]">
              Recent Project Dossiers
            </h3>
          </div>
          <Link href="/admin/projects" className="font-hand text-base text-[#191712] hover:underline flex items-center gap-1">
            <span>View All</span>
            <FaArrowRight size={12} />
          </Link>
        </div>

        {filteredProjects.length === 0 ? (
          <p className="font-hand text-lg text-[#78716C] py-6 text-center">
            No projects found matching your query.
          </p>
        ) : (
          <div className="space-y-2.5">
            {filteredProjects.slice(0, 5).map((p, idx) => (
              <div
                key={p.id || p._id || idx}
                className="p-3 bg-[#FAF7EE] border border-[#191712] rounded-md flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="font-typewriter text-xs font-bold text-[#78716C] shrink-0">
                    #{String(idx + 1).padStart(2, "0")}
                  </span>
                  <div className="truncate">
                    <p className="font-hand font-bold text-lg text-[#191712] truncate">
                      {p.title}
                    </p>
                    {p.category && (
                      <span className="font-typewriter text-[10px] text-[#78716C]">
                        {p.category}
                      </span>
                    )}
                  </div>
                </div>

                <Link
                  href={`/admin/projects/${p.id || p._id}/edit`}
                  className="btn-small text-xs py-1 px-3 shrink-0"
                >
                  <FaEdit size={11} className="mr-1" />
                  Edit
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
