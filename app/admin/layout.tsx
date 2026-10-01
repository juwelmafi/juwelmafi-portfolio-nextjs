"use client";

import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import {
  FaProjectDiagram,
  FaBlog,
  FaSignOutAlt,
  FaUser,
  FaGraduationCap,
  FaCogs,
  FaPlus,
  FaHome,
  FaTimes,
  FaDatabase,
  FaBars,
  FaEdit,
  FaSearch,
} from "react-icons/fa";
import { MdOutlineTune } from "react-icons/md";
import Swal from "sweetalert2";

const sidebarLinks = [
  { label: "Dashboard", href: "/admin", icon: MdOutlineTune },
  { label: "Profile", href: "/admin/profile", icon: FaUser },
  { label: "Services", href: "/admin/services", icon: FaCogs },
  { label: "Projects", href: "/admin/projects", icon: FaProjectDiagram },
  { label: "Courses", href: "/admin/courses", icon: FaGraduationCap },
  { label: "Blogs", href: "/admin/blogs", icon: FaBlog },
  { label: "Contents", href: "/admin/contents", icon: FaEdit },
  { label: "SEO", href: "/admin/seo", icon: FaSearch },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [quickCreateOpen, setQuickCreateOpen] = useState(false);
  const [seeding, setSeeding] = useState(false);

  const handleQuickSeed = async () => {
    const confirm = await Swal.fire({
      title: "Seed Default Portfolio Data?",
      text: "This will populate projects, services, video courses and blogs if missing.",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#191712",
      cancelButtonColor: "#A8A29E",
      confirmButtonText: "Yes, seed now",
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
        title: "Database Seeded!",
        text: data.message,
        icon: "success",
        background: "#FAF6EC",
        color: "#191712",
        confirmButtonColor: "#191712",
      });
      window.location.reload();
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
      setQuickCreateOpen(false);
    }
  };

  if (status === "loading") {
    return (
      <div className="retro-page-container min-h-screen flex items-center justify-center">
        <div className="hand-box p-8 bg-[#FFFFFF] text-center">
          <p className="font-script font-bold text-3xl text-[#191712] mb-2">
            Loading Terminal...
          </p>
          <p className="font-typewriter text-xs text-[#78716C]">
            INITIALIZING SECURE SESSION
          </p>
        </div>
      </div>
    );
  }

  if (status === "unauthenticated") {
    router.push("/login");
    return null;
  }

  return (
    <div className="retro-page-container min-h-screen p-3 sm:p-5 lg:p-8 flex flex-col justify-start">
      
      {/* Master Container Card */}
      <div className="w-full max-w-[1540px] mx-auto hand-box p-4 sm:p-6 lg:p-8 bg-[#FFFFFF] shadow-[6px_7px_0px_#191712] flex flex-col lg:flex-row gap-8 min-h-[850px] relative">

        {/* ── LEFT SIDEBAR ─────────────────────────────────────────── */}
        <aside className="w-full lg:w-64 xl:w-72 shrink-0 flex flex-col justify-between border-b-2 lg:border-b-0 lg:border-r-2 border-[#191712] pb-6 lg:pb-0 lg:pr-6">
          <div>
            {/* Brand Header */}
            <div className="flex items-center justify-between gap-3 mb-6 sm:mb-8">
              <Link href="/admin" className="flex items-center gap-2.5 group">
                <div className="w-10 h-10 border-2 border-[#191712] rounded-xl bg-[#FFE45E] flex items-center justify-center font-script font-bold text-2xl text-[#191712] shadow-[2px_2px_0px_#191712] group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform">
                  jh.
                </div>
                <div className="flex flex-col">
                  <span className="font-script font-bold text-2xl text-[#191712] leading-tight">
                    Admin <span className="marked">Hub</span>
                  </span>
                  <span className="font-typewriter text-[10px] text-[#78716C] uppercase tracking-wider">
                    Juwel Hossain
                  </span>
                </div>
              </Link>

              {/* Action Buttons: Quick Create + Mobile Toggle */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setQuickCreateOpen(true)}
                  className="w-8 h-8 rounded-full border-2 border-[#191712] bg-[#FFE45E] flex items-center justify-center font-bold text-xs text-[#191712] shadow-[1px_1px_0px_#191712] hover:bg-[#FDE047] cursor-pointer"
                  title="Quick Actions"
                >
                  <FaPlus size={11} />
                </button>

                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="lg:hidden p-1.5 border-2 border-[#191712] rounded bg-[#FAF7EE] text-[#191712] cursor-pointer"
                  aria-label="Toggle navigation menu"
                >
                  {mobileMenuOpen ? <FaTimes size={16} /> : <FaBars size={16} />}
                </button>
              </div>
            </div>

            {/* Navigation Links */}
            <nav className={`space-y-1.5 ${mobileMenuOpen ? "block" : "hidden lg:block"}`}>
              {sidebarLinks.map(({ label, href, icon: Icon }) => {
                const isActive = href === "/admin"
                  ? pathname === "/admin"
                  : pathname.startsWith(href);

                return (
                  <Link
                    key={label}
                    href={href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-3.5 py-2 rounded-md transition-all font-hand text-lg ${
                      isActive
                        ? "bg-[#FFE45E] border-2 border-[#191712] text-[#191712] font-bold shadow-[2px_2px_0px_#191712]"
                        : "hover:bg-[#FAF7EE] border border-transparent text-[#292524]"
                    }`}
                  >
                    <span className="w-6 text-center text-[#191712]">
                      <Icon size={16} />
                    </span>
                    <span>{label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Bottom Sidebar Area */}
          <div className={`mt-8 space-y-4 ${mobileMenuOpen ? "block" : "hidden lg:block"}`}>
            
            {/* Quick Action Box */}
            <div className="p-4 bg-[#FAF7EE] border-2 border-[#191712] rounded-md text-center">
              <button
                type="button"
                onClick={() => setQuickCreateOpen(true)}
                className="btn-small w-full justify-center text-sm py-1.5 cursor-pointer"
              >
                + New Document
              </button>
              <p className="font-hand text-xs text-[#78716C] mt-2">
                Create project, blog, or course module.
              </p>
            </div>

            {/* User Session & Links */}
            <div className="pt-2 border-t border-[#191712]/20 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#FFE45E] border border-[#191712]" />
                <span className="font-typewriter text-xs text-[#191712] font-bold">
                  Online
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Link
                  href="/"
                  target="_blank"
                  className="p-1.5 border border-[#191712] rounded bg-[#FAF7EE] hover:bg-[#FFE45E] text-[#191712] transition-colors"
                  title="View Portfolio Live"
                >
                  <FaHome size={14} />
                </Link>
                <button
                  type="button"
                  onClick={() => signOut({ callbackUrl: "/login" })}
                  className="p-1.5 border border-[#DC2626] rounded bg-[#FEE2E2] hover:bg-[#FECACA] text-[#DC2626] transition-colors cursor-pointer"
                  title="Sign Out"
                >
                  <FaSignOutAlt size={14} />
                </button>
              </div>
            </div>

          </div>
        </aside>

        {/* ── MAIN WORKSPACE SURFACE ───────────────────────────────── */}
        <main className="flex-1 min-w-0 flex flex-col overflow-y-auto">
          {children}
        </main>

      </div>

      {/* ── QUICK CREATE MODAL (RETRO STYLE) ────────────────────────── */}
      {quickCreateOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="relative w-full max-w-lg hand-box p-6 sm:p-8 bg-[#FFFFFF] shadow-[8px_8px_0px_#191712]">
            
            {/* Top Tape */}
            <div className="tape tape-top" aria-hidden="true" />

            <div className="flex items-center justify-between border-b-2 border-[#191712] pb-3 mb-6">
              <p className="retro-eyebrow !mb-0">
                QUICK CREATION TERMINAL
              </p>
              <button
                type="button"
                onClick={() => setQuickCreateOpen(false)}
                className="w-7 h-7 border-2 border-[#191712] rounded bg-[#FAF7EE] flex items-center justify-center font-bold text-xs text-[#191712] hover:bg-[#FFE45E] cursor-pointer"
              >
                ✕
              </button>
            </div>

            <h3 className="font-script font-bold text-3xl text-[#191712] mb-4">
              What do you want to <span className="marked">create</span>?
            </h3>

            <div className="grid grid-cols-2 gap-3 mb-6">
              <Link
                href="/admin/projects/new"
                onClick={() => setQuickCreateOpen(false)}
                className="p-3 bg-[#FAF7EE] border-2 border-[#191712] rounded-md font-hand text-lg font-bold text-[#191712] hover:bg-[#FFE45E] transition-all flex items-center gap-2"
              >
                <FaProjectDiagram />
                <span>New Project</span>
              </Link>

              <Link
                href="/admin/blogs/new"
                onClick={() => setQuickCreateOpen(false)}
                className="p-3 bg-[#FAF7EE] border-2 border-[#191712] rounded-md font-hand text-lg font-bold text-[#191712] hover:bg-[#FFE45E] transition-all flex items-center gap-2"
              >
                <FaBlog />
                <span>New Blog</span>
              </Link>

              <Link
                href="/admin/courses/new"
                onClick={() => setQuickCreateOpen(false)}
                className="p-3 bg-[#FAF7EE] border-2 border-[#191712] rounded-md font-hand text-lg font-bold text-[#191712] hover:bg-[#FFE45E] transition-all flex items-center gap-2"
              >
                <FaGraduationCap />
                <span>New Course</span>
              </Link>

              <Link
                href="/admin/services/new"
                onClick={() => setQuickCreateOpen(false)}
                className="p-3 bg-[#FAF7EE] border-2 border-[#191712] rounded-md font-hand text-lg font-bold text-[#191712] hover:bg-[#FFE45E] transition-all flex items-center gap-2"
              >
                <FaCogs />
                <span>New Service</span>
              </Link>
            </div>

            {/* Seed Database Option */}
            <div className="pt-4 border-t border-[#191712]/20 flex items-center justify-between">
              <span className="font-typewriter text-xs text-[#78716C]">
                Missing portfolio content?
              </span>
              <button
                type="button"
                onClick={handleQuickSeed}
                disabled={seeding}
                className="btn-small text-xs py-1.5 px-3 cursor-pointer"
              >
                <FaDatabase size={11} className="mr-1.5" />
                {seeding ? "Seeding..." : "Seed Default Data"}
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
