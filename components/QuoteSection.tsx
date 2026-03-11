import Image from "next/image";

interface QuoteSectionProps {
  imageSrc?: string;
  content?: Record<string, string>;
}

export default function QuoteSection({ imageSrc = "/hero_section1.png", content = {} }: QuoteSectionProps) {
  return (
    <section className="relative py-16 md:py-24 overflow-hidden min-h-[500px] md:min-h-[600px] lg:min-h-[700px]">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={imageSrc}
          alt="Brian Moses speaking on stage"
          fill
          className="object-cover object-center"
        />
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[500px] md:min-h-[600px] lg:min-h-[700px]">
          {/* Left: Empty space for image visibility */}
          <div className="hidden lg:block"></div>

          {/* Right: Quote and Text */}
          <div className="text-white pl-12 md:pl-0">
            {/* Quote */}
            <blockquote className="text-2xl md:text-3xl lg:text-4xl font-semibold leading-tight mb-3 whitespace-pre-line">
              {content["quote.text"] || "\"Success isn't just about what you earn. It's about what you get to experience because of what you earn.\""}
            </blockquote>

            {/* Attribution */}
            <p className="text-white/80 text-sm md:text-base uppercase tracking-wider mb-4">
              {content["quote.attribution"] || "BRIAN MOSES"}
            </p>

            {/* Description */}
            <p className="text-white/90 text-base md:text-lg leading-relaxed mb-6">
              {content["quote.desc"] || "If you're ready to stop chasing and start attracting a better business and life, Brian is your guide."}
            </p>

            {/* CTA Button */}
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
    </section>
  );
}

