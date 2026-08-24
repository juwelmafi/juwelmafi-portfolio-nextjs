"use client";
import { useEffect, useState } from "react";

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

export default function SidebarTools() {
  const [theme, setTheme] = useState("dark");
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const saved = localStorage.getItem("darkMode") || "dark";
    setTheme(saved);
    if (saved === "dark") {
      document.body.classList.add("dark-mode");
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      document.body.classList.remove("dark-mode");
      document.documentElement.setAttribute("data-theme", "light");
    }

    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      for (const item of navItems) {
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(item.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    localStorage.setItem("darkMode", next);
    if (next === "dark") {
      document.body.classList.add("dark-mode");
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      document.body.classList.remove("dark-mode");
      document.documentElement.setAttribute("data-theme", "light");
    }
  };

  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="sidebar-tools pst-v1">
      {/* Top Switch Mode */}
      <div className="nav-top">
        <div
          className="tf-btn-icon toggle-switch-mode cursor-pointer"
          onClick={toggleTheme}
          role="button"
          tabIndex={0}
          aria-label="Toggle theme mode"
        >
          <i className="icon icon-light"></i>
        </div>
      </div>

      {/* Nav List */}
      <ul className="nav-list">
        <div>
          <li className={`nav-item ${activeSection === "home" ? "active" : ""}`}>
            <a href="#home" className="item-link scroll-link">
              <i className="icon icon-home"></i>
              <p className="tool-tip text-caption">Home</p>
            </a>
          </li>
          <li className="br-line"></li>
        </div>

        {navItems.slice(1, 7).map((item) => (
          <div key={item.id}>
            <li className={`nav-item ${activeSection === item.id ? "active" : ""}`}>
              <a href={`#${item.id}`} className="item-link scroll-link">
                <i className={`icon ${item.icon}`}></i>
                <p className="tool-tip text-caption">{item.label}</p>
              </a>
            </li>
          </div>
        ))}

        <div>
          <li className="br-line"></li>
          <li className={`nav-item ${activeSection === "contact" ? "active" : ""}`}>
            <a href="#contact" className="item-link scroll-link">
              <i className="icon icon-send"></i>
              <p className="tool-tip text-caption">Contact</p>
            </a>
          </li>
        </div>
      </ul>

      {/* Bottom Go Top Button */}
      <div className="nav-bottom">
        <a href="#" onClick={scrollToTop} className="tf-btn-icon go-top" aria-label="Scroll to top">
          <i className="icon icon-arrow-top"></i>
        </a>
      </div>
    </div>
  );
}
