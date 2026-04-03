import { motion } from "framer-motion";
import { Mail, MapPin, Phone } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "@/i18n/LanguageContext";

const ContactSection = () => {
  const [submitted, setSubmitted] = useState(false);
  const { t, locale } = useLanguage();
  const isRtl = locale === "ar";

  return (
    <section id="contact" className="py-24 md:py-32 bg-section-dark">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, x: isRtl ? 30 : -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-sm font-semibold text-primary uppercase tracking-widest">{t.contact.subtitle}</span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-section-dark-foreground mt-3 mb-6">{t.contact.title}</h2>
            <p className="text-section-dark-foreground/60 text-lg leading-relaxed mb-10">{t.contact.desc}</p>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="text-sm text-section-dark-foreground/50">{t.contact.email}</div>
                  <div className="text-section-dark-foreground font-medium" dir="ltr">tony@danmotech.com</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="text-sm text-section-dark-foreground/50">{t.contact.location}</div>
                  <div className="text-section-dark-foreground font-medium">{t.contact.locationValue}</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="text-sm text-section-dark-foreground/50">{t.contact.website}</div>
                  <div className="text-section-dark-foreground font-medium" dir="ltr">www.danmotech.com</div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: isRtl ? -30 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            {submitted ? (
              <div className="h-full flex items-center justify-center rounded-2xl border border-primary/30 bg-primary/10 p-12">
                <div className="text-center">
                  <div className="text-4xl mb-4">✓</div>
                  <h3 className="text-xl font-bold text-section-dark-foreground mb-2">{t.contact.success.title}</h3>
                  <p className="text-section-dark-foreground/60">{t.contact.success.desc}</p>
                </div>
              </div>
            ) : (
              <form
                onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
                className="space-y-5 p-8 rounded-2xl border border-section-dark-foreground/10 bg-section-dark-foreground/5"
              >
                <div className="grid sm:grid-cols-2 gap-5">
                  <input type="text" placeholder={t.contact.form.name} required className="w-full px-4 py-3 rounded-lg bg-section-dark border border-section-dark-foreground/15 text-section-dark-foreground placeholder:text-section-dark-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/50" />
                  <input type="email" placeholder={t.contact.form.email} required className="w-full px-4 py-3 rounded-lg bg-section-dark border border-section-dark-foreground/15 text-section-dark-foreground placeholder:text-section-dark-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/50" />
                </div>
                <input type="text" placeholder={t.contact.form.company} className="w-full px-4 py-3 rounded-lg bg-section-dark border border-section-dark-foreground/15 text-section-dark-foreground placeholder:text-section-dark-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/50" />
                <select className="w-full px-4 py-3 rounded-lg bg-section-dark border border-section-dark-foreground/15 text-section-dark-foreground focus:outline-none focus:ring-2 focus:ring-primary/50">
                  <option value="">{t.contact.form.selectProduct}</option>
                  <option>iCELL Series</option>
                  <option>iCUBE Series</option>
                  <option>iSHELL Series</option>
                  <option>Waste Water Treatment Plant</option>
                  <option>{t.contact.form.partnership}</option>
                </select>
                <textarea placeholder={t.contact.form.message} rows={4} required className="w-full px-4 py-3 rounded-lg bg-section-dark border border-section-dark-foreground/15 text-section-dark-foreground placeholder:text-section-dark-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none" />
                <button type="submit" className="w-full py-4 rounded-lg bg-primary text-primary-foreground font-semibold text-base hover:opacity-90 transition-opacity">
                  {t.contact.form.send}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
