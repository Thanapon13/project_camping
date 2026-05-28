import Image from "next/image";

type LandmarkCardImageProps = {
  image: string;
  name: string;
  category: string;
};

const LandmarkCardImage = ({
  image,
  name,
  category,
}: LandmarkCardImageProps) => {
  return (
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
      <span className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-sm text-xs font-medium text-foreground capitalize transition-colors dark:bg-zinc-800/90">
        {category}
      </span>
    </div>
  );
};

export default LandmarkCardImage;
