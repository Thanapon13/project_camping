import Link from "next/link";
import { MapPin } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { LandmarkCardProps } from "@/utils/types";
import FavoriteToggleButton from "./FavoriteToggleButton";
import LandmarkRating from "./LandmarkRating";

const LandmarkCard = ({ landmark }: { landmark: LandmarkCardProps }) => {
  const { name, image, id, description, price, province, category, lat, lng } =
    landmark;

  const truncatedDescription =
    description.length > 40
      ? description.substring(0, 40) + "..."
      : description;

  return (
    <Card className="overflow-hidden">
      <div className="group relative h-[300px] bg-muted">
        <Image
          src={image}
          alt={name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover
          group-hover:scale-105 transition-transform
           duration-300"
        />

        <span className="absolute top-3 left-3 bg-background/90 border border-border rounded-full px-3 py-0.5 text-xs text-muted-foreground capitalize">
          {category}
        </span>

        <FavoriteToggleButton landmarkId={id} />
      </div>

      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-1">
          <p className="font-medium text-sm truncate pr-2">
            {name.substring(0, 40)}
          </p>

          <span className="text-sm font-semibold whitespace-nowrap">
            ฿{price.toLocaleString()}
          </span>
        </div>

        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1">
            <MapPin className="w-3 h-3 text-muted-foreground" />

            <span className="text-xs text-muted-foreground">{province}</span>
          </div>

          <LandmarkRating />
        </div>

        <CardDescription className="text-sm leading-relaxed h-[50px] wrap-break-word">
          {truncatedDescription}
        </CardDescription>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button asChild className="w-full">
          <Link href={`/landmark/${id}`}>View details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default LandmarkCard;
