import { motion } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";

const ReferencesSection = () => {
  const { t } = useLanguage();

  const references = [
    { ...t.refs.items.icell, category: "iCELL Series" },
    { ...t.refs.items.icube, category: "iCUBE Series" },
    { ...t.refs.items.ishell, category: "iSHELL Series" },
    { ...t.refs.items.wwtp, category: "WWTP" },
  ];

  return (
    <section id="references" className="py-24 md:py-32 bg-secondary">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-sm font-semibold text-primary uppercase tracking-widest">{t.refs.subtitle}</span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-foreground mt-3">{t.refs.title}</h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto text-lg">{t.refs.desc}</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {references.map((r, i) => (
            <motion.div
              key={r.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-card rounded-2xl p-6 border border-border hover:shadow-lg transition-shadow"
            >
              <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-4">{r.category}</span>
              <h3 className="text-lg font-bold text-card-foreground mb-1">{r.title}</h3>
              <p className="text-muted-foreground text-sm">{r.location}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReferencesSection;
