import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { DEFAULT_CONTENT } from "@/lib/default-content";
import { logContentChange } from "@/lib/log-change";
import { z } from "zod";

async function requireAuth() {
  const session = await getSession();
  if (!session) throw new Error("Unauthorized");
  return session;
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const page = searchParams.get("page") || "all";
    const draftId = searchParams.get("preview");
    const items = await prisma.contentItem.findMany({
      where: page === "all" ? {} : { OR: [{ page }, { page: "all" }] },
      orderBy: { key: "asc" },
    });
    const map = { ...DEFAULT_CONTENT };
    for (const item of items) map[item.key] = item.value;
    if (draftId) {
      const row = await prisma.previewDraft.findUnique({ where: { id: draftId } });
      if (row && row.expiresAt > new Date()) {
        const draft = row.data as { content?: Record<string, string> };
        if (draft?.content) Object.assign(map, draft.content);
      }
    }
    return NextResponse.json(map);
  } catch {
    return NextResponse.json({ error: "Failed to fetch content" }, { status: 500 });
  }
}

const upsertSchema = z.object({
  key: z.string().min(1),
  value: z.string(),
  page: z.string().default("home"),
  section: z.string().optional(),
});

export async function PUT(req: Request) {
  try {
    const session = await requireAuth();
    const body = await req.json();
    const data = upsertSchema.parse(body);
    const item = await prisma.contentItem.upsert({
      where: { key: data.key },
      create: data,
      update: { value: data.value, page: data.page, section: data.section ?? null },
    });
    await logContentChange(data.key, session.email);
    return NextResponse.json(item);
  } catch (e) {
    if (e instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid input", details: e.errors }, { status: 400 });
    }
    if ((e as Error).message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.json({ error: "Failed to save" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const session = await requireAuth();
    const { searchParams } = new URL(req.url);
    const key = searchParams.get("key");
    if (!key) {
      return NextResponse.json({ error: "Key required" }, { status: 400 });
    }
    await prisma.contentItem.deleteMany({ where: { key } });
    await logContentChange(key, session.email);
    return NextResponse.json({ ok: true });
  } catch (e) {
    if ((e as Error).message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await requireAuth();
    const body = await req.json();
    if (Array.isArray(body)) {
      for (const b of body) {
        const data = upsertSchema.parse(b);
        await prisma.contentItem.upsert({
          where: { key: data.key },
          create: data,
          update: { value: data.value, page: data.page, section: data.section ?? null },
        });
        await logContentChange(data.key, session.email);
      }
      return NextResponse.json({ ok: true });
    }
    const data = upsertSchema.parse(body);
    const item = await prisma.contentItem.upsert({
      where: { key: data.key },
      create: data,
      update: { value: data.value, page: data.page, section: data.section ?? null },
    });
    await logContentChange(data.key, session.email);
    return NextResponse.json(item);
  } catch (e) {
    if (e instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid input", details: e.errors }, { status: 400 });
    }
    if ((e as Error).message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.json({ error: "Failed to save" }, { status: 500 });
  }
}
