import Image from "next/image";

export default function KeynoteTransformationSection() {
  return (
    <section className="relative bg-[#0a0a0a] py-16 md:py-24 overflow-hidden">
      <div className="mx-auto w-full px-6 lg:px-12">
        {/* Background Image Section with Rounded Corners */}
        <div className="relative min-h-[80vh] md:min-h-[90vh] rounded-lg md:rounded-3xl overflow-hidden">
          <Image
            src="/images/Frame 1000007768.png"
            alt="Brian Moses transformation story"
            fill
            className="object-cover object-center"
          />
          
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-black/40" />

          {/* Content Overlay */}
          <div className="relative z-10 h-full mx-auto w-full px-6 lg:px-12">
            <div className="grid min-h-[80vh] md:min-h-[90vh] items-center gap-6 md:gap-10 lg:grid-cols-[2fr_1fr] pt-16 sm:pt-20 md:pt-24 pb-8 sm:pb-10 md:pb-14">
              
              {/* Left Content */}
              <div className="pl-4 sm:pl-6 md:pl-12 lg:pl-16">
                
                <h2 className="text-white font-bold leading-[1.05] text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
                  Sharing A Story of Radical Transformation
                </h2>
                
                <p className="mt-4 text-white/85 text-lg sm:text-xl md:text-2xl font-semibold">
                  From Rock Bottom to Remarkable
                </p>

                <div className="mt-6 sm:mt-8 space-y-4 sm:space-y-6">
                  
                  <p className="text-white/85 text-sm sm:text-base md:text-lg leading-relaxed">
                    Abandoned by his biological father at age three. Raised by his poverty stricken mom, a German immigrant who could barely speak English, living on welfare and in inner-city housing projects, odds were stacked against them.
                  </p>

                  <p className="text-white/85 text-sm sm:text-base md:text-lg leading-relaxed">
                    By the age of twenty-eight, he was buried in debt, his wages levied and bank account seized by the IRS, deep in depression and thoughts of suicide - what do you do?
                  </p>

                  {/* Benefit Statement - Premium Glassmorphism */}
                  <div className="mt-8 p-8 md:p-10 lg:p-12 rounded-2xl border border-[#AADBFF]/40 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.5),0_0_0_1px_rgba(170,219,255,0.2),inset_0_1px_0_rgba(255,255,255,0.1)] relative overflow-hidden">
  <div className="absolute inset-0 bg-gradient-to-br from-[#AADBFF]/15 via-[#AADBFF]/10 to-transparent" />
  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(170,219,255,0.2),transparent_60%)]" />
  <div className="absolute inset-0 ring-1 ring-inset ring-white/10" />

  <div className="relative z-10 space-y-3">
    <p className="text-sm sm:text-base md:text-lg leading-relaxed font-medium text-white/60 uppercase tracking-widest">
      You may not have the resources. You have plenty of reasons to quit.
    </p>
    <p
      className="text-xl sm:text-2xl md:text-3xl lg:text-4xl leading-snug font-extrabold tracking-tight"
      style={{ color: "#AADBFF" }}
    >
      The Solution is Simple; Change Your Story & Change Your Life!
    </p>
  </div>
</div>

                  <p className="text-white/85 text-sm sm:text-base md:text-lg leading-relaxed">
                    Today, Brian is a multi-millionaire, accomplished businessman, devoted husband, and father. Named by Success Magazine as one of the 125 Most Influential People in the Real Estate Industry, he embodies the values, grit, determination, and perseverance that define the human spirit at its finest.
                  </p>

                  <p className="text-white/85 text-sm sm:text-base md:text-lg leading-relaxed">
                    The lesson -
                  </p>

                  <p
                    className="text-xl sm:text-2xl md:text-3xl lg:text-4xl leading-tight font-bold italic"
                    style={{ color: "#AADBFF" }}
                  >
                    &quot;Perhaps you are closer than you think.  
                    You can never quit.  
                    You can never give up.&quot;
                  </p>

                  <p className="text-white/85 text-sm sm:text-base md:text-lg leading-relaxed">
                    From mess to message, Brian created &quot;Never Say Can&apos;t&quot;—a powerful keynote that transforms adversity into results. His message of grit and relentless perseverance now moves audiences worldwide to improve and transform their own lives.
                  </p>

                </div>
              </div>

              {/* Right spacer column (kept for composition balance) */}
              <div className="hidden lg:block" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
