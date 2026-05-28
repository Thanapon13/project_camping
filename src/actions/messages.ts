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

// 3. ส่งข้อความใหม่เข้า DB
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

    return { code: 200, message };
  } catch (error) {
    return { code: 400, message: "Failed to send message" };
  }
};

export const fetchMyConversations = async () => {
  try {
    const user = await getAuthUser();

    const conversations = await db.conversation.findMany({
      where: {
        OR: [{ userAId: user.id }, { userBId: user.id }],
      },
      include: {
        // ดึงข้อความล่าสุด 1 ข้อความมาพรีวิวในหน้ากล่องข้อความ
        messages: {
          orderBy: { createdAt: "desc" },
          take: 1,
        },
        // TODO: หากมี Relation ไปยัง Profile สามารถ include เพื่อดึงชื่อและรูปของอีกฝ่ายมาแสดงผลได้ที่นี่
      },
      orderBy: { updatedAt: "desc" }, // เอาห้องที่มีความเคลื่อนไหวล่าสุดขึ้นก่อน
    });

    return conversations;
  } catch (error) {
    console.error(error);
    return [];
  }
};
