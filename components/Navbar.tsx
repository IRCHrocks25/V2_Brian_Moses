import Image from "next/image";
import Link from "next/link";

interface NavbarProps {
  logoPath?: string;
}

export default function Navbar({ logoPath = "/images/main logo-coaching-white.png" }: NavbarProps) {
  return (
    <header className="sticky top-0 z-50 w-full bg-[#0a0a0a] border-b border-white/10">
      <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
        <div className="flex items-center justify-between py-2 md:py-3">
          {/* Logo */}
          <Link href="/" className="relative block">
            <Image
              src={logoPath}
              alt="Brian Moses"
              width={200}
              height={60}
              className="h-10 md:h-12 lg:h-14 w-auto object-contain"
              priority
            />
          </Link>

          {/* Links */}
          <nav className="hidden md:flex items-center gap-4 text-sm md:text-base text-white/80">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <a href="/#services" className="hover:text-white transition-colors">
              Services
            </a>
            <a href="/#about" className="hover:text-white transition-colors">
              About
            </a>
            <a href="/#coaching" className="hover:text-white transition-colors">
              Coaching
            </a>
            <Link href="/keynote" className="hover:text-white transition-colors">
              Speaker
            </Link>
          </nav>

          {/* CTA */}
          <a
            href="/#start"
            className="rounded-lg bg-white px-4 md:px-6 py-2 md:py-2.5 text-sm md:text-base font-semibold text-black hover:bg-white/95 hover:scale-105 active:scale-100 transition-all duration-200 shadow-[0_4px_12px_rgba(255,255,255,0.15)] hover:shadow-[0_6px_20px_rgba(255,255,255,0.25)]"
          >
            Start now
          </a>
        </div>
      </div>
    </header>
  );
}

