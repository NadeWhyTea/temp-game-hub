"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  createWordleGame,
  submitGuess,
  addLetter,
  removeLetter,
  getKeyboardState,
  WordleState,
  LetterState,
} from "@/lib/games/wordle-solver";

const KEYBOARD_ROWS = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "BACK"],
];

export default function WordleSolver() {
  const [gameState, setGameState] = useState<WordleState>({
    targetWord: '',
    guesses: [],
    currentGuess: '',
    isGameOver: false,
    isWon: false,
    possibleWords: [],
    allWords: [],
    isLoading: true,
    useTodayWord: true,
  });
  const [showTarget, setShowTarget] = useState(false);

  const initializeGame = async (useTodayWord: boolean) => {
    const newState = await createWordleGame(useTodayWord);
    setGameState(newState);
  };

  // Initialize game on mount
  useEffect(() => {
    const initGame = async () => {
      await initializeGame(true);
    };
    initGame();
  }, []);

  const keyboardState = getKeyboardState(gameState.guesses);

  const handleKeyPress = useCallback(
    (e: KeyboardEvent) => {
      if (gameState.isGameOver) return;

      if (e.key === "Enter") {
        if (gameState.currentGuess.length === 5) {
          setGameState((prev) => submitGuess(prev, prev.currentGuess));
        }
      } else if (e.key === "Backspace") {
        setGameState((prev) => removeLetter(prev));
      } else if (/^[a-zA-Z]$/.test(e.key)) {
        setGameState((prev) => addLetter(prev, e.key.toUpperCase()));
      }
    },
    [gameState.isGameOver, gameState.currentGuess.length]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [handleKeyPress]);

  const resetGame = () => {
    initializeGame(gameState.useTodayWord);
    setShowTarget(false);
  };

  const toggleTodayWord = () => {
    initializeGame(!gameState.useTodayWord);
    setShowTarget(false);
  };

  const getLetterColor = (state: LetterState): string => {
    switch (state) {
      case "correct":
        return "bg-green-500 text-white";
      case "present":
        return "bg-yellow-500 text-white";
      case "absent":
        return "bg-gray-500 text-white";
      default:
        return "bg-gray-700 text-gray-300";
    }
  };

  const getKeyboardKeyColor = (letter: string): string => {
    const state = keyboardState.get(letter);
    if (state === "correct") return "bg-green-500 text-white";
    if (state === "present") return "bg-yellow-500 text-white";
    if (state === "absent") return "bg-gray-500 text-white";
    return "bg-gray-600 text-gray-200 hover:bg-gray-500";
  };

  // Calculate letter frequency from possible words
  const getLetterFrequency = () => {
    const frequency: Record<string, number> = {};
    gameState.possibleWords.forEach(word => {
      for (let i = 0; i < 5; i++) {
        const letter = word[i];
        frequency[letter] = (frequency[letter] || 0) + 1;
      }
    });
    return frequency;
  };

  const getTopLetters = () => {
    const frequency = getLetterFrequency();
    return Object.entries(frequency)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 10)
      .map(([letter, count]) => ({ letter, count, percentage: (count / gameState.possibleWords.length * 100).toFixed(1) }));
  };

  const handleVirtualKey = (key: string) => {
    if (gameState.isGameOver) return;

    if (key === "ENTER") {
      if (gameState.currentGuess.length === 5) {
        setGameState((prev) => submitGuess(prev, prev.currentGuess));
      }
    } else if (key === "BACK") {
      setGameState((prev) => removeLetter(prev));
    } else {
      setGameState((prev) => addLetter(prev, key));
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex flex-col items-center p-2">
      <div className="w-full max-w-4xl">
        <div className="flex items-center justify-between mb-4">
          <Link
            href="/home"
            className="text-white/70 hover:text-white transition-colors text-sm"
          >
            ← Back to Hub
          </Link>
          <h1 className="text-xl font-bold text-white">Wordle Solver</h1>
          <div className="w-16" />
        </div>

        <div className="text-center mb-4">
          <div className="flex items-center justify-center gap-3 mb-2">
            <span className="text-xs text-gray-400">
              Mode: {gameState.useTodayWord ? "Daily Wordle" : "Free Play"}
            </span>
            <button
              onClick={toggleTodayWord}
              className="px-2 py-1 bg-blue-600 hover:bg-blue-500 text-white text-xs rounded transition-colors"
            >
              Switch to {gameState.useTodayWord ? "Free Play" : "Daily Wordle"}
            </button>
          </div>
          
          {gameState.isLoading && (
            <div className="text-yellow-400 text-xs mb-2">
              Loading today's Wordle word...
            </div>
          )}
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 mb-4 border border-white/20">
          <div className="grid grid-rows-6 gap-1.5 mb-4 w-fit mx-auto">
            {Array.from({ length: 6 }).map((_, rowIndex) => (
              <div key={rowIndex} className="grid grid-cols-5 gap-1.5">
                {Array.from({ length: 5 }).map((_, colIndex) => {
                  const guess = gameState.guesses[rowIndex];
                  const letter = guess
                    ? guess.word[colIndex]
                    : rowIndex === gameState.guesses.length
                    ? gameState.currentGuess[colIndex] || ""
                    : "";
                  const state = guess
                    ? guess.states[colIndex]
                    : "empty";

                  return (
                    <div
                      key={colIndex}
                      className={`w-14 h-14 flex items-center justify-center text-xl font-bold rounded border ${getLetterColor(
                        state
                      )} ${
                        state === "empty"
                          ? "border-gray-600"
                          : "border-transparent"
                      }`}
                    >
                      {letter}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>

          {(gameState.isGameOver || gameState.possibleWords.length <= 10) && (
            <div className="text-center mb-3">
              {gameState.isWon ? (
                <div className="text-green-400 text-sm font-bold mb-1">
                  🎉 Solved in {gameState.guesses.length} tries!
                </div>
              ) : gameState.isGameOver ? (
                <div className="text-red-400 text-sm font-bold mb-1">
                  Game Over! Word: {gameState.targetWord}
                </div>
              ) : null}
              <div className="text-xs text-gray-400">
                Possible words: {gameState.possibleWords.length}
              </div>
              {gameState.possibleWords.length <= 10 && (
                <div className="mt-1 text-xs text-gray-500 max-h-8 overflow-y-auto">
                  {gameState.possibleWords.join(", ")}
                </div>
              )}
            </div>
          )}
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 mb-4 border border-white/20">
          <div className="text-center mb-2">
            <h3 className="text-sm font-semibold text-white mb-2">Statistics</h3>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-black/20 rounded p-2">
                <div className="text-gray-400">Possible Words</div>
                <div className="text-white font-bold">{gameState.possibleWords.length}</div>
              </div>
              <div className="bg-black/20 rounded p-2">
                <div className="text-gray-400">Guesses Used</div>
                <div className="text-white font-bold">{gameState.guesses.length}/6</div>
              </div>
            </div>
            
            {gameState.possibleWords.length > 0 && (
              <div className="mt-2">
                <div className="text-xs text-gray-400 mb-1">Top Letters in Possible Words:</div>
                <div className="flex flex-wrap gap-1 justify-center">
                  {getTopLetters().map(({ letter, percentage }) => (
                    <div key={letter} className="bg-purple-600/30 text-purple-200 text-xs px-1 py-0.5 rounded">
                      {letter} ({percentage}%)
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 mb-4 border border-white/20">
          {KEYBOARD_ROWS.map((row, rowIndex) => (
            <div key={rowIndex} className="flex justify-center gap-1 mb-1">
              {row.map((key) => (
                <button
                  key={key}
                  onClick={() => handleVirtualKey(key)}
                  className={`px-1 py-2 rounded font-semibold text-xs transition-colors ${getKeyboardKeyColor(
                    key
                  )} ${
                    key === "ENTER" || key === "BACK"
                      ? "px-2 text-xs"
                      : "px-2"
                  }`}
                >
                  {key === "BACK" ? "⌫" : key}
                </button>
              ))}
            </div>
          ))}
        </div>

        <div className="flex gap-2 justify-center">
          <button
            onClick={resetGame}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white text-sm font-semibold rounded transition-colors"
            disabled={gameState.isLoading}
          >
            {gameState.isLoading ? "Loading..." : "New Game"}
          </button>
          <button
            onClick={() => setShowTarget(!showTarget)}
            className="px-4 py-2 bg-gray-600 hover:bg-gray-500 text-white text-sm font-semibold rounded transition-colors"
            disabled={gameState.isLoading}
          >
            {showTarget ? "Hide" : "Show"} Answer
          </button>
        </div>

        {showTarget && (
          <div className="mt-3 text-center">
            <div className="text-yellow-400 text-sm font-bold">
              Answer: {gameState.targetWord}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}