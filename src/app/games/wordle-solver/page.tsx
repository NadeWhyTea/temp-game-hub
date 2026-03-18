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
  WORDLE_WORDS,
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
    possibleWords: [...WORDLE_WORDS],
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
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex flex-col items-center p-4">
      <div className="w-full max-w-2xl">
        <div className="flex items-center justify-between mb-8">
          <Link
            href="/home"
            className="text-white/70 hover:text-white transition-colors"
          >
            ← Back to Hub
          </Link>
          <h1 className="text-2xl font-bold text-white">Wordle Solver</h1>
          <div className="w-20" />
        </div>

        <div className="text-center mb-6">
          <p className="text-gray-300 mb-2">
            Guess the 5-letter word in 6 tries or less.
          </p>
          <p className="text-sm text-gray-400 mb-4">
            Green = correct position, Yellow = wrong position, Gray = not in word
          </p>
          
          <div className="flex items-center justify-center gap-4 mb-4">
            <span className="text-sm text-gray-400">
              Mode: {gameState.useTodayWord ? "Today&apos;s Wordle" : "Random Word"}
            </span>
            <button
              onClick={toggleTodayWord}
              className="px-3 py-1 bg-blue-600 hover:bg-blue-500 text-white text-sm rounded-lg transition-colors"
            >
              Switch to {gameState.useTodayWord ? "Random" : "Today&apos;s"}
            </button>
          </div>
          
          {gameState.isLoading && (
            <div className="text-yellow-400 text-sm">
              Loading today&apos;s Wordle word...
            </div>
          )}
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-6 border border-white/20">
          <div className="grid grid-rows-6 gap-2 mb-6">
            {Array.from({ length: 6 }).map((_, rowIndex) => (
              <div key={rowIndex} className="grid grid-cols-5 gap-2">
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
                      className={`aspect-square flex items-center justify-center text-2xl font-bold rounded-lg border-2 ${getLetterColor(
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

          {gameState.isGameOver && (
            <div className="text-center mb-4">
              {gameState.isWon ? (
                <div className="text-green-400 text-xl font-bold mb-2">
                  🎉 Congratulations! You solved it!
                </div>
              ) : (
                <div className="text-red-400 text-xl font-bold mb-2">
                  Game Over! The word was: {gameState.targetWord}
                </div>
              )}
              <div className="text-sm text-gray-400">
                Possible words remaining: {gameState.possibleWords.length}
              </div>
            </div>
          )}

          {!gameState.isGameOver && (
            <div className="text-center mb-4">
              <div className="text-sm text-gray-400">
                Possible words: {gameState.possibleWords.length}
              </div>
              {gameState.possibleWords.length <= 10 && (
                <div className="mt-2 text-xs text-gray-500">
                  {gameState.possibleWords.slice(0, 20).join(", ")}
                </div>
              )}
            </div>
          )}
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 mb-6 border border-white/20">
          {KEYBOARD_ROWS.map((row, rowIndex) => (
            <div key={rowIndex} className="flex justify-center gap-1 mb-1">
              {row.map((key) => (
                <button
                  key={key}
                  onClick={() => handleVirtualKey(key)}
                  className={`px-2 py-3 rounded font-semibold text-sm transition-colors ${getKeyboardKeyColor(
                    key
                  )} ${
                    key === "ENTER" || key === "BACK"
                      ? "px-3 text-xs"
                      : "px-4"
                  }`}
                >
                  {key === "BACK" ? "⌫" : key}
                </button>
              ))}
            </div>
          ))}
        </div>

        <div className="flex gap-4 justify-center">
          <button
            onClick={resetGame}
            className="px-6 py-3 bg-purple-600 hover:bg-purple-500 text-white font-semibold rounded-lg transition-colors"
            disabled={gameState.isLoading}
          >
            {gameState.isLoading ? "Loading..." : "New Game"}
          </button>
          <button
            onClick={() => setShowTarget(!showTarget)}
            className="px-6 py-3 bg-gray-600 hover:bg-gray-500 text-white font-semibold rounded-lg transition-colors"
            disabled={gameState.isLoading}
          >
            {showTarget ? "Hide" : "Show"} Answer
          </button>
        </div>

        {showTarget && (
          <div className="mt-4 text-center">
            <div className="text-yellow-400 text-lg font-bold">
              Answer: {gameState.targetWord}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
