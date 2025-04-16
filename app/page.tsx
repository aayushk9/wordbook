import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <div className="container mx-auto px-4 py-2 flex-1 flex flex-col">
        <Navbar />
        <main className="flex-1 flex flex-col">
          <Hero />
        </main>
        <Footer />
      </div>
    </div>
  )
}