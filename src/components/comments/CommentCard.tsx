"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { CommentProps } from "@/utils/types";
import ReplyForm from "./ReplyForm";
import ReplyList from "./ReplyList";
import { CommentButtonAction } from "./CommentButtonAction";
import Avatar from "@/user/Avatar";
import EditCommentForm from "./EditCommentForm";
import { deleteCommentAction, editCommentAction } from "@/actions/comment";
import CommentInteractions from "./CommentInteractions";
import DeleteCommentModal from "./DeleteCommentModal";
import LandmarkRating from "../card/LandmarkRating";

// --- Helpers ---

const formatDate = (date: Date) =>
  new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(date));

// --- Types ---

type CommentCardProps = {
  comment: CommentProps;
  index: number;
  totalCount: number;
  userId: string | null;
  userImage: string | null;
};

// --- Main Component ---

const CommentCard = ({
  comment,
  index,
  totalCount,
  userId,
  userImage,
}: CommentCardProps) => {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [showReplies, setShowReplies] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const isOwner = userId === comment.profileId;
  const replyToName = `${comment.profile.firstName} ${comment.profile.lastName}`;

  const handleReplyClick = () => {
    if (!userId) return;
    setShowReplyForm(prev => !prev);
    // เปิด replies อัตโนมัติเมื่อกด reply
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
          {/* Header ของ comment: ชื่อ, วันที่, rating */}
          <div className="flex items-center gap-2 mb-1">
            <span className="font-semibold text-sm">
              {comment.profile.firstName} {comment.profile.lastName}
            </span>
            <span className="text-xs text-muted-foreground">
              {formatDate(comment.createdAt)}
            </span>

            <LandmarkRating rating={comment.rating} />
          </div>

          {/* สลับระหว่าง edit form กับ comment text */}
          {isEditing ? (
            <EditCommentForm
              commentId={comment.id}
              initialComment={comment.comment}
              onSave={editCommentAction}
              onCancel={() => setIsEditing(false)}
            />
          ) : (
            <p className="text-sm text-foreground/80 leading-relaxed mb-3">
              {comment.comment}
            </p>
          )}

          {/* ปุ่ม like / reply / toggle replies */}
          {!isEditing && (
            <CommentInteractions
              comment={comment}
              showReplyForm={showReplyForm}
              showReplies={showReplies}
              handleReplyClick={handleReplyClick}
              setShowReplies={setShowReplies}
            />
          )}

          {/* Reply form — แสดงเมื่อกด reply */}
          {showReplyForm && userId && !isEditing && (
            <ReplyForm
              commentId={comment.id}
              landmarkId={comment.landmarkId}
              replyToName={replyToName}
              onSuccess={() => {
                setShowReplyForm(false);
                setShowReplies(true);
              }}
              onCancel={() => setShowReplyForm(false)}
              userImage={userImage}
            />
          )}

          {/* Replies list — แสดงเมื่อ toggle */}
          {showReplies && comment.replies.length > 0 && (
            <ReplyList replies={comment.replies} formatDate={formatDate} />
          )}
        </div>

        {/* ปุ่ม edit/delete — แสดงเฉพาะเจ้าของ comment */}
        {isOwner && !isEditing && (
          <CommentButtonAction
            onEdit={() => setIsEditing(true)}
            onDelete={() => setShowDeleteModal(true)}
          />
        )}
      </div>

      {/* divider ระหว่าง comment ยกเว้นอันสุดท้าย */}
      {index < totalCount - 1 && (
        <div className="border-b border-border/50 mx-4" />
      )}

      {/* Modal ยืนยันการลบ comment */}
      <DeleteCommentModal
        commentId={comment.id}
        open={showDeleteModal}
        onOpenChange={setShowDeleteModal}
        action={deleteCommentAction}
      />
    </motion.div>
  );
};

export default CommentCard;
