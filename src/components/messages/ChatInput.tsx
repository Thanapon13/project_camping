"use client";

import { Send } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

type ChatInputProps = {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  disabled: boolean;
};

const ChatInput = ({ value, onChange, onSend, disabled }: ChatInputProps) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  return (
    <div className="flex items-end gap-2 px-3 py-2.5 border-t border-border">
      <Textarea
        value={value}
        onChange={e => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Aa"
        rows={1}
        className="resize-none min-h-[36px] max-h-24 flex-1 text-sm rounded-2xl py-2 focus-visible:ring-1"
      />
      <button
        onClick={onSend}
        disabled={disabled}
        className="shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-primary text-primary-foreground disabled:opacity-40 hover:opacity-90 transition-opacity"
      >
        <Send className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};

export default ChatInput;
