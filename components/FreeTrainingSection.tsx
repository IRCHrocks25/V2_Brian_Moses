import Image from "next/image";

export default function FreeTrainingSection() {
  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/free training.png"
          alt="Free training background"
          fill
          className="object-cover object-center"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Section */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="h-2 w-2 bg-white"></span>
              <span className="text-white text-sm md:text-base font-medium uppercase tracking-wide">
                FREE TRAINING
              </span>
            </div>

            <h2 className="text-white font-bold text-3xl md:text-4xl lg:text-5xl mb-6">
              How to get listings fast
            </h2>

            <p className="text-white text-base md:text-lg lg:text-xl leading-relaxed mb-8">
              Want to attract listings without chasing, cold calling, or wasting money on branding? Download the free training that reveals the strategy Brian used to close over 3,500 deals.
            </p>

            <button className="rounded-full bg-[#F5E6D3] text-black px-8 py-4 text-base md:text-lg font-medium hover:bg-[#F5E6D3]/90 transition-colors">
              Download the Free Training
            </button>
          </div>

          {/* Right Section */}
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="mt-1">
                <svg
                  className="w-6 h-6 text-[#2aa7ff]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <p className="text-white text-base md:text-lg leading-relaxed">
                Discover how to position yourself as the expert sellers want to hire.
              </p>
            </div>

            <div className="flex items-start gap-4">
              <div className="mt-1">
                <svg
                  className="w-6 h-6 text-[#2aa7ff]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <p className="text-white text-base md:text-lg leading-relaxed">
                Learn messaging that gets you in the door without being pushy.
              </p>
            </div>

            <div className="flex items-start gap-4">
              <div className="mt-1">
                <svg
                  className="w-6 h-6 text-[#2aa7ff]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <p className="text-white text-base md:text-lg leading-relaxed">
                Implement a simple, actionable strategy today.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

