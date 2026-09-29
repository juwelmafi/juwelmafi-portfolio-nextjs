"use client";
import { useState, useEffect } from "react";
import { FaYoutube, FaLinkedin, FaGithub } from "react-icons/fa";

const rotatingWords = ["Juwel", "Full-Stack Dev", "MERN Specialist"];

export default function SidebarUser() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % rotatingWords.length);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="sidebar-user">
      <div className="wrap">
        {/* User Image */}
        <div className="user-image">
          <div className="image">
            <img
              width={468}
              height={856}
              src="/assets/images/avatar/avatar.png"
              alt="Juwel Hossain"
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
              <span className="text-vertical">Available for Work</span>
              <span className="dot"></span>
            </p>
          </div>
        </div>


        {/* Social Icons */}
        <ul className="tf-social-icon-2 user-social d-grid">
          <li>
            <a
              href="https://www.youtube.com/@juwelmafi"
              target="_blank"
              rel="noreferrer"
              aria-label="YouTube"
              className="flex items-center justify-center text-[#FF0000] hover:scale-110 transition-transform"
            >
              <FaYoutube className="w-5 h-5" />
            </a>
          </li>
          <li>
            <a
              href="https://www.linkedin.com/in/juwelmafi"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="flex items-center justify-center text-white hover:text-[#00DE51] hover:scale-110 transition-all"
            >
              <FaLinkedin className="w-5 h-5" />
            </a>
          </li>
          <li>
            <a
              href="https://github.com/juwelmafi"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="flex items-center justify-center text-white hover:text-[#00DE51] hover:scale-110 transition-all"
            >
              <FaGithub className="w-5 h-5" />
            </a>
          </li>
        </ul>

        {/* User Info */}
        <div className="user-info">
          <p className="avaiable-dot text-body-3 fw-medium d-sm-none text-white">
            <span className="dot"></span>
            <span>Available for Work</span>
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
            Passionate MERN &amp; Next.js developer studying CSE at Sonargaon University, building scalable web apps in Bangladesh.
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
              <span className="!text-[#0A0A14] font-extrabold whitespace-nowrap">Let’s talk</span>
            </a>
            <a
              href="https://drive.google.com/file/d/1NyyfiNHplq8Dy3rrW8qe_1fTP97MqJfE/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="action-down text-white/80 hover:text-[#00DE51] transition-colors inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-semibold whitespace-nowrap py-1"
            >
              <i className="icon icon-download text-xs"></i>
              <span>Download CV</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
