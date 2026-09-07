"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Check,
  Clock,
  Copy,
  Mail,
  MailOpen,
  MapPin,
  Phone,
} from "lucide-react";
import { useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { COMPANY } from "@/lib/data";

const PROJECT_TYPES = [
  "Artificial Intelligence",
  "SaaS",
  "Mobile development",
  "Design",
  "E-commerce",
  "Web3",
  "CMS",
  "Digital marketing",
  "Staff augmentation",
  "Not sure yet — let's talk",
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Web3Forms access key (public by design — safe in client code). When set, the
 * form submits directly to the company inbox with no backend. When absent, the
 * form falls back to opening the visitor's mail client with a copyable message.
 */
const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;

interface FormState {
  name: string;
  email: string;
  company: string;
  projectType: string;
  message: string;
}

const EMPTY: FormState = {
  name: "",
  email: "",
  company: "",
  projectType: PROJECT_TYPES[0],
  message: "",
};

interface Composed {
  subject: string;
  body: string;
  href: string;
}

export function Contact() {
  const [form, setForm] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>(
    {},
  );
  const [composed, setComposed] = useState<Composed | null>(null);
  const [copied, setCopied] = useState(false);
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");

  const update =
    (field: keyof FormState) =>
    (
      event: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >,
    ) => {
      setForm((prev) => ({ ...prev, [field]: event.target.value }));
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    };

  const validate = () => {
    const next: Partial<Record<keyof FormState, string>> = {};
    if (!form.name.trim()) next.name = "Please add your name.";
    if (!EMAIL_RE.test(form.email.trim()))
      next.email = "Enter a valid email address.";
    if (form.message.trim().length < 10)
      next.message = "A sentence or two about the project helps.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const openMailFallback = (subject: string, body: string) => {
    const href = `mailto:${COMPANY.email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
    window.location.href = href;
    setCopied(false);
    setComposed({ subject, body, href });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!validate() || status === "submitting") return;

    const subject = `Consultation request — ${form.projectType}`;
    const body = [
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      form.company.trim() ? `Company: ${form.company}` : null,
      `Project type: ${form.projectType}`,
      "",
      form.message,
    ]
      .filter(Boolean)
      .join("\n");

    // No key configured — hand off to the visitor's mail client.
    if (!WEB3FORMS_KEY) {
      openMailFallback(subject, body);
      return;
    }

    setStatus("submitting");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject,
          from_name: `${COMPANY.name} website`,
          name: form.name,
          email: form.email,
          company: form.company || "—",
          project_type: form.projectType,
          message: form.message,
        }),
      });
      const data = (await res.json()) as { success?: boolean };
      if (res.ok && data.success) {
        setStatus("success");
      } else {
        setStatus("error");
        openMailFallback(subject, body);
      }
    } catch {
      setStatus("error");
      openMailFallback(subject, body);
    }
  };

  const copyMessage = async () => {
    if (!composed) return;
    const text = `To: ${COMPANY.email}\nSubject: ${composed.subject}\n\n${composed.body}`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  };

  const reset = () => {
    setComposed(null);
    setCopied(false);
    setStatus("idle");
    setForm(EMPTY);
    setErrors({});
  };

  const fieldClass = (field: keyof FormState) =>
    `peer w-full rounded-xl border bg-ink/[0.03] px-4 pb-2 pt-5 text-sm text-ink outline-none transition-colors placeholder:text-transparent focus:border-brand-orange/60 ${
      errors[field] ? "border-brand-red/70" : "border-ink/12"
    }`;

  const floatingLabelClass =
    "pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm text-ink/45 transition-all duration-200 peer-focus:top-3 peer-focus:translate-y-0 peer-focus:text-[11px] peer-focus:text-brand-orange peer-[:not(:placeholder-shown)]:top-3 peer-[:not(:placeholder-shown)]:translate-y-0 peer-[:not(:placeholder-shown)]:text-[11px] peer-[:not(:placeholder-shown)]:text-ink/55";

  return (
    <section
      id="contact"
      className="relative scroll-mt-24 overflow-hidden py-16 sm:py-20 lg:py-24"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/3 h-80 w-80 -translate-x-1/2 rounded-full bg-brand-orange/10 blur-[150px]"
      />
      <div className="section-shell relative">
        <SectionHeading
          eyebrow="Get Started"
          title={
            <>
              Open for collaboration and{" "}
              <span className="gradient-text">partnership</span>
            </>
          }
          description="Let’s innovate together. Contact us to explore partnership possibilities — a real engineer reads every message."
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-[1fr_1.15fr] lg:gap-12">
          {/* Left — the human details */}
          <Reveal className="flex flex-col gap-6">
            <div className="glass gradient-border rounded-2xl p-6">
              <span className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-ink/5 px-3 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-ink/65">
                <Clock className="h-3.5 w-3.5 text-brand-orange" />
                Free · 90 minutes
              </span>
              <p className="mt-4 text-sm leading-relaxed text-ink/65">
                Book a working session with our principal engineers. No slide
                deck, no obligation — just a straight read on where your platform
                stands and what we&apos;d do next.
              </p>
            </div>

            <ul className="grid gap-3">
              <li>
                <a
                  href={`mailto:${COMPANY.email}`}
                  className="glass gradient-border flex items-center gap-3.5 rounded-2xl p-4 transition-colors hover:bg-ink/[0.06]"
                >
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-brand-red to-brand-orange text-obsidian">
                    <Mail className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block text-xs uppercase tracking-wider text-ink/45">
                      Email
                    </span>
                    <span className="block text-sm font-medium text-ink">
                      {COMPANY.email}
                    </span>
                  </span>
                </a>
              </li>
              <li>
                <a
                  href={COMPANY.phoneHref}
                  className="glass gradient-border flex items-center gap-3.5 rounded-2xl p-4 transition-colors hover:bg-ink/[0.06]"
                >
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-brand-orange to-brand-red text-obsidian">
                    <Phone className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block text-xs uppercase tracking-wider text-ink/45">
                      Call
                    </span>
                    <span className="block text-sm font-medium text-ink">
                      {COMPANY.phone}
                    </span>
                  </span>
                </a>
              </li>
              <li className="glass flex items-center gap-3.5 rounded-2xl p-4">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-ink/5 text-brand-orange">
                  <MapPin className="h-5 w-5" />
                </span>
                <span>
                  <span className="block text-xs uppercase tracking-wider text-ink/45">
                    Where we are
                  </span>
                  <span className="block text-sm font-medium text-ink">
                    {COMPANY.location}
                  </span>
                </span>
              </li>
            </ul>
          </Reveal>

          {/* Right — the form */}
          <Reveal delay={0.05}>
            <div className="glass-strong gradient-border rounded-3xl p-6 sm:p-8">
              {status === "success" ? (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex min-h-[22rem] flex-col items-center justify-center text-center"
                >
                  <span className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-brand-red to-brand-orange text-obsidian">
                    <Check className="h-7 w-7" />
                  </span>
                  <h3 className="mt-5 text-xl font-semibold text-ink">
                    Message sent — thank you
                  </h3>
                  <p className="mt-2 max-w-sm text-sm leading-relaxed text-ink/60">
                    It&apos;s in our inbox. A real engineer will read it and get
                    back to you within one business day.
                  </p>
                  <button
                    type="button"
                    onClick={reset}
                    className="mt-6 text-sm font-medium text-ink/60 underline-offset-4 hover:text-ink hover:underline"
                  >
                    Send another
                  </button>
                </motion.div>
              ) : composed ? (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col"
                >
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-brand-red to-brand-orange text-obsidian">
                    <MailOpen className="h-6 w-6" />
                  </span>
                  <h3 className="mt-4 text-xl font-semibold text-ink">
                    Your message is ready
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink/60">
                    We tried to open it in your mail app. If nothing happened,
                    copy it below and send it to{" "}
                    <a
                      href={`mailto:${COMPANY.email}`}
                      className="text-brand-orange hover:underline"
                    >
                      {COMPANY.email}
                    </a>{" "}
                    from wherever you read email.
                  </p>

                  <pre className="mt-4 max-h-56 overflow-auto whitespace-pre-wrap rounded-xl border border-ink/10 bg-ink/[0.03] p-4 text-xs leading-relaxed text-ink/70">
                    {`To: ${COMPANY.email}\nSubject: ${composed.subject}\n\n${composed.body}`}
                  </pre>

                  <div className="mt-4 flex flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={copyMessage}
                      className="inline-flex items-center gap-2 rounded-full border border-ink/15 bg-ink/5 px-4 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-ink/10"
                    >
                      {copied ? (
                        <>
                          <Check className="h-4 w-4 text-brand-orange" />
                          Copied
                        </>
                      ) : (
                        <>
                          <Copy className="h-4 w-4" />
                          Copy message
                        </>
                      )}
                    </button>
                    <a
                      href={composed.href}
                      className="inline-flex items-center gap-2 rounded-full bg-brand-gradient px-4 py-2.5 text-sm font-semibold text-obsidian transition-shadow hover:shadow-glow-sm"
                    >
                      <Mail className="h-4 w-4" />
                      Open email app
                    </a>
                  </div>

                  <button
                    type="button"
                    onClick={reset}
                    className="mt-5 self-start text-sm font-medium text-ink/55 underline-offset-4 hover:text-ink hover:underline"
                  >
                    Edit or write another
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="grid gap-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="grid gap-1.5">
                      <div className="relative">
                        <input
                          id="field-name"
                          type="text"
                          value={form.name}
                          onChange={update("name")}
                          autoComplete="name"
                          className={fieldClass("name")}
                          placeholder=" "
                        />
                        <label htmlFor="field-name" className={floatingLabelClass}>
                          Name
                        </label>
                      </div>
                      {errors.name && (
                        <span className="text-xs text-brand-red">
                          {errors.name}
                        </span>
                      )}
                    </div>
                    <div className="grid gap-1.5">
                      <div className="relative">
                        <input
                          id="field-email"
                          type="email"
                          value={form.email}
                          onChange={update("email")}
                          autoComplete="email"
                          className={fieldClass("email")}
                          placeholder=" "
                        />
                        <label htmlFor="field-email" className={floatingLabelClass}>
                          Email
                        </label>
                      </div>
                      {errors.email && (
                        <span className="text-xs text-brand-red">
                          {errors.email}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="relative">
                    <input
                      id="field-company"
                      type="text"
                      value={form.company}
                      onChange={update("company")}
                      autoComplete="organization"
                      className={fieldClass("company")}
                      placeholder=" "
                    />
                    <label htmlFor="field-company" className={floatingLabelClass}>
                      Company <span className="font-normal text-ink/40">(optional)</span>
                    </label>
                  </div>

                  <div className="grid gap-1.5 text-sm">
                    <span className="font-medium text-ink/75">
                      What do you need?
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {PROJECT_TYPES.map((type) => {
                        const isActive = form.projectType === type;
                        return (
                          <button
                            key={type}
                            type="button"
                            onClick={() =>
                              setForm((prev) => ({ ...prev, projectType: type }))
                            }
                            className={`relative rounded-full border px-3.5 py-2 text-xs font-medium transition-all duration-200 sm:text-[13px] ${
                              isActive
                                ? "border-transparent text-obsidian"
                                : "border-ink/12 bg-ink/[0.03] text-ink/65 hover:border-brand-orange/30 hover:text-ink"
                            }`}
                          >
                            {isActive && (
                              <motion.span
                                layoutId="project-type-pill"
                                className="absolute inset-0 rounded-full bg-brand-gradient shadow-glow-sm"
                                transition={{ type: "spring", stiffness: 380, damping: 32 }}
                              />
                            )}
                            <span className="relative z-10">{type}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="grid gap-1.5">
                    <div className="relative">
                      <textarea
                        id="field-message"
                        value={form.message}
                        onChange={update("message")}
                        rows={4}
                        className={`${fieldClass("message")} resize-y`}
                        placeholder=" "
                      />
                      <label htmlFor="field-message" className={floatingLabelClass}>
                        A bit about the project
                      </label>
                    </div>
                    <p className="text-xs text-ink/40">
                      Where you are now, what you&apos;re trying to ship, and any
                      timeline that matters.
                    </p>
                    {errors.message && (
                      <span className="text-xs text-brand-red">
                        {errors.message}
                      </span>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="group mt-1 inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-brand-gradient bg-[length:200%_100%] px-6 py-3.5 text-sm font-semibold text-obsidian transition-all duration-300 hover:animate-gradient-x hover:shadow-glow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange/60 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {status === "submitting" ? "Sending…" : "Send it over"}
                    {status !== "submitting" && (
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    )}
                  </button>
                  <p className="text-center text-xs text-ink/40">
                    {WEB3FORMS_KEY
                      ? "Goes straight to our inbox. We reply within one business day."
                      : "Opens a pre-filled email — nothing is sent until you press send."}
                  </p>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
