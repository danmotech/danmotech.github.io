import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ProductsSection from "@/components/ProductsSection";
import TechnologySection from "@/components/TechnologySection";
import ReferencesSection from "@/components/ReferencesSection";
import PartnerSection from "@/components/PartnerSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import OrganizationSchema from "@/components/StructuredData";

const Index = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  return (
    <div className="min-h-screen">
      <SEOHead canonical="/" />
      <OrganizationSchema />
      <Navbar />
      <HeroSection />
      <ProductsSection />
      <TechnologySection />
      <ReferencesSection />
      <PartnerSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
