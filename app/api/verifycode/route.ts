import { prismaClient } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken'

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const bookName = body.bookName;
        const joinCode = body.joinCode;

        const book = await prismaClient.user.findUnique({
            where: {
                userName: bookName,
                joinCode: joinCode
            }
        })

        if (book) {
            const token = await jwt.sign(
                {
                    bookId: book.id,
                    bookName: bookName,
                    joinCode: joinCode
                },
                process.env.JWT_SECRET!,
            )
            return NextResponse.json({
                message: "code correct, redirecting you to your book",
                token: token
            }, {
                status: 200
            })
        } else {
            return NextResponse.json({
                message: "wrong code"
            })
        }
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            message: "internal server error"
        })
    }
}