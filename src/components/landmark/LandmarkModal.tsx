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
import { SignInCardButton } from "../buttons/Buttons";
import { SignInButton } from "@clerk/nextjs";

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
            <div className="space-y-4 py-4">
              <p className="text-sm text-muted-foreground">
                คุณแน่ใจหรือไม่ว่าต้องการลบ{" "}
                <span className="font-semibold text-foreground">
                  {selectedCard.name}
                </span>
                ? การกระทำนี้ไม่สามารถย้อนกลับได้
              </p>
              <div className="flex gap-2 justify-end">
                <Button variant="outline" onClick={() => setOpen(false)}>
                  ยกเลิก
                </Button>
                <Button variant="destructive" onClick={() => setOpen(false)}>
                  ยืนยันลบ
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default LandmarkModal;
