import { Resend } from "resend";

import type { ContactFormPayload } from "@/lib/contact/types";
import { SITE_EMAIL, SITE_NAME, SITE_URL } from "@/lib/seo/site";

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildEmailHtml(payload: ContactFormPayload): string {
  const rows = [
    ["Name", payload.name],
    ["Email", payload.email],
    ["Phone", payload.phone ?? "—"],
    ["Company", payload.company ?? "—"],
  ];

  const tableRows = rows
    .map(
      ([label, value]) =>
        `<tr><td style="padding:8px 12px 8px 0;color:#696866;vertical-align:top;">${label}</td><td style="padding:8px 0;color:#2a2826;">${escapeHtml(value)}</td></tr>`,
    )
    .join("");

  return `
    <div style="font-family:Georgia,serif;color:#2a2826;max-width:560px;">
      <p style="margin:0 0 16px;font-size:18px;">New message from ${escapeHtml(SITE_NAME)} Ignite Us</p>
      <table style="border-collapse:collapse;margin:0 0 20px;">${tableRows}</table>
      <p style="margin:0 0 8px;color:#696866;font-size:14px;">Message</p>
      <p style="margin:0;white-space:pre-wrap;line-height:1.6;">${escapeHtml(payload.message)}</p>
      <p style="margin:24px 0 0;font-size:12px;color:#696866;">Sent via <a href="${SITE_URL}/ignite-us">${SITE_URL}/ignite-us</a></p>
    </div>
  `.trim();
}

export async function sendContactEmail(payload: ContactFormPayload): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) {
    throw new Error("RESEND_API_KEY is not configured");
  }

  const to = process.env.CONTACT_TO?.trim() || SITE_EMAIL;
  const from =
    process.env.CONTACT_FROM?.trim() || `${SITE_NAME} Website <onboarding@resend.dev>`;

  const resend = new Resend(apiKey);
  const subject = `Ignite Us — ${payload.name}${payload.company ? ` (${payload.company})` : ""}`;

  const { error } = await resend.emails.send({
    from,
    to: [to],
    replyTo: payload.email,
    subject,
    html: buildEmailHtml(payload),
    text: [
      `New Ignite Us message`,
      "",
      `Name: ${payload.name}`,
      `Email: ${payload.email}`,
      `Phone: ${payload.phone ?? "—"}`,
      `Company: ${payload.company ?? "—"}`,
      "",
      payload.message,
    ].join("\n"),
  });

  if (error) {
    throw new Error(error.message);
  }
}
