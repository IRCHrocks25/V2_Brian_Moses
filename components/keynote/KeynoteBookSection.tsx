import Image from "next/image";

export default function KeynoteBookSection() {
  return (
    <section className="relative bg-[#0a0a0a] py-16 md:py-24 overflow-hidden">
      <div className="mx-auto w-full max-w-[95rem] px-6 lg:px-12">
        <div className="relative min-h-[80vh] md:min-h-[90vh] rounded-2xl md:rounded-3xl overflow-hidden border border-white/10 shadow-[0_40px_140px_rgba(0,0,0,0.85)]">
          
          {/* Background */}
          <div className="absolute inset-0">
            <Image
              src="/images/Frame 8.png"
              alt="Book Brian Moses"
              fill
              className="object-cover object-center"
              priority
            />
            <div className="absolute inset-0 bg-black/60" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/75" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_1000px_600px_at_50%_50%,rgba(255,255,255,0.08),transparent_65%)]" />
          </div>

          {/* Frame Accents */}
          <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10" />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

          {/* Content */}
          <div className="relative z-10 h-full">
            <div className="grid min-h-[80vh] md:min-h-[90vh] lg:grid-cols-12 items-center gap-12 lg:gap-16 px-8 sm:px-10 md:px-12 lg:px-16 pt-20 sm:pt-24 md:pt-28 pb-12 sm:pb-14 md:pb-16">
              
              {/* LEFT: Content */}
              <div className="lg:col-span-7 space-y-10 md:space-y-12">
                
                {/* Header Section */}
                <div>
                  <h2 className="text-white font-bold leading-[1.05] text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
                    Book Brian Moses
                  </h2>
                  <div className="mt-4 h-0.5 w-20 bg-[#AADBFF]" />
                </div>

                {/* Quote Section */}
                <div className="space-y-6">
                  <p className="text-[#AADBFF] text-xl sm:text-2xl md:text-3xl leading-relaxed font-semibold italic">
                    &quot;The people who succeed in life aren&apos;t lucky. They have a belief in possibilities — and with that belief, the universe moves into action to conspire for them.&quot;
                  </p>
                  <p className="text-white text-lg sm:text-xl md:text-2xl leading-relaxed">
                    When your event demands more than motivation — when it requires a mindset shift, a breakthrough moment, and a speaker who walks the talk — Brian delivers.
                  </p>
                </div>
              </div>

              {/* RIGHT: CTA Card */}
              <div className="lg:col-span-5">
                <div className="rounded-2xl border border-[#AADBFF]/40 bg-white/[0.05] backdrop-blur-xl shadow-[0_30px_100px_rgba(0,0,0,0.7)] overflow-hidden">
                  
                  {/* Top Accent */}
                  <div className="h-px w-full bg-gradient-to-r from-transparent via-[#AADBFF]/50 to-transparent" />
                  
                  <div className="p-8 md:p-10">
                    
                    {/* Label */}
                    <p className="text-xs tracking-[0.3em] uppercase text-white/60 mb-6">
                      Booking
                    </p>

                    {/* Heading */}
                    <h3 className="text-white font-bold text-lg sm:text-xl md:text-2xl leading-tight mb-8">
                      Ready to Ignite Your Audience?
                    </h3>

                    {/* Email Section */}
                    <div className="mb-8">
                      <p className="text-white/70 text-sm mb-2">
                        Email
                      </p>
                      <a
                        href="mailto:Brian@BrianMoses.com"
                        className="text-[#AADBFF] text-lg sm:text-xl md:text-2xl font-semibold hover:text-[#7FC5FF] transition-colors underline decoration-2 underline-offset-4"
                      >
                        Brian@BrianMoses.com
                      </a>
                    </div>

                    {/* Divider */}
                    <div className="h-px w-full bg-white/10 mb-8" />

                    {/* Message */}
                    <p className="text-white/80 text-base md:text-lg leading-relaxed mb-8">
                      Start the transformation that lasts long after the applause.
                    </p>

                    {/* CTA Button */}
                    <button className="w-full rounded-xl px-6 py-4 text-base sm:text-lg font-semibold text-black bg-white hover:bg-white/95 transition shadow-[0_20px_60px_rgba(255,255,255,0.15)]">
                      Request Availability
                    </button>

                    {/* Response Time */}
                    <p className="mt-4 text-white/50 text-xs text-center">
                      Typical response time: 1–2 business days
                    </p>
                  </div>

                  {/* Bottom Accent */}
                  <div className="h-px w-full bg-gradient-to-r from-transparent via-[#AADBFF]/30 to-transparent" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
