"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { FaGithub, FaLinkedin, FaYoutube } from "react-icons/fa";
import { HiMenu, HiX } from "react-icons/hi";

const navLinks = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Blog", href: "#blog" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);

      // Update active link based on scroll position
      const sections = navLinks.map((l) => l.href.replace("#", ""));
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActive(id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNav = (href: string) => {
    setMenuOpen(false);
    if (href.startsWith("#")) {
      const el = document.getElementById(href.replace("#", ""));
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[rgba(10,10,20,0.85)] backdrop-blur-xl border-b border-white/[0.06] shadow-[0_4px_30px_rgba(0,0,0,0.4)]"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#hero"
          onClick={(e) => { e.preventDefault(); handleNav("#hero"); }}
          className="heading-font text-lg font-bold tracking-wide group"
        >
          <span className="text-white">JUWEL</span>
          <span
            className="inline-block w-2 h-2 rounded-full ml-1 mb-1 align-middle"
            style={{ background: "var(--accent)" }}
          />
        </a>

        {/* Desktop Nav Links */}
        <ul className="hidden md:flex items-center gap-1">
          {navLinks.map(({ label, href }) => {
            const id = href.replace("#", "");
            const isActive = active === id;
            return (
              <li key={label}>
                {href.startsWith("#") ? (
                  <button
                    onClick={() => handleNav(href)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 heading-font ${
                      isActive
                        ? "text-[var(--accent)] bg-[var(--accent-glow)]"
                        : "text-[var(--text-muted)] hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {label}
                  </button>
                ) : (
                  <Link
                    href={href}
                    className="px-4 py-2 rounded-lg text-sm font-medium text-[var(--text-muted)] hover:text-white hover:bg-white/5 transition-all duration-200 heading-font"
                  >
                    {label}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>

        {/* Social + CTA */}
        <div className="hidden md:flex items-center gap-4">
          <div className="flex items-center gap-3 text-[var(--text-muted)]">
            <a href="https://github.com/juwelmafi" target="_blank" rel="noreferrer" className="hover:text-white transition-colors text-base">
              <FaGithub />
            </a>
            <a href="https://www.linkedin.com/in/juwelmafi" target="_blank" rel="noreferrer" className="hover:text-[var(--accent)] transition-colors text-base">
              <FaLinkedin />
            </a>
            <a href="https://www.youtube.com/@juwelmafi" target="_blank" rel="noreferrer" className="hover:text-red-400 transition-colors text-base">
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

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-white text-2xl p-2 rounded-lg hover:bg-white/5 transition-colors"
          aria-label="Toggle menu"
        >
          {menuOpen ? <HiX /> : <HiMenu />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-[rgba(10,10,20,0.95)] backdrop-blur-2xl border-b border-white/[0.06] px-6 pb-6 pt-2">
          <ul className="flex flex-col gap-1">
            {navLinks.map(({ label, href }) => (
              <li key={label}>
                <button
                  onClick={() => handleNav(href)}
                  className="w-full text-left px-4 py-3 rounded-lg text-sm font-medium text-[var(--text-muted)] hover:text-white hover:bg-white/5 transition-all heading-font"
                >
                  {label}
                </button>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-4 mt-4 pt-4 border-t border-white/[0.06]">
            <div className="flex items-center gap-3 text-[var(--text-muted)]">
              <a href="https://github.com/juwelmafi" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                <FaGithub />
              </a>
              <a href="https://www.linkedin.com/in/juwelmafi" target="_blank" rel="noreferrer" className="hover:text-[var(--accent)] transition-colors">
                <FaLinkedin />
              </a>
              <a href="https://www.youtube.com/@juwelmafi" target="_blank" rel="noreferrer" className="hover:text-red-400 transition-colors">
                <FaYoutube />
              </a>
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
