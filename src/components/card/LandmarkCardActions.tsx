"use client";

import { usePathname } from "next/navigation";
import useLandmark from "@/hooks/useLandmark";
import { LandmarkCardProps } from "@/utils/types";
import { LandmarkCardButtonActions } from "../buttons/Buttons";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import CreateLandmarkForm from "../landmark/CreateLandmarkForm";
import DeleteConfirmationForm from "../form/DeleteConfirmationForm";
import { deleteLandmarkAction } from "@/actions/landmark";

const LandmarkCardActions = ({
  landmark,
  onClick,
}: {
  landmark: LandmarkCardProps;
  onClick?: (e: React.MouseEvent) => void;
}) => {
  const pathname = usePathname();
  const { handleEdit, handleDelete, open, setOpen, modalMode, selectedCard } =
    useLandmark();

  const isThisCard = selectedCard?.id === landmark.id;
  const modalTitle = modalMode === "edit" ? "Edit Landmark" : "Delete Landmark";

  return (
    <>
      <div
        onClick={onClick}
        className="absolute top-3 right-12 flex gap-1.5 opacity-0 group-hover:opacity-100 [@media(hover:none)]:opacity-100 transition-opacity duration-200"
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

      {isThisCard && (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{modalTitle}</DialogTitle>
            </DialogHeader>

            {modalMode === "edit" && selectedCard && (
              <CreateLandmarkForm
                onSuccess={() => setOpen(false)}
                value={selectedCard}
                pathname={pathname}
              />
            )}

            {modalMode === "delete" && selectedCard && (
              <DeleteConfirmationForm
                id={selectedCard.id}
                name={selectedCard.name}
                description="ข้อมูลแลนด์มาร์กและคอมเมนต์ทั้งหมดในสถานที่นี้จะถูกลบถาวร"
                action={deleteLandmarkAction}
                pathname={pathname}
                onSuccess={() => setOpen(false)}
                onCancel={() => setOpen(false)}
              />
            )}
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default LandmarkCardActions;
