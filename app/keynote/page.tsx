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

      

      {/* News / Logos Section */}
      <section className="bg-black py-10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <p className="text-center text-xs font-semibold tracking-[0.3em] text-slate-400 uppercase">
            As Seen In
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-6">
            {[
              "/news_logo/logo2 - 32.png",
              "/news_logo/logo2 - 33.png",
              "/news_logo/logo2 - 34.png",
              "/news_logo/logo2 - 35.png",
            ].map((src, index) => (
              <Image
                key={src}
                src={src}
                alt={`News logo ${index + 1}`}
                width={120}
                height={48}
                className="h-12 w-auto object-contain opacity-90 transition"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Truth Section */}
      <KeynoteTruthSection />
      
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
