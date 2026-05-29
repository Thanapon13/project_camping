"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { supabaseBrowser } from "@/utils/supabase-browser";
import { getProfileByClerkId } from "@/actions/messages";
import useChat from "@/hooks/useChat";
import ChatPopup from "./Chatpopup";

type SenderProfile = {
  clerkId: string;
  firstName: string;
  lastName: string;
  profileImage: string;
};

type ActiveChat = {
  conversationId: string;
  sender: SenderProfile;
};

type IncomingMessage = {
  id: string;
  senderId: string;
  conversationId: string;
  content: string;
};

const IncomingChatListener = ({ currentUserId }: { currentUserId: string }) => {
  const [activeChats, setActiveChats] = useState<ActiveChat[]>([]);
  const { openConversationIds } = useChat();
  const openConversationIdsRef = useRef<string[]>([]);

  useEffect(() => {
    openConversationIdsRef.current = openConversationIds;
  }, [openConversationIds]);

  useEffect(() => {
    const channel = supabaseBrowser
      .channel(`user:${currentUserId}`)
      .on("broadcast", { event: "incoming-message" }, async (event) => {
        const msg = event.payload as IncomingMessage;

        if (!msg.senderId || msg.senderId === currentUserId) return;

        // ถ้า ChatPopup ของ conversation นี้เปิดอยู่แล้ว ไม่ต้องเปิดซ้ำ
        if (openConversationIdsRef.current.includes(msg.conversationId)) return;

        const profile = await getProfileByClerkId(msg.senderId);
        if (!profile) return;

        setActiveChats(prev => {
          if (prev.find(c => c.conversationId === msg.conversationId)) return prev;
          return [...prev, { conversationId: msg.conversationId, sender: profile }];
        });
      })
      .subscribe();

    return () => {
      supabaseBrowser.removeChannel(channel);
    };
  }, [currentUserId]);

  return (
    <AnimatePresence>
      {activeChats.map((chat, index) => (
        <ChatPopup
          key={chat.conversationId}
          host={chat.sender}
          currentUserId={currentUserId}
          initialConversationId={chat.conversationId}
          rightOffset={index * 340}
          onClose={() =>
            setActiveChats(prev =>
              prev.filter(c => c.conversationId !== chat.conversationId)
            )
          }
        />
      ))}
    </AnimatePresence>
  );
};

export default IncomingChatListener;
