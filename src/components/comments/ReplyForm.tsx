"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import FormContainer from "../form/FormContainer";
import { createReplyAction } from "@/actions/action";
import { SubmitButton } from "../buttons/Buttons";
import Avatar from "@/user/Avatar";

const ReplyForm = ({
  commentId,
  landmarkId,
  replyToName,
  onSuccess,
  onCancel,
  userImage,
}: {
  commentId: string;
  landmarkId: string;
  replyToName: string;
  onSuccess: () => void;
  onCancel: () => void;
  userImage: string | null;
}) => {
  const [replyText, setReplyText] = useState("");

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      className="mt-4"
    >
      <FormContainer
        action={createReplyAction}
        onSuccess={() => {
          setReplyText("");
          onSuccess();
        }}
      >
        <input type="hidden" name="parentId" value={commentId} />
        <input type="hidden" name="landmarkId" value={landmarkId} />

        <div className="flex gap-3 pl-4 border-l-2 border-primary/50">
          <Avatar userImage={userImage} />

          <div className="flex-1">
            <p className="text-xs text-muted-foreground mb-2">
              Replying to{" "}
              <span className="font-medium text-foreground">
                @{replyToName}
              </span>
            </p>

            <textarea
              name="reply"
              value={replyText}
              onChange={e => setReplyText(e.target.value)}
              placeholder="Write your reply..."
              rows={2}
              autoFocus
              className="w-full bg-accent/50 rounded-xl px-4 py-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/50 placeholder:text-muted-foreground"
            />

            <div className="flex items-center justify-end gap-2 mt-2">
              <button
                type="button"
                onClick={onCancel}
                className="px-4 py-1.5 text-sm text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg transition-colors"
              >
                Cancel
              </button>

              <SubmitButton
                text="Post"
                size="sm"
                disabled={!replyText.trim()}
                className="px-4 py-1.5 bg-primary text-primary-foreground text-sm rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                pendingText="Replying..."
              />
            </div>
          </div>
        </div>
      </FormContainer>
    </motion.div>
  );
};

export default ReplyForm;
