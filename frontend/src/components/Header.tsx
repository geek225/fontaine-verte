"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Accueil" },
    { href: "/a-propos", label: "À propos" },
    { href: "/services", label: "Nos services" },
    { href: "/equipements", label: "Équipements" },
    { href: "/contact", label: "Contact & Devis" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#faf8ff]/95 backdrop-blur-md border-b border-[#dae2fd]/60 shadow-[0_2px_12px_rgba(0,101,44,0.04)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 lg:h-17.5 flex items-center justify-between gap-3">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 sm:gap-3 group text-left shrink-0">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#15803d] text-white flex items-center justify-center transition-transform group-hover:scale-105 shadow-sm shadow-[#15803d]/20 shrink-0">
            <span className="material-symbols-outlined text-xl sm:text-2xl">eco</span>
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-base sm:text-lg lg:text-xl text-[#131b2e] tracking-tight group-hover:text-[#00652c] transition-colors leading-tight whitespace-nowrap">
              Fontaine Verte
            </span>
            <span className="text-[9px] sm:text-[10px] font-bold text-[#00652c] uppercase tracking-wider hidden sm:block whitespace-nowrap">
              Notre souci, un monde sain !
            </span>
          </div>
        </Link>

        {/* Desktop Navigation (>= 1024px) */}
        <nav className="hidden lg:flex items-center gap-1 p-1 rounded-full bg-[#eaedff]/70 border border-[#dae2fd]/50">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? "bg-[#00652c] text-white shadow-xs"
                    : "text-[#3f493f] hover:text-[#131b2e] hover:bg-white/60"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Action Button & Hotline */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Hotline for large desktop (>= 1280px) */}
          <a
            href="tel:+2250757947440"
            className="hidden 2xl:inline-flex items-center gap-1.5 text-xs font-bold text-[#006399] px-3 py-1.5 rounded-full bg-[#cde5ff]/60 hover:bg-[#cde5ff] transition-colors whitespace-nowrap shrink-0 border border-[#7bc2ff]/30"
          >
            <span className="material-symbols-outlined text-sm">call</span>
            <span className="whitespace-nowrap">+225 07 57 94 74 40</span>
          </a>

          {/* Compact phone button for xl screens (1280px - 1535px) */}
          <a
            href="tel:+2250757947440"
            className="hidden xl:inline-flex 2xl:hidden w-8 h-8 rounded-full bg-[#cde5ff]/70 text-[#006399] items-center justify-center hover:bg-[#cde5ff] transition-colors shrink-0"
            title="Appeler : +225 07 57 94 74 40"
          >
            <span className="material-symbols-outlined text-sm">call</span>
          </a>

          {/* CTA Devis Button */}
          <Link
            href="/contact#devis"
            className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full bg-[#00652c] hover:bg-[#008138] text-white text-xs sm:text-sm font-bold shadow-sm hover:shadow transition-all active:scale-95 whitespace-nowrap shrink-0"
          >
            <span className="whitespace-nowrap">Demander un devis</span>
            <span className="material-symbols-outlined text-base">arrow_forward</span>
          </Link>

          {/* Mobile menu button (< 1024px) */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 sm:p-2 rounded-xl bg-[#eaedff] text-[#131b2e] hover:bg-[#dae2fd] transition-colors lg:hidden shrink-0 flex items-center justify-center"
            aria-label="Menu"
          >
            <span className="material-symbols-outlined text-2xl">
              {mobileMenuOpen ? "close" : "menu"}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#faf8ff] border-b border-[#dae2fd] px-4 pt-3 pb-6 flex flex-col gap-2 shadow-xl animate-in fade-in duration-200">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-4 py-2.5 rounded-xl text-sm font-bold transition-colors ${
                  isActive
                    ? "bg-[#00652c] text-white"
                    : "text-[#131b2e] hover:bg-[#eaedff]"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <div className="pt-3 flex flex-col gap-2.5 border-t border-[#dae2fd] mt-2">
            <a
              href="tel:+2250757947440"
              className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#cde5ff] text-[#004b74] text-xs font-bold"
            >
              <span className="material-symbols-outlined text-base">call</span>
              <span>+225 07 57 94 74 40</span>
            </a>
            <Link
              href="/contact#devis"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#00652c] text-white text-xs font-bold shadow-sm"
            >
              <span>Demander un devis immédiat</span>
              <span className="material-symbols-outlined text-base">arrow_forward</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
