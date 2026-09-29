"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { FaGithub, FaLinkedin, FaYoutube, FaDownload, FaHeart } from "react-icons/fa";

interface FooterProps {
  content?: Record<string, string>;
}

const footerLinks = [
  { label: "Home",     href: "/" },
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/projects" },
  { label: "Courses",  href: "/courses" },
  { label: "Blog",     href: "/blog" },
  { label: "Contact",  href: "/contact" },
];

export default function Footer({ content: initialContent }: FooterProps) {
  const [content, setContent] = useState<Record<string, string>>(initialContent || {});

  useEffect(() => {
    fetch("/api/site-content")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          const map: Record<string, string> = {};
          data.forEach((d) => {
            if (d && d.key && typeof d.value === "string") {
              map[d.key] = d.value;
            }
          });
          setContent((prev) => ({ ...prev, ...map }));
        }
      })
      .catch(() => {});
  }, []);

  const rawTitle = content["site.footerTitle"] || "JUWEL";
  const brandTitle = rawTitle.endsWith(".") ? rawTitle.slice(0, -1) : rawTitle;
  const brandTagline = content["site.footerTagline"] || "MERN Stack Developer & Content Creator";
  const brandDesc = content["site.footerDesc"] || "Building beautiful, functional web experiences. Sharing knowledge through YouTube.";
  const resumeUrl = content["site.resumeUrl"] || "https://drive.google.com/file/d/1NyyfiNHplq8Dy3rrW8qe_1fTP97MqJfE/view?usp=sharing";
  const email = content["about.email"] || "juwelhossain16457@gmail.com";
  const location = content["about.location"] || "Madaripur, Bangladesh";
  const copyright = content["site.copyright"] || `© ${new Date().getFullYear()} Juwel Hossain. All rights reserved.`;

  const github = content["social.github"] || "https://github.com/juwelmafi";
  const linkedin = content["social.linkedin"] || "https://www.linkedin.com/in/juwelmafi";
  const youtube = content["social.youtube"] || "https://www.youtube.com/@juwelmafi";

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
                {brandTitle}<span style={{ color: "var(--accent)" }}>.</span>
              </h2>
              <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>
                {brandTagline}
              </p>
            </div>
            <p className="text-xs leading-relaxed max-w-xs" style={{ color: "var(--text-subtle)" }}>
              {brandDesc}
            </p>
            {resumeUrl && (
              <a
                href={resumeUrl}
                target="_blank"
                rel="noreferrer"
                className="btn-primary text-xs px-4 py-2.5"
              >
                <FaDownload className="text-sm" />
                Download CV
              </a>
            )}
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
            <div className="flex items-center gap-3">
              {[
                { icon: FaGithub, href: github, label: "GitHub" },
                { icon: FaLinkedin, href: linkedin, label: "LinkedIn" },
                { icon: FaYoutube, href: youtube, label: "YouTube" },
              ].filter((s) => Boolean(s.href)).map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="footer-social-btn"
                >
                  <Icon />
                </a>
              ))}
            </div>
            {email && (
              <p className="text-xs mt-6" style={{ color: "var(--text-subtle)" }}>
                {email}
              </p>
            )}
            {location && (
              <p className="text-xs mt-1" style={{ color: "var(--text-subtle)" }}>
                {location}
              </p>
            )}
          </div>
        </div>

        {/* Divider */}
        <div className="mt-10 pt-6" style={{ borderTop: "1px solid var(--border)" }}>
          <p className="text-center text-xs flex flex-wrap items-center justify-center gap-1.5" style={{ color: "var(--text-subtle)" }}>
            <span>{copyright}</span>
            <span className="inline-flex items-center gap-1">Crafted with <FaHeart className="text-red-500 text-xs inline" /> and dedication</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
