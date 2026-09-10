"use client";

import { useState } from "react";
import type { JobQuestion } from "@/lib/job-questions";
import { fetchRetry } from "@/lib/fetch-retry";

const fieldClass =
  "mt-1.5 w-full rounded-xl border border-ink/20 bg-bg px-3 py-3 outline-none focus:border-brand-orange/60";

export function ApplyForm({
  jobId,
  questions,
}: {
  jobId: string;
  questions: JobQuestion[];
}) {
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);
  const [pending, setPending] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setPending(true);
    const form = event.currentTarget;
    const data = new FormData(form);
    data.set("jobId", jobId);
    const res = await fetchRetry("/api/applications", {
      method: "POST",
      body: data,
    });
    let json: { error?: string } = {};
    try {
      json = (await res.json()) as { error?: string };
    } catch {
      setPending(false);
      setError("The database is waking up. Wait a few seconds and try again.");
      return;
    }
    setPending(false);
    if (!res.ok) {
      setError(json.error || "Could not submit");
      return;
    }
    setDone(true);
    form.reset();
  }

  if (done) {
    return (
      <p className="mt-4 text-sm leading-relaxed text-ink/80">
        Application received. We will be in touch if there is a fit.
      </p>
    );
  }

  return (
    <form onSubmit={(e) => void onSubmit(e)} className="mt-4 space-y-4">
      <label className="block text-sm font-medium text-ink">
        Phone
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
            aria-label={`Required question ${index + 1}`}
            className={fieldClass}
          />
        </label>
      ))}
      <label className="block text-sm font-medium text-ink">
        Cover note{" "}
        <span className="font-normal text-ink/60">(optional)</span>
        <textarea name="coverNote" rows={4} className={fieldClass} />
      </label>
      <label className="block text-sm font-medium text-ink">
        CV (PDF or DOC, max 8MB)
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
        className="rounded-full bg-brand-gradient px-6 py-3 font-sans text-sm font-semibold text-obsidian disabled:opacity-60"
      >
        {pending ? "Submitting…" : "Submit application"}
      </button>
    </form>
  );
}
