import { Helmet } from "react-helmet-async";
import { useLanguage } from "@/i18n/LanguageContext";
import type { Locale } from "@/i18n/translations";

interface SEOHeadProps {
  title?: string;
  description?: string;
  canonical?: string;   // e.g. "/" or "/products/icell"
  type?: string;
  image?: string;
  noindex?: boolean;
}

const siteUrl = "https://www.danmotech.com";

const defaultTitles: Record<Locale, string> = {
  en: "Danmotech - Sewage & Waste Water Treatment Solutions",
  zh: "丹模科技 - 污水及废水处理解决方案",
  de: "Danmotech - Abwasser- & Kläranlagenlösungen",
  es: "Danmotech - Soluciones de Tratamiento de Aguas Residuales",
  ar: "دانموتيك - حلول معالجة مياه الصرف الصحي",
};

const defaultDescs: Record<Locale, string> = {
  en: "Danmotech provides advanced decentralized sewage and wastewater treatment systems including iCELL, iCUBE, iSHELL series and full-scale WWTP solutions for residential, commercial, and municipal applications worldwide.",
  zh: "丹模科技提供先进的分散式污水和废水处理系统，包括iCELL、iCUBE、iSHELL系列及大型废水处理厂解决方案，应用于全球住宅、商业和市政领域。",
  de: "Danmotech bietet fortschrittliche dezentrale Abwasserbehandlungssysteme einschließlich iCELL, iCUBE, iSHELL Serien und Großkläranlagen für Wohn-, Gewerbe- und kommunale Anwendungen weltweit.",
  es: "Danmotech ofrece sistemas avanzados de tratamiento de aguas residuales descentralizados, incluyendo las series iCELL, iCUBE, iSHELL y soluciones WWTP a gran escala para aplicaciones residenciales, comerciales y municipales.",
  ar: "تقدم دانموتيك أنظمة متقدمة لمعالجة مياه الصرف الصحي اللامركزية، بما في ذلك سلاسل iCELL وiCUBE وiSHELL وحلول محطات المعالجة الكاملة للتطبيقات السكنية والتجارية والبلدية حول العالم.",
};

// BCP-47 locale codes for og:locale and html lang
const localeMap: Record<Locale, string> = {
  en: "en_US",
  zh: "zh_CN",
  de: "de_DE",
  es: "es_ES",
  ar: "ar_SA",
};

// hreflang codes
const hreflangMap: Record<Locale, string> = {
  en: "en",
  zh: "zh-Hans",
  de: "de",
  es: "es",
  ar: "ar",
};

const SEOHead = ({
  title,
  description,
  canonical = "/",
  type = "website",
  image,
  noindex = false,
}: SEOHeadProps) => {
  const { locale } = useLanguage();

  const finalTitle = title || defaultTitles[locale];
  const finalDesc = description || defaultDescs[locale];
  const finalCanonical = `${siteUrl}${canonical}`;
  const finalImage = image || `${siteUrl}/og-image.jpg`;
  const ogLocale = localeMap[locale];

  // All alternate locales for og:locale:alternate
  const altLocales = (Object.keys(localeMap) as Locale[]).filter((l) => l !== locale);

  return (
    <Helmet>
      {/* Core */}
      <html lang={hreflangMap[locale]} dir={locale === "ar" ? "rtl" : "ltr"} />
      <title>{finalTitle}</title>
      <meta name="description" content={finalDesc} />
      <link rel="canonical" href={finalCanonical} />
      {noindex && <meta name="robots" content="noindex,nofollow" />}
      {!noindex && <meta name="robots" content="index,follow" />}

      {/* Open Graph */}
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDesc} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={finalCanonical} />
      <meta property="og:image" content={finalImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content={ogLocale} />
      {altLocales.map((l) => (
        <meta key={l} property="og:locale:alternate" content={localeMap[l]} />
      ))}
      <meta property="og:site_name" content="Danmotech" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={finalDesc} />
      <meta name="twitter:image" content={finalImage} />

      {/* hreflang — tells Google which language version to serve per region */}
      {(Object.keys(hreflangMap) as Locale[]).map((l) => (
        <link
          key={l}
          rel="alternate"
          hrefLang={hreflangMap[l]}
          href={`${siteUrl}${canonical}`}
        />
      ))}
      <link rel="alternate" hrefLang="x-default" href={`${siteUrl}${canonical}`} />

      {/* Additional SEO */}
      <meta name="keywords" content="wastewater treatment, sewage treatment plant, iCELL, iCUBE, iSHELL, WWTP, decentralized water treatment, German biofilm technology, Danmotech" />
      <meta name="author" content="Danmotech" />
    </Helmet>
  );
};

export default SEOHead;
