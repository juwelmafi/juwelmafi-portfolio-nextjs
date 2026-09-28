"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/",         icon: "icon-home",        label: "Home" },
  { href: "/services", icon: "icon-service",     label: "Services" },
  { href: "/projects", icon: "icon-high-light",  label: "Projects" },
  { href: "/courses",  icon: "icon-edu",         label: "Courses" },
  { href: "/blog",     icon: "icon-practice",    label: "Blogs" },
  { href: "/contact",  icon: "icon-send",        label: "Contact" },
];

export default function SidebarTools() {
  const pathname = usePathname();

  useEffect(() => {
    // Default to dark mode permanently
    document.body.classList.add("dark-mode");
    document.documentElement.setAttribute("data-theme", "dark");
    localStorage.setItem("darkMode", "dark");
  }, []);

  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const isLinkActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(href + "/");
  };

  return (
    <div className="sidebar-tools pst-v1">

      {/* Nav List */}
      <ul className="nav-list">
        <li className={`nav-item ${isLinkActive("/") ? "active" : ""}`}>
          <Link href="/" className="item-link" aria-label="Home">
            <i className="icon icon-home"></i>
            <p className="tool-tip text-caption">Home</p>
          </Link>
        </li>
        <li className="br-line"></li>

        {navItems.slice(1, 5).map((item) => (
          <li key={item.href} className={`nav-item ${isLinkActive(item.href) ? "active" : ""}`}>
            <Link href={item.href} className="item-link" aria-label={item.label}>
              {item.href === "/blog" ? (
                <span className="icon flex items-center justify-center">
                  <svg
                    viewBox="0 0 24 24"
                    width="18"
                    height="18"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z" />
                    <path d="M8 7h6" />
                    <path d="M8 11h8" />
                    <path d="M8 15h5" />
                  </svg>
                </span>
              ) : (
                <i className={`icon ${item.icon}`}></i>
              )}
              <p className="tool-tip text-caption">{item.label}</p>
            </Link>
          </li>
        ))}

        <li className="br-line"></li>
        <li className={`nav-item ${isLinkActive("/contact") ? "active" : ""}`}>
          <Link href="/contact" className="item-link" aria-label="Contact">
            <i className="icon icon-send"></i>
            <p className="tool-tip text-caption">Contact</p>
          </Link>
        </li>
      </ul>

      {/* Bottom Go Top Button */}
      <div className="nav-bottom">
        <a href="#" onClick={scrollToTop} className="tf-btn-icon go-top" aria-label="Scroll to top">
          <i className="icon icon-arrow-top"></i>
        </a>
      </div>
    </div>
  );
}
