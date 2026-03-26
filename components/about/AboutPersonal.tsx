import Image from "next/image";

interface AboutPersonalProps {
  tagline?: string;
  heading?: string;
  paragraphs?: string[];
  quote?: string;
  imageSrc?: string;
}

export default function AboutPersonal({
  tagline = "The Personal Chapter",
  heading = "Some victories don't show up on a leaderboard.",
  paragraphs = [
    "Beyond the numbers and rankings, Brian's greatest achievement was breaking the intergenerational cycle of poverty. For Brian, success isn't just about the bank account—it's about the freedom to choose your environment and the power to protect those you love.",
    "Today, Brian lives a life that his 28-year-old self wouldn't recognize, but his core mission remains rooted in that basement apartment: proving to anyone who feels stuck that the \"projects\" are just a starting line, not a destination.",
  ],
  quote = "You are always closer than you think. The only question is whether you'll be there to receive it.",
  imageSrc = "https://images.unsplash.com/photo-1544531586-fde5298cdd40?q=80&w=2070&auto=format&fit=crop",
}: AboutPersonalProps) {
  return (
    <section className="w-full flex flex-col lg:flex-row justify-center items-center py-16 md:py-24 px-6 md:px-[120px] gap-12 lg:gap-20 max-w-7xl mx-auto">
      {/* Text Content Column */}
      <div className="flex flex-col items-start w-full lg:w-[595px]">
        {/* Tagline */}
        <div className="flex items-center gap-[10px] mb-4">
          <div className="relative w-4 h-2.5">
            <div className="absolute left-0 top-0.5 w-2.5 h-2.5 rounded-full bg-[#AADBFF]"></div>
            <div className="absolute left-[6px] top-0.5 w-2.5 h-2.5 rounded-full bg-[#1568F7]"></div>
          </div>
          <span className="text-[#1568F7] text-base md:text-2xl font-medium leading-[25px] tracking-widest uppercase">
            {tagline}
          </span>
        </div>

        {/* Heading */}
        <h2 className="text-4xl md:text-5xl font-medium text-white leading-[1.1] md:leading-[48px] tracking-tighter mb-4">
          {heading}
        </h2>

        {/* Paragraphs Container */}
        <div className="flex flex-col gap-6 pt-4 w-full max-w-[595px]">
          {paragraphs.map((p, i) => (
            <p key={i} className="text-[#94A3B8] text-base md:text-lg font-normal leading-6">
              {p}
            </p>
          ))}
          <p className="text-white text-xl md:text-2xl font-bold leading-8 pt-2 md:pt-8">
            &ldquo;{quote}&rdquo;
          </p>
        </div>
      </div>

      {/* Image Column */}
      <div className="relative rounded-xl overflow-hidden shadow-2xl w-full lg:w-[595px] h-[400px] md:h-[536px] flex-shrink-0">
        <Image
          src={imageSrc}
          alt="Brian presenting at a seminar"
          fill
          className="object-cover"
        />
      </div>
    </section>
  );
}
