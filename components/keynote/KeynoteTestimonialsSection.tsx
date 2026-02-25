"use client";

import Image from "next/image";
import { useState } from "react";

const testimonials = [
  {
    header: "Everyone experiences adversities in Life...",
    body: "I loved this performance as it demonstrates that perhaps your adversities only feel like adversities but are part of your life's plan and how this family embraced theirs is beyond inspiring, never quitting, never giving up and never saying can't!",
    author: "Ray Davis",
    title: "",
    image: "/new_testimonials/Ray.png",
  },
  {
    header: "What an amazing show!",
    body: "A great story that blew me away to see how every crazy adventure stitched together formed this mosaic! There is a common theme through every experience you have brought to life! Seeing how your children applied it to achieve their own dreams, elevating your vision to an even higher level was invaluable to witness! They will reach far beyond their wildest dreams because they know they can and that's what you instill in all of us who come in contact with you!",
    author: "Rob Parsons",
    title: "Nashua, NH",
    image: "/new_testimonials/Rob.png",
  },
  {
    header: "I have seen a lot of presentations in my lifetime... This one grabbed me right from the start and captivated me the whole time!",
    body: "So many powerful lessons distilled from life that have inspired me to live a better life right now.",
    author: "Brian Proctor",
    title: "Best Selling Author of \"My Father Knew the Secret\"",
    image: "/new_testimonials/Brian.png",
  },
  {
    header: "I've attended seminars by Tony Robbins and Zig Ziglar. Brian Moses is up there with the best of them.",
    body: "His message is unforgettable, inspiring, and transformational.",
    author: "Matt Hennessy",
    title: "Branch Manager, Bradshaw Mortgage",
    image: "/new_testimonials/Matt.jpg",
  },
  {
    header: "One of the best, most energetic speakers I've had the privilege to listen to.",
    body: "",
    author: "Bill Monahan",
    title: "Real Estate Sales, Berkshire Hathaway Home Services",
    image: "/new_testimonials/Bill.jpg",
  },
];

function TestimonialsMarquee() {
  const [isPaused, setIsPaused] = useState(false);

  return (
    <div 
      className={`marquee-testimonials flex items-stretch gap-6 ${isPaused ? 'paused' : ''}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {[...Array(2)].flatMap((_, loop) =>
        testimonials.map((testimonial, i) => (
          <div
            key={`${loop}-${i}`}
            className="flex-shrink-0 w-[700px] sm:w-[750px] md:w-[850px] lg:w-[900px]"
          >
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg flex h-[300px] sm:h-[350px] md:h-[400px]">
              {/* Left Section - Portrait (Square) */}
              <div className="relative w-[300px] h-[300px] sm:w-[350px] sm:h-[350px] md:w-[400px] md:h-[400px] flex-shrink-0">
                <Image
                  src={testimonial.image}
                  alt={testimonial.author}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Right Section - Quote */}
              <div className="flex-1 bg-white p-6 md:p-8 flex flex-col justify-center min-w-0 space-y-4">
                <p className={`text-black font-bold leading-tight ${
                  testimonial.author === "Ray Davis" || testimonial.author === "Rob Parsons"
                    ? "text-base sm:text-lg md:text-xl lg:text-2xl"
                    : "text-lg sm:text-xl md:text-2xl lg:text-3xl"
                }`}>
                  &quot;{testimonial.header}&quot;
                </p>
                <p className={`text-black font-normal leading-relaxed ${
                  testimonial.author === "Ray Davis" || testimonial.author === "Rob Parsons"
                    ? "text-sm sm:text-base md:text-lg"
                    : "text-base sm:text-lg md:text-xl"
                }`}>
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

export default function KeynoteTestimonialsSection() {
  return (
    <section className="relative bg-white py-16 md:py-24 overflow-hidden">
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 lg:px-12 mb-12">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          
          <p className="text-black font-normal text-xl md:text-2xl lg:text-3xl xl:text-4xl">
            What Others Are Saying About Brian&apos;s Performance
          </p>
        </div>
      </div>

      {/* Testimonials Marquee (Edge to Edge) */}
      <div className="overflow-hidden w-full -mx-6 lg:-mx-8">
        <TestimonialsMarquee />
      </div>
    </section>
  );
}

