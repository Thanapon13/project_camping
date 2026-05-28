import { MapPin, Star } from "lucide-react";

type LandmarkCardContentProps = {
  name: string;
  province: string;
  description: string;
};

const LandmarkCardContent = ({
  name,
  province,
  description,
}: LandmarkCardContentProps) => {
  return (
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

      <p className="text-sm text-muted-foreground line-clamp-2 min-h-[2.5rem]">
        {description}
      </p>
    </div>
  );
};

export default LandmarkCardContent;
