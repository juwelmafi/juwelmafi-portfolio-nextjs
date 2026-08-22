"use client";
import { useSession, signOut } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { FaHome, FaProjectDiagram, FaBlog, FaSignOutAlt, FaUser } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";

const sidebarLinks = [
  { label: "Dashboard", href: "/admin",         icon: MdDashboard },
  { label: "Projects",  href: "/admin/projects", icon: FaProjectDiagram },
  { label: "Blogs",     href: "/admin/blogs",    icon: FaBlog },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const router   = useRouter();
  const pathname = usePathname();

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "var(--bg-base)" }}>
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-2 border-[var(--accent)] border-t-transparent rounded-full animate-spin" />
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>Loading...</p>
        </div>
      </div>
    );
  }

  // Middleware handles redirect, but belt-and-suspenders
  if (status === "unauthenticated") {
    router.push("/login");
    return null;
  }

  return (
    <div className="min-h-screen flex" style={{ background: "var(--bg-base)" }}>
      {/* Sidebar */}
      <aside
        className="w-60 flex-shrink-0 flex flex-col"
        style={{
          background: "var(--bg-card)",
          borderRight: "1px solid var(--border)",
          position: "sticky",
          top: 0,
          height: "100vh",
          overflowY: "auto",
        }}
      >
        {/* Brand */}
        <div className="p-6 border-b" style={{ borderColor: "var(--border)" }}>
          <Link href="/" className="heading-font text-lg font-bold text-white">
            JUWEL<span style={{ color: "var(--accent)" }}>.</span>
          </Link>
          <p className="text-xs mt-1" style={{ color: "var(--text-subtle)" }}>Admin Dashboard</p>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-4 space-y-1">
          {sidebarLinks.map(({ label, href, icon: Icon }) => {
            const isActive = pathname === href || (href !== "/admin" && pathname.startsWith(href));
            return (
              <Link
                key={label}
                href={href}
                className={`sidebar-link ${isActive ? "active" : ""}`}
              >
                <Icon className="text-base" />
                {label}
              </Link>
            );
          })}
        </nav>

        {/* User + Logout */}
        <div className="p-4 border-t space-y-3" style={{ borderColor: "var(--border)" }}>
          <div className="flex items-center gap-3 px-2">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ background: "var(--accent-glow)", color: "var(--accent)" }}
            >
              <FaUser className="text-xs" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-medium text-white truncate">Admin</p>
              <p className="text-xs truncate" style={{ color: "var(--text-subtle)" }}>
                {session?.user?.email}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/" className="sidebar-link flex-1">
              <FaHome className="text-base" /> View Site
            </Link>
            <button
              onClick={() => signOut({ callbackUrl: "/login" })}
              className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-xs transition-all duration-200"
              style={{ color: "#f87171", background: "rgba(248,113,113,0.05)" }}
              title="Sign Out"
            >
              <FaSignOutAlt />
            </button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 min-w-0 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
