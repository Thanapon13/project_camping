"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { BadgeCheck, Calendar, MessageCircle, Star } from "lucide-react";

interface HostInfoProps {
  profile: {
    firstName: string;
    lastName: string;
    profileImage: string;
    createdAt: Date | string;
  };
}

const HostInfo = ({ profile }: HostInfoProps) => {
  const { firstName, lastName, profileImage } = profile;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="py-6"
    >
      <div className="flex items-start justify-between">
        {/* Host Info */}
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-14 h-14 rounded-full overflow-hidden ring-2 ring-primary/20 ring-offset-2">
              <Image
                src={profileImage}
                alt={firstName}
                width={56}
                height={56}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="absolute -bottom-1 -right-1 bg-primary rounded-full p-0.5">
              <BadgeCheck className="w-4 h-4 text-white" />
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-lg">
              {firstName} {lastName}
            </h3>
            <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1">
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                Joined 2024
              </span>
              <span className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                4.9 rating
              </span>
            </div>
          </div>
        </div>

        {/* Contact Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-accent transition-colors"
        >
          <MessageCircle className="w-4 h-4" />
          <span className="text-sm font-medium">Contact Host</span>
        </motion.button>
      </div>
    </motion.div>
  );
};

export default HostInfo;
