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
      variant="outline"
      size="icon"
      disabled={pending}
      aria-label="Toggle favorite"
      className={`w-8 h-8 rounded-full cursor-pointer ${
        isFavorite
          ? "bg-pink-50 border-pink-300 text-pink-700"
          : "bg-background border-border text-muted-foreground"
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
