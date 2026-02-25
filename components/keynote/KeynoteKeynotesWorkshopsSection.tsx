export default function KeynoteKeynotesWorkshopsSection() {
  return (
    <section className="relative overflow-hidden py-16 md:py-24">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-[#000614]" />
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(to bottom, #1568F7 0%, #000614 100%)" }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#000614] via-transparent to-[#000614]" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-white font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-4">
            Signature Keynotes
          </h2>
          <p className="text-white/85 text-lg md:text-xl lg:text-2xl">
            Customizable. High-Impact. Always Actionable.
          </p>
        </div>

        {/* Keynotes and Workshops Grid */}
        <div className="grid gap-8 md:gap-10 lg:grid-cols-2">
          {/* KEYNOTE: Never Say Can't */}
          <div className="relative rounded-xl overflow-hidden border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.45)] backdrop-blur-sm p-6 md:p-8 hover:border-white/20 transition-colors">
            {/* Card gradient background */}
            <div className="absolute inset-0 bg-[#000614]" />
            <div
              className="absolute inset-0"
              style={{ background: "linear-gradient(to bottom, #1568F7 0%, #000614 100%)" }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#000614] via-transparent to-[#000614]" />
            <div className="relative z-10">
              <div className="mb-4">
                <span className="text-[#AADBFF] text-xs md:text-sm font-semibold uppercase tracking-wider">
                  KEYNOTE
                </span>
                <h3 className="text-white font-bold text-xl md:text-2xl lg:text-3xl mt-2 leading-tight">
                  Never Say Can&apos;t - Turn Any Adversity Into Fuel
                </h3>
              </div>
              <p className="text-white/75 text-base md:text-lg leading-relaxed mb-4">
                An inspiring keynote that shatters limiting beliefs and ignites unstoppable determination. Based on
                Brian&apos;s personal journey from poverty and scarcity to abundance and influence, this talk gives your
                audience permission to dream bigger and the framework to make it&nbsp;real.
              </p>
              <div className="mt-6 pt-4 border-t border-white/10">
                <p className="text-white/60 text-sm md:text-base">
                  <span className="font-semibold text-white/80">Ideal for:</span> General audiences, leadership events,
                  sales teams, annual conferences
                </p>
              </div>
            </div>
          </div>

          {/* KEYNOTE: The Comfort Zone */}
          <div className="relative rounded-xl overflow-hidden border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.45)] backdrop-blur-sm p-6 md:p-8 hover:border-white/20 transition-colors">
            {/* Card gradient background */}
            <div className="absolute inset-0 bg-[#000614]" />
            <div
              className="absolute inset-0"
              style={{ background: "linear-gradient(to bottom, #1568F7 0%, #000614 100%)" }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#000614] via-transparent to-[#000614]" />
            <div className="relative z-10">
              <div className="mb-4">
                <span className="text-[#AADBFF] text-xs md:text-sm font-semibold uppercase tracking-wider">
                  KEYNOTE
                </span>
                <h3 className="text-white font-bold text-xl md:text-2xl lg:text-3xl mt-2 leading-tight">
                  The Comfort Zone You Didn&apos;t Know You Were Trapped In &amp; How to Break Free from it
                </h3>
              </div>
              <p className="text-white/75 text-base md:text-lg leading-relaxed mb-4">
                Brian vulnerably shares the life-changing distinctions he discovered during a family trip to Aruba.
                Whether your audience is struggling or believes they&apos;ve &quot;made it,&quot; this keynote reveals
                the invisible barriers of our individual comfort zones that hold us back from the next level. Brian
                reveals several key experiences that uncovered it — and how we can break free to experience the
                abundance available to all of&nbsp;us.
              </p>
              <div className="mt-6 pt-4 border-t border-white/10">
                <p className="text-white/60 text-sm md:text-base">
                  <span className="font-semibold text-white/80">Ideal for:</span> High performers, executive retreats,
                  personal development events &amp; general audiences
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="mt-12 md:mt-16 text-center">
          <p className="text-white/85 text-base md:text-lg lg:text-xl">
            For a complimentary consultation or to customize a presentation&nbsp;contact:{" "}
            <a
              href="mailto:Brian@BrianMoses.com"
              className="text-[#AADBFF] hover:text-[#7FC5FF] transition-colors underline"
            >
              Brian@BrianMoses.com
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
