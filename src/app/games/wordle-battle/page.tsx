"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const defaultWords = ['ABOUT', 'CRANE', 'STARE', 'LIGHT', 'MONEY'];

type Difficulty = 'easy' | 'medium' | 'hard';

export default function WordleBattle() {
  const [words, setWords] = useState<string[]>([]);
  const [difficulty, setDifficulty] = useState<Difficulty>('medium');
  const [gameStarted, setGameStarted] = useState(false);
  const [targetWord, setTargetWord] = useState('');
  const router = useRouter();

  useEffect(() => {
    // Load words from /words.json
    const loadWords = async () => {
      try {
        const response = await fetch("/words.json");
        const data = await response.json();
        const fiveLetterWords = data.words
          .map((word: string) => word.toUpperCase())
          .filter((word: string) => word.length === 5);
        setWords(fiveLetterWords);
      } catch (error) {
        console.error("Error loading words:", error);
        setWords(defaultWords);
      }
    };
    loadWords();
  }, []);

  const startGame = () => {
    if (words.length === 0) return;
    const randomIndex = Math.floor(Math.random() * words.length);
    setTargetWord(words[randomIndex]);
    setGameStarted(true);
  };

  if (!gameStarted) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex flex-col items-center justify-center p-4">
        <div className="max-w-4xl w-full">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">Wordle Battle</h1>
            <p className="text-gray-300">Choose difficulty to start playing against AI</p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
            <div className="text-center">
              <div className="text-6xl mb-6">⚔️</div>
              <h2 className="text-2xl font-bold text-white mb-6">Select Difficulty</h2>
              
              <div className="flex flex-col gap-4 mb-8">
                <button
                  onClick={() => setDifficulty('easy')}
                  className={`px-8 py-4 rounded-lg font-bold transition-all ${
                    difficulty === 'easy'
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  Easy
                </button>
                <button
                  onClick={() => setDifficulty('medium')}
                  className={`px-8 py-4 rounded-lg font-bold transition-all ${
                    difficulty === 'medium'
                      ? 'bg-yellow-600 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  Medium
                </button>
                <button
                  onClick={() => setDifficulty('hard')}
                  className={`px-8 py-4 rounded-lg font-bold transition-all ${
                    difficulty === 'hard'
                      ? 'bg-red-600 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  Hard
                </button>
              </div>

              <div className="mb-4">
                <p className="text-sm text-gray-400 mb-2">Selected Difficulty:</p>
                <p className="text-lg font-bold text-white capitalize">{difficulty}</p>
              </div>

              <button
                onClick={startGame}
                disabled={words.length === 0}
                className="bg-blue-600 hover:bg-blue-500 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-bold py-3 px-8 rounded-lg transition-colors"
              >
                Start Game
              </button>
            </div>
          </div>

          <div className="text-center mt-8">
            <Link
              href="/games/wordle"
              className="text-gray-400 hover:text-white transition-colors"
            >
              ← Back to Wordle Games
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex flex-col items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Wordle Battle</h1>
          <p className="text-gray-300">Difficulty: <span className="capitalize font-bold">{difficulty}</span></p>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
          <div className="text-center">
            <div className="text-6xl mb-6">⚔️</div>
            <h2 className="text-2xl font-bold text-white mb-4">Game Screen</h2>
            <p className="text-gray-300 mb-6">Target word: <span className="font-bold text-green-400">{targetWord}</span></p>
            <p className="text-gray-400 text-sm">Game implementation coming soon...</p>
            
            <div className="mt-8">
              <Link
                href="/games/wordle"
                className="inline-block bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-6 rounded-lg transition-colors"
              >
                Back to Wordle Games
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
