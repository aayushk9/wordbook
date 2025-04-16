import Link from "next/link"
import { BookOpen } from 'lucide-react'

export function Navbar() {
  return (
    <header className="py-3">
      <div className="flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <BookOpen className="w-6 h-6 text-green-500 mr-2" />
          <span className="text-2xl font-bold bg-gradient-to-r from-green-500 to-green-400 bg-clip-text text-transparent">
            WordBook
          </span>
        </Link>
      </div>
    </header>
  )
}