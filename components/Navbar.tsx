"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import DynamicCTA from "./DynamicCTA";

interface NavbarProps {
  logoPath?: string;
}

export default function Navbar({ logoPath = "/images/main logo-coaching-white.png" }: NavbarProps) {
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const isKeynotePage = pathname === "/keynote";

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsResourcesOpen(false);
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

          {/* Desktop Links */}
          <nav className="hidden md:flex items-center gap-4 text-sm md:text-base text-white/80">
            <Link 
              href="/#home"
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
            {/* Resources Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsResourcesOpen(!isResourcesOpen)}
                className="hover:text-white transition-colors flex items-center gap-1"
              >
                Resources
                <svg
                  className={`w-4 h-4 transition-transform duration-200 ${
                    isResourcesOpen ? "rotate-180" : ""
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
              {isResourcesOpen && (
                <div className="absolute top-full left-0 mt-2 w-56 bg-[#0a0a0a] border border-white/10 rounded-lg shadow-lg overflow-hidden">
                  <Link
                    href="/"
                    className="block px-4 py-3 text-white/80 hover:text-white hover:bg-white/5 transition-colors"
                    onClick={() => setIsResourcesOpen(false)}
                  >
                    Coaching
                  </Link>
                  <a
                    href="https://inner-circle.brianmoses.com/how-to-get-3-new-listings-fast-new"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block px-4 py-3 text-white/80 hover:text-white hover:bg-white/5 transition-colors"
                    onClick={() => setIsResourcesOpen(false)}
                  >
                    Inner Circle
                  </a>
                  <a
                    href="https://calendly.com/coachbrianmoses/30-minute-business-assessment-clone"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block px-4 py-3 text-white/80 hover:text-white hover:bg-white/5 transition-colors"
                    onClick={() => setIsResourcesOpen(false)}
                  >
                    1 on 1
                  </a>
                  <a
                    href="https://inner-circle.brianmoses.com/never-say-cant"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block px-4 py-3 text-white/80 hover:text-white hover:bg-white/5 transition-colors"
                    onClick={() => setIsResourcesOpen(false)}
                  >
                    Never Say Can&apos;t
                  </a>
                  <a
                    href="https://www.brianmoses.ai"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block px-4 py-3 text-white/80 hover:text-white hover:bg-white/5 transition-colors"
                    onClick={() => setIsResourcesOpen(false)}
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

          {/* Desktop CTAs */}
          <div className="hidden md:flex items-center gap-3">
            <DynamicCTA
              placement="navbar"
              page="all"
              fallbackStyle="outline"
              fallback={{
                text: "Login",
                url: "https://hub.freedombuildersinnercircle.com/login",
              }}
            />
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black"
            aria-label="Toggle menu"
            onClick={() => setIsMobileMenuOpen((open) => !open)}
          >
            {isMobileMenuOpen ? (
              // X icon
              <svg className="h-6 w-6" viewBox="0 0 24 24" stroke="currentColor" fill="none">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              // Hamburger icon
              <svg className="h-6 w-6" viewBox="0 0 24 24" stroke="currentColor" fill="none">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-white/10 pt-3 pb-4 space-y-2 text-sm text-white/80">
            <Link
              href="/#home"
              className="block px-1 py-2 hover:text-white"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href={isKeynotePage ? "/keynote#services" : "/#services"}
              className="block px-1 py-2 hover:text-white"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Services
            </Link>
            <Link
              href={isKeynotePage ? "/keynote#about" : "/#about"}
              className="block px-1 py-2 hover:text-white"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="/keynote"
              className="block px-1 py-2 hover:text-white"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Speaker
            </Link>
            <div className="px-1 py-2" onClick={() => setIsMobileMenuOpen(false)}>
              <DynamicCTA
                placement="navbar"
                page="all"
                fallbackStyle="outline"
                fallback={{
                  text: "Login",
                  url: "https://hub.freedombuildersinnercircle.com/login",
                }}
              />
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

