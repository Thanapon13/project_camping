"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import FormContainer from "../form/FormContainer";
import { createCommentAction } from "@/actions/comment";
import TextAreaInput from "../form/TextAreaInput";
import { SubmitButton } from "../buttons/Buttons";
import Avatar from "@/user/Avatar";

interface CreateCommentFormProps {
  landmarkId: string;
  userId: string | null;
  userImage: string | null;
}

const CreateCommentForm = ({
  landmarkId,
  userId,
  userImage,
}: CreateCommentFormProps) => {
  const [rating, setRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [comment, setComment] = useState<string>("");

  return (
    <FormContainer
      action={createCommentAction}
      onSuccess={() => {
        setRating(0);
        setComment("");
      }}
    >
      <input type="hidden" name="landmarkId" value={landmarkId} />
      <input type="hidden" name="userId" value={userId ?? ""} />
      <input type="hidden" name="rating" value={rating} />

      <div className="flex gap-4 mb-8 p-4 rounded-2xl bg-accent/30 border border-border">
        <Avatar userImage={userImage} />

        <div className="flex-1">
          <TextAreaInput
            name="comment"
            value={comment}
            placeholder="Share your thoughts about this place..."
            className="w-full bg-transparent border-none p-0 resize-none text-sm placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0 focus:outline-none min-h-[60px]"
            onChange={e => setComment(e.target.value)}
          />

          <div className="flex items-center justify-between pt-3 border-t border-border/50">
            <div className="flex items-center gap-1">
              <span className="text-xs text-muted-foreground">Rate:</span>
              {[...Array(5)].map((_, i) => {
                const starValue = i + 1;
                const isLit = starValue <= (hoverRating || rating);
                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setRating(starValue)}
                    onMouseEnter={() => setHoverRating(starValue)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="p-0.5 hover:scale-110 transition-transform focus:outline-none"
                  >
                    <Star
                      className={`w-4 h-4 transition-colors ${
                        isLit
                          ? "fill-amber-400 text-amber-400"
                          : "text-muted-foreground"
                      }`}
                    />
                  </button>
                );
              })}
            </div>

            <SubmitButton
              text="Post"
              size="sm"
              className="px-4 py-1.5 bg-primary text-primary-foreground text-sm rounded-lg font-medium hover:opacity-90 transition-opacity"
              pendingText="Posting..."
            />
          </div>
        </div>
      </div>
    </FormContainer>
  );
};

export default CreateCommentForm;
