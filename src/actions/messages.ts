"use server";

import { getAuthUser } from "./auth";
import db from "@/utils/db";

// 1. ค้นหาหรือสร้างห้องแชท (Conversation)
export const getOrCreateConversation = async (hostId: string) => {
  try {
    const user = await getAuthUser();
    if (user.id === hostId) throw new Error("You cannot chat with yourself");

    const [userAId, userBId] = [user.id, hostId].sort();

    let conversation = await db.conversation.findUnique({
      where: {
        userAId_userBId: { userAId, userBId },
      },
    });

    if (!conversation) {
      conversation = await db.conversation.create({
        data: { userAId, userBId },
      });
    }

    return { code: 200, conversationId: conversation.id };
  } catch (error) {
    return {
      code: 400,
      message: error instanceof Error ? error.message : "Error",
    };
  }
};

// 2. ดึงข้อความเก่าในห้องแชทนั้นๆ
export const fetchMessages = async (conversationId: string) => {
  try {
    await getAuthUser();
    const messages = await db.message.findMany({
      where: { conversationId },
      orderBy: { createdAt: "asc" },
    });
    return messages;
  } catch (error) {
    console.error(error);
    return [];
  }
};

// 3. ส่งข้อความใหม่เข้า DB + broadcast ผ่าน Supabase Realtime
export const sendMessageAction = async (
  conversationId: string,
  content: string,
) => {
  try {
    const user = await getAuthUser();

    const message = await db.message.create({
      data: {
        content,
        senderId: user.id,
        conversationId,
      },
    });

    await db.conversation.update({
      where: { id: conversationId },
      data: { updatedAt: new Date() },
    });

    const payload = {
      id: message.id,
      content: message.content,
      senderId: message.senderId,
      conversationId: message.conversationId,
      createdAt: message.createdAt.toISOString(),
      isRead: message.isRead,
    };

    // Broadcast ให้ทั้งสองฝ่ายในห้องแชทเห็น message ใหม่
    await broadcastToChannel(`conversation:${conversationId}`, "new-message", payload);

    // Broadcast ไปยัง receiver โดยตรง เพื่อเปิด IncomingChatListener popup
    const conversation = await db.conversation.findUnique({
      where: { id: conversationId },
      select: { userAId: true, userBId: true },
    });

    if (conversation) {
      const receiverId =
        conversation.userAId === user.id
          ? conversation.userBId
          : conversation.userAId;
      await broadcastToChannel(`user:${receiverId}`, "incoming-message", payload);
    }

    return { code: 200, message };
  } catch (error) {
    return { code: 400, message: "Failed to send message" };
  }
};

async function broadcastToChannel(
  topic: string,
  event: string,
  payload: object,
) {
  const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/realtime/v1/api/broadcast`;
  const key = process.env.SUPABASE_KEY as string;

  await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${key}`,
      apikey: key,
    },
    body: JSON.stringify({ messages: [{ topic, event, payload }] }),
  });
}

export const markMessagesAsRead = async (conversationId: string) => {
  try {
    const user = await getAuthUser();
    await db.message.updateMany({
      where: {
        conversationId,
        senderId: { not: user.id },
        isRead: false,
      },
      data: { isRead: true },
    });
    // แจ้งฝั่งผู้ส่งว่าอ่านแล้ว
    await broadcastToChannel(`conversation:${conversationId}`, "messages-read", {
      readBy: user.id,
    });
  } catch {
    // ไม่ block UI ถ้า mark อ่านไม่สำเร็จ
  }
};

export const getProfileByClerkId = async (clerkId: string) => {
  try {
    return await db.profile.findUnique({
      where: { clerkId },
      select: {
        clerkId: true,
        firstName: true,
        lastName: true,
        profileImage: true,
      },
    });
  } catch {
    return null;
  }
};

export const fetchMyConversations = async () => {
  try {
    const user = await getAuthUser();

    const [conversations, unreadCounts] = await Promise.all([
      db.conversation.findMany({
        where: { OR: [{ userAId: user.id }, { userBId: user.id }] },
        include: {
          messages: {
            orderBy: { createdAt: "desc" },
            take: 1,
            select: { content: true, createdAt: true, senderId: true },
          },
          userA: {
            select: { clerkId: true, firstName: true, lastName: true, profileImage: true },
          },
          userB: {
            select: { clerkId: true, firstName: true, lastName: true, profileImage: true },
          },
        },
        orderBy: { updatedAt: "desc" },
      }),
      db.message.groupBy({
        by: ["conversationId"],
        where: { isRead: false, senderId: { not: user.id } },
        _count: { id: true },
      }),
    ]);

    const unreadMap = Object.fromEntries(
      unreadCounts.map(u => [u.conversationId, u._count.id]),
    );

    return conversations.map(conv => ({
      ...conv,
      unreadCount: unreadMap[conv.id] ?? 0,
    }));
  } catch (error) {
    console.error(error);
    return [];
  }
};
