"use client";

import Image from "next/image";
import { useState } from "react";

const outcomes = [
  {
    icon: "filled",
    title: "Immediately Increase Your Sales",
    description:
      "Learn strategies to 'reduce your wasteful expenses and increase your sales and income immediately'",
  },
  {
    icon: "outline",
    title: "Dominate Your Local Market",
    description:
      "Discover how to 'attract buyers and sellers, differentiate yourself from your competitors, increase your average sales price, and become the dominant agent in your market!'",
  },
  {
    icon: "outline",
    title: "Build a Predictable Business",
    description:
      "Create a real estate business that offers 'predictability' and allows you to 'take time off,' freeing you from being constantly on call.",
  },
  {
    icon: "outline",
    title: "Create the Life You Desire",
    description:
      "Design 'the business and life you desire', achieving financial freedom that serves your overall happiness.",
  },
  {
    icon: "outline",
    title: "Attract Lots of Qualified Leads",
    description:
      "Implement 'strategies, principals and quality lead generation best practices that will accelerate your income and transform your life!'. Ensure a 'consistent flow, a steady stream of highly motivated leads' right to you.",
  },
];

export default function TypicalOutcomesSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(0);

  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/background.png"
          alt="Background"
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[95%] px-6 lg:px-8">

        {/* TYPICAL OUTCOMES Heading */}
        <div className="flex items-center justify-center gap-3 mb-8">
          {/* Two overlapping circles */}
          <div className="relative flex items-center">
            <div className="w-3 h-3 bg-blue-300 rounded-full absolute left-0"></div>
            <div className="w-3 h-3 bg-[#2aa7ff] rounded-full relative left-1.5"></div>
          </div>
          <h3 className="text-[#2aa7ff] text-sm md:text-base uppercase tracking-wider font-medium">
            TYPICAL OUTCOMES
          </h3>
        </div>

        {/* Main Heading */}
        <h2 className="text-center text-white font-bold text-2xl md:text-3xl lg:text-4xl xl:text-5xl mb-4 leading-tight">
          Your Growth Deserves More Than Advice.
        </h2>
        <h2 className="text-center text-white font-bold text-2xl md:text-3xl lg:text-4xl xl:text-5xl mb-6 leading-tight">
          It Deserves Proven Experience.
        </h2>
        <h3 className="text-center text-[#2aa7ff] font-bold text-xl md:text-2xl lg:text-3xl mb-12">
          The Real Estate Coach You Hire Matters!
        </h3>

        {/* Opening Statement - Card Style */}
        <div className="max-w-5xl mx-auto mb-12">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-white/20">
            <p className="text-white text-lg md:text-xl lg:text-2xl text-left leading-relaxed font-medium">
              Just like there&apos;s no shortage of real estate agents, there&apos;s no shortage of self proclaimed coaches... <span className="text-[#2aa7ff] font-bold">The difference comes down to experience.</span>
            </p>
          </div>
        </div>

        {/* Key Achievements - Visual Cards */}
        <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6 mb-12 max-w-6xl mx-auto">
          {/* Achievement Card 1 */}
          <div className="bg-gradient-to-br from-[#2aa7ff]/20 to-[#1568F7]/20 backdrop-blur-sm rounded-xl p-6 border border-[#2aa7ff]/30">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-[#2aa7ff] mb-2">3,500+</div>
              <div className="text-white text-sm md:text-base font-medium">Homes Sold</div>
            </div>
          </div>
          
          {/* Achievement Card 2 */}
          <div className="bg-gradient-to-br from-[#2aa7ff]/20 to-[#1568F7]/20 backdrop-blur-sm rounded-xl p-6 border border-[#2aa7ff]/30">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-[#2aa7ff] mb-2">#2</div>
              <div className="text-white text-sm md:text-base font-medium">Worldwide Ranking</div>
              <div className="text-white/80 text-xs mt-1">7 Years Top 10</div>
            </div>
          </div>
          
          {/* Achievement Card 3 */}
          <div className="bg-gradient-to-br from-[#2aa7ff]/20 to-[#1568F7]/20 backdrop-blur-sm rounded-xl p-6 border border-[#2aa7ff]/30">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-[#2aa7ff] mb-2">30+</div>
              <div className="text-white text-sm md:text-base font-medium">Years Experience</div>
              <div className="text-white/80 text-xs mt-1">
                Named one of the 125 Most Influential People in Real Estate &mdash; Success Magazine
              </div>
            </div>
          </div>

          {/* Achievement Card 4 */}
          <div className="bg-gradient-to-br from-[#2aa7ff]/20 to-[#1568F7]/20 backdrop-blur-sm rounded-xl p-6 border border-[#2aa7ff]/30">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-[#2aa7ff] mb-2">20k+</div>
              <div className="text-white text-sm md:text-base font-medium">Trained Industry Wide</div>
            </div>
          </div>

          {/* Achievement Card 5 */}
          <div className="bg-gradient-to-br from-[#2aa7ff]/20 to-[#1568F7]/20 backdrop-blur-sm rounded-xl p-6 border border-[#2aa7ff]/30">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-[#2aa7ff] mb-2">$1M+</div>
              <div className="text-white text-sm md:text-base font-medium">Annual Income</div>
              <div className="text-white/80 text-xs mt-1">
                Brian&apos;s one-on-one coaching clients Average Over a Million Dollars in Income per Year!
              </div>
            </div>
          </div>
        </div>

        {/* Main Content - Split into Visual Sections */}
        <div className="max-w-5xl mx-auto space-y-8 mb-16">
          {/* Section 1 - The Problem */}
          <div className="bg-white/5 rounded-xl p-6 md:p-8 border-l-4 border-[#2aa7ff]">
            <h4 className="text-white font-bold text-lg md:text-xl mb-4">When Choosing a Coach, Experience Matters</h4>
            <p className="text-white/90 text-base md:text-lg leading-relaxed mb-4">
              It matters whether they&apos;ve actually accomplished what you&apos;re trying to achieve - or whether they&apos;re simply repeating what they&apos;ve been taught.
            </p>
            <p className="text-white/90 text-base md:text-lg leading-relaxed">
              Many large coaching organizations rely on active agents to coach on the side. While well intended, their guidance is often limited to personal experience and constrained by their own production demands.
            </p>
          </div>

          {/* Section 2 - Brian's Depth */}
          <div className="bg-gradient-to-r from-[#2aa7ff]/10 to-transparent rounded-xl p-6 md:p-8 border border-[#2aa7ff]/20">
            <h4 className="text-[#2aa7ff] font-bold text-lg md:text-xl mb-4 flex items-center gap-2">
              <span className="w-2 h-2 bg-[#2aa7ff] rounded-full"></span>
              Brian Moses Brings a Different Level of Depth
            </h4>
            <p className="text-white text-base md:text-lg leading-relaxed mb-4">
              He has sold more than <span className="font-bold text-[#2aa7ff]">3,500 homes</span>, twice been ranked <span className="font-bold text-[#2aa7ff]">#2 worldwide</span> and amongst the <span className="font-bold text-[#2aa7ff]">top 10 in sales for seven consecutive years</span>.
            </p>
            <p className="text-white text-base md:text-lg leading-relaxed">
              Beyond production, Brian worked directly for <span className="font-semibold">Tony Robbins & Chet Holmes</span> at Business Breakthroughs International as a <span className="font-semibold">Sr. Level Executive Business Strategist</span>, gaining elite training in business optimization, scalability and performance maximization.
            </p>
          </div>

          {/* Section 3 - Customized Approach */}
          <div className="bg-white/5 rounded-xl p-6 md:p-8">
            <h4 className="text-white font-bold text-lg md:text-xl mb-4">No One-Size-Fits-All Approach</h4>
            <p className="text-white/90 text-base md:text-lg leading-relaxed">
              When it comes to growing and scaling your business. Brian&apos;s customizes your coaching to the agent, their goals and is specific to their market, resulting in a sustainable system, measured results and increased profitability.
            </p>
          </div>

          {/* Section 4 - Human Performance */}
          <div className="bg-gradient-to-r from-transparent to-[#2aa7ff]/10 rounded-xl p-6 md:p-8 border border-[#2aa7ff]/20 overflow-hidden">
            <div className="grid md:grid-cols-2 gap-6 md:gap-8 items-start">
              {/* Text Content */}
              <div className="flex flex-col justify-center">
                <h4 className="text-[#2aa7ff] font-bold text-lg md:text-xl mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 bg-[#2aa7ff] rounded-full"></span>
                  Mastering Human Performance
                </h4>
                <p className="text-white text-base md:text-lg leading-relaxed">
                  Beyond production and strategy, lasting growth requires mastering human performance. For more than <span className="font-bold text-[#2aa7ff]">30 years</span> Brian has worked in close alignment with <span className="font-semibold">Tony Robbins and Robbins Research International</span>, developing deep expertise in human psychology, behavior change and peak performance. This added skill and experience allows him to identify the real constraints holding agents back - often not market conditions or lead flow but unseen limiting beliefs, comfort zones and unconscious patterns that sabotage growth.
                </p>
              </div>
              
              {/* Image */}
              <div className="relative w-full h-[300px] md:h-[350px] lg:h-[400px] rounded-xl overflow-hidden border-2 border-[#2aa7ff]/30 shadow-[0_20px_60px_rgba(42,167,255,0.3)] flex-shrink-0">
                <Image
                  src="/images/brian18.png"
                  alt="Brian Moses"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 600px"
                  className="object-cover"
                  style={{ objectPosition: 'center center' }}
                  priority
                />
                {/* Subtle gradient overlay for depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
              </div>
            </div>
          </div>

          {/* Closing Statement */}
          <div className="text-center bg-[#2aa7ff]/10 rounded-xl p-6 md:p-8 border-2 border-[#2aa7ff]/30">
            <p className="text-white text-lg md:text-xl lg:text-2xl font-semibold">
              His Strategies have been proven repeatedly through the success of the <span className="text-[#2aa7ff] font-bold">thousands</span> he has impacted over the years.
            </p>
          </div>
        </div>

        {/* Outcomes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-8 md:gap-10 lg:gap-12 mb-12 items-stretch">
          {outcomes.map((outcome, index) => (
            <div 
              key={index} 
              className="flex flex-col h-full"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(0)}
            >
              {/* Icon and Title */}
              <div className="flex items-start gap-3 mb-3 flex-shrink-0">
                <div className="h-6 flex-shrink-0 mt-1">
                  {hoveredIndex === index ? (
                    <div className="w-6 h-6 bg-[#2aa7ff] rounded-full"></div>
                  ) : (
                    <div className="w-6 h-6 border-2 border-[#2aa7ff] rounded-full"></div>
                  )}
                </div>
                <h3 className="text-white font-bold text-lg md:text-xl flex-1">
                  {outcome.title}
                </h3>
              </div>

              {/* Description */}
              <p className="text-white/90 text-sm md:text-base leading-[1.6] flex-grow">
                {outcome.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            {/* Inner Circle Card */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-white/20 shadow-lg hover:shadow-xl transition-shadow flex flex-col">
              <div className="flex-grow">
                <p className="text-white text-sm md:text-base leading-relaxed mb-4">
                For the agent producing 0-15 sales annually,  income is under $200,000 and they want a system and process that&apos;s predictable, reliable and duplicatable to produce more FAST!  
                </p>
              </div>
              <div className="mt-auto pt-6">
                <button className="w-full rounded-full bg-white text-black px-6 py-4 text-base md:text-lg font-semibold hover:bg-gray-100 transition-colors">
                  Inner Circle Group Coaching
                </button>
              </div>
            </div>
            
            {/* 1-on-1 Coaching Card */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-white/20 shadow-lg hover:shadow-xl transition-shadow flex flex-col">
              <div className="flex-grow">
                <p className="text-white text-sm md:text-base leading-relaxed mb-4">
                For the Producer and/or Team Leader doing $200,000+ a year, wants more but without giving up their life.  This is a 1 on 1 experience that will transform your business and life at scale.  Apply for your free business evaluation call and secure your spot today.
                </p>
              </div>
              <div className="mt-auto pt-6">
                <button className="w-full rounded-full bg-white text-black px-6 py-4 text-base md:text-lg font-semibold hover:bg-gray-100 transition-colors">
                  Apply Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

