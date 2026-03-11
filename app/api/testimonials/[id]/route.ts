import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { logTestimonialChange } from "@/lib/log-change";
import { z } from "zod";

async function requireAuth() {
  const session = await getSession();
  if (!session) throw new Error("Unauthorized");
  return session;
}

const updateSchema = z.object({
  header: z.string().min(1).optional(),
  body: z.string().min(1).optional(),
  author: z.string().min(1).optional(),
  title: z.string().optional(),
  image: z.string().min(1).optional(),
  order: z.number().optional(),
});

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await requireAuth();
    const { id } = await params;
    const body = updateSchema.parse(await req.json());
    const testimonial = await prisma.testimonial.update({ where: { id }, data: body });
    await logTestimonialChange(`Testimonial: ${testimonial.author}`, session.email);
    return NextResponse.json(testimonial);
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

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await requireAuth();
    const { id } = await params;
    const t = await prisma.testimonial.findUnique({ where: { id } });
    await prisma.testimonial.delete({ where: { id } });
    if (t) await logTestimonialChange(`Testimonial removed: ${t.author}`, session.email);
    return NextResponse.json({ ok: true });
  } catch (e) {
    if ((e as Error).message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}
