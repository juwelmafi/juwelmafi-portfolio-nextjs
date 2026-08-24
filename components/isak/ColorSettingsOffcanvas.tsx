"use client";
import { useState, useEffect } from "react";

const allColorClasses = [
  "type-body-default",
  "type-body-v1",
  "type-body-v2",
  "type-body-v3",
  "type-dark-v1",
  "type-dark-v2",
  "type-dark-v3",
];

const colorThemes = [
  { id: "type-body-default", name: "Default", theme: "theme-light" },
  { id: "type-body-v1",      name: "Silver Dawn", theme: "theme-light" },
  { id: "type-body-v2",      name: "Lavender Stone", theme: "theme-light" },
  { id: "type-body-v3",      name: "Ocean Breeze", theme: "theme-light" },
  { id: "type-dark-v1",      name: "Midnight Fade", theme: "theme-dark" },
  { id: "type-dark-v2",      name: "Charcoal Mist", theme: "theme-dark" },
  { id: "type-dark-v3",      name: "Forest Shadow", theme: "theme-dark" },
];

export default function ColorSettingsOffcanvas() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeColor, setActiveColor] = useState("type-dark-v1");

  useEffect(() => {
    const saved = localStorage.getItem("theme-color") || "type-dark-v1";
    setActiveColor(saved);
    applyColorClass(saved);
  }, []);

  const applyColorClass = (colorId: string) => {
    allColorClasses.forEach((c) => document.body.classList.remove(c));
    document.body.classList.add(colorId);
    document.documentElement.setAttribute("data-theme-color", colorId);
  };

  const handleSelectColor = (colorId: string, themeType: string) => {
    setActiveColor(colorId);
    localStorage.setItem("theme-color", colorId);
    applyColorClass(colorId);

    // If selected a dark theme, ensure dark-mode class is present
    if (themeType === "theme-dark") {
      document.body.classList.add("dark-mode");
      document.documentElement.setAttribute("data-theme", "dark");
      localStorage.setItem("darkMode", "dark");
    } else {
      document.body.classList.remove("dark-mode");
      document.documentElement.setAttribute("data-theme", "light");
      localStorage.setItem("darkMode", "light");
    }
  };

  return (
    <>
      {/* Floating Gear Button on Top-Left */}
      <div className="tf-left-bar">
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="btn-setting-color tf-btn-icon style-2"
          aria-label="Open color settings"
        >
          <i className="icon-gear"></i>
        </button>
      </div>

      {/* Offcanvas Drawer */}
      <div
        className={`offcanvas offcanvas-end offcanvas-color ${isOpen ? "show" : ""}`}
        id="settingColorMenu"
        style={{
          visibility: isOpen ? "visible" : "hidden",
          transition: "transform 0.4s ease, visibility 0.4s ease",
        }}
      >
        <div className="offcanvas-content">
          <div className="canvas-header">
            <h5 className="letter-space--2">Configuration</h5>
            <span
              className="icon-close-popup cursor-pointer"
              role="button"
              tabIndex={0}
              onClick={() => setIsOpen(false)}
            >
              <i className="icon-close"></i>
            </span>
          </div>
          <div className="canvas-body">
            <h6 className="title">Color</h6>
            <div className="settings-color list-choose">
              {colorThemes.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleSelectColor(item.id, item.theme)}
                  className={`btn-color ${item.theme} choose-item ${
                    activeColor === item.id ? "active" : ""
                  }`}
                >
                  <span className={`color ${item.id}`}></span>
                  <span className="text">{item.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="overlay-pop show"
          style={{ display: "block" }}
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
