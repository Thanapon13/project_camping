"use client";

import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";
import { Heart, Pencil, RotateCw } from "lucide-react";
import { SignInButton } from "@clerk/nextjs";

type btnSize = "default" | "lg" | "sm";

type SubmitButtonProps = {
  className?: string;
  size?: btnSize;
  text?: string;
};

export const SubmitButton = ({ className, size, text }: SubmitButtonProps) => {
  const { pending } = useFormStatus();

  return (
    <Button
      disabled={pending}
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

export const SignInCardButton = () => {
  return (
    <SignInButton mode="modal">
      <Button size="icon" variant="outline" className="w-8 h-8 rounded-full">
        <Heart />
      </Button>
    </SignInButton>
  );
};

export const FavoriteButton = ({ isFavorite }: { isFavorite: boolean }) => {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      variant="ghost"
      size="icon"
      disabled={pending}
      aria-label="Toggle favorite"
      className={`w-9 h-9 rounded-full backdrop-blur-sm transition-all duration-200 cursor-pointer ${
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
