import Link from "next/link";
import { MapPin, Star } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { FromPageType, LandmarkCardProps } from "@/utils/types";
import LandmarkRating from "./LandmarkRating";
import LandmarkCardActions from "./LandmarkCardActions";
import FavoriteToggleButton from "./FavoriteToggleButton";
import { motion } from "framer-motion";

const LandmarkCard = ({
  landmark,
  userId,
  favoriteId,
  fromPage,
  index = 0,
}: {
  landmark: LandmarkCardProps;
  userId: string | null;
  favoriteId: string | null;
  fromPage?: FromPageType;
  index?: number;
}) => {
  const { name, image, id, description, province, category, profileId } =
    landmark;

  const truncatedDescription =
    description.length > 40
      ? description.substring(0, 40) + "..."
      : description;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <div className="relative rounded-2xl bg-card border border-border/50 shadow-sm hover:shadow-xl transition-all duration-300 group">
        <Link href={`/landmark/${id}?from=${fromPage}`} className="block">
          {/* Image Container */}
          <div className="relative aspect-[4/3] overflow-hidden rounded-t-2xl">
            <Image
              src={image || "/placeholder.svg"}
              alt={name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

            {/* Category Badge */}
            <span className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-sm text-xs font-medium text-foreground capitalize">
              {category}
            </span>
          </div>

          {/* Content */}
          <div className="p-4">
            <div className="flex items-start justify-between gap-2 mb-2">
              <h3 className="font-semibold text-foreground line-clamp-1 group-hover:text-primary transition-colors">
                {name}
              </h3>
              <div className="flex items-center gap-1 text-amber-500">
                <Star className="w-4 h-4 fill-amber-500" />
                <span className="text-sm font-medium">4.8</span>
              </div>
            </div>

            <div className="flex items-center gap-1.5 text-muted-foreground mb-3">
              <MapPin className="w-3.5 h-3.5" />
              <span className="text-sm">{province}</span>
            </div>

            <p className="text-sm text-muted-foreground line-clamp-2">
              {truncatedDescription}
            </p>
          </div>
        </Link>

        <div className="z-10" onClick={e => e.stopPropagation()}>
          <FavoriteToggleButton
            landmarkId={id}
            favoriteId={favoriteId}
            userId={userId}
          />

          {userId === profileId && <LandmarkCardActions landmark={landmark} />}
        </div>
      </div>
    </motion.div>
  );
};

export default LandmarkCard;
