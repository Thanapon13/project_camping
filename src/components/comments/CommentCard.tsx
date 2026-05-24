"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { CommentProps } from "@/utils/types";
import { Star } from "lucide-react";
import {
  LikeButton,
  ReplyButton,
  ToggleRepliesButton,
} from "../buttons/Buttons";
import ReplyForm from "./ReplyForm";
import ReplyList from "./ReplyList";
import { CommentButtonAction } from "./CommentButtonAction";
import Avatar from "@/user/Avatar";
import EditCommentForm from "./EditCommentForm";
import { updateCommentAction } from "@/actions/action";

const formatDate = (date: Date) =>
  new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(date));

const CommentCard = ({
  comment,
  index,
  totalCount,
  userId,
  userImage,
}: {
  comment: CommentProps;
  index: number;
  totalCount: number;
  userId: string | null;
  userImage: string | null;
}) => {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [showReplies, setShowReplies] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handleReplyClick = () => {
    if (!userId) return;
    setShowReplyForm(prev => !prev);
    if (!showReplies && comment.replies.length > 0) setShowReplies(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 + index * 0.1 }}
    >
      <div className="flex gap-4 p-4 rounded-2xl hover:bg-accent/30 transition-colors group">
        <Avatar userImage={comment.profile.profileImage} />

        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex items-center gap-2 mb-1">
            <span className="font-semibold text-sm">
              {comment.profile.firstName} {comment.profile.lastName}
            </span>

            <span className="text-xs text-muted-foreground">
              {formatDate(comment.createdAt)}
            </span>

            <div className="flex items-center gap-0.5 ml-auto">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3 h-3 ${
                    i < comment.rating
                      ? "fill-amber-400 text-amber-400"
                      : "text-muted"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Comment Text OR Edit Form */}
          {isEditing ? (
            <EditCommentForm
              commentId={comment.id}
              initialComment={comment.comment}
              onSave={updateCommentAction}
              onCancel={() => setIsEditing(false)}
            />
          ) : (
            <p className="text-sm text-foreground/80 leading-relaxed mb-3">
              {comment.comment}
            </p>
          )}

          {!isEditing && (
            <div className="flex items-center gap-4">
              <LikeButton />

              <ReplyButton
                showReplyForm={showReplyForm}
                replyCount={comment.replies.length}
                onClick={handleReplyClick}
              />
              {comment.replies.length > 0 && (
                <ToggleRepliesButton
                  showReplies={showReplies}
                  replyCount={comment.replies.length}
                  onClick={() => setShowReplies(prev => !prev)}
                />
              )}
            </div>
          )}

          {/* Reply Form */}
          {showReplyForm && userId && !isEditing && (
            <ReplyForm
              commentId={comment.id}
              landmarkId={comment.landmarkId}
              replyToName={`${comment.profile.firstName} ${comment.profile.lastName}`}
              onSuccess={() => {
                setShowReplyForm(false);
                setShowReplies(true);
              }}
              onCancel={() => setShowReplyForm(false)}
              userImage={userImage}
            />
          )}

          {/* Replies List */}
          {showReplies && comment.replies.length > 0 && (
            <ReplyList replies={comment.replies} formatDate={formatDate} />
          )}
        </div>

        {/* More Options */}
        {userId === comment.profileId && !isEditing && (
          <CommentButtonAction
            onEdit={() => setIsEditing(true)}
            onDelete={() => {
              console.log("ต้องการลบคอมเมนต์ ID:", comment.id);
            }}
          />
        )}
      </div>

      {index < totalCount - 1 && (
        <div className="border-b border-border/50 mx-4" />
      )}
    </motion.div>
  );
};

export default CommentCard;
