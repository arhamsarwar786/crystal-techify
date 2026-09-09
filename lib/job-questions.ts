export type JobQuestion = {
  id: string;
  prompt: string;
};

export type QuestionAnswer = {
  questionId: string;
  prompt: string;
  value: string;
};

function asRecord(value: unknown): Record<string, unknown> | null {
  return value !== null && typeof value === "object"
    ? (value as Record<string, unknown>)
    : null;
}

export function parseQuestions(raw: unknown): JobQuestion[] {
  let items: unknown[] = [];
  if (Array.isArray(raw)) {
    items = raw;
  } else if (typeof raw === "string" && raw.trim()) {
    try {
      const parsed: unknown = JSON.parse(raw);
      if (Array.isArray(parsed)) items = parsed;
    } catch {
      return [];
    }
  }

  const questions: JobQuestion[] = [];
  items.forEach((item, index) => {
    if (typeof item === "string") {
      const prompt = item.trim();
      if (prompt) questions.push({ id: `q${index + 1}`, prompt });
      return;
    }
    const rec = asRecord(item);
    if (!rec) return;
    const prompt = String(rec.prompt ?? "").trim();
    if (!prompt) return;
    const id = String(rec.id ?? `q${index + 1}`).trim() || `q${index + 1}`;
    questions.push({ id, prompt });
  });
  return questions.slice(0, 12);
}

export function serializeQuestions(raw: unknown): string {
  return JSON.stringify(parseQuestions(raw));
}

export function parseAnswers(raw: unknown): QuestionAnswer[] {
  let items: unknown[] = [];
  if (Array.isArray(raw)) {
    items = raw;
  } else if (typeof raw === "string" && raw.trim()) {
    try {
      const parsed: unknown = JSON.parse(raw);
      if (Array.isArray(parsed)) items = parsed;
    } catch {
      return [];
    }
  }

  const answers: QuestionAnswer[] = [];
  for (const item of items) {
    const rec = asRecord(item);
    if (!rec) continue;
    const value = String(rec.value ?? "").trim();
    const prompt = String(rec.prompt ?? "").trim();
    const questionId = String(rec.questionId ?? "").trim();
    if (!value && !prompt) continue;
    answers.push({ questionId, prompt, value });
  }
  return answers;
}

export function answersFromForm(
  questions: JobQuestion[],
  form: FormData,
): QuestionAnswer[] {
  return questions.map((question) => ({
    questionId: question.id,
    prompt: question.prompt,
    value: String(form.get(`answer:${question.id}`) ?? "").trim(),
  }));
}

export function missingRequiredAnswers(answers: QuestionAnswer[]): boolean {
  return answers.some((answer) => !answer.value);
}
