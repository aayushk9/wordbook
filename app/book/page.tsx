import { Book } from "@/components/book"
import { BookOpen } from "lucide-react"

export default function BookPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-8">
        <header className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-green-500" />
            <h1 className="text-2xl font-bold text-green-400">WordBook</h1>
          </div>
        </header>
        <main>
          <Book />
        </main>
      </div>
    </div>
  )
}