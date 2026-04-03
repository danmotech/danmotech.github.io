import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Menu, X, Globe } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";
import type { Locale } from "@/i18n/translations";

const langLabels: Record<Locale, { short: string; native: string; flag: string }> = {
  en: { short: "EN", native: "English",  flag: "🇬🇧" },
  zh: { short: "中文", native: "中文",    flag: "🇨🇳" },
  de: { short: "DE", native: "Deutsch",  flag: "🇩🇪" },
  es: { short: "ES", native: "Español",  flag: "🇪🇸" },
  ar: { short: "AR", native: "العربية",  flag: "🇸🇦" },
};
const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { t, locale, setLocale } = useLanguage();

  const navLinks = [
    { label: t.nav.home, href: "home" },
    { label: t.nav.products, href: "products" },
    { label: t.nav.technology, href: "technology" },
    { label: t.nav.references, href: "references" },
    { label: t.nav.partner, href: "partner" },
    { label: t.nav.contact, href: "contact" },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent, sectionId: string) => {
    e.preventDefault();
    setOpen(false);

    if (location.pathname !== "/") {
      navigate(`/#${sectionId}`);
    } else {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-card/95 backdrop-blur-md shadow-lg border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between h-20 px-6">
        <a
          href="/"
          onClick={(e) => handleNavClick(e, "home")}
          className="flex items-center gap-2"
        >
          <img src="/favicon.png" alt="Danmotech" className="w-10 h-10 rounded-lg" />
          <span
            className={`font-display font-bold text-xl tracking-tight transition-colors ${
              scrolled ? "text-foreground" : "text-section-dark-foreground"
            }`}
          >
            Danmotech
          </span>
        </a>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={`/#${l.href}`}
              onClick={(e) => handleNavClick(e, l.href)}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                scrolled ? "text-foreground" : "text-section-dark-foreground"
              }`}
            >
              {l.label}
            </a>
          ))}

          {/* Language Switcher */}
          <div className="relative inline-flex items-center">
            <Globe className={`w-4 h-4 absolute left-3 rtl:left-auto rtl:right-3 pointer-events-none ${
              scrolled ? "text-foreground" : "text-section-dark-foreground"
            }`} />
            <select
              value={locale}
              onChange={(e) => setLocale(e.target.value as Locale)}
              className={`appearance-none bg-transparent pl-8 pr-6 rtl:pl-6 rtl:pr-8 py-1.5 rounded-lg border text-sm font-medium cursor-pointer transition-all hover:bg-primary/10 focus:outline-none ${
                scrolled
                  ? "border-border text-foreground"
                  : "border-section-dark-foreground/30 text-section-dark-foreground"
              }`}
            >
              {(Object.keys(langLabels) as Locale[]).map((l) => (
                <option key={l} value={l} className="text-foreground bg-card">
                  {langLabels[l].flag} {langLabels[l].native}
                </option>
              ))}
            </select>
          </div>

          <a
            href="/#contact"
            onClick={(e) => handleNavClick(e, "contact")}
            className="px-5 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            {t.nav.getQuote}
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? (
            <X className={scrolled ? "text-foreground" : "text-section-dark-foreground"} />
          ) : (
            <Menu className={scrolled ? "text-foreground" : "text-section-dark-foreground"} />
          )}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-card border-b border-border overflow-hidden"
          >
            <div className="flex flex-col gap-4 p-6">
              {navLinks.map((l) => (
                <a
                  key={l.href}
                  href={`/#${l.href}`}
                  onClick={(e) => handleNavClick(e, l.href)}
                  className="text-foreground font-medium hover:text-primary transition-colors"
                >
                  {l.label}
                </a>
              ))}
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-foreground" />
                <select
                  value={locale}
                  onChange={(e) => { setLocale(e.target.value as Locale); setOpen(false); }}
                  className="bg-transparent text-foreground font-medium cursor-pointer focus:outline-none"
                >
                  {(Object.keys(langLabels) as Locale[]).map((l) => (
                    <option key={l} value={l} className="text-foreground bg-card">
                      {langLabels[l].flag} {langLabels[l].native}
                    </option>
                  ))}
                </select>
              </div>
              <a
                href="/#contact"
                onClick={(e) => handleNavClick(e, "contact")}
                className="px-5 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-semibold text-center"
              >
                {t.nav.getQuote}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
