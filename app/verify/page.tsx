import { Log } from "@/components/log";

export default function VerifyPage() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center py-12">
      <div className="w-full max-w-md p-6 bg-gradient-to-br from-green-900/30 to-black border border-green-800/50 rounded-xl backdrop-blur-sm">
        <h2 className="text-xl font-semibold text-green-300 mb-4 text-center">
          Get your book verified and start exploring words
        </h2>
        <Log />
      </div>
    </div>
  );
}