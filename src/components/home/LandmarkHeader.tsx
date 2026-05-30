"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import LandmarkModal from "../landmark/LandmarkModal";
import Link from "next/link";

const LandmarkHeader = ({ userId }: { userId: String | null }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10"
    >
      <div>
        <h2 className="text-3xl lg:text-4xl font-bold text-foreground text-balance">
          All Landmarks
        </h2>
        <p className="mt-2 text-muted-foreground">
          Discover amazing places across Thailand
        </p>
      </div>

      <div className="flex items-center gap-3">
        <LandmarkModal userId={userId} />

        <Button variant="ghost" className="gap-2 group" asChild>
          <Link href="/landmarks">
            View all
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </Button>
      </div>
    </motion.div>
  );
};

export default LandmarkHeader;
