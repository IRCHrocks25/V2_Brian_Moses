import Image from "next/image";

interface FooterProps {
  logoPath?: string;
}

export default function Footer({ logoPath = "/images/brian_moses_footer_logo.png" }: FooterProps) {
  return (
    <footer className="bg-white py-12 md:py-16">
      <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 mb-8">
          {/* Left Section */}
          <div>
            {/* Logo */}
            <div className="mb-6">
              <div className="relative h-12 md:h-14 lg:h-16 w-auto">
                <Image
                  src={logoPath}
                  alt="Brian Moses"
                  width={200}
                  height={60}
                  className="h-12 md:h-14 lg:h-16 w-auto object-contain object-left"
                />
              </div>
            </div>

            {/* Social Media Icons */}
            <div className="flex flex-col gap-4">
              {/* Facebook */}
              <a
                href="https://www.facebook.com/BrianRichardMoses"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-black flex items-center justify-center hover:bg-black/90 transition-colors"
                aria-label="Facebook"
              >
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>

              {/* Instagram */}
              <a
                href="https://www.instagram.com/coachbrianmoses/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-black flex items-center justify-center hover:bg-black/90 transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/in/brianmoses/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-black flex items-center justify-center hover:bg-black/90 transition-colors"
                aria-label="LinkedIn"
              >
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M4.98 3.5C4.98 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM.22 8.25h4.56V24H.22V8.25zM8.34 8.25h4.37v2.14h.06c.61-1.16 2.11-2.39 4.34-2.39 4.64 0 5.49 3.05 5.49 7.02V24h-4.56v-7.52c0-1.8-.03-4.11-2.5-4.11-2.5 0-2.88 1.95-2.88 3.98V24H8.34V8.25z" />
                </svg>
              </a>

              {/* YouTube */}
              <a
                href="https://www.youtube.com/@BMosesNH"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-black flex items-center justify-center hover:bg-black/90 transition-colors"
                aria-label="YouTube"
              >
                <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.498 6.186a2.974 2.974 0 0 0-2.09-2.103C19.505 3.5 12 3.5 12 3.5s-7.505 0-9.408.583a2.974 2.974 0 0 0-2.09 2.103A31.258 31.258 0 0 0 .5 11.75a31.258 31.258 0 0 0 .002 5.564 2.974 2.974 0 0 0 2.09 2.103C4.495 20 12 20 12 20s7.505 0 9.408-.583a2.974 2.974 0 0 0 2.09-2.103A31.258 31.258 0 0 0 23.5 11.75a31.258 31.258 0 0 0-.002-5.564zM9.75 15.5v-7l6 3.5-6 3.5z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Right Section */}
          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            {/* Resources Column */}
            <div>
              <h3 className="text-gray-400 uppercase tracking-wider text-sm font-semibold mb-4">
                RESOURCES
              </h3>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#home"
                    className="text-gray-600 hover:text-black transition-colors text-sm md:text-base"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="#services"
                    className="text-gray-600 hover:text-black transition-colors text-sm md:text-base"
                  >
                    Services
                  </a>
                </li>
                <li>
                  <a
                    href="#about"
                    className="text-gray-600 hover:text-black transition-colors text-sm md:text-base"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="#testimonials"
                    className="text-gray-600 hover:text-black transition-colors text-sm md:text-base"
                  >
                    Testimonials
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact Column */}
            <div>
              <h3 className="text-gray-400 uppercase tracking-wider text-sm font-semibold mb-4">
                CONTACT
              </h3>
              <ul className="space-y-3">
                <li>
                  <a
                    href="mailto:Brian@BrianMoses.com"
                    className="text-gray-600 hover:text-black transition-colors text-sm md:text-base"
                  >
                    Brian@BrianMoses.com
                  </a>
                </li>
                <li>
                  <a
                    href="tel:+16038601104"
                    className="text-gray-600 hover:text-black transition-colors text-sm md:text-base"
                  >
                    603-860-1104
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="border-t border-gray-200 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
            <p>
              ©{new Date().getFullYear()} Brian Moses Coaching & Speaking
            </p>
            <div className="flex items-center gap-4">
              <a
                href="#terms"
                className="hover:text-black transition-colors"
              >
                Terms
              </a>
              <span>|</span>
              <a
                href="#privacy"
                className="hover:text-black transition-colors"
              >
                Privacy
              </a>
              <span>|</span>
              <a
                href="#earnings"
                className="hover:text-black transition-colors"
              >
                Earnings Disclaimer
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
