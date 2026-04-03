import { useEffect } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { ProductSchema } from "@/components/StructuredData";
import { useLanguage } from "@/i18n/LanguageContext";
import { getProducts, getProduct } from "@/data/productData";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const ProductDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const location = useLocation();
  const { t, locale } = useLanguage();
  const isRtl = locale === "ar";
  const products = getProducts(locale);
  const product = slug ? getProduct(locale, slug) : undefined;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">{t.detail.notFound}</h1>
          <Link to="/" className="text-primary hover:underline">{t.detail.backHome}</Link>
        </div>
      </div>
    );
  }

  const otherProducts = Object.values(products).filter((p) => p.slug !== product.slug);

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={`${product.name} - Danmotech`}
        description={product.description[0]}
        canonical={`/products/${product.slug}`}
        type="product"
      />
      <ProductSchema
        name={product.name}
        description={product.description[0]}
        image={product.img}
        slug={product.slug}
      />
      <Navbar />
      {/* Hero */}
      <section className="pt-28 pb-16 md:pt-36 md:pb-24 bg-section-dark text-section-dark-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent" />
        <div className="container mx-auto px-6 relative z-10">
          <Link
            to="/#products"
            className="inline-flex items-center gap-2 text-sm text-section-dark-foreground/70 hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4 rtl-flip" /> {t.detail.backToProducts}
          </Link>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial="hidden" animate="visible" variants={fadeUp}>
              <span className="inline-block px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-semibold mb-4">
                {product.tag}
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 font-display">
                {product.name}
              </h1>
              <p className="text-xl md:text-2xl text-section-dark-foreground/80 mb-8">
                {product.tagline}
              </p>

              {/* Highlight cards */}
              <div className="grid grid-cols-2 gap-4">
                {product.highlights.map((h) => (
                  <div
                    key={h.label}
                    className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4"
                  >
                    <div className="flex items-center gap-2 text-primary mb-1">
                      {h.icon}
                      <span className="text-xs font-semibold uppercase tracking-wider text-section-dark-foreground/60">
                        {h.label}
                      </span>
                    </div>
                    {/* Force LTR for numeric values to prevent BiDi reversal of ranges like "50–200" */}
                    <p className="text-lg font-bold" dir="ltr" style={{ textAlign: isRtl ? "right" : "left" }}>{h.value}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="rounded-2xl overflow-hidden shadow-2xl border border-white/10">
                <img
                  src={product.img}
                  alt={product.name}
                  className="w-full aspect-[4/3] object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Description */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="max-w-3xl"
          >
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-6 font-display">
              {t.detail.overview}
            </h2>
            {product.description.map((p, i) => (
              <p key={i} className="text-muted-foreground text-lg leading-relaxed mb-4">
                {p}
              </p>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Specifications Table */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-8 font-display">
              {t.detail.specifications}
            </h2>

            <div className="overflow-x-auto rounded-xl border border-border bg-card">
              <table className="w-full text-left rtl:text-right">
                <thead>
                  <tr className="bg-muted/50">
                    <th className="px-6 py-4 text-sm font-semibold text-foreground">{t.detail.tableHeaders.model}</th>
                    <th className="px-6 py-4 text-sm font-semibold text-foreground">{t.detail.tableHeaders.capacity}</th>
                    <th className="px-6 py-4 text-sm font-semibold text-foreground">{t.detail.tableHeaders.size}</th>
                    <th className="px-6 py-4 text-sm font-semibold text-foreground">{t.detail.tableHeaders.inlet}</th>
                    <th className="px-6 py-4 text-sm font-semibold text-foreground">{t.detail.tableHeaders.outlet}</th>
                    <th className="px-6 py-4 text-sm font-semibold text-foreground">{t.detail.tableHeaders.power}</th>
                  </tr>
                </thead>
                <tbody>
                  {product.specs.map((s, i) => (
                    <tr key={i} className="border-t border-border hover:bg-muted/20 transition-colors">
                      <td className="px-6 py-4 font-semibold text-foreground">{s.model}</td>
                      <td className="px-6 py-4 text-muted-foreground" dir="auto">{s.capacity}</td>
                      <td className="px-6 py-4 text-muted-foreground" dir="auto">{s.size}</td>
                      <td className="px-6 py-4 text-muted-foreground" dir="auto">{s.inlet}</td>
                      <td className="px-6 py-4 text-muted-foreground" dir="auto">{s.outlet}</td>
                      <td className="px-6 py-4 text-muted-foreground" dir="auto">{s.power}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Inlet / Outlet criteria for iCUBE */}
            {product.inletCriteria && product.outletCriteria && (
              <div className="grid md:grid-cols-2 gap-8 mt-10">
                <div className="rounded-xl border border-border bg-card overflow-hidden">
                  <div className="bg-primary/10 px-6 py-3">
                    <h3 className="font-bold text-foreground">{t.detail.inletCriteria}</h3>
                  </div>
                  <table className="w-full">
                    <tbody>
                      {product.inletCriteria.map((c, i) => (
                        <tr key={i} className="border-t border-border">
                          <td className="px-6 py-3 font-medium text-foreground">{c.param}</td>
                          <td className="px-6 py-3 text-muted-foreground text-right rtl:text-left" dir="ltr">{c.value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="rounded-xl border border-border bg-card overflow-hidden">
                  <div className="bg-primary/10 px-6 py-3">
                    <h3 className="font-bold text-foreground">{t.detail.outletCriteria}</h3>
                  </div>
                  <table className="w-full">
                    <tbody>
                      {product.outletCriteria.map((c, i) => (
                        <tr key={i} className="border-t border-border">
                          <td className="px-6 py-3 font-medium text-foreground">{c.param}</td>
                          <td className="px-6 py-3 text-muted-foreground text-right rtl:text-left" dir="ltr">{c.value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Bio Tank Parameters for iSHELL */}
            {product.bioTankSpecs && (
              <div className="mt-10">
                <h3 className="text-xl font-bold text-foreground mb-4">{t.detail.bioTankParams}</h3>
                <div className="overflow-x-auto rounded-xl border border-border bg-card">
                  <table className="w-full text-left rtl:text-right">
                    <thead>
                      <tr className="bg-muted/50">
                        <th className="px-4 py-3 text-sm font-semibold text-foreground">{t.detail.tableHeaders.mode}</th>
                        <th className="px-4 py-3 text-sm font-semibold text-foreground">{t.detail.tableHeaders.volTotal}</th>
                        <th className="px-4 py-3 text-sm font-semibold text-foreground">{t.detail.tableHeaders.biofillerVol}</th>
                        <th className="px-4 py-3 text-sm font-semibold text-foreground">{t.detail.tableHeaders.width}</th>
                        <th className="px-4 py-3 text-sm font-semibold text-foreground">{t.detail.tableHeaders.height}</th>
                        <th className="px-4 py-3 text-sm font-semibold text-foreground">{t.detail.tableHeaders.inletDia}</th>
                        <th className="px-4 py-3 text-sm font-semibold text-foreground">{t.detail.tableHeaders.inletHeight}</th>
                        <th className="px-4 py-3 text-sm font-semibold text-foreground">{t.detail.tableHeaders.weight}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {product.bioTankSpecs.map((b, i) => (
                        <tr key={i} className="border-t border-border hover:bg-muted/20 transition-colors">
                          <td className="px-4 py-3 font-semibold text-foreground">{b.mode}</td>
                          <td className="px-4 py-3 text-muted-foreground" dir="auto">{b.volTotal}</td>
                          <td className="px-4 py-3 text-muted-foreground" dir="auto">{b.biofillerVol}</td>
                          <td className="px-4 py-3 text-muted-foreground" dir="auto">{b.width}</td>
                          <td className="px-4 py-3 text-muted-foreground" dir="auto">{b.height}</td>
                          <td className="px-4 py-3 text-muted-foreground" dir="auto">{b.inletDia}</td>
                          <td className="px-4 py-3 text-muted-foreground" dir="auto">{b.inletHeight}</td>
                          <td className="px-4 py-3 text-muted-foreground" dir="auto">{b.weight}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Application Areas (iSHELL) */}
      {product.applicationAreas && (
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-6">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-8 font-display">
                {t.detail.applicationAreas}
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                {product.applicationAreas.map((area, i) => (
                  <div key={i} className="bg-card border border-border rounded-xl p-6">
                    <CheckCircle2 className="w-6 h-6 text-primary mb-3" />
                    <p className="text-muted-foreground leading-relaxed">{area}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Technology Features + Advantages */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-8 font-display">
                {t.detail.techFeatures}
              </h2>
              <ul className="space-y-4">
                {product.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                    <span className="text-muted-foreground leading-relaxed">{f}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{ ...fadeUp, visible: { ...fadeUp.visible, transition: { duration: 0.5, delay: 0.15 } } }}
            >
              <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-8 font-display">
                {t.detail.advantages}
              </h2>
              <ul className="space-y-4">
                {product.advantages.map((a, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-accent mt-0.5 shrink-0" />
                    <span className="text-muted-foreground leading-relaxed">{a}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-section-dark text-section-dark-foreground">
        <div className="container mx-auto px-6 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4 font-display">
              {t.detail.interestedIn} {product.name}?
            </h2>
            <p className="text-section-dark-foreground/70 text-lg mb-8 max-w-2xl mx-auto">
              {t.detail.ctaDesc}
            </p>
            <Link
              to="/#contact"
              className="inline-block px-8 py-4 bg-primary text-primary-foreground rounded-xl text-lg font-semibold hover:opacity-90 transition-opacity"
            >
              {t.nav.getQuote}
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Other Products */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-10 font-display">
            {t.detail.otherProducts}
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {otherProducts.map((p) => (
              <Link
                key={p.slug}
                to={`/products/${p.slug}`}
                className="group bg-card rounded-2xl overflow-hidden border border-border hover:shadow-xl transition-shadow"
              >
                <div className="aspect-[4/3] overflow-hidden bg-muted">
                  <img
                    src={p.img}
                    alt={p.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-5">
                  <span className="inline-block px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-2">
                    {p.tag}
                  </span>
                  <h3 className="text-lg font-bold text-card-foreground">{p.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ProductDetail;
