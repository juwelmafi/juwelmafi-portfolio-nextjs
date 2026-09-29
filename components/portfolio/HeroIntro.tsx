"use client";

import { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";
import CountUp from "@/components/portfolio/CountUp";

const techList = [
  "React", "Next.js", "Node.js", "Express", "MongoDB", "TypeScript", "Tailwind CSS", "Firebase", "Stripe"
];

interface HeroIntroProps {
  content?: Record<string, string>;
}

export default function HeroIntro({ content: initialContent }: HeroIntroProps) {
  const [content, setContent] = useState<Record<string, string>>(initialContent || {});

  useEffect(() => {
    // Client-side fetch to ensure instant sync when navigating or updating
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

  const rawHeadline =
    content["hero.headline"] ||
    "I’m building websites & platforms that people remember";

  const rawStatExp = content["hero.statExp"] || "3+ Years of experience";
  const rawStatProjects = content["hero.statProjects"] || "20+ Projects Delivered";
  const techTitle = content["hero.techMarqueeTitle"] || "Tools & Technologies I Use";

  const parseStat = (text: string, defaultNum: number, defaultLabel: string) => {
    const match = text.match(/^(\d+)\+?\s*(.*)$/);
    if (match) {
      return { num: parseInt(match[1], 10), label: match[2] || defaultLabel };
    }
    return { num: defaultNum, label: text || defaultLabel };
  };

  const stat1 = parseStat(rawStatExp, 3, "Years of experience");
  const stat2 = parseStat(rawStatProjects, 20, "Projects Delivered");

  // Format headline with styling for websites & platforms
  const renderHeadline = (text: string) => {
    const pattern = /(websites|&\s*platforms|platforms)/gi;
    if (pattern.test(text)) {
      const parts = text.split(/(websites|&\s*platforms|platforms)/gi);
      return parts.map((part, i) => {
        if (/^websites$/i.test(part)) {
          return (
            <span key={i} className="is-bg active">
              {part}
            </span>
          );
        }
        if (/^(&\s*platforms|platforms)$/i.test(part)) {
          return (
            <span key={i} className="type-2 is-bg active">
              {part.startsWith("&") ? <>&amp; {part.replace(/^&\s*/, "")}</> : part}
            </span>
          );
        }
        return (
          <span
            key={i}
            className="hero-headline-text !text-white"
            style={{ color: "#ffffff" }}
          >
            {part}
          </span>
        );
      });
    }
    return (
      <span className="hero-headline-text !text-white" style={{ color: "#ffffff" }}>
        {text}
      </span>
    );
  };

  return (
    <div id="home" className="section-intro flat-spacing w-full">
      {/* Main Hero Headline */}
      <h1
        className="hero-main-title intro-title letter-space--2 !text-white font-black"
        style={{ color: "#ffffff" }}
      >
        {renderHeadline(rawHeadline)}
      </h1>

      {/* Counters */}
      <div className="box-counter flex flex-wrap items-center gap-10 sm:gap-16 my-8">
        <div className="flex flex-col">
          <div className="hero-stat-number">
            <span>
              <CountUp to={stat1.num} duration={1400} />
            </span>
            <span>+</span>
          </div>
          <p className="hero-stat-label">
            {stat1.label}
          </p>
        </div>

        <div className="hidden sm:block h-16 md:h-20 w-[1px] bg-gradient-to-b from-transparent via-white/20 to-transparent" />

        <div className="flex flex-col">
          <div className="hero-stat-number">
            <span>
              <CountUp to={stat2.num} duration={1800} />
            </span>
            <span>+</span>
          </div>
          <p className="hero-stat-label">
            {stat2.label}
          </p>
        </div>
      </div>

      {/* Tech Stack Marquee */}
      <div className="mt-10 pt-6 border-t border-white/10 w-full max-w-4xl">
        <p className="intro-client text-white/70 text-xs md:text-sm font-semibold mb-4 flex items-center gap-2">
          <i className="icon icon-global-elip text-[#00DE51]"></i>
          <span>{techTitle}</span>
        </p>
        <div className="infiniteSlide-brand py-3.5 bg-white/5 rounded-2xl border border-white/10 overflow-hidden w-full">
          <Marquee speed={40} gradient={false}>
            {techList.map((tech, idx) => (
              <div key={idx} className="mx-6 text-xs md:text-sm font-semibold tracking-widest uppercase text-white/80 hover:text-[#00DE51] transition-colors">
                {tech}
              </div>
            ))}
          </Marquee>
        </div>
      </div>
    </div>
  );
}
