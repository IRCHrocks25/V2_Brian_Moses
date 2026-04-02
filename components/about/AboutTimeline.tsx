interface TimelineItem {
  title: string;
  description: string;
}

interface AboutTimelineProps {
  tagline?: string;
  heading?: string;
  items?: TimelineItem[];
}

export default function AboutTimeline({
  tagline = "The Journey",
  heading = "Every setback was a setup.",
  items = [
    { title: "Age 3", description: "Abandoned by father; raised in public housing. Survival mode begins." },
    { title: "Age 28", description: "$40,000 in debt, working 3 jobs, living in a basement. Rock bottom reached." },
    { title: "Early Career", description: "Earned just $18k in first year of real estate. Realizes \"hustle\" is a lie." },
    { title: "Growth", description: "Self-taught in marketing/psychology. Commissions jump to $250k, then $1M+." },
    { title: "Peak Production", description: "Ranked #2 Worldwide for Coldwell Banker. Selling 400 homes annually." },
    { title: "Personal Victory", description: "Buys his mother a home, ending the cycle of housing insecurity." },
    { title: "Now", description: "Coached 50,000+ people globally. Turning his \"mess into a message.\"" },
  ],
}: AboutTimelineProps) {
  return (
    <section className="relative w-full overflow-hidden py-16 md:py-32 px-4 md:px-8 flex flex-col gap-20">
      <div className="absolute top-[-610px] left-1/2 transform -translate-x-1/2 w-[2077px] max-w-none h-[714px] bg-[#03329F] rounded-[100%] blur-[200px] pointer-events-none"></div>

      <div className="relative z-10 flex flex-col items-center gap-4 w-full max-w-[1300px] mx-auto">
        <div className="flex items-center gap-[10px]">
          <div className="relative w-4 h-2.5">
            <div className="absolute left-0 top-0.5 w-2.5 h-2.5 rounded-full bg-[#AADBFF]"></div>
            <div className="absolute left-[6px] top-0.5 w-2.5 h-2.5 rounded-full bg-[#1568F7]"></div>
          </div>
          <span className="text-[#1568F7] text-base md:text-2xl font-medium leading-[25px] tracking-widest uppercase">
            {tagline}
          </span>
        </div>
        <h2 className="text-4xl md:text-[64px] font-medium text-white leading-[1.1] md:leading-[60px] tracking-tight text-center w-full">
          {heading}
        </h2>
      </div>

      <div className="relative z-10 w-full max-w-[1216px] mx-auto">
        <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-[1px] h-full bg-[rgba(161,161,161,0.3)]"></div>
        <div className="md:hidden absolute left-4 w-[1px] h-full bg-[rgba(161,161,161,0.3)]"></div>

        <div className="flex flex-col gap-10 md:gap-16">
          {items.map((item, index) => {
            const isEven = index % 2 === 1;
            return (
              <div
                key={index}
                className={`relative flex md:justify-between items-center w-full min-h-[92px] ${isEven ? "md:flex-row-reverse" : ""
                  }`}
              >
                <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 w-4 h-4 bg-[#1568F7] rounded-full shadow-[0_0_15px_rgba(0,112,243,0.8)] z-10"></div>

                <div
                  className={`w-full md:w-[600px] pl-10 md:pl-0 ${isEven ? "md:pl-16" : "md:pr-16"
                    } flex flex-col items-start ${!isEven ? "md:items-end" : ""
                    } gap-2`}
                >
                  <h3 className={`text-2xl md:text-3xl font-medium text-[#1568F7] leading-7 ${!isEven ? "md:text-right" : ""
                    }`}>
                    {item.title}
                  </h3>
                  <p className={`about-body-text text-[#CFCFCF] ${!isEven ? "md:text-right" : ""
                    } max-w-[536px]`}>
                    {item.description}
                  </p>
                </div>
                <div className="hidden md:block w-[600px]"></div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
