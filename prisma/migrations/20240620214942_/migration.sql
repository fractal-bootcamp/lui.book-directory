/*
  Warnings:

  - A unique constraint covering the columns `[clerkID]` on the table `reader` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "reader_clerkID_key" ON "reader"("clerkID");
