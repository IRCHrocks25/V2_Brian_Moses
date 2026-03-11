import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { logCtaChange } from "@/lib/log-change";
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
    const all = searchParams.get("all") === "1" || searchParams.get("manage") === "1";
    const draftId = searchParams.get("preview");

    const where: { isActive?: boolean; OR?: { page: string }[] } = all
      ? {}
      : { isActive: true, OR: [{ page }, { page: "all" }] };

    let ctas = await prisma.cTA.findMany({
      where,
      orderBy: [{ order: "asc" }, { createdAt: "asc" }],
    });

    if (draftId && !all) {
      const row = await prisma.previewDraft.findUnique({ where: { id: draftId } });
      if (row && row.expiresAt > new Date()) {
        const draft = row.data as { ctas?: Array<{ page: string; isActive?: boolean }> };
        if (draft?.ctas?.length) {
          const draftFiltered = draft.ctas.filter(
            (c) => (c.page === page || c.page === "all") && c.isActive !== false
          );
          if (draftFiltered.length) ctas = draftFiltered as typeof ctas;
        }
      }
    }

    return NextResponse.json(ctas);
  } catch {
    return NextResponse.json({ error: "Failed to fetch CTAs" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await requireAuth();
    const schema = z.object({
      text: z.string().min(1),
      url: z.string().url(),
      style: z.enum(["primary", "secondary", "outline"]).default("primary"),
      placement: z.string().min(1),
      page: z.string().default("all"),
      order: z.number().default(0),
      isActive: z.boolean().default(true),
    });
    const body = schema.parse(await req.json());
    const cta = await prisma.cTA.create({ data: body });
    await logCtaChange(`CTA: ${body.text} (${body.placement})`, session.email);
    return NextResponse.json(cta);
  } catch (e) {
    if (e instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid input", details: e.errors }, { status: 400 });
    }
    if ((e as Error).message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.json({ error: "Failed to create" }, { status: 500 });
  }
}
