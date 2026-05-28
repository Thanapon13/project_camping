import { Star } from "lucide-react";

const LandmarkRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex items-center gap-0.5 ml-auto">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`w-3 h-3 ${
            i < rating ? "fill-amber-400 text-amber-400" : "text-muted"
          }`}
        />
      ))}
    </div>
  );
};
export default LandmarkRating;
