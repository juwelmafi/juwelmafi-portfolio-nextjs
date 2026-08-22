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
      className="min-h-screen flex items-center justify-center px-4"
      style={{ background: "var(--bg-base)" }}
    >
      {/* Background orb */}
      <div
        className="orb"
        style={{
          width: 500,
          height: 500,
          background: "var(--accent)",
          top: "20%",
          left: "50%",
          transform: "translateX(-50%)",
          opacity: 0.06,
        }}
      />

      <div className="relative z-10 w-full max-w-md">
        <div
          className="rounded-2xl p-8"
          style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
        >
          {/* Logo */}
          <div className="text-center mb-8">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4"
              style={{ background: "var(--accent-glow)", border: "1px solid var(--border-accent)" }}
            >
              <FaLock style={{ color: "var(--accent)" }} className="text-xl" />
            </div>
            <h1 className="heading-font text-2xl font-bold text-white">Admin Login</h1>
            <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>
              Access the portfolio dashboard
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "var(--text-subtle)" }}>
                Email
              </label>
              <div className="relative">
                <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-sm" style={{ color: "var(--text-subtle)" }} />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@example.com"
                  className="form-input pl-11"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "var(--text-subtle)" }}>
                Password
              </label>
              <div className="relative">
                <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-sm" style={{ color: "var(--text-subtle)" }} />
                <input
                  type={showPass ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="form-input pl-11 pr-11"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-sm transition-colors"
                  style={{ color: "var(--text-subtle)" }}
                >
                  {showPass ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            {error && (
              <p
                className="text-sm px-4 py-3 rounded-lg"
                style={{ background: "rgba(248,113,113,0.1)", color: "#f87171", border: "1px solid rgba(248,113,113,0.2)" }}
              >
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full justify-center py-3 mt-2"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-black/30 border-t-black/80 rounded-full animate-spin" />
                  Signing In...
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
