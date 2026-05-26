import { revalidatePath, revalidateTag } from "next/cache";

import type { CmsWebhookPayload } from "@/lib/cms/types";
import { verifyCmsWebhookRequest } from "@/lib/cms/verify-webhook";
import { JOURNAL_INDEX_PATH, journalPostPath } from "@/lib/cms/config";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

function revalidateJournal(slug?: string): void {
  revalidateTag("cms-journal", "max");
  revalidatePath(JOURNAL_INDEX_PATH);
  revalidatePath("/sitemap.xml");

  if (slug) {
    revalidatePath(journalPostPath(slug));
  }
}

export async function GET() {
  return Response.json({ error: "Method not allowed" }, { status: 405 });
}

export async function POST(request: Request) {
  const rawBody = await request.text();
  const verification = verifyCmsWebhookRequest(request.headers, rawBody);

  if (!verification.ok) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  let payload: CmsWebhookPayload;
  try {
    payload = JSON.parse(rawBody) as CmsWebhookPayload;
  } catch {
    return Response.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const slug = payload.post?.slug;
  revalidateJournal(slug);

  return Response.json(
    {
      ok: true,
      event: payload.event,
      slug: slug ?? null,
      revalidated: [JOURNAL_INDEX_PATH, slug ? journalPostPath(slug) : null].filter(Boolean),
    },
    { status: 200 },
  );
}
