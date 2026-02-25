import Image from "next/image";
import Navbar from "@/components/Navbar";
import TestimonialsSection from "@/components/TestimonialsSection";
import WorkWithBrianSection from "@/components/WorkWithBrianSection";
import AttractDontChaseSection from "@/components/AttractDontChaseSection";
import TypicalOutcomesSection from "@/components/TypicalOutcomesSection";
import BrianStorySection from "@/components/BrianStorySection";
import QuoteSection from "@/components/QuoteSection";
import WhatYouWillLearnSection from "@/components/WhatYouWillLearnSection";
import WorkLessEarnMoreSection from "@/components/WorkLessEarnMoreSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      {/* Navbar */}
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative bg-[#0a0a0a] py-8 md:py-12">
        <div className="mx-auto w-full px-6 lg:px-12">
          {/* Background Image Section with Rounded Corners */}
          <div className="relative min-h-[70vh] sm:min-h-[80vh] md:min-h-[92vh] rounded-lg md:rounded-3xl overflow-hidden">
            <Image
              src="/images/Frame 8.png"
              alt="Hero background"
              fill
              priority
              className="object-cover object-center"
            />

            {/* Content Overlay */}
            <div className="relative z-10 h-full mx-auto w-full px-6 lg:px-12">
              <div className="grid min-h-[70vh] sm:min-h-[80vh] md:min-h-[92vh] items-center gap-6 md:gap-10 lg:grid-cols-[2fr_1fr] pt-16 sm:pt-20 md:pt-24 pb-8 sm:pb-10 md:pb-14">
                {/* Left Content */}
                <div className="pl-6 sm:pl-8 md:pl-16 lg:pl-24">
                  <h1 className="text-white font-bold leading-[1.05] text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
                    Attract, Don&apos;t Chase.
                  </h1>
                  
                  <p className="mt-4 text-white/85 text-lg sm:text-xl md:text-2xl font-semibold">
                    More of What Your Doing Won&apos;t Fix Your&nbsp;Business - Systems&nbsp;Will.
                  </p>

                  <div className="mt-6 sm:mt-8 space-y-4 sm:space-y-6">
                    <p className="text-white/85 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed">
                      A Proven System that helps you close more deals - without chasing leads, spending tons of money for leads, or burning out.
                    </p>

                    <p className="text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed">
                      Brian Moses opens his entire playbook - built from selling over 3,500&nbsp;homes - and walks you step-by-step through exactly what to&nbsp;do. Follow the&nbsp;system, and the&nbsp;results take&nbsp;care of&nbsp;themselves.
                    </p>

                    <p
                      className="text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed"
                      style={{ color: "#AADBFF" }}
                    >
                      For Agents who want consistency and predictability in their business --- Clear. Practical. No hype.
                    </p>
                  </div>

                  <div className="mt-8 sm:mt-10">
                    <button className="rounded-full bg-red-600 text-white px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base md:text-lg lg:text-xl font-medium hover:bg-red-700 transition-colors">
                      See the System
                    </button>
                  </div>
                </div>

                {/* Right "space" column to match screenshot composition */}
                <div className="hidden lg:block" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* ACHIEVEMENTS & SOCIAL PROOF */}
      <section className="relative py-16 md:py-20">
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a1f3a] to-[#0a0a0a]"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-transparent to-[#0a0a0a]"></div>
        <div className="relative z-10">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
          {/* Main Heading */}
          <h2 className="text-center text-white font-light tracking-wide text-base md:text-lg lg:text-xl xl:text-2xl mb-4">
            Here&apos;s Why Agents Trust Brian&apos;s System
          </h2>
          <p className="text-center text-white font-light tracking-wide text-lg md:text-xl lg:text-2xl xl:text-3xl max-w-5xl mx-auto leading-relaxed">
            Brian Has Inspired More Than 20,000 Real Estate Agents & Industry Professionals Across North America Including All Major Brands
          </p>
        </div>

        {/* Trusted By Logos - Marquee (Edge to Edge, remaining 6 logos) */}
        <div className="mt-12 md:mt-16 overflow-hidden w-full">
          <div className="marquee flex items-center gap-14 will-change-transform">
              {[...Array(4)].flatMap((_, loop) =>
                [
                  "/images/logos/Frame 1000003721.png",
                  "/images/logos/gradient-blue-logo 1.png",
                  "/images/logos/13103 1.png",
                  "/images/logos/163035_normal 1.png",
                  "/images/logos/HomeSmart-Logo_Full_WHT 1.png",
                  "/images/logos/Real-Logo-Outline-Black 1.png",
                ].map((src) => {
                  // Encode the path to handle spaces and special characters
                  const encodedSrc = src.split('/').map((part, i) => 
                    i === 0 ? part : encodeURIComponent(part)
                  ).join('/');
                  return (
                    <Image
                      key={`${loop}-${src}`}
                      src={encodedSrc}
                      alt="Trusted by logo"
                      width={140}
                      height={64}
                      className="h-10 md:h-12 w-auto object-contain opacity-80 flex-shrink-0"
                      unoptimized
                    />
                  );
                })
              )}
          </div>
        </div>

        <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
          {/* Achievements Grid (Keep first 2, optionally add 3rd) */}
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {[
              "Named one of the 125 Most Influential People in Real Estate (Success Magazine)",
              "Ranked #2 Worldwide in a major real estate franchise, 7 years in the Top 10",
              "Brian Moses coaches and trains North America's most successful agents. These agents average over $1 Million Dollars in Annual Income and you can too.",
            ].map((t, i) => (
              <div key={i} className="flex gap-3">
                <span className="mt-2 h-2.5 w-2.5 flex-none bg-[#AADBFF]" />
                <p className="text-white/85 text-sm md:text-base lg:text-lg leading-snug">{t}</p>
              </div>
            ))}
          </div>

          {/* Divider */}
          <div className="my-12 h-px w-full bg-white/15" />

          {/* Media Logos - top row (first 6 logos) */}
          <div className="flex flex-nowrap justify-center items-center gap-3 sm:gap-4 md:gap-6 lg:gap-8 w-full overflow-x-auto">
            {[
              "/images/logos/Frame 1707482088.png",
              "/images/logos/Frame 1707482089.png",
              "/images/logos/Frame 1707482090.png",
              "/images/logos/Frame 1707482091.png",
              "/images/logos/Frame 1707482092.png",
              "/images/logos/Frame 1707482093 (1).png",
            ].map((src, index) => {
              // Encode the path to handle spaces and special characters
              const encodedSrc = src.split('/').map((part, i) => 
                i === 0 ? part : encodeURIComponent(part)
              ).join('/');
              return (
                <Image
                  key={index}
                  src={encodedSrc}
                  alt="Partner logo"
                  width={140}
                  height={64}
                  className="h-10 sm:h-12 md:h-14 w-auto flex-shrink-0 object-contain opacity-80 hover:opacity-100 transition-opacity"
                  unoptimized
                />
              );
            })}
          </div>

          {/* Trusted By Heading */}
          
        </div>

        
        </div>
      </section>

     

      {/* Work with Brian Section */}
      <WorkWithBrianSection />

      {/* Attract Don't Chase Section */}
      <AttractDontChaseSection />

      {/* Typical Outcomes Section */}
      <TypicalOutcomesSection />

      {/* Brian Story Section */}
      <BrianStorySection />

      {/* Quote Section */}
      <QuoteSection />

      {/* What You Will Learn Section */}
      <WhatYouWillLearnSection />

      {/* Work Less Earn More Section */}
      <WorkLessEarnMoreSection />

      {/* Footer */}
      <Footer />
    </>
  );
}
