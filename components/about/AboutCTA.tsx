import Link from "next/link";

export default function AboutCTA() {
  return (
    <section className="w-full max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 px-4 mt-16 md:mt-24 mb-24">
      {/* Coaching CTA Card (Block A) */}
      <div className="bg-[linear-gradient(173.7deg,#051C47_3.1%,#000614_90.55%)] border border-[rgba(65,71,84,0.2)] rounded-[48px] p-8 md:p-12 flex flex-col h-full shadow-2xl relative">
        {/* Content Container */}
        <div className="flex flex-col items-start gap-6 pb-8 flex-grow w-full max-w-[526px] mx-auto">
          {/* Overlay Icon */}
          <div className="w-12 h-12 bg-[rgba(0,112,243,0.1)] rounded-full flex items-center justify-center flex-shrink-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="#0070F3"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M12 2.25V5.5m0 0v-3.25m0 3.25l-2.25 2.25m2.25-2.25l2.25 2.25"
              />
            </svg>
          </div>

          {/* Heading 3 */}
          <h3 className="text-white text-3xl md:text-3xl font-medium leading-[1.2] md:leading-9 tracking-tighter w-full">
            Ready to stop chasing and start attracting?
          </h3>

          {/* Paragraph */}
          <p className="text-[#94A3B8] text-lg md:text-2xl font-normal leading-[1.4] md:leading-7 w-full">
            Join the elite agents using the &ldquo;Exact Playbook&rdquo; to scale to 7 and 8-figure commissions without the grind.
          </p>
        </div>

        {/* Button */}
        <div className="w-full max-w-[526px] mx-auto">
          <Link
            href="/"
            className="w-full flex items-center justify-center gap-2 bg-white text-black py-4 h-14 rounded-full text-sm md:text-base font-semibold tracking-wider uppercase hover:bg-gray-200 transition-colors mt-auto"
          >
            Explore Coaching Programs
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="3"
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
              />
            </svg>
          </Link>
        </div>
      </div>

      {/* Speaking CTA Card (Block B) */}
      <div className="bg-[linear-gradient(173.7deg,#051C47_3.1%,#000614_90.55%)] border border-[rgba(65,71,84,0.2)] rounded-[48px] p-8 md:p-12 flex flex-col h-full shadow-2xl relative">
        {/* Content Container */}
        <div className="flex flex-col items-start gap-6 pb-8 flex-grow w-full max-w-[526px] mx-auto">
          {/* Overlay Icon */}
          <div className="w-12 h-12 bg-[rgba(0,112,243,0.1)] rounded-full flex items-center justify-center flex-shrink-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="#0070F3"
              className="w-4 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z"
              />
            </svg>
          </div>

          {/* Heading 3 */}
          <h3 className="text-white text-3xl md:text-3xl font-medium leading-[1.2] md:leading-9 tracking-tighter w-full">
            Book Brian for your stage.
          </h3>

          {/* Paragraph */}
          <p className="text-[#94A3B8] text-lg md:text-2xl font-normal leading-[1.4] md:leading-7 w-full">
            Transform your organization with a keynote that blends raw storytelling with tactical business architecture.
          </p>
        </div>

        {/* Button */}
        <div className="w-full max-w-[526px] mx-auto">
          <Link
            href="/keynote"
            className="w-full flex items-center justify-center gap-2 bg-transparent border-2 border-[#0070F3] text-[#0070F3] py-4 h-[60px] rounded-full text-sm md:text-base font-semibold tracking-wider uppercase hover:bg-[#0070F3]/10 transition-colors mt-auto"
          >
            Inquire About Speaking
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="3"
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
