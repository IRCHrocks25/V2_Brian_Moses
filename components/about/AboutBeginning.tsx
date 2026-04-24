import Image from "next/image";

interface AboutBeginningProps {
  tagline?: string;
  heading?: string;
  paragraphs?: string[];
  quote?: string;
  imageSrc?: string;
}

export default function AboutBeginning({
  tagline = "The Beginning",
  heading = "Abandoned.\nBut not broken.",
  paragraphs = [
    "Raised by a single mother, Brian Moses wasn't handed opportunity. He didn't inherit wealth. In fact, all evidence pointed toward a life of poverty. His biological father walked out on the family at age three, leaving his mom—a German immigrant who couldn't speak much English—to raise the 2 kids. Survival wasn't a concept—it was a daily requirement. Government subsidized housing in the inner city, welfare, food stamps, and her having to work 3 jobs just to keep the lights on.",
    "By his early twenties, the cycle of struggle seemed unbreakable. Brian found himself $40,000 in debt, living in a basement apartment, and battling a deep, quiet depression. He was working three jobs, yet falling further behind every month. The \"system\" he had been told to follow—work hard, keep your head down—was failing him.",
    "It was in this moment of total depletion that Brian made a radical decision. He wasn't just going to \"try harder\"—he was going to change the rules entirely. He realized that the only way out of the project was to build a podium of his own making.",
  ],
  quote = "The world gave me every reason to quit. I decided that was exactly the reason to keep going.",
  imageSrc = "/images/Keynote.png",
}: AboutBeginningProps) {
  return (
    <section className="w-full flex flex-col lg:flex-row justify-center items-center py-16 md:py-32 px-6 lg:px-8 gap-12 lg:gap-[76px] mt-12 md:mt-24 max-w-[1440px] mx-auto">
      {/* Image Column */}
      <div className="relative rounded-[24px] overflow-hidden shadow-2xl w-full lg:w-[621px] h-[500px] md:h-[771px] bg-white flex-shrink-0">
        <Image
          src={imageSrc}
          alt="Brian Moses Speaking"
          fill
          className="object-cover"
        />

        {/* Radial Glow (Ellipse 2339) */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-[1421px] h-[659px] bg-[#03329F] blur-[200px] pointer-events-none opacity-50"></div>

        {/* Quote Overlay */}
        <div className="absolute bottom-10 md:bottom-20 left-1/2 transform -translate-x-1/2 w-[90%] md:w-[566px] bg-black/5 backdrop-blur-sm p-4 md:py-2 md:pl-8 border-l-4 border-[#0070F3]">
          <p className="about-body-text text-white tracking-tight">
            &ldquo;{quote}&rdquo;
          </p>
        </div>
      </div>

      {/* Text Content Column */}
      <div className="flex flex-col items-start w-full lg:w-[722px] gap-5 md:gap-[21px]">
        {/* Tagline */}
        <div className="flex items-center gap-[10px]">
          <div className="relative w-4 h-2.5">
            <div className="absolute left-0 top-0.5 w-2 md:w-2.5 h-2 md:h-2.5 rounded-full bg-[#AADBFF]"></div>
            <div className="absolute left-1.5 top-0.5 w-2 md:w-2.5 h-2 md:h-2.5 rounded-full bg-[#1568F7]"></div>
          </div>
          <span className="text-[#1568F7] text-base md:text-2xl font-medium leading-[25px] tracking-widest uppercase">
            {tagline}
          </span>
        </div>

        {/* Heading */}
        <h2 className="text-4xl md:text-6xl font-medium text-white leading-[1.1] md:leading-[60px] tracking-tight w-full whitespace-pre-line">
          {heading}
        </h2>

        {/* Paragraphs */}
        <div className="flex flex-col gap-8 w-full mt-4">
          {paragraphs.map((p, i) => (
            <p
              key={i}
              className="about-body-text text-[#CFCFCF]"
            >
              {p}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
