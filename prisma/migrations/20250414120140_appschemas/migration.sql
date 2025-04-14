-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "userName" TEXT NOT NULL,
    "joinCode" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "wordBook" (
    "id" TEXT NOT NULL,
    "word" TEXT NOT NULL,
    "wordMeaning" TEXT NOT NULL,
    "wordUseCase" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "wordBook_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_joinCode_key" ON "User"("joinCode");

-- CreateIndex
CREATE UNIQUE INDEX "wordBook_word_key" ON "wordBook"("word");

-- AddForeignKey
ALTER TABLE "wordBook" ADD CONSTRAINT "wordBook_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
