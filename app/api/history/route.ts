import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function GET(req: Request) {
  try {
    await getSession();
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const limit = Math.min(parseInt(searchParams.get("limit") || "50", 10), 100);
    const history = await prisma.changeHistory.findMany({
      orderBy: { changedAt: "desc" },
      take: limit,
    });
    return NextResponse.json(history);
  } catch (e) {
    console.error("History fetch error:", e);
    return NextResponse.json({ error: "Failed to fetch history" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    await getSession();
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json().catch(() => ({}));
    if (body.deleteAll === true) {
      const result = await prisma.changeHistory.deleteMany({});
      return NextResponse.json({ ok: true, deleted: result.count });
    }
    const ids = Array.isArray(body.ids) ? body.ids.filter((id: unknown) => typeof id === "string") : [];
    if (ids.length === 0) {
      return NextResponse.json({ error: "No valid IDs provided" }, { status: 400 });
    }
    const result = await prisma.changeHistory.deleteMany({
      where: { id: { in: ids } },
    });
    return NextResponse.json({ ok: true, deleted: result.count });
  } catch (e) {
    console.error("History delete error:", e);
    return NextResponse.json({ error: "Failed to delete history" }, { status: 500 });
  }
}
