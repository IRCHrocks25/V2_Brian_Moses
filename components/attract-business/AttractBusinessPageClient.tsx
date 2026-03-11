"use client";
import { useState, useEffect, useRef } from "react";

// ─── Brian photo - customizable via content ─────────────────────────────────
const BrianPhoto = ({ src = "/Brian_Moses.png" }: { src?: string }) => (
  <div className="relative w-full aspect-[3/4] overflow-hidden rounded-2xl">
    <img
      src={src}
      alt="Brian Moses — Real Estate Coach"
      className="w-full h-full object-cover"
      style={{ objectPosition: "left top" }}
    />
    <div className="absolute inset-0 bg-gradient-to-t from-[#080c1f] via-[#080c1f]/30 to-transparent" />
  </div>
);

const Stat = ({ value, label }: { value: string; label: string }) => (
  <div className="flex flex-col items-center gap-0.5 px-4 py-3 rounded-xl border border-white/10 bg-white/[0.04] backdrop-blur min-w-[90px]">
    <span className="text-2xl font-black text-white leading-none">{value}</span>
    <span className="text-[10px] uppercase tracking-[0.18em] text-white/50 text-center leading-tight">{label}</span>
  </div>
);

const Check = ({ children }: { children: React.ReactNode }) => (
  <li className="flex items-start gap-3 group">
    <span className="mt-0.5 flex-none w-5 h-5 rounded-full border border-sky-500/40 bg-sky-600/15 flex items-center justify-center">
      <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
        <path d="M1 4L3.5 6.5L9 1" stroke="#38bdf8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </span>
    <span className="text-sm sm:text-base text-white/75 leading-snug group-hover:text-white/90 transition-colors">{children}</span>
  </li>
);

interface AttractBusinessPageClientProps {
  heroImageSrc?: string;
}

