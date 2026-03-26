import Image from "next/image";

interface AboutMissionProps {
  tagline?: string;
  heading?: string;
  paragraph?: string;
  quote?: string;
  backgroundImage?: string;
}

export default function AboutMission({
  tagline = "The Mission",
  heading = "His mess became his message.",
  paragraph = "Brian doesn't coach from theory. He coaches from the scars of experience. His mission is to empower real estate professionals and entrepreneurs to stop trading their lives for a paycheck and start building assets that serve their existence.",
  quote = "Success isn't just about what you earn. It's about what you get to experience because of what you earn.",
  backgroundImage = "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?q=80&w=2070&auto=format&fit=crop",
}: AboutMissionProps) {
  return (
    <section className="relative w-full flex flex-col justify-center items-center py-16 md:py-32 px-4 md:px-24 bg-[#010711] overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src={backgroundImage}
          alt="Brian on Stage"
          fill
          className="object-cover grayscale opacity-20"
        />
      </div>
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Content Container */}
      <div className="relative z-10 flex flex-col items-center gap-4 px-4 md:px-8 w-full max-w-[1278px]">
        {/* Tagline */}
        <div className="flex items-center gap-[10px]">
          <div className="relative w-4 h-2.5">
            <div className="absolute left-0 top-0.5 w-2.5 h-2.5 rounded-full bg-[#AADBFF]"></div>
            <div className="absolute left-[6px] top-0.5 w-2.5 h-2.5 rounded-full bg-[#1568F7]"></div>
          </div>
          <span className="text-[#1568F7] text-base md:text-2xl font-medium leading-[25px] tracking-widest uppercase">
            {tagline}
          </span>
        </div>

        {/* Heading */}
        <h2 className="text-white text-center text-4xl md:text-6xl font-medium leading-[1.1] md:leading-[60px] tracking-tighter w-full max-w-[1214px]">
          {heading}
        </h2>

        {/* Paragraph */}
        <p className="text-white text-center text-xl md:text-2xl font-normal leading-relaxed md:leading-[32px] max-w-[986px] mt-4 mb-8">
          {paragraph}
        </p>

        {/* Quote Box (Border) */}
        <div className="w-full max-w-[1214px] flex flex-col items-center py-8 border-y border-[rgba(65,71,84,0.2)] mt-2">
          <p className="text-white text-center text-[22px] md:text-3xl font-normal leading-snug md:leading-[38px] max-w-[735px]">
            &ldquo;{quote}&rdquo;
          </p>
        </div>
      </div>
    </section>
  );
}
