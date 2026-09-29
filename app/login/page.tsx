"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
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
      setError("Invalid credentials. Please check your email and password.");
    } else {
      router.push("/admin");
      router.refresh();
    }
  };

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center px-4 py-8 sm:py-12 relative overflow-hidden"
      style={{ background: "#0b0d14" }}
    >
      <div className="w-full max-w-[420px] mx-auto z-10">
        <div
          className="w-full rounded-3xl p-6 sm:p-8 backdrop-blur-xl"
          style={{
            background: "rgba(17, 20, 32, 0.9)",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            boxShadow: "0 20px 50px -10px rgba(0, 0, 0, 0.7), 0 0 40px rgba(0, 222, 81, 0.04)",
          }}
        >
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 bg-[#00DE51]/15 text-[#00DE51] shadow-md shadow-[#00DE51]/20">
              <FaLock className="text-xl text-[#00DE51]" />
            </div>
            <h1 className="heading-font text-2xl sm:text-3xl font-bold text-white leading-tight">
              Admin Login
            </h1>
            <p className="text-xs sm:text-sm mt-1.5 text-[#888899]">
              Access the portfolio dashboard
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Field */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider mb-2 text-[#9999a8]">
                Email
              </label>
              <div className="relative flex items-center w-full">
                <span
                  className="absolute left-4 flex items-center justify-center pointer-events-none z-10"
                  style={{ color: "#71717a", width: "20px", height: "20px" }}
                >
                  <FaEnvelope className="text-sm" />
                </span>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@example.com"
                  className="w-full h-12 rounded-xl text-sm text-white placeholder-zinc-500 transition-all outline-none"
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.04)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    paddingLeft: "46px",
                    paddingRight: "16px",
                    boxSizing: "border-box",
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = "#00DE51";
                    e.currentTarget.style.boxShadow = "0 0 0 3px rgba(0, 222, 81, 0.15)";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.1)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider mb-2 text-[#9999a8]">
                Password
              </label>
              <div className="relative flex items-center w-full">
                <span
                  className="absolute left-4 flex items-center justify-center pointer-events-none z-10"
                  style={{ color: "#71717a", width: "20px", height: "20px" }}
                >
                  <FaLock className="text-sm" />
                </span>
                <input
                  type={showPass ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full h-12 rounded-xl text-sm text-white placeholder-zinc-500 transition-all outline-none"
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.04)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    paddingLeft: "46px",
                    paddingRight: "46px",
                    boxSizing: "border-box",
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = "#00DE51";
                    e.currentTarget.style.boxShadow = "0 0 0 3px rgba(0, 222, 81, 0.15)";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.1)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  aria-label={showPass ? "Hide password" : "Show password"}
                  className="absolute right-3 w-8 h-8 flex items-center justify-center text-zinc-400 hover:text-white transition-colors cursor-pointer rounded-lg"
                >
                  {showPass ? <FaEyeSlash className="text-sm" /> : <FaEye className="text-sm" />}
                </button>
              </div>
            </div>

            {error && (
              <p
                className="text-sm px-4 py-3 rounded-xl"
                style={{
                  background: "rgba(248, 113, 113, 0.1)",
                  color: "#f87171",
                  border: "1px solid rgba(248, 113, 113, 0.25)",
                }}
              >
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full h-12 rounded-xl font-bold text-sm text-black flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg hover:shadow-[#00DE51]/20 disabled:opacity-60 disabled:cursor-not-allowed mt-2"
              style={{
                backgroundColor: "#00DE51",
                boxShadow: "0 10px 25px -5px rgba(0, 222, 81, 0.3)",
              }}
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                  <span>Signing In...</span>
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <a
              href="/"
              className="text-xs text-[#888899] hover:text-[#00DE51] transition-colors font-medium inline-flex items-center gap-1.5"
            >
              <span>←</span>
              <span>Back to Website</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
