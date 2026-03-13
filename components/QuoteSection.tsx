import Image from "next/image";

interface QuoteSectionProps {
  imageSrc?: string;
  content?: Record<string, string>;
}

export default function QuoteSection({ imageSrc = "/hero_section1.png", content = {} }: QuoteSectionProps) {
  return (
    <section className="relative py-12 md:py-24 overflow-hidden min-h-[850px] md:min-h-[600px] lg:min-h-[700px]">
      {/* Mobile: Full image (black top + face bottom), no crop, bg for letterboxing */}
      <div className="absolute inset-0 md:hidden bg-black">
        <Image
          src="/Frame 1707482102.png"
          alt="Brian Moses"
          fill
          className="object-contain object-top"
          sizes="100vw"
        />
      </div>
      {/* Desktop Background */}
      <div className="absolute inset-0 hidden md:block">
        <Image
          src={imageSrc}
          alt="Brian Moses speaking on stage"
          fill
          className="object-cover object-center"
        />
      </div>

      {/* Mobile: text in dark section, button at bottom; desktop: standard layout */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 pt-6 md:pt-0 pb-8 md:pb-0 h-full flex flex-col md:block min-h-[850px] md:min-h-0">
        <div className="grid lg:grid-cols-2 gap-6 md:gap-12 items-start md:items-center min-h-0 md:min-h-[600px] lg:min-h-[700px] flex-1 md:flex-none">
          {/* Left: Empty space for image visibility */}
          <div className="hidden lg:block"></div>

          {/* Right: Quote and Text - compact on mobile, centered on mobile */}
          <div className="text-white md:pl-0 md:max-w-none max-w-md text-center md:text-left">
            {/* Quote */}
            <blockquote className="text-2xl md:text-3xl lg:text-4xl font-semibold leading-tight mb-2 md:mb-3 whitespace-pre-line drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
              {content["quote.text"] || "\"Success isn't just about what you earn. It's about what you get to experience because of what you earn.\""}
            </blockquote>

            {/* Attribution */}
            <p className="text-white/80 text-sm md:text-base uppercase tracking-wider mb-2 md:mb-4 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
              {content["quote.attribution"] || "BRIAN MOSES"}
            </p>

            {/* Description */}
            <p className="text-white/90 text-base md:text-lg leading-relaxed mb-4 md:mb-6 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
              {content["quote.desc"] || "If you're ready to stop chasing and start attracting a better business and life, Brian is your guide."}
            </p>

            {/* CTA Button - hidden in grid on mobile, shown in footer */}
            <div className="hidden md:block">
              <a
                href={content["quote.buttonUrl"] || "https://calendly.com/coachbrianmoses/30-minute-business-assessment-clone"}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block"
              >
                <button className="rounded-full bg-white text-black px-8 py-4 text-base md:text-lg font-medium hover:bg-white/90 transition-colors">
                  {content["quote.buttonText"] || "Book a Free Discovery Call"}
                </button>
              </a>
            </div>
          </div>
        </div>

        {/* Mobile: Button fixed at bottom */}
        <div className="md:hidden flex justify-center pt-4 pb-6">
          <a
            href={content["quote.buttonUrl"] || "https://calendly.com/coachbrianmoses/30-minute-business-assessment-clone"}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block"
          >
            <button className="rounded-full bg-white text-black px-8 py-4 text-base font-medium hover:bg-white/90 transition-colors">
              {content["quote.buttonText"] || "Book a Free Discovery Call"}
            </button>
          </a>
        </div>
      </div>
    </section>
  );
}

