export type FieldErrors = Partial<
  Record<"name" | "email" | "emailConfirm" | "password" | "passwordConfirm", string>
>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
const NAME_RE = /^[A-Za-z][A-Za-z\s.'-]{1,79}$/;

export function normalizeEmail(value: string) {
  return value.trim().toLowerCase();
}

export function validateName(name: string): string | null {
  const trimmed = name.trim();
  if (trimmed.length < 2) return "nameShort";
  if (trimmed.length > 80) return "nameLong";
  if (!NAME_RE.test(trimmed)) {
    return "nameChars";
  }
  return null;
}

export function validateEmail(email: string): string | null {
  const normalized = normalizeEmail(email);
  if (!normalized) return "emailRequired";
  if (!EMAIL_RE.test(normalized)) return "emailInvalid";
  return null;
}

export function validatePassword(password: string, { login = false } = {}): string | null {
  if (!password) return "passwordRequired";
  if (login) return null;
  if (password.length < 8) return "passwordShort";
  if (password.length > 72) return "passwordLong";
  if (!/[A-Za-z]/.test(password)) return "passwordLetter";
  if (!/\d/.test(password)) return "passwordNumber";
  return null;
}

export function validateSignup(input: {
  name?: string;
  email?: string;
  emailConfirm?: string;
  password?: string;
  passwordConfirm?: string;
}): { ok: true; name: string; email: string; password: string } | { ok: false; error: string; fields: FieldErrors } {
  const name = (input.name ?? "").trim();
  const email = normalizeEmail(input.email ?? "");
  const emailConfirm = normalizeEmail(input.emailConfirm ?? "");
  const password = input.password ?? "";
  const passwordConfirm = input.passwordConfirm ?? "";

  const fields: FieldErrors = {};
  const nameError = validateName(name);
  const emailError = validateEmail(email);
  const passwordError = validatePassword(password);

  if (nameError) fields.name = nameError;
  if (emailError) fields.email = emailError;
  if (!emailError && emailConfirm !== email) {
    fields.emailConfirm = "emailMismatch";
  }
  if (passwordError) fields.password = passwordError;
  if (!passwordError && passwordConfirm !== password) {
    fields.passwordConfirm = "passwordMismatch";
  }

  const first = Object.values(fields)[0];
  if (first) return { ok: false, error: first, fields };
  return { ok: true, name, email, password };
}

export function validateLogin(input: { email?: string; password?: string }): {
  ok: true;
  email: string;
  password: string;
} | { ok: false; error: string; fields: FieldErrors } {
  const email = normalizeEmail(input.email ?? "");
  const password = input.password ?? "";
  const fields: FieldErrors = {};
  const emailError = validateEmail(email);
  const passwordError = validatePassword(password, { login: true });
  if (emailError) fields.email = emailError;
  if (passwordError) fields.password = passwordError;
  const first = Object.values(fields)[0];
  if (first) return { ok: false, error: first, fields };
  return { ok: true, email, password };
}
