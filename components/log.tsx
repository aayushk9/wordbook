"use client"

import { useState } from "react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { useRouter } from "next/navigation"
import { ArrowRight } from "lucide-react"

export function Log() {
    const [bookName, setBookName] = useState("")
    const [joinCode, setJoinCode] = useState("")
    const router = useRouter()

    const verifyCode = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/verifycode`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ bookName, joinCode }),
            })
            const data = await res.json();
            if (res.ok) {
                localStorage.setItem("token", data.token);
                router.push("/book")
            } else if(res.status == 400){
                alert("Wrong credentials")
            } else {
                alert("something went wrong")
            }
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className="space-y-4">
            <div>
                <Input
                    value={bookName}
                    onChange={(e) => setBookName(e.target.value)}
                    placeholder="Enter your book name"
                    className="bg-black/50 text-white border border-green-800 focus:border-green-500"
                />
            </div>

            <div>
                <Input
                    value={joinCode}
                    onChange={(e) => setJoinCode(e.target.value)}
                    placeholder="Enter Code"
                    className="bg-black/50 text-white border border-green-800 focus:border-green-500"
                />
            </div>

            <Button
                onClick={verifyCode}
                className="w-full bg-gradient-to-r from-green-600 to-black hover:from-green-700 hover:to-black"
            >
                Open Book <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
        </div>
    )
}