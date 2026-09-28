"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FaGithub, FaLinkedin, FaYoutube } from "react-icons/fa";
import { HiMenu, HiX } from "react-icons/hi";

/* On the homepage, clicking a link smooth-scrolls.
   On sub-pages, it navigates to /#hash so the homepage scrolls there. */
const navLinks = [
  { label: "Home",     href: "/" },
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/projects" },
  { label: "Courses",  href: "/courses" },
  { label: "Blog",     href: "/blog" },
  { label: "Contact",  href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const router   = useRouter();
  const isHome   = pathname === "/";

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNav = (href: string) => {
    setMenuOpen(false);
    router.push(href);
  };

  const isLinkActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(href + "/");
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled || !isHome
          ? "bg-[rgba(10,10,20,0.95)] backdrop-blur-xl border-b border-white/[0.06] shadow-[0_4px_30px_rgba(0,0,0,0.4)]"
          : "bg-[rgba(10,10,20,0.4)] backdrop-blur-md"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex flex-nowrap items-center justify-between gap-2">
        {/* Logo */}
        <button
          onClick={() => handleNav("hero")}
          className="heading-font text-lg font-bold tracking-wide cursor-pointer bg-transparent border-none shrink-0"
        >
          <span className="text-white">JUWEL</span>
          <span
            className="inline-block w-2 h-2 rounded-full ml-1 mb-1 align-middle"
            style={{ background: "var(--accent)" }}
          />
        </button>

        {/* Desktop Nav Links */}
        <ul className="hidden lg:flex items-center gap-0.5 flex-1 justify-center">
          {navLinks.map(({ label, href }) => {
            const active2 = isLinkActive(href);
            return (
              <li key={label}>
                <button
                  onClick={() => handleNav(href)}
                  className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200 heading-font cursor-pointer bg-transparent border-none whitespace-nowrap ${
                    active2
                      ? "text-[var(--accent)] bg-[var(--accent-glow)]"
                      : "text-[var(--text-muted)] hover:text-white hover:bg-white/5"
                  }`}
                >
                  {label}
                </button>
              </li>
            );
          })}
        </ul>

        {/* Social + CTA (desktop — show at xl to prevent wrapping) */}
        <div className="hidden xl:flex items-center gap-3 shrink-0">
          <div className="flex items-center gap-2.5 text-[var(--text-muted)]">
            <a href="https://github.com/juwelmafi" target="_blank" rel="noreferrer" className="hover:text-white transition-colors text-base" aria-label="GitHub">
              <FaGithub />
            </a>
            <a href="https://www.linkedin.com/in/juwelmafi" target="_blank" rel="noreferrer" className="hover:text-[var(--accent)] transition-colors text-base" aria-label="LinkedIn">
              <FaLinkedin />
            </a>
            <a href="https://www.youtube.com/@juwelmafi" target="_blank" rel="noreferrer" className="hover:text-red-400 transition-colors text-base" aria-label="YouTube">
              <FaYoutube />
            </a>
          </div>
          <a
            href="https://drive.google.com/file/d/1NyyfiNHplq8Dy3rrW8qe_1fTP97MqJfE/view?usp=sharing"
            target="_blank"
            rel="noreferrer"
            className="btn-primary text-xs px-4 py-2"
          >
            Resume
          </a>
        </div>

        {/* Mobile/tablet: just hamburger (shown below xl breakpoint) */}
        <div className="xl:hidden flex items-center gap-2">
          <a
            href="https://drive.google.com/file/d/1NyyfiNHplq8Dy3rrW8qe_1fTP97MqJfE/view?usp=sharing"
            target="_blank"
            rel="noreferrer"
            className="hidden sm:inline-flex btn-primary text-xs px-3 py-1.5"
          >
            Resume
          </a>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-white text-2xl p-2 rounded-lg hover:bg-white/5 transition-colors"
            aria-label="Toggle menu"
          >
            {menuOpen ? <HiX /> : <HiMenu />}
          </button>
        </div>
      </nav>

      {/* Mobile/tablet Menu */}
      {menuOpen && (
        <div className="xl:hidden bg-[rgba(10,10,20,0.97)] backdrop-blur-2xl border-b border-white/[0.06] px-4 pb-5 pt-2">
          <ul className="flex flex-col gap-0.5">
            {navLinks.map(({ label, href }) => (
              <li key={label}>
                <button
                  onClick={() => handleNav(href)}
                  className="w-full text-left px-4 py-3 rounded-lg text-sm font-medium text-[var(--text-muted)] hover:text-white hover:bg-white/5 transition-all heading-font cursor-pointer bg-transparent border-none"
                >
                  {label}
                </button>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-4 mt-4 pt-4 border-t border-white/[0.06]">
            <div className="flex items-center gap-3 text-[var(--text-muted)]">
              <a href="https://github.com/juwelmafi" target="_blank" rel="noreferrer" className="hover:text-white transition-colors" aria-label="GitHub"><FaGithub /></a>
              <a href="https://www.linkedin.com/in/juwelmafi" target="_blank" rel="noreferrer" className="hover:text-[var(--accent)] transition-colors" aria-label="LinkedIn"><FaLinkedin /></a>
              <a href="https://www.youtube.com/@juwelmafi" target="_blank" rel="noreferrer" className="hover:text-red-400 transition-colors" aria-label="YouTube"><FaYoutube /></a>
            </div>
            <a
              href="https://drive.google.com/file/d/1NyyfiNHplq8Dy3rrW8qe_1fTP97MqJfE/view?usp=sharing"
              target="_blank"
              rel="noreferrer"
              className="btn-primary text-xs px-4 py-2 ml-auto"
            >
              Resume
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
