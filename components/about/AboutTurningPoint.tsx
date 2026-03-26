interface AboutTurningPointProps {
  tagline?: string;
  heading?: string;
  paragraphs?: string[];
  pillars?: string[];
}

export default function AboutTurningPoint({
  tagline = "The Turning Point",
  heading = "$18,000 a year. Then everything changed.",
  paragraphs = [
    "In his first year in real estate, Brian did exactly what he was told to do. He cold-called until his throat was raw. He knocked on doors until his shoes wore out. He begged for business. The result? A measly $18,000 in total commissions—not even enough to cover his interest payments.",
    "He was exhausted, broke, and on the verge of quitting. But instead of walking away, he became a student of human psychology and marketing systems. He stopped looking at real estate as a \"sales\" job and started looking at it as a \"structural\" challenge.",
    "He stopped chasing. He started attracting. Within three years, Brian scaled his business to over $3.5 Million in annual GCI, selling 400+ homes a year with a small, elite team. He didn't just survive the industry; he re-engineered it.",
  ],
  pillars = [
    "Stop chasing. Start attracting.",
    "From Hunter to Architect.",
    "Authority through engineering, not effort.",
    "Systems that pre-sell the client.",
  ],
}: AboutTurningPointProps) {
  return (
    <section className="w-full flex flex-col lg:flex-row justify-center items-center py-16 md:py-24 px-6 lg:px-[120px] gap-12 lg:gap-[60px] border-y border-[rgba(65,71,84,0.1)] max-w-7xl mx-auto">
      {/* Text Content Column */}
      <div className="flex flex-col items-start w-full lg:w-[717px] gap-6 md:gap-[25px]">
        {/* Tagline */}
        <div className="flex items-center gap-[10px]">
          <div className="relative w-4 h-2.5">
            <div className="absolute left-0 top-0.5 w-2 md:w-2.5 h-2 md:h-2.5 rounded-full bg-[#AADBFF]"></div>
            <div className="absolute left-[6px] top-0.5 w-2 md:w-2.5 h-2 md:h-2.5 rounded-full bg-[#1568F7]"></div>
          </div>
          <span className="text-[#1568F7] text-base md:text-2xl font-medium leading-[25px] tracking-widest uppercase">
            {tagline}
          </span>
        </div>

        {/* Heading */}
        <h2 className="text-4xl md:text-6xl font-medium text-white leading-[1.1] md:leading-[64px] tracking-tighter w-full whitespace-pre-line">
          {heading}
        </h2>

        {/* Paragraphs */}
        <div className="flex flex-col gap-6 w-full mt-4">
          {paragraphs.map((p, i) => (
            <p
              key={i}
              className="text-[#CFCFCF] text-lg md:text-2xl font-normal leading-relaxed md:leading-[33px]"
            >
              {p}
            </p>
          ))}
        </div>
      </div>

      {/* Pillars / List Column */}
      <div className="flex flex-col gap-4 w-full lg:w-[525px]">
        {pillars.map((pillar, index) => (
          <div
            key={index}
            className="flex items-center bg-[#F5F5F5] rounded-[60px] py-5 px-5 gap-5"
          >
            <div className="relative w-[22px] h-[22px] flex-shrink-0">
              <div className="absolute inset-0 bg-[#1568F7] rounded-full"></div>
              {/* Checkmark representation */}
              <div className="absolute left-[6.5px] top-[8px] w-[10px] h-[8px] border-b-[1.5px] border-r-[1.5px] border-[#AADBFF] transform rotate-45 -translate-y-1"></div>
            </div>
            <span className="text-black font-semibold text-lg md:text-2xl leading-6 tracking-tight">
              {pillar}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
