"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, Search, ArrowLeft } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import ChatPopup from "@/components/messages/Chatpopup";

// 1. นิยาม Type สำหรับห้องสนทนา
type ConversationItem = {
  id: string;
  updatedAt: Date;
  lastMessage: string;
  otherProfile: {
    clerkId: string;
    firstName: string;
    lastName: string;
    profileImage: string;
  };
};

// 2. Mock Data สำหรับรายชื่อห้องสนทนาฝั่งซ้าย (ระหว่างรอเชื่อม Server Action)
const MOCK_CONVERSATIONS: ConversationItem[] = [
  {
    id: "conv-1",
    updatedAt: new Date(),
    lastMessage: "สวัสดีครับ มีอะไรให้ช่วยได้บ้างครับ?",
    otherProfile: {
      clerkId: "host-123",
      firstName: "สมชาย",
      lastName: "ใจดี",
      profileImage:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80",
    },
  },
  {
    id: "conv-2",
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 3),
    lastMessage: "ขอบคุณสำหรับข้อมูลสถานที่ครับ เดี๋ยวเจอกันครับ",
    otherProfile: {
      clerkId: "user-456",
      firstName: "Jane",
      lastName: "Doe",
      profileImage:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80",
    },
  },
];

export default function MessagesPage({
  currentUserId = "current_user_mock",
}: {
  currentUserId?: string;
}) {
  const [conversations] = useState<ConversationItem[]>(MOCK_CONVERSATIONS);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedChat, setSelectedChat] = useState<ConversationItem | null>(
    null,
  );

  // กรองรายชื่อผู้สนทนาผ่านช่อง Search
  const filteredConversations = conversations.filter(conv => {
    const firstName = conv?.otherProfile?.firstName || "";
    const lastName = conv?.otherProfile?.lastName || "";
    return `${firstName} ${lastName}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
  });

  return (
    <div className="container max-w-7xl py-10 h-[calc(100vh-6rem)]">
      <div className="w-full h-full bg-background border border-border rounded-xl shadow-sm overflow-hidden flex">
        {/* 🗺️ SIDEBAR: รายชื่อห้องแชททั้งหมด */}
        <div
          className={`w-full md:w-80 border-r border-border flex flex-col bg-card ${
            selectedChat ? "hidden md:flex" : "flex"
          }`}
        >
          {/* ส่วนหัวข้อหลักและการค้นหา */}
          <div className="p-4 border-b border-border space-y-3">
            <h1 className="text-xl font-bold tracking-tight flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-primary" />
              Inbox Messages
            </h1>
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search chat..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-muted/50 border border-border rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-primary transition-all"
              />
            </div>
          </div>

          {/* รายการแสดงผู้สนทนา */}
          <div className="flex-1 overflow-y-auto divide-y divide-border/60">
            {filteredConversations.length === 0 ? (
              <div className="p-8 text-center text-sm text-muted-foreground">
                No conversations found.
              </div>
            ) : (
              filteredConversations.map(conv => {
                const isActive = selectedChat?.id === conv.id;
                let displayTime = "Just now";
                try {
                  if (conv?.updatedAt) {
                    displayTime = formatDistanceToNow(
                      new Date(conv.updatedAt),
                      { addSuffix: false },
                    );
                  }
                } catch (e) {}

                return (
                  <button
                    key={conv.id}
                    onClick={() => setSelectedChat(conv)}
                    className={`w-full p-4 flex items-start gap-3 text-left transition-colors hover:bg-accent/50 ${
                      isActive ? "bg-accent" : ""
                    }`}
                  >
                    <div className="relative flex-shrink-0">
                      <Image
                        src={
                          conv?.otherProfile?.profileImage ||
                          "/default-avatar.png"
                        }
                        alt={conv?.otherProfile?.firstName || "User"}
                        width={44}
                        height={44}
                        className="rounded-full object-cover w-11 h-11 ring-1 ring-border"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline justify-between mb-0.5">
                        <h2 className="font-semibold text-sm truncate text-foreground">
                          {conv?.otherProfile?.firstName}{" "}
                          {conv?.otherProfile?.lastName}
                        </h2>
                        <span className="text-[10px] text-muted-foreground whitespace-nowrap">
                          {displayTime}
                        </span>{" "}
                        {/* 🟢 แก้เป็น </span> เรียบร้อย */}
                      </div>
                      <p className="text-xs text-muted-foreground truncate">
                        {conv?.lastMessage || "No messages yet"}
                      </p>
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </div>

        {/* 💬 CHAT AREA: พื้นที่ฝังกรอบสนทนาเมื่อกดเลือกห้องแชท */}
        <div
          className={`flex-1 flex flex-col bg-muted/10 ${!selectedChat ? "hidden md:flex" : "flex"}`}
        >
          <AnimatePresence mode="wait">
            {selectedChat ? (
              <motion.div
                key={selectedChat.id}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                className="flex-1 flex flex-col h-full overflow-hidden"
              >
                {/* Header บนสุดของช่องแชทที่ถูกเลือก */}
                <div className="p-4 border-b border-border bg-card flex items-center justify-between shrink-0">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setSelectedChat(null)}
                      className="md:hidden p-1 hover:bg-accent rounded-lg transition-colors"
                    >
                      <ArrowLeft className="w-5 h-5" />
                    </button>
                    <Image
                      src={
                        selectedChat?.otherProfile?.profileImage ||
                        "/default-avatar.png"
                      }
                      alt={selectedChat?.otherProfile?.firstName || "User"}
                      width={38}
                      height={38}
                      className="rounded-full object-cover w-9 h-9"
                    />
                    <div>
                      <h3 className="font-semibold text-sm">
                        {selectedChat?.otherProfile?.firstName}{" "}
                        {selectedChat?.otherProfile?.lastName}
                      </h3>
                      <p className="text-[11px] text-emerald-500 font-medium">
                        Active Session (Mock)
                      </p>
                    </div>
                  </div>
                </div>

                {/* ตัวกล่องข้อความแชท (ฝัง ChatPopup เข้าไปโดยตรง) */}
                <div className="flex-1 overflow-hidden bg-background">
                  <ChatPopup
                    host={selectedChat.otherProfile}
                    currentUserId={currentUserId}
                    onClose={() => setSelectedChat(null)}
                    isEmbedded={true} // 🟢 ส่ง flag นี้ เพื่อเปลี่ยน ChatPopup ให้กลายเป็นโหมดเต็มกรอบ (ไม่ใช่กล่องลอย)
                  />
                </div>
              </motion.div>
            ) : (
              // หน้าต่างเริ่มต้นหากยังไม่ได้คลิกเลือกห้องแชทใดๆ
              <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 text-primary">
                  <MessageSquare className="w-8 h-8" />
                </div>
                <h3 className="font-bold text-lg text-foreground mb-1">
                  Your Message Inbox
                </h3>
                <p className="text-sm text-muted-foreground max-w-xs">
                  เลือกรายชื่อผู้สนทนาจากแถบด้านซ้าย
                  เพื่อตรวจสอบข้อความจำลองและทดสอบระบบพิมพ์โต้ตอบแบบเรียลไทม์
                </p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
