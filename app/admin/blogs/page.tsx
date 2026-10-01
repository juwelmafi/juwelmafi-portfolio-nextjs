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
      confirmButtonColor: "#DC2626",
      cancelButtonColor: "#78716C",
      confirmButtonText: "Yes, delete",
      background: "#FAF6EC",
      color: "#191712",
    });
    if (!result.isConfirmed) return;

    try {
      const res = await fetch(`/api/blogs/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete");
      setBlogs((prev) => prev.filter((b) => b.id !== id));
      Swal.fire({
        title: "Deleted!",
        icon: "success",
        background: "#FAF6EC",
        color: "#191712",
        confirmButtonColor: "#191712",
      });
    } catch (err) {
      console.error(err);
      Swal.fire({
        title: "Error",
        text: "Could not delete blog post",
        icon: "error",
        background: "#FAF6EC",
        color: "#191712",
        confirmButtonColor: "#191712",
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 gap-3 border-b-2 border-[#191712]">
        <div>
          <p className="retro-eyebrow !mb-1">NOTEBOOK DOSSIERS</p>
          <h1 className="font-script font-bold text-3xl sm:text-4xl text-[#191712] leading-tight">
            Notebook <span className="marked">Articles</span>
          </h1>
          <p className="font-hand text-base text-[#57534E] mt-0.5">
            Manage technical articles, essays &amp; publication statuses
          </p>
        </div>
        <Link href="/admin/blogs/new" className="btn-primary self-start sm:self-auto">
          <FaPlus /> Write Post
        </Link>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-16">
          <div className="w-8 h-8 border-2 border-[#191712] border-t-transparent rounded-full animate-spin mb-3" />
          <p className="font-typewriter text-xs text-[#78716C]">LOADING ARTICLES...</p>
        </div>
      ) : blogs.length === 0 ? (
        <div className="text-center py-16 hand-box bg-[#FFFFFF]">
          <div className="w-14 h-14 mx-auto mb-4 rounded-full border-2 border-[#191712] bg-[#FFE45E] flex items-center justify-center shadow-[2px_2px_0px_#191712]">
            <FaEdit className="text-2xl text-[#191712]" />
          </div>
          <h2 className="font-script font-bold text-2xl text-[#191712] mb-1">No posts yet</h2>
          <p className="font-hand text-base mb-6 text-[#57534E]">
            Write your first blog post!
          </p>
          <Link href="/admin/blogs/new" className="btn-primary">
            <FaPlus /> Write Post
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {blogs.map((blog) => (
            <div
              key={blog.id}
              className="hand-box p-5 bg-[#FFFFFF] flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:-translate-y-0.5 transition-transform"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <span className="font-typewriter text-[11px] font-bold text-[#C2410C]">
                    ESSAY
                  </span>
                  <span
                    className={`font-typewriter text-[11px] px-2.5 py-0.5 rounded font-bold border border-[#191712] shadow-[1px_1px_0px_#191712] ${
                      blog.published
                        ? "bg-[#FFE45E] text-[#191712]"
                        : "bg-[#E7E5E4] text-[#78716C]"
                    }`}
                  >
                    {blog.published ? "Published" : "Draft"}
                  </span>
                </div>
                <h3 className="font-script font-bold text-2xl text-[#191712] truncate">
                  {blog.title}
                </h3>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {blog.tags?.slice(0, 4).map((t) => (
                    <span
                      key={t}
                      className="font-typewriter text-[11px] px-2.5 py-0.5 rounded border border-[#191712] bg-[#FAF7EE] text-[#191712]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2.5 flex-shrink-0 self-end sm:self-center">
                <button
                  onClick={() => togglePublish(blog)}
                  className="w-9 h-9 rounded border-2 border-[#191712] bg-[#FAF7EE] hover:bg-[#FFE45E] text-[#191712] flex items-center justify-center transition shadow-[2px_2px_0px_#191712] cursor-pointer"
                  title={blog.published ? "Unpublish" : "Publish"}
                >
                  {blog.published ? <FaEye /> : <FaEyeSlash />}
                </button>
                {blog.published && (
                  <Link
                    href={`/blog/${blog.slug}`}
                    target="_blank"
                    className="w-9 h-9 rounded border-2 border-[#191712] bg-[#FAF7EE] hover:bg-[#FFE45E] text-[#191712] flex items-center justify-center transition shadow-[2px_2px_0px_#191712]"
                    title="View Public Post"
                  >
                    <FaEye />
                  </Link>
                )}
                <Link
                  href={`/admin/blogs/${blog.id}/edit`}
                  className="w-9 h-9 rounded border-2 border-[#191712] bg-[#FAF7EE] hover:bg-[#FFE45E] text-[#191712] flex items-center justify-center transition shadow-[2px_2px_0px_#191712]"
                  title="Edit"
                >
                  <FaEdit />
                </Link>
                <button
                  onClick={() => handleDelete(blog.id!, blog.title)}
                  className="w-9 h-9 rounded border-2 border-[#191712] bg-[#FEE2E2] hover:bg-[#FECACA] text-[#DC2626] flex items-center justify-center transition shadow-[2px_2px_0px_#191712] cursor-pointer"
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
