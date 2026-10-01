"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import emailjs from "@emailjs/browser";
import Swal from "sweetalert2";
import {
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
  FaGithub,
  FaLinkedin,
  FaYoutube,
} from "react-icons/fa";

interface ContactRetroProps {
  content?: Record<string, string>;
}

export default function ContactRetro({ content }: ContactRetroProps) {
  const searchParams = useSearchParams();
  const serviceParam = searchParams.get("service") || searchParams.get("tier") || "";

  const initialSubject = serviceParam
    ? `Inquiry regarding ${serviceParam}`
    : "";

  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: initialSubject,
    message: "",
  });
  const [sending, setSending] = useState(false);

  // Dynamic Content variables
  const cardEyebrow =
    content?.["contact.cardEyebrow"] || "COMMUNICATION DOSSIER";
  const cardTitle =
    content?.["contact.cardTitle"] || "Let's talk software.";
  const cardDesc =
    content?.["contact.cardDesc"] ||
    "Have a project in mind, need consultation on modern full-stack architectures, or looking to collaborate? Drop me a message below.";
  const contactEmail =
    content?.["contact.email"] || content?.["about.email"] || "juwelhossain16457@gmail.com";
  const contactLocation =
    content?.["contact.location"] || "Dhaka, Bangladesh · Global Remote";
  const contactAvailability =
    content?.["contact.availability"] || "Available for Freelance & Engineering";

  const githubUrl =
    content?.["social.github"] || "https://github.com/juwelmafi";
  const linkedinUrl =
    content?.["social.linkedin"] || "https://linkedin.com/in/juwelmafi";
  const youtubeUrl =
    content?.["social.youtube"] || "https://youtube.com/@juwelmafi";

  const formTitle = content?.["contact.formTitle"] || "Transmit a Message";
  const guaranteeText = content?.["contact.guaranteeText"] || "0% SPAM GUARANTEE";

  useEffect(() => {
    if (serviceParam) {
      setForm((prev) => ({
        ...prev,
        subject: `Inquiry regarding ${serviceParam}`,
      }));
    }
  }, [serviceParam]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      Swal.fire({
        title: "Missing Information",
        text: "Please provide your name, email address, and a message description.",
        icon: "warning",
        background: "#FAF6EC",
        color: "#191712",
        confirmButtonColor: "#191712",
      });
      return;
    }

    setSending(true);

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "";
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "";
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "";
    const autoReplyTemplateId =
      process.env.NEXT_PUBLIC_EMAILJS_AUTO_REPLY_TEMPLATE_ID || "";

    const isPlaceholder =
      !serviceId ||
      !templateId ||
      !publicKey ||
      serviceId.includes("your_") ||
      templateId.includes("your_") ||
      publicKey.includes("your_");

    if (isPlaceholder) {
      // Friendly developer notice if credentials are not configured yet
      setSending(false);
      Swal.fire({
        title: "EmailJS Setup Notice",
        html: `
          <div style="text-align: left; font-family: monospace; font-size: 13px; line-height: 1.6;">
            <p><strong>Note for Local Testing:</strong></p>
            <p>EmailJS credentials in <code>.env.local</code> are currently set to placeholders:</p>
            <pre style="background: #EFE9D9; padding: 8px; border-radius: 4px; overflow-x: auto;">
NEXT_PUBLIC_EMAILJS_SERVICE_ID
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
            </pre>
            <p>To enable live email delivery and auto-replies, replace these in <code>.env.local</code> with your actual keys from <a href="https://dashboard.emailjs.com" target="_blank" style="color: #C2410C; text-decoration: underline;">emailjs.com</a>.</p>
          </div>
        `,
        icon: "info",
        background: "#FAF6EC",
        color: "#191712",
        confirmButtonColor: "#191712",
        confirmButtonText: "Understood",
      });
      return;
    }

    try {
      // 1. Dispatch Notification to Site Admin / Juwel
      await emailjs.send(
        serviceId,
        templateId,
        {
          name: form.name,
          from_name: form.name,
          email: form.email,
          from_email: form.email,
          reply_to: form.email,
          subject: form.subject || "Portfolio Contact Inquiry",
          message: form.message,
          to_name: "Juwel Hossain",
          to_email: contactEmail,
        },
        publicKey
      );

      // 2. Dispatch Auto-Reply Confirmation to Sender (if autoReplyTemplateId is configured)
      if (autoReplyTemplateId && !autoReplyTemplateId.includes("your_")) {
        try {
          await emailjs.send(
            serviceId,
            autoReplyTemplateId,
            {
              to_name: form.name,
              name: form.name,
              to_email: form.email,
              email: form.email,
              recipient: form.email,
              reply_to: contactEmail,
              user_subject: form.subject || "Full-Stack Web Inquiry",
              subject: `Receipt: Transmission logged, ${form.name}`,
              user_message: form.message,
              message: form.message,
              sender_name: "Juwel Hossain",
              from_name: "Juwel Hossain",
              sender_email: contactEmail,
              from_email: contactEmail,
            },
            publicKey
          );
        } catch (autoErr) {
          console.error("Auto-reply template dispatch error:", autoErr);
        }
      }

      setSending(false);
      setForm({ name: "", email: "", subject: "", message: "" });

      Swal.fire({
        title: "Transmission Dispatched!",
        text: "Thank you for reaching out! Your inquiry has been sent directly to Juwel Hossain, and an automated confirmation has been dispatched to your email.",
        icon: "success",
        background: "#FAF6EC",
        color: "#191712",
        confirmButtonColor: "#191712",
      });
    } catch (err: unknown) {
      console.error("EmailJS dispatch error:", err);
      setSending(false);
      Swal.fire({
        title: "Transmission Error",
        text: "Could not send message through EmailJS. Please verify your EmailJS service & template settings or email directly at " + contactEmail,
        icon: "error",
        background: "#FAF6EC",
        color: "#191712",
        confirmButtonColor: "#191712",
      });
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
      {/* Left Column: Direct Info Card with Masking Tape */}
      <div className="lg:col-span-5 relative">
        <div className="tape tape-top" aria-hidden="true" />

        <div className="hand-box p-7 sm:p-9 bg-[#FFFFFF] relative">
          <p className="font-typewriter text-xs uppercase tracking-widest text-[#C2410C] font-bold pb-2 border-b-2 border-[#191712] mb-4">
            {cardEyebrow}
          </p>

          <h2 className="font-script font-bold text-3xl sm:text-4xl text-[#191712] mb-3">
            {cardTitle.toLowerCase().includes("software") ? (
              <>
                {cardTitle.replace(/software\.?/i, "").trim()}{" "}
                <span className="marked">software.</span>
              </>
            ) : (
              cardTitle
            )}
          </h2>

          <p className="font-hand text-base sm:text-lg text-[#57534E] leading-relaxed mb-6">
            {cardDesc}
          </p>

          <div className="space-y-4 font-typewriter text-xs sm:text-sm text-[#191712] border-t border-[#191712]/20 pt-5">
            <div className="flex items-center gap-3">
              <FaEnvelope className="text-[#C2410C] text-base shrink-0" />
              <a href={`mailto:${contactEmail}`} className="hover:underline font-bold">
                {contactEmail}
              </a>
            </div>

            <div className="flex items-center gap-3">
              <FaMapMarkerAlt className="text-[#C2410C] text-base shrink-0" />
              <span>{contactLocation}</span>
            </div>

            <div className="flex items-center gap-3">
              <FaClock className="text-[#C2410C] text-base shrink-0" />
              <span>{contactAvailability}</span>
            </div>
          </div>

          {/* Social Links */}
          <div className="border-t border-[#191712]/20 pt-5 mt-6 flex items-center gap-4">
            {githubUrl && (
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 border-2 border-[#191712] bg-[#FBF6E6] flex items-center justify-center text-[#191712] hover:bg-[#FFE45E] transition-all shadow-[2px_2px_0px_#191712]"
                aria-label="GitHub"
              >
                <FaGithub size={18} />
              </a>
            )}
            {linkedinUrl && (
              <a
                href={linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 border-2 border-[#191712] bg-[#FBF6E6] flex items-center justify-center text-[#191712] hover:bg-[#FFE45E] transition-all shadow-[2px_2px_0px_#191712]"
                aria-label="LinkedIn"
              >
                <FaLinkedin size={18} />
              </a>
            )}
            {youtubeUrl && (
              <a
                href={youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 border-2 border-[#191712] bg-[#FBF6E6] flex items-center justify-center text-[#191712] hover:bg-[#FFE45E] transition-all shadow-[2px_2px_0px_#191712]"
                aria-label="YouTube"
              >
                <FaYoutube size={18} />
              </a>
            )}
          </div>

          {/* Bottom Stamp */}
          <div className="mt-8 flex justify-end">
            <div className="stamp-gold-cert">
              <span className="font-bold">COMMUNICATION</span>
              <span>VERIFIED</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: Hand-drawn Form Container */}
      <div className="lg:col-span-7">
        <div className="hand-box p-7 sm:p-10 bg-[#FFFFFF]">
          <div className="border-b-2 border-[#191712] pb-3 mb-6 flex items-center justify-between">
            <h3 className="font-script font-bold text-2xl sm:text-3xl text-[#191712]">
              {formTitle}
            </h3>
            <span className="font-typewriter text-xs text-[#78716C]">
              DIRECT DISPATCH
            </span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="font-typewriter text-xs uppercase tracking-wider text-[#191712] font-bold block mb-2"
              >
                Your Full Name *
              </label>
              <input
                id="name"
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="e.g. Alex Morgan"
                className="w-full bg-[#FAF7EE] border-2 border-[#191712] rounded-md px-4 py-2.5 font-hand text-lg text-[#191712] focus:outline-none focus:bg-[#FFFFFF] focus:ring-2 focus:ring-[#FFE45E] transition-all"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="font-typewriter text-xs uppercase tracking-wider text-[#191712] font-bold block mb-2"
              >
                Your Email Address *
              </label>
              <input
                id="email"
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="e.g. alex@company.com"
                className="w-full bg-[#FAF7EE] border-2 border-[#191712] rounded-md px-4 py-2.5 font-hand text-lg text-[#191712] focus:outline-none focus:bg-[#FFFFFF] focus:ring-2 focus:ring-[#FFE45E] transition-all"
              />
            </div>

            <div>
              <label
                htmlFor="subject"
                className="font-typewriter text-xs uppercase tracking-wider text-[#191712] font-bold block mb-2"
              >
                Subject / Project Scope
              </label>
              <input
                id="subject"
                type="text"
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                placeholder="e.g. Next.js SaaS Platform, Shopify Theme, or Consultation"
                className="w-full bg-[#FAF7EE] border-2 border-[#191712] rounded-md px-4 py-2.5 font-hand text-lg text-[#191712] focus:outline-none focus:bg-[#FFFFFF] focus:ring-2 focus:ring-[#FFE45E] transition-all"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="font-typewriter text-xs uppercase tracking-wider text-[#191712] font-bold block mb-2"
              >
                Project Description / Message *
              </label>
              <textarea
                id="message"
                rows={5}
                required
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="Tell me about what you are looking to build, project deliverables, timelines, or questions..."
                className="w-full bg-[#FAF7EE] border-2 border-[#191712] rounded-md px-4 py-2.5 font-hand text-lg text-[#191712] focus:outline-none focus:bg-[#FFFFFF] focus:ring-2 focus:ring-[#FFE45E] transition-all resize-y"
              />
            </div>

            <div className="pt-2 flex items-center justify-between">
              <button
                type="submit"
                disabled={sending}
                className="btn-hand-black cursor-pointer"
              >
                {sending ? "Transmitting..." : "Send Message →"}
              </button>

              <span className="font-typewriter text-xs text-[#78716C]">
                {guaranteeText}
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
