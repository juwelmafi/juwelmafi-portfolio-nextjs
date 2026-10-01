"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import {
  FaCloudUploadAlt,
  FaImage,
  FaTrash,
  FaExternalLinkAlt,
  FaSpinner,
  FaCheckCircle,
  FaExclamationTriangle,
} from "react-icons/fa";
import Swal from "sweetalert2";

interface ImageUploaderProps {
  value: string;
  onChange: (url: string) => void;
  label: string;
  placeholder?: string;
  required?: boolean;
  helperText?: string;
}

export default function ImageUploader({
  value,
  onChange,
  label,
  placeholder = "https://...",
  required = false,
  helperText,
}: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [isCloudinaryConfigured, setIsCloudinaryConfigured] = useState<boolean | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Check if Cloudinary is configured on the backend
  useEffect(() => {
    let isMounted = true;
    fetch("/api/upload")
      .then((res) => res.json())
      .then((data) => {
        if (isMounted) {
          setIsCloudinaryConfigured(Boolean(data?.configured));
        }
      })
      .catch(() => {
        if (isMounted) setIsCloudinaryConfigured(false);
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const handleUploadFile = async (file: File) => {
    if (!file) return;

    // Validate size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      Swal.fire({
        title: "File Too Large",
        text: "Please select an image smaller than 10MB.",
        icon: "warning",
        background: "#FAF6EC",
        color: "#191712",
        confirmButtonColor: "#191712",
      });
      return;
    }

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.notConfigured) {
          Swal.fire({
            title: "Cloudinary Not Connected",
            html: `
              <div style="text-align: left; font-family: monospace; font-size: 13px; line-height: 1.6;">
                <p>To enable direct image uploads, you need a free Cloudinary account:</p>
                <ol style="margin-left: 20px; margin-top: 8px;">
                  <li>Go to <b><a href="https://cloudinary.com/users/register_free" target="_blank" style="color: #C2410C; text-decoration: underline;">cloudinary.com (Free)</a></b></li>
                  <li>Copy your <b>Cloud Name</b>, <b>API Key</b>, and <b>API Secret</b></li>
                  <li>Paste them into your <code>.env.local</code> file</li>
                </ol>
                <p style="margin-top: 10px;">In the meantime, you can paste any direct image URL into the box below!</p>
              </div>
            `,
            icon: "info",
            background: "#FAF6EC",
            color: "#191712",
            confirmButtonColor: "#191712",
          });
          return;
        }
        throw new Error(data.error || "Upload failed");
      }

      if (data.url) {
        onChange(data.url);
        Swal.fire({
          title: "Image Uploaded!",
          text: "Saved to Cloudinary successfully.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
          background: "#FAF6EC",
          color: "#191712",
        });
      }
    } catch (err: any) {
      console.error(err);
      Swal.fire({
        title: "Upload Failed",
        text: err?.message || "Could not upload image. Please try again or paste a direct URL.",
        icon: "error",
        background: "#FAF6EC",
        color: "#191712",
        confirmButtonColor: "#191712",
      });
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleUploadFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="space-y-2">
      {/* Header with Label and Status Badge */}
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <label className="font-typewriter text-xs font-bold text-[#191712] uppercase tracking-wider block">
          {label} {required && <span className="text-[#C2410C]">*</span>}
        </label>
        
        {/* Status indicator */}
        {isCloudinaryConfigured === true && (
          <span className="font-typewriter text-[10px] uppercase font-bold text-[#15803D] bg-[#DCFCE7] px-2 py-0.5 rounded border border-[#15803D]/30 flex items-center gap-1">
            <FaCheckCircle className="text-[10px]" /> Cloudinary Ready
          </span>
        )}
        {isCloudinaryConfigured === false && (
          <span
            title="Add CLOUDINARY credentials in .env.local for 1-click uploads"
            className="font-typewriter text-[10px] uppercase font-bold text-[#B45309] bg-[#FEF3C7] px-2 py-0.5 rounded border border-[#B45309]/30 flex items-center gap-1"
          >
            <FaExclamationTriangle className="text-[10px]" /> Direct URL or Cloudinary
          </span>
        )}
      </div>

      {helperText && (
        <p className="font-hand text-xs text-[#78716C]">{helperText}</p>
      )}

      {/* Main Upload Box & Preview */}
      <div className="space-y-3">
        {/* Drag & Drop Zone */}
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-lg p-4 transition-all cursor-pointer text-center relative ${
            dragActive
              ? "border-[#191712] bg-[#FFE45E]/30 scale-[1.01]"
              : "border-[#191712]/40 bg-[#FAF7EE] hover:bg-[#F5EED9] hover:border-[#191712]"
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                handleUploadFile(e.target.files[0]);
              }
            }}
          />

          {uploading ? (
            <div className="flex flex-col items-center justify-center py-2 space-y-2">
              <FaSpinner className="animate-spin text-2xl text-[#191712]" />
              <p className="font-typewriter text-xs font-bold text-[#191712]">
                Uploading to Cloudinary...
              </p>
              <p className="font-hand text-xs text-[#78716C]">
                Compressing and delivering high-res media
              </p>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-1 space-y-1.5">
              <div className="w-10 h-10 rounded-full bg-[#FFE45E] border-2 border-[#191712] flex items-center justify-center text-[#191712] shadow-[2px_2px_0px_#191712]">
                <FaCloudUploadAlt className="text-xl" />
              </div>
              <p className="font-hand text-sm font-bold text-[#191712]">
                Click to browse or drag &amp; drop image here
              </p>
              <p className="font-typewriter text-[11px] text-[#78716C]">
                PNG, JPG, WebP, GIF, SVG up to 10MB
              </p>
            </div>
          )}
        </div>

        {/* Direct URL Input Row */}
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#78716C]">
              <FaImage className="text-sm" />
            </span>
            <input
              type="url"
              required={required && !value}
              value={value || ""}
              onChange={(e) => onChange(e.target.value)}
              placeholder={placeholder}
              className="bg-[#FAF7EE] border-2 border-[#191712] rounded-md pl-9 pr-3 py-2 font-hand text-sm text-[#191712] placeholder:text-[#A8A29E] focus:outline-none focus:bg-[#FFFFFF] focus:ring-2 focus:ring-[#FFE45E] w-full"
            />
          </div>
          {value && (
            <>
              <a
                href={value}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 border-2 border-[#191712] rounded-md bg-[#FAF7EE] hover:bg-[#FFE45E] text-[#191712] transition-colors"
                title="Open image in new tab"
              >
                <FaExternalLinkAlt className="text-xs" />
              </a>
              <button
                type="button"
                onClick={() => onChange("")}
                className="p-2.5 border-2 border-[#191712] rounded-md bg-[#FAF7EE] hover:bg-[#FEE2E2] text-[#DC2626] transition-colors"
                title="Remove image"
              >
                <FaTrash className="text-xs" />
              </button>
            </>
          )}
        </div>

        {/* Live Preview Card */}
        {value && (
          <div className="p-2.5 bg-[#FAF7EE] border-2 border-[#191712] rounded-md flex items-center gap-3 shadow-[2px_2px_0px_#191712]">
            <div className="relative w-16 h-14 rounded border border-[#191712] overflow-hidden bg-white shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={value}
                alt="Preview"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100'><rect width='100%' height='100%' fill='%23FAF6EC'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='%23999' font-size='10'>No Image</text></svg>";
                }}
              />
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-typewriter text-[11px] font-bold text-[#191712] truncate">
                {value.startsWith("http") ? value : "Local Asset: " + value}
              </p>
              <p className="font-hand text-xs text-[#15803D]">✓ Image ready for preview &amp; live view</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
