"use client";
import { useState, useEffect } from "react";

const rotatingWords = ["Isak", "Designer", "Developer"];

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
              alt="Avatar"
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
            <p className="avaiable-dot vertical text-body-3 text-black-72 fw-medium">
              <span className="text-vertical">Available for Work</span>
              <span className="dot"></span>
            </p>
          </div>
        </div>

        {/* User Logo */}
        <div className="user-logo d-none d-lg-block">
          <img
            className="image-switch"
            data-light="/assets/images/logo/logo.svg"
            data-dark="/assets/images/logo/logo-2.svg"
            loading="lazy"
            width={40}
            height={40}
            src="/assets/images/logo/logo-2.svg"
            alt="Logo"
          />
        </div>

        {/* Social Icons */}
        <ul className="tf-social-icon-2 user-social d-grid">
          <li>
            <a href="https://x.com" target="_blank" rel="noreferrer" aria-label="X">
              <i className="icon icon-x"></i>
            </a>
          </li>
          <li>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn">
              <i className="icon icon-linkin"></i>
            </a>
          </li>
          <li>
            <a href="https://github.com/juwelmafi" target="_blank" rel="noreferrer" aria-label="GitHub">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
              </svg>
            </a>
          </li>
        </ul>

        {/* User Info */}
        <div className="user-info">
          <p className="avaiable-dot text-body-3 fw-medium d-sm-none">
            <span className="dot"></span>
            <span>Available for Work</span>
          </p>
          <h5 className="greeting letter-space--2 text-white animationtext clip">
            Hey, I’m{" "}
            <span className="cd-words-wrapper">
              <span className="item-text is-visible" key={rotatingWords[index]}>
                {rotatingWords[index]}
              </span>
            </span>
          </h5>
          <p className="introduce text-white-56 letter-space--05 text-body-3">
            I help startups grow with smart design and no-code development, based in Cupertino, CA.
          </p>
          <div className="br-line"></div>
          <div className="action-group">
            <a href="#contact" className="tf-btn-action">
              <span className="ic-wrap">
                <i className="icon icon-arrow-right-top"></i>
              </span>
              <span className="text text-body-3 letter-space--05 fw-medium">
                Let’s talk
              </span>
              <span className="ic-wrap">
                <i className="icon icon-arrow-right-top"></i>
              </span>
            </a>
            <a href="#" className="action-down">
              <i className="icon icon-download"></i>
              <span className="text-body-3">Download CV</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
