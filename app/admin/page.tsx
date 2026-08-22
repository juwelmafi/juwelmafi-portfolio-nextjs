"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { FaProjectDiagram, FaBlog, FaPlus, FaArrowRight, FaDatabase } from "react-icons/fa";
import Swal from "sweetalert2";

export default function AdminDashboard() {
  const [counts, setCounts] = useState({ projects: 0, blogs: 0 });
  const [loading, setLoading] = useState(true);
  const [seeding, setSeeding] = useState(false);

  const refreshCounts = () => {
    Promise.all([
      fetch("/api/projects").then((r) => r.json()).catch(() => []),
      fetch("/api/blogs?published=false").then((r) => r.json()).catch(() => []),
    ]).then(([projects, blogs]) => {
      setCounts({
        projects: Array.isArray(projects) ? projects.length : 0,
        blogs:    Array.isArray(blogs)    ? blogs.length    : 0,
      });
      setLoading(false);
    });
  };

  useEffect(() => {
    refreshCounts();
  }, []);

  const handleSeed = async () => {
    const confirm = await Swal.fire({
      title: "Import Default Projects?",
      text: "This will import your 5 portfolio projects into MongoDB if your database is empty.",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#FDCB6E",
      cancelButtonColor: "#3A3D4D",
      confirmButtonText: "Yes, import",
      background: "#12121E",
      color: "#F0F0F5",
    });

    if (!confirm.isConfirmed) return;

    setSeeding(true);
    try {
      const res = await fetch("/api/seed", { method: "POST" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to seed");

      await Swal.fire({
        title: "Success!",
        text: data.message,
        icon: "success",
        background: "#12121E",
        color: "#F0F0F5",
        confirmButtonColor: "#FDCB6E",
      });
      refreshCounts();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to seed";
      Swal.fire({
        title: "Notice",
        text: msg,
        icon: "info",
        background: "#12121E",
        color: "#F0F0F5",
      });
    } finally {
      setSeeding(false);
    }
  };

  const stats = [
    { icon: FaProjectDiagram, label: "Total Projects",   value: counts.projects, href: "/admin/projects", color: "#61DAFB" },
    { icon: FaBlog,           label: "Total Blog Posts", value: counts.blogs,    href: "/admin/blogs",    color: "var(--accent)" },
  ];

  return (
    <div className="p-8">
      <div className="mb-10">
        <h1 className="heading-font text-3xl font-bold text-white">Dashboard</h1>
        <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>
          Welcome back! Here&apos;s an overview of your portfolio content.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-5 mb-10">
        {stats.map(({ icon: Icon, label, value, href, color }) => (
          <Link key={label} href={href} className="glass-card p-6 flex items-center gap-5 group">
            <div
              className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
              style={{ background: `${color}15`, color }}
            >
              <Icon className="text-2xl" />
            </div>
            <div className="flex-1">
              <p className="text-xs uppercase tracking-widest" style={{ color: "var(--text-subtle)" }}>{label}</p>
              <p className="heading-font text-4xl font-extrabold text-white mt-1">
                {loading ? "—" : value}
              </p>
            </div>
            <FaArrowRight className="text-sm transition-transform group-hover:translate-x-1" style={{ color: "var(--text-subtle)" }} />
          </Link>
        ))}
      </div>

      <div>
        <h2 className="heading-font text-lg font-semibold text-white mb-5">Quick Actions</h2>
        <div className="flex flex-wrap gap-3">
          <Link href="/admin/projects/new" className="btn-primary">
            <FaPlus /> Add Project
          </Link>
          <Link href="/admin/blogs/new" className="btn-primary">
            <FaPlus /> Write Blog Post
          </Link>
          <button
            onClick={handleSeed}
            disabled={seeding}
            className="btn-outline"
          >
            <FaDatabase /> {seeding ? "Importing..." : "Seed Default Projects"}
          </button>
        </div>
      </div>
    </div>
  );
}
