"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, Search, ArrowLeft } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import ChatPopup from "@/components/messages/Chatpopup";

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

type InboxClientProps = {
  initialConversations: ConversationItem[];
  currentUserId: string;
};

export default function InboxClient({
  initialConversations = [], // 🟢 1. กำหนดค่าเริ่มต้นเผื่อไว้กันพัง
  currentUserId,
}: InboxClientProps) {
  // 🟢 2. ใส่ || [] ป้องกันกรณี Server ส่งค่า null/undefined หลุดมา
  const [conversations] = useState<ConversationItem[]>(
    initialConversations || [],
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedChat, setSelectedChat] = useState<ConversationItem | null>(
    null,
  );

  // 🟢 3. ปรับมาใช้ Optional Chaining ป้องกัน Profile เป็นค่าว่าง
  const filteredConversations = conversations.filter(conv => {
    const firstName = conv?.otherProfile?.firstName || "Unknown";
    const lastName = conv?.otherProfile?.lastName || "User";
    return `${firstName} ${lastName}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
  });

  return (
    <div className="w-full h-full bg-background border border-border rounded-xl shadow-sm overflow-hidden flex">
      {/* 🗺️ SIDEBAR: รายชื่อห้องแชททั้งหมด */}
      <div
        className={`w-full md:w-80 border-r border-border flex flex-col bg-card ${
          selectedChat ? "hidden md:flex" : "flex"
        }`}
      >
        {/* หัวข้อ Inbox & ค้นหา */}
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

        {/* รายการแชท (Chat List) */}
        <div className="flex-1 overflow-y-auto divide-y divide-border/60">
          {filteredConversations.length === 0 ? (
            <div className="p-8 text-center text-sm text-muted-foreground">
              No conversations found.
            </div>
          ) : (
            filteredConversations.map(conv => {
              const isActive = selectedChat?.id === conv.id;

              // ป้องกันแครชเวลาอ่านฟิลด์วันที่
              let displayTime = "";
              try {
                if (conv?.updatedAt) {
                  displayTime = formatDistanceToNow(new Date(conv.updatedAt), {
                    addSuffix: false,
                  });
                }
              } catch (e) {
                displayTime = "Just now";
              }

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
                      </span>
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

      {/* 💬 CHAT AREA: พื้นที่แสดงข้อความเมื่อคลิกเลือกแชท */}
      <div
        className={`flex-1 flex flex-col bg-muted/20 ${
          !selectedChat ? "hidden md:flex" : "flex"
        }`}
      >
        <AnimatePresence mode="wait">
          {selectedChat ? (
            <motion.div
              key={selectedChat.id}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
              className="flex-1 flex flex-col h-full relative"
            >
              {/* แถบหัวขอด้านบนของฝั่งแชท */}
              <div className="p-4 border-b border-border bg-card flex items-center gap-3">
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
                  width={36}
                  height={36}
                  className="rounded-full object-cover w-9 h-9"
                />
                <div>
                  <h3 className="font-semibold text-sm">
                    {selectedChat?.otherProfile?.firstName}{" "}
                    {selectedChat?.otherProfile?.lastName}
                  </h3>
                  <p className="text-[11px] text-emerald-500 font-medium">
                    Active Session
                  </p>
                </div>
              </div>

              {/* บานหน้าต่างแสดงเนื้อหาแชท */}
              <div className="flex-1 p-4 overflow-y-auto">
                <p className="text-xs text-center text-muted-foreground my-4">
                  บานหน้าต่างสนทนาประวัติเก่าระบบเปิดทำงานร่วมกับเรียลไทม์
                </p>

                <ChatPopup
                  host={selectedChat.otherProfile}
                  currentUserId={currentUserId}
                  onClose={() => setSelectedChat(null)}
                />
              </div>
            </motion.div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 text-primary animate-pulse">
                <MessageSquare className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-lg text-foreground mb-1">
                Your Message Inbox
              </h3>
              <p className="text-sm text-muted-foreground max-w-xs">
                เลือกรายชื่อผู้สนทนาจากแถบด้านซ้าย
                เพื่อเริ่มอ่านประวัติข้อความและตอบกลับนักท่องเที่ยวหรือโฮสต์ของคุณ
              </p>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
