"use client";

import Marquee from "react-fast-marquee";
import CountUp from "@/components/portfolio/CountUp";

const techList = [
  "React", "Next.js", "Node.js", "Express", "MongoDB", "TypeScript", "Tailwind CSS", "Firebase", "Stripe"
];

export default function HeroIntro() {
  return (
    <div id="home" className="section-intro flat-spacing w-full">
      {/* Main Hero Headline (Large & space-filling) */}
      <h1 className="hero-main-title intro-title letter-space--2 text-white font-black">
        I’m building <span className="is-bg active">websites</span>{" "}
        <span className="type-2 is-bg active">&amp; platforms</span> that people remember
      </h1>

      {/* Counters (Bigger typography with live count-up animation) */}
      <div className="box-counter flex flex-wrap items-center gap-10 sm:gap-16 my-8">
        <div className="flex flex-col">
          <div className="hero-stat-number">
            <span>
              <CountUp to={3} duration={1400} />
            </span>
            <span>+</span>
          </div>
          <p className="hero-stat-label">
            Years of experience
          </p>
        </div>

        <div className="hidden sm:block h-16 md:h-20 w-[1px] bg-gradient-to-b from-transparent via-white/20 to-transparent" />

        <div className="flex flex-col">
          <div className="hero-stat-number">
            <span>
              <CountUp to={20} duration={1800} />
            </span>
            <span>+</span>
          </div>
          <p className="hero-stat-label">
            Projects Delivered
          </p>
        </div>
      </div>

      {/* Tech Stack Marquee */}
      <div className="mt-10 pt-6 border-t border-white/10 w-full max-w-4xl">
        <p className="intro-client text-white/70 text-xs md:text-sm font-semibold mb-4 flex items-center gap-2">
          <i className="icon icon-global-elip text-[#00DE51]"></i>
          <span>Tools &amp; Technologies I Use</span>
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
