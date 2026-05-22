"use client";

import { Button } from "../ui/button";
import { Pencil, Trash2 } from "lucide-react";
import useLandmark from "@/hooks/useLandmark";
import { LandmarkCardProps } from "@/utils/types";

const LandmarkCardActions = ({
  landmark,
  onClick,
}: {
  landmark: LandmarkCardProps;
  onClick?: (e: React.MouseEvent) => void;
}) => {
  const { handleEdit, handleDelete } = useLandmark();

  return (
    <div
      onClick={onClick}
      className="absolute top-3 right-12 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
    >
      <Button
        variant="secondary"
        size="icon"
        className="h-8 w-8 rounded-full bg-background/90 backdrop-blur-sm shadow-sm hover:bg-background cursor-pointer"
        onClick={e => {
          e.stopPropagation();
          handleEdit(landmark);
        }}
        title="Edit Landmark"
      >
        <Pencil className="h-4 w-4 text-muted-foreground hover:text-foreground" />
      </Button>

      <Button
        variant="secondary"
        size="icon"
        className="h-8 w-8 rounded-full bg-background/90 backdrop-blur-sm shadow-sm hover:bg-destructive/10 hover:text-destructive cursor-pointer"
        onClick={e => {
          e.stopPropagation();
          handleDelete(landmark);
        }}
        title="Delete Landmark"
      >
        <Trash2 className="h-4 w-4 text-muted-foreground hover:text-destructive" />
      </Button>
    </div>
  );
};

export default LandmarkCardActions;
