"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { DEFAULT_TESTIMONIALS } from "@/lib/default-testimonials";

type TestimonialItem = { id?: string; header: string; body: string; author: string; title: string; image: string };

function TestimonialsMarquee({ testimonials }: { testimonials: TestimonialItem[] }) {
  const [isPaused, setIsPaused] = useState(false);
  if (!testimonials?.length) return null;

  return (
    <div 
      className={`marquee-testimonials flex items-stretch gap-6 ${isPaused ? 'paused' : ''}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {[...Array(2)].flatMap((_, loop) =>
        testimonials.map((testimonial, i) => (
          <div
            key={`${loop}-${testimonial.id ?? i}`}
            className="flex-shrink-0 w-[700px] sm:w-[750px] md:w-[850px] lg:w-[900px]"
          >
            <div className="group bg-white rounded-3xl overflow-hidden transition-all duration-300 flex h-[300px] sm:h-[350px] md:h-[400px]">
              {/* Left Section - Portrait (Square) */}
              <div className="relative w-[280px] h-[280px] sm:w-[320px] sm:h-[320px] md:w-[360px] md:h-[360px] flex-shrink-0 overflow-hidden">
                <Image
                  src={testimonial.image}
                  alt={testimonial.author}
                  fill
                  sizes="(max-width: 640px) 280px, (max-width: 768px) 320px, 360px"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Right Section - Quote */}
              <div className="flex-1 bg-white p-6 md:p-8 flex flex-col justify-center min-w-0 space-y-5">
                <div className="flex items-start gap-3">
                  <div className="mt-1.5 flex-shrink-0">
                    <svg className="w-6 h-6 md:w-8 md:h-8 text-[#1568F7]/30" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.996 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.984zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                    </svg>
                  </div>
                  <p className="text-black font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl leading-tight">
                    {testimonial.header}
                  </p>
                </div>
                <p className="text-gray-700 font-normal text-base sm:text-lg md:text-xl leading-relaxed pl-9 md:pl-11">
                  {testimonial.body}
                </p>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default function TestimonialsSection() {
  const searchParams = useSearchParams();
  const preview = searchParams.get("preview");
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>([]);

  useEffect(() => {
    const url = "/api/testimonials" + (preview ? `?preview=${preview}` : "");
    fetch(url)
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setTestimonials(data);
        } else {
          setTestimonials(
            DEFAULT_TESTIMONIALS.map((t, i) => ({ ...t, id: `default-${i}` }))
          );
        }
      })
      .catch(() => {
        setTestimonials(
          DEFAULT_TESTIMONIALS.map((t, i) => ({ ...t, id: `default-${i}` }))
        );
      });
  }, [preview]);

  return (
    <section className="relative bg-white py-16 md:py-24 overflow-hidden">
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 lg:px-12 mb-12">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16"></div>
      </div>

      {/* Testimonials Marquee (Edge to Edge, scrollable) */}
      <div className="w-full -mx-6 lg:-mx-8 overflow-x-auto overflow-y-visible scrollbar-modern">
        <TestimonialsMarquee testimonials={testimonials} />
      </div>
    </section>
  );
}

