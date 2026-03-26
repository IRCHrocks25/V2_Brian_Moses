import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getContent } from "@/lib/get-content";

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
        {/* Components will be added here */}
        <div className="py-20 text-center text-white">
            <h1 className="text-4xl font-bold">About Brian Moses</h1>
            <p className="mt-4">Page under construction...</p>
        </div>
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
