"use client";

import Image from "next/image";
import { useState } from "react";

export default function KeynoteHeroSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hasStartedVideo, setHasStartedVideo] = useState(false);
  const videoId = "DvRstx04Z-0";
  const videoEmbedUrl = `https://www.youtube.com/embed/${videoId}?si=RECQAlbsuNMM-X7x&controls=0&autoplay=1`;

  return (
    <section className="relative bg-[#0a0a0a] py-8 md:py-12">
      <div className="mx-auto w-full px-6 lg:px-12">
        {/* HERO FRAME */}
        <div className="relative overflow-hidden rounded-2xl md:rounded-3xl border border-white/10 bg-black shadow-[0_40px_140px_rgba(0,0,0,0.85)]">
          {/* BACKGROUND */}
          <div className="absolute inset-0">
            <Image
              src="/hero_section1.png"
              alt="Hero background"
              fill
              priority
              className="object-cover object-center"
            />

            {/* Optional: subtle readability overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/10 to-black/35" />
          </div>

          {/* Subtle frame sheen */}
          <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10" />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

          {/* CONTENT */}
          <div className="relative z-10 px-6 sm:px-8 md:px-12 lg:px-16">
            {/* Grid layout with content on the right */}
            <div className="min-h-[78vh] sm:min-h-[84vh] md:min-h-[92vh] grid grid-cols-1 lg:grid-cols-2 items-center py-14 sm:py-16 md:py-20">
              {/* Left column - empty */}
              <div className="hidden lg:block" />
              
              {/* Right column - content */}
              <div className="w-full text-left -translate-y-24 sm:-translate-y-28 md:-translate-y-36 lg:-translate-y-44">
                {/* Eyebrow */}
                <div className="flex items-center gap-3 text-xs tracking-[0.28em] uppercase text-white/70">
                <span className="tracking-[0.18em] text-white/60">Brian Moses</span>
                <span className="h-[3px] w-[3px] rounded-full bg-white/50" />
                  <span>Keynote Speaker</span>
                  
                  
                </div>

                {/* Copy block */}
                <div className="mt-7 sm:mt-9 space-y-5 sm:space-y-6">
                  {/* Headline */}
                  <p className="text-white/90 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl leading-[1.08] font-normal">
                    &ldquo;You can have, do, be, accomplish, and <span className="italic font-semibold">achieve anything</span> you&nbsp;want in&nbsp;life.&rdquo;
                  </p>


                </div>

                {/* CTA: moved up + attached to copy */}
                <div className="mt-7 sm:mt-8 md:mt-10 flex flex-col sm:flex-row items-start gap-4">
                  <button 
                    onClick={() => setIsModalOpen(true)}
                    className="inline-flex items-center justify-center rounded-xl px-8 py-4 text-base sm:text-lg font-semibold text-white border border-white/25 bg-transparent hover:bg-white/5 transition hover:border-white/35 duration-300"
                  >
                    View Video Clips
                  </button>
                  <a
                    href="https://calendly.com/coachbrianmoses/discuss-booking-brian-for-your-event-clone"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex"
                  >
                    <button className="inline-flex items-center justify-center rounded-xl px-8 py-4 text-base sm:text-lg font-semibold text-black bg-white hover:bg-white/95 transition shadow-[0_18px_50px_rgba(0,0,0,0.35)] hover:shadow-[0_25px_70px_rgba(0,0,0,0.45)] hover:scale-105 duration-300">
                      Book Brian for your Next Event
                    </button>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Optional: add a little bottom breathing room on tiny screens */}
          <div className="h-6 sm:h-0" />
        </div>
      </div>

      {/* Video Modal */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={() => {
            setIsModalOpen(false);
            setHasStartedVideo(false);
          }}
        >
          <div 
            className="relative w-full max-w-5xl mx-4 bg-black rounded-lg overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => {
                setIsModalOpen(false);
                setHasStartedVideo(false);
              }}
              className="absolute top-4 right-4 z-20 w-10 h-10 flex items-center justify-center bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors"
              aria-label="Close modal"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Video Container */}
            <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
              {/* Thumbnail - shown before user clicks play */}
              {!hasStartedVideo && (
                <button
                  onClick={() => setHasStartedVideo(true)}
                  className="absolute inset-0 z-10 w-full h-full cursor-pointer group focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-black"
                  aria-label="Play video"
                >
                  <Image
                    src="/hero_section1.png"
                    alt="Brian Moses Video Clips - Click to play"
                    fill
                    className="object-cover"
                  />
                  {/* Play button overlay */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-colors">
                    <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-white/90 flex items-center justify-center group-hover:scale-110 group-hover:bg-white transition-transform shadow-lg">
                      <svg
                        className="w-8 h-8 md:w-10 md:h-10 text-black ml-1"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                </button>
              )}

              {/* Video iframe - loaded when user clicks play */}
              {hasStartedVideo && (
                <iframe
                  src={videoEmbedUrl}
                  className="absolute top-0 left-0 w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                  title="Brian Moses Video Clips"
                />
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
