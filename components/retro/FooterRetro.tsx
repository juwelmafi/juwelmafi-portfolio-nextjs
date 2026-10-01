"use client";

import Link from "next/link";

interface FooterRetroProps {
  content?: Record<string, string>;
}

export default function FooterRetro({ content }: FooterRetroProps) {
  const email = content?.["about.email"] || "juwelhossain16457@gmail.com";
  const youtube = content?.["social.youtube"] || "https://www.youtube.com/@juwelmafi";
  const github = content?.["social.github"] || "https://github.com/juwelmafi";
  const linkedin = content?.["social.linkedin"] || "https://www.linkedin.com/in/juwelmafi";
  const twitter = content?.["social.twitter"] || "https://x.com/juwelmafi";
  const facebook = content?.["social.facebook"] || "https://facebook.com/juwelmafi";

  const footerLedgerLine =
    content?.["site.footerLedgerLine"] || "================ OFFICIAL DISPATCH & SUMMARY ================";
  const footerSerial = content?.["site.footerSerial"] || "JH-PORTFOLIO-2026";
  const footerTitle = content?.["site.footerTitle"] || "JUWEL HOSSAIN";
  const footerDesc =
    content?.["site.footerDesc"] ||
    "Full-stack engineer specializing in MERN stack, Next.js, and high-performance Shopify e-commerce platforms.";
  const copyright =
    content?.["site.copyright"] ||
    `© ${new Date().getFullYear()} Juwel Hossain. All rights reserved.`;

  return (
    <footer className="border-t-2 border-[#191712] bg-[#FBF6E6] pt-12 pb-16 font-typewriter text-[#191712]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Ledger Line Header */}
        <div className="border-b-2 border-dashed border-[#A8A29E] pb-6 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-[#78716C]">
          <span>{footerLedgerLine}</span>
          <span>DATE: {new Date().getFullYear()} • SERIAL #{footerSerial}</span>
        </div>

        {/* Main Footer Info */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-10">
          
          <div className="md:col-span-5">
            <span className="font-bold text-lg text-[#191712] block mb-1">
              {footerTitle}
            </span>
            <p className="text-xs text-[#57534E] leading-relaxed max-w-sm mb-4">
              {footerDesc}
            </p>
            <div className="text-xs text-[#191712]">
              Direct Inquiries:{" "}
              <a href={`mailto:${email}`} className="font-bold underline hover:text-[#B45309]">
                {email}
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3">
            <span className="text-xs font-bold uppercase text-[#78716C] block mb-3">
              Navigation
            </span>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#projects" className="hover:underline">
                  01. Selected Projects
                </a>
              </li>
              <li>
                <a href="#services" className="hover:underline">
                  02. Technical Services
                </a>
              </li>
              <li>
                <a href="#education" className="hover:underline">
                  03. Education &amp; Degrees
                </a>
              </li>
              <li>
                <Link href="/explore" className="hover:underline font-bold text-[#B45309]">
                  04. Explore More (Blogs &amp; Courses) →
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:underline text-[#78716C]">
                  05. Admin Terminal [Secure]
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div className="md:col-span-4">
            <span className="text-xs font-bold uppercase text-[#78716C] block mb-3">
              Social Dispatches
            </span>
            <div className="flex flex-wrap gap-2 text-xs">
              {youtube && (
                <a
                  href={youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-retro-outline text-[11px] py-1 px-2.5"
                >
                  YouTube ↗
                </a>
              )}
              {github && (
                <a
                  href={github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-retro-outline text-[11px] py-1 px-2.5"
                >
                  GitHub ↗
                </a>
              )}
              {linkedin && (
                <a
                  href={linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-retro-outline text-[11px] py-1 px-2.5"
                >
                  LinkedIn ↗
                </a>
              )}
              {twitter && (
                <a
                  href={twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-retro-outline text-[11px] py-1 px-2.5"
                >
                  Twitter / X ↗
                </a>
              )}
              {facebook && (
                <a
                  href={facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-retro-outline text-[11px] py-1 px-2.5"
                >
                  Facebook ↗
                </a>
              )}
            </div>
          </div>

        </div>

        {/* Bottom Colophon */}
        <div className="border-t border-[#D6CEBE] pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-[#78716C]">
          <p>
            {copyright}
          </p>
          <p>
            Minimalist retro experience inspired by authentic paper design.
          </p>
        </div>

      </div>
    </footer>
  );
}
