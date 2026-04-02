import type { Metadata, Viewport } from "next";
import { Suspense } from "react";
import "./globals.css";
import FontLoader from "@/components/FontLoader";
import PreviewBanner from "@/components/PreviewBanner";
import {
  SITE_BROWSER_TITLE,
  SITE_LINK_PREVIEW_TITLE,
  SITE_META_DESCRIPTION,
  getSiteMetadataBase,
} from "@/lib/site-meta";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: getSiteMetadataBase(),
  title: SITE_BROWSER_TITLE,
  description: SITE_META_DESCRIPTION,
  openGraph: {
    title: SITE_LINK_PREVIEW_TITLE,
    description: SITE_META_DESCRIPTION,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_LINK_PREVIEW_TITLE,
    description: SITE_META_DESCRIPTION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="font-inter">
        <FontLoader />
        <div className="flex min-h-screen flex-col bg-[#0a0a0a]">
          <Suspense fallback={null}>
            <PreviewBanner />
          </Suspense>
          <main className="flex-1 min-w-0">{children}</main>
        </div>
      </body>
    </html>
  );
}

