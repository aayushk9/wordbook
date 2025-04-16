"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { BookOpen, ChevronLeft, ChevronRight, Calendar, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Book() {
  const router = useRouter()
  const [todayWord, setTodayWord] = useState<{
    date: Date
    word: string
    meaning: string
    usecase: string
  } | null>(null)

  const [history, setHistory] = useState<
    Array<{
      date: Date
      word: string
      meaning: string
      usecase: string
    }>
  >([])

  const [currentPage, setCurrentPage] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchWords = async () => {
      setIsLoading(true)
      const token = localStorage.getItem("token")

      if (!token) {
        router.push("/openbook")
        return
      }

      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/book`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        const data = await res.json()
        if (res.ok) {
          setTodayWord(data.today)
          setHistory(data.history)
        } else {
          router.push("/openbook")
        }
      } catch (error) {
        console.error("Error fetching book data:", error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchWords()
  }, [router])

  const goToHome = () => router.push("/")
  const goToPreviousPage = () => currentPage > 0 && setCurrentPage(currentPage - 1)
  const goToNextPage = () => currentPage < Math.ceil(history.length / 3) - 1 && setCurrentPage(currentPage + 1)

  const currentHistoryItems = history.slice(currentPage * 3, (currentPage + 1) * 3)
  const totalPages = Math.max(1, Math.ceil(history.length / 3))

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-green-400 text-xl">Opening your book...</div>
      </div>
    )
  }

  return (
    <div className="mb-12">
      <Button
        variant="ghost"
        onClick={goToHome}
        className="mb-6 text-green-400 hover:text-green-300 hover:bg-green-900/20"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Home
      </Button>

      <div className="book-container relative mx-auto max-w-4xl w-full space-y-6 md:space-y-0 md:flex md:rounded-lg overflow-hidden">
        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-4 -ml-2 bg-gradient-to-r from-green-900 to-black z-10"></div>
        <div className="absolute inset-0 rounded-lg shadow-[0_0_30px_rgba(34,197,94,0.2)] pointer-events-none"></div>

        <div className="flex-1 bg-gradient-to-br from-black to-green-950 p-6 md:p-8 border-b md:border-b-0 md:border-r border-green-800/30 relative min-h-[500px]">
          <div className="absolute top-0 right-0 w-12 h-full bg-gradient-to-l from-black/40 to-transparent hidden md:block"></div>

          <div className="flex items-center mb-6">
            <BookOpen className="w-5 h-5 text-green-500 mr-2" />
            <h2 className="text-2xl font-bold text-green-400">Today's Word</h2>
          </div>

          {todayWord ? (
            <div className="space-y-6">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 text-green-500 mr-2" />
                <span className="text-sm text-green-300">{new Date(todayWord.date).toLocaleDateString()}</span>
              </div>

              <div className="p-6 bg-black/40 border border-green-800/30 rounded-lg shadow-[0_0_15px_rgba(34,197,94,0.1)]">
                <h3 className="text-3xl font-bold mb-4 text-white">{todayWord.word}</h3>
                <p className="text-gray-300 mb-6">{todayWord.meaning}</p>
                <div className="border-l-4 border-green-500 pl-4 py-2 bg-green-900/10">
                  <p className="italic text-green-300">"{todayWord.usecase}"</p>
                </div>
              </div>

              <div className="text-center text-sm text-green-300/60 mt-8">A new word will be added tomorrow</div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-64">
              <p className="text-gray-400">No word for today yet</p>
            </div>
          )}
        </div>

        <div className="flex-1 bg-gradient-to-bl from-black to-green-950 p-6 md:p-8 border-t md:border-t-0 md:border-l border-green-800/30 relative min-h-[500px]">
          <div className="absolute top-0 left-0 w-12 h-full bg-gradient-to-r from-black/40 to-transparent hidden md:block"></div>

          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <BookOpen className="w-5 h-5 text-green-500 mr-2" />
              <h2 className="text-2xl font-bold text-green-400">Previous Words</h2>
            </div>

            {history.length > 0 && (
              <div className="text-sm text-green-300/70">
                Page {currentPage + 1} of {totalPages}
              </div>
            )}
          </div>

          {history.length > 0 ? (
            <>
              <div className="space-y-4 mb-6">
                {currentHistoryItems.map((word, index) => (
                  <div
                    key={index}
                    className="p-4 bg-black/40 border border-green-800/30 rounded-lg hover:border-green-700/50 transition-colors"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-semibold text-white">{word.word}</h3>
                      <span className="text-xs text-green-400">{new Date(word.date).toLocaleDateString()}</span>
                    </div>
                    <p className="text-sm text-gray-300 mb-2">{word.meaning}</p>
                    <p className="text-xs italic text-green-300/80">"{word.usecase}"</p>
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-center mt-auto">
                <Button
                  variant="ghost"
                  onClick={goToPreviousPage}
                  disabled={currentPage === 0}
                  className="text-green-400 hover:text-green-300 hover:bg-green-900/20 disabled:opacity-50"
                >
                  <ChevronLeft className="w-5 h-5 mr-1" />
                  Previous
                </Button>

                <Button
                  variant="ghost"
                  onClick={goToNextPage}
                  disabled={currentPage >= Math.ceil(history.length / 3) - 1}
                  className="text-green-400 hover:text-green-300 hover:bg-green-900/20 disabled:opacity-50"
                >
                  Next
                  <ChevronRight className="w-5 h-5 ml-1" />
                </Button>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center h-64">
              <p className="text-gray-400">No previous words yet</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}