import { LucideIcon, Mail, Phone } from "lucide-react";

type ContactInfo = {
  icon: LucideIcon;
  label: string;
  value: string;
  href: string | null;
};

const contactInfo: ContactInfo[] = [
  {
    icon: Mail,
    label: "Email",
    value: "thanapon.dev.work@gmail.com",
    href: "mailto:thanapon.dev.work@gmail.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "069-483-9598",
    href: "tel:0694839598",
  },
];

export default contactInfo;
