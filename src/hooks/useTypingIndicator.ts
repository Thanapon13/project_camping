"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { supabaseBrowser } from "@/utils/supabase-browser";
import type { RealtimeChannel } from "@supabase/supabase-js";

export const useTypingIndicator = (
  conversationId: string | null,
  currentUserId: string
) => {
  const [isOtherTyping, setIsOtherTyping] = useState(false);
  const channelRef = useRef<RealtimeChannel | null>(null);
  const clearOtherTypingRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const stopSelfTypingRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isSelfTypingRef = useRef(false);

  useEffect(() => {
    if (!conversationId) return;

    const channel = supabaseBrowser
      .channel(`typing:${conversationId}`)
      .on("broadcast", { event: "typing" }, (event) => {
        if (event.payload.userId === currentUserId) return;

        setIsOtherTyping(event.payload.isTyping);

        if (event.payload.isTyping) {
          // auto-clear ถ้าไม่ได้รับ event ภายใน 3s
          if (clearOtherTypingRef.current) clearTimeout(clearOtherTypingRef.current);
          clearOtherTypingRef.current = setTimeout(() => setIsOtherTyping(false), 3000);
        } else {
          if (clearOtherTypingRef.current) clearTimeout(clearOtherTypingRef.current);
        }
      })
      .subscribe();

    channelRef.current = channel;

    return () => {
      supabaseBrowser.removeChannel(channel);
      channelRef.current = null;
      if (clearOtherTypingRef.current) clearTimeout(clearOtherTypingRef.current);
      if (stopSelfTypingRef.current) clearTimeout(stopSelfTypingRef.current);
    };
  }, [conversationId, currentUserId]);

  const notifyTyping = useCallback(
    (value: string) => {
      if (!channelRef.current) return;

      if (stopSelfTypingRef.current) clearTimeout(stopSelfTypingRef.current);

      if (value.length > 0) {
        if (!isSelfTypingRef.current) {
          isSelfTypingRef.current = true;
          channelRef.current.send({
            type: "broadcast",
            event: "typing",
            payload: { userId: currentUserId, isTyping: true },
          });
        }
        // หยุด typing หลัง 2s ที่ไม่มีการพิมพ์
        stopSelfTypingRef.current = setTimeout(() => {
          isSelfTypingRef.current = false;
          channelRef.current?.send({
            type: "broadcast",
            event: "typing",
            payload: { userId: currentUserId, isTyping: false },
          });
        }, 2000);
      } else {
        // ลบ text หมด → หยุด typing ทันที
        if (isSelfTypingRef.current) {
          isSelfTypingRef.current = false;
          channelRef.current.send({
            type: "broadcast",
            event: "typing",
            payload: { userId: currentUserId, isTyping: false },
          });
        }
      }
    },
    [currentUserId]
  );

  return { isOtherTyping, notifyTyping };
};
