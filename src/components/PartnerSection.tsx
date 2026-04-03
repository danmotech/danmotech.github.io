import { motion } from "framer-motion";
import { Handshake, Globe, TrendingUp } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

const PartnerSection = () => {
  const { t, locale } = useLanguage();
  const isRtl = locale === "ar";

  const benefits = [
    { icon: Globe, ...t.partner.benefits.globalNetwork },
    { icon: TrendingUp, ...t.partner.benefits.growingMarket },
    { icon: Handshake, ...t.partner.benefits.fullSupport },
  ];

  return (
    <section id="partner" className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: isRtl ? 30 : -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-sm font-semibold text-primary uppercase tracking-widest">{t.partner.subtitle}</span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-foreground mt-3 mb-6">{t.partner.title}</h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">{t.partner.desc}</p>
            <a
              href="#contact"
              className="inline-flex px-8 py-4 rounded-lg bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity"
            >
              {t.partner.applyNow}
            </a>
          </motion.div>

          <div className="grid gap-6">
            {benefits.map((b, i) => (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, x: isRtl ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="flex gap-5 p-6 rounded-2xl border border-border bg-card"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <b.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-card-foreground mb-1">{b.title}</h3>
                  <p className="text-muted-foreground">{b.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnerSection;
