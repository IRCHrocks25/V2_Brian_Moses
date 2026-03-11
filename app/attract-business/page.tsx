import { getContent } from "@/lib/get-content";
import AttractBusinessPageClient from "@/components/attract-business/AttractBusinessPageClient";

export default async function AttractBusinessPage({
  searchParams,
}: {
  searchParams: Promise<{ preview?: string }>;
}) {
  const params = await searchParams;
  const content = await getContent("attract-business", params?.preview);
  const heroImageSrc = content["img.attract.hero"] || "/Brian_Moses.png";

  return <AttractBusinessPageClient heroImageSrc={heroImageSrc} />;
}
