"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import {
  FaUser,
  FaEnvelope,
  FaShieldAlt,
  FaExternalLinkAlt,
  FaDatabase,
  FaCode,
} from "react-icons/fa";

export default function AdminProfile() {
  const { data: session } = useSession();

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 gap-3 border-b-2 border-[#191712]">
        <div>
          <p className="retro-eyebrow !mb-1">IDENTITY DOSSIER</p>
          <h1 className="font-script font-bold text-3xl sm:text-4xl text-[#191712] leading-tight">
            Profile &amp; <span className="marked">System Settings</span>
          </h1>
          <p className="font-hand text-base text-[#57534E] mt-0.5">
            Administrator account profile, platform roles and database configuration
          </p>
        </div>
        <Link href="/" target="_blank" className="btn-small text-xs self-start sm:self-auto">
          <FaExternalLinkAlt className="mr-1.5" /> View Portfolio
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="hand-box p-6 sm:p-7 bg-[#FFFFFF] flex flex-col items-center text-center relative">
          
          {/* Avatar Circle with Retro Border and Yellow Accent */}
          <div className="w-24 h-24 rounded-full border-2 border-[#191712] overflow-hidden mb-4 bg-[#FFE45E] flex items-center justify-center text-3xl font-script font-bold text-[#191712] relative shadow-[3px_3px_0px_#191712]">
            <span>JH</span>
            <Image
              src="/assets/images/avatar/juwel_retro.png"
              alt="Juwel Hossain"
              width={96}
              height={96}
              className="w-full h-full object-cover absolute inset-0"
              onError={(e) => {
                (e.currentTarget as HTMLElement).style.display = "none";
              }}
            />
          </div>

          <h2 className="font-script font-bold text-2xl text-[#191712]">Juwel Hossain</h2>
          <p className="font-hand text-sm text-[#57534E] mt-0.5">MERN Stack &amp; Next.js 15 Engineer</p>
          
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded border border-[#191712] bg-[#FFE45E] text-[#191712] font-typewriter text-xs font-bold mt-3 shadow-[1px_1px_0px_#191712]">
            <span className="w-2 h-2 rounded-full bg-[#191712]" /> Super Admin
          </span>

          <div className="w-full mt-6 pt-4 border-t border-[#191712]/20 space-y-3 text-left font-hand text-base">
            <div className="flex items-center justify-between text-[#57534E]">
              <span className="flex items-center gap-2 text-[#191712] font-bold"><FaEnvelope /> Email</span>
              <span className="text-[#191712] font-typewriter text-xs truncate max-w-[160px]">
                {session?.user?.email || "juwelhossain16457@gmail.com"}
              </span>
            </div>
            <div className="flex items-center justify-between text-[#57534E]">
              <span className="flex items-center gap-2 text-[#191712] font-bold"><FaShieldAlt /> Role</span>
              <span className="text-[#191712] font-typewriter text-xs">Administrator</span>
            </div>
            <div className="flex items-center justify-between text-[#57534E]">
              <span className="flex items-center gap-2 text-[#191712] font-bold"><FaDatabase /> Database</span>
              <span className="text-[#191712] font-typewriter text-xs">MongoDB Atlas</span>
            </div>
          </div>
        </div>

        {/* Platform Overview & Environment */}
        <div className="lg:col-span-2 hand-box p-6 sm:p-7 bg-[#FFFFFF] space-y-6">
          <div>
            <h3 className="font-script font-bold text-2xl text-[#191712] mb-2 flex items-center gap-2">
              <FaCode className="text-[#191712]" /> Platform Overview
            </h3>
            <p className="font-hand text-base text-[#57534E] leading-relaxed">
              This portfolio console manages live database-driven records for your Next.js application. All content updates are statically revalidated across endpoints, ensuring instant load times and fresh data for prospective clients and students.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="bg-[#FAF7EE] p-4 rounded-md border-2 border-[#191712] shadow-[2px_2px_0px_#191712]">
              <p className="font-typewriter text-[11px] text-[#C2410C] uppercase tracking-wider font-bold">Framework</p>
              <p className="font-script font-bold text-xl text-[#191712] mt-1">Next.js 16 + React 19</p>
              <p className="font-hand text-xs text-[#78716C] mt-0.5">Turbopack SSR &amp; SSG routing</p>
            </div>

            <div className="bg-[#FAF7EE] p-4 rounded-md border-2 border-[#191712] shadow-[2px_2px_0px_#191712]">
              <p className="font-typewriter text-[11px] text-[#C2410C] uppercase tracking-wider font-bold">Styling &amp; Theme</p>
              <p className="font-script font-bold text-xl text-[#191712] mt-1">Retro Hand-drawn Paper</p>
              <p className="font-hand text-xs text-[#78716C] mt-0.5">Warm beige &amp; yellow aesthetic</p>
            </div>

            <div className="bg-[#FAF7EE] p-4 rounded-md border-2 border-[#191712] shadow-[2px_2px_0px_#191712]">
              <p className="font-typewriter text-[11px] text-[#C2410C] uppercase tracking-wider font-bold">Authentication</p>
              <p className="font-script font-bold text-xl text-[#191712] mt-1">NextAuth.js v5</p>
              <p className="font-hand text-xs text-[#78716C] mt-0.5">Secure JWT &amp; session tokens</p>
            </div>

            <div className="bg-[#FAF7EE] p-4 rounded-md border-2 border-[#191712] shadow-[2px_2px_0px_#191712]">
              <p className="font-typewriter text-[11px] text-[#C2410C] uppercase tracking-wider font-bold">Live Database</p>
              <p className="font-script font-bold text-xl text-[#191712] mt-1">MongoDB Atlas</p>
              <p className="font-hand text-xs text-[#78716C] mt-0.5">Mongoose ODM schemas &amp; seed engine</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
