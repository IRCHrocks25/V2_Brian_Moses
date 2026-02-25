import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-[#0a0a0a] border-b border-gray-800">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold tracking-tight">
            <span className="text-white">BRIAN</span>{" "}
            <span className="text-[#60a5fa] font-semibold">MOSES</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="#"
              className="text-white text-sm font-medium hover:text-gray-300 transition-colors"
            >
              Home
            </Link>
            <Link
              href="#services"
              className="text-white text-sm font-medium hover:text-gray-300 transition-colors"
            >
              Services
            </Link>
            <Link
              href="#about"
              className="text-white text-sm font-medium hover:text-gray-300 transition-colors"
            >
              About
            </Link>
            <Link
              href="#coaching"
              className="text-white text-sm font-medium hover:text-gray-300 transition-colors"
            >
              Coaching
            </Link>
          </nav>

          {/* CTA Button */}
          <button className="bg-white text-black px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors">
            Start now
          </button>
        </div>
      </div>
    </header>
  );
}

