import { CommentProps } from "@/utils/types";
import CommentCard from "./CommentCard";

type CommentListProps = {
  comments: CommentProps[];
  userId: string | null;
  userImage: string | null;
};

const EmptyComments = () => (
  <p className="text-center text-muted-foreground py-8">
    No comments yet. Be the first to comment!
  </p>
);

const CommentList = ({ comments, userId, userImage }: CommentListProps) => {
  if (comments.length === 0) return <EmptyComments />;

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
