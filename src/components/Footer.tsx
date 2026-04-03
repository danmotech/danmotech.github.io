import { Link } from "react-router-dom";
import { useLanguage } from "@/i18n/LanguageContext";

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="py-12 bg-foreground">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img src="/favicon.png" alt="Danmotech" className="w-8 h-8 rounded-md" />
              <span className="font-display font-bold text-lg text-background">Danmotech</span>
            </div>
            <p className="text-background/50 text-sm leading-relaxed">{t.footer.desc}</p>
          </div>

          <div>
            <h4 className="font-bold text-background mb-4">{t.footer.products}</h4>
            <ul className="space-y-2 text-sm text-background/50">
              <li><Link to="/products/icell" className="hover:text-primary transition-colors">iCELL Series</Link></li>
              <li><Link to="/products/icube" className="hover:text-primary transition-colors">iCUBE Series</Link></li>
              <li><Link to="/products/ishell" className="hover:text-primary transition-colors">iSHELL Series</Link></li>
              <li><Link to="/products/wwtp" className="hover:text-primary transition-colors">WWTP</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-background mb-4">{t.footer.company}</h4>
            <ul className="space-y-2 text-sm text-background/50">
              <li><a href="/#technology" className="hover:text-primary transition-colors">{t.footer.technology}</a></li>
              <li><a href="/#references" className="hover:text-primary transition-colors">{t.footer.references}</a></li>
              <li><a href="/#partner" className="hover:text-primary transition-colors">{t.footer.becomePartner}</a></li>
              <li><a href="/#contact" className="hover:text-primary transition-colors">{t.footer.contact}</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-background mb-4">{t.footer.contact}</h4>
            <ul className="space-y-2 text-sm text-background/50">
              <li dir="ltr" className="rtl:text-right">tony@danmotech.com</li>
              <li dir="ltr" className="rtl:text-right">www.danmotech.com</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-background/10 pt-8 text-center text-sm text-background/40">
          © {new Date().getFullYear()} Danmotech. {t.footer.rights}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
