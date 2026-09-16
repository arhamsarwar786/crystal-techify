"use client";

import { useState } from "react";
import type { JobQuestion } from "@/lib/job-questions";
import { fetchRetry } from "@/lib/fetch-retry";
import { fmt, useLocale } from "@/lib/i18n";

const fieldClass =
  "mt-1.5 w-full rounded-xl border border-ink/20 bg-bg px-3 py-3 outline-none focus:border-brand-orange/60";

export function ApplyForm({
  jobId,
  questions,
}: {
  jobId: string;
  questions: JobQuestion[];
}) {
  const { t } = useLocale();
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);
  const [pending, setPending] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    const form = event.currentTarget;
    const data = new FormData(form);
    data.set("jobId", jobId);
    const phoneDigits = String(data.get("phone") ?? "").replace(/\D/g, "");
    if (phoneDigits.length < 7 || phoneDigits.length > 15) {
      setError(t.apply.errPhone);
      return;
    }
    const cv = data.get("cv");
    if (!(cv instanceof File) || !cv.name) {
      setError(t.apply.errCvMissing);
      return;
    }
    const ext = cv.name.toLowerCase().slice(cv.name.lastIndexOf("."));
    if (![".pdf", ".doc", ".docx"].includes(ext)) {
      setError(t.apply.errCvType);
      return;
    }
    if (cv.size > 8 * 1024 * 1024) {
      setError(t.apply.errCvSize);
      return;
    }
    setPending(true);
    const res = await fetchRetry("/api/applications", {
      method: "POST",
      body: data,
    });
    let json: { error?: string } = {};
    try {
      json = (await res.json()) as { error?: string };
    } catch {
      setPending(false);
      setError(t.apply.errDb);
      return;
    }
    setPending(false);
    if (!res.ok) {
      setError(json.error || t.apply.errSubmit);
      return;
    }
    setDone(true);
    form.reset();
  }

  if (done) {
    return (
      <p className="mt-4 text-sm leading-relaxed text-ink/80">
        {t.apply.received}
      </p>
    );
  }

  return (
    <form onSubmit={(e) => void onSubmit(e)} className="mt-4 space-y-4">
      <label className="block text-sm font-medium text-ink">
        {t.apply.phone}
        <input name="phone" required autoComplete="tel" className={fieldClass} />
      </label>
      {questions.map((question, index) => (
        <label key={question.id} className="block text-sm font-medium text-ink">
          {question.prompt}
          <span className="ml-1 text-brand-orange" aria-hidden>
            *
          </span>
          <textarea
            name={`answer:${question.id}`}
            required
            rows={3}
            aria-label={fmt(t.apply.requiredQ, { n: index + 1 })}
            className={fieldClass}
          />
        </label>
      ))}
      <label className="block text-sm font-medium text-ink">
        {t.apply.cover}{" "}
        <span className="font-normal text-ink/60">{t.contact.optional}</span>
        <textarea name="coverNote" rows={4} className={fieldClass} />
      </label>
      <label className="block text-sm font-medium text-ink">
        {t.apply.cv}
        <input
          name="cv"
          type="file"
          required
          accept=".pdf,.doc,.docx"
          className="mt-1.5 w-full text-sm file:mr-3 file:rounded-full file:border-0 file:bg-ink/10 file:px-3 file:py-1.5 file:text-sm file:font-medium file:text-ink"
        />
      </label>
      {error && <p className="text-sm text-brand-red">{error}</p>}
      <button
        type="submit"
        disabled={pending}
        className="rounded-full bg-brand-orange px-6 py-3 font-sans text-sm font-semibold text-white disabled:opacity-60"
      >
        {pending ? t.apply.pending : t.apply.submit}
      </button>
    </form>
  );
}
