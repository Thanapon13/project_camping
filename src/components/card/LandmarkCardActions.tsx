import useLandmark from "@/hooks/useLandmark";
import { LandmarkCardProps } from "@/utils/types";
import { LandmarkCardButtonActions } from "../buttons/Buttons";

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
      <LandmarkCardButtonActions
        title="Edit Landmark"
        onClick={e => {
          e.stopPropagation();
          handleEdit(landmark);
        }}
      />

      <LandmarkCardButtonActions
        title="Delete Landmark"
        onClick={e => {
          e.stopPropagation();
          handleDelete(landmark);
        }}
      />
    </div>
  );
};

export default LandmarkCardActions;
