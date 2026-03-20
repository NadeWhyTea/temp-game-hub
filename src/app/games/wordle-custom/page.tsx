"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";

export type LetterState = 'correct' | 'present' | 'absent' | 'empty';

export interface Guess {
  word: string;
  states: LetterState[];
}

export interface CustomWordleState {
  targetWord: string;
  guesses: Guess[];
  currentGuess: string;
  isGameOver: boolean;
  isWon: boolean;
  wordLength: number;
  maxGuesses: number;
}

const KEYBOARD_ROWS = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'BACK']
];

const WORD_LENGTHS = [4, 5, 6, 7, 8];
const GUESS_COUNTS = [4, 5, 6, 8, 10];

// Sample word lists for different lengths
const SAMPLE_WORDS: Record<number, string[]> = {
  4: ['WORD', 'GAME', 'PLAY', 'TIME', 'CODE', 'LOVE', 'LIFE', 'WORK', 'HOME', 'BOOK', 'TREE'],
  5: ['ABOUT', 'AFTER', 'AGAIN', 'BELOW', 'COULD', 'EVERY', 'FIRST', 'FOUND', 'GREAT', 'HOUSE'],
  6: ['BECAUSE', 'BETWEEN', 'DURING', 'ENOUGH', 'FRIEND', 'HAPPEN', 'LITTLE', 'MOTHER', 'NUMBER', 'PEOPLE'],
  7: ['ACCOUNT', 'AGAINST', 'BELIEVE', 'BETWEEN', 'CERTAIN', 'CHANGE', 'CHOOSE', 'COUNTRY', 'DECIDED', 'DIFFERENT'],
  8: ['ACCOMPLISH', 'ADDITION', 'ALGORITHM', 'BECAUSE', 'COMMITTEE', 'DEMOCRATIC', 'EDUCATION', 'ENVIRONMENT', 'FANTASTIC', 'GOVERNMENT']
};

