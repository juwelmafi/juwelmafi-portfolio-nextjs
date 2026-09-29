"use client";

import { usePathname } from "next/navigation";
import SidebarTools from "@/components/portfolio/SidebarTools";

export default function GlobalNav() {
  const pathname = usePathname();

  // Hide portfolio navigation inside admin portal and login page
  if (pathname && (pathname.startsWith("/admin") || pathname === "/login")) {
    return null;
  }

  return (
    <>
      <SidebarTools />
    </>
  );
}
