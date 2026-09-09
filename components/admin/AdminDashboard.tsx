"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import type { JobQuestion, QuestionAnswer } from "@/lib/job-questions";

type Tab = "overview" | "jobs" | "users" | "apps";

interface UserRow {
  id: string;
  email: string;
  name: string;
  isAdmin: boolean;
  lastLoginAt: string | null;
  createdAt: string;
  _count: { applications: number };
  applications: {
    id: string;
    createdAt: string;
    job: { title: string; slug: string };
  }[];
}

interface JobRow {
  id: string;
  slug: string;
  title: string;
  department: string;
  location: string;
  employmentType: string;
  salaryRange: string;
  description: string;
  responsibilities: string;
  requirements: string;
  niceToHave: string;
  benefits: string;
  questions: JobQuestion[];
  active: boolean;
  _count: { applications: number };
}

interface AppRow {
  id: string;
  phone: string;
  coverNote: string;
  answers: QuestionAnswer[];
  createdAt: string;
  user: { id: string; name: string; email: string };
  job: { id: string; title: string; slug: string };
}

type JobForm = {
  title: string;
  department: string;
  location: string;
  employmentType: string;
  salaryRange: string;
  description: string;
  responsibilities: string;
  requirements: string;
  niceToHave: string;
  benefits: string;
  questions: JobQuestion[];
  active: boolean;
};

function emptyJob(): JobForm {
  return {
    title: "",
    department: "",
    location: "",
    employmentType: "Full-time",
    salaryRange: "",
    description: "",
    responsibilities: "",
    requirements: "",
    niceToHave: "",
    benefits: "",
    questions: [],
    active: true,
  };
}

const fieldClass =
  "w-full rounded-xl border border-ink/10 bg-ink/[0.03] px-3 py-2 text-sm outline-none focus:border-brand-orange/50";

function formatDate(value: string | null) {
  if (!value) return "Never";
  return new Date(value).toLocaleString();
}

function isRecentlyActive(lastLoginAt: string | null) {
  if (!lastLoginAt) return false;
  return Date.now() - new Date(lastLoginAt).getTime() < 1000 * 60 * 60 * 24 * 7;
}

