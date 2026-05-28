"use client";

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import CreateLandmarkForm from "../landmark/CreateLandmarkForm";
import useLandmark from "@/hooks/useLandmark";
import { SignInButton } from "@clerk/nextjs";
import DeleteConfirmationForm from "../form/DeleteConfirmationForm";
import { deleteLandmarkAction } from "@/actions/landmark";

const LandmarkModal = ({ userId }: { userId: String | null }) => {
  const { open, setOpen, modalMode, selectedCard, handleCreate } =
    useLandmark();

  const modalTitle =
    modalMode === "create"
      ? "Create New Landmark"
      : modalMode === "edit"
        ? "Edit Landmark"
        : "Delete Landmark";

  if (!userId) {
    return (
      <SignInButton mode="modal">
        <Button size="sm" className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Create Landmark
        </Button>
      </SignInButton>
    );
  }

  return (
    <>
      <Button
        size="sm"
        className="flex items-center gap-2"
        onClick={handleCreate}
      >
        <Plus className="w-4 h-4" />
        Create Landmark
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{modalTitle}</DialogTitle>
          </DialogHeader>

          {modalMode === "create" && (
            <CreateLandmarkForm onSuccess={() => setOpen(false)} />
          )}

          {modalMode === "edit" && selectedCard && (
            <CreateLandmarkForm
              onSuccess={() => setOpen(false)}
              value={selectedCard}
            />
          )}

          {modalMode === "delete" && selectedCard && (
            <DeleteConfirmationForm
              id={selectedCard?.id}
              name={selectedCard?.name}
              description="ข้อมูลแลนด์มาร์กและคอมเมนต์ทั้งหมดในสถานที่นี้จะถูกลบถาวร"
              action={deleteLandmarkAction}
              onSuccess={() => setOpen(false)}
              onCancel={() => setOpen(false)}
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default LandmarkModal;
