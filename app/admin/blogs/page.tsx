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
        confirmButtonColor: "#00DE51",
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
    <div className="w-full space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-white/5 gap-3">
        <div>
          <h1 className="heading-font text-[26px] lg:text-[32px] font-bold text-white leading-tight">Blog Posts</h1>
          <p className="text-xs sm:text-sm mt-0.5 text-[#888899]">
            Manage technical articles, drafts &amp; publication statuses
          </p>
        </div>
        <Link href="/admin/blogs/new" className="btn-primary self-start sm:self-auto">
          <FaPlus /> Write Post
        </Link>
      </div>

      {loading ? (
        <div className="flex justify-center py-16">
          <div className="w-8 h-8 border-2 border-[#00DE51] border-t-transparent rounded-full animate-spin" />
        </div>
      ) : blogs.length === 0 ? (
        <div className="text-center py-20 glass-card">
          <p className="text-4xl mb-3">✍️</p>
          <h2 className="heading-font text-[18px] lg:text-[20px] font-semibold text-white mb-2">No posts yet</h2>
          <p className="text-sm mb-6 text-[#888899]">
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
                  <h3 className="heading-font font-semibold text-white truncate text-base">
                    {blog.title}
                  </h3>
                  <span
                    className={`text-xs px-2.5 py-0.5 rounded-full flex-shrink-0 ${
                      blog.published
                        ? "bg-[#00DE51]/15 text-[#00DE51]"
                        : "bg-white/10 text-white/60"
                    }`}
                  >
                    {blog.published ? "Published" : "Draft"}
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {blog.tags?.slice(0, 4).map((t) => (
                    <span
                      key={t}
                      className="text-xs px-2.5 py-0.5 rounded-full bg-[#1F2438] text-[#8E95B3]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                <button
                  onClick={() => togglePublish(blog)}
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-sm bg-white/5 text-[#8E95B3] hover:text-white hover:bg-white/10 transition shadow-sm cursor-pointer"
                  title={blog.published ? "Unpublish" : "Publish"}
                >
                  {blog.published ? <FaEye className="text-[#00DE51]" /> : <FaEyeSlash />}
                </button>
                {blog.published && (
                  <Link
                    href={`/blog/${blog.slug}`}
                    target="_blank"
                    className="w-9 h-9 rounded-xl flex items-center justify-center text-sm bg-white/5 text-[#8E95B3] hover:text-white hover:bg-white/10 transition shadow-sm"
                    title="View Public Post"
                  >
                    <FaEye />
                  </Link>
                )}
                <Link
                  href={`/admin/blogs/${blog.id}/edit`}
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-sm bg-[#00DE51]/15 text-[#00DE51] hover:bg-[#00DE51]/25 transition shadow-sm"
                  title="Edit"
                >
                  <FaEdit />
                </Link>
                <button
                  onClick={() => handleDelete(blog.id!, blog.title)}
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-sm bg-red-500/10 text-red-400 hover:bg-red-500/20 transition shadow-sm cursor-pointer"
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
