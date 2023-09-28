-- CreateTable
CREATE TABLE "blogs" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(100) NOT NULL,
    "slug" VARCHAR(100) NOT NULL,
    "thumbnail" VARCHAR(100) NOT NULL,
    "content" TEXT NOT NULL,
    "timeToRead" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "blogs_pkey" PRIMARY KEY ("id")
);
