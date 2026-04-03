import { motion } from "framer-motion";
import { ArrowRight, Droplets } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import { useLanguage } from "@/i18n/LanguageContext";

const heroTitleSize: Record<string, string> = {
  en: "text-4xl md:text-6xl lg:text-7xl",
  zh: "text-4xl md:text-6xl lg:text-7xl",
  de: "text-4xl md:text-5xl lg:text-6xl",
  es: "text-4xl md:text-5xl lg:text-6xl",
  ar: "text-4xl md:text-5xl lg:text-6xl",
};

const HeroSection = () => {
  const { t, locale } = useLanguage();
  const isRtl = locale === "ar";

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <img src={heroBg} alt="Wastewater treatment facility" width={1920} height={1080} className="w-full h-full object-cover" />
        {/* Gradient flips for RTL so text side stays dark */}
        <div className={`absolute inset-0 ${isRtl
          ? "bg-gradient-to-l from-section-dark/95 via-section-dark/80 to-section-dark/40"
          : "bg-gradient-to-r from-section-dark/95 via-section-dark/80 to-section-dark/40"
        }`} />
      </div>

      <div className="container relative z-10 mx-auto px-6 py-32">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-2xl"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 border border-primary/30 mb-8">
            <Droplets className="w-4 h-4 text-primary shrink-0" />
            <span className="text-sm font-medium text-section-dark-foreground">
              {t.hero.badge}
            </span>
          </div>

          <h1 className={`${heroTitleSize[locale] || heroTitleSize.en} font-extrabold leading-[1.3] text-section-dark-foreground mb-6`}>
            {t.hero.titleLine1}
            <br />
            <span className="text-primary">{t.hero.titleHighlight}</span> {t.hero.titleLine2}
          </h1>

          <p className="text-lg md:text-xl text-section-dark-foreground/70 mb-10 max-w-xl leading-relaxed">
            {t.hero.desc}
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#products"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg bg-primary text-primary-foreground font-semibold text-base hover:opacity-90 transition-opacity"
            >
              {t.hero.exploreProducts}
              <ArrowRight className="w-5 h-5 rtl-flip" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg border border-section-dark-foreground/30 text-section-dark-foreground font-semibold text-base hover:bg-section-dark-foreground/10 transition-colors"
            >
              {t.hero.contactUs}
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl"
        >
          {[
            { value: "500+", label: t.hero.stats.projects },
            { value: "30+", label: t.hero.stats.countries },
            { value: "15+", label: t.hero.stats.years },
            { value: "99%", label: t.hero.stats.efficiency },
          ].map((s) => (
            <div key={s.label}>
              <div className="text-3xl md:text-4xl font-extrabold text-primary" dir="ltr">{s.value}</div>
              <div className="text-sm text-section-dark-foreground/60 mt-1">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
