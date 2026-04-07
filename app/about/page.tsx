import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getContent } from "@/lib/get-content";
import AboutHero from "@/components/about/AboutHero";
import AboutBeginning from "@/components/about/AboutBeginning";
import AboutTurningPoint from "@/components/about/AboutTurningPoint";
import AboutTestimonial from "@/components/about/AboutTestimonial";
import AboutTimeline from "@/components/about/AboutTimeline";
import AboutPersonal from "@/components/about/AboutPersonal";
import AboutMission from "@/components/about/AboutMission";
import AboutCTA from "@/components/about/AboutCTA";

export default async function AboutPage({
  searchParams,
}: {
  searchParams: Promise<{ preview?: string }>;
}) {
  const params = await searchParams;
  const content = await getContent("about", params?.preview);

  return (
    <div className="bg-[#010711] min-h-screen text-[#CFCFCF] font-inter overflow-x-hidden">
      <Navbar logoPath={content["img.navbar.home"] || "https://res.cloudinary.com/dcuswyfur/image/upload/v1773699155/main-logo-coaching-white_xafq2t.png"} />

      <main>
        <AboutHero
          headline={content["about.hero.headline"]}
          subheadline={content["about.hero.subheadline"]}
          backgroundImage={content["img.about.hero"] || "/hero_landing.png"}
        />
        <AboutBeginning
          tagline={content["about.beginning.tagline"]}
          heading={content["about.beginning.heading"]}
          imageSrc={content["img.about.beginning"] || "/images/five_images/Keynote.png"}
        />
        <AboutTurningPoint />
        <AboutTestimonial 
          bioName="Nick McLean"
          bioText={`Nick McLean is a real estate entrepreneur and industry innovator.

Over the past decade, Nick has sold more than 5,000 homes and built and operated an independent “teamerage” brokerage for over 10 years, achieving a dominant 20% market share in his local market. 

Nick is also the author of Million Dollar Agent.`}
          cloudinaryPublicId="NickEdited_SpedUpFinal_zym2rx"
          cloudinaryCloudName="dcuswyfur"
        />
        <AboutTimeline />
        <AboutPersonal
          imageSrc={content["img.about.personal"] || "/images/HS Biz Planning 014 1 (1).png"}
        />
        <AboutMission
          backgroundImage={content["img.about.mission"] || "/images/new_images/brian16.png"}
        />
        <AboutCTA />
      </main>

      <Footer
        logoPath={content["img.footer.home"] || "/images/brian_moses_footer_logo.png"}
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
      />
    </div>
  );
}
