import Image from "next/image";

export default function QuoteSection() {
  return (
    <section className="relative py-16 md:py-24 overflow-hidden min-h-[500px] md:min-h-[600px] lg:min-h-[700px]">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/hero_section1.png"
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
            <blockquote className="text-2xl md:text-3xl lg:text-4xl font-semibold leading-tight mb-3">
              <span className="bg-gradient-to-r from-[#1568F7] to-[#2aa7ff] bg-clip-text text-transparent">
                &quot;Success isn&apos;t just about what
                <br />
                you earn.{" "}
              </span>
              <span className="text-white">
                It&apos;s about what you
                <br />
                get to experience because of
                <br />
                what you earn.&quot;
              </span>
            </blockquote>

            {/* Attribution */}
            <p className="text-white/80 text-sm md:text-base uppercase tracking-wider mb-4">
              BRIAN MOSES
            </p>

            {/* Description */}
            <p className="text-white/90 text-base md:text-lg leading-relaxed mb-6">
              If you&apos;re ready to stop chasing and start attracting a better business and life, Brian is your guide.
            </p>

            {/* CTA Button */}
            <button className="rounded-full bg-white text-black px-8 py-4 text-base md:text-lg font-medium hover:bg-white/90 transition-colors">
              Book a Free Discovery Call
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

