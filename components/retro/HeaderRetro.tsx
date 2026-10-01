"use client";

import { useState } from "react";
import Link from "next/link";

interface HeaderRetroProps {
  content?: Record<string, string>;
}

export default function HeaderRetro({ content }: HeaderRetroProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const name = content?.["hero.name"] || "Juwel Hossain";
  const logoText = content?.["site.logoText"] || "jh.";
  const workNav = content?.["header.work"] || "Work";
  const stackNav = content?.["header.stack"] || "The Stack";
  const servicesNav = content?.["header.services"] || "Services";
  const educationNav = content?.["header.education"] || "Education";
  const exploreNav = content?.["header.explore"] || "Writing & Courses";
  const ctaNav = content?.["header.cta"] || "Let's talk";

  return (
    <header className="w-full border-b-2 border-[#191712] bg-[#FBF6E6] sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo & Identity */}
          <Link href="/" className="flex items-center gap-3 text-decoration-none group">
            <div className="w-10 h-10 border-2 border-[#191712] rounded-xl bg-[#FFE45E] flex items-center justify-center font-script font-bold text-2xl text-[#191712] shadow-[2px_2px_0px_#191712] group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform">
              {logoText}
            </div>
            <span className="font-hand font-bold text-xl sm:text-2xl text-[#191712] tracking-wide">
              {name}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-7 font-hand text-lg sm:text-xl text-[#191712]">
            <a href="#projects" className="hover:underline">
              {workNav}
            </a>
            <a href="#technologies" className="hover:underline">
              {stackNav}
            </a>
            <a href="#services" className="hover:underline">
              {servicesNav}
            </a>
            <a href="#education" className="hover:underline">
              {educationNav}
            </a>
            <Link href="/explore" className="hover:underline">
              {exploreNav}
            </Link>
            <a href="/contact" className="btn-small">
              {ctaNav}
            </a>
          </nav>

          {/* Mobile Menu Trigger */}
          <div className="md:hidden flex items-center gap-3">
            <a href="/contact" className="btn-small text-sm py-1 px-3">
              Contact
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 border-2 border-[#191712] rounded bg-[#FFFFFF] font-typewriter text-xs text-[#191712] cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? "CLOSE" : "MENU"}
            </button>
          </div>

        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t-2 border-[#191712] py-4 space-y-3 font-hand text-xl bg-[#FBF6E6]">
            <div>
              <a
                href="#projects"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-1 hover:underline text-[#191712]"
              >
                {workNav}
              </a>
            </div>
            <div>
              <a
                href="#technologies"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-1 hover:underline text-[#191712]"
              >
                {stackNav}
              </a>
            </div>
            <div>
              <a
                href="#services"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-1 hover:underline text-[#191712]"
              >
                {servicesNav}
              </a>
            </div>
            <div>
              <a
                href="#education"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-1 hover:underline text-[#191712]"
              >
                {educationNav}
              </a>
            </div>
            <div>
              <Link
                href="/explore"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-1 hover:underline text-[#191712]"
              >
                {exploreNav}
              </Link>
            </div>
            <div className="pt-2">
              <a
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="btn-hand-black w-full text-center"
              >
                {ctaNav}
              </a>
            </div>
          </div>
        )}

      </div>
    </header>
  );
}
