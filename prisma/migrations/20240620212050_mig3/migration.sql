/*
  Warnings:

  - You are about to drop the `webuser` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "author" ADD COLUMN     "imageUrl" TEXT;

-- AlterTable
ALTER TABLE "book" ADD COLUMN     "imageUrl" TEXT;

-- DropTable
DROP TABLE "webuser";

-- CreateTable
CREATE TABLE "reader" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "clerkID" TEXT,
    "avatarUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "reader_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReaderBookFave" (
    "bookId" INTEGER NOT NULL,
    "readerId" INTEGER NOT NULL,

    CONSTRAINT "ReaderBookFave_pkey" PRIMARY KEY ("bookId","readerId")
);

-- AddForeignKey
ALTER TABLE "ReaderBookFave" ADD CONSTRAINT "ReaderBookFave_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReaderBookFave" ADD CONSTRAINT "ReaderBookFave_readerId_fkey" FOREIGN KEY ("readerId") REFERENCES "reader"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
