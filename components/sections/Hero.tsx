"use client";
import { useEffect, useRef } from "react";
import { Typewriter } from "react-simple-typewriter";
import { FaGithub, FaLinkedin, FaYoutube, FaDownload, FaArrowDown } from "react-icons/fa";
import Image from "next/image";

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    const handleMouse = (e: MouseEvent) => {
      const rect = hero.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      hero.style.setProperty("--mouse-x", `${x}%`);
      hero.style.setProperty("--mouse-y", `${y}%`);
    };
    hero.addEventListener("mousemove", handleMouse);
    return () => hero.removeEventListener("mousemove", handleMouse);
  }, []);

  const scrollToAbout = () => {
    const el = document.getElementById("about");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: "var(--bg-base)" }}
    >
      {/* Background Orbs */}
      <div
        className="orb"
        style={{
          width: 600,
          height: 600,
          background: "var(--accent)",
          top: "10%",
          right: "-10%",
          opacity: 0.07,
        }}
      />
      <div
        className="orb"
        style={{
          width: 400,
          height: 400,
          background: "#7B5EA7",
          bottom: "5%",
          left: "-5%",
          opacity: 0.08,
        }}
      />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(253,203,110,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(253,203,110,0.03) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 py-32 w-full">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
          {/* Left Text */}
          <div className="flex-1 max-w-2xl">
            {/* Badge */}
            <div className="mb-6">
              <span className="section-label">👋 Available for Work</span>
            </div>

            {/* Name */}
            <h1 className="heading-font text-5xl lg:text-7xl font-extrabold text-white mb-4 leading-none tracking-tight">
              Juwel
              <br />
              <span>Hossain</span>
              <span style={{ color: "var(--accent)" }}>.</span>
            </h1>

            {/* Divider */}
            <div className="section-divider mb-6" />

            {/* Typewriter */}
            <p className="heading-font text-xl lg:text-2xl font-semibold mb-4 min-h-[2.5rem]" style={{ color: "var(--text-muted)" }}>
              Self Learner &{" "}
              <span style={{ color: "var(--accent)" }} className="mono-font">
                <Typewriter
                  words={["Frontend Developer.", "MERN Stack Developer.", "React Developer.", "Next.js Developer."]}
                  loop={true}
                  cursor
                  cursorStyle="|"
                  typeSpeed={65}
                  deleteSpeed={45}
                  delaySpeed={1200}
                />
              </span>
            </p>

            {/* Bio */}
            <p className="text-base leading-relaxed mb-8 max-w-lg" style={{ color: "var(--text-muted)" }}>
              Coding is my passion. I enjoy building beautiful, accessible, and scalable web experiences — one component at a time.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 mb-10">
              <a
                href="https://drive.google.com/file/d/1NyyfiNHplq8Dy3rrW8qe_1fTP97MqJfE/view?usp=sharing"
                target="_blank"
                rel="noreferrer"
                className="btn-primary"
              >
                <FaDownload className="text-sm" />
                Download CV
              </a>
              <button
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                className="btn-outline"
              >
                Let&apos;s Talk
              </button>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-5">
              <span className="text-xs uppercase tracking-widest" style={{ color: "var(--text-subtle)" }}>Find me on</span>
              <div className="h-px flex-1 max-w-[40px]" style={{ background: "var(--border)" }} />
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
                  className="text-xl transition-all duration-300 hover:scale-110"
                  style={{ color: "var(--text-muted)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Right — Photo */}
          <div className="relative flex-shrink-0">
            {/* Ring decorations */}
            <div
              className="absolute inset-0 rounded-full animate-spin"
              style={{
                border: "1px dashed rgba(253,203,110,0.2)",
                transform: "scale(1.15)",
                animationDuration: "20s",
              }}
            />
            <div
              className="absolute inset-0 rounded-full"
              style={{
                border: "1px solid rgba(253,203,110,0.08)",
                transform: "scale(1.3)",
              }}
            />

            {/* Photo Frame */}
            <div
              className="relative w-64 h-64 lg:w-80 lg:h-80 rounded-full overflow-hidden"
              style={{
                border: "3px solid var(--border-accent)",
                boxShadow: "0 0 60px rgba(253,203,110,0.12), 0 0 0 8px rgba(253,203,110,0.05)",
              }}
            >
              <Image
                src="https://i.ibb.co/xKd3jY5K/20250629-181542.png"
                alt="Juwel Hossain"
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Floating badge — experience */}
            <div
              className="absolute -bottom-3 -left-4 glass-card px-4 py-2.5 shadow-lg"
              style={{ border: "1px solid var(--border-accent)" }}
            >
              <p className="heading-font text-2xl font-bold" style={{ color: "var(--accent)" }}>1+</p>
              <p className="text-xs" style={{ color: "var(--text-muted)" }}>Years Coding</p>
            </div>

            {/* Floating badge — projects */}
            <div
              className="absolute -top-2 -right-4 glass-card px-4 py-2.5 shadow-lg"
              style={{ border: "1px solid var(--border-accent)" }}
            >
              <p className="heading-font text-2xl font-bold" style={{ color: "var(--accent)" }}>10+</p>
              <p className="text-xs" style={{ color: "var(--text-muted)" }}>Projects</p>
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        <button
          onClick={scrollToAbout}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-60 hover:opacity-100 transition-opacity"
          aria-label="Scroll down"
        >
          <span className="text-xs tracking-widest uppercase" style={{ color: "var(--text-muted)" }}>Scroll</span>
          <FaArrowDown className="animate-bounce" style={{ color: "var(--accent)" }} />
        </button>
      </div>
    </section>
  );
}
