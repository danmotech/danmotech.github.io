import { Helmet } from "react-helmet-async";

const siteUrl = "https://www.danmotech.com";

const OrganizationSchema = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Danmotech",
    url: siteUrl,
    logo: {
      "@type": "ImageObject",
      url: `${siteUrl}/favicon.png`,
      width: 512,
      height: 512,
    },
    description:
      "Advanced decentralized sewage and wastewater treatment solutions provider with German technology. Serving residential, commercial, and municipal clients worldwide.",
    email: "tony@danmotech.com",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Shanghai",
      addressCountry: "CN",
    },
    contactPoint: {
      "@type": "ContactPoint",
      email: "tony@danmotech.com",
      contactType: "sales",
      availableLanguage: ["English", "Chinese", "German", "Spanish", "Arabic"],
    },
    areaServed: "Worldwide",
    foundingDate: "2009",
    knowsAbout: [
      "Wastewater treatment",
      "Sewage treatment plants",
      "Decentralized water treatment",
      "German fixed-bed biofilm technology",
      "Municipal wastewater treatment",
      "Industrial wastewater treatment",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Wastewater Treatment Products",
      itemListElement: [
        { "@type": "Offer", itemOffered: { "@type": "Product", name: "iCELL Series", url: `${siteUrl}/products/icell` } },
        { "@type": "Offer", itemOffered: { "@type": "Product", name: "iCUBE Series", url: `${siteUrl}/products/icube` } },
        { "@type": "Offer", itemOffered: { "@type": "Product", name: "iSHELL Series", url: `${siteUrl}/products/ishell` } },
        { "@type": "Offer", itemOffered: { "@type": "Product", name: "Waste Water Treatment Plant", url: `${siteUrl}/products/wwtp` } },
      ],
    },
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
};

interface ProductSchemaProps {
  name: string;
  description: string;
  image: string;
  slug: string;
}

export const ProductSchema = ({ name, description, image, slug }: ProductSchemaProps) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name,
    description,
    image: image.startsWith("http") ? image : `${siteUrl}${image}`,
    url: `${siteUrl}/products/${slug}`,
    brand: {
      "@type": "Brand",
      name: "Danmotech",
    },
    manufacturer: {
      "@type": "Organization",
      name: "Danmotech",
      url: siteUrl,
    },
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      priceCurrency: "USD",
      seller: {
        "@type": "Organization",
        name: "Danmotech",
      },
    },
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
};

export default OrganizationSchema;
