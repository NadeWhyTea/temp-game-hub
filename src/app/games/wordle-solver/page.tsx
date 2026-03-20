"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import Link from "next/link";

export type LetterState = 'correct' | 'present' | 'absent' | 'empty';

export interface Guess {
  word: string;
  states: LetterState[];
  strength?: number;
}

export interface WordleState {
  targetWord: string;
  guesses: Guess[];
  currentGuess: string;
  isGameOver: boolean;
  isWon: boolean;
  possibleWords: string[];
  allWords: string[];
  isLoading: boolean;
  gameMode: 'free-play';
  strategyMode: 'conservative' | 'aggressive';
  gameStats: {
    guessesUsed: number;
    timeTaken: number;
    strategyUsed: 'conservative' | 'aggressive';
  } | null;
}

const FALLBACK_WORDS = [
  'ABOUT', 'ABOVE', 'ABUSE', 'ACTOR', 'ACUTE', 'ADMIT', 'ADULT', 'AFTER', 'AGAIN', 'AGENT',
  'AGREE', 'AHEAD', 'ALARM', 'ALERT', 'ALIEN', 'ALIGN', 'ALIVE', 'ALLOW', 'ALONE', 'ALONG',
  'ALTER', 'ANGEL', 'ANGER', 'ANGLE', 'APART', 'APPLE', 'APPLY', 'ARISE', 'ASIDE', 'ASSET',
  'AVOID', 'AWAKE', 'AWARE', 'BEACH', 'BEGIN', 'BEING', 'BELOW', 'BENCH', 'BLACK', 'BLAME',
  'BLIND', 'BLOCK', 'BLOOD', 'BOARD', 'BRAIN', 'BRAND', 'BRAVE', 'BREAD', 'BREAK', 'BRIEF',
  'BRING', 'BROAD', 'BROKE', 'BROWN', 'BUILD', 'BUILT', 'CATCH', 'CAUSE', 'CHAIN', 'CHAIR',
  'CHAOS', 'CHARM', 'CHART', 'CHASE', 'CHEAP', 'CHECK', 'CHEST', 'CHILD', 'CHOSE', 'CIVIL',
  'CLAIM', 'CLASS', 'CLEAN', 'CLEAR', 'CLIMB', 'CLOCK', 'CLOSE', 'CLOUD', 'COACH', 'COAST',
  'COUNT', 'COURT', 'COVER', 'CRASH', 'CRAZY', 'CREAM', 'CRIME', 'CROSS', 'CROWD', 'CROWN',
  'CURVE', 'CYCLE', 'DANCE', 'DEATH', 'DOUBT', 'DRAFT', 'DRAMA', 'DREAM', 'DRINK', 'DRIVE',
];

async function fetchWordList(): Promise<string[]> {
  try {
    const res = await fetch('/words.json');
    if (!res.ok) throw new Error('Failed to load words.json');
    const data = await res.json();
    const list: string[] = Array.isArray(data) ? data : (data.words ?? data.answers ?? []);
    return list.map((w: string) => w.toUpperCase()).filter((w: string) => w.length === 5);
  } catch (e) {
    console.warn('Could not load /public/words.json, using fallback word list.', e);
    return FALLBACK_WORDS;
  }
}

export async function createWordleGame(
  strategyMode: 'conservative' | 'aggressive' = 'conservative'
): Promise<WordleState> {
  const allWords = await fetchWordList();
  const targetWord = allWords[Math.floor(Math.random() * allWords.length)];

  return {
    targetWord,
    guesses: [],
    currentGuess: '',
    isGameOver: false,
    isWon: false,
    possibleWords: [...allWords],
    allWords,
    isLoading: false,
    gameMode: 'free-play',
    strategyMode,
    gameStats: null,
  };
}

export function evaluateGuess(guess: string, targetWord: string): LetterState[] {
  const states: LetterState[] = ['empty', 'empty', 'empty', 'empty', 'empty'];
  const targetLetters = targetWord.split('');
  const guessLetters = guess.split('');

  for (let i = 0; i < 5; i++) {
    if (guessLetters[i] === targetLetters[i]) {
      states[i] = 'correct';
      targetLetters[i] = '_';
      guessLetters[i] = '_';
    }
  }
  for (let i = 0; i < 5; i++) {
    if (guessLetters[i] !== '_' && targetLetters.includes(guessLetters[i])) {
      states[i] = 'present';
      const index = targetLetters.indexOf(guessLetters[i]);
      if (index !== -1) {
        targetLetters[index] = '_';
      }
    }
  }
  for (let i = 0; i < 5; i++) {
    if (guessLetters[i] !== '_' && states[i] === 'empty') {
      states[i] = 'absent';
    }
  }

  return states;
}

