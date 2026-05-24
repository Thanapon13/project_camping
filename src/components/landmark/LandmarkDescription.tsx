"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { ChevronDown, ChevronUp, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LandmarkDescriptionProps {
  description: string;
}

const LandmarkDescription = ({ description }: LandmarkDescriptionProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const maxLength = 400;
  const shouldTruncate = description.length > maxLength;

  const displayText = isExpanded
    ? description
    : description.slice(0, maxLength) + (shouldTruncate ? "..." : "");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3 }}
      className="py-6"
    >
      <div className="flex items-center gap-2 mb-4">
        <div className="p-2 rounded-lg bg-primary/10">
          <Quote className="w-5 h-5 text-primary" />
        </div>
        <h3 className="text-xl font-semibold">Description</h3>
      </div>

      <div className="relative wrap-break-word">
        <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
          {displayText}
        </p>

        {shouldTruncate && (
          <motion.div initial={false} animate={{ opacity: 1 }} className="mt-4">
            <Button
              variant="link"
              className="p-0 h-auto font-semibold text-primary hover:text-primary/80"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? (
                <>
                  Show less <ChevronUp className="w-4 h-4 ml-1" />
                </>
              ) : (
                <>
                  Read more <ChevronDown className="w-4 h-4 ml-1" />
                </>
              )}
            </Button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default LandmarkDescription;
