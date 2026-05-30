"use client";

import { useEffect, useRef, useState } from "react";
import { markMessagesAsRead, sendMessageAction } from "@/actions/messages";
import { useRealtimeChat } from "@/hooks/useRealtimeChat";
import { useTypingIndicator } from "@/hooks/useTypingIndicator";
import useChat from "@/hooks/useChat";
import ChatMessageList from "./ChatMessageList";
import ChatInput from "./ChatInput";

type InlineChatViewProps = {
  conversationId: string;
  currentUserId: string;
};

const InlineChatView = ({ conversationId, currentUserId }: InlineChatViewProps) => {
  const [value, setValue] = useState("");
  const [sending, setSending] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  const { messages, loading } = useRealtimeChat(conversationId);
  const { registerChat, unregisterChat } = useChat();
  const { isOtherTyping, notifyTyping } = useTypingIndicator(conversationId, currentUserId);

  useEffect(() => {
    registerChat(conversationId);
    markMessagesAsRead(conversationId);
    return () => unregisterChat(conversationId);
  }, [conversationId, registerChat, unregisterChat]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    const trimmed = value.trim();
    if (!trimmed || sending) return;
    setSending(true);
    setValue("");
    await sendMessageAction(conversationId, trimmed);
    setSending(false);
  };

  return (
    <div className="flex flex-col h-full">
      <ChatMessageList
        messages={messages}
        loading={loading}
        currentUserId={currentUserId}
        isOtherTyping={isOtherTyping}
        bottomRef={bottomRef}
        className="flex-1 min-h-0"
      />
      <ChatInput
        value={value}
        onChange={newValue => {
          setValue(newValue);
          notifyTyping(newValue);
        }}
        onSend={handleSend}
        disabled={!value.trim() || sending}
      />
    </div>
  );
};

export default InlineChatView;
