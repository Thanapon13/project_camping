"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, Search, ArrowLeft } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import InlineChatView from "./InlineChatView";

type OtherProfile = {
  clerkId: string;
  firstName: string;
  lastName: string;
  profileImage: string;
};

export type ConversationItem = {
  id: string;
  updatedAt: Date;
  lastMessage: string;
  unreadCount: number;
  otherProfile: OtherProfile;
};

type MessagesClientProps = {
  conversations: ConversationItem[];
  currentUserId: string;
};

const MessagesClient = ({ conversations, currentUserId }: MessagesClientProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedConv, setSelectedConv] = useState<ConversationItem | null>(null);
  const [unreadMap, setUnreadMap] = useState<Record<string, number>>(
    Object.fromEntries(conversations.map(c => [c.id, c.unreadCount])),
  );

  const filtered = conversations.filter(conv =>
    `${conv.otherProfile.firstName} ${conv.otherProfile.lastName}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase()),
  );

  const handleSelectConv = (conv: ConversationItem) => {
    setSelectedConv(conv);
    setUnreadMap(prev => ({ ...prev, [conv.id]: 0 }));
  };

  return (
    <div className="container max-w-7xl py-10 h-[calc(100vh-6rem)]">
      <div className="w-full h-full bg-background border border-border rounded-xl shadow-sm overflow-hidden flex">
        {/* Sidebar */}
        <div
          className={`w-full md:w-80 border-r border-border flex flex-col bg-card ${
            selectedConv ? "hidden md:flex" : "flex"
          }`}
        >
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

          <div className="flex-1 overflow-y-auto divide-y divide-border/60">
            {filtered.length === 0 ? (
              <div className="p-8 text-center text-sm text-muted-foreground">
                No conversations found.
              </div>
            ) : (
              filtered.map(conv => {
                const isActive = selectedConv?.id === conv.id;
                const unread = unreadMap[conv.id] ?? 0;
                let displayTime = "Just now";
                try {
                  displayTime = formatDistanceToNow(new Date(conv.updatedAt), {
                    addSuffix: false,
                  });
                } catch {}

                return (
                  <button
                    key={conv.id}
                    onClick={() => handleSelectConv(conv)}
                    className={`w-full p-4 flex items-start gap-3 text-left transition-colors hover:bg-accent/50 ${
                      isActive ? "bg-accent" : ""
                    }`}
                  >
                    <div className="relative flex-shrink-0">
                      <Image
                        src={conv.otherProfile.profileImage}
                        alt={conv.otherProfile.firstName}
                        width={44}
                        height={44}
                        className="rounded-full object-cover w-11 h-11 ring-1 ring-border"
                      />
                      {unread > 0 && (
                        <span className="absolute -top-1 -right-1 w-4 h-4 text-[10px] font-bold bg-primary text-primary-foreground rounded-full flex items-center justify-center">
                          {unread > 9 ? "9+" : unread}
                        </span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline justify-between mb-0.5">
                        <h2
                          className={`font-semibold text-sm truncate ${
                            unread > 0 ? "text-foreground" : "text-foreground/80"
                          }`}
                        >
                          {conv.otherProfile.firstName} {conv.otherProfile.lastName}
                        </h2>
                        <span className="text-[10px] text-muted-foreground whitespace-nowrap">
                          {displayTime}
                        </span>
                      </div>
                      <p
                        className={`text-xs truncate ${
                          unread > 0 ? "font-medium text-foreground" : "text-muted-foreground"
                        }`}
                      >
                        {conv.lastMessage || "No messages yet"}
                      </p>
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </div>

        {/* Chat Area */}
        <div
          className={`flex-1 flex flex-col bg-muted/10 ${
            !selectedConv ? "hidden md:flex" : "flex"
          }`}
        >
          <AnimatePresence mode="wait">
            {selectedConv ? (
              <motion.div
                key={selectedConv.id}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                className="flex-1 flex flex-col h-full overflow-hidden"
              >
                {/* Header */}
                <div className="p-4 border-b border-border bg-card flex items-center gap-3 shrink-0">
                  <button
                    onClick={() => setSelectedConv(null)}
                    className="md:hidden p-1 hover:bg-accent rounded-lg transition-colors"
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </button>
                  <Image
                    src={selectedConv.otherProfile.profileImage}
                    alt={selectedConv.otherProfile.firstName}
                    width={38}
                    height={38}
                    className="rounded-full object-cover w-9 h-9"
                  />
                  <div>
                    <h3 className="font-semibold text-sm">
                      {selectedConv.otherProfile.firstName} {selectedConv.otherProfile.lastName}
                    </h3>
                  </div>
                </div>

                {/* Inline Chat */}
                <div className="flex-1 overflow-hidden bg-background">
                  <InlineChatView
                    conversationId={selectedConv.id}
                    currentUserId={currentUserId}
                  />
                </div>
              </motion.div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 text-primary">
                  <MessageSquare className="w-8 h-8" />
                </div>
                <h3 className="font-bold text-lg text-foreground mb-1">Your Message Inbox</h3>
                <p className="text-sm text-muted-foreground max-w-xs">
                  เลือกรายชื่อผู้สนทนาจากแถบด้านซ้ายเพื่อเปิดหน้าต่างสนทนา
                </p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default MessagesClient;