export default function CustomWordle() {
  const [gameState, setGameState] = useState<CustomWordleState>({
    targetWord: '',
    guesses: [],
    currentGuess: '',
    isGameOver: false,
    isWon: false,
    wordLength: 5,
    maxGuesses: 6
  });

  const [wordLength, setWordLength] = useState(5);
  const [maxGuesses, setMaxGuesses] = useState(6);
  const [gameStarted, setGameStarted] = useState(false);

  const initializeGame = useCallback(() => {
    const words = SAMPLE_WORDS[wordLength] || SAMPLE_WORDS[5];
    const targetWord = words[Math.floor(Math.random() * words.length)];
    
    setGameState({
      targetWord,
      guesses: [],
      currentGuess: '',
      isGameOver: false,
      isWon: false,
      wordLength,
      maxGuesses
    });
    setGameStarted(true);
  }, [wordLength, maxGuesses]);

  const evaluateGuess = useCallback((guess: string, target: string): LetterState[] => {
    const result: LetterState[] = new Array(target.length).fill('empty');
    const targetLetters: (string | null)[] = target.split('');
    const guessLetters = guess.split('');

    // Mark correct letters first
    guessLetters.forEach((letter, index) => {
      if (targetLetters[index] === letter) {
        result[index] = 'correct';
        targetLetters[index] = null;
      }
    });

    // Mark present letters
    guessLetters.forEach((letter) => {
      if (targetLetters.includes(letter as string)) {
        result[index] = 'present';
        const targetIndex = targetLetters.indexOf(letter);
        if (targetIndex !== -1) {
          targetLetters[targetIndex] = null;
        }
      }
    });

    // Mark absent letters
    return result.map((state, index) => 
      state === 'empty' ? 'absent' : state
    );
  }, []);

  const submitGuess = useCallback(() => {
    if (gameState.currentGuess.length !== gameState.wordLength || gameState.isGameOver) {
      return;
    }

    const states = evaluateGuess(gameState.currentGuess, gameState.targetWord);
    const newGuess: Guess = { word: gameState.currentGuess, states };
    const newGuesses = [...gameState.guesses, newGuess];

    const isWon = gameState.currentGuess === gameState.targetWord;
    const isGameOver = isWon || newGuesses.length >= gameState.maxGuesses;

    setGameState({
      ...gameState,
      guesses: newGuesses,
      currentGuess: '',
      isGameOver,
      isWon
    });
  }, [gameState, evaluateGuess]);

  const addLetter = useCallback((letter: string) => {
    if (gameState.currentGuess.length < gameState.wordLength && !gameState.isGameOver) {
      setGameState({ ...gameState, currentGuess: gameState.currentGuess + letter });
    }
  }, [gameState]);

  const removeLetter = useCallback(() => {
    if (gameState.currentGuess.length > 0) {
      setGameState({ ...gameState, currentGuess: gameState.currentGuess.slice(0, -1) });
    }
  }, [gameState]);

  const getLetterColor = useCallback((state: LetterState): string => {
    switch (state) {
      case 'correct':
        return 'bg-green-500 text-white border-green-600';
      case 'present':
        return 'bg-yellow-500 text-white border-yellow-600';
      case 'absent':
        return 'bg-gray-500 text-white border-gray-600';
      default:
        return 'bg-gray-700 text-gray-300 border-gray-600';
    }
  }, []);

  const getKeyboardKeyColor = useCallback((key: string): string => {
    const keyUpper = key.toUpperCase();
    
    for (const guess of gameState.guesses) {
      const index = guess.word.toUpperCase().indexOf(keyUpper);
      if (index !== -1) {
        return getLetterColor(guess.states[index]);
      }
    }
    
    return 'bg-gray-600 text-white hover:bg-gray-500';
  }, [gameState.guesses, getLetterColor]);

  const handleKeyPress = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      submitGuess();
    } else if (e.key === 'Backspace') {
      removeLetter();
    } else if (/^[a-zA-Z]$/.test(e.key)) {
      addLetter(e.key.toUpperCase());
    }
  }, [submitGuess, removeLetter, addLetter]);

  const handleVirtualKey = useCallback((key: string) => {
    if (key === 'ENTER') {
      submitGuess();
    } else if (key === 'BACK') {
      removeLetter();
    } else {
      addLetter(key);
    }
  }, [submitGuess, removeLetter, addLetter]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  if (!gameStarted) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex flex-col items-center justify-center p-4">
        <div className="max-w-2xl w-full">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">Custom Wordle</h1>
            <p className="text-gray-300">Choose your game settings</p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <div className="space-y-6">
              <div>
                <label className="block text-white font-medium mb-2">Word Length</label>
                <div className="grid grid-cols-5 gap-2">
                  {WORD_LENGTHS.map(length => (
                    <button
                      key={length}
                      onClick={() => setWordLength(length)}
                      className={`px-4 py-2 rounded-lg font-medium transition-all ${
                        wordLength === length
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-600 text-gray-300 hover:bg-gray-500'
                      }`}
                    >
                      {length}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-white font-medium mb-2">Max Guesses</label>
                <div className="grid grid-cols-5 gap-2">
                  {GUESS_COUNTS.map(count => (
                    <button
                      key={count}
                      onClick={() => setMaxGuesses(count)}
                      className={`px-4 py-2 rounded-lg font-medium transition-all ${
                        maxGuesses === count
                          ? 'bg-green-500 text-white'
                          : 'bg-gray-600 text-gray-300 hover:bg-gray-500'
                      }`}
                    >
                      {count}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={initializeGame}
                className="w-full py-3 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-lg transition-colors"
              >
                Start Game
              </button>
            </div>
          </div>

          <div className="text-center mt-6">
            <Link href="/games/wordle" className="text-gray-400 hover:text-white transition-colors">
              ← Back to Wordle Games
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex flex-col items-center p-4">
      <div className="max-w-2xl w-full">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-white mb-2">Custom Wordle</h1>
          <p className="text-gray-300 text-sm">
            {gameState.wordLength} letters • {gameState.maxGuesses} guesses
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 mb-4 border border-white/20">
          <div className="grid gap-2 mb-4 justify-center">
            {Array.from({ length: gameState.maxGuesses }).map((_, rowIndex) => (
              <div key={rowIndex} className="flex gap-2 justify-center">
                {Array.from({ length: gameState.wordLength }).map((_, colIndex) => (
                  <div
                    key={colIndex}
                    className={`w-10 h-10 flex items-center justify-center text-lg font-bold rounded border ${
                      gameState.guesses[rowIndex]?.states[colIndex]
                        ? getLetterColor(gameState.guesses[rowIndex].states[colIndex])
                        : 'bg-gray-700 text-gray-300 border-gray-600'
                    }`}
                  >
                    {gameState.guesses[rowIndex]?.word[colIndex] || ''}
                  </div>
                ))}
              </div>
            ))}
          </div>

          <div className="flex gap-2 justify-center mb-4">
            {Array.from({ length: gameState.wordLength }).map((_, index) => (
              <div
                key={index}
                className="w-10 h-10 flex items-center justify-center text-lg font-bold rounded border bg-gray-700 text-gray-300 border-gray-600"
              >
                {gameState.currentGuess[index] || ''}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/20">
          {KEYBOARD_ROWS.map((row, rowIndex) => (
            <div key={rowIndex} className="flex justify-center gap-1.5 mb-1.5">
              {row.map((key) => (
                <button
                  key={key}
                  onClick={() => handleVirtualKey(key)}
                  className={`${
                    key === 'ENTER' || key === 'BACK'
                      ? 'px-3 py-3 text-sm'
                      : 'w-8 h-8'
                  } font-medium rounded transition-colors ${getKeyboardKeyColor(key)}`}
                >
                  {key}
                </button>
              ))}
            </div>
          ))}
        </div>

        {gameState.isGameOver && (
          <div className="text-center mt-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 mb-4">
              <h2 className={`text-2xl font-bold mb-2 ${
                gameState.isWon ? 'text-green-400' : 'text-red-400'
              }`}>
                {gameState.isWon ? '🎉 Congratulations!' : '😔 Game Over'}
              </h2>
              <p className="text-white mb-4">
                The word was: <span className="font-bold">{gameState.targetWord}</span>
              </p>
              <button
                onClick={initializeGame}
                className="px-6 py-2 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-lg transition-colors mr-2"
              >
                Play Again
              </button>
              <Link
                href="/games/wordle"
                className="px-6 py-2 bg-gray-600 hover:bg-gray-500 text-white font-bold rounded-lg transition-colors"
              >
                Change Settings
              </Link>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
