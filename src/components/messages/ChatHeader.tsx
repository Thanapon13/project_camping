"use client";

import Image from "next/image";
import { BadgeCheck, Minus, X } from "lucide-react";

type Host = {
  firstName: string;
  lastName: string;
  profileImage: string;
};

type ChatHeaderProps = {
  host: Host;
  isMinimized: boolean;
  onMinimize: () => void;
  onClose: () => void;
};

const ChatHeader = ({ host, isMinimized, onMinimize, onClose }: ChatHeaderProps) => {
  return (
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

      <div className="flex items-center gap-1">
        <button
          onClick={onMinimize}
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
  );
};

export default ChatHeader;
