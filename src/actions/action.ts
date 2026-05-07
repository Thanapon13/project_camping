"use server";

import { profileSchema, validateWithZod } from "@/utils/schemas";
import { clerkClient, currentUser } from "@clerk/nextjs/server";
import db from "@/utils/db";
import { redirect } from "next/navigation";

const getAuthUser = async () => {
  const user = await currentUser();

  if (!user) {
    throw new Error("You must logged!!!");
  }

  if (!user.privateMetadata.hasProfile) redirect("/profile/create");

  return user;
};

const renderError = (
  error: unknown,
  code: number,
): { message: string; code: number } => {
  return {
    message: error instanceof Error ? error.message : "An Error!!!",
    code: code,
  };
};

export const createProfileAction = async (
  prevState: any,
  formData: FormData,
) => {
  try {
    const user = await currentUser();
    if (!user) throw new Error("Please Login!!!");

    const rawData = Object.fromEntries(
      Array.from(formData.entries()).filter(([key]) => !key.startsWith("$")),
    );

    const validatedField = validateWithZod(profileSchema, rawData);
    console.log("validatedField:", validatedField);

    await db.profile.create({
      data: {
        clerkId: user.id,
        email: user?.emailAddresses[0]?.emailAddress,
        profileImage: user.imageUrl,
        ...validatedField,
      },
    });

    const client = await clerkClient();

    await client.users.updateUserMetadata(user.id, {
      privateMetadata: {
        hasProfile: true,
      },
    });

    // return { message: "Create Profile successfully", code: 200 };
  } catch (error) {
    return renderError(error, 402);
  }
  redirect("/");
};

export const createLandmarkAction = async (
  prevState: any,
  formData: FormData,
): Promise<{ message: string }> => {
  try {
    const user = await getAuthUser();
    console.log("user:", user.id);

    const rawData = Object.fromEntries(
      Array.from(formData.entries()).filter(([key]) => !key.startsWith("$")),
    );
    console.log("rawData:", rawData);

    // await db.landmark.create({
    //   data: {},
    // });

    return { message: "create Landmark Success!!!" };
  } catch (error) {
    return renderError(error, 402);
  }
};
