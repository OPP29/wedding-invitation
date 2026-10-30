import { useState, useEffect } from "react";
import { Menu, X, Heart } from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "वर-वधु (Couple)", href: "#couple" },
    { name: "कार्यक्रम एवं स्थल (Events)", href: "#events" },
    { name: "चित्र वीथिका (Gallery)", href: "#gallery" },
    { name: "उपस्थिति (RSVP)", href: "#rsvp" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? "bg-[#200007]/95 backdrop-blur-md shadow-2xl py-2.5 border-b border-amber-500/40"
          : "bg-transparent py-4"
      }`}
    >
      <div className="max-w-4xl mx-auto px-4 flex items-center justify-between">
        {/* Royal Monogram */}
        <a href="#" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-full border border-amber-400 flex items-center justify-center bg-gradient-to-br from-amber-900/80 to-[#38010d] shadow group-hover:scale-105 transition-transform">
            <span className="font-serif font-bold text-amber-300 text-xs tracking-wider">
              म & रि
            </span>
          </div>
          <div>
            <p className="font-serif text-xs sm:text-sm font-bold tracking-wider text-amber-200">
              मोनिका एवं रितेश
            </p>
            <p className="text-[9px] uppercase font-sans tracking-widest text-amber-400/90">
              11 . 12 . 2026 • टाटानगर
            </p>
          </div>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6 text-xs sm:text-sm font-serif font-medium text-amber-100/90">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="hover:text-amber-300 transition-colors tracking-wide py-1"
            >
              {link.name}
            </a>
          ))}
          <a
            href="#rsvp"
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-stone-950 font-bold text-xs uppercase tracking-wider shadow hover:scale-105 transition-transform"
          >
            <Heart className="w-3 h-3 text-stone-950 fill-stone-950" />
            <span>RSVP</span>
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-2">
          <a
            href="#rsvp"
            className="px-3 py-1 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-stone-950 text-xs font-bold font-serif"
          >
            RSVP
          </a>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
            className="p-1.5 rounded-lg text-amber-300 hover:bg-amber-950/60"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#200007] border-b border-amber-500/40 px-5 py-4 shadow-2xl space-y-3 animate-fadeIn">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-serif text-amber-100 hover:text-amber-300 py-1 border-b border-amber-900/30"
            >
              {link.name}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
