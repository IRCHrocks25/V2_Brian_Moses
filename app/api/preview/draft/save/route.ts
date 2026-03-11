import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { DEFAULT_CONTENT } from "@/lib/default-content";
import { CONTENT_KEYS } from "@/lib/content-keys";
import { logContentChange } from "@/lib/log-change";

const keyMeta = new Map<string, { page: string; section: string }>(
  CONTENT_KEYS.map((c) => [c.key, { page: c.page, section: c.section }])
);

export async function POST(req: Request) {
  let session;
  try {
    session = await getSession();
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { draftId } = (await req.json()) as { draftId?: string };
    if (!draftId) {
      return NextResponse.json({ error: "draftId required" }, { status: 400 });
    }

    const row = await prisma.previewDraft.findUnique({ where: { id: draftId } });
    if (!row || row.expiresAt <= new Date()) {
      return NextResponse.json({ error: "Preview expired or not found" }, { status: 404 });
    }
    const draft = row.data as { content?: Record<string, string> };

    const liveItems = await prisma.contentItem.findMany();
    const liveContent: Record<string, string> = { ...DEFAULT_CONTENT };
    for (const item of liveItems) liveContent[item.key] = item.value;

    let savedContent = 0;

    if (draft.content && Object.keys(draft.content).length) {
      for (const [key, value] of Object.entries(draft.content)) {
        const currentValue = liveContent[key] ?? "";
        if (value === currentValue) continue;
        const meta = keyMeta.get(key) || { page: "home", section: "Custom" };
        await prisma.contentItem.upsert({
          where: { key },
          create: { key, value, page: meta.page, section: meta.section ?? null },
          update: { value, page: meta.page, section: meta.section ?? null },
        });
        await logContentChange(key, session.email);
        savedContent++;
      }
    }

    return NextResponse.json({
      ok: true,
      savedContent,
      message: savedContent > 0 ? `Saved ${savedContent} content item(s) to live site.` : "Nothing to save.",
    });
  } catch (e) {
    console.error("Preview save error:", e);
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Failed to save" },
      { status: 500 }
    );
  }
}
