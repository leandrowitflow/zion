export type ContactFormPayload = {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
};

export type ContactFormResult =
  | { ok: true; data: ContactFormPayload }
  | { ok: false; error: string; field?: keyof ContactFormPayload };
