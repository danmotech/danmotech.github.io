import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import icellImg from "@/assets/icell-product.jpg";
import icubeImg from "@/assets/icube-product.jpg";
import ishellImg from "@/assets/ishell-product.jpg";
import wwtpImg from "@/assets/wwtp-product.jpg";
import { useLanguage } from "@/i18n/LanguageContext";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6 },
  }),
};

const ProductsSection = () => {
  const { t } = useLanguage();

  const products = [
    { name: t.products.icell.name, slug: "icell", desc: t.products.icell.desc, img: icellImg, tag: t.products.residential },
    { name: t.products.icube.name, slug: "icube", desc: t.products.icube.desc, img: icubeImg, tag: t.products.commercial },
    { name: t.products.ishell.name, slug: "ishell", desc: t.products.ishell.desc, img: ishellImg, tag: t.products.modular },
    { name: t.products.wwtp.name, slug: "wwtp", desc: t.products.wwtp.desc, img: wwtpImg, tag: t.products.municipal },
  ];

  return (
    <section id="products" className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-sm font-semibold text-primary uppercase tracking-widest">{t.products.subtitle}</span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-foreground mt-3">{t.products.title}</h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto text-lg">{t.products.desc}</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {products.map((p, i) => (
            <motion.div
              key={p.slug}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="group bg-card rounded-2xl overflow-hidden border border-border hover:shadow-xl transition-shadow duration-300"
            >
              <div className="aspect-[4/3] overflow-hidden bg-muted">
                <img src={p.img} alt={p.name} loading="lazy" width={800} height={800} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-6 md:p-8">
                <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-3">{p.tag}</span>
                <h3 className="text-xl md:text-2xl font-bold text-card-foreground mb-2">{p.name}</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">{p.desc}</p>
                <Link to={`/products/${p.slug}`} className="inline-flex items-center gap-1 text-primary font-semibold text-sm hover:gap-2 transition-all">
                  {t.products.learnMore} <ArrowRight className="w-4 h-4 rtl-flip" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
