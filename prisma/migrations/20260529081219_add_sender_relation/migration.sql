-- CreateIndex
CREATE INDEX "Comment_landmarkId_createdAt_idx" ON "Comment"("landmarkId", "createdAt" DESC);

-- CreateIndex
CREATE INDEX "Comment_parentId_idx" ON "Comment"("parentId");

-- AddForeignKey
ALTER TABLE "Conversation" ADD CONSTRAINT "Conversation_userAId_fkey" FOREIGN KEY ("userAId") REFERENCES "Profile"("clerkId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Conversation" ADD CONSTRAINT "Conversation_userBId_fkey" FOREIGN KEY ("userBId") REFERENCES "Profile"("clerkId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- CreateIndex
CREATE INDEX "Favorite_profileId_idx" ON "Favorite"("profileId");

-- CreateIndex
CREATE INDEX "Favorite_landmarkId_idx" ON "Favorite"("landmarkId");

-- CreateIndex
CREATE INDEX "Landmark_updatedAt_idx" ON "Landmark"("updatedAt" DESC);

-- CreateIndex
CREATE INDEX "Landmark_profileId_idx" ON "Landmark"("profileId");

-- CreateIndex
CREATE INDEX "Message_senderId_idx" ON "Message"("senderId");

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "Profile"("clerkId") ON DELETE RESTRICT ON UPDATE CASCADE;
