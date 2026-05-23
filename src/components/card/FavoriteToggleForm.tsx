// FavoriteToggleForm.tsx
"use client";

import { toggleFavoriteAction } from "@/actions/action";
import { FavoriteButton } from "../buttons/Buttons";
import FormContainer from "../form/FormContainer";
import { usePathname } from "next/navigation";
import { useState, useCallback } from "react";

const FavoriteToggleForm = ({
  favoriteId: initialFavoriteId,
  landmarkId,
  className,
}: {
  favoriteId: string | null;
  landmarkId: string;
  className?: string;
}) => {
  const pathname = usePathname();
  // แยก state ออกเป็น 2 ตัว: favoriteId จริง และ UI state
  const [favoriteId, setFavoriteId] = useState<string | null>(
    initialFavoriteId,
  );
  const [isFavorite, setIsFavorite] = useState<boolean>(!!initialFavoriteId);

  const toggleAction = toggleFavoriteAction.bind(null, {
    favoriteId, // ส่ง favoriteId จริงไป DB เสมอ
    landmarkId,
    pathname,
  });

  const handleSuccess = useCallback(() => {
    // อัพเดทสี UI ทันที
    setIsFavorite(prev => !prev);
    // เคลียร์ favoriteId จริงเมื่อ unlike (ครั้งถัดไป จะ create ใหม่)
    setFavoriteId(prev => (prev ? null : "pending-real-id"));
  }, []);

  return (
    <FormContainer
      action={toggleAction}
      className={`${className ? "" : "absolute top-2.5 right-2.5"}`}
      onSuccess={handleSuccess}
    >
      <FavoriteButton isFavorite={isFavorite} className={className} />
    </FormContainer>
  );
};

export default FavoriteToggleForm;