export function filterPossibleWords(
  possibleWords: string[],
  guesses: Guess[]
): string[] {
  return possibleWords.filter(word => {
    for (const guess of guesses) {
      for (let i = 0; i < 5; i++) {
        const guessLetter = guess.word[i];
        const wordLetter = word[i];
        const state = guess.states[i];

        if (state === 'correct' && wordLetter !== guessLetter) return false;
        if (state === 'absent' && word.includes(guessLetter)) {
          const hasPresent = guess.states.some(
            (s, j) => s === 'present' && guess.word[j] === guessLetter
          );
          if (!hasPresent) return false;
        }
        if (state === 'present' && !word.includes(guessLetter)) return false;
        if (state === 'present' && wordLetter === guessLetter) return false;
      }
    }
    return true;
  });
}

export function submitGuess(state: WordleState, guess: string, strength?: number): WordleState {
  if (state.isGameOver || guess.length !== 5 || !state.allWords.includes(guess)) {
    return state;
  }

  const states = evaluateGuess(guess, state.targetWord);
  const newGuess: Guess = { word: guess, states, strength };
  const newGuesses = [...state.guesses, newGuess];

  const isWon = guess === state.targetWord;
  const isGameOver = isWon || newGuesses.length >= 6;
  const newPossibleWords = filterPossibleWords(state.possibleWords, newGuesses);

  return {
    ...state,
    guesses: newGuesses,
    currentGuess: '',
    isGameOver,
    isWon,
    possibleWords: newPossibleWords,
  };
}

export function addLetter(state: WordleState, letter: string): WordleState {
  if (state.currentGuess.length < 5 && !state.isGameOver) {
    return { ...state, currentGuess: state.currentGuess + letter };
  }
  return state;
}

export function removeLetter(state: WordleState): WordleState {
  if (state.currentGuess.length > 0) {
    return { ...state, currentGuess: state.currentGuess.slice(0, -1) };
  }
  return state;
}

