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

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const draftId = searchParams.get("preview");

    let testimonials = await prisma.testimonial.findMany({
      orderBy: { order: "asc" },
    });

    if (draftId) {
      const row = await prisma.previewDraft.findUnique({ where: { id: draftId } });
      if (row && row.expiresAt > new Date()) {
        const draft = row.data as { testimonials?: typeof testimonials };
        if (draft?.testimonials?.length) {
          testimonials = draft.testimonials;
        }
      }
    }

    return NextResponse.json(testimonials);
  } catch {
    return NextResponse.json({ error: "Failed to fetch testimonials" }, { status: 500 });
  }
}

const testimonialSchema = z.object({
  header: z.string().min(1),
  body: z.string().min(1),
  author: z.string().min(1),
  title: z.string(),
  image: z.string().min(1),
  order: z.number().default(0),
});

export async function POST(req: Request) {
  try {
    const session = await requireAuth();
    const body = testimonialSchema.parse(await req.json());
    const testimonial = await prisma.testimonial.create({ data: body });
    await logTestimonialChange(`Testimonial: ${body.author} – "${body.header.length > 45 ? body.header.slice(0, 45) + "..." : body.header}"`, session.email);
    return NextResponse.json(testimonial);
  } catch (e) {
    if (e instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid input", details: e.errors }, { status: 400 });
    }
    if ((e as Error).message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    console.error("Testimonial create error:", e);
    const msg = (e as Error).message || "Failed to create";
    return NextResponse.json(
      { error: msg.includes("connect") || msg.includes("table") ? "Database error. Run: npx prisma db push" : msg },
      { status: 500 }
    );
  }
}
