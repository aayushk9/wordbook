import jwt from "jsonwebtoken";

export interface TokenPayload {
    bookId: string;
    bookName: string;
    joinCode: string;
  }

export function verifyToken(token: string): TokenPayload | null {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as TokenPayload;
        return decoded 
    } catch (error) {
        console.log(error);
        return null
    }
}