"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

type CTA = { id: string; text: string; url: string; style: string; placement: string };

const styleClasses: Record<string, string> = {
  primary: "rounded-full bg-red-600 text-white px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base md:text-lg lg:text-xl font-medium hover:bg-red-700",
  secondary: "rounded-full bg-[#1568F7] text-white px-6 sm:px-8 py-3 sm:py-4 font-medium hover:bg-[#1256d4]",
  outline: "px-4 md:px-5 py-2 md:py-2.5 text-sm md:text-base font-semibold border border-white/30 text-white rounded-lg hover:bg-white/10 hover:border-white/60",
};

export default function DynamicCTA({
  placement,
  page = "home",
  fallback,
  fallbackStyle = "primary",
}: {
  placement: string;
  page?: string;
  fallback?: { text: string; url: string };
  fallbackStyle?: "primary" | "secondary" | "outline";
}) {
  const searchParams = useSearchParams();
  const preview = searchParams.get("preview");
  const [ctas, setCtas] = useState<CTA[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const url = `/api/ctas?page=${page}` + (preview ? `&preview=${preview}` : "");
    fetch(url)
      .then((r) => r.json())
      .then((data) => {
        setCtas(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [page, preview]);

  const matching = ctas.filter((c) => c.placement === placement);
  const fallbackClass = styleClasses[fallbackStyle] || styleClasses.primary;
  if (loading && fallback) {
    return (
      <a
        href={fallback.url}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-block ${fallbackClass}`}
      >
        {fallback.text}
      </a>
    );
  }
  if (matching.length === 0 && fallback) {
    return (
      <a
        href={fallback.url}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-block ${fallbackClass}`}
      >
        {fallback.text}
      </a>
    );
  }
  return (
    <>
      {matching.map((cta) => (
        <a
          key={cta.id}
          href={cta.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-block ${styleClasses[cta.style] || styleClasses.primary}`}
        >
          {cta.text}
        </a>
      ))}
    </>
  );
}
