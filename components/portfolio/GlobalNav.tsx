"use client";

import { usePathname } from "next/navigation";
import SidebarTools from "@/components/portfolio/SidebarTools";

export default function GlobalNav() {
  const pathname = usePathname();

  // Hide portfolio navigation inside admin portal
  if (pathname && pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <>
      <SidebarTools />
    </>
  );
}
