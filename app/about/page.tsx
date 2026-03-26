import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getContent } from "@/lib/get-content";
import AboutHero from "@/components/about/AboutHero";
import AboutBeginning from "@/components/about/AboutBeginning";
import AboutTurningPoint from "@/components/about/AboutTurningPoint";
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
          backgroundImage={content["img.about.hero"] || "/images/image (32) 1.png"}
        />
        <AboutBeginning 
          tagline={content["about.beginning.tagline"]}
          heading={content["about.beginning.heading"]}
          imageSrc={content["img.about.beginning"] || "/images/five_images/Keynote.png"}
        />
        <AboutTurningPoint />
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
