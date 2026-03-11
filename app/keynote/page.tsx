import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import KeynoteHeroSection from "@/components/keynote/KeynoteHeroSection";
import { getContent } from "@/lib/get-content";
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

export default async function KeynotePage({
  searchParams,
}: {
  searchParams: Promise<{ preview?: string }>;
}) {
  const params = await searchParams;
  const content = await getContent("keynote", params?.preview);

  return (
    <>
      {/* Navbar */}
      <Navbar logoPath={content["img.navbar.keynote"] || "/images/speakerpage_logo/main logo-speaker-white.png"} />

      {/* HERO SECTION */}
      <div id="home">
        <KeynoteHeroSection
          heroBg={content["bg.hero.keynote"] || "/hero_section1.png"}
          videoThumbnail={content["bg.video.thumbnail"] || "/hero_section1.png"}
        />
      </div>

      

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
                className="h-12 w-auto object-contain opacity-90 transition filter grayscale"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Truth Section */}
      <KeynoteTruthSection />
      
      {/* What People Are Saying Section */}
      <KeynoteTestimonialsSection />

       {/* Credentials & Recognition Section */}
       <KeynoteCredentialsSection />

      {/* Sharing A Story of Radical Transformation Section */}
      <div id="about">
        <KeynoteTransformationSection imageSrc={content["img.keynote.transformation"] || "/images/Frame 1000007768.png"} />
      </div>

      {/* Signature Keynotes & Workshops Section */}
      <div id="services">
        <KeynoteKeynotesWorkshopsSection />
      </div>

      {/* Why Event Planners Choose Brian Moses Section */}
      <KeynoteEventPlannersSection imageSrc={content["img.keynote.eventPlanners"] || "/three_images/Ekran Resmi 2026-02-10 15.21.03 1.png"} />


      {/* What Sets Brian Apart Section */}
      <KeynoteWhatSetsApartSection />

      {/* What Your Audience Will Experience Section */}
      <KeynoteAudienceExperienceSection />

     

      {/* Book Brian Moses Section */}
      <KeynoteBookSection imageSrc={content["img.keynote.book"] || "/images/Frame 8.png"} />

      {/* Footer */}
      <Footer
        logoPath={content["img.footer.keynote"] || "/images/speakerpage_logo/main logo-speaker-dark.png"}
        social={{
          facebook: content["social.facebook"],
          instagram: content["social.instagram"],
          linkedin: content["social.linkedin"],
          youtube: content["social.youtube"],
        }}
        contact={{
          email: content["contact.email"],
          phone: content["contact.phone"],
        }}
        extraSocial={Object.entries(content)
          .filter(([k]) => k.startsWith("social.") && !["social.facebook", "social.instagram", "social.linkedin", "social.youtube"].includes(k))
          .filter(([, v]) => v?.trim())
          .map(([k, v]) => {
            const icon = k.split(".")[1] || "link";
            const label = icon === "link" ? "Other" : icon.charAt(0).toUpperCase() + icon.slice(1);
            return { label, url: v, icon };
          })}
        extraContact={Object.entries(content)
          .filter(([k]) => k.startsWith("contact.") && !["contact.email", "contact.phone"].includes(k))
          .filter(([, v]) => v?.trim())
          .map(([k, v]) => {
            const name = k.split(".")[1] || "";
            return { label: name ? name.charAt(0).toUpperCase() + name.slice(1) : k, value: v };
          })}
      />
    </>
  );
}
