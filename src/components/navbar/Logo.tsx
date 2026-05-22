import Link from "next/link";
import { MapPin } from "lucide-react";

const Logo = () => {
  return (
    <Link href="/" className="flex items-center gap-2 group">
      <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
        <MapPin className="w-5 h-5 text-primary-foreground" />
      </div>
      <span className="text-xl font-semibold tracking-tight">Landmark</span>
    </Link>
  );
};

export default Logo;
