import FooterBrand from "./FooterBrand";
import FooterLinkGroup from "./FooterLinkGroup";
import FooterBottom from "./FooterBottom";
import { footerLinks } from "./footerLinks";

const Footer = () => {
  const { explore, company, support } = footerLinks;

  return (
    <footer className="bg-muted/30 border-t border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          <FooterBrand />
          <FooterLinkGroup heading="Explore" links={explore} />
          <FooterLinkGroup heading="Company" links={company} />
          <FooterLinkGroup heading="Support" links={support} />
        </div>
        <FooterBottom />
      </div>
    </footer>
  );
};

export default Footer;
