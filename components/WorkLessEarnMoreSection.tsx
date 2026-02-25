import Image from "next/image";

export default function WorkLessEarnMoreSection() {
  return (
    <section className="relative bg-[#0a0a0a] py-12 sm:py-16 md:py-24 overflow-hidden min-h-[500px] sm:min-h-[600px] md:min-h-[800px] lg:min-h-[900px] flex items-center">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/image (32) 1.png"
          alt="Person walking towards the sun"
          fill
          className="object-cover object-center"
        />
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 lg:px-8">
        <div className="text-center text-white max-w-6xl mx-auto">
          {/* Main Headline */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6">
            Work less. Earn more.
          </h2>

          {/* Descriptive Paragraph */}
          <p className="text-lg md:text-xl lg:text-2xl leading-relaxed mb-8">
            You don&apos;t need to work harder to live a fullfilled life. You need a better system. If you&apos;re ready for more clarity, more income, and more freedom, your journey starts here.
          </p>

          {/* CTA Button */}
          <button className="rounded-full bg-white text-black px-8 py-4 text-base md:text-lg lg:text-xl font-medium hover:bg-white/90 transition-colors">
            Book a Free Discovery Call
          </button>
        </div>
      </div>
    </section>
  );
}

