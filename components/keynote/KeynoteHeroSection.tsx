import Image from "next/image"

export default function KeynoteHeroSection() {
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
              <div className="w-full text-left -translate-y-16 sm:-translate-y-20 md:-translate-y-24 lg:-translate-y-28">
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
                <button className="inline-flex items-center justify-center rounded-xl px-8 py-4 text-base sm:text-lg font-semibold text-white border border-white/25 bg-transparent hover:bg-white/5 transition hover:border-white/35 duration-300">
                    View Video Clips
                  </button>
                  <button className="inline-flex items-center justify-center rounded-xl px-8 py-4 text-base sm:text-lg font-semibold text-black bg-white hover:bg-white/95 transition shadow-[0_18px_50px_rgba(0,0,0,0.35)] hover:shadow-[0_25px_70px_rgba(0,0,0,0.45)] hover:scale-105 duration-300">
                    Book Brian for your Next Event
                  </button>
                  
                </div>
              </div>
            </div>
          </div>

          {/* Optional: add a little bottom breathing room on tiny screens */}
          <div className="h-6 sm:h-0" />
        </div>
      </div>
    </section>
  )
}
