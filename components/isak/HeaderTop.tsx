"use client";
import { useEffect, useState } from "react";

export default function HeaderTop() {
  const [dateTime, setDateTime] = useState({ date: "", clock: "" });

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        weekday: "short",
        month: "short",
        day: "numeric",
      };
      const dateStr = now.toLocaleDateString("en-US", options);
      const timeStr = now.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      });
      setDateTime({ date: dateStr, clock: timeStr });
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="tf-header-wrap">
      <a href="/" className="logo-site d-lg-none">
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
      </a>
      <div className="left">
        <div className="time-local text-body-3">
          <p className="date">{dateTime.date}</p>
          <p className="clock">{dateTime.clock}</p>
        </div>
      </div>
    </div>
  );
}
