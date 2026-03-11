import { prisma } from "./db";
import { DEFAULT_CONTENT } from "./default-content";

export async function getContent(page: string = "home", draftId?: string | null): Promise<Record<string, string>> {
  const defaults = { ...DEFAULT_CONTENT };
  try {
    const items = await prisma.contentItem.findMany({
      where: { OR: [{ page }, { page: "all" }] },
    });
    const map = { ...defaults };
    for (const item of items) map[item.key] = item.value;
    if (draftId) {
      const row = await prisma.previewDraft.findUnique({
        where: { id: draftId },
      });
      if (row && row.expiresAt > new Date()) {
        const data = row.data as { content?: Record<string, string> };
        if (data?.content) Object.assign(map, data.content);
      }
    }
    return map;
  } catch {
    return defaults;
  }
}

export async function getCTAs(page: string = "home"): Promise<
  { id: string; text: string; url: string; style: string; placement: string }[]
> {
  try {
    const ctas = await prisma.cTA.findMany({
      where: { isActive: true, OR: [{ page }, { page: "all" }] },
      orderBy: [{ order: "asc" }, { createdAt: "asc" }],
    });
    return ctas.map((c) => ({
      id: c.id,
      text: c.text,
      url: c.url,
      style: c.style,
      placement: c.placement,
    }));
  } catch {
    return [];
  }
}
