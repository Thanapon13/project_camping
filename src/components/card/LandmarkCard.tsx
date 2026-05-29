"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FromPageType, LandmarkCardProps } from "@/utils/types";
import LandmarkCardActions from "./LandmarkCardActions";
import FavoriteToggleButton from "./FavoriteToggleButton";
import LandmarkCardImage from "./Landmarkcardimage";
import LandmarkCardContent from "./Landmarkcardcontent";

type LandmarkCardProps_ = {
  landmark: LandmarkCardProps;
  userId: string | null;
  favoriteId: string | null;
  fromPage?: FromPageType;
  index?: number;
};

const LandmarkCard = ({
  landmark,
  userId,
  favoriteId,
  fromPage,
  index = 0,
}: LandmarkCardProps_) => {
  const { id, name, image, description, province, category, profileId } =
    landmark;

  const detailHref = `/landmark/${id}?from=${fromPage}${favoriteId ? `&favoriteId=${favoriteId}` : ""}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <div className="relative rounded-2xl bg-card border border-border/50 shadow-sm hover:shadow-xl transition-all duration-300 group">
        <Link href={detailHref} className="block">
          <LandmarkCardImage image={image} name={name} category={category} />
          <LandmarkCardContent
            name={name}
            province={province}
            description={description}
          />
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
