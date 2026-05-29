import { useContext } from "react";
import { ChatContext } from "@/contexts/ChatContext";

export default function useChat() {
  const ctx = useContext(ChatContext);
  if (!ctx) throw new Error("useChat must be used inside ChatContextProvider");
  return ctx;
}
