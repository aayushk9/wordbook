import { prismaClient } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken'

export async function POST(req: NextRequest) {
    try {
        const body = await req.json()
        const bookName = body.bookName;
        const joinCode = body.joinCode;

        const existingBook = await prismaClient.user.findUnique({
            where: {
                userName: bookName,
                joinCode: joinCode
            }
        })

        if (existingBook) {
            const token = jwt.sign(
                {
                    bookId: existingBook.id,
                    bookName: bookName,
                    joinCode: joinCode
                },
                process.env.JWT_SECRET!,
            )
            return NextResponse.json({
                message: "book opened",
                token: token
            }, {
                status: 200
            })
        } else {
            return NextResponse.json({
                message: "book does not exist, please create the book"
            })
        }

    } catch (error) {
        console.log(error)
        return NextResponse.json({
            message: "some internal error occured"
        })
    }
}