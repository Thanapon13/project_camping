"use server";

import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath, revalidateTag, unstable_cache } from "next/cache";
import db from "@/utils/db";
import { validateComment, validateWithZod } from "@/utils/schemas";
import { renderError } from "./error";

export const createCommentAction = async (
  prevState: unknown,
  formData: FormData,
) => {
  try {
    const user = await currentUser();
    if (!user) throw new Error("Please Login!!!");

    const rawData = Object.fromEntries(
      Array.from(formData.entries()).filter(([key]) => !key.startsWith("$")),
    );

    const validatedComment = validateWithZod(validateComment, rawData);

    await db.comment.create({
      data: {
        comment: validatedComment.comment,
        rating: validatedComment.rating,
        profileId: user.id,
        landmarkId: validatedComment.landmarkId,
      },
    });

    revalidateTag(`comments-${validatedComment.landmarkId}`, "default");
    revalidatePath(`/landmark/${validatedComment.landmarkId}`);
    return { message: "Comment posted successfully!", code: 200 };
  } catch (err) {
    return renderError(err, 402);
  }
};

export async function fetchComments({ landmarkId }: { landmarkId: string }) {
  const fn = unstable_cache(
    async () => {
      return db.comment.findMany({
        where: { landmarkId, parentId: null },
        include: {
          profile: {
            select: { firstName: true, lastName: true, profileImage: true },
          },
          replies: {
            include: {
              profile: {
                select: { firstName: true, lastName: true, profileImage: true },
              },
            },
            orderBy: { createdAt: "asc" },
          },
        },
        orderBy: { createdAt: "desc" },
      });
    },
    [`comments-${landmarkId}`],
    { tags: [`comments-${landmarkId}`], revalidate: 300 },
  );
  return fn();
}

export const createReplyAction = async (
  prevState: unknown,
  formData: FormData,
) => {
  try {
    const user = await currentUser();
    if (!user) throw new Error("Please Login!!!");

    const rawData = Object.fromEntries(
      Array.from(formData.entries()).filter(([key]) => !key.startsWith("$")),
    );

    const reply = rawData.reply as string;
    const parentId = rawData.parentId as string;
    const landmarkId = rawData.landmarkId as string;

    if (!reply?.trim()) throw new Error("Please enter your reply");
    if (!parentId) throw new Error("Invalid comment");

    await db.comment.create({
      data: {
        comment: reply,
        rating: 0,
        profileId: user.id,
        landmarkId,
        parentId,
      },
    });

    revalidateTag(`comments-${landmarkId}`, "default");
    revalidatePath(`/landmark/${landmarkId}`);
    return { message: "Reply posted successfully!", code: 200 };
  } catch (err) {
    return renderError(err, 402);
  }
};

export const editCommentAction = async (
  prevState: unknown,
  formData: FormData,
): Promise<{ message: string; code: number }> => {
  try {
    const user = await currentUser();
    if (!user) throw new Error("Please Login!!!");

    const commentId = formData.get("commentId") as string;
    const newComment = formData.get("comment") as string;

    if (!newComment?.trim()) throw new Error("กรุณากรอกข้อความคอมเมนต์");

    const updatedComment = await db.comment.update({
      where: { id: commentId, profileId: user.id },
      data: { comment: newComment },
    });

    revalidateTag(`comments-${updatedComment.landmarkId}`, "default");
    revalidatePath(`/landmark/${updatedComment.landmarkId}`);
    return { message: "แก้ไขคอมเมนต์สำเร็จ!", code: 200 };
  } catch (err) {
    return renderError(err, 402);
  }
};

export const deleteCommentAction = async (
  prevState: unknown,
  formData: FormData,
) => {
  try {
    const user = await currentUser();
    if (!user) throw new Error("Please Login!!!");

    const id = formData.get("id") as string;

    const deletedComment = await db.comment.delete({
      where: { id, profileId: user.id },
    });

    revalidateTag(`comments-${deletedComment.landmarkId}`, "default");
    revalidatePath(`/landmark/${deletedComment.landmarkId}`);
    return { code: 200, message: "ลบคอมเมนต์สำเร็จ" };
  } catch (err) {
    return renderError(err, 402);
  }
};
