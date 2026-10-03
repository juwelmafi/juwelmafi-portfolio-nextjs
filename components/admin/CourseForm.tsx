"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaPlus, FaTrash, FaYoutube, FaSave, FaArrowLeft, FaCode } from "react-icons/fa";
import Swal from "sweetalert2";
import { Course, Lesson } from "@/types";
import { extractYouTubeId } from "@/lib/youtube";
import ImageUploader from "@/components/admin/ImageUploader";

interface CourseFormProps {
  initialData?: Partial<Course>;
  isEditing?: boolean;
}

export default function CourseForm({ initialData = {}, isEditing = false }: CourseFormProps) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    title: initialData.title || "",
    slug: initialData.slug || "",
    description: initialData.description || "",
    thumbnail: initialData.thumbnail || "",
    category: initialData.category || "MERN Stack",
    level: initialData.level || "All Levels",
    badge: initialData.badge || "Featured",
    published: initialData.published !== undefined ? initialData.published : true,
  });

  const [lessons, setLessons] = useState<Lesson[]>(
    initialData.lessons && initialData.lessons.length > 0
      ? initialData.lessons
      : [
          {
            title: "01. Introduction & Project Architecture",
            youtubeUrl: "https://www.youtube.com/watch?v=wm5gMKuwSYk",
            duration: "20:00",
            summary: "Overview of core architecture, tooling, and folder structure.",
            codeSnippet: "",
            order: 0,
          },
        ]
  );

  const handleAddLesson = () => {
    setLessons([
      ...lessons,
      {
        title: `Lesson ${lessons.length + 1}`,
        youtubeUrl: "",
        duration: "15:00",
        summary: "",
        codeSnippet: "",
        order: lessons.length,
      },
    ]);
  };

  const handleRemoveLesson = (index: number) => {
    setLessons(lessons.filter((_, i) => i !== index));
  };

  const handleLessonChange = (index: number, field: keyof Lesson, value: string | number) => {
    const updated = [...lessons];
    updated[index] = { ...updated[index], [field]: value };
    setLessons(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title) {
      Swal.fire({
        title: "Validation Error",
        text: "Please enter a course title.",
        icon: "warning",
        background: "#FAF6EC",
        color: "#191712",
        confirmButtonColor: "#191712",
      });
      return;
    }

    setSaving(true);
    try {
      const payload = {
        ...form,
        slug:
          form.slug ||
          form.title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-+|-+$/g, ""),
        lessons: lessons.map((l, i) => ({
          ...l,
          youtubeId: extractYouTubeId(l.youtubeUrl),
          order: i,
        })),
      };

      const url = isEditing ? `/api/courses/${initialData.id}` : "/api/courses";
      const method = isEditing ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to save course");
      }

      await Swal.fire({
        title: isEditing ? "Course Updated!" : "Course Created!",
        text: "Course curriculum successfully recorded.",
        icon: "success",
        background: "#FAF6EC",
        color: "#191712",
        confirmButtonColor: "#191712",
      });

      router.push("/admin/courses");
      router.refresh();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to save course";
      Swal.fire({
        title: "Error",
        text: msg,
        icon: "error",
        background: "#FAF6EC",
        color: "#191712",
        confirmButtonColor: "#191712",
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-5xl mx-auto">
      {/* Course Core Details Card */}
      <div className="hand-box p-6 sm:p-8 bg-[#FFFFFF] space-y-6">
        <h2 className="font-script font-bold text-2xl text-[#191712] border-b-2 border-[#191712] pb-3">
          Course Information
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="font-typewriter text-xs font-bold text-[#191712] uppercase tracking-wider block mb-2">
              Course Title *
            </label>
            <input
              type="text"
              required
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="e.g., Full-Stack Next.js 15 & MERN Masterclass"
              className="form-input w-full font-hand text-base"
            />
          </div>

          <div>
            <label className="font-typewriter text-xs font-bold text-[#191712] uppercase tracking-wider block mb-2">
              URL Slug
            </label>
            <input
              type="text"
              value={form.slug}
              onChange={(e) => setForm({ ...form, slug: e.target.value })}
              placeholder="auto-generated-from-title"
              className="form-input w-full font-typewriter text-sm"
            />
          </div>

          <div>
            <label className="font-typewriter text-xs font-bold text-[#191712] uppercase tracking-wider block mb-2">
              Category
            </label>
            <input
              type="text"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              placeholder="e.g., Next.js & MERN"
              className="form-input w-full font-hand text-base"
            />
          </div>

          <div>
            <label className="font-typewriter text-xs font-bold text-[#191712] uppercase tracking-wider block mb-2">
              Level
            </label>
            <select
              value={form.level}
              onChange={(e) => setForm({ ...form, level: e.target.value })}
              className="form-input w-full font-hand text-base"
            >
              <option value="All Levels">All Levels</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>

          <div>
            <label className="font-typewriter text-xs font-bold text-[#191712] uppercase tracking-wider block mb-2">
              Badge / Ribbon
            </label>
            <input
              type="text"
              value={form.badge}
              onChange={(e) => setForm({ ...form, badge: e.target.value })}
              placeholder="e.g., Featured Masterclass"
              className="form-input w-full font-hand text-base"
            />
          </div>

          <div className="col-span-1 md:col-span-2">
            <ImageUploader
              label="Course Cover Thumbnail"
              value={form.thumbnail}
              onChange={(url) => setForm({ ...form, thumbnail: url })}
              placeholder="https://... or upload with Cloudinary"
              helperText="Upload or paste cover image for the course card and lesson player"
            />
          </div>
        </div>

        <div>
          <label className="font-typewriter text-xs font-bold text-[#191712] uppercase tracking-wider block mb-2">
            Course Overview Description
          </label>
          <textarea
            rows={3}
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            placeholder="Comprehensive description of what developers will learn..."
            className="form-input w-full font-hand text-base resize-none"
          />
        </div>

        <div className="flex items-center gap-3 pt-2">
          <input
            type="checkbox"
            id="published"
            checked={form.published}
            onChange={(e) => setForm({ ...form, published: e.target.checked })}
            className="w-4 h-4 rounded accent-[#191712]"
          />
          <label htmlFor="published" className="font-hand text-base font-bold text-[#191712] cursor-pointer">
            Publish this course publicly on website
          </label>
        </div>
      </div>

      {/* YouTube Lessons Builder Card */}
      <div className="hand-box p-6 sm:p-8 bg-[#FFFFFF] space-y-6">
        <div className="flex items-center justify-between border-b-2 border-[#191712] pb-4">
          <div>
            <h2 className="font-script font-bold text-2xl text-[#191712] flex items-center gap-2">
              <FaYoutube className="text-[#DC2626]" /> YouTube Lessons &amp; Chapters ({lessons.length})
            </h2>
            <p className="font-hand text-sm text-[#57534E] mt-1">
              Add YouTube video links. The player will wrap them in clean, website-native notebook controls.
            </p>
          </div>
          <button
            type="button"
            onClick={handleAddLesson}
            className="btn-small text-xs py-1.5 px-3 cursor-pointer"
          >
            <FaPlus className="mr-1" /> Add Lesson
          </button>
        </div>

        <div className="space-y-6">
          {lessons.map((lesson, idx) => {
            const extractedId = extractYouTubeId(lesson.youtubeUrl);
            return (
              <div
                key={idx}
                className="p-5 rounded-md bg-[#FAF7EE] border-2 border-[#191712] shadow-[2px_2px_0px_#191712] space-y-4 relative"
              >
                <div className="flex items-center justify-between pb-3 border-b border-[#191712]/20">
                  <span className="font-typewriter text-xs font-bold text-[#191712] bg-[#FFE45E] border border-[#191712] px-2.5 py-0.5 rounded shadow-[1px_1px_0px_#191712]">
                    Lesson {idx + 1}
                  </span>
                  {lessons.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveLesson(idx)}
                      className="text-xs text-[#DC2626] hover:text-red-700 p-1 transition-colors cursor-pointer"
                      title="Remove Lesson"
                    >
                      <FaTrash />
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-typewriter text-[11px] font-bold text-[#191712] uppercase tracking-wider mb-1">
                      Lesson Title *
                    </label>
                    <input
                      type="text"
                      required
                      value={lesson.title}
                      onChange={(e) => handleLessonChange(idx, "title", e.target.value)}
                      placeholder="e.g., 01. Next.js 15 App Router Architecture"
                      className="form-input w-full font-hand text-base"
                    />
                  </div>

                  <div>
                    <label className="block font-typewriter text-[11px] font-bold text-[#191712] uppercase tracking-wider mb-1">
                      YouTube Video URL or Video ID *
                    </label>
                    <input
                      type="text"
                      required
                      value={lesson.youtubeUrl}
                      onChange={(e) => handleLessonChange(idx, "youtubeUrl", e.target.value)}
                      placeholder="https://www.youtube.com/watch?v=... or ID"
                      className="form-input w-full font-typewriter text-xs"
                    />
                    {extractedId && (
                      <p className="font-typewriter text-[11px] text-[#C2410C] font-bold mt-1">
                        Detected Video ID: {extractedId}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block font-typewriter text-[11px] font-bold text-[#191712] uppercase tracking-wider mb-1">
                      Duration
                    </label>
                    <input
                      type="text"
                      value={lesson.duration}
                      onChange={(e) => handleLessonChange(idx, "duration", e.target.value)}
                      placeholder="e.g., 24:15"
                      className="form-input w-full font-typewriter text-xs"
                    />
                  </div>

                  <div>
                    <label className="block font-typewriter text-[11px] font-bold text-[#191712] uppercase tracking-wider mb-1">
                      Lesson Summary
                    </label>
                    <input
                      type="text"
                      value={lesson.summary}
                      onChange={(e) => handleLessonChange(idx, "summary", e.target.value)}
                      placeholder="Key takeaways from this episode..."
                      className="form-input w-full font-hand text-base"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-typewriter text-[11px] font-bold text-[#191712] uppercase tracking-wider mb-1 flex items-center gap-1.5">
                    <FaCode /> Optional Starter Code / Snippet
                  </label>
                  <textarea
                    rows={3}
                    value={lesson.codeSnippet || ""}
                    onChange={(e) => handleLessonChange(idx, "codeSnippet", e.target.value)}
                    placeholder="// Paste relevant code snippets or notes for learners..."
                    className="form-input w-full font-mono text-xs resize-none"
                  />
                </div>
              </div>
            );
          })}
        </div>

        <button
          type="button"
          onClick={handleAddLesson}
          className="w-full py-3 rounded-md border-2 border-dashed border-[#191712] bg-[#FAF7EE] hover:bg-[#FFE45E] text-[#191712] font-hand text-base font-bold transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <FaPlus /> Add Another Lesson
        </button>
      </div>

      {/* Action Footer */}
      <div className="flex items-center justify-between pt-4">
        <button
          type="button"
          onClick={() => router.back()}
          className="btn-outline"
        >
          <FaArrowLeft /> Cancel
        </button>

        <button
          type="submit"
          disabled={saving}
          className="btn-primary"
        >
          <FaSave /> {saving ? "Saving Course..." : isEditing ? "Save Changes" : "Create Course"}
        </button>
      </div>
    </form>
  );
}
