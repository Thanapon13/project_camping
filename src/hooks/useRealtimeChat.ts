"use client";

import { useEffect, useState } from "react";
import { supabaseBrowser } from "@/utils/supabase-browser";
import { fetchMessages } from "@/actions/messages";

export type ChatMessage = {
  id: string;
  content: string;
  senderId: string;
  createdAt: Date;
  conversationId: string;
  isRead: boolean;
};

export const useRealtimeChat = (conversationId: string | null) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!conversationId) return;

    setLoading(true);
    fetchMessages(conversationId).then(data => {
      setMessages(data as ChatMessage[]);
      setLoading(false);
    });

    const channel = supabaseBrowser
      .channel(`conversation:${conversationId}`)
      .on("broadcast", { event: "new-message" }, (event) => {
        const newMsg = event.payload as Omit<ChatMessage, "createdAt"> & { createdAt: string };
        setMessages(prev => {
          if (prev.find(m => m.id === newMsg.id)) return prev;
          return [...prev, { ...newMsg, createdAt: new Date(newMsg.createdAt) }];
        });
      })
      .on("broadcast", { event: "messages-read" }, () => {
        // อัปเดต isRead ของทุก message ที่ส่งออกไปให้เป็น true
        setMessages(prev => prev.map(msg => ({ ...msg, isRead: true })));
      })
      .subscribe();

    return () => {
      supabaseBrowser.removeChannel(channel);
    };
  }, [conversationId]);

  return { messages, loading };
};
