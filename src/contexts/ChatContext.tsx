"use client";

import { createContext, useCallback, useState } from "react";

type ChatContextType = {
  openConversationIds: string[];
  registerChat: (id: string) => void;
  unregisterChat: (id: string) => void;
};

export const ChatContext = createContext<ChatContextType | null>(null);

export default function ChatContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [openConversationIds, setOpenConversationIds] = useState<string[]>([]);

  const registerChat = useCallback((id: string) => {
    setOpenConversationIds(prev =>
      prev.includes(id) ? prev : [...prev, id]
    );
  }, []);

  const unregisterChat = useCallback((id: string) => {
    setOpenConversationIds(prev => prev.filter(c => c !== id));
  }, []);

  return (
    <ChatContext.Provider value={{ openConversationIds, registerChat, unregisterChat }}>
      {children}
    </ChatContext.Provider>
  );
}
