import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";
import { wordList } from "@/lib/word";
import { prismaClient } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const headers = req.headers.get("authorization");
  const token = headers?.split(' ')[1]

  if (!token) {
    return NextResponse.json({
      message: "no token exists"
    }, {
      status: 404
    })
  }

  const book = verifyToken(token);
  console.log(book?.bookId)

  if (!book || !book.bookId) {
    return NextResponse.json({
      message: "no access granted" // wrong token
    }, {
      status: 401
    })
  }

  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);

  const endOfToday = new Date();
  endOfToday.setHours(23, 59, 59, 999);

  // checking if word is been sent already for today
  let todayWord = await prismaClient.sentWord.findFirst({
    where: {
      userId: book.bookId,
      dateSent: {
        gte: startOfToday,
        lt: endOfToday
      }
    }
  })

  if (!todayWord) {
    // pull words from past days
    const sentWords = await prismaClient.sentWord.findMany({
      where: { userId: book.bookId },
      select: { word: true }
    })

    // extracting the words which are already sent to the user
    const sentWordSet = new Set(sentWords.map(w => w.word));
    const availableWords = wordList.filter(w => !sentWordSet.has(w.word));

    if (availableWords.length == 0) {
      return NextResponse.json({
        message: "no words left"
      })
    }

    let newWord = availableWords[Math.floor(Math.random() * availableWords.length)]

    // save new word to db
    todayWord = await prismaClient.sentWord.create({
      data: {
        userId: book.bookId,
        word: newWord.word,
        dateSent: new Date()
      }
    })
  }

  // words already fetched by user
  const history = await prismaClient.sentWord.findMany({
    where: {
      userId: book.bookId,
    },
    orderBy: {
      dateSent: 'desc',
    },
  });

  const fullWordData = history.map(entry => {
    const wordData = wordList.find(w => w.word === entry.word);
    return {
      date: entry.dateSent,
      word: entry.word,
      meaning: wordData?.meaning ?? "N/A",
      usecase: wordData?.useCase ?? "N/A",
    };
  });

  const todayWordDetails = wordList.find(w => w.word === todayWord.word);

  return NextResponse.json({
    // render words here
    today: {
      date: todayWord.dateSent,
      word: todayWord.word,
      meaning: todayWordDetails?.meaning,
      usecase: todayWordDetails?.useCase
    },

    history: fullWordData
  }, {
    status: 200
  })
}