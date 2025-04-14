import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const headers = req.headers.get("authorization");
  const token = headers?.split(' ')[1]

  if(!token) {
    return NextResponse.json({
        message: "no token exists"
    }, {
        status: 404
    })
  }

  const book = verifyToken(token);

  if(!book) {
    return NextResponse.json({
        message: "no access granted"
    }, {
        status: 401
    })
  } 

  return NextResponse.json({
    message: "access granted to book"
  }, {
    status: 200
  })
}