-- DropForeignKey
ALTER TABLE "blogs" DROP CONSTRAINT "blogs_thumbnailId_fkey";

-- AddForeignKey
ALTER TABLE "blogs" ADD CONSTRAINT "blogs_thumbnailId_fkey" FOREIGN KEY ("thumbnailId") REFERENCES "Thumbnail"("id") ON DELETE CASCADE ON UPDATE CASCADE;
