import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import translations, { type Locale, type TranslationKeys } from "./translations";

interface LanguageContextType {
  locale: Locale;
  t: TranslationKeys;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [locale, setLocaleState] = useState<Locale>(() => {
    const saved = localStorage.getItem("danmotech-lang");
    const initial = (saved === "zh" || saved === "de" || saved === "es" || saved === "ar") ? saved as Locale : "en";
    document.documentElement.dir = initial === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = initial;
    return initial;
  });

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem("danmotech-lang", newLocale);
    document.documentElement.dir = newLocale === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = newLocale;
  }, []);

  const toggleLocale = useCallback(() => {
    const order: Locale[] = ["en", "zh", "de", "es", "ar"];
    const next = order[(order.indexOf(locale) + 1) % order.length];
    setLocale(next);
  }, [locale, setLocale]);

  const t = translations[locale];

  return (
    <LanguageContext.Provider value={{ locale, t, setLocale, toggleLocale }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
};
