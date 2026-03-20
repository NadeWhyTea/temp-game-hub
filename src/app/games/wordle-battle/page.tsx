"use client";

import Link from "next/link";

export default function WordleBattle() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex flex-col items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Wordle Battle</h1>
          <p className="text-gray-300">Coming Soon!</p>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
          <div className="text-center">
            <div className="text-6xl mb-4">⚔️</div>
            <h2 className="text-2xl font-bold text-white mb-4">Battle Mode Under Development</h2>
            <p className="text-gray-300 mb-6">
              Challenge your friends in head-to-head Wordle competitions. Features coming soon:
            </p>
            <ul className="text-gray-300 text-left max-w-md mx-auto mb-6 space-y-2">
              <li>• Real-time multiplayer battles</li>
              <li>• Tournament mode</li>
              <li>• Leaderboards and rankings</li>
              <li>• Custom battle rules</li>
            </ul>
            <Link
              href="/games/wordle"
              className="inline-block bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-6 rounded-lg transition-colors"
            >
              ← Back to Wordle Games
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
