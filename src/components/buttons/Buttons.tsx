"use client";

import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";
import {
  ChevronDown,
  ChevronUp,
  Heart,
  MessageCircle,
  RotateCw,
} from "lucide-react";
import { SignInButton } from "@clerk/nextjs";

type btnSize = "default" | "lg" | "sm";

type SubmitButtonProps = {
  className?: string;
  size?: btnSize;
  text?: string;
  disabled?: boolean;
};

export const SubmitButton = ({
  className,
  size,
  text,
  disabled,
}: SubmitButtonProps) => {
  const { pending } = useFormStatus();

  return (
    <Button
      disabled={pending || disabled}
      type="submit"
      size={size}
      className={`${className} capitalize`}
    >
      {pending ? (
        <>
          <RotateCw className="animate-spin" />
          <span>Please wait...</span>
        </>
      ) : (
        text
      )}
    </Button>
  );
};

export const SignInCardButton = ({ className }: { className?: string }) => {
  return (
    <SignInButton mode="modal">
      <Button
        size="icon"
        variant="secondary"
        className={`${className ? className : "w-8 h-8 rounded-full"}`}
      >
        <Heart className="bg-transparent" />
      </Button>
    </SignInButton>
  );
};

export const FavoriteButton = ({
  isFavorite,
  className,
}: {
  isFavorite: boolean;
  className?: string;
}) => {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      variant="ghost"
      size="icon"
      disabled={pending}
      aria-label="Toggle favorite"
      className={`${className ? className : "w-9 h-9 rounded-full backdrop-blur-sm transition-all duration-200 cursor-pointer"} ${
        isFavorite
          ? "bg-pink-500/20 text-pink-500 hover:bg-pink-500/30"
          : "bg-white/90 text-muted-foreground hover:bg-white hover:text-pink-500"
      }`}
    >
      {pending ? (
        <RotateCw className="w-4 h-4 animate-spin" />
      ) : (
        <Heart
          className={`w-4 h-4 ${isFavorite ? "fill-pink-500 stroke-pink-500" : ""}`}
        />
      )}
    </Button>
  );
};

export const LikeButton = () => {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-9 h-9 flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors"
    >
      <Heart className="w-4 h-4" />
    </button>
  );
};

export const ReplyButton = ({
  showReplyForm,
  replyCount,
  onClick,
}: {
  showReplyForm: boolean;
  replyCount: number;
  onClick: () => void;
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center gap-1.5 text-xs transition-colors ${
        showReplyForm
          ? "text-primary font-medium"
          : "text-muted-foreground hover:text-primary"
      }`}
    >
      <MessageCircle className="w-4 h-4" />
      <span>Reply {replyCount > 0 && `(${replyCount})`}</span>
    </button>
  );
};

export const ToggleRepliesButton = ({
  showReplies,
  replyCount,
  onClick,
}: {
  showReplies: boolean;
  replyCount: number;
  onClick: () => void;
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center gap-1 text-xs text-primary font-medium hover:underline ml-auto"
    >
      {showReplies ? (
        <>
          <ChevronUp className="w-3 h-3" />
          Hide replies
        </>
      ) : (
        <>
          <ChevronDown className="w-3 h-3" />
          View {replyCount} {replyCount === 1 ? "reply" : "replies"}
        </>
      )}
    </button>
  );
};

export const SignInTextButton = ({ text }: { text: string }) => {
  return (
    <SignInButton mode="modal">
      <button className="text-primary font-medium hover:underline">
        {text}
      </button>
    </SignInButton>
  );
};
