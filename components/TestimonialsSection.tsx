"use client";

import Image from "next/image";
import { useState } from "react";

const testimonials = [
  {
    header: "Brian, Great call with our team yesterday! You were right everyone was engaged.",
    body: "I've been a student of Brian's for over 10 years and he's helped me grow my business and my team exponentially. I'm forever grateful for his guidance.",
    author: "Jared & Victoria Erfle",
    title: "Palmdale CA",
    image: "/images/testimonials/Jared_Victoria_Erfle.png",
  },
  {
    header: "We generated 100 leads in 24 hours and 8 appointments booked!",
    body: "This is amazing! All of our team is so excited. We can't wait to see what else we can do with your help!",
    author: "Andy Richardson",
    title: "Wilmington, DE",
    image: "/images/testimonials/Andy_Richardson.png",
  },
  {
    header: "Thank you from the bottom of my heart!",
    body: "I've been a student of Brian's for over 10 years and he's helped me grow my business and my team exponentially. I'm forever grateful for his guidance.",
    author: "Jeremy Mellick",
    title: "Seattle, WA",
    image: "/images/testimonials/Jeremy_Mellick.png",
  },
  {
    header: "Brian Moses is The Master and Original!",
    body: "One of the people that inspired me to get into the business of coaching and I'm forever grateful for his mentorship.",
    author: "Jay Kinder",
    title: "Laughton, OK",
    image: "/images/testimonials/Jay_Kinder.png",
  },
  {
    header: "Brian has been an invaluable source of experience and wisdom in our industry!",
    body: "He's helped me to navigate challenging markets and has always been a guiding light. I'm so grateful for his insights and advice.",
    author: "Amy Stoehr",
    title: "CEO Star Power",
    image: "/images/testimonials/Ame_Stoehr.png",
  },
  {
    header: "I met Brian in the early 90's and have been impressed with his accomplishments ever since!",
    body: "He is a true inspiration to the real estate industry and has always been a mentor to me. I'm grateful for his friendship and guidance.",
    author: "Lillian Montalto",
    title: "Featured on Lottery Dream Home",
    image: "/images/testimonials/Lillian_Montalto.png",
  },
  {
    header: "Brian Moses was a huge inspiration to me when I started in real estate.",
    body: "I was one of the first to join his coaching program and it helped me grow my business, doubling my production in my first year and then tripling it the second. I'm forever grateful for his guidance.",
    author: "Anthony Lamacchia",
    title: "Offices in MA, NH, CT, ME, RI & FL - Over 2 Billion in Annual Sales Volume",
    image: "/images/testimonials/Anthony_Lamachhia.png",
  },
  {
    header: "One of the best real estate coaches in the entire Industry!",
    body: "Brian has worked with our company for a long time, I've personally worked with Brian 1 on 1, I've seen him speak multiple times over the last 15 years, he's worked with our team, worked with a lot of our clients, he's terrific.",
    author: "Shant Banosian",
    title: "President RATE Mortgage",
    image: "/images/testimonials/Shant_Banosian.png",
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
  return (
    <section className="relative bg-white py-16 md:py-24 overflow-hidden">
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 lg:px-12 mb-12">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          
          
          
        </div>
      </div>

      {/* Testimonials Marquee (Edge to Edge, scrollable) */}
      <div className="w-full -mx-6 lg:-mx-8 overflow-x-auto overflow-y-visible scrollbar-modern">
        <TestimonialsMarquee />
      </div>
    </section>
  );
}

