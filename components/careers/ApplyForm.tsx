"use client";

import { useState } from "react";

export function ApplyForm({ jobId }: { jobId: string }) {
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
    const res = await fetch("/api/applications", { method: "POST", body: data });
    const json = (await res.json()) as { error?: string };
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
      <p className="mt-4 text-sm text-ink/70">
        Application received. We will be in touch if there is a fit.
      </p>
    );
  }

  return (
    <form onSubmit={(e) => void onSubmit(e)} className="mt-4 space-y-4">
      <label className="block text-sm">
        Phone
        <input
          name="phone"
          required
          className="mt-1 w-full rounded-xl border border-ink/10 bg-bg px-3 py-2.5 outline-none focus:border-brand-orange/50"
        />
      </label>
      <label className="block text-sm">
        Cover note
        <textarea
          name="coverNote"
          rows={4}
          className="mt-1 w-full rounded-xl border border-ink/10 bg-bg px-3 py-2.5 outline-none focus:border-brand-orange/50"
        />
      </label>
      <label className="block text-sm">
        CV (PDF or DOC, max 8MB)
        <input
          name="cv"
          type="file"
          required
          accept=".pdf,.doc,.docx"
          className="mt-1 w-full text-sm"
        />
      </label>
      {error && <p className="text-sm text-brand-red">{error}</p>}
      <button
        type="submit"
        disabled={pending}
        className="rounded-full bg-brand-gradient px-6 py-3 font-display text-[12px] tracking-[0.12em] text-obsidian disabled:opacity-60"
      >
        {pending ? "Submitting…" : "Submit application"}
      </button>
    </form>
  );
}
