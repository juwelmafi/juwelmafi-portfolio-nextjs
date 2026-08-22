"use client";
import Link from "next/link";
import { FaGithub, FaLinkedin, FaYoutube, FaDownload, FaHeart } from "react-icons/fa";

const footerLinks = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  return (
    <footer
      className="relative"
      style={{ background: "var(--bg-card)", borderTop: "1px solid var(--border)" }}
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-10 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-start">
          {/* Branding */}
          <div className="space-y-4">
            <div>
              <h2 className="heading-font text-xl font-bold text-white tracking-wide">
                JUWEL<span style={{ color: "var(--accent)" }}>.</span>
              </h2>
              <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>
                MERN Stack Developer & Content Creator
              </p>
            </div>
            <p className="text-xs leading-relaxed max-w-xs" style={{ color: "var(--text-subtle)" }}>
              Building beautiful, functional web experiences. Sharing knowledge through YouTube.
            </p>
            <a
              href="https://drive.google.com/file/d/1NyyfiNHplq8Dy3rrW8qe_1fTP97MqJfE/view?usp=sharing"
              target="_blank"
              rel="noreferrer"
              className="btn-primary text-xs px-4 py-2.5"
            >
              <FaDownload className="text-sm" />
              Download CV
            </a>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="heading-font text-xs font-semibold uppercase tracking-widest mb-5" style={{ color: "var(--accent)" }}>
              Quick Links
            </h3>
            <ul className="space-y-2">
              {footerLinks.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-sm transition-colors duration-200"
                    style={{ color: "var(--text-muted)" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-primary)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="heading-font text-xs font-semibold uppercase tracking-widest mb-5" style={{ color: "var(--accent)" }}>
              Connect
            </h3>
            <div className="flex gap-3">
              {[
                { icon: FaGithub, href: "https://github.com/juwelmafi", label: "GitHub" },
                { icon: FaLinkedin, href: "https://www.linkedin.com/in/juwelmafi", label: "LinkedIn" },
                { icon: FaYoutube, href: "https://www.youtube.com/@juwelmafi", label: "YouTube" },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-base transition-all duration-300 hover:scale-110 hover:border-[var(--border-accent)] text-[var(--text-muted)] hover:text-[var(--accent)]"
                  style={{
                    background: "var(--bg-elevated)",
                    border: "1px solid var(--border)",
                  }}
                >
                  <Icon />
                </a>
              ))}
            </div>
            <p className="text-xs mt-6" style={{ color: "var(--text-subtle)" }}>
              juwelhossain16457@gmail.com
            </p>
            <p className="text-xs mt-1" style={{ color: "var(--text-subtle)" }}>
              Madaripur, Bangladesh
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-10 pt-6" style={{ borderTop: "1px solid var(--border)" }}>
          <p className="text-center text-xs flex items-center justify-center gap-1" style={{ color: "var(--text-subtle)" }}>
            © {new Date().getFullYear()}{" "}
            <span style={{ color: "var(--text-muted)" }} className="font-medium">Juwel Hossain</span>
            . Crafted with{" "}
            <FaHeart className="text-red-500 text-xs" /> and lots of ☕
          </p>
        </div>
      </div>
    </footer>
  );
}
