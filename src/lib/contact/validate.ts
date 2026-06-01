import type { ContactFormPayload, ContactFormResult } from "@/lib/contact/types";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function clean(value: unknown, maxLength: number): string {
  if (typeof value !== "string") {
    return "";
  }

  return value.trim().slice(0, maxLength);
}

export function parseContactFormPayload(body: unknown): ContactFormResult {
  if (!body || typeof body !== "object") {
    return { ok: false, error: "Invalid request." };
  }

  const raw = body as Record<string, unknown>;
  const name = clean(raw.name, 120);
  const email = clean(raw.email, 254);
  const phone = clean(raw.phone, 40);
  const company = clean(raw.company, 120);
  const message = clean(raw.message, 5000);

  if (name.length < 2) {
    return { ok: false, error: "Please enter your name.", field: "name" };
  }

  if (!EMAIL_RE.test(email)) {
    return { ok: false, error: "Please enter a valid email address.", field: "email" };
  }

  if (message.length < 10) {
    return { ok: false, error: "Please tell us a bit more in your message.", field: "message" };
  }

  return {
    ok: true,
    data: {
      name,
      email,
      phone: phone || undefined,
      company: company || undefined,
      message,
    },
  };
}
