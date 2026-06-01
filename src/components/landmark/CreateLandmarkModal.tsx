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

const CreateLandmarkModal = ({ userId }: { userId: String | null }) => {
  const { open, setOpen, modalMode, handleCreate } = useLandmark();

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

      <Dialog open={open && modalMode === "create"} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Create New Landmark</DialogTitle>
          </DialogHeader>
          {modalMode === "create" && (
            <CreateLandmarkForm onSuccess={() => setOpen(false)} />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CreateLandmarkModal;
