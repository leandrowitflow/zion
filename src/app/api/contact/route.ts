import { sendContactEmail } from "@/lib/contact/send-contact-email";
import { parseContactFormPayload } from "@/lib/contact/validate";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const parsed = parseContactFormPayload(body);
  if (!parsed.ok) {
    return Response.json({ error: parsed.error, field: parsed.field }, { status: 400 });
  }

  try {
    await sendContactEmail(parsed.data);
    return Response.json({ ok: true });
  } catch (error) {
    console.error("[contact] Failed to send email:", error);
    return Response.json(
      { error: "We could not send your message right now. Please email us directly." },
      { status: 503 },
    );
  }
}
