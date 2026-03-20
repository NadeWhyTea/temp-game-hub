"use client";

import Link from "next/link";

export default function GamesPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-7xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Game Hub</h1>
          <p className="text-gray-300">Choose your game</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Wordle Games - Left Half */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
            <h2 className="text-3xl font-bold text-white mb-6 text-center">📝 Wordle Games</h2>
            
            <div className="space-y-4">
              <Link
                href="/games/wordle"
                className="block w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-400 hover:to-purple-500 text-white font-bold py-4 px-6 rounded-lg transition-all duration-300 text-center"
              >
                Enter Wordle Menu
              </Link>
              
              <div className="grid grid-cols-2 gap-3">
                <Link
                  href="/games/wordle-practice"
                  className="bg-white/10 hover:bg-white/20 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 text-center"
                >
                  Practice
                </Link>
                <Link
                  href="/games/wordle-solver"
                  className="bg-white/10 hover:bg-white/20 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 text-center"
                >
                  Solver
                </Link>
                <Link
                  href="/games/wordle-battle"
                  className="bg-white/10 hover:bg-white/20 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 text-center"
                >
                  Battle
                </Link>
                <Link
                  href="/games/wordle-speed"
                  className="bg-white/10 hover:bg-white/20 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 text-center"
                >
                  Speed
                </Link>
                <Link
                  href="/games/wordle-custom"
                  className="bg-white/10 hover:bg-white/20 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 text-center"
                >
                  Custom
                </Link>
                <Link
                  href="/games/wordle-daily"
                  className="bg-white/10 hover:bg-white/20 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 text-center"
                >
                  Daily
                </Link>
              </div>
              
              <p className="text-gray-300 text-sm text-center mt-4">
                Multiple Wordle variations including solver, custom lengths, speed rounds, and more!
              </p>
            </div>
          </div>

          {/* E-Digits Memory Test - Right Half */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
            <div className="text-center">
              <div className="text-8xl mb-6">🧠</div>
              <h2 className="text-2xl font-bold text-white mb-4">E-Digits Memory Test</h2>
              <p className="text-gray-300 text-sm mb-6">
                Test your memory with challenging digit sequences
              </p>
              <div className="flex flex-wrap gap-2 justify-center mb-6">
                <span className="px-3 py-1 bg-blue-500/20 text-blue-300 text-xs rounded-full border border-blue-500/30">Memory</span>
                <span className="px-3 py-1 bg-purple-500/20 text-purple-300 text-xs rounded-full border border-purple-500/30">Challenge</span>
              </div>
              <Link
                href="/games/e-digits"
                className="block w-full bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-400 hover:to-teal-500 text-white font-bold py-4 px-6 rounded-lg transition-all duration-300 text-center"
              >
                Start Memory Test
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
