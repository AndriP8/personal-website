/*
  Warnings:

  - You are about to drop the column `thumbnail` on the `blogs` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[thumbnailId]` on the table `blogs` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `thumbnailId` to the `blogs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "blogs" DROP COLUMN "thumbnail",
ADD COLUMN     "thumbnailId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Thumbnail" (
    "id" TEXT NOT NULL,
    "resource" VARCHAR(100) NOT NULL,
    "owner" VARCHAR(100) NOT NULL,
    "ownerLink" VARCHAR(100) NOT NULL,

    CONSTRAINT "Thumbnail_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "blogs_thumbnailId_key" ON "blogs"("thumbnailId");

-- AddForeignKey
ALTER TABLE "blogs" ADD CONSTRAINT "blogs_thumbnailId_fkey" FOREIGN KEY ("thumbnailId") REFERENCES "Thumbnail"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
