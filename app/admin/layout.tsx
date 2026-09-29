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
  FaArrowRight,
  FaBars,
  FaEdit,
  FaSearch
} from "react-icons/fa";
import { MdDashboard, MdOutlineTune } from "react-icons/md";
import Swal from "sweetalert2";

const sidebarLinks = [
  { label: "Dashboard", href: "/admin",          icon: MdOutlineTune },
  { label: "Profile",   href: "/admin/profile",  icon: FaUser },
  { label: "Services",  href: "/admin/services",  icon: FaCogs },
  { label: "Projects",  href: "/admin/projects",  icon: FaProjectDiagram },
  { label: "Courses",   href: "/admin/courses",   icon: FaGraduationCap },
  { label: "Blogs",     href: "/admin/blogs",     icon: FaBlog },
  { label: "Contents",  href: "/admin/contents",  icon: FaEdit },
  { label: "SEO",       href: "/admin/seo",       icon: FaSearch },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const router   = useRouter();
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
      confirmButtonColor: "#00DE51",
      cancelButtonColor: "#2C3148",
      confirmButtonText: "Yes, seed now",
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
        title: "Database Seeded!",
        text: data.message,
        icon: "success",
        background: "#121422",
        color: "#F0F0F5",
        confirmButtonColor: "#00DE51",
      });
      window.location.reload();
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
      setQuickCreateOpen(false);
    }
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0A0A14]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-2 border-[#00DE51] border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-[#888899]">Loading Console...</p>
        </div>
      </div>
    );
  }

  if (status === "unauthenticated") {
    router.push("/login");
    return null;
  }

  return (
    <div className="min-h-screen bg-[#0A0A14] text-[#F0F0F5] p-2 sm:p-4 lg:p-6 xl:p-8 flex flex-col justify-center">
      {/* Master Frame Container (Responsive Black & Emerald Console) */}
      <div className="w-full max-w-[1520px] mx-auto dashboard-master-frame flex flex-col lg:flex-row min-h-0 lg:min-h-[880px] shadow-2xl relative bg-[#0F111D]">
        
        {/* Left Sidebar */}
        <aside className="w-full lg:w-64 xl:w-72 flex-shrink-0 flex flex-col justify-between p-4 sm:p-5 lg:p-6 border-none">
          <div>
            {/* Brand Header */}
            <div className="flex items-center justify-between gap-3 mb-6 sm:mb-8">
              <Link href="/admin" className="flex items-center gap-2 group min-w-0">
                <span className="text-[22px] sm:text-2xl font-bold tracking-tight text-white group-hover:text-[#00DE51] transition-colors truncate">
                  Interface<span className="text-[#00DE51]">.</span>
                </span>
              </Link>

              {/* Action Buttons: Green 4-dot button + Mobile Hamburger */}
              <div className="flex items-center gap-2 flex-shrink-0">
                {/* Emerald Green 4-dot circular badge button (Quick actions) */}
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => setQuickCreateOpen(true)}
                  className="cursor-pointer hover:scale-105 active:scale-95 transition-transform flex-shrink-0"
                  style={{
                    width: "36px",
                    height: "36px",
                    backgroundColor: "#00DE51",
                    color: "#0A0A14",
                    borderRadius: "9999px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 4px 16px rgba(0, 222, 81, 0.4)",
                  }}
                  title="Quick Create Item"
                  aria-label="Quick Actions"
                >
                  <svg width="15" height="15" viewBox="0 0 16 16" fill="#0A0A14">
                    <circle cx="4.5" cy="4.5" r="2" />
                    <circle cx="11.5" cy="4.5" r="2" />
                    <circle cx="4.5" cy="11.5" r="2" />
                    <circle cx="11.5" cy="11.5" r="2" />
                  </svg>
                </div>

                {/* Mobile Menu Hamburger Toggle (Visible only on phone/tablet < lg) */}
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="flex lg:!hidden p-2 rounded-xl bg-white/5 hover:bg-white/10 text-[#00DE51] transition items-center justify-center text-lg cursor-pointer"
                  title="Toggle Navigation Menu"
                  aria-label="Toggle navigation menu"
                >
                  {mobileMenuOpen ? <FaTimes /> : <FaBars />}
                </button>
              </div>
            </div>

            {/* Navigation Links (Collapsed on mobile unless hamburger toggled) */}
            <nav className={`space-y-1.5 ${mobileMenuOpen ? "!block" : "!hidden lg:!block"}`}>
              {sidebarLinks.map(({ label, href, icon: Icon }) => {
                const isActive = href === "/admin" 
                  ? pathname === "/admin" 
                  : pathname.startsWith(href);

                return (
                  <Link
                    key={label}
                    href={href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`dashboard-nav-item ${isActive ? "active" : ""}`}
                  >
                    <span className="dashboard-nav-icon-badge">
                      <Icon className="text-base" />
                    </span>
                    <span className="truncate">{label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Bottom Sidebar Action Area */}
          <div className={`mt-8 space-y-5 ${mobileMenuOpen ? "!block" : "!hidden lg:!block"}`}>
            {/* Elevated "+ New item" Glass Drop Card */}
            <div className="dashboard-sidebar-action-card text-center">
              <button
                onClick={() => setQuickCreateOpen(true)}
                className="dashboard-action-btn"
              >
                <span className="w-5 h-5 rounded-md bg-black/15 flex items-center justify-center text-xs">
                  <FaPlus />
                </span>
                <span>New item</span>
              </button>
              <p className="text-[11px] text-[#7E849E] mt-3 tracking-wide">
                Click &apos;+&apos; to create your new items.
              </p>
            </div>

            {/* User Session & External Links */}
            <div className="pt-2 flex flex-col gap-2">
              <div className="flex items-center justify-between px-1">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-7 h-7 rounded-full bg-[#00DE51]/15 text-[#00DE51] flex items-center justify-center text-xs font-bold">
                    J
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-white truncate">Juwel Hossain</p>
                    <p className="text-[10px] text-[#00DE51] flex items-center gap-1 font-medium truncate">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00DE51]" /> Admin
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <Link
                    href="/"
                    target="_blank"
                    className="p-2 rounded-lg text-[#888899] hover:text-white hover:bg-white/5 transition text-xs"
                    title="View Portfolio Live"
                  >
                    <FaHome className="text-sm" />
                  </Link>
                  <button
                    onClick={() => signOut({ callbackUrl: "/login" })}
                    className="p-2 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-500/10 transition text-xs cursor-pointer"
                    title="Sign Out"
                  >
                    <FaSignOutAlt className="text-sm" />
                  </button>
                </div>
              </div>
              <p className="text-[10px] text-[#555566] px-1 text-center lg:text-left mt-1">
                MERN Portfolio Console &bull; Live DB
              </p>
            </div>
          </div>
        </aside>

        {/* Main Workspace Surface (Responsive Black & Emerald Canvas) */}
        <main className="dashboard-inner-surface flex-1 m-0 mt-3 lg:m-4 p-3.5 sm:p-5 lg:p-7 flex flex-col min-w-0 overflow-y-auto">
          {children}
        </main>
      </div>

      {/* Quick Create Modal */}
      {quickCreateOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-md p-4 animate-in fade-in duration-200">
          <div className="dashboard-content-card w-full max-w-md p-5 sm:p-6 relative bg-[#121422] border-none shadow-2xl">
            <div className="flex items-center justify-between pb-3.5 mb-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#00DE51]/20 text-[#00DE51] flex items-center justify-center text-base">
                  <FaPlus />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Create New Item</h3>
                  <p className="text-xs text-[#888899]">Select an item to publish directly</p>
                </div>
              </div>
              <button
                onClick={() => setQuickCreateOpen(false)}
                className="text-white/50 hover:text-white transition p-1.5 rounded-lg hover:bg-white/5 cursor-pointer"
              >
                <FaTimes className="text-base" />
              </button>
            </div>

            <div className="space-y-2">
              <Link
                href="/admin/projects/new"
                onClick={() => setQuickCreateOpen(false)}
                className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] transition group text-sm text-white"
              >
                <div className="flex items-center gap-3">
                  <FaProjectDiagram className="text-[#00DE51] text-base" />
                  <div>
                    <p className="font-semibold text-white">New Project</p>
                    <p className="text-xs text-[#888899]">Case study, live preview &amp; GitHub link</p>
                  </div>
                </div>
                <FaArrowRight className="text-xs text-white/30 group-hover:text-[#00DE51] group-hover:translate-x-1 transition" />
              </Link>

              <Link
                href="/admin/courses/new"
                onClick={() => setQuickCreateOpen(false)}
                className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] transition group text-sm text-white"
              >
                <div className="flex items-center gap-3">
                  <FaGraduationCap className="text-[#00DE51] text-base" />
                  <div>
                    <p className="font-semibold text-white">New Course &amp; Tutorials</p>
                    <p className="text-xs text-[#888899]">Video masterclass lessons and topics</p>
                  </div>
                </div>
                <FaArrowRight className="text-xs text-white/30 group-hover:text-[#00DE51] group-hover:translate-x-1 transition" />
              </Link>

              <Link
                href="/admin/services/new"
                onClick={() => setQuickCreateOpen(false)}
                className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] transition group text-sm text-white"
              >
                <div className="flex items-center gap-3">
                  <FaCogs className="text-[#00DE51] text-base" />
                  <div>
                    <p className="font-semibold text-white">New Service Offering</p>
                    <p className="text-xs text-[#888899]">Pricing, features &amp; deliverable scope</p>
                  </div>
                </div>
                <FaArrowRight className="text-xs text-white/30 group-hover:text-[#00DE51] group-hover:translate-x-1 transition" />
              </Link>

              <Link
                href="/admin/blogs/new"
                onClick={() => setQuickCreateOpen(false)}
                className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] transition group text-sm text-white"
              >
                <div className="flex items-center gap-3">
                  <FaBlog className="text-[#00DE51] text-base" />
                  <div>
                    <p className="font-semibold text-white">Write Blog Post</p>
                    <p className="text-xs text-[#888899]">Markdown technical guides &amp; articles</p>
                  </div>
                </div>
                <FaArrowRight className="text-xs text-white/30 group-hover:text-[#00DE51] group-hover:translate-x-1 transition" />
              </Link>

              <div className="pt-2">
                <button
                  onClick={handleQuickSeed}
                  disabled={seeding}
                  className="w-full flex items-center justify-between p-3 rounded-xl bg-[#00DE51]/10 hover:bg-[#00DE51]/20 transition group text-sm text-[#00DE51] cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <FaDatabase className="text-base" />
                    <div className="text-left">
                      <p className="font-semibold">{seeding ? "Importing Data..." : "Seed Default Sample Data"}</p>
                      <p className="text-xs text-[#00DE51]/80">Populate live database with portfolio items</p>
                    </div>
                  </div>
                  <FaArrowRight className="text-xs text-[#00DE51]/60 group-hover:text-[#00DE51] group-hover:translate-x-1 transition" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

