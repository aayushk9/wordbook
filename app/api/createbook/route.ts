import { prismaClient } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server';
import { nanoid } from 'nanoid';
import { z } from 'zod'

const parser = z.object({
    bookName: z.string().min(2)
})

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const bookName: string = body.bookName;

        const generatedCode = nanoid(8);
        console.log(generatedCode)

        const parseUserInput = parser.safeParse({
            bookName
        })

        if (!parseUserInput.success) {
            return NextResponse.json({
                message: "not valid input"
            }, {
                status: 400
            })
        }

        const existingBook = await prismaClient.user.findUnique({
             where: {userName: bookName}
        })

        if(existingBook) {
            return NextResponse.json({
                message: "book name already exists, please chossse other name"
            }, {
                status: 409
            })
        }

        const user = await prismaClient.user.create({
            data: {
                userName: bookName,
                joinCode: generatedCode
            }

        })
      
        return NextResponse.json({
                message: "book created successfully",
                generatedCode: generatedCode
            })

    } catch (error) {
        console.log(error)
        return NextResponse.json({
            message: "some internal error occured"
        }, {
            status: 500
        })
    }
}