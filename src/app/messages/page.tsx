import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { fetchMyConversations } from "@/actions/messages";
import MessagesClient, {
  ConversationItem,
} from "@/components/messages/MessagesClient";

const MessagesPage = async () => {
  const user = await currentUser();
  if (!user) redirect("/");

  const rawConversations = await fetchMyConversations();

  const conversations: ConversationItem[] = rawConversations.map(conv => {
    const isUserA = conv.userAId === user.id;
    const otherProfile = isUserA ? conv.userB : conv.userA;
    const lastMsg = conv.messages[0];

    return {
      id: conv.id,
      updatedAt: conv.updatedAt,
      lastMessage: lastMsg?.content ?? "",
      unreadCount: conv.unreadCount,
      otherProfile: {
        clerkId: otherProfile.clerkId,
        firstName: otherProfile.firstName,
        lastName: otherProfile.lastName,
        profileImage: otherProfile.profileImage,
      },
    };
  });

  return (
    <main className="min-h-screen bg-background">
      <div className="container max-w-7xl sm:px-6 lg:px-8 py-24">
        <MessagesClient conversations={conversations} currentUserId={user.id} />
      </div>
    </main>
  );
};

export default MessagesPage;
