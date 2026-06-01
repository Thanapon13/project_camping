import Link from "next/link";
import { MapPin, Mail, Phone } from "lucide-react";

const footerLinks = {
  explore: [
    { label: "All Landmarks", href: "/landmark" },
    { label: "Popular Destinations", href: "" },
    { label: "Nearby Places", href: "" },
    { label: "Categories", href: "" },
  ],
  company: [
    { label: "About Us", href: "" },
    { label: "Careers", href: "" },
    { label: "Blog", href: "" },
    { label: "Press", href: "" },
  ],
  support: [
    { label: "Help Center", href: "" },
    { label: "Contact Us", href: "" },
    { label: "Privacy Policy", href: "" },
    { label: "Terms of Service", href: "" },
  ],
};

const Footer = () => {
  return (
    <footer className="bg-muted/30 border-t border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                <MapPin className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-semibold">Landmark</span>
            </Link>
            <p className="text-muted-foreground mb-6 max-w-sm">
              Discover and explore the most beautiful landmarks across Thailand.
              Your adventure starts here.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-muted-foreground">
                <Mail className="w-4 h-4" />
                <span className="text-sm">thanapon.dev.work@gmail.com</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <Phone className="w-4 h-4" />
                <span className="text-sm">069-483-9598</span>
              </div>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Explore</h4>
            <ul className="space-y-3">
              {footerLinks.explore.map(link => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map(link => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Support</h4>
            <ul className="space-y-3">
              {footerLinks.support.map(link => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="py-6 border-t border-border/50">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Landmark Explorer. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
