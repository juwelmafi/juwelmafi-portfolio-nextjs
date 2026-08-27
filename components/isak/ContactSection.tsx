"use client";
import { useState } from "react";
import emailjs from "emailjs-com";
import Swal from "sweetalert2";

export default function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email) {
      Swal.fire({
        title: "Validation Error",
        text: "Please fill in your name and email address.",
        icon: "warning",
        background: "#12121E",
        color: "#F0F0F5",
      });
      return;
    }

    setSending(true);

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "";
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "";
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "";

    if (serviceId && templateId && publicKey) {
      try {
        await emailjs.send(
          serviceId,
          templateId,
          {
            from_name: form.name,
            from_email: form.email,
            message: form.message,
          },
          publicKey
        );
      } catch (err) {
        console.error("EmailJS send failed:", err);
      }
    }

    setSending(false);
    setForm({ name: "", email: "", message: "" });

    Swal.fire({
      title: "Message Sent!",
      text: "Thank you! Juwel will get back to you promptly.",
      icon: "success",
      background: "#12121E",
      color: "#F0F0F5",
      confirmButtonColor: "#00DE51",
    });
  };

  return (
    <div id="contact" className="section-contact flat-spacing">
      <div className="sect-tag text-caption fw-medium effectFade fadeUp no-div">
        <i className="icon icon-send"></i>Contact
      </div>
      <h4 className="s-title letter-space--2 split-text effect-blur-fade mb-8">
        If you have a project in mind or <br className="d-none d-lg-block" />
        want to collaborate, drop me an email <br className="d-none d-lg-block" />
        or fill out the form — available now
      </h4>

      <form className="form-contact" id="contactform" onSubmit={handleSubmit}>
        <div className="form-content effectFade fadeUp no-div space-y-4 mb-6">
          <fieldset className="field-ip">
            <input
              type="text"
              id="name"
              placeholder="Your Name *"
              required
              name="name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full p-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 focus:border-[#00DE51] outline-none transition-colors"
            />
          </fieldset>
          <fieldset className="field-ip">
            <input
              type="email"
              id="email"
              placeholder="Email Address *"
              required
              name="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full p-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 focus:border-[#00DE51] outline-none transition-colors"
            />
          </fieldset>
          <fieldset className="field-ip">
            <textarea
              id="message"
              placeholder="Project Description"
              name="message"
              rows={4}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full p-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 focus:border-[#00DE51] outline-none transition-colors resize-none"
            />
          </fieldset>
        </div>

        <div className="form-action effectFade fadeUp no-div flex flex-wrap items-center justify-between gap-4">
          <div className="send-wrap">
            <button type="submit" disabled={sending} className="tf-btn animate-btn animate-dark">
              <span className="text-body-3">
                {sending ? "Sending..." : "Send Message"}
              </span>
            </button>
          </div>
          <a
            href="mailto:juwelhossain16457@gmail.com"
            className="text-body-1 link letter-space--2 text-white/80 hover:text-[#00DE51] font-mono text-sm"
          >
            juwelhossain16457@gmail.com
          </a>
        </div>
      </form>
    </div>
  );
}
