import Image from "next/image";

interface AttractDontChaseSectionProps {
  plusIconSrc?: string;
  peopleIconSrc?: string;
  content?: Record<string, string>;
}

export default function AttractDontChaseSection({ plusIconSrc = "/images/plus_icon.png", peopleIconSrc = "/images/people_icon.png", content = {} }: AttractDontChaseSectionProps) {
  return (
    <section className="relative bg-white py-16 md:py-24">
      <div className="w-full mx-auto max-w-[92%] px-[3px] lg:px-[2px]">
        {/* Why "Attract, Don't Chase" Wins Section */}
        <div className="text-center mb-16">
          <h2 className="text-black font-bold text-xl md:text-2xl lg:text-3xl mb-4 max-w-3xl mx-auto leading-snug tracking-tight whitespace-pre-line">
            {content["attract.heading"] || "Why The Opposite of What You've Been Taught\nWorks 1,000x Better!"}
          </h2>
          <p className="text-black font-normal text-base md:text-lg lg:text-xl mb-6 max-w-3xl mx-auto leading-relaxed">
            {content["attract.subheading"] || "Invert the Pyramid... or You'll Spend The Rest of Your Life Chasing What Should Be Chasing You."}
          </p>
          <p className="text-black font-normal text-sm md:text-base lg:text-lg max-w-3xl mx-auto mb-4 leading-relaxed">
            {[content["attract.intro1"] || "You've been told the path to success is cold calls, door knocking, and relentless hustle. But what if the real power move is doing less of what burns you out, and more of what brings results?", content["attract.intro2"]].filter(Boolean).join(" ")}
          </p>
          <p className="text-black text-lg md:text-xl lg:text-2xl font-medium">
            {content["attract.proofLabel"] || "Here's the proof:"}
          </p>
        </div>

        {/* Proof/Benefits Section */}
        <div className="max-w-5xl mx-auto mb-16">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Left Box: Spend Less, Earn More */}
            <div className="relative rounded-lg p-8 md:p-10 overflow-hidden">
            {/* Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-blue-100 via-blue-50 to-white"></div>
            <div className="relative z-10">
              <div className="flex items-start gap-4 mb-6">
                <div className="relative w-12 h-12 flex-shrink-0">
                  <Image
                    src={plusIconSrc}
                    alt="Plus icon"
                    fill
                    sizes="48px"
                    className="object-contain"
                  />
                </div>
                <h3 className="font-bold text-xl md:text-2xl lg:text-3xl" style={{ color: '#1568F7' }}>
                  {content["attract.spendLess.title"] || "Spend Less, Earn More"}
                </h3>
              </div>
              <div className="space-y-4">
                <p className="text-black text-base md:text-lg leading-relaxed">
                  {content["attract.spendLess.p1"] || "We help you dramatically cut costs - starting with your cost per lead and cost per sale. By leveraging proven best practices, low cost and free lead sources available to you and smarter strategies, you get a higher ROI without relying on expensive 3rd party platforms or having to pay hefty referral fees."}
                </p>
                <p className="text-black text-base md:text-lg leading-relaxed">
                  {content["attract.spendLess.p2"] || "Instead of building these 3rd party's brands, you'll optimize everything you're already doing and strengthen your own brand, positioning yourself as a dominant player in your market."}
                </p>
              </div>
            </div>
          </div>

          {/* Right Box: Work With People Who Are Ready to Act */}
          <div className="relative rounded-lg p-8 md:p-10 overflow-hidden">
            {/* Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-blue-100 via-blue-50 to-white"></div>
            <div className="relative z-10">
              <div className="flex items-start gap-4 mb-6">
                <div className="relative w-12 h-12 flex-shrink-0">
                  <Image
                    src={peopleIconSrc}
                    alt="People icon"
                    fill
                    sizes="48px"
                    className="object-contain"
                  />
                </div>
                <h3 className="font-bold text-xl md:text-2xl lg:text-3xl" style={{ color: '#1568F7' }}>
                  {content["attract.readyToAct.title"] || "Work With People Who Are Ready to Act"}
                </h3>
              </div>
              <div className="space-y-4">
                <p className="text-black text-base md:text-lg leading-relaxed">
                  {content["attract.readyToAct.p1"] || "Understand there is a huge difference between people and people who are actually thinking of buying or selling... Most Realtors are trained to prospect people. That is massively time consuming!"}
                </p>
                <p className="text-black text-base md:text-lg leading-relaxed">
                  {content["attract.readyToAct.p2"] || "Imagine being able to only have to talk to people who are already thinking about buying or selling..."}
                </p>
                <p className="text-black text-base md:text-lg leading-relaxed">
                  {content["attract.readyToAct.p3"] || "Exhausting follow up goes way down, conversion goes way up! When you are talking to the right people (buyers and sellers) you can talk to far fewer and sell a ton more homes!"}
                </p>
              </div>
            </div>
          </div>
          </div>
        </div>

        {/* Call to Action Footer */}
        <div className="text-center max-w-5xl mx-auto">
          <p className="text-black text-lg md:text-xl lg:text-2xl mb-4 leading-relaxed">
            {content["attract.cta1"] || "This isn't difficult, it's time to Stop thinking like a Realtor and create a business that is consistent, predictable and serves your life."}
          </p>
          <p className="text-black font-bold text-2xl md:text-3xl lg:text-4xl mb-12">
            {content["attract.cta2"] || "Ready to Make the Transformation?"}
          </p>
          <div className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
            {/* Inner Circle Card */}
            <div className="bg-gray-50 rounded-2xl p-6 md:p-8 border border-gray-200 shadow-sm hover:shadow-md transition-shadow flex flex-col">
              <div className="flex-grow">
                <p className="text-black text-sm md:text-base leading-relaxed">
                  {content["attract.card1.desc"] || "For the agent producing 0-15 sales annually, income is under $200,000 and they want a system and process that's predictable, reliable and duplicatable to produce more FAST!"}
                </p>
              </div>
              <div className="mt-auto pt-6">
                <a
                  href={content["attract.card1.url"] || "https://inner-circle.brianmoses.com/how-to-get-3-new-listings-fast-page"}
                  className="block"
                >
                  <button className="w-full rounded-full bg-black text-white px-6 py-4 text-base md:text-lg font-semibold hover:bg-gray-900 transition-colors">
                    {content["attract.card1.buttonText"] || "Inner Circle Group Coaching"}
                  </button>
                </a>
              </div>
            </div>
            
            {/* 1-on-1 Coaching Card */}
            <div className="bg-gray-50 rounded-2xl p-6 md:p-8 border border-gray-200 shadow-sm hover:shadow-md transition-shadow flex flex-col">
              <div className="flex-grow">
                <p className="text-black text-sm md:text-base leading-relaxed">
                  {content["attract.card2.desc"] || "For the Producer and/or Team Leader doing $200,000+ a year, wants more but without giving up their life. This is a 1 on 1 experience that will transform your business and life at scale. Apply for your free business evaluation call and secure your spot today."}
                </p>
              </div>
              <div className="mt-auto pt-6">
                <a
                  href={content["attract.card2.url"] || "https://calendly.com/coachbrianmoses/30-minute-business-assessment-clone"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <button className="w-full rounded-full bg-black text-white px-6 py-4 text-base md:text-lg font-semibold hover:bg-gray-900 transition-colors">
                    {content["attract.card2.buttonText"] || "Apply Now"}
                  </button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

