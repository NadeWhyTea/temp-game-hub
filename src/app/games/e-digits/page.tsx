"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  createGame,
  validateDigit,
  getScore,
  getPersonalBestForMode,
  savePersonalBestForMode,
  getRevealedDigits,
  E_DIGITS,
  GameState,
  GameMode,
} from "@/lib/games/game-logic";

export default function EDigitsGame() {
  const [mode, setMode] = useState<GameMode>('main');
  const [gameState, setGameState] = useState<GameState>(() => createGame('main'));
  const [personalBest, setPersonalBest] = useState(0);
  const [practiceRevealed, setPracticeRevealed] = useState(0);
  const [showModeSelect, setShowModeSelect] = useState(true);

  useEffect(() => {
    setPersonalBest(getPersonalBestForMode(mode));
  }, [mode]);

  useEffect(() => {
    if (gameState.isGameOver && !gameState.isWon) {
      const score = getScore(gameState);
      savePersonalBestForMode(score, mode);
      setPersonalBest(getPersonalBestForMode(mode));
    }
  }, [gameState, mode]);

  const handleKeyPress = useCallback(
    (e: KeyboardEvent) => {
      if (gameState.isGameOver || showModeSelect) return;

      if (e.key >= "0" && e.key <= "9") {
        setGameState((prev) => validateDigit(prev, e.key));
      }
    },
    [gameState.isGameOver, showModeSelect]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [handleKeyPress]);

  const startGame = (selectedMode: GameMode) => {
    setMode(selectedMode);
    setGameState(createGame(selectedMode, selectedMode === 'practice' ? practiceRevealed : 0));
    setShowModeSelect(false);
  };

  const resetGame = () => {
    setShowModeSelect(true);
    setGameState(createGame('main'));
    setPracticeRevealed(0);
  };

  const score = getScore(gameState);
  const revealedDigits = getRevealedDigits(gameState.practiceRevealedCount);
  const enteredDigits = E_DIGITS.slice(0, gameState.currentIndex);

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex flex-col items-center p-4">
      <div className="w-full max-w-2xl">
        <div className="flex items-center justify-between mb-8">
          <Link
            href="/"
            className="text-white/70 hover:text-white transition-colors"
          >
            ← Back to Hub
          </Link>
          <h1 className="text-2xl font-bold text-white">e-Digits Memory</h1>
          <div className="w-20" />
        </div>

        {showModeSelect ? (
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
            <h2 className="text-3xl font-bold text-white text-center mb-8">Choose Mode</h2>
            
            <div className="grid gap-4">
              <button
                onClick={() => startGame('main')}
                className="p-6 bg-purple-600 hover:bg-purple-500 rounded-xl transition-colors text-left"
              >
                <h3 className="text-xl font-bold text-white mb-2">Main Mode</h3>
                <p className="text-purple-100">Pure memory test. No hints, no help. Test how many digits you truly know.</p>
              </button>

              <div className="p-6 bg-white/10 rounded-xl">
                <h3 className="text-xl font-bold text-white mb-2">Practice Mode</h3>
                <p className="text-gray-300 mb-4">Learn with revealed digits. Choose how many digits to see ahead of time.</p>
                
                <div className="mb-4">
                  <label className="text-sm text-gray-400 mb-2 block">
                    Reveal {practiceRevealed} digits
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={practiceRevealed}
                    onChange={(e) => setPracticeRevealed(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-purple-500"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>0</span>
                    <span>50</span>
                    <span>100</span>
                  </div>
                </div>

                {practiceRevealed > 0 && (
                  <div className="mb-4 p-3 bg-black/30 rounded-lg font-mono text-sm text-gray-400 break-all">
                    <span className="text-purple-300">2.</span>
                    <span className="text-white">{revealedDigits.slice(0, practiceRevealed)}</span>
                  </div>
                )}

                <button
                  onClick={() => startGame('practice')}
                  className="w-full py-3 bg-green-600 hover:bg-green-500 text-white font-semibold rounded-lg transition-colors"
                >
                  Start Practice
                </button>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="text-center mb-4">
              <span className="inline-block px-3 py-1 bg-white/10 rounded-full text-sm text-gray-300">
                {mode === 'main' ? 'Main Mode' : 'Practice Mode'}
                {mode === 'practice' && gameState.practiceRevealedCount > 0 && 
                  ` • ${gameState.practiceRevealedCount} digits revealed`
                }
              </span>
            </div>

            <div className="text-center mb-8">
              <p className="text-gray-300 mb-2">
                Type the digits of e (Euler's number) one at a time.
              </p>
              <p className="text-sm text-gray-400">
                Starts with <span className="font-mono text-purple-300">2.</span> — you begin with the first digit after the decimal.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-6 border border-white/20">
              <div className="text-center">
                <div className="mb-6">
                  <span className="text-lg text-gray-400">Current Score</span>
                  <div className="text-5xl font-bold text-white mt-2">{score}</div>
                </div>

                {personalBest > 0 && (
                  <div className="mb-6">
                    <span className="text-sm text-purple-300">
                      Personal Best ({mode === 'main' ? 'Main' : 'Practice'}): {personalBest}
                    </span>
                  </div>
                )}

                <div className="font-mono text-xl sm:text-2xl tracking-wider text-white break-all leading-relaxed">
                  <span className="text-purple-300">2.</span>
                  {mode === 'practice' && revealedDigits.length > 0 && (
                    <span className="text-gray-500">{revealedDigits}</span>
                  )}
                  {enteredDigits.length > 0 && (
                    <span className="text-green-400">{enteredDigits}</span>
                  )}
                  <span className="animate-pulse">|</span>
                </div>

                {mode === 'practice' && gameState.currentIndex >= gameState.practiceRevealedCount && (
                  <p className="text-sm text-yellow-400 mt-4">
                    You've entered all revealed digits. Continue from memory!
                  </p>
                )}
              </div>
            </div>

            {gameState.isGameOver && (
              <div className="bg-red-500/20 border border-red-500/50 rounded-xl p-6 text-center mb-6">
                {gameState.isWon ? (
                  <>
                    <h2 className="text-2xl font-bold text-green-400 mb-2">
                      Incredible! You won!
                    </h2>
                    <p className="text-gray-300">
                      You memorized all 1000 digits of e!
                    </p>
                  </>
                ) : (
                  <>
                    <h2 className="text-2xl font-bold text-red-400 mb-2">
                      Game Over!
                    </h2>
                    <p className="text-gray-300 mb-2">
                      You entered{" "}
                      <span className="font-mono text-red-300 text-xl">
                        {gameState.wrongDigit}
                      </span>{" "}
                      but should have entered{" "}
                      <span className="font-mono text-green-300 text-xl">
                        {E_DIGITS[gameState.currentIndex]}
                      </span>
                    </p>
                    <p className="text-sm text-gray-400">
                      Score: {score} digit{score !== 1 ? "s" : ""} of e memorized
                    </p>
                  </>
                )}
              </div>
            )}

            <div className="flex gap-4 justify-center">
              <button
                onClick={resetGame}
                className="px-6 py-3 bg-purple-600 hover:bg-purple-500 text-white font-semibold rounded-lg transition-colors"
              >
                {gameState.isGameOver ? "Play Again" : "Change Mode"}
              </button>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
