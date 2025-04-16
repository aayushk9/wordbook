"use client"

import { BookOpen } from "lucide-react"

export function Footer() {
  return (
    <footer className="py-8 text-gray-400 text-sm">
      <div className="flex flex-col md:flex-row justify-between items-center px-4">
        <div className="flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-green-500" />
          <span>
            WordBook &copy; {new Date().getFullYear()} All rights reserved
          </span>
        </div>
      </div>
    </footer>
  )
}