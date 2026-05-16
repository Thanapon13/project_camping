"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import CreateLandmarkForm from "../landmark/CreateLandmarkForm";

const CreateLandmarkModal = () => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(false);
  console.log("selected", selected);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Create Landmark
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Landmark</DialogTitle>
        </DialogHeader>

        <CreateLandmarkForm onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
};

export default CreateLandmarkModal;