export function getKeyboardState(guesses: Guess[]): Map<string, LetterState> {
  const keyboardState = new Map<string, LetterState>();

  for (const guess of guesses) {
    for (let i = 0; i < 5; i++) {
      const letter = guess.word[i];
      const state = guess.states[i];
      const current = keyboardState.get(letter);

      if (
        !current ||
        (current === 'absent' && state !== 'absent') ||
        (current === 'present' && state === 'correct')
      ) {
        keyboardState.set(letter, state);
      }
    }
  }

  return keyboardState;
}

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
    gameMode: 'free-play',
    strategyMode: 'conservative',
    gameStats: null,
  });
  const [showTarget, setShowTarget] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const initializeGame = useCallback(async (strategyMode: 'conservative' | 'aggressive') => {
    try {
      const newState = await createWordleGame(strategyMode);
      setGameState(newState);
    } catch (error) {
      console.error('initializeGame failed:', error);
      setGameState(prev => ({
        ...prev,
        isLoading: false,
      }));
    }
  }, []);

  useEffect(() => {
    initializeGame('conservative');
  }, []);

  const keyboardState = getKeyboardState(gameState.guesses);

  const resetGame = async () => {
    setShowTarget(false);
    await initializeGame(gameState.strategyMode);
    (document.activeElement as HTMLElement)?.blur();
  };

  const getLetterColor = (state: LetterState): string => {
    switch (state) {
      case "correct": return "bg-green-500 text-white";
      case "present": return "bg-yellow-500 text-white";
      case "absent":  return "bg-gray-500 text-white";
      default:        return "bg-gray-700 text-gray-300";
    }
  };

  const getKeyboardKeyColor = (letter: string): string => {
    const state = keyboardState.get(letter);
    if (state === "correct") return "bg-green-500 text-white";
    if (state === "present") return "bg-yellow-500 text-white";
    if (state === "absent")  return "bg-gray-500 text-white";
    return "bg-gray-600 text-gray-200 hover:bg-gray-500";
  };

  const topLetters = useMemo(() => {
    const frequency: Record<string, number> = {};
    gameState.possibleWords.forEach((w) => {
      [...new Set(w.split(""))].forEach((l) => {
        frequency[l] = (frequency[l] || 0) + 1;
      });
    });
    return Object.entries(frequency)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 10)
      .map(([letter, count]) => ({
        letter,
        count,
        percentage: (count / gameState.possibleWords.length * 100).toFixed(1),
      }));
  }, [gameState.possibleWords]);

  const calculateExpectedSolve = useCallback(() => {
    const possibleWordsCount = gameState.possibleWords.length;
    if (possibleWordsCount === 1) return 100;
    if (possibleWordsCount === 0) return 0;
    const baseExpected = Math.max(0, 100 - (possibleWordsCount / 1000 * 100));
    const strategyMultiplier = gameState.strategyMode === 'aggressive' ? 1.2 : 1.0;
    const guessPenalty = gameState.guesses.length * 2;
    return Math.round(Math.max(0, Math.min(100, (baseExpected * strategyMultiplier) - guessPenalty)));
  }, [gameState.possibleWords.length, gameState.guesses.length, gameState.strategyMode]);

  const letterFrequencyForScoring = useMemo(() => {
    const freq: Record<string, number> = {};
    gameState.possibleWords.forEach((w) => {
      [...new Set(w.split(""))].forEach((l) => {
        freq[l] = (freq[l] || 0) + 1;
      });
    });
    return freq;
  }, [gameState.possibleWords]);

  const scoreWord = useCallback((word: string): number => {
    if (gameState.strategyMode === 'aggressive') {
      const uniqueLetters = new Set(word.split(''));
      const baseScore = [...uniqueLetters].reduce((sum, l) => sum + (letterFrequencyForScoring[l] || 0), 0);
      const uniquenessBonus = uniqueLetters.size === 5 ? 1000 : 0;
      const positionBonus = word.split('').reduce((bonus, letter, pos) => {
        const posFrequency = letterFrequencyForScoring[letter] || 0;
        const positionWeight = pos <= 2 ? 2.5 : 1;
        return bonus + (posFrequency > gameState.possibleWords.length * 0.15 ? 200 * positionWeight : 0);
      }, 0);
      let positionPenalty = 0;
      gameState.guesses.forEach(guess => {
        guess.states.forEach((state, index) => {
          const guessLetter = guess.word[index];
          const wordLetter = word[index];
          if (state === 'present' && wordLetter === guessLetter) positionPenalty += 500;
          if (state === 'correct' && wordLetter !== guessLetter) positionPenalty += 1000;
        });
      });
      return baseScore + uniquenessBonus + positionBonus - positionPenalty;
    } else {
      const baseScore = [...new Set(word.split(""))].reduce((sum, l) => sum + (letterFrequencyForScoring[l] || 0), 0) * 0.5;
      let positionPenalty = 0;
      gameState.guesses.forEach(guess => {
        guess.states.forEach((state, index) => {
          const guessLetter = guess.word[index];
          const wordLetter = word[index];
          if (state === 'present' && wordLetter === guessLetter) positionPenalty += 250;
          if (state === 'correct' && wordLetter !== guessLetter) positionPenalty += 500;
        });
      });
      return baseScore - positionPenalty;
    }
  }, [letterFrequencyForScoring, gameState.strategyMode, gameState.guesses, gameState.possibleWords]);

  const detectPillarOfDoom = useMemo(() => {
    if (gameState.possibleWords.length > 40) return { words: [], riskLevel: 0 };

    const firstLetterCounts: Record<string, number> = {};
    gameState.possibleWords.forEach(word => {
      firstLetterCounts[word[0]] = (firstLetterCounts[word[0]] || 0) + 1;
    });

    const letters = Object.keys(firstLetterCounts);
    const maxCount = Math.max(...Object.values(firstLetterCounts));
    const riskRatio = maxCount / gameState.possibleWords.length;

    const thresholds = gameState.strategyMode === 'conservative'
      ? { trigger: 0.15, pillarBreaker: 0.12 }
      : { trigger: 0.25, pillarBreaker: 0.20 };

    if (letters.length <= 2 || riskRatio < thresholds.pillarBreaker) {
      return { words: [], riskLevel: 0 };
    }

    const dominantLetter = Object.entries(firstLetterCounts).sort(([, a], [, b]) => b - a)[0][0];
    const usedLetters = new Set<string>();
    const confirmedLetters = new Set<string>();
    const presentLetters = new Set<string>();

    gameState.guesses.forEach(guess => {
      guess.word.split('').forEach(letter => usedLetters.add(letter));
      guess.states.forEach((state, index) => {
        const letter = guess.word[index];
        if (state === 'correct') confirmedLetters.add(letter);
        else if (state === 'present') presentLetters.add(letter);
      });
    });

    const pillarBreakers = gameState.possibleWords
      .filter(word => {
        if (gameState.guesses.some(g => g.word === word)) return false;
        return word.split('').every(l => !usedLetters.has(l) && !confirmedLetters.has(l) && !presentLetters.has(l));
      })
      .map(word => ({ word, uniqueNewLetters: new Set(word.split('')).size }))
      .sort((a, b) => b.uniqueNewLetters - a.uniqueNewLetters)
      .slice(0, 5)
      .map(item => item.word);

    return { words: pillarBreakers, riskLevel: riskRatio >= thresholds.trigger ? 2 : 1, dominantLetter, riskRatio };
  }, [gameState.possibleWords, gameState.strategyMode, gameState.guesses]);

  const suggestedWords = useMemo(() => {
    if (gameState.possibleWords.length <= 5) {
      return gameState.possibleWords.map(word => ({ word, score: 0, isPillarBreaker: false }));
    }

    const pillarOfDoom = detectPillarOfDoom;
    const baseWords = gameState.possibleWords
      .map(word => ({ word, score: scoreWord(word), isPillarBreaker: false }))
      .sort((a, b) => b.score - a.score);

    if (pillarOfDoom.words.length > 0) {
      if (pillarOfDoom.riskLevel >= 2) {
        const pillarWords = pillarOfDoom.words.map(word => ({ word, score: 9999, isPillarBreaker: true }));
        return [...pillarWords, ...baseWords.slice(0, 3)];
      } else {
        return [{ word: pillarOfDoom.words[0], score: 8888, isPillarBreaker: true }, ...baseWords.slice(0, 4)];
      }
    }

    return baseWords.slice(0, 5);
  }, [gameState.possibleWords, scoreWord, detectPillarOfDoom]);

  const getGuessStrength = useCallback((guess: Guess): number => {
    if (guess.strength !== undefined) return guess.strength;
    if (gameState.possibleWords.length === 0) return 100;
    const topSuggestedWord = suggestedWords[0]?.word;
    if (!topSuggestedWord) return 100;
    const topScore = scoreWord(topSuggestedWord);
    const guessScore = scoreWord(guess.word);
    return Math.min(100, Math.round((guessScore / topScore) * 100));
  }, [suggestedWords, scoreWord, gameState.possibleWords.length]);

  const toggleStrategyMode = () => {
    const newMode = gameState.strategyMode === 'conservative' ? 'aggressive' : 'conservative';
    setGameState(prev => ({ ...prev, strategyMode: newMode }));
    (document.activeElement as HTMLElement)?.blur();
  };

  const handleVirtualKey = (key: string) => {
    if (gameState.isGameOver) return;
    if (key === "ENTER") {
      if (gameState.currentGuess.length === 5) {
        const topSuggestedWord = suggestedWords[0]?.word;
        const topScore = topSuggestedWord ? scoreWord(topSuggestedWord) : 1000;
        const guessScore = scoreWord(gameState.currentGuess);
        const strength = Math.min(100, Math.round((guessScore / topScore) * 100));
        setGameState((prev) => submitGuess(prev, prev.currentGuess, strength));
      }
    } else if (key === "BACK") {
      setGameState((prev) => removeLetter(prev));
    } else {
      setGameState((prev) => addLetter(prev, key));
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex flex-col items-center p-1">
      <div className="w-full max-w-6xl">
        <div className="flex items-center justify-between mb-3">
          <Link href="/games/wordle" className="text-white/70 hover:text-white transition-colors text-xs">
            ← Back to Wordle Games
          </Link>
          <h1 className="text-lg font-bold text-white">Wordle Solver</h1>
          <div className="w-12" />
        </div>

        <div className="text-center mb-4">
          <div className="flex items-center justify-center gap-3 mb-2">
            <span className="text-xs text-gray-400">
              Strategy: {gameState.strategyMode === 'conservative' ? 'Conservative' : 'Aggressive'}
            </span>
            <button
              onClick={toggleStrategyMode}
              className={`px-2 py-1 text-white text-xs rounded transition-colors ${
                gameState.strategyMode === 'conservative'
                  ? 'bg-blue-600 hover:bg-blue-500'
                  : 'bg-orange-600 hover:bg-orange-500'
              }`}
            >
              Switch to {gameState.strategyMode === 'conservative' ? 'Aggressive' : 'Conservative'}
            </button>
          </div>
          {gameState.isLoading && (
            <div className="text-yellow-400 text-xs mb-2">Loading words...</div>
          )}
        </div>

        {/* Board */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 mb-3 border border-white/20">
          <div className="flex gap-2 justify-center">
            <div className="grid grid-rows-6 gap-1 mb-3">
              {Array.from({ length: 6 }).map((_, rowIndex) => (
                <div key={rowIndex} className="flex items-center gap-1">
                  <div className="grid grid-cols-5 gap-1">
                    {Array.from({ length: 5 }).map((_, colIndex) => {
                      const guess = gameState.guesses[rowIndex];
                      const letter = guess
                        ? guess.word[colIndex]
                        : rowIndex === gameState.guesses.length
                        ? gameState.currentGuess[colIndex] || ""
                        : "";
                      const state = guess ? guess.states[colIndex] : "empty";
                      return (
                        <div
                          key={colIndex}
                          className={`w-12 h-12 flex items-center justify-center text-lg font-bold rounded border ${getLetterColor(state)} ${
                            state === "empty" ? "border-gray-600" : "border-transparent"
                          }`}
                        >
                          {letter}
                        </div>
                      );
                    })}
                  </div>
                  {gameState.guesses[rowIndex] && (
                    <div className="ml-2 flex flex-col items-center justify-center">
                      <div className="text-xs text-gray-400 mb-0.5">Strength</div>
                      <div className={`text-xs font-bold px-1.5 py-0.5 rounded ${
                        getGuessStrength(gameState.guesses[rowIndex]) >= 70
                          ? 'bg-green-500/20 text-green-300'
                          : getGuessStrength(gameState.guesses[rowIndex]) >= 40
                          ? 'bg-yellow-500/20 text-yellow-300'
                          : 'bg-red-500/20 text-red-300'
                      }`}>
                        {getGuessStrength(gameState.guesses[rowIndex])}%
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {gameState.isGameOver && (
            <div className="text-center mb-3">
              {gameState.isWon ? (
                <div className="text-green-400 text-sm font-bold mb-1">
                  🎉 Solved in {gameState.guesses.length} {gameState.guesses.length === 1 ? 'try' : 'tries'}!
                </div>
              ) : (
                <div className="text-red-400 text-sm font-bold mb-1">
                  Game Over! Word: {gameState.targetWord}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Statistics */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-2 mb-3 border border-white/20">
          <div className="text-center">
            <h3 className="text-xs font-semibold text-white mb-1">Statistics</h3>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-black/20 rounded p-1">
                <div className="text-gray-400 text-xs">Words</div>
                <div className="text-white font-bold">{gameState.possibleWords.length}</div>
              </div>
              <div className="bg-black/20 rounded p-1">
                <div className="text-gray-400 text-xs">Guesses</div>
                <div className="text-white font-bold">{gameState.guesses.length}/6</div>
              </div>
            </div>
            {gameState.possibleWords.length > 0 && (
              <div className="mt-1">
                <div className="flex flex-wrap gap-1 justify-center">
                  {topLetters.slice(0, 6).map(({ letter, percentage }) => (
                    <div key={letter} className="bg-white/20 text-gray-300 text-xs px-1 py-0.5 rounded border border-white/30">
                      {letter} ({percentage}%)
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Suggestions panel */}
        {!gameState.isGameOver && !gameState.isLoading && (
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-1.5 mb-3 border border-white/20">
            <div className="text-center">
              {!showSuggestions ? (
                <div
                  className="relative cursor-pointer group"
                  onClick={() => setShowSuggestions(true)}
                >
                  <div className="bg-gradient-to-r from-white/10 to-white/5 rounded-lg p-1.5 border border-white/10 hover:border-white/20 transition-all">
                    <div className="flex items-center justify-between">
                      <div className="text-left">
                        <div className="text-white font-semibold text-xs mb-0.5">Suggestions</div>
                        <div className="text-gray-300 text-xs">
                          {gameState.possibleWords.length <= 5
                            ? `${gameState.possibleWords.length} left`
                            : `${gameState.possibleWords.length} possible`}
                        </div>
                      </div>
                      <div className="text-white/60 group-hover:text-white/80 transition-colors">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                    <div className="flex gap-1 mt-1">
                      <div className="px-1 py-0.5 text-xs font-medium rounded-full bg-white/10 text-white/70 border border-white/20">
                        {gameState.strategyMode === 'aggressive' ? 'Aggressive' : 'Conservative'}
                      </div>
                      <div className={`px-1 py-0.5 text-xs font-medium rounded-full border ${
                        calculateExpectedSolve() >= 80
                          ? 'bg-green-500/20 text-green-300 border-green-500/30'
                          : calculateExpectedSolve() >= 50
                          ? 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30'
                          : 'bg-red-500/20 text-red-300 border-red-500/30'
                      }`}>
                        {calculateExpectedSolve()}% solve
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between mb-1.5">
                    <h3 className="text-xs font-semibold text-white">Word Suggestions</h3>
                    <button
                      onClick={() => setShowSuggestions(false)}
                      className="p-0.5 bg-white/10 hover:bg-white/20 text-white rounded transition-colors"
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  <div className="text-xs text-gray-400 mb-1.5">
                    {gameState.possibleWords.length <= 5
                      ? `${gameState.possibleWords.length} words remaining`
                      : `${gameState.possibleWords.length} possible words`}
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded p-1.5 mb-1.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs text-gray-300">Strategy:</span>
                        <span className="px-1 py-0.5 text-xs font-medium rounded-full bg-white/10 text-white/70 border border-white/20">
                          {gameState.strategyMode === 'aggressive' ? 'Aggressive' : 'Conservative'}
                        </span>
                      </div>
                      <div className={`px-1 py-0.5 text-xs font-bold rounded-full border ${
                        calculateExpectedSolve() >= 80
                          ? 'bg-green-500/20 text-green-300 border-green-500/30'
                          : calculateExpectedSolve() >= 50
                          ? 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30'
                          : 'bg-red-500/20 text-red-300 border-red-500/30'
                      }`}>
                        {calculateExpectedSolve()}% solve
                      </div>
                    </div>
                  </div>
                  <div className="space-y-0.5">
                    {suggestedWords.map(({ word, score, isPillarBreaker }, index) => (
                      <button
                        key={word}
                        onClick={() => {
                          setGameState(prev => ({ ...prev, currentGuess: word }));
                          (document.activeElement as HTMLElement)?.blur();
                        }}
                        className={`w-full p-1 rounded text-left transition-all text-xs ${
                          isPillarBreaker
                            ? "bg-orange-500/20 border border-orange-500/30 text-orange-300 hover:bg-orange-500/30"
                            : index === 0 && gameState.possibleWords.length > 5
                              ? "bg-white/15 border border-white/20 text-white/80 hover:bg-white/20"
                              : "bg-white/5 border border-white/10 text-white/60 hover:bg-white/10"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1.5">
                            <span className="font-semibold">{word}</span>
                            {isPillarBreaker && (
                              <span className="px-1 py-0.5 bg-orange-500/30 text-orange-200 text-xs rounded-full">Pillar</span>
                            )}
                          </div>
                          {!isPillarBreaker && gameState.possibleWords.length > 5 && (
                            <span className="text-xs opacity-60">{score}</span>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {/* Keyboard */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 mb-3 border border-white/20">
          {KEYBOARD_ROWS.map((row, rowIndex) => (
            <div key={rowIndex} className="flex justify-center gap-1.5 mb-1.5">
              {row.map((key) => (
                <button
                  key={key}
                  onClick={() => {
                    handleVirtualKey(key);
                    (document.activeElement as HTMLElement)?.blur();
                  }}
                  className={`px-3 py-3 rounded font-semibold text-sm transition-colors ${getKeyboardKeyColor(key)} ${
                    key === 'ENTER' ? 'px-6 text-xs' : key === 'BACK' ? 'px-5' : ''
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
            className="px-3 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold rounded transition-colors"
            disabled={gameState.isLoading}
          >
            {gameState.isLoading ? "Loading..." : "New Game"}
          </button>
          <button
            onClick={() => setShowTarget(!showTarget)}
            className="px-3 py-2 bg-gray-600 hover:bg-gray-500 text-white text-sm font-semibold rounded transition-colors"
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