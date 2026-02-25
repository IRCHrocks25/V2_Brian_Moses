"use client";

import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import KeynoteHeroSection from "@/components/keynote/KeynoteHeroSection";
import KeynoteInspirationSection from "@/components/keynote/KeynoteInspirationSection";
import KeynoteTransformationSection from "@/components/keynote/KeynoteTransformationSection";
import KeynoteKeynotesWorkshopsSection from "@/components/keynote/KeynoteKeynotesWorkshopsSection";
import KeynoteEventPlannersSection from "@/components/keynote/KeynoteEventPlannersSection";
import KeynoteWhatSetsApartSection from "@/components/keynote/KeynoteWhatSetsApartSection";
import KeynoteAudienceExperienceSection from "@/components/keynote/KeynoteAudienceExperienceSection";
import KeynoteCredentialsSection from "@/components/keynote/KeynoteCredentialsSection";
import KeynoteTestimonialsSection from "@/components/keynote/KeynoteTestimonialsSection";
import KeynoteBookSection from "@/components/keynote/KeynoteBookSection";
import KeynoteTruthSection from "@/components/keynote/KeynoteTruthSection";

export default function KeynotePage() {
  return (
    <>
      {/* Navbar */}
      <Navbar logoPath="/images/speakerpage_logo/main logo-speaker-white.png" />

      {/* HERO SECTION */}
      <KeynoteHeroSection />

      {/* Truth Section */}
      <KeynoteTruthSection />

      {/* News / Logos Section */}
      <section className="bg-black py-10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <p className="text-center text-xs font-semibold tracking-[0.3em] text-slate-400 uppercase">
            As Seen In
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-6">
            <Image
              src="/news_logos/logo2 - 32.png"
              alt="News logo 1"
              width={120}
              height={48}
              className="h-12 w-auto object-contain opacity-80 grayscale hover:opacity-100 hover:grayscale-0 transition"
            />
            <Image
              src="/news_logos/logo2 - 33.png"
              alt="News logo 2"
              width={120}
              height={48}
              className="h-12 w-auto object-contain opacity-80 grayscale hover:opacity-100 hover:grayscale-0 transition"
            />
            <Image
              src="/news_logos/logo2 - 34.png"
              alt="News logo 3"
              width={120}
              height={48}
              className="h-12 w-auto object-contain opacity-80 grayscale hover:opacity-100 hover:grayscale-0 transition"
            />
            <Image
              src="/news_logos/logo2 - 35.png"
              alt="News logo 4"
              width={120}
              height={48}
              className="h-12 w-auto object-contain opacity-80 grayscale hover:opacity-100 hover:grayscale-0 transition"
            />
          </div>
        </div>
      </section>

      {/* What People Are Saying Section */}
      <KeynoteTestimonialsSection />

      {/* Sharing A Story of Radical Transformation Section */}
      <KeynoteTransformationSection />

      {/* Signature Keynotes & Workshops Section */}
      <KeynoteKeynotesWorkshopsSection />

      {/* Why Event Planners Choose Brian Moses Section */}
      <KeynoteEventPlannersSection />


      {/* What Sets Brian Apart Section */}
      <KeynoteWhatSetsApartSection />

      {/* What Your Audience Will Experience Section */}
      <KeynoteAudienceExperienceSection />

      {/* Credentials & Recognition Section */}
      <KeynoteCredentialsSection />

      {/* Book Brian Moses Section */}
      <KeynoteBookSection />

      {/* Footer */}
      <Footer logoPath="/images/speakerpage_logo/main logo-speaker-dark.png" />
    </>
  );
}
