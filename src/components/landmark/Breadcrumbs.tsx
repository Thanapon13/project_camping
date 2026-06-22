import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { Home, MapPin, Heart, User } from "lucide-react";
import MotionNav from "@/components/motion/MotionNav";

interface BreadcrumbsProps {
  name: string;
  fromPage: string;
}

function Breadcrumbs({ name, fromPage }: BreadcrumbsProps) {
  const config = {
    home:     { url: "/",        label: "Home",     icon: Home },
    favorites: { url: "/favorits", label: "Favorites", icon: Heart },
    profile:  { url: "/profile", label: "Profile",  icon: User },
  };

  const { url: backUrl, label: backLabel, icon: BackIcon } =
    config[fromPage as keyof typeof config] ?? config.home;

  return (
    <MotionNav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      aria-label="Breadcrumb"
    >
      <Breadcrumb>
        <BreadcrumbList className="flex items-center gap-1 text-sm">
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link
                href={backUrl}
                className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1.5"
              >
                <BackIcon className="w-4 h-4" />
                {backLabel}
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbSeparator />

          <BreadcrumbItem>
            <BreadcrumbPage className="text-foreground font-medium flex items-center gap-1.5 truncate max-w-[200px] sm:max-w-[400px]">
              <MapPin className="w-4 h-4 text-primary" />
              {name}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </MotionNav>
  );
}

export default Breadcrumbs;
