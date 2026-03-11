import { prisma } from "./db";
import { CONTENT_KEYS } from "./content-keys";

const keyToLabel = new Map<string, string>(CONTENT_KEYS.map((c) => [c.key, c.label]));

export async function logContentChange(key: string, changedBy: string) {
  const label = keyToLabel.get(key) || key;
  await prisma.changeHistory.create({
    data: { action: "content", targetLabel: label, changedBy },
  });
}

export async function logCtaChange(label: string, changedBy: string) {
  await prisma.changeHistory.create({
    data: { action: "cta", targetLabel: label, changedBy },
  });
}

export async function logTestimonialChange(label: string, changedBy: string) {
  await prisma.changeHistory.create({
    data: { action: "testimonial", targetLabel: label, changedBy },
  });
}
