"use client";
import { useEffect, useState } from "react";

export default function Preloader() {
  const [loaded, setLoaded] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded(true);
      const hideTimer = setTimeout(() => {
        setHidden(true);
      }, 600);
      return () => clearTimeout(hideTimer);
    }, 400);

    return () => clearTimeout(timer);
  }, []);

  if (hidden) return null;

  return (
    <div
      className="preload preload-container bg-dark"
      id="preload"
      style={{
        opacity: loaded ? 0 : 1,
        pointerEvents: loaded ? "none" : "all",
        transition: "opacity 0.6s ease",
      }}
    >
      <div className="preload-logo">
        <div className="spinner"></div>
      </div>
    </div>
  );
}
