import { useContext } from "react";
import { LandmarkContext } from "@/contexts/LandmarkContext";

export default function useLandmark() {
  const ctx = useContext(LandmarkContext);
  if (!ctx)
    throw new Error("useLandmark must be used inside LandmarkContextProvider");
  return ctx;
}
