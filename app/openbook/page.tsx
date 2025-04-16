import { Log } from "@/components/log";

export default function OpenBookPage() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center py-12">
      <div className="w-full max-w-md p-6 bg-gradient-to-br from-green-900/30 to-black border border-green-800/50 rounded-xl backdrop-blur-sm">
        <h2 className="text-xl font-semibold text-green-300 mb-4 text-center">
          Open your existing book
        </h2>
        <p className="text-sm text-gray-400 mb-6 text-center">
          Enter your book name and code to access your word book
        </p>
        <Log />
      </div>
    </div>
  );
}