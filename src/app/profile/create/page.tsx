import { clerkClient, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import db from "@/utils/db";

const CreateProfile = async () => {
  const user = await currentUser();

  if (!user) redirect("/");

  if (user.privateMetadata.hasProfile) redirect("/");

  const userName =
    user.username ??
    user.emailAddresses[0]?.emailAddress.split("@")[0] ??
    user.id;

  await db.profile.create({
    data: {
      clerkId: user.id,
      firstName: user.firstName ?? "",
      lastName: user.lastName ?? "",
      userName,
      email: user.emailAddresses[0]?.emailAddress ?? "",
      profileImage: user.imageUrl,
    },
  });

  const client = await clerkClient();
  await client.users.updateUserMetadata(user.id, {
    privateMetadata: { hasProfile: true },
  });

  redirect("/");
};

export default CreateProfile;