export function AdminDashboard() {
  const [tab, setTab] = useState<Tab>("overview");
  const [users, setUsers] = useState<UserRow[]>([]);
  const [jobs, setJobs] = useState<JobRow[]>([]);
  const [apps, setApps] = useState<AppRow[]>([]);
  const [form, setForm] = useState<JobForm>(emptyJob);
  const [editing, setEditing] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [jobFilter, setJobFilter] = useState("all");
  const [loadError, setLoadError] = useState("");

  const load = useCallback(async () => {
    setLoadError("");
    const [u, j, a] = await Promise.all([
      fetch("/api/admin/users"),
      fetch("/api/admin/jobs"),
      fetch("/api/admin/applications"),
    ]);
    if (!u.ok || !j.ok || !a.ok) {
      setLoadError("Could not load admin data. Sign in as an admin and retry.");
      return;
    }
    const usersJson = (await u.json()) as { users?: UserRow[] };
    const jobsJson = (await j.json()) as { jobs?: JobRow[] };
    const appsJson = (await a.json()) as { applications?: AppRow[] };
    setUsers(usersJson.users ?? []);
    setJobs(jobsJson.jobs ?? []);
    setApps(appsJson.applications ?? []);
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const filteredApps = useMemo(
    () =>
      jobFilter === "all" ? apps : apps.filter((a) => a.job.id === jobFilter),
    [apps, jobFilter],
  );

  const applicants = useMemo(() => {
    const map = new Map<string, UserRow>();
    for (const user of users) {
      if (user._count.applications > 0) map.set(user.id, user);
    }
    return [...map.values()];
  }, [users]);

  const recentLogins = useMemo(
    () => users.filter((u) => isRecentlyActive(u.lastLoginAt)).length,
    [users],
  );

  async function saveJob(event: React.FormEvent) {
    event.preventDefault();
    setError("");
    const res = await fetch(
      editing ? `/api/admin/jobs/${editing}` : "/api/admin/jobs",
      {
        method: editing ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      },
    );
    const data = (await res.json()) as { error?: string };
    if (!res.ok) {
      setError(data.error || "Could not save");
      return;
    }
    setForm(emptyJob());
    setEditing(null);
    await load();
  }

  function startEdit(job: JobRow) {
    setEditing(job.id);
    setForm({
      title: job.title,
      department: job.department,
      location: job.location,
      employmentType: job.employmentType,
      salaryRange: job.salaryRange,
      description: job.description,
      responsibilities: job.responsibilities,
      requirements: job.requirements,
      niceToHave: job.niceToHave,
      benefits: job.benefits,
      questions: job.questions?.length
        ? job.questions.map((q) => ({ ...q }))
        : [],
      active: job.active,
    });
    setTab("jobs");
  }

  function addQuestion() {
    if (form.questions.length >= 12) return;
    setForm({
      ...form,
      questions: [
        ...form.questions,
        {
          id:
            typeof crypto !== "undefined" && crypto.randomUUID
              ? crypto.randomUUID()
              : `q-${Date.now()}-${form.questions.length}`,
          prompt: "",
        },
      ],
    });
  }

  function updateQuestion(id: string, prompt: string) {
    setForm({
      ...form,
      questions: form.questions.map((question) =>
        question.id === id ? { ...question, prompt } : question,
      ),
    });
  }

  function removeQuestion(id: string) {
    setForm({
      ...form,
      questions: form.questions.filter((question) => question.id !== id),
    });
  }

  const tabs: { id: Tab; label: string }[] = [
    { id: "overview", label: "Overview" },
    { id: "jobs", label: "Jobs" },
    { id: "users", label: "Users" },
    { id: "apps", label: "Applicants" },
  ];

  return (
    <div className="section-shell pb-20 pt-32 sm:pt-40">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="font-display text-[10px] uppercase tracking-[0.22em] text-brand-orange">
            Admin
          </p>
          <h1 className="mt-2 text-3xl">Dashboard</h1>
          <p className="mt-2 max-w-xl text-sm text-ink/55">
            Post and maintain roles, see every account, and review who applied.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {tabs.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              className={`rounded-full px-4 py-2 text-sm ${
                tab === t.id
                  ? "bg-brand-gradient text-obsidian"
                  : "border border-ink/10 text-ink/60"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {loadError && (
        <p className="mt-6 rounded-xl border border-brand-red/30 px-4 py-3 text-sm text-brand-red">
          {loadError}
        </p>
      )}

      {tab === "overview" && (
        <div className="mt-8 space-y-6">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: "Open jobs", value: jobs.filter((j) => j.active).length },
              { label: "All roles", value: jobs.length },
              { label: "Registered users", value: users.length },
              { label: "Applications", value: apps.length },
            ].map((card) => (
              <div
                key={card.label}
                className="rounded-2xl border border-ink/10 bg-ink/[0.03] p-4"
              >
                <p className="text-xs uppercase tracking-wider text-ink/45">
                  {card.label}
                </p>
                <p className="mt-2 font-display text-2xl text-ink">{card.value}</p>
              </div>
            ))}
          </div>
          <p className="text-sm text-ink/50">
            {recentLogins} account{recentLogins === 1 ? "" : "s"} signed in
            during the last 7 days. {applicants.length} user
            {applicants.length === 1 ? "" : "s"} have submitted at least one
            application.
          </p>
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border border-ink/10 p-5">
              <h2 className="text-lg">Latest applications</h2>
              <ul className="mt-4 space-y-3 text-sm">
                {apps.slice(0, 6).map((a) => (
                  <li key={a.id} className="border-t border-ink/10 pt-3 first:border-0 first:pt-0">
                    <p className="text-ink">
                      {a.user.name}{" "}
                      <span className="text-ink/45">→ {a.job.title}</span>
                    </p>
                    <p className="text-xs text-ink/40">{formatDate(a.createdAt)}</p>
                  </li>
                ))}
                {apps.length === 0 && (
                  <li className="text-ink/40">No applications yet.</li>
                )}
              </ul>
            </div>
            <div className="rounded-2xl border border-ink/10 p-5">
              <h2 className="text-lg">Roles</h2>
              <ul className="mt-4 space-y-3 text-sm">
                {jobs.map((job) => (
                  <li
                    key={job.id}
                    className="flex items-center justify-between gap-3 border-t border-ink/10 pt-3 first:border-0 first:pt-0"
                  >
                    <span>
                      <span className="text-ink">{job.title}</span>
                      <span className="block text-xs text-ink/40">
                        {job.active ? "Active" : "Inactive"} ·{" "}
                        {job._count.applications} applicants
                      </span>
                    </span>
                    <button
                      type="button"
                      className="text-brand-orange"
                      onClick={() => startEdit(job)}
                    >
                      Edit
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {tab === "users" && (
        <div className="mt-8 overflow-x-auto rounded-2xl border border-ink/10">
          <table className="w-full min-w-[52rem] text-left text-sm">
            <thead className="bg-ink/5 text-ink/50">
              <tr>
                <th className="px-4 py-3 font-medium">User</th>
                <th className="px-4 py-3 font-medium">Role</th>
                <th className="px-4 py-3 font-medium">Last sign-in</th>
                <th className="px-4 py-3 font-medium">Joined</th>
                <th className="px-4 py-3 font-medium">Applied to</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id} className="border-t border-ink/10 align-top">
                  <td className="px-4 py-3">
                    {u.name}
                    <span className="block text-ink/45">{u.email}</span>
                  </td>
                  <td className="px-4 py-3">
                    {u.isAdmin ? "Admin" : "Candidate"}
                    {isRecentlyActive(u.lastLoginAt) ? (
                      <span className="mt-1 block text-xs text-brand-orange">
                        Active this week
                      </span>
                    ) : null}
                  </td>
                  <td className="px-4 py-3 text-ink/55">
                    {formatDate(u.lastLoginAt)}
                  </td>
                  <td className="px-4 py-3 text-ink/55">
                    {new Date(u.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 text-ink/70">
                    {u.applications.length === 0
                      ? "—"
                      : u.applications.map((app) => (
                          <span key={app.id} className="mb-1 block">
                            {app.job.title}
                          </span>
                        ))}
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-ink/40">
                    No accounts yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {tab === "jobs" && (
        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_1fr]">
          <form
            onSubmit={(e) => void saveJob(e)}
            className="space-y-3 rounded-2xl border border-ink/10 p-5"
          >
            <h2 className="text-lg">{editing ? "Update job" : "Post a job"}</h2>
            <input
              placeholder="Title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className={fieldClass}
              required
            />
            <div className="grid gap-3 sm:grid-cols-2">
              <input
                placeholder="Department"
                value={form.department}
                onChange={(e) =>
                  setForm({ ...form, department: e.target.value })
                }
                className={fieldClass}
              />
              <input
                placeholder="Employment type"
                value={form.employmentType}
                onChange={(e) =>
                  setForm({ ...form, employmentType: e.target.value })
                }
                className={fieldClass}
              />
            </div>
            <input
              placeholder="Location"
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
              className={fieldClass}
            />
            <input
              placeholder="Salary range (optional)"
              value={form.salaryRange}
              onChange={(e) =>
                setForm({ ...form, salaryRange: e.target.value })
              }
              className={fieldClass}
            />
            <textarea
              placeholder="About the role"
              rows={5}
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              className={fieldClass}
            />
            <textarea
              placeholder="Responsibilities (one per line)"
              rows={4}
              value={form.responsibilities}
              onChange={(e) =>
                setForm({ ...form, responsibilities: e.target.value })
              }
              className={fieldClass}
            />
            <textarea
              placeholder="Requirements (one per line)"
              rows={4}
              value={form.requirements}
              onChange={(e) =>
                setForm({ ...form, requirements: e.target.value })
              }
              className={fieldClass}
            />
            <textarea
              placeholder="Nice to have (one per line)"
              rows={3}
              value={form.niceToHave}
              onChange={(e) =>
                setForm({ ...form, niceToHave: e.target.value })
              }
              className={fieldClass}
            />
            <textarea
              placeholder="Benefits (one per line)"
              rows={3}
              value={form.benefits}
              onChange={(e) => setForm({ ...form, benefits: e.target.value })}
              className={fieldClass}
            />
            <div className="rounded-xl border border-ink/10 p-3">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm text-ink">Required questions</p>
                  <p className="mt-0.5 text-xs text-ink/45">
                    Optional. Applicants must answer each one to apply.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={addQuestion}
                  disabled={form.questions.length >= 12}
                  className="shrink-0 text-sm text-brand-orange disabled:text-ink/30"
                >
                  Add question
                </button>
              </div>
              {form.questions.length === 0 ? (
                <p className="mt-3 text-xs text-ink/40">
                  No questions yet — apply form will only ask for phone, cover
                  note, and CV.
                </p>
              ) : (
                <ul className="mt-3 space-y-2">
                  {form.questions.map((question, index) => (
                    <li key={question.id} className="flex items-start gap-2">
                      <span className="mt-2 w-5 shrink-0 text-xs text-ink/40">
                        {index + 1}.
                      </span>
                      <input
                        placeholder="e.g. Are you able to work overlapping US hours?"
                        value={question.prompt}
                        onChange={(e) =>
                          updateQuestion(question.id, e.target.value)
                        }
                        className={fieldClass}
                      />
                      <button
                        type="button"
                        onClick={() => removeQuestion(question.id)}
                        className="mt-2 shrink-0 text-xs text-brand-red"
                      >
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={form.active}
                onChange={(e) => setForm({ ...form, active: e.target.checked })}
              />
              Active (visible on careers)
            </label>
            {error && <p className="text-sm text-brand-red">{error}</p>}
            <div className="flex gap-2">
              <button
                type="submit"
                className="rounded-full bg-brand-gradient px-5 py-2 text-sm text-obsidian"
              >
                {editing ? "Save changes" : "Create job"}
              </button>
              {editing && (
                <button
                  type="button"
                  onClick={() => {
                    setEditing(null);
                    setForm(emptyJob());
                  }}
                  className="rounded-full border border-ink/10 px-5 py-2 text-sm"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>

          <ul className="space-y-3">
            {jobs.map((job) => (
              <li
                key={job.id}
                className="rounded-2xl border border-ink/10 p-4 text-sm"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-ink">{job.title}</p>
                    <p className="text-ink/45">
                      {job.department ? `${job.department} · ` : ""}
                      {job.location} · {job.active ? "Active" : "Inactive"} ·{" "}
                      {job._count.applications} applicants
                      {job.questions?.length
                        ? ` · ${job.questions.length} required question${
                            job.questions.length === 1 ? "" : "s"
                          }`
                        : ""}
                    </p>
                    <Link
                      href={`/careers/${job.slug}`}
                      className="mt-1 inline-block text-xs text-brand-orange"
                    >
                      View public JD
                    </Link>
                  </div>
                  <div className="flex shrink-0 flex-wrap justify-end gap-2">
                    <button
                      type="button"
                      className="text-brand-orange"
                      onClick={() => startEdit(job)}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        void fetch(`/api/admin/jobs/${job.id}`, {
                          method: "PATCH",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({ active: !job.active }),
                        }).then(() => load())
                      }
                    >
                      {job.active ? "Unpublish" : "Publish"}
                    </button>
                    <button
                      type="button"
                      className="text-brand-red"
                      onClick={() => {
                        if (!confirm("Delete this job and its applications?"))
                          return;
                        void fetch(`/api/admin/jobs/${job.id}`, {
                          method: "DELETE",
                        }).then(() => load());
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {tab === "apps" && (
        <div className="mt-8">
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <label className="text-sm text-ink/55">
              Role{" "}
              <select
                value={jobFilter}
                onChange={(e) => setJobFilter(e.target.value)}
                className="ml-2 rounded-full border border-ink/10 bg-bg px-3 py-1.5 text-ink"
              >
                <option value="all">All jobs</option>
                {jobs.map((job) => (
                  <option key={job.id} value={job.id}>
                    {job.title}
                  </option>
                ))}
              </select>
            </label>
            <p className="text-sm text-ink/45">
              {filteredApps.length} application
              {filteredApps.length === 1 ? "" : "s"}
            </p>
          </div>
          <div className="overflow-x-auto rounded-2xl border border-ink/10">
            <table className="w-full min-w-[68rem] text-left text-sm">
              <thead className="bg-ink/5 text-ink/50">
                <tr>
                  <th className="px-4 py-3 font-medium">Candidate</th>
                  <th className="px-4 py-3 font-medium">Role</th>
                  <th className="px-4 py-3 font-medium">Phone</th>
                  <th className="px-4 py-3 font-medium">Note</th>
                  <th className="px-4 py-3 font-medium">Questions</th>
                  <th className="px-4 py-3 font-medium">Submitted</th>
                  <th className="px-4 py-3 font-medium">CV</th>
                </tr>
              </thead>
              <tbody>
                {filteredApps.map((a) => (
                  <tr key={a.id} className="border-t border-ink/10 align-top">
                    <td className="px-4 py-3">
                      {a.user.name}
                      <span className="block text-ink/45">{a.user.email}</span>
                    </td>
                    <td className="px-4 py-3">{a.job.title}</td>
                    <td className="px-4 py-3">{a.phone}</td>
                    <td className="max-w-xs px-4 py-3 text-ink/60">
                      {a.coverNote || "—"}
                    </td>
                    <td className="max-w-sm px-4 py-3 text-ink/70">
                      {a.answers?.length ? (
                        <ul className="space-y-2">
                          {a.answers.map((answer) => (
                            <li key={`${a.id}-${answer.questionId}`}>
                              <span className="block text-xs text-ink/45">
                                {answer.prompt}
                              </span>
                              <span className="block">{answer.value}</span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        "—"
                      )}
                    </td>
                    <td className="px-4 py-3 text-ink/50">
                      {formatDate(a.createdAt)}
                    </td>
                    <td className="px-4 py-3">
                      <a
                        href={`/api/admin/applications/${a.id}/cv`}
                        className="text-brand-orange"
                      >
                        Download
                      </a>
                    </td>
                  </tr>
                ))}
                {filteredApps.length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-4 py-8 text-center text-ink/40">
                      No applications in this view.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
