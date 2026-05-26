import { createHmac, timingSafeEqual } from "node:crypto";

import { getCmsConfig } from "@/lib/cms/config";

const MAX_TIMESTAMP_SKEW_MS = 5 * 60 * 1000;

function safeEqualHex(a: string, b: string): boolean {
  try {
    const left = Buffer.from(a, "hex");
    const right = Buffer.from(b, "hex");
    if (left.length !== right.length) {
      return false;
    }
    return timingSafeEqual(left, right);
  } catch {
    return false;
  }
}

function safeEqualString(a: string, b: string): boolean {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  if (left.length !== right.length) {
    return false;
  }
  return timingSafeEqual(left, right);
}

function isTimestampFresh(timestamp: string | null): boolean {
  if (!timestamp) {
    return true;
  }
  const parsed = Date.parse(timestamp);
  if (Number.isNaN(parsed)) {
    return false;
  }
  return Math.abs(Date.now() - parsed) <= MAX_TIMESTAMP_SKEW_MS;
}

export function verifyCmsWebhookRequest(
  headers: Headers,
  rawBody: string,
): { ok: true } | { ok: false; reason: string } {
  const config = getCmsConfig();
  const secret = config?.webhookSecret;

  if (!secret) {
    return { ok: false, reason: "CMS_WEBHOOK_SECRET is not configured" };
  }

  const legacySecret = headers.get("x-webhook-secret");
  if (legacySecret && safeEqualString(legacySecret, secret)) {
    return { ok: true };
  }

  const signature = headers.get("x-cms-signature");
  if (!signature) {
    return { ok: false, reason: "Missing x-cms-signature" };
  }

  const timestamp = headers.get("x-cms-timestamp");
  if (!isTimestampFresh(timestamp)) {
    return { ok: false, reason: "Stale or invalid x-cms-timestamp" };
  }

  const expected = createHmac("sha256", secret).update(rawBody, "utf8").digest("hex");
  if (!safeEqualHex(signature, expected)) {
    return { ok: false, reason: "Invalid signature" };
  }

  return { ok: true };
}
