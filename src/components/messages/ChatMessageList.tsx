"use client";

import { RefObject } from "react";
import { ChatMessage as ChatMessageType } from "@/hooks/useRealtimeChat";
import ChatMessage from "./ChatMessage";
import TypingIndicator from "./TypingIndicator";

type ChatMessageListProps = {
  messages: ChatMessageType[];
  loading: boolean;
  currentUserId: string;
  isOtherTyping: boolean;
  bottomRef: RefObject<HTMLDivElement | null>;
};

const ChatMessageList = ({
  messages,
  loading,
  currentUserId,
  isOtherTyping,
  bottomRef,
}: ChatMessageListProps) => {
  if (loading) {
    return (
      <div className="h-72 flex items-center justify-center">
        <p className="text-xs text-muted-foreground">Loading...</p>
      </div>
    );
  }

  return (
    <div className="h-72 overflow-y-auto px-3 py-3 space-y-2.5">
      {messages.length === 0 && (
        <p className="text-xs text-muted-foreground text-center py-8">
          No messages yet. Say hi!
        </p>
      )}
      {messages.map(msg => (
        <ChatMessage
          key={msg.id}
          content={msg.content}
          createdAt={msg.createdAt}
          isOwn={msg.senderId === currentUserId}
          isRead={msg.isRead}
        />
      ))}
      {isOtherTyping && <TypingIndicator />}
      <div ref={bottomRef} />
    </div>
  );
};

export default ChatMessageList;
