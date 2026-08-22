"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Blog } from "@/types";
import { FaPlus, FaEdit, FaTrash, FaEye, FaEyeSlash } from "react-icons/fa";
import Swal from "sweetalert2";

export default function AdminBlogs() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBlogs = () => {
    fetch("/api/blogs?published=false")
      .then((r) => r.json())
      .then((data) => setBlogs(Array.isArray(data) ? data : []))
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleDelete = async (id: string, title: string) => {
    const result = await Swal.fire({
      title: "Delete Post?",
      text: `"${title}" will be permanently deleted.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#f87171",
      cancelButtonColor: "#3A3D4D",
      confirmButtonText: "Yes, delete",
      background: "#12121E",
      color: "#F0F0F5",
    });
    if (!result.isConfirmed) return;

    try {
      const res = await fetch(`/api/blogs/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete");
      setBlogs((prev) => prev.filter((b) => b.id !== id));
      Swal.fire({
        title: "Deleted!",
        icon: "success",
        background: "#12121E",
        color: "#F0F0F5",
        confirmButtonColor: "#FDCB6E",
      });
    } catch (err) {
      console.error(err);
      Swal.fire({
        title: "Error",
        text: "Could not delete blog post",
        icon: "error",
        background: "#12121E",
        color: "#F0F0F5",
      });
    }
  };

  const togglePublish = async (blog: Blog) => {
    try {
      const res = await fetch(`/api/blogs/${blog.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ published: !blog.published }),
      });
      if (!res.ok) throw new Error("Failed to update status");
      setBlogs((prev) =>
        prev.map((b) => (b.id === blog.id ? { ...b, published: !b.published } : b))
      );
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="heading-font text-3xl font-bold text-white">Blog Posts</h1>
          <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>
            Manage your blog articles
          </p>
        </div>
        <Link href="/admin/blogs/new" className="btn-primary">
          <FaPlus /> Write Post
        </Link>
      </div>

      {loading ? (
        <div className="flex justify-center py-16">
          <div className="w-8 h-8 border-2 border-[var(--accent)] border-t-transparent rounded-full animate-spin" />
        </div>
      ) : blogs.length === 0 ? (
        <div className="text-center py-20 glass-card">
          <p className="text-4xl mb-3">✍️</p>
          <h2 className="heading-font text-lg font-semibold text-white mb-2">No posts yet</h2>
          <p className="text-sm mb-6" style={{ color: "var(--text-muted)" }}>
            Write your first blog post!
          </p>
          <Link href="/admin/blogs/new" className="btn-primary">
            <FaPlus /> Write Post
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {blogs.map((blog) => (
            <div
              key={blog.id}
              className="glass-card p-5 flex flex-col sm:flex-row sm:items-center gap-4"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="heading-font font-semibold text-white truncate">
                    {blog.title}
                  </h3>
                  <span
                    className="text-xs px-2 py-0.5 rounded-full flex-shrink-0"
                    style={{
                      background: blog.published ? "rgba(74,222,128,0.1)" : "rgba(255,255,255,0.05)",
                      color: blog.published ? "#4ade80" : "var(--text-subtle)",
                      border: `1px solid ${blog.published ? "rgba(74,222,128,0.2)" : "var(--border)"}`,
                    }}
                  >
                    {blog.published ? "Published" : "Draft"}
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {blog.tags?.slice(0, 4).map((t) => (
                    <span
                      key={t}
                      className="text-xs px-2 py-0.5 rounded-full"
                      style={{ background: "var(--bg-surface)", color: "var(--text-muted)", border: "1px solid var(--border)" }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <button
                  onClick={() => togglePublish(blog)}
                  className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200 text-sm"
                  style={{
                    background: blog.published ? "rgba(74,222,128,0.08)" : "var(--bg-surface)",
                    color: blog.published ? "#4ade80" : "var(--text-subtle)",
                    border: `1px solid ${blog.published ? "rgba(74,222,128,0.2)" : "var(--border)"}`,
                  }}
                  title={blog.published ? "Unpublish" : "Publish"}
                >
                  {blog.published ? <FaEye /> : <FaEyeSlash />}
                </button>
                {blog.published && (
                  <Link
                    href={`/blog/${blog.slug}`}
                    target="_blank"
                    className="w-9 h-9 rounded-lg flex items-center justify-center text-sm"
                    style={{ background: "var(--bg-surface)", color: "var(--text-muted)", border: "1px solid var(--border)" }}
                    title="View Public Post"
                  >
                    <FaEye />
                  </Link>
                )}
                <Link
                  href={`/admin/blogs/${blog.id}/edit`}
                  className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200 text-sm"
                  style={{ background: "var(--accent-glow)", color: "var(--accent)", border: "1px solid var(--border-accent)" }}
                  title="Edit"
                >
                  <FaEdit />
                </Link>
                <button
                  onClick={() => handleDelete(blog.id!, blog.title)}
                  className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200 text-sm"
                  style={{ background: "rgba(248,113,113,0.08)", color: "#f87171", border: "1px solid rgba(248,113,113,0.2)" }}
                  title="Delete"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
