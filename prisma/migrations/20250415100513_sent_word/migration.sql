/*
  Warnings:

  - You are about to drop the `wordBook` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "wordBook" DROP CONSTRAINT "wordBook_userId_fkey";

-- DropTable
DROP TABLE "wordBook";

-- CreateTable
CREATE TABLE "SentWord" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "word" TEXT NOT NULL,
    "dateSent" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SentWord_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SentWord_userId_dateSent_key" ON "SentWord"("userId", "dateSent");

-- CreateIndex
CREATE UNIQUE INDEX "SentWord_userId_word_key" ON "SentWord"("userId", "word");

-- AddForeignKey
ALTER TABLE "SentWord" ADD CONSTRAINT "SentWord_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
