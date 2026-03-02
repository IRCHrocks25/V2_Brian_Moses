import type { Metadata } from "next";
import "./globals.css";
import FontLoader from "@/components/FontLoader";

export const metadata: Metadata = {
  title:
    "Brian Moses | #2 Worldwide Real Estate Coach & Keynote Speaker | Attract, Don’t Chase",
  description:
    "Discover the proven Attract, Don’t Chase system from Brian Moses — a #2 worldwide ranked real estate agent, top real estate coach, and in‑demand keynote speaker. Learn how to generate consistent, high‑quality listings, scale your production without burnout, and create a predictable seven‑figure real estate business.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="font-inter">
        <FontLoader />
        <div className="flex min-h-screen flex-col bg-[#0a0a0a]">
          <main className="flex-1">{children}</main>
        </div>
      </body>
    </html>
  );
}

