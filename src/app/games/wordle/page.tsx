"use client";

import Link from "next/link";
import { useState } from "react";

export default function WordleMenu() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex flex-col items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Wordle Games</h1>
          <p className="text-gray-300">Choose your favorite Wordle variation</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Regular Wordle */}
          <Link href="/games/wordle-solver" className="group">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/20 hover:scale-105 transition-all duration-300 cursor-pointer">
              <div className="text-center">
                <div className="text-6xl mb-4">📝</div>
                <h2 className="text-xl font-bold text-white mb-2">Wordle Solver</h2>
                <p className="text-gray-300 text-sm mb-4">
                  Classic Wordle with intelligent suggestions, pillar detection, and strategy modes
                </p>
                <div className="flex flex-wrap gap-2 justify-center">
                  <span className="px-2 py-1 bg-green-500/20 text-green-300 text-xs rounded-full border border-green-500/30">Smart Suggestions</span>
                  <span className="px-2 py-1 bg-blue-500/20 text-blue-300 text-xs rounded-full border border-blue-500/30">Strategy Modes</span>
                  <span className="px-2 py-1 bg-orange-500/20 text-orange-300 text-xs rounded-full border border-orange-500/30">Pillar Detection</span>
                </div>
              </div>
            </div>
          </Link>

          {/* Custom Letter Wordle */}
          <Link href="/games/wordle-custom" className="group">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/20 hover:scale-105 transition-all duration-300 cursor-pointer">
              <div className="text-center">
                <div className="text-6xl mb-4">🔤</div>
                <h2 className="text-xl font-bold text-white mb-2">Custom Wordle</h2>
                <p className="text-gray-300 text-sm mb-4">
                  Play Wordle with custom word lengths and difficulty settings
                </p>
                <div className="flex flex-wrap gap-2 justify-center">
                  <span className="px-2 py-1 bg-purple-500/20 text-purple-300 text-xs rounded-full border border-purple-500/30">Variable Length</span>
                  <span className="px-2 py-1 bg-pink-500/20 text-pink-300 text-xs rounded-full border border-pink-500/30">Custom Rules</span>
                </div>
              </div>
            </div>
          </Link>

          {/* Speed Wordle */}
          <Link href="/games/wordle-speed" className="group">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/20 hover:scale-105 transition-all duration-300 cursor-pointer">
              <div className="text-center">
                <div className="text-6xl mb-4">⚡</div>
                <h2 className="text-xl font-bold text-white mb-2">Speed Wordle</h2>
                <p className="text-gray-300 text-sm mb-4">
                  Race against the clock with timed rounds and streak tracking
                </p>
                <div className="flex flex-wrap gap-2 justify-center">
                  <span className="px-2 py-1 bg-yellow-500/20 text-yellow-300 text-xs rounded-full border border-yellow-500/30">Timed</span>
                  <span className="px-2 py-1 bg-red-500/20 text-red-300 text-xs rounded-full border border-red-500/30">Streaks</span>
                </div>
              </div>
            </div>
          </Link>

          {/* Wordle Battle */}
          <Link href="/games/wordle-battle" className="group">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/20 hover:scale-105 transition-all duration-300 cursor-pointer">
              <div className="text-center">
                <div className="text-6xl mb-4">⚔️</div>
                <h2 className="text-xl font-bold text-white mb-2">Wordle Battle</h2>
                <p className="text-gray-300 text-sm mb-4">
                  Compete against friends or AI in head-to-head Wordle matches
                </p>
                <div className="flex flex-wrap gap-2 justify-center">
                  <span className="px-2 py-1 bg-red-500/20 text-red-300 text-xs rounded-full border border-red-500/30">Multiplayer</span>
                  <span className="px-2 py-1 bg-indigo-500/20 text-indigo-300 text-xs rounded-full border border-indigo-500/30">VS Mode</span>
                </div>
              </div>
            </div>
          </Link>

          {/* Wordle Daily Challenge */}
          <Link href="/games/wordle-daily" className="group">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/20 hover:scale-105 transition-all duration-300 cursor-pointer">
              <div className="text-center">
                <div className="text-6xl mb-4">📅</div>
                <h2 className="text-xl font-bold text-white mb-2">Daily Challenge</h2>
                <p className="text-gray-300 text-sm mb-4">
                  New challenges every day with unique themes and special rules
                </p>
                <div className="flex flex-wrap gap-2 justify-center">
                  <span className="px-2 py-1 bg-cyan-500/20 text-cyan-300 text-xs rounded-full border border-cyan-500/30">Daily</span>
                  <span className="px-2 py-1 bg-teal-500/20 text-teal-300 text-xs rounded-full border border-teal-500/30">Themes</span>
                </div>
              </div>
            </div>
          </Link>

          {/* Wordle Practice */}
          <Link href="/games/wordle-practice" className="group">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/20 hover:scale-105 transition-all duration-300 cursor-pointer">
              <div className="text-center">
                <div className="text-6xl mb-4">🎯</div>
                <h2 className="text-xl font-bold text-white mb-2">Wordle Practice</h2>
                <p className="text-gray-300 text-sm mb-4">
                  Improve your skills with unlimited practice and detailed statistics
                </p>
                <div className="flex flex-wrap gap-2 justify-center">
                  <span className="px-2 py-1 bg-gray-500/20 text-gray-300 text-xs rounded-full border border-gray-500/30">Unlimited</span>
                  <span className="px-2 py-1 bg-amber-500/20 text-amber-300 text-xs rounded-full border border-amber-500/30">Stats</span>
                </div>
              </div>
            </div>
          </Link>
        </div>

        <div className="text-center mt-8">
          <Link href="/games" className="text-gray-400 hover:text-white transition-colors">
            ← Back to Game Hub
          </Link>
        </div>
      </div>
    </main>
  );
}
