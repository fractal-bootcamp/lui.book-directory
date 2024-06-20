-- AlterTable
ALTER TABLE "author" ADD COLUMN     "born" TIMESTAMP(3),
ADD COLUMN     "died" TIMESTAMP(3),
ADD COLUMN     "genre" TEXT,
ADD COLUMN     "nation" TEXT,
ADD COLUMN     "rating" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "book" ADD COLUMN     "language" TEXT,
ADD COLUMN     "rating" INTEGER NOT NULL DEFAULT 0;
