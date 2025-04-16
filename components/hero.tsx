"use client"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Sparkles, BookOpen, ArrowRight, Copy, Check } from "lucide-react"

export function Hero() {
    const [bookName, setBookName] = useState("")
    const [generatedCode, setGeneratedCode] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [copied, setCopied] = useState(false)
    const router = useRouter()
    const codeRef = useRef<HTMLParagraphElement | null>(null)

    const codeGenerator = async () => {
        if (!bookName.trim()) return
        setIsLoading(true)
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/createbook`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ bookName }),
            })

            const data = await res.json()
            if (res.ok) {
                setGeneratedCode(data.generatedCode)
            }  else if(res.status == 409){
                alert("Book name already taken")
            } else {
                alert("Book name should contain atleast 2 letters")
            }
        } catch (error) {
            console.error("Some internal error occurred", error)
        } finally {
            setIsLoading(false)
        }
    }

    const copyToClipboard = () => {
        navigator.clipboard.writeText(generatedCode)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    const redirectToVerify = () => {
        router.push("/verify")
    }

    const redirectToOpenBook = () => {
        router.push("/openbook")
    }

    return (
        <section className="min-h-screen py-10 md:py-16 flex flex-col items-center justify-center text-center bg-black text-white">
            <div className="inline-flex items-center px-3 py-1 mb-6 text-sm rounded-full border border-green-600 text-green-300 bg-green-900/20">
                <Sparkles className="w-4 h-4 mr-2" />
                <span>Expand your vocabulary one word at a time</span>
            </div>

            <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl">
                Learn a new word every day with context, examples and usecase. Build your vocabulary effortlessly with WordBook.
            </p>

            <div className="w-full max-w-md mb-10">
                <div className="flex flex-col gap-4 p-6 rounded-xl bg-gradient-to-br from-green-900/30 to-black border border-green-800/50 backdrop-blur-sm">
                    <h2 className="text-xl font-semibold mb-2 flex items-center text-white">
                        <BookOpen className="w-5 h-5 mr-2 text-green-400" />
                        Create Your Book
                    </h2>

                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm text-gray-300 text-left block">Enter your book name</label>
                            <Input
                                value={bookName}
                                onChange={(e) => setBookName(e.target.value)}
                                placeholder="vocably"
                                className="bg-black/50 text-white placeholder:text-gray-400 border border-green-800 focus:border-green-500 focus:ring-green-600"
                            />
                        </div>

                        <Button
                            onClick={codeGenerator}
                            disabled={isLoading || !bookName.trim()}
                            className={`w-full bg-gradient-to-r from-green-600 to-black-600 hover:from-green-700 hover:to-black-700 
                                ${!bookName.trim() ? "opacity-50 cursor-not-allowed" : ""}`}
                        >
                            {isLoading ? "Generating..." : "Generate Code"}
                        </Button>
                    </div>

                    {generatedCode && (
                        <Card className="mt-4 p-4 bg-green-900/20 border border-green-800/50 shadow-[0_0_20px_rgba(34,197,94,0.2)]">
                            <p className="font-medium text-green-300 mb-2">Your Code:</p>
                            <div className="flex items-center justify-between bg-black/30 p-2 rounded mb-4">
                                <p ref={codeRef} className="font-mono text-xl text-white">{generatedCode}</p>
                                <Button
                                    onClick={copyToClipboard}
                                    variant="ghost"
                                    size="sm"
                                    className="text-green-400 hover:text-green-200 hover:bg-green-800/30"
                                >
                                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                                </Button>
                            </div>

                            <Button
                                onClick={redirectToVerify}
                                variant="outline"
                                className="w-full border-green-500 text-black hover:bg-green-900/30"
                            >
                                Verify your book <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                            <p className="text-sm text-gray-400 mt-2">
                                Get your book verified and start receiving daily unique words
                            </p>
                        </Card>
                    )}

                    <div className="mt-6 text-center">
                        <Button
                            onClick={redirectToOpenBook}
                            variant="ghost"
                            className="text-green-400 hover:text-white hover:bg-green-800/20"
                        >
                            <BookOpen className="w-4 h-4 mr-2" />
                            Open Existing Book
                        </Button>
                        <p className="text-sm text-gray-500 mt-1">
                            Already created your book? Access it here.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}