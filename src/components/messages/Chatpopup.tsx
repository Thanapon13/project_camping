"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Send, BadgeCheck } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

type Message = {
  id: string;
  content: string;
  senderId: string;
  createdAt: Date;
};

type Host = {
  clerkId: string;
  firstName: string;
  lastName: string;
  profileImage: string;
};

type ChatPopupProps = {
  host: Host;
  currentUserId: string;
  onClose: () => void;
  isEmbedded?: boolean;
};

const formatTime = (date: Date) =>
  new Intl.DateTimeFormat("th-TH", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date));

// Mock messages เริ่มต้น
const MOCK_MESSAGES: Message[] = [
  {
    id: "1",
    content: "สวัสดีครับ สนใจสถานที่ท่องเที่ยวนี้อยู่ครับ",
    senderId: "current",
    createdAt: new Date(Date.now() - 1000 * 60 * 3),
  },
  {
    id: "2",
    content: "สวัสดีครับ มีอะไรให้ช่วยได้บ้างครับ?",
    senderId: "host",
    createdAt: new Date(Date.now() - 1000 * 60 * 2),
  },
];

const ChatPopup = ({
  host,
  currentUserId,
  onClose,
  isEmbedded = false,
}: ChatPopupProps) => {
  const [messages, setMessages] = useState<Message[]>(MOCK_MESSAGES);
  const [value, setValue] = useState("");
  const [isMinimized, setIsMinimized] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  // auto-scroll เมื่อมี message ใหม่
  useEffect(() => {
    if (!isMinimized) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isMinimized]);

  const handleSend = () => {
    const trimmed = value.trim();
    if (!trimmed) return;

    // TODO: แทนด้วย sendMessage action + Supabase Realtime
    setMessages(prev => [
      ...prev,
      {
        id: crypto.randomUUID(),
        content: trimmed,
        senderId: currentUserId,
        createdAt: new Date(),
      },
    ]);
    setValue("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 40, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className="fixed bottom-6 right-6 z-50 w-80 rounded-2xl shadow-2xl overflow-hidden border border-border"
    >
      {/* Header */}
      <div className="flex items-center gap-2.5 px-3 py-2.5 bg-primary">
        <div className="relative shrink-0">
          <Image
            src={host.profileImage}
            alt={host.firstName}
            width={36}
            height={36}
            className="rounded-full object-cover"
          />
          <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 rounded-full ring-2 ring-primary" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1">
            <span className="text-sm font-semibold text-primary-foreground truncate">
              {host.firstName} {host.lastName}
            </span>
            <BadgeCheck className="w-3.5 h-3.5 text-primary-foreground/80 shrink-0" />
          </div>
          <p className="text-xs text-primary-foreground/70">Online</p>
        </div>

        {/* ปุ่ม minimize และ close */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => setIsMinimized(prev => !prev)}
            className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-primary-foreground/20 transition-colors"
          >
            <Minus className="w-3.5 h-3.5 text-primary-foreground" />
          </button>
          <button
            onClick={onClose}
            className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-primary-foreground/20 transition-colors"
          >
            <X className="w-3.5 h-3.5 text-primary-foreground" />
          </button>
        </div>
      </div>

      {/* Body — ซ่อนเมื่อ minimize */}
      <AnimatePresence>
        {!isMinimized && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden bg-background"
          >
            {/* Message list */}
            <div className="h-72 overflow-y-auto px-3 py-3 space-y-2.5">
              {messages.map(msg => {
                const isOwn = msg.senderId === currentUserId;
                return (
                  <div
                    key={msg.id}
                    className={`flex ${isOwn ? "justify-end" : "justify-start"}`}
                  >
                    <div className="max-w-[75%] space-y-0.5">
                      <div
                        className={`px-3 py-2 rounded-2xl text-sm leading-relaxed ${
                          isOwn
                            ? "bg-primary text-primary-foreground rounded-br-sm"
                            : "bg-muted text-foreground rounded-bl-sm"
                        }`}
                      >
                        {msg.content}
                      </div>
                      <p
                        className={`text-[10px] text-muted-foreground ${isOwn ? "text-right" : "text-left"}`}
                      >
                        {formatTime(msg.createdAt)}
                      </p>
                    </div>
                  </div>
                );
              })}
              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div className="flex items-end gap-2 px-3 py-2.5 border-t border-border">
              <Textarea
                value={value}
                onChange={e => setValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Aa"
                rows={1}
                className="resize-none min-h-[36px] max-h-24 flex-1 text-sm rounded-2xl py-2 focus-visible:ring-1"
              />
              <button
                onClick={handleSend}
                disabled={!value.trim()}
                className="shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-primary text-primary-foreground disabled:opacity-40 hover:opacity-90 transition-opacity"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ChatPopup;
