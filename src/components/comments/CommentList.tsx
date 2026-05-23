import { CommentProps } from "@/utils/types";
import CommentCard from "./CommentCard";

const CommentList = ({
  comments,
  userId,
  userImage,
}: {
  comments: CommentProps[];
  userId: string | null;
  userImage: string | null;
}) => {
  if (comments.length === 0) {
    return (
      <p className="text-center text-muted-foreground py-8">
        No comments yet. Be the first to comment!
      </p>
    );
  }

  return (
    <div className="space-y-1">
      {comments.map((comment, index) => (
        <CommentCard
          key={comment.id}
          comment={comment}
          index={index}
          totalCount={comments.length}
          userId={userId}
          userImage={userImage}
        />
      ))}
    </div>
  );
};

export default CommentList;
