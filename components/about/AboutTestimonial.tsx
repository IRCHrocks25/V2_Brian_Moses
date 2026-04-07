"use client";

import React, { useState } from "react";

interface AboutTestimonialProps {
  tagline?: string;
  heading?: string;
  bioName?: string;
  bioText?: string;
  cloudinaryPublicId?: string;
  cloudinaryCloudName?: string;
}

export default function AboutTestimonial({
  tagline = "Industry Impact",
  heading = "From Zero to 500+ Sales Per Year",
  bioName = "Nick McLean",
  bioText = "Nick McLean is a real estate entrepreneur and industry innovator. \n\nOver the past decade, Nick has sold more than 5,000 homes and built and operated an independent “teamerage” brokerage for over 10 years, achieving a dominant 20% market share in his local market. \n\nNick is also the author of Million Dollar Agent.",
  cloudinaryPublicId = "NickEdited_SpedUpFinal_zym2rx",
  cloudinaryCloudName = "dcuswyfur",
}: AboutTestimonialProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  // Cloudinary URLs
  // Using the Cloudinary Player Embed URL for Adaptive Bitrate Streaming
  const embedUrl = `https://player.cloudinary.com/embed/?cloud_name=${cloudinaryCloudName}&public_id=${cloudinaryPublicId}&profile=cld-adaptive-stream&autoplay=true`;
  
  // Thumbnail for the "poster" before play
  const thumbnailUrl = `https://res.cloudinary.com/${cloudinaryCloudName}/video/upload/q_auto,f_auto/${cloudinaryPublicId}.jpg`;

  return (
    <section className="w-full py-24 md:py-32 px-6 lg:px-8 relative overflow-hidden border-b border-white/5">
      {/* Background Accents */}
      <div className="absolute top-0 left-0 w-full h-full bg-[#010711] z-0"></div>
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#1568F7] rounded-full blur-[150px] opacity-10 z-0"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#1568F7] rounded-full blur-[150px] opacity-10 z-0"></div>

      <div className="max-w-[1440px] mx-auto relative z-10">
        <div className="flex flex-col gap-12 lg:gap-20">
          
          {/* Header Area */}
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-4">
            <div className="flex items-center gap-[10px] mb-6">
              <div className="relative w-4 h-2.5">
                <div className="absolute left-0 top-0.5 w-2 md:w-2.5 h-2 md:h-2.5 rounded-full bg-[#AADBFF]"></div>
                <div className="absolute left-[6px] top-0.5 w-2 md:w-2.5 h-2 md:h-2.5 rounded-full bg-[#1568F7]"></div>
              </div>
              <span className="text-[#1568F7] text-base md:text-2xl font-medium leading-[25px] tracking-widest uppercase">
                {tagline}
              </span>
            </div>
            <h2 className="text-5xl md:text-7xl font-medium text-white leading-[1.05] tracking-tighter mb-8">
              {heading}
            </h2>
          </div>

          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
            {/* Left: Video Side with enhanced framing */}
            <div className="w-full lg:w-[60%] order-2 lg:order-1">
              <div className="relative aspect-video rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(21,104,247,0.2)] border border-white/10 bg-slate-900 group">
                
                {/* Custom Overlay Thumbnail - Shown before user clicks play */}
                {!isPlaying ? (
                  <div 
                    className="absolute inset-0 flex items-center justify-center cursor-pointer z-20"
                    onClick={() => setIsPlaying(true)}
                  >
                    {/* Cloudinary-generated Dynamic Thumbnail */}
                    <img 
                      src={thumbnailUrl} 
                      alt="Video Thumbnail" 
                      className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity duration-500"
                    />

                    {/* Bottom Gradient for Text Readability */}
                    <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#010711] via-[#010711]/60 to-transparent opacity-90 z-25"></div>

                    {/* Pulsing Play Button */}
                    <div className="relative z-30 w-24 h-24 flex items-center justify-center rounded-full bg-[#1568F7] text-white shadow-[0_0_30px_rgba(21,104,247,0.5)] transform transition-all duration-500 group-hover:scale-110 group-hover:bg-[#3b82f6]">
                      <div className="absolute inset-0 rounded-full bg-[#1568F7] animate-ping opacity-20"></div>
                      <svg 
                        width="30" 
                        height="34" 
                        viewBox="0 0 24 28" 
                        fill="none" 
                        xmlns="http://www.w3.org/2000/svg"
                        className="ml-1.5"
                      >
                        <path d="M22.5 11.4019C24.5 12.5566 24.5 15.4434 22.5 16.5981L4.5 26.9904C2.5 28.1451 -4.76837e-07 26.7017 -4.2638e-07 24.3923L4.81432e-07 3.60769C5.31888e-07 1.29829 2.5 -0.145095 4.5 1.00962L22.5 11.4019Z" fill="currentColor"/>
                      </svg>
                    </div>
                    
                    {/* Video Overlay Text */}
                    <div className="absolute bottom-10 left-10 z-30">
                      <p className="text-white/50 text-sm font-bold tracking-[0.2em] uppercase mb-2">Exclusive Insight</p>
                      <p className="text-white text-2xl md:text-3xl font-medium tracking-tight">The Brian Moses Impact</p>
                    </div>
                  </div>
                ) : (
                  /* Cloudinary Adaptive Stream Player Iframe */
                  <iframe
                    src={embedUrl}
                    className="absolute inset-0 w-full h-full z-10"
                    allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
                    allowFullScreen
                    frameBorder="0"
                  ></iframe>
                )}
              </div>
            </div>

            {/* Right: Bio Text with enhanced typography */}
            <div className="w-full lg:w-[40%] order-1 lg:order-2 flex flex-col">
              <div className="inline-flex flex-col mb-8">
                <h3 className="text-3xl md:text-4xl font-semibold text-[#1568F7] mb-1">
                  {bioName}
                </h3>
                <div className="h-1 w-20 bg-gradient-to-r from-[#1568F7] to-transparent rounded-full"></div>
              </div>

              <div className="space-y-6">
                {bioText.split('\n\n').map((para, index) => (
                  <p key={index} className="text-xl md:text-2xl leading-relaxed text-[#CFCFCF] font-light">
                    {para}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
