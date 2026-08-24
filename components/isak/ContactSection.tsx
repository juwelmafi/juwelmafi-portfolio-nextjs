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
      text: "Thank you! I will get back to you as soon as possible.",
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
      <h4 className="s-title letter-space--2 split-text effect-blur-fade">
        If you have a general or project <br className="d-none d-lg-block" />
        enquiry, please drop me an email <br className="d-none d-lg-block" />
        or fill the form - available now
      </h4>

      <form className="form-contact" id="contactform" onSubmit={handleSubmit}>
        <div className="form-content effectFade fadeUp no-div">
          <fieldset className="field-ip">
            <input
              type="text"
              id="name"
              placeholder="Your Name *"
              required
              name="name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
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
            />
          </fieldset>
          <fieldset className="field-ip">
            <input
              type="text"
              id="message"
              placeholder="Project Description"
              name="message"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
            />
          </fieldset>
        </div>

        <div className="form-action effectFade fadeUp no-div">
          <div className="send-wrap">
            <button type="submit" disabled={sending} className="tf-btn animate-btn animate-dark">
              <span className="text-body-3">
                {sending ? "Sending..." : "Send Message"}
              </span>
            </button>
          </div>
          <a
            href="mailto:hello@isak.design"
            className="text-body-1 link letter-space--2 text-black-72"
          >
            hello@isak.design
          </a>
        </div>
      </form>
    </div>
  );
}
