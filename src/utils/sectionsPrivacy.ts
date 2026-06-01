type SectionPrivacy = {
  title: string;
  content: string;
};

const sectionPrivacy: SectionPrivacy[] = [
  {
    title: "1. Information We Collect",
    content:
      "We collect information you provide directly, including your name, email, profile picture, and Landmark data you create, as well as usage data such as pages visited and time spent on the platform.",
  },
  {
    title: "2. How We Use Your Information",
    content:
      "Your data is used to operate the Landmark Explorer platform, improve your experience, send relevant notifications, and analyze usage to develop our services.",
  },
  {
    title: "3. Sharing Your Information",
    content:
      "We do not sell or rent your personal data to third parties. Information may be shared with service providers that help operate the platform, such as Clerk (Authentication) and Supabase (Database), each of which has its own privacy policy.",
  },
  {
    title: "4. Data Security",
    content:
      "We employ appropriate security measures including HTTPS encryption, authentication via Clerk, and secure data storage on Supabase PostgreSQL.",
  },
  {
    title: "5. Your Rights",
    content:
      "You may access, edit, or delete your personal data at any time through your Profile page, or contact us directly to request account deletion.",
  },
  {
    title: "6. Cookies",
    content:
      "We use cookies to maintain your login session and enhance your experience. You can disable cookies in your browser settings, though some features may not function correctly.",
  },
  {
    title: "7. Policy Changes",
    content:
      "We may update this Privacy Policy from time to time. Significant changes will be announced on the website. Continued use of the platform after any changes constitutes your acceptance of the new policy.",
  },
];

export default sectionPrivacy;
