/*
  Warnings:

  - You are about to drop the `book` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_BookToTag" DROP CONSTRAINT "_BookToTag_A_fkey";

-- DropForeignKey
ALTER TABLE "book" DROP CONSTRAINT "book_authorId_fkey";

-- DropTable
DROP TABLE "book";

-- CreateTable
CREATE TABLE "boosk" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "authorId" INTEGER NOT NULL,

    CONSTRAINT "boosk_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "boosk_name_key" ON "boosk"("name");

-- AddForeignKey
ALTER TABLE "boosk" ADD CONSTRAINT "boosk_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "author"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BookToTag" ADD CONSTRAINT "_BookToTag_A_fkey" FOREIGN KEY ("A") REFERENCES "boosk"("id") ON DELETE CASCADE ON UPDATE CASCADE;
