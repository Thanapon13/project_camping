"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import CreateCommentForm from "../comments/CreateCommentForm";
import CommentList from "../comments/CommentList";
import { CommentProps } from "@/utils/types";
import { SignInTextButton } from "../buttons/Buttons";

// --- Sub-components ---

// แสดงเมื่อ user ยังไม่ได้ login
const SignInPrompt = () => (
  <div className="flex items-center gap-3 mb-8 p-4 rounded-2xl bg-accent/30 border border-border">
    <MessageCircle className="w-5 h-5 text-muted-foreground" />
    <p className="text-sm text-muted-foreground">
      Please <SignInTextButton text="sign in" /> to leave a comment.
    </p>
  </div>
);

// Header แสดงจำนวน comments
const CommentHeader = ({ count }: { count: number }) => (
  <div className="flex items-center gap-2 mb-6">
    <MessageCircle className="w-6 h-6 text-primary" />
    <h2 className="text-2xl font-bold">Comments</h2>
    <span className="text-muted-foreground">({count})</span>
  </div>
);

// --- Main Component ---

type CommentContainerProps = {
  landmarkId: string;
  userId: string | null;
  userImage: string | null;
  comments: CommentProps[];
};

const CommentContainer = ({
  landmarkId,
  userId,
  comments,
  userImage,
}: CommentContainerProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.45 }}
      className="py-12 border-t border-border mt-8"
    >
      <CommentHeader count={comments.length} />

      {/* แสดง form ถ้า login แล้ว ไม่งั้นแสดง sign in prompt */}
      {userId ? (
        <CreateCommentForm
          landmarkId={landmarkId}
          userId={userId}
          userImage={userImage}
        />
      ) : (
        <SignInPrompt />
      )}

      <CommentList comments={comments} userId={userId} userImage={userImage} />
    </motion.div>
  );
};

export default CommentContainer;