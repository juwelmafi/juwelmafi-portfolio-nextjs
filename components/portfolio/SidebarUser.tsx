"use client";
import { useState, useEffect } from "react";
import { FaYoutube, FaLinkedin, FaGithub } from "react-icons/fa";

interface SidebarUserProps {
  content?: Record<string, string>;
}

export default function SidebarUser({ content: initialContent }: SidebarUserProps) {
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

  // Parse rotating words from hero.greeting
  // e.g. "Hey, I’m Juwel / Full-Stack Dev / MERN Specialist"
  const rawGreeting = content["hero.greeting"] || "Hey, I’m Juwel / Full-Stack Dev / MERN Specialist";
  const cleaned = rawGreeting.replace(/^hey,\s*i['’]m\s*/i, "");
  const parsedWords = cleaned.split(/[\/,]/).map((s) => s.trim()).filter(Boolean);
  const rotatingWords = parsedWords.length > 0 ? parsedWords : ["Juwel", "Full-Stack Dev", "MERN Specialist"];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % rotatingWords.length);
    }, 2800);
    return () => clearInterval(timer);
  }, [rotatingWords.length]);

  const avatar = content["hero.avatar"] || "/assets/images/avatar/avatar.png";
  const name = content["hero.name"] || "Juwel Hossain";
  const badge = content["hero.badge"] || "Available for Work";
  const tagline =
    content["hero.tagline"] ||
    "Passionate MERN & Next.js developer studying CSE at Sonargaon University, building scalable web apps in Bangladesh.";
  const cta = content["hero.cta"] || "Let’s talk";
  const resumeUrl =
    content["hero.resumeUrl"] ||
    "https://drive.google.com/file/d/1NyyfiNHplq8Dy3rrW8qe_1fTP97MqJfE/view?usp=sharing";

  const youtube = content["social.youtube"] || "https://www.youtube.com/@juwelmafi";
  const linkedin = content["social.linkedin"] || "https://www.linkedin.com/in/juwelmafi";
  const github = content["social.github"] || "https://github.com/juwelmafi";

  return (
    <div className="sidebar-user">
      <div className="wrap">
        {/* User Image */}
        <div className="user-image">
          <div className="image">
            <img
              width={468}
              height={856}
              src={avatar}
              alt={name}
              className="object-cover w-full h-full"
            />
          </div>
          <div className="meta-left d-none d-sm-block">
            <div className="bg-item-svg">
              <img
                className="image-switch"
                data-light="/assets/images/item/vector-user.svg"
                data-dark="/assets/images/item/vector-user_dark.svg"
                loading="lazy"
                width={32}
                height={227}
                src="/assets/images/item/vector-user_dark.svg"
                alt="Ribbon"
              />
            </div>
            <p className="avaiable-dot vertical text-body-3 text-white fw-medium">
              <span className="text-vertical">{badge}</span>
              <span className="dot"></span>
            </p>
          </div>
        </div>

        {/* Social Icons */}
        <ul className="tf-social-icon-2 user-social d-grid">
          {youtube && (
            <li>
              <a
                href={youtube}
                target="_blank"
                rel="noreferrer"
                aria-label="YouTube"
                className="flex items-center justify-center text-[#FF0000] hover:scale-110 transition-transform"
              >
                <FaYoutube className="w-5 h-5" />
              </a>
            </li>
          )}
          {linkedin && (
            <li>
              <a
                href={linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="flex items-center justify-center text-white hover:text-[#00DE51] hover:scale-110 transition-all"
              >
                <FaLinkedin className="w-5 h-5" />
              </a>
            </li>
          )}
          {github && (
            <li>
              <a
                href={github}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="flex items-center justify-center text-white hover:text-[#00DE51] hover:scale-110 transition-all"
              >
                <FaGithub className="w-5 h-5" />
              </a>
            </li>
          )}
        </ul>

        {/* User Info */}
        <div className="user-info">
          <p className="avaiable-dot text-body-3 fw-medium d-sm-none text-white">
            <span className="dot"></span>
            <span>{badge}</span>
          </p>
          <h5 className="greeting letter-space--2 text-white animationtext clip font-bold">
            Hey, I’m{" "}
            <span className="cd-words-wrapper">
              <span className="item-text is-visible" key={rotatingWords[index]}>
                {rotatingWords[index]}
              </span>
            </span>
          </h5>
          <p className="introduce text-white/70 letter-space--05 text-body-3 leading-relaxed mt-2">
            {tagline}
          </p>
          <div className="br-line my-3 sm:my-4 border-t border-white/10"></div>
          <div className="action-group flex items-center gap-3 sm:gap-4 flex-wrap">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-3.5 py-2 sm:px-4 sm:py-2 rounded-full bg-[#00DE51] hover:bg-[#33FF77] !text-[#0A0A14] font-extrabold text-[11.5px] sm:text-xs shadow-md shadow-[#00DE51]/25 transition-all hover:scale-105 active:scale-95 group shrink-0"
              style={{ textDecoration: "none", border: "none" }}
            >
              <span className="w-4 h-4 rounded-full bg-black/15 flex items-center justify-center shrink-0 transition-transform group-hover:rotate-45">
                <i className="icon icon-arrow-right-top text-[8.5px] text-black font-bold"></i>
              </span>
              <span className="!text-[#0A0A14] font-extrabold whitespace-nowrap">{cta}</span>
            </a>
            {resumeUrl && (
              <a
                href={resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="action-down text-white/80 hover:text-[#00DE51] transition-colors inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-semibold whitespace-nowrap py-1"
              >
                <i className="icon icon-download text-xs"></i>
                <span>Download CV</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
