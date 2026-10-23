"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export default function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    {
      href: "/",
      label: "Accueil",
      description: "Gestion, collecte et valorisation des déchets",
      icon: "home",
    },
    {
      href: "/a-propos",
      label: "À propos",
      description: "Notre histoire, nos valeurs et engagements écologiques",
      icon: "info",
    },
    {
      href: "/services",
      label: "Nos services",
      description: "Incinération thermique, DASRI et dépollution",
      icon: "cleaning_services",
    },
    {
      href: "/equipements",
      label: "Équipements",
      description: "Incinérateur pyrolytique et flotte logistique agréée",
      icon: "precision_manufacturing",
    },
    {
      href: "/contact",
      label: "Contact & Devis",
      description: "Diagnostic environnemental et devis gratuit sous 24h",
      icon: "contact_support",
    },
  ];

  // Close menu on route change without cascading effect render
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setMobileMenuOpen(false);
  }

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#faf8ff]/95 backdrop-blur-md border-b border-[#dae2fd]/60 shadow-[0_2px_12px_rgba(0,101,44,0.04)]">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 lg:h-17.5 flex items-center justify-between gap-2 sm:gap-3">
          {/* Brand Logo */}
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 sm:gap-3 group text-left min-w-0 shrink"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#15803d] text-white flex items-center justify-center transition-transform group-hover:scale-105 shadow-sm shadow-[#15803d]/20 shrink-0">
              <span className="material-symbols-outlined text-xl sm:text-2xl">eco</span>
            </div>
            <div className="flex flex-col truncate">
              <span className="font-extrabold text-base sm:text-lg lg:text-xl text-[#131b2e] tracking-tight group-hover:text-[#00652c] transition-colors leading-tight truncate">
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

          {/* Action Buttons & Mobile Toggle */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
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

            {/* CTA Devis Button (Responsive: full label on sm+, concise 'Devis' on mobile) */}
            <Link
              href="/contact#devis"
              onClick={() => setMobileMenuOpen(false)}
              className="inline-flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-full bg-[#00652c] hover:bg-[#008138] text-white text-xs sm:text-sm font-bold shadow-sm hover:shadow transition-all active:scale-95 whitespace-nowrap shrink-0"
            >
              <span className="hidden sm:inline">Demander un devis</span>
              <span className="sm:hidden font-bold">Devis</span>
              <span className="material-symbols-outlined text-base">arrow_forward</span>
            </Link>

            {/* Mobile menu button (< 1024px) - Touch target minimum 44x44px */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="min-w-10.5 min-h-10.5 p-2 rounded-xl bg-[#eaedff] text-[#131b2e] hover:bg-[#dae2fd] active:scale-95 transition-all lg:hidden shrink-0 flex items-center justify-center border border-[#dae2fd] focus:outline-none focus:ring-2 focus:ring-[#00652c]"
              aria-label={mobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu de navigation"}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
            >
              <span className="material-symbols-outlined text-2xl transition-transform duration-200">
                {mobileMenuOpen ? "close" : "menu"}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Backdrop */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 top-16 bg-[#131b2e]/60 backdrop-blur-sm z-40 lg:hidden animate-in fade-in duration-200"
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile Menu Panel */}
      {mobileMenuOpen && (
        <aside
          id="mobile-navigation"
          role="dialog"
          aria-modal="true"
          aria-label="Menu principal de navigation"
          className="fixed top-16 left-0 right-0 max-h-[calc(100vh-4rem)] overflow-y-auto bg-[#faf8ff] border-b border-[#dae2fd] shadow-2xl z-50 lg:hidden animate-in slide-in-from-top-2 duration-200"
          style={{ backgroundColor: "#faf8ff" }}
        >
          <div className="p-4 sm:p-6 flex flex-col gap-3">
            {/* Top header badge in mobile menu */}
            <div className="flex items-center justify-between pb-2 border-b border-[#dae2fd]/60">
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#00652c]">
                Menu de Navigation
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#cde5ff] text-[#004b74]">
                <span className="material-symbols-outlined text-xs">verified</span>
                Agréé CIAPOL
              </span>
            </div>

            {/* Navigation Links */}
            <nav className="flex flex-col gap-1.5" aria-label="Liens mobiles">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center justify-between p-3 rounded-2xl transition-all ${
                      isActive
                        ? "bg-[#00652c] text-white shadow-md shadow-[#00652c]/20"
                        : "bg-white hover:bg-[#eaedff] text-[#131b2e] border border-[#dae2fd]/60 active:scale-[0.99] shadow-xs"
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div
                        className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 overflow-hidden ${
                          isActive
                            ? "bg-white/20 text-white"
                            : "bg-[#eaedff] text-[#00652c]"
                        }`}
                      >
                        <span className="material-symbols-outlined text-xl select-none leading-none shrink-0" aria-hidden="true">
                          {link.icon}
                        </span>
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span
                          className={`font-bold text-sm tracking-tight ${
                            isActive ? "text-white" : "text-[#131b2e]"
                          }`}
                        >
                          {link.label}
                        </span>
                        <span
                          className={`text-[11px] truncate ${
                            isActive ? "text-white/80" : "text-[#6f7a6e]"
                          }`}
                        >
                          {link.description}
                        </span>
                      </div>
                    </div>
                    <span
                      className={`material-symbols-outlined text-lg shrink-0 ${
                        isActive ? "text-white" : "text-[#a3b1a2]"
                      }`}
                    >
                      chevron_right
                    </span>
                  </Link>
                );
              })}
            </nav>

            {/* Direct Action & Contact Section */}
            <div className="pt-2 flex flex-col gap-2.5 border-t border-[#dae2fd]/80 mt-1">
              {/* Call Hotline */}
              <a
                href="tel:+2250757947440"
                className="flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-[#cde5ff] hover:bg-[#b8daff] text-[#004b74] text-xs sm:text-sm font-bold transition-colors shadow-xs active:scale-98"
              >
                <span className="material-symbols-outlined text-lg">call</span>
                <span>Urgence / Ligne directe : +225 07 57 94 74 40</span>
              </a>

              {/* Quote CTA */}
              <Link
                href="/contact#devis"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-[#00652c] hover:bg-[#008138] text-white text-xs sm:text-sm font-bold shadow-md shadow-[#00652c]/20 transition-all active:scale-98"
              >
                <span>Demander un devis immédiat</span>
                <span className="material-symbols-outlined text-base">arrow_forward</span>
              </Link>

              {/* Company Info Footer in Menu */}
              <p className="text-center text-[10px] text-[#6f7a6e] font-medium pt-1">
                Fontaine Verte SARL • Abidjan, Côte d'Ivoire • Lun - Ven : 8h - 18h
              </p>
            </div>
          </div>
        </aside>
      )}
    </>
  );
}

