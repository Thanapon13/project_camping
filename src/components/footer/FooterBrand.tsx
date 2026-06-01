import Link from "next/link";
import { MapPin, Mail, Phone } from "lucide-react";

const FooterBrand = () => {
  return (
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
  );
};

export default FooterBrand;
