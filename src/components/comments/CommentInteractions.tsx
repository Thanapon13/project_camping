import { CommentProps } from "@/utils/types";
import {
  LikeButton,
  ReplyButton,
  ToggleRepliesButton,
} from "../buttons/Buttons";

interface CommentInteractionsProps {
  comment: CommentProps;
  showReplyForm: boolean;
  showReplies: boolean;
  handleReplyClick: () => void;
  setShowReplies: React.Dispatch<React.SetStateAction<boolean>>;
}

const CommentInteractions = ({
  comment,
  showReplyForm,
  showReplies,
  handleReplyClick,
  setShowReplies,
}: CommentInteractionsProps) => {
  return (
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
  );
};

export default CommentInteractions;
