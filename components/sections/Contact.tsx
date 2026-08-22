"use client";
import { useRef, useState } from "react";
import emailjs from "emailjs-com";
import Swal from "sweetalert2";
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaPaperPlane } from "react-icons/fa";

export default function Contact() {
  const form = useRef<HTMLFormElement>(null);
  const [sending, setSending] = useState(false);

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    emailjs
      .sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        form.current!,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      )
      .then(() => {
        Swal.fire({
          title: "Message Sent! 🎉",
          text: "Thanks for reaching out. I'll get back to you soon.",
          icon: "success",
          confirmButtonColor: "#FDCB6E",
          background: "#12121E",
          color: "#F0F0F5",
        });
        form.current?.reset();
      })
      .catch(() => {
        Swal.fire({
          title: "Oops!",
          text: "Something went wrong. Please try again.",
          icon: "error",
          confirmButtonColor: "#f87171",
          background: "#12121E",
          color: "#F0F0F5",
        });
      })
      .finally(() => setSending(false));
  };

  const info = [
    { icon: FaMapMarkerAlt, label: "Location", value: "Madaripur, Bangladesh" },
    { icon: FaPhone,        label: "Phone",    value: "+880 01859797307" },
    { icon: FaEnvelope,     label: "Email",    value: "juwelhossain16457@gmail.com" },
  ];

  return (
    <section
      id="contact"
      className="relative py-24 lg:py-32"
      style={{ background: "var(--bg-base)" }}
    >
      {/* Accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, var(--border-accent), transparent)" }}
      />

      <div className="max-w-6xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="mb-16 text-center">
          <span className="section-label">Contact</span>
          <h2 className="heading-font text-4xl lg:text-5xl font-bold text-white mt-2">
            Let&apos;s Connect
          </h2>
          <div className="section-divider mx-auto mt-4" />
        </div>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Left — Info */}
          <div className="space-y-6">
            <p className="text-base lg:text-lg leading-relaxed" style={{ color: "var(--text-muted)" }}>
              I&apos;d love to hear from you! Whether you have a project idea, a question,
              or just want to say hi — drop me a message.
            </p>

            <div className="space-y-4">
              {info.map(({ icon: Icon, label, value }) => (
                <div
                  key={label}
                  className="flex items-center gap-4 p-4 rounded-xl"
                  style={{ background: "var(--bg-elevated)", border: "1px solid var(--border)" }}
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: "var(--accent-glow)", color: "var(--accent)" }}
                  >
                    <Icon />
                  </div>
                  <div>
                    <p className="text-xs" style={{ color: "var(--text-subtle)" }}>{label}</p>
                    <p className="text-sm font-medium text-white">{value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Form */}
          <form
            ref={form}
            onSubmit={sendEmail}
            className="glass-card p-8 space-y-5"
          >
            <div>
              <label className="block text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "var(--text-subtle)" }}>
                Full Name
              </label>
              <input
                required
                name="name"
                type="text"
                placeholder="Your name"
                className="form-input"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "var(--text-subtle)" }}>
                Email
              </label>
              <input
                required
                name="email"
                type="email"
                placeholder="your@email.com"
                className="form-input"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "var(--text-subtle)" }}>
                Message
              </label>
              <textarea
                required
                name="message"
                rows={5}
                placeholder="Tell me about your project..."
                className="form-input resize-none"
              />
            </div>
            <button
              type="submit"
              disabled={sending}
              className="btn-primary w-full justify-center py-3"
            >
              {sending ? (
                <>
                  <span className="w-4 h-4 border-2 border-black/30 border-t-black/80 rounded-full animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <FaPaperPlane />
                  Send Message
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
