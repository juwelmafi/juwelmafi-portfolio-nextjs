"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { FaUser, FaEnvelope, FaShieldAlt, FaExternalLinkAlt, FaDatabase, FaCode } from "react-icons/fa";

export default function AdminProfile() {
  const { data: session } = useSession();

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 gap-3">
        <div>
          <h1 className="heading-font text-[26px] lg:text-[32px] font-bold text-white leading-tight">Profile &amp; Settings</h1>
          <p className="text-xs sm:text-sm mt-0.5 text-[#888899]">
            Administrator account profile, platform roles and database configuration
          </p>
        </div>
        <Link href="/" target="_blank" className="btn-outline text-xs self-start sm:self-auto">
          <FaExternalLinkAlt /> View Portfolio
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="glass-card p-6 flex flex-col items-center text-center">
          <div className="w-24 h-24 rounded-full ring-4 ring-[#00DE51] ring-offset-4 ring-offset-[#171A28] overflow-hidden mb-4 bg-[#00DE51]/20 flex items-center justify-center text-3xl font-bold text-[#00DE51] relative shadow-lg">
            <span className="font-bold text-2xl text-[#00DE51]">JH</span>
            <Image
              src="/assets/images/user/user-1.jpg"
              alt="Juwel Hossain"
              width={96}
              height={96}
              className="w-full h-full object-cover absolute inset-0"
              onError={(e) => {
                (e.currentTarget as HTMLElement).style.display = "none";
              }}
            />
          </div>

          <h2 className="heading-font text-[18px] lg:text-[20px] font-bold text-white">Juwel Hossain</h2>
          <p className="text-xs text-[#00DE51] font-medium mt-0.5">MERN Stack &amp; Next.js Developer</p>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00DE51]/10 text-[#00DE51] text-xs font-semibold mt-3">
            <span className="w-2 h-2 rounded-full bg-[#00DE51] animate-pulse" /> Super Admin
          </span>

          <div className="w-full mt-6 pt-4 space-y-3 text-left text-xs">
            <div className="flex items-center justify-between text-[#8E95B3]">
              <span className="flex items-center gap-2"><FaEnvelope className="text-[#00DE51]" /> Email</span>
              <span className="text-white font-mono truncate max-w-[160px]">{session?.user?.email || "juwelhossain16457@gmail.com"}</span>
            </div>
            <div className="flex items-center justify-between text-[#8E95B3]">
              <span className="flex items-center gap-2"><FaShieldAlt className="text-[#00DE51]" /> Role</span>
              <span className="text-white font-mono">Administrator</span>
            </div>
            <div className="flex items-center justify-between text-[#8E95B3]">
              <span className="flex items-center gap-2"><FaDatabase className="text-[#00DE51]" /> Database</span>
              <span className="text-white font-mono">MongoDB Atlas</span>
            </div>
          </div>
        </div>

        {/* Platform Overview & Environment */}
        <div className="lg:col-span-2 glass-card p-6 space-y-6">
          <div>
            <h3 className="text-[18px] lg:text-[20px] font-bold text-white mb-2 flex items-center gap-2">
              <FaCode className="text-[#00DE51]" /> Platform Overview
            </h3>
            <p className="text-xs text-[#8E95B3] leading-relaxed">
              This portfolio console manages live database-driven records for your Next.js 16 application. All content updates are statically revalidated across endpoints, ensuring instant load times and fresh data for prospective clients and students.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="bg-[#1A1E2F] p-4 rounded-2xl">
              <p className="text-[11px] text-[#7E849E] uppercase tracking-wider font-semibold">Framework</p>
              <p className="text-sm font-bold text-white mt-1">Next.js 16 + React 19</p>
              <p className="text-[11px] text-[#636984] mt-0.5">Turbopack SSR &amp; SSG routing</p>
            </div>

            <div className="bg-[#1A1E2F] p-4 rounded-2xl">
              <p className="text-[11px] text-[#7E849E] uppercase tracking-wider font-semibold">Styling &amp; Theme</p>
              <p className="text-sm font-bold text-white mt-1">Tailwind CSS + Glass Drop</p>
              <p className="text-[11px] text-[#636984] mt-0.5">Borderless ambient depth system</p>
            </div>

            <div className="bg-[#1A1E2F] p-4 rounded-2xl">
              <p className="text-[11px] text-[#7E849E] uppercase tracking-wider font-semibold">Authentication</p>
              <p className="text-sm font-bold text-white mt-1">NextAuth.js v4</p>
              <p className="text-[11px] text-[#636984] mt-0.5">Secure JWT &amp; session tokens</p>
            </div>

            <div className="bg-[#1A1E2F] p-4 rounded-2xl">
              <p className="text-[11px] text-[#7E849E] uppercase tracking-wider font-semibold">Live Database</p>
              <p className="text-sm font-bold text-white mt-1">MongoDB Atlas</p>
              <p className="text-[11px] text-[#636984] mt-0.5">Mongoose ODM schemas &amp; seed engine</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
