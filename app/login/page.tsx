"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaLock, FaEnvelope, FaEye, FaEyeSlash } from "react-icons/fa";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (result?.error) {
      setError("Invalid credentials. Please verify your email and password.");
    } else {
      router.push("/admin");
      router.refresh();
    }
  };

  return (
    <div className="retro-page-container min-h-screen w-full flex items-center justify-center px-4 py-12 relative overflow-hidden">
      
      {/* Return to Portfolio Link */}
      <div className="absolute top-6 left-6 sm:left-10 z-20">
        <Link
          href="/"
          className="font-hand text-lg text-[#191712] hover:underline"
        >
          ← Return to Portfolio
        </Link>
      </div>

      <div className="w-full max-w-md mx-auto relative z-10">
        
        {/* Masking tape on top of the login card */}
        <div className="tape tape-top" aria-hidden="true" />

        {/* Hand-drawn Login Docket Card */}
        <div className="hand-box p-8 sm:p-10 bg-[#FFFFFF] relative shadow-[6px_7px_0px_#191712]">
          
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-12 h-12 border-2 border-[#191712] rounded-xl bg-[#FFE45E] flex items-center justify-center mx-auto mb-3 shadow-[2px_2px_0px_#191712]">
              <FaLock className="text-xl text-[#191712]" />
            </div>

            <p className="retro-eyebrow mb-1">
              AUTHORIZED ACCESS ONLY
            </p>

            <h1 className="font-script font-bold text-3xl sm:text-4xl text-[#191712] leading-tight">
              Admin <span className="marked">Terminal</span>
            </h1>

            <p className="font-hand text-base sm:text-lg text-[#57534E] mt-1">
              Sign in to manage projects, blogs, and curriculum.
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-3 bg-[#FEE2E2] border-2 border-[#DC2626] rounded-md font-hand text-base text-[#991B1B]">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Field */}
            <div>
              <label className="block font-typewriter text-xs uppercase tracking-wider mb-1.5 text-[#191712] font-bold">
                Admin Email Address
              </label>
              <div className="relative flex items-center w-full">
                <span className="absolute left-3.5 text-[#78716C]">
                  <FaEnvelope size={14} />
                </span>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@example.com"
                  className="w-full pl-10 pr-4 py-2.5 bg-[#FAF7EE] border-2 border-[#191712] rounded-md font-hand text-lg text-[#191712] focus:outline-none focus:bg-[#FFFFFF] focus:ring-2 focus:ring-[#FFE45E] transition-all"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block font-typewriter text-xs uppercase tracking-wider mb-1.5 text-[#191712] font-bold">
                Security Password
              </label>
              <div className="relative flex items-center w-full">
                <span className="absolute left-3.5 text-[#78716C]">
                  <FaLock size={14} />
                </span>
                <input
                  type={showPass ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-11 py-2.5 bg-[#FAF7EE] border-2 border-[#191712] rounded-md font-hand text-lg text-[#191712] focus:outline-none focus:bg-[#FFFFFF] focus:ring-2 focus:ring-[#FFE45E] transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3.5 text-[#78716C] hover:text-[#191712] cursor-pointer"
                  tabIndex={-1}
                >
                  {showPass ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="btn-hand-black w-full justify-center text-xl cursor-pointer"
              >
                {loading ? "Authenticating..." : "Enter Terminal →"}
              </button>
            </div>
          </form>

          {/* Bottom Security Stamp */}
          <div className="mt-8 pt-4 border-t border-[#191712]/20 flex items-center justify-between font-typewriter text-[11px] text-[#78716C]">
            <span>STATUS: SECURE 256-BIT</span>
            <span>NP-ADMIN-AUTH</span>
          </div>

        </div>

      </div>

    </div>
  );
}
