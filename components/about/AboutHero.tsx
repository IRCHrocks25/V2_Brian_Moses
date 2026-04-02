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
    <section className="relative w-[92%] md:w-full max-w-[1791px] min-h-[500px] md:min-h-0 rounded-[20px] overflow-hidden bg-[#010711] mx-auto mt-12 md:mt-8 shadow-2xl">
      {/* Background Images & Overlays */}
      <div className="absolute inset-0">
        <Image
          src={backgroundImage}
          alt="Audience Background"
          fill
          priority
          className="object-cover object-[75%_center] md:object-center"
        />
      </div>

      <div className="absolute inset-0 z-[1] bg-black/40" aria-hidden />
      {/* Content Wrapper */}
      <div className="relative z-10 py-16 md:py-[150px] px-4 md:px-0 flex flex-col items-center text-center">
        {/* Headline */}
        <h1 className="text-4xl md:text-[96px] font-medium text-white tracking-[-0.04em] leading-[1.1] md:leading-[96px] mb-6 max-w-[1000px] whitespace-pre-line">
          {headline}
        </h1>

        {/* Subheadline */}
        <p className="text-[#CBD5E1] text-base md:text-[24px] font-medium leading-relaxed md:leading-[32px] max-w-[1000px] mb-12 md:mb-[96px]">
          {subheadline}
        </p>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-10 gap-x-4 md:gap-[35px] w-full max-w-[1300px] mx-auto">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center gap-3 md:gap-[18px]"
            >
              <span className="text-3xl md:text-[45px] font-normal text-white leading-tight md:leading-[54px]">
                {stat.value}
              </span>
              <span className="text-[10px] md:text-[18px] tracking-[1.79px] font-semibold text-white uppercase leading-tight md:leading-[24px]">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
