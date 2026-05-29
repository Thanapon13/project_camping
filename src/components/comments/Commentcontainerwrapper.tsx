import { fetchComments } from "@/actions/comment";
import { auth, currentUser } from "@clerk/nextjs/server";
import CommentContainer from "./CommentContainer";

const CommentContainerWrapper = async ({
  landmarkId,
}: {
  landmarkId: string;
}) => {
  const { userId } = await auth();
  const user = await currentUser();
  const comments = await fetchComments({ landmarkId });

  return (
    <CommentContainer
      landmarkId={landmarkId}
      userId={userId}
      comments={comments}
      userImage={user?.imageUrl ?? ""}
    />
  );
};

export default CommentContainerWrapper;
