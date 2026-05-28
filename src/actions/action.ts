"use server";

import { validateComment, validateWithZod } from "@/utils/schemas";
import { currentUser } from "@clerk/nextjs/server";
import db from "@/utils/db";
import { revalidatePath } from "next/cache";
import { renderError } from "./error";
import { getAuthUser } from "./auth";

export const toggleFavoriteAction = async (prevState: {
  favoriteId: string | null;
  landmarkId: string;
  pathname: string;
}) => {
  const { favoriteId, landmarkId, pathname } = prevState;
  const user = await getAuthUser();

  try {
    // ถ้า favoriteId ไม่ใช่ UUID จริง ให้ถือว่าเป็น create
    const isValidId = favoriteId && !favoriteId.startsWith("pending");

    if (isValidId) {
      await db.favorite.delete({ where: { id: favoriteId } });
    } else {
      await db.favorite.create({
        data: { landmarkId, profileId: user?.id },
      });
    }

    revalidatePath(pathname);

    return {
      code: 200,
      message: isValidId ? "Removed Favorite Success" : "Add Favorite Success",
    };
  } catch (error) {
    return renderError(error, 402);
  }
};

export const fetchFavoriteId = async ({
  landmarkId,
}: {
  landmarkId: string;
}) => {
  const user = await getAuthUser();

  const favorite = await db.favorite.findFirst({
    where: {
      landmarkId,
      profileId: user?.id,
    },

    select: {
      id: true,
    },
  });

  return favorite?.id || null;
};

export const fetchFavorits = async () => {
  const user = await getAuthUser();

  const favorites = await db.favorite.findMany({
    where: { profileId: user.id },
    select: {
      id: true,
      landmark: {
        select: {
          id: true,
          name: true,
          description: true,
          image: true,
          province: true,
          category: true,
          profileId: true,
        },
      },
    },
  });

  return favorites.map(f => ({
    ...f.landmark,
    favoriteId: f.id,
  }));
};

export const createCommentAction = async (
  prevState: any,
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

    revalidatePath(`/landmark/${validatedComment.landmarkId}`);
    return { message: "Comment posted successfully.!", code: 200 };
  } catch (err) {
    return renderError(err, 402);
  }
};

export const fetchComments = async ({ landmarkId }: { landmarkId: string }) => {
  const comments = await db.comment.findMany({
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

  return comments;
};

export const createReplyAction = async (prevState: any, formData: FormData) => {
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

    revalidatePath(`/landmark/${landmarkId}`);
    return { message: "Reply posted successfully!", code: 200 };
  } catch (err) {
    return renderError(err, 402);
  }
};

export const editCommentAction = async (
  prevState: any,
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

    revalidatePath(`/landmark/${updatedComment.landmarkId}`);
    return { message: "แก้ไขคอมเมนต์สำเร็จ!", code: 200 };
  } catch (err) {
    return renderError(err, 402);
  }
};

export const deleteCommentAction = async (
  prevState: any,
  formData: FormData,
) => {
  try {
    const user = await currentUser();
    if (!user) throw new Error("Please Login!!!");
    const id = formData.get("id") as string;

    const deletedComment = await db.comment.delete({
      where: { id, profileId: user.id },
    });

    revalidatePath(`/landmark/${deletedComment.landmarkId}`);
    return { code: 200, message: "ลบคอมเมนต์สำเร็จ" };
  } catch (err) {
    return renderError(err, 402);
  }
};
