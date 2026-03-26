import Image from "next/image";

interface AboutHeroProps {
  headline?: string;
  subheadline?: string;
  backgroundImage?: string;
}

const stats = [
  { value: "3,500+", label: "Homes Sold" },
  { value: "#2", label: "Worldwide Ranking" },
  { value: "50K+", label: "Lives Impacted" },
  { value: "30+ Years", label: "Of Experience" },
];

export default function AboutHero({
  headline = "From the Projects\nto the Podium.",
  subheadline = "Brian Moses didn't inherit success. He clawed it out of poverty, debt, depression, and every reason the world gave him to quit. This is his story and yours starts here.",
  backgroundImage = "/images/image (32) 1.png",
}: AboutHeroProps) {
  return (
    <section className="relative w-full max-w-[1791px] rounded-[20px] overflow-hidden bg-[#010711] mx-auto mt-12 md:mt-8 px-4 sm:px-6 lg:px-8">
      {/* Background Images & Overlays */}
      <div className="absolute inset-0">
        <Image
          src={backgroundImage}
          alt="Audience Background"
          fill
          priority
          className="object-cover grayscale"
        />
      </div>

      <div className="absolute inset-0 bg-black/40"></div>

      {/* Content Wrapper */}
      <div className="relative z-10 py-24 md:py-[150px] flex flex-col items-center text-center">
        {/* Headline */}
        <h1 className="text-5xl md:text-[96px] font-medium text-white tracking-[-0.04em] leading-[1.1] md:leading-[96px] mb-[22px] max-w-[1000px] whitespace-pre-line">
          {headline}
        </h1>

        {/* Subheadline */}
        <p className="text-[#CBD5E1] text-lg md:text-[24px] font-medium leading-relaxed md:leading-[32px] max-w-[1000px] mb-16 md:mb-[96px]">
          {subheadline}
        </p>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-12 gap-x-4 md:gap-[35px] w-full max-w-[1300px] mx-auto">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center gap-[18px]"
            >
              <span className="text-4xl md:text-[45px] font-normal text-white leading-[54px]">
                {stat.value}
              </span>
              <span className="text-xs md:text-[18px] tracking-[1.79px] font-semibold text-white uppercase leading-[24px]">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
