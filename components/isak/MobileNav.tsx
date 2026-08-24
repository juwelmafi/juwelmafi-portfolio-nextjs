"use client";
import { useState } from "react";

const navItems = [
  { id: "home",        icon: "icon-home",        label: "Home" },
  { id: "about",       icon: "icon-user-circle", label: "About" },
  { id: "education",   icon: "icon-edu",         label: "Education" },
  { id: "work",        icon: "icon-high-light",  label: "Work" },
  { id: "service",     icon: "icon-service",     label: "Services" },
  { id: "tech",        icon: "icon-tech-stack",  label: "Tech" },
  { id: "testimonial", icon: "icon-tes",         label: "Testimonials" },
  { id: "contact",     icon: "icon-send",        label: "Contact" },
];

export default function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="action-open-mobile d-lg-none">
        <div
          className="tf-btn-icon style-2 cursor-pointer"
          onClick={() => setOpen(!open)}
          role="button"
          tabIndex={0}
        >
          <div className={`btn-mobile-menu ${open ? "active" : ""}`}>
            <span></span>
          </div>
        </div>

        <div className={`nav-mobile-list ${open ? "show" : ""}`}>
          <ul className="nav-mobile-item">
            <div>
              <li className="nav-item">
                <a
                  href="#home"
                  onClick={() => setOpen(false)}
                  className="item-link scroll-link"
                >
                  <i className="icon icon-home"></i>
                  <p className="tool-tip text-caption">Home</p>
                </a>
              </li>
              <li className="br-line"></li>
            </div>

            {navItems.slice(1, 7).map((item) => (
              <div key={item.id}>
                <li className="nav-item">
                  <a
                    href={`#${item.id}`}
                    onClick={() => setOpen(false)}
                    className="item-link scroll-link"
                  >
                    <i className={`icon ${item.icon}`}></i>
                    <p className="tool-tip text-caption">{item.label}</p>
                  </a>
                </li>
              </div>
            ))}

            <div>
              <li className="br-line"></li>
              <li className="nav-item">
                <a
                  href="#contact"
                  onClick={() => setOpen(false)}
                  className="item-link scroll-link"
                >
                  <i className="icon icon-send"></i>
                  <p className="tool-tip text-caption">Contact</p>
                </a>
              </li>
            </div>
          </ul>
        </div>
      </div>

      {open && (
        <div
          className="overlay-pop show"
          style={{ display: "block" }}
          onClick={() => setOpen(false)}
        />
      )}
    </>
  );
}