export default function AttractBusinessPageClient({ heroImageSrc = "/Brian_Moses.png" }: AttractBusinessPageClientProps) {
  const [scrolled, setScrolled] = useState(false);
  const formRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToForm = () => formRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });

  return (
    <div className="min-h-screen bg-[#080c1f] text-white overflow-x-hidden" style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}>

      {/* HERO */}
      <section className="relative min-h-[100svh] flex flex-col justify-center pt-10 pb-20 overflow-hidden">

        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 opacity-[0.035]" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
            backgroundSize: '256px',
          }} />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[700px] bg-blue-800/15 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-sky-900/12 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-900/15 rounded-full blur-[100px]" />
          <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
            <line x1="0" y1="0" x2="100%" y2="100%" stroke="rgba(21,94,239,0.04)" strokeWidth="1"/>
            <line x1="100%" y1="0" x2="0" y2="100%" stroke="rgba(21,94,239,0.03)" strokeWidth="1"/>
          </svg>
        </div>

        <div className="relative z-10 mx-auto max-w-6xl w-full px-6">
          <div className="grid lg:grid-cols-[1fr_420px] gap-12 lg:gap-16 items-center">

            {/* ── LEFT ── */}
            <div className="flex flex-col gap-7">
              <div className="flex items-center gap-3">
                <span className="w-8 h-px bg-sky-500" />
                <span className="text-[10px] uppercase tracking-[0.3em] text-sky-400 font-semibold" style={{ fontFamily: "system-ui, sans-serif" }}>Free Agent Training</span>
              </div>

                <div>
                 <h1 className="text-[clamp(2.1rem,5.2vw,4.4rem)] font-black leading-[0.96] tracking-tight text-white">
                  How to Attract Business Now &amp;
                </h1>
                 <h1 className="text-[clamp(2.1rem,5.2vw,4.4rem)] font-black leading-[0.96] tracking-tight text-sky-400 mt-2">
                  Stop Having to Chase it
                </h1>
              </div>

              <p className="text-xs sm:text-sm text-white/55 max-w-xl leading-relaxed uppercase tracking-widest font-semibold" style={{ fontFamily: "system-ui, sans-serif" }}>
                No more Dialing for Dollars, Door Knocking, Farming, Chasing Your SOI or Working More Hours — Learn Why the Opposite Works <span className="text-white">1,000X Better</span>
              </p>

              <p className="text-base sm:text-lg text-white/65 max-w-xl leading-relaxed" style={{ fontFamily: "system-ui, sans-serif" }}>
                This free training shows the exact attraction strategies, messaging, and offers I used to sell over{" "}
                <span className="text-white font-semibold">400 homes a year</span>, and how serious agents are using them right now to create listings on demand.
              </p>

              <div className="flex flex-wrap gap-3">
                <Stat value="400+" label="Homes/Year" />
                <Stat value="Top 10" label="Worldwide" />
                <Stat value="0" label="Cold Calls" />
              </div>

              <button
                onClick={scrollToForm}
                className="lg:hidden inline-flex items-center gap-2 self-start rounded-full bg-[#155EEF] px-7 py-3.5 text-sm font-bold uppercase tracking-[0.15em] text-white shadow-[0_16px_48px_rgba(21,94,239,0.5)] hover:bg-blue-500 transition-all hover:shadow-[0_20px_60px_rgba(21,94,239,0.7)]"
                style={{ fontFamily: "system-ui, sans-serif" }}
              >
                Get Instant Access to Your Free Training
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2 7H12M12 7L7.5 2.5M12 7L7.5 11.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>

            {/* ── RIGHT: centered iframe form ── */}
            <div ref={formRef} className="relative flex justify-center mt-4 md:mt-6">
              <iframe
                src="https://link.attractzen.com/widget/form/7Dt2GYTU6936ZnIfyD2z"
                className="w-full max-w-md h-[620px] rounded-2xl shadow-[0_18px_40px_rgba(15,23,42,0.45)]"
                style={{ border: "none" }}
                loading="lazy"
                title="How to Attract Business Now – Free Training"
              />
            </div>

          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30 animate-bounce">
          <span className="text-[9px] uppercase tracking-[0.3em] text-white" style={{ fontFamily: "system-ui, sans-serif" }}>Scroll</span>
          <svg width="14" height="20" viewBox="0 0 14 20" fill="none">
            <rect x="1" y="1" width="12" height="18" rx="6" stroke="white" strokeWidth="1"/>
            <circle cx="7" cy="6" r="2" fill="white"/>
          </svg>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          PROBLEM SECTION
      ══════════════════════════════════════════════════ */}
      <section className="relative border-t border-white/[0.06] py-24 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[600px] h-[400px] bg-blue-900/10 rounded-full blur-[120px]" />
        </div>

        <div className="relative z-10 mx-auto max-w-6xl px-6">
          <div className="grid lg:grid-cols-[1fr_1fr] gap-16 lg:gap-20 items-center">

            <div className="relative order-last lg:order-first">
              <div className="absolute -inset-4 bg-sky-600/5 rounded-3xl blur-2xl" />
              <BrianPhoto src={heroImageSrc} />
            </div>

            <div className="flex flex-col gap-8">
              <div>
                <span className="flex items-center gap-3 mb-5">
                  <span className="w-8 h-px bg-sky-500" />
                  <span className="text-[10px] uppercase tracking-[0.3em] text-sky-400 font-semibold" style={{ fontFamily: "system-ui, sans-serif" }}>The Real Problem</span>
                </span>
                 <h2 className="text-3xl sm:text-4xl md:text-5xl font-black leading-[0.95] text-white">
                   If You&apos;re Working Hard But Listings Feel Random,{" "}
                   <span className="italic font-light text-white/40">This&nbsp;Is&nbsp;Why</span>
                 </h2>
              </div>

              <div className="space-y-4" style={{ fontFamily: "system-ui, sans-serif" }}>
                <p className="text-base sm:text-lg text-white/70 leading-relaxed">
                  Most agents do not have a work ethic problem. They have a <span className="text-white font-semibold">leverage problem</span>. You are relying on too few lead sources, too much hope, and strategies that only work when the market cooperates.
                </p>

                <div className="space-y-1 text-sm sm:text-base text-white/60">
                  <p>That is why listings feel inconsistent.</p>
                  <p>That is why income goes up and down.</p>
                  <p>That is why you feel like you are always starting over.</p>
                </div>

                <div className="grid grid-cols-3 gap-3 mt-4">
                  {[
                    { icon: "📉", label: "Inconsistent listings" },
                    { icon: "🎢", label: "Income up & down" },
                    { icon: "🔁", label: "Always starting over" },
                  ].map(({ icon, label }) => (
                    <div key={label} className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-4 text-center">
                      <p className="text-2xl mb-2">{icon}</p>
                      <p className="text-xs text-white/55 leading-tight">{label}</p>
                    </div>
                  ))}
                </div>

                <p className="text-sky-400/80 font-medium text-sm sm:text-base border-l-2 border-sky-500/40 pl-4 mt-4">
                  This training shows how to replace randomness with control.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          WHAT YOU'LL LEARN
      ══════════════════════════════════════════════════ */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[#060a1c] pointer-events-none" />
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-800/8 rounded-full blur-[140px]" />
        </div>

        <div className="relative z-10 mx-auto max-w-6xl px-6">
          <div className="flex flex-col items-center text-center mb-16">
            <span className="flex items-center gap-3 mb-5">
              <span className="w-8 h-px bg-sky-500" />
              <span className="text-[10px] uppercase tracking-[0.3em] text-sky-400 font-semibold" style={{ fontFamily: "system-ui, sans-serif" }}>Inside the Training</span>
              <span className="w-8 h-px bg-sky-500" />
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight text-white max-w-2xl">
              What You&apos;ll Learn Inside{" "}
              <span className="italic font-light text-white/35">This Free Training</span>
            </h2>
            <p className="mt-4 text-white/50 text-base max-w-xl" style={{ fontFamily: "system-ui, sans-serif" }}>No theory. No motivation. Just what works.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                num: "01",
                title: "How to get sellers to identify themselves before you ever call them",
                body: "Qualified sellers raise their hand before you ever need to reach out.",
              },
              {
                num: "02",
                title: "The messaging mistake that quietly kills most marketing",
                body: "One shift in how you frame your offer changes everything about who responds — and how fast.",
              },
              {
                num: "03",
                title: "How to create offers that make prospects raise their hand",
                body: "Craft micro-offers that attract serious sellers and disqualify time-wasters automatically.",
              },
              {
                num: "04",
                title: "Why more leads will not fix a broken conversion system",
                body: "Pouring leads into a broken system is like filling a leaky bucket. Fix the leak first.",
              },
              {
                num: "05",
                title: "How top agents build multiple listing channels, not just one",
                body: "Top agents don't rely on a single source. Learn how to build a diversified, compounding pipeline.",
              },
              {
                num: "06",
                title: "The difference between chasing business and attracting it",
                body: "The agents winning in any market have one thing in common. This training makes it concrete and actionable.",
              },
            ].map(({ num, title, body }) => (
              <div
                key={num}
                className="group relative rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 hover:border-sky-500/30 hover:bg-white/[0.05] transition-all duration-300"
              >
                <p className="text-4xl font-black text-white/[0.06] leading-none mb-4 group-hover:text-sky-500/15 transition-colors">{num}</p>
                <h3 className="text-base font-bold text-white leading-snug mb-2">{title}</h3>
                <p className="text-sm text-white/50 leading-relaxed" style={{ fontFamily: "system-ui, sans-serif" }}>{body}</p>
                <div className="absolute bottom-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-sky-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          WHO IT'S FOR
      ══════════════════════════════════════════════════ */}
      <section className="relative py-24 border-t border-white/[0.06]">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute bottom-0 left-0 w-[500px] h-[300px] bg-blue-900/10 rounded-full blur-[100px]" />
        </div>
        <div className="relative z-10 mx-auto max-w-6xl px-6">

          <div className="grid lg:grid-cols-2 gap-16 items-start">

            <div>
              <span className="flex items-center gap-3 mb-6">
                <span className="w-8 h-px bg-sky-500" />
                <span className="text-[10px] uppercase tracking-[0.3em] text-sky-400 font-semibold" style={{ fontFamily: "system-ui, sans-serif" }}>Is This For You?</span>
              </span>
               <h2 className="text-3xl sm:text-4xl font-black leading-[0.95] text-white mb-8">
                 This Training Is For{" "}
                 <span className="italic font-light text-white/30">Agents&nbsp;Who:</span>
               </h2>

              <ul className="space-y-2" style={{ fontFamily: "system-ui, sans-serif" }}>
                <Check>Want more listings without burning out</Check>
                <Check>Are open to changing how they think and operate</Check>
                <Check>Want predictable growth instead of lucky months</Check>
                <Check>Care about quality of life, not just volume</Check>
                <Check>Are tired of cold calling and hoping it works</Check>
              </ul>

              <div className="mt-8 p-5 rounded-2xl border border-white/[0.07] bg-white/[0.03]" style={{ fontFamily: "system-ui, sans-serif" }}>
                <p className="text-xs uppercase tracking-[0.2em] text-white/35 mb-2">Not for you if:</p>
                <p className="text-sm text-white/45 leading-relaxed">You&apos;re looking for shortcuts that require no change in thinking. This is a business re-architecture — not a hack.</p>
              </div>
            </div>

            {/* Brian bio */}
            <div className="relative">
              <div className="absolute -inset-3 bg-sky-600/6 rounded-3xl blur-2xl" />
              <div className="relative rounded-3xl border border-white/[0.08] bg-[#0c1028] p-8 shadow-2xl">

                <p className="text-[10px] uppercase tracking-[0.25em] text-sky-400 font-semibold mb-4" style={{ fontFamily: "system-ui, sans-serif" }}>Why Listen to Me</p>

                 <blockquote className="text-lg sm:text-xl font-black text-white leading-tight mb-6">
                   &ldquo;I built a business that generated listings — without&nbsp;ever&nbsp;chasing&nbsp;anyone.&rdquo;
                 </blockquote>

                <p className="text-sm sm:text-base text-white/65 leading-relaxed mb-3" style={{ fontFamily: "system-ui, sans-serif" }}>
                  I am <strong className="text-white">Brian Moses</strong>. I sold over 400 homes a year, ranked top 10 worldwide in a major franchise, and built a business that did not rely on cold calling or chasing people.
                </p>
                <p className="text-sm text-white/50 leading-relaxed" style={{ fontFamily: "system-ui, sans-serif" }}>
                  I learned the hard way what actually drives listings, and what is a complete waste of time and money. This training is the condensed version of those lessons.
                </p>

                <div className="mt-6 pt-6 border-t border-white/[0.07] grid grid-cols-3 gap-4">
                  {[["400+", "Homes/Year"], ["Top 10", "Worldwide"], ["$0", "On Cold Calls"]].map(([val, lbl]) => (
                    <div key={lbl} className="text-center">
                      <p className="text-lg font-black text-white">{val}</p>
                      <p className="text-[10px] text-white/40 mt-0.5" style={{ fontFamily: "system-ui, sans-serif" }}>{lbl}</p>
                    </div>
                  ))}
                </div>

                <button
                  onClick={scrollToForm}
                  className="mt-7 w-full rounded-xl bg-[#155EEF] px-6 py-4 text-sm font-bold uppercase tracking-[0.15em] text-white shadow-[0_16px_48px_rgba(21,94,239,0.5)] transition-all hover:bg-blue-500 hover:shadow-[0_20px_60px_rgba(21,94,239,0.75)] hover:-translate-y-0.5"
                  style={{ fontFamily: "system-ui, sans-serif" }}
                >
                  Watch the Free Training Now →
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          FINAL CTA BAND
      ══════════════════════════════════════════════════ */}
      <section className="relative py-20 border-t border-white/[0.06] overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-blue-950/10" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-blue-800/10 rounded-full blur-[100px]" />
        </div>

        <div className="relative z-10 mx-auto max-w-3xl px-6 text-center flex flex-col items-center gap-6">
          <span className="flex items-center gap-3">
            <span className="w-8 h-px bg-sky-500" />
            <span className="text-[10px] uppercase tracking-[0.3em] text-sky-400 font-semibold" style={{ fontFamily: "system-ui, sans-serif" }}>It&apos;s Free</span>
            <span className="w-8 h-px bg-sky-500" />
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight text-white">
            Stop Chasing.<br />
            <span className="italic font-light text-white/35">Start Attracting.</span>
          </h2>
          <p className="text-base text-white/55 max-w-lg" style={{ fontFamily: "system-ui, sans-serif" }}>
            The exact attraction strategies, messaging, and offers I used to sell over 400 homes a year — and how serious agents are using them right now to create listings on demand.
          </p>
          <button
            onClick={scrollToForm}
            className="inline-flex items-center gap-3 rounded-xl bg-[#155EEF] px-10 py-4 text-sm font-bold uppercase tracking-[0.2em] text-white shadow-[0_20px_60px_rgba(21,94,239,0.55)] transition-all hover:bg-blue-500 hover:shadow-[0_24px_70px_rgba(21,94,239,0.75)] hover:-translate-y-1"
            style={{ fontFamily: "system-ui, sans-serif" }}
          >
            Get Instant Access to Your Free Training
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8H13M13 8L8.5 3.5M13 8L8.5 12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <p className="text-xs text-white/25" style={{ fontFamily: "system-ui, sans-serif" }}>No credit card. No spam. Just results.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/[0.06] py-10 px-6 text-center">
        <p className="text-xs text-white/25" style={{ fontFamily: "system-ui, sans-serif" }}>
          &copy; {new Date().getFullYear()} Brian Moses &middot; All Rights Reserved
        </p>
      </footer>

    </div>
  );
}
