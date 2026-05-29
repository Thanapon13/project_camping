"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getOrCreateConversation, markMessagesAsRead, sendMessageAction } from "@/actions/messages";
import { useRealtimeChat } from "@/hooks/useRealtimeChat";
import { useTypingIndicator } from "@/hooks/useTypingIndicator";
import useChat from "@/hooks/useChat";
import ChatHeader from "./ChatHeader";
import ChatMessageList from "./ChatMessageList";
import ChatInput from "./ChatInput";

export type Host = {
  clerkId: string;
  firstName: string;
  lastName: string;
  profileImage: string;
};

type ChatPopupProps = {
  host: Host;
  currentUserId: string;
  onClose: () => void;
  initialConversationId?: string;
  rightOffset?: number;
};

const ChatPopup = ({
  host,
  currentUserId,
  onClose,
  initialConversationId,
  rightOffset = 0,
}: ChatPopupProps) => {
  const [conversationId, setConversationId] = useState<string | null>(
    initialConversationId ?? null
  );
  const [value, setValue] = useState("");
  const [isMinimized, setIsMinimized] = useState(false);
  const [sending, setSending] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  const { messages, loading } = useRealtimeChat(conversationId);
  const { registerChat, unregisterChat } = useChat();
  const { isOtherTyping, notifyTyping } = useTypingIndicator(conversationId, currentUserId);

  useEffect(() => {
    if (conversationId) return;
    getOrCreateConversation(host.clerkId).then(result => {
      if (result.code === 200 && result.conversationId) {
        setConversationId(result.conversationId);
      }
    });
  }, [host.clerkId, conversationId]);

  useEffect(() => {
    if (!conversationId) return;
    registerChat(conversationId);
    markMessagesAsRead(conversationId);
    return () => unregisterChat(conversationId);
  }, [conversationId, registerChat, unregisterChat]);

  useEffect(() => {
    if (!isMinimized) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isMinimized]);

  const handleSend = async () => {
    const trimmed = value.trim();
    if (!trimmed || !conversationId || sending) return;
    setSending(true);
    setValue("");
    await sendMessageAction(conversationId, trimmed);
    setSending(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 40, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      style={{ right: `${24 + rightOffset}px` }}
      className="fixed bottom-6 z-50 w-80 rounded-2xl shadow-2xl overflow-hidden border border-border"
    >
      <ChatHeader
        host={host}
        isMinimized={isMinimized}
        onMinimize={() => setIsMinimized(prev => !prev)}
        onClose={onClose}
      />

      <AnimatePresence>
        {!isMinimized && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden bg-background"
          >
            <ChatMessageList
              messages={messages}
              loading={loading}
              currentUserId={currentUserId}
              isOtherTyping={isOtherTyping}
              bottomRef={bottomRef}
            />
            <ChatInput
              value={value}
              onChange={(newValue) => {
                setValue(newValue);
                notifyTyping(newValue);
              }}
              onSend={handleSend}
              disabled={!value.trim() || !conversationId || sending}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ChatPopup;
