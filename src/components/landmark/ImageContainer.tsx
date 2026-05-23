"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import { Camera, Expand, Heart, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import FavoriteToggleButton from "../card/FavoriteToggleButton";

interface ImageContainerProps {
  image: string;
  name: string;
  landmarkId: string;
  favoriteId: string | null;
  userId: string | null;
}

const ImageContainer = ({
  image,
  name,
  landmarkId,
  favoriteId,
  userId,
}: ImageContainerProps) => {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative mt-6 rounded-2xl overflow-hidden group"
      >
        {/* Main Image */}
        <div className="relative aspect-[16/9] md:aspect-[21/9] w-full">
          <Image
            src={image}
            alt={name}
            fill
            priority
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Action Buttons */}
        <div className="absolute top-4 right-4 flex gap-2">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <FavoriteToggleButton
              landmarkId={landmarkId}
              favoriteId={favoriteId}
              userId={userId}
              className="bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg"
            />
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="secondary"
              size="icon"
              className="bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg"
            >
              <Share2 className="w-5 h-5 text-gray-700" />
            </Button>
          </motion.div>
        </div>

        {/* View Photos Button */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="absolute bottom-4 right-4"
        >
          <Button
            variant="secondary"
            className="bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg gap-2"
            onClick={() => setIsLightboxOpen(true)}
          >
            <Camera className="w-4 h-4" />
            View Photos
          </Button>
        </motion.div>

        {/* Photo Count Badge */}
        <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-sm flex items-center gap-2">
          <Expand className="w-4 h-4" />
          <span>1 Photo</span>
        </div>
      </motion.div>

      {/* Lightbox Modal */}
      {isLightboxOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={() => setIsLightboxOpen(false)}
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="relative max-w-6xl w-full aspect-video"
          >
            <Image src={image} alt={name} fill className="object-contain" />
            <Button
              variant="secondary"
              size="icon"
              className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 text-white"
              onClick={() => setIsLightboxOpen(false)}
            >
              <span className="text-2xl">&times;</span>
            </Button>
          </motion.div>
        </motion.div>
      )}
    </>
  );
};

export default ImageContainer;
