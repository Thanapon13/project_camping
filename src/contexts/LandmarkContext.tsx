"use client";

import { LandmarkCardProps } from "@/utils/types";
import { createContext, useState } from "react";

type ModalMode = "create" | "edit" | "delete" | null;

type LandmarkContextType = {
  open: boolean;
  setOpen: (open: boolean) => void;
  modalMode: ModalMode;
  selectedCard: LandmarkCardProps | null;
  handleCreate: () => void;
  handleEdit: (data: LandmarkCardProps) => void;
  handleDelete: (data: LandmarkCardProps) => void;
};

export const LandmarkContext = createContext<LandmarkContextType | null>(null);

export default function LandmarkContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [modalMode, setModalMode] = useState<ModalMode>(null);
  const [selectedCard, setSelectedCard] = useState<LandmarkCardProps | null>(
    null,
  );

  const handleCreate = () => {
    setSelectedCard(null);
    setModalMode("create");
    setOpen(true);
  };

  const handleEdit = (data: LandmarkCardProps) => {
    setSelectedCard(data);
    setModalMode("edit");
    setOpen(true);
  };

  const handleDelete = (data: LandmarkCardProps) => {
    setSelectedCard(data);
    setModalMode("delete");
    setOpen(true);
  };

  return (
    <LandmarkContext.Provider
      value={{
        open,
        setOpen,
        modalMode,
        selectedCard,
        handleCreate,
        handleEdit,
        handleDelete,
      }}
    >
      {children}
    </LandmarkContext.Provider>
  );
}
