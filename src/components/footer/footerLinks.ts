type FooterLink = { label: string; href: string };

export const footerLinks: Record<string, FooterLink[]> = {
  explore: [{ label: "All Landmarks", href: "/landmark" }],
  company: [
    { label: "About Us", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "Press", href: "/press" },
  ],
  support: [
    { label: "Help Center", href: "/help" },
    { label: "Contact Us", href: "/contact" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ],
};
