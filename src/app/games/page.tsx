"use client";

import Link from "next/link";

export default function GamesPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex flex-col items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Game Hub</h1>
          <p className="text-gray-300">Choose your game</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Wordle Games */}
          <div className="col-span-full">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 mb-6">
              <h2 className="text-2xl font-bold text-white mb-4 text-center">📝 Wordle Games</h2>
              <Link
                href="/games/wordle"
                className="block w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-400 hover:to-purple-500 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 text-center mb-4"
              >
                Enter Wordle Menu
              </Link>
              <p className="text-gray-300 text-sm text-center">
                Multiple Wordle variations including solver, custom lengths, speed rounds, and more!
              </p>
            </div>
          </div>

          {/* E-Digits Memory Test */}
          <Link href="/games/e-digits" className="group">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/20 hover:scale-105 transition-all duration-300 cursor-pointer">
              <div className="text-center">
                <div className="text-6xl mb-4">🧠</div>
                <h2 className="text-xl font-bold text-white mb-2">E-Digits Memory Test</h2>
                <p className="text-gray-300 text-sm mb-4">
                  Test your memory with challenging digit sequences
                </p>
                <div className="flex flex-wrap gap-2 justify-center">
                  <span className="px-2 py-1 bg-blue-500/20 text-blue-300 text-xs rounded-full border border-blue-500/30">Memory</span>
                  <span className="px-2 py-1 bg-purple-500/20 text-purple-300 text-xs rounded-full border border-purple-500/30">Challenge</span>
                </div>
              </div>
            </div>
          </Link>
        </div>

        <div className="text-center mt-8">
          <Link href="/" className="text-gray-400 hover:text-white transition-colors">
            ← Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
