import Image from "next/image";

const DEFAULT_PROGRAM_IMAGES = {
  program1: "/three_images/Ekran Resmi 2026-02-10 15.20.04 1.png",
  program2: "/three_images/Ekran Resmi 2026-02-10 15.20.24 1.png",
  program3: "/images/HS Biz Planning 014 1.png",
};

const getPrograms = (content: Record<string, string>) => [
  {
    program: "PROGRAM1",
    title: content["work.program1.title"] || "Inner Circle Group Coaching",
    desc: content["work.program1.desc"] || "Accelerate Your Results! For the agent producing 0-15 sales annually, income is under $200,000 and they want a system and process that's predictable, reliable and duplicatable to produce more FAST!",
    bullet: "",
    buttonText: content["work.program1.buttonText"] || "Inner Circle Group Coaching",
    url: content["work.program1.url"] || "https://inner-circle.brianmoses.com/how-to-get-3-new-listings-fast-page",
    imageKey: "program1.image",
  },
  {
    program: "PROGRAM2",
    title: content["work.program2.title"] || "1 on 1 Personalized & Customized Coaching",
    desc: content["work.program2.desc"] || "For the Producer and/or Team Leader doing $200,000+ a year, wants more but without giving up their life. This is a 1 on 1 experience that will transform your business and life at scale. Apply for your free business evaluation call and secure your spot today.",
    bullet: "",
    buttonText: content["work.program2.buttonText"] || "Apply Now",
    url: content["work.program2.url"] || "https://calendly.com/coachbrianmoses/30-minute-business-assessment-clone",
    imageKey: "program2.image",
  },
  {
    program: "",
    title: content["work.program3.title"] || "In Person Keynotes and Live Training",
    desc: content["work.program3.desc"] || "Motivational. Inspiring. Unforgettable. And Always Authentic. For Companies, Brokerages, or Conferences that turn moments into momentum",
    bullet: "",
    buttonText: content["work.program3.buttonText"] || "Learn More",
    url: content["work.program3.url"] || "https://calendly.com/coachbrianmoses/discuss-booking-brian-for-your-event-clone",
    imageKey: "program3.image",
  },
];

type WorkWithBrianSectionProps = {
  content?: Record<string, string>;
};

export default function WorkWithBrianSection({ content = {} }: WorkWithBrianSectionProps) {
  const programs = getPrograms(content);
  const getImage = (imageKey: string) => {
    const k = imageKey.replace(".image", "") as "program1" | "program2" | "program3";
    return content[imageKey] || DEFAULT_PROGRAM_IMAGES[k];
  };
  return (
    <section className="relative overflow-hidden">
      {/* Background (edge-to-edge) */}
      <div className="absolute inset-0 bg-[#000614]" />
      <div 
        className="absolute inset-0" 
        style={{ background: 'linear-gradient(to bottom, #1568F7 0%, #000614 100%)' }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#000614] via-transparent to-[#000614]" />

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-24">
        {/* Heading */}
        <h2 className="text-center text-white font-light text-2xl md:text-3xl lg:text-4xl leading-tight max-w-5xl mx-auto whitespace-pre-line">
          {content["work.heading"] || "Let Brian Show You How to Stand Out in Your Market, Close More Deals and Enjoy a Balanced Life."}
        </h2>

        {/* Cards */}
        <div className="mt-12 grid gap-8 lg:grid-cols-3">
          {programs.map((p, idx) => (
            <div
              key={idx}
              className="relative flex flex-col rounded-xl overflow-hidden border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.45)] backdrop-blur-sm"
            >
              {/* Card gradient background */}
              <div className="absolute inset-0 bg-[#000614]" />
              <div 
                className="absolute inset-0" 
                style={{ background: 'linear-gradient(to bottom, #1568F7 0%, #000614 100%)' }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#000614] via-transparent to-[#000614]" />
              {/* Image */}
              <div className="relative z-10 h-44 md:h-48 flex-none">
                <Image
                  src={getImage(p.imageKey)}
                  alt={p.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 33vw, 400px"
                  className={`object-cover ${idx === 0 ? 'object-top' : 'object-center'}`}
                  priority={idx === 0}
                />
                {/* top image dark overlay for readability */}
                <div className="absolute inset-0 bg-black/25" />
              </div>

              {/* Content */}
              <div className="relative z-10 flex flex-col flex-1 px-6 py-6 md:px-7">
                {/* Program label */}
                {p.program ? (
                  <div className="text-[11px] tracking-[0.22em] uppercase text-white/55">
                    {p.program}
                  </div>
                ) : (
                  <div className="h-[16px]" />
                )}

                {/* Title and Description Container */}
                <div className="flex-1 min-h-[140px] md:min-h-[120px]">
                  {/* Title */}
                  <h3 className="mt-2 text-white font-semibold text-lg md:text-xl leading-snug whitespace-pre-line">
                    {p.title}
                  </h3>

                  {/* Description */}
                  <p className="mt-3 text-white/72 text-sm md:text-[15px] leading-relaxed">
                    {p.desc}
                  </p>
                </div>

                {/* Bullet */}
                {p.bullet && (
                  <div className="mt-5 grid grid-cols-[auto,1fr] gap-3 items-start">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[#9bd7ff]" />
                    <p className="text-white/70 text-sm leading-relaxed">
                      {p.bullet}
                    </p>
                  </div>
                )}

                {/* Button */}
                <div className="mt-auto pt-7">
                  <a
                    href={p.url}
                    target={p.url.startsWith("http") ? "_blank" : undefined}
                    rel={p.url.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="inline-flex"
                  >
                    <button className="inline-flex items-center justify-center rounded-full border border-white/35 px-5 py-2.5 text-sm text-white/90 hover:text-white hover:border-white/60 transition">
                      {p.buttonText || "Learn More"}
                    </button>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Optional bottom fade like reference */}
        <div className="pointer-events-none absolute left-0 right-0 bottom-0 h-16 bg-gradient-to-t from-black/40 to-transparent" />
      </div>
    </section>
  );
}
