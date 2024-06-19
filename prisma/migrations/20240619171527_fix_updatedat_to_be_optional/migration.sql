-- AlterTable
ALTER TABLE "author" ALTER COLUMN "updatedAt" DROP NOT NULL;

-- AlterTable
ALTER TABLE "book" ALTER COLUMN "updatedAt" DROP NOT NULL;

-- AlterTable
ALTER TABLE "tag" ALTER COLUMN "updatedAt" DROP NOT NULL;

-- AlterTable
ALTER TABLE "webuser" ALTER COLUMN "updatedAt" DROP NOT NULL;
