"use client";

import { motion } from "framer-motion";
import { MapPin, Share2, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LandmarkHeaderProps {
  name: string;
  province: string;
  category: string;
}

const LandmarkHeader = ({ name, province, category }: LandmarkHeaderProps) => {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: name,
          text: `Check out ${name} in ${province}`,
          url: window.location.href,
        });
      } catch (err) {
        console.log("Error sharing:", err);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="mt-6"
    >
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight">
            {name}
          </h1>
          <div className="flex flex-wrap items-center gap-3 mt-3">
            {/* Rating */}
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span className="font-semibold">4.92</span>
              <span className="text-muted-foreground">(128 reviews)</span>
            </div>

            <span className="text-muted-foreground">·</span>

            {/* Location */}
            <div className="flex items-center gap-1 text-muted-foreground">
              <MapPin className="w-4 h-4" />
              <span>{province}, Thailand</span>
            </div>

            <span className="text-muted-foreground">·</span>

            {/* Category Badge */}
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary capitalize">
              {category}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="gap-2 hover:bg-accent"
            onClick={handleShare}
          >
            <Share2 className="w-4 h-4" />
            <span className="underline font-medium">Share</span>
          </Button>
        </div>
      </div>
    </motion.header>
  );
};

export default LandmarkHeader;
