"use client";

import { Check, CheckCheck } from "lucide-react";

const formatTime = (date: Date) =>
  new Intl.DateTimeFormat("th-TH", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date));

type ChatMessageProps = {
  content: string;
  createdAt: Date;
  isOwn: boolean;
  isRead: boolean;
};

const ChatMessage = ({ content, createdAt, isOwn, isRead }: ChatMessageProps) => {
  return (
    <div className={`flex ${isOwn ? "justify-end" : "justify-start"}`}>
      <div className="max-w-[75%] space-y-0.5">
        <div
          className={`px-3 py-2 rounded-2xl text-sm leading-relaxed ${
            isOwn
              ? "bg-primary text-primary-foreground rounded-br-sm"
              : "bg-muted text-foreground rounded-bl-sm"
          }`}
        >
          {content}
        </div>
        <div className={`flex items-center gap-1 ${isOwn ? "justify-end" : "justify-start"}`}>
          <p className="text-[10px] text-muted-foreground">{formatTime(createdAt)}</p>
          {isOwn && (
            isRead
              ? <CheckCheck className="w-3 h-3 text-primary" />
              : <Check className="w-3 h-3 text-muted-foreground" />
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
