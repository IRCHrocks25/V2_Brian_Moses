export default function KeynoteAudienceExperienceSection() {
  return (
    <section className="relative bg-[#0a0a0a] py-16 md:py-24">
      <div className="mx-auto w-full max-w-7xl px-6 lg:px-12">
        {/* Section Header */}
        <h2 className="text-white font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-12 md:mb-16">
          What Your Audience Will Experience:
        </h2>

        {/* Three Experience Items */}
        <div className="grid gap-8 md:gap-10 lg:grid-cols-3 mb-16 md:mb-20">
          {/* Measurable Results */}
          <div className="relative rounded-xl overflow-hidden border border-white/10 bg-[#0a0a0a] p-6 md:p-8 hover:border-white/20 transition-colors flex flex-col">
            <h3 className="text-white font-bold text-xl md:text-2xl lg:text-3xl mb-4" style={{ color: "#AADBFF" }}>
              Measurable Results
            </h3>
            <p className="text-white/75 text-lg md:text-xl lg:text-2xl leading-relaxed">
              Strategies that translate directly to improved performance and&nbsp;revenue
            </p>
          </div>

          {/* Deep Connection */}
          <div className="relative rounded-xl overflow-hidden border border-white/10 bg-[#0a0a0a] p-6 md:p-8 hover:border-white/20 transition-colors flex flex-col">
            <h3 className="text-white font-bold text-xl md:text-2xl lg:text-3xl mb-4" style={{ color: "#AADBFF" }}>
              Deep Connection
            </h3>
            <p className="text-white/75 text-lg md:text-xl lg:text-2xl leading-relaxed">
              Authentic stories that resonate at every level of your&nbsp;organization
            </p>
          </div>

          {/* Lasting Change/Impact */}
          <div className="relative rounded-xl overflow-hidden border border-white/10 bg-[#0a0a0a] p-6 md:p-8 hover:border-white/20 transition-colors flex flex-col">
            <h3 className="text-white font-bold text-xl md:text-2xl lg:text-3xl mb-4" style={{ color: "#AADBFF" }}>
              Lasting Change
            </h3>
            <p className="text-white/75 text-lg md:text-xl lg:text-2xl leading-relaxed">
              Mindset shifts that continue long after the event&nbsp;ends
            </p>
          </div>
        </div>

        {/* Customization Content */}
        <div className="space-y-6 md:space-y-8">
          <p className="text-white/85 text-lg md:text-xl lg:text-2xl leading-relaxed">
            Brian customizes every presentation to your audience. Whether your attendees are CEOs, sales
            representatives, or entrepreneurs, they&apos;ll leave with clear breakthroughs — the kind that shift how
            they think, how they lead, and what they believe is possible.
          </p>

          {/* Quote */}
          <div
            className="relative rounded-lg md:rounded-2xl overflow-hidden border-2 p-8 md:p-10"
            style={{ borderColor: "#AADBFF", backgroundColor: "rgba(170, 219, 255, 0.1)" }}
          >
            <p
              className="text-white text-xl md:text-2xl lg:text-3xl leading-relaxed font-semibold italic text-center"
              style={{ color: "#AADBFF" }}
            >
              &quot;Small hinges swing big doors. Your organization will leave with specific breakthroughs that change
              everything.&quot;
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
