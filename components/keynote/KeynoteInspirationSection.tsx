import Image from "next/image";

const imageStrip = [
  "/images/new_images/brian15.png",
  "/images/new_images/brian16.png",
  "/images/new_images/brian17.png",
  "/images/five_images/Keynote.png",
];

export default function KeynoteInspirationSection() {
  return (
    <section className="relative bg-[#0a0a0a] overflow-hidden mb-8">
      {/* 5-image horizontal strip - Edge to Edge */}
      <div className="relative w-full">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-[30px]">
          {imageStrip.map((src) => (
            <div
              key={src}
              className="relative aspect-square overflow-hidden"
            >
              <Image
                src={src}
                alt="Trusted by logo"
                fill
                className="object-cover object-center"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Text section on black background */}
      
    </section>
  );
}

