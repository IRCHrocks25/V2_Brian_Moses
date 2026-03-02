"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";

interface NavbarProps {
  logoPath?: string;
}

export default function Navbar({ logoPath = "/images/main logo-coaching-white.png" }: NavbarProps) {
  const [isCoachingOpen, setIsCoachingOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const isKeynotePage = pathname === "/keynote";

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsCoachingOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
            <Link 
              href={isKeynotePage ? "/keynote#home" : "/#home"} 
              className="hover:text-white transition-colors scroll-smooth"
            >
              Home
            </Link>
            <Link 
              href={isKeynotePage ? "/keynote#services" : "/#services"} 
              className="hover:text-white transition-colors scroll-smooth"
            >
              Services
            </Link>
            <Link 
              href={isKeynotePage ? "/keynote#about" : "/#about"} 
              className="hover:text-white transition-colors scroll-smooth"
            >
              About
            </Link>
            {/* Coaching Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsCoachingOpen(!isCoachingOpen)}
                className="hover:text-white transition-colors flex items-center gap-1"
              >
                Coaching
                <svg
                  className={`w-4 h-4 transition-transform duration-200 ${
                    isCoachingOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {isCoachingOpen && (
                <div className="absolute top-full left-0 mt-2 w-56 bg-[#0a0a0a] border border-white/10 rounded-lg shadow-lg overflow-hidden">
                  <Link
                    href="/"
                    className="block px-4 py-3 text-white/80 hover:text-white hover:bg-white/5 transition-colors"
                    onClick={() => setIsCoachingOpen(false)}
                  >
                    Coaching
                  </Link>
                  <a
                    href="https://brianmoses.com/how-to-get-3-new-listings-fast-new"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block px-4 py-3 text-white/80 hover:text-white hover:bg-white/5 transition-colors"
                    onClick={() => setIsCoachingOpen(false)}
                  >
                    Inner Circle
                  </a>
                  <a
                    href="https://calendly.com/coachbrianmoses/30-minute-business-assessment-clone"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block px-4 py-3 text-white/80 hover:text-white hover:bg-white/5 transition-colors"
                    onClick={() => setIsCoachingOpen(false)}
                  >
                    1 on 1
                  </a>
                  <a
                    href="https://brianmoses.com/never-say-cant"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block px-4 py-3 text-white/80 hover:text-white hover:bg-white/5 transition-colors"
                    onClick={() => setIsCoachingOpen(false)}
                  >
                    Never Say Can&apos;t
                  </a>
                  <a
                    href="https://www.brianmoses.ai"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block px-4 py-3 text-white/80 hover:text-white hover:bg-white/5 transition-colors"
                    onClick={() => setIsCoachingOpen(false)}
                  >
                    Brian Moses AI
                  </a>
                </div>
              )}
            </div>
            <Link href="/keynote" className="hover:text-white transition-colors">
              Speaker
            </Link>
          </nav>

          {/* CTA */}
          <a
            href="https://calendly.com/coachbrianmoses/30-minute-business-assessment-clone"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg bg-white px-4 md:px-6 py-2 md:py-2.5 text-sm md:text-base font-semibold text-black hover:bg-white/95 hover:scale-105 active:scale-100 transition-all duration-200 shadow-[0_4px_12px_rgba(255,255,255,0.15)] hover:shadow-[0_6px_20px_rgba(255,255,255,0.25)]"
          >
            Start now
          </a>
        </div>
      </div>
    </header>
  );
}

