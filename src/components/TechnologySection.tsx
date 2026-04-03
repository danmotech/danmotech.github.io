import { motion } from "framer-motion";
import { Shield, Leaf, Zap, Settings, Award, Recycle } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

const TechnologySection = () => {
  const { t } = useLanguage();

  const features = [
    { icon: Shield, ...t.tech.features.germanTech },
    { icon: Leaf, ...t.tech.features.ecoFriendly },
    { icon: Zap, ...t.tech.features.highEfficiency },
    { icon: Settings, ...t.tech.features.easyMaintenance },
    { icon: Award, ...t.tech.features.certifiedQuality },
    { icon: Recycle, ...t.tech.features.waterReuse },
  ];

  return (
    <section id="technology" className="py-24 md:py-32 bg-section-dark">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-sm font-semibold text-primary uppercase tracking-widest">{t.tech.subtitle}</span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-section-dark-foreground mt-3">{t.tech.title}</h2>
          <p className="text-section-dark-foreground/60 mt-4 max-w-2xl mx-auto text-lg">{t.tech.desc}</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-8 rounded-2xl border border-section-dark-foreground/10 bg-section-dark-foreground/5 hover:bg-section-dark-foreground/10 transition-colors group"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center mb-5 group-hover:bg-primary/30 transition-colors">
                <f.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-bold text-section-dark-foreground mb-2">{f.title}</h3>
              <p className="text-section-dark-foreground/60 leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechnologySection;
