import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/db";

const TTL_MS = 30 * 60 * 1000; // 30 minutes

function generateDraftId() {
  return `preview_${Date.now()}_${Math.random().toString(36).slice(2, 11)}`;
}

export async function POST(req: Request) {
  try {
    await getSession();
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const draftId = generateDraftId();
    const expiresAt = new Date(Date.now() + TTL_MS);
    await prisma.previewDraft.create({
      data: {
        id: draftId,
        data: {
          content: body.content ?? undefined,
          ctas: body.ctas ?? undefined,
          testimonials: body.testimonials ?? undefined,
        },
        expiresAt,
      },
    });
    return NextResponse.json({ draftId });
  } catch (e) {
    console.error("Preview draft create error:", e);
    return NextResponse.json({ error: "Failed to create draft" }, { status: 500 });
  }
}
