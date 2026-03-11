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

const updateSchema = z.object({
  text: z.string().min(1).optional(),
  url: z.string().url().optional(),
  style: z.enum(["primary", "secondary", "outline"]).optional(),
  placement: z.string().min(1).optional(),
  page: z.string().optional(),
  order: z.number().optional(),
  isActive: z.boolean().optional(),
});

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await requireAuth();
    const { id } = await params;
    const body = updateSchema.parse(await req.json());
    const cta = await prisma.cTA.update({ where: { id }, data: body });
    await logCtaChange(`CTA: ${cta.text} (${cta.placement})`, session.email);
    return NextResponse.json(cta);
  } catch (e) {
    if (e instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid input", details: e.errors }, { status: 400 });
    }
    if ((e as Error).message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await requireAuth();
    const { id } = await params;
    const cta = await prisma.cTA.findUnique({ where: { id } });
    await prisma.cTA.delete({ where: { id } });
    if (cta) await logCtaChange(`CTA removed: ${cta.text}`, session.email);
    return NextResponse.json({ ok: true });
  } catch (e) {
    if ((e as Error).message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}
