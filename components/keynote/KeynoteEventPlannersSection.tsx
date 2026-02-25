import Image from "next/image";

export default function KeynoteEventPlannersSection() {
  return (
    <section className="relative bg-[#0a0a0a] py-16 md:py-24 overflow-hidden">
      <div className="mx-auto w-full max-w-7xl px-6 lg:px-12">
        {/* Background Image Section with Enhanced Styling */}
        <div className="relative min-h-[75vh] md:min-h-[85vh] rounded-2xl md:rounded-3xl overflow-hidden border border-white/10 shadow-[0_40px_140px_rgba(0,0,0,0.85)]">
          <Image
            src="/three_images/Ekran Resmi 2026-02-10 15.21.03 1.png"
            alt="Brian Moses speaking"
            fill
            className="object-cover object-top"
          />
          
          {/* Dark gradient overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/55 to-black/30" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/45 to-black/60" />

          {/* Content Overlay */}
          <div className="relative z-10 h-full mx-auto w-full px-6 lg:px-12">
            <div className="grid min-h-[75vh] md:min-h-[85vh] items-center gap-8 md:gap-12 lg:grid-cols-[1.1fr_0.9fr] pt-16 sm:pt-20 md:pt-24 pb-12 sm:pb-16 md:pb-20">
              {/* Left Content - Enhanced Styling */}
              <div className="space-y-6 md:space-y-8">
                {/* Eyebrow */}
                <div className="flex items-center gap-3">
                  <div className="h-px w-12 bg-[#AADBFF]" />
                  <span className="text-[#AADBFF] text-xs md:text-sm font-semibold uppercase tracking-wider">
                    Why Event Planners Choose
                  </span>
                </div>

                <h2 className="text-white font-bold leading-[1.05] text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
                  Brian Moses
                </h2>
                
                <p className="text-white/90 text-xl sm:text-2xl md:text-3xl font-semibold leading-tight max-w-2xl">
                  When the Stakes Are High and the Message Must Move People
                </p>

                <div className="space-y-5 md:space-y-6 pt-4">
                  <p className="text-white/80 text-base sm:text-lg md:text-xl leading-relaxed">
                    Not because he&apos;s checked the usual speaker boxes. Not because of titles, trophies, or numbers on a slide.
                  </p>

                  <p className="text-white/85 text-base sm:text-lg md:text-xl leading-relaxed">
                    They book him because Brian knows how to cut through noise, resistance, and burnout and speak to the part of people that actually drives real transformation.
                  </p>

                  <p className="text-white/85 text-base sm:text-lg md:text-xl leading-relaxed">
                    Whether it&apos;s a company-wide corporate event, regional conference, sales leadership summit, or intimate department huddle, Brian delivers what audiences are quietly craving:
                  </p>

                  {/* Key Points - Enhanced */}
                  <div className="mt-8 space-y-5 pl-2">
                    <div className="flex gap-4 items-start group">
                      <div className="mt-2.5 h-3 w-3 flex-none bg-[#AADBFF] rounded-full ring-2 ring-[#AADBFF]/30 group-hover:ring-[#AADBFF]/60 transition-all" />
                      <p className="text-base sm:text-lg md:text-xl leading-relaxed text-white">
                        <span className="font-bold text-[#AADBFF]">Connection that feels personal, not performative</span>
                      </p>
                    </div>
                    <div className="flex gap-4 items-start group">
                      <div className="mt-2.5 h-3 w-3 flex-none bg-[#AADBFF] rounded-full ring-2 ring-[#AADBFF]/30 group-hover:ring-[#AADBFF]/60 transition-all" />
                      <p className="text-base sm:text-lg md:text-xl leading-relaxed text-white">
                        <span className="font-bold text-[#AADBFF]">Inspiration  that leads to action</span>
                      </p>
                    </div>
                    <div className="flex gap-4 items-start group">
                      <div className="mt-2.5 h-3 w-3 flex-none bg-[#AADBFF] rounded-full ring-2 ring-[#AADBFF]/30 group-hover:ring-[#AADBFF]/60 transition-all" />
                      <p className="text-base sm:text-lg md:text-xl leading-relaxed text-white">
                        <span className="font-bold text-[#AADBFF]">Momentum that lasts long after the applause</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right "space" column */}
              <div className="hidden lg:block" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

