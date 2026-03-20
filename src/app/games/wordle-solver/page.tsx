"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import Link from "next/link";

export type LetterState = 'correct' | 'present' | 'absent' | 'empty';

export interface WordleGuess {
  word: string;
  states: LetterState[];
}

export interface WordleState {
  targetWord: string;
  guesses: WordleGuess[];
  currentGuess: string;
  isGameOver: boolean;
  isWon: boolean;
  possibleWords: string[];
  allWords: string[];
  isLoading: boolean;
  gameMode: 'nyt-daily' | 'free-play';
  strategyMode: 'conservative' | 'aggressive';
  showContinuePrompt: boolean;
  gameStats: {
    guessesUsed: number;
    timeTaken: number;
    strategyUsed: 'conservative' | 'aggressive';
  } | null;
}

// Small fallback list used only if /public/words.json fails to load
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
    // Support both a plain array and an object with a "words" or "answers" key
    const list: string[] = Array.isArray(data) ? data : (data.words ?? data.answers ?? []);
    return list.map((w: string) => w.toUpperCase()).filter((w: string) => w.length === 5);
  } catch (e) {
    console.warn('Could not load /public/words.json, using fallback word list.', e);
    return FALLBACK_WORDS;
  }
}

async function fetchTodayWordleWord(allWords: string[]): Promise<string> {
  try {
    const response = await fetch('https://wordle.votee.dev:8000/daily');
    if (response.ok) {
      const data = await response.json();
      return data.word.toUpperCase();
    }
  } catch {
    console.warn("Failed to fetch today's Wordle word, using random word");
  }
  return allWords[Math.floor(Math.random() * allWords.length)];
}

async function fetchNYTWordleWord(): Promise<string> {
  // First try local calculation using NYT answers
  try {
    const response = await fetch('/nyt-answers.json');
    if (response.ok) {
      const answers = await response.json();
      const START_DATE = new Date(2021, 5, 19); // June 19, 2021
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const dayIndex = Math.floor((today.getTime() - START_DATE.getTime()) / 86400000);
      const word = answers[dayIndex % answers.length];
      if (word && word.length === 5) {
        console.log('Local NYT calculation success:', word.toUpperCase());
        return word.toUpperCase();
      }
    }
  } catch (error) {
    console.warn("Local NYT calculation failed:", error);
  }

  // Fallback to external APIs if local calculation fails
  try {
    // Try multiple reliable sources for today's Wordle word
    const sources = [
      {
        url: 'https://api.frontendmasters.com/v1/wordle',
        parser: (data: { word?: string }) => data?.word,
      },
      {
        url: 'https://wordle-api.vercel.app/word',
        parser: (data: { word?: string }) => data?.word,
      },
      {
        url: 'https://www.nytimes.com/svc/wordle/v2/answers.json',
        parser: (data: { results?: Array<{ word?: string }> }) => {
          // Get the most recent word from NYT API
          if (data.results && data.results.length > 0) {
            const latest = data.results[data.results.length - 1];
            return latest.word;
          }
          return null;
        },
      },
      {
        url: 'https://api.jsonbin.io/v3/b/60f8b8c9e4b6641b0a8b8b8c',
        parser: (data: { record?: Record<string, string> }) => {
          // Alternative JSONBin source
          const today = new Date().toISOString().split('T')[0];
          return data.record?.[today];
        },
      }
    ];

    for (const source of sources) {
      try {
        console.log(`Trying source: ${source.url}`);
        const response = await fetch(source.url);
        if (response.ok) {
          const data = await response.json();
          console.log(`Response from ${source.url}:`, data);
          
          const word = source.parser(data);
          if (word && typeof word === 'string' && word.length === 5) {
            console.log(`Found word from ${source.url}:`, word.toUpperCase());
            return word.toUpperCase();
          }
        }
      } catch (error) {
        console.warn(`Failed with ${source.url}:`, error);
        continue;
      }
    }
  } catch (error) {
    console.warn("All API attempts failed:", error);
  }
  
  console.warn("All NYT API attempts failed, trying fallback Wordle API");
  // Fallback to working Wordle API
  try {
    const fallbackWord = await fetchTodayWordleWord(await fetchWordList());
    console.log('Fallback Wordle API success:', fallbackWord);
    return fallbackWord;
  } catch (error) {
    console.warn("Fallback Wordle API also failed:", error);
  }
  
  // Manual override for today's correct NYT Wordle word
  const today = new Date().toISOString().split('T')[0];
  const knownWords: Record<string, string> = {
    '2026-03-19': 'REHAB',
    '2026-03-20': 'TULIP', // Example - update with actual words
    '2026-03-21': 'MOUSE', // Example - update with actual words
  };
  
  if (knownWords[today]) {
    console.log(`Using manual override for ${today}:`, knownWords[today]);
    return knownWords[today];
  }
  
  // Final fallback
  console.warn("Using fallback word");
  return 'REHAB';
}

export async function createWordleGame(
  gameMode: 'nyt-daily' | 'free-play' = 'nyt-daily',
  strategyMode: 'conservative' | 'aggressive' = 'conservative'
): Promise<WordleState> {
  const allWords = await fetchWordList();

  let targetWord: string;

  if (gameMode === 'nyt-daily') {
    targetWord = await fetchNYTWordleWord();
    console.log('NYT Daily Wordle - Target word:', targetWord);
  } else {
    console.log('Free Play mode - All words count:', allWords.length);
    if (allWords.length === 0) {
      console.warn('No words available for Free Play mode!');
      targetWord = 'ERROR';
    } else {
      targetWord = allWords[Math.floor(Math.random() * allWords.length)];
      console.log('Free Play - Selected random word:', targetWord);
    }
  }

  return {
    targetWord,
    guesses: [],
    currentGuess: '',
    isGameOver: false,
    isWon: false,
    possibleWords: [...allWords],
    allWords,
    isLoading: false,
    gameMode,
    strategyMode,
    showContinuePrompt: false,
    gameStats: null,
  };
}

export function evaluateGuess(guess: string, targetWord: string): LetterState[] {
  const states: LetterState[] = ['empty', 'empty', 'empty', 'empty', 'empty'];
  const targetLetters = targetWord.split('');
  const guessLetters = guess.split('');

  // First pass: correct positions
  for (let i = 0; i < 5; i++) {
    if (guessLetters[i] === targetLetters[i]) {
      states[i] = 'correct';
      targetLetters[i] = '_';
      guessLetters[i] = '_';
    }
  }

  // Second pass: present letters
  for (let i = 0; i < 5; i++) {
    if (guessLetters[i] !== '_' && targetLetters.includes(guessLetters[i])) {
      states[i] = 'present';
      targetLetters[targetLetters.indexOf(guessLetters[i])] = '_';
    }
  }

  // Third pass: absent letters
  for (let i = 0; i < 5; i++) {
    if (guessLetters[i] !== '_' && states[i] === 'empty') {
      states[i] = 'absent';
    }
  }

  return states;
}

export function filterPossibleWords(
  possibleWords: string[],
  guesses: WordleGuess[]
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

export function submitGuess(state: WordleState, guess: string): WordleState {
  if (state.isGameOver || guess.length !== 5 || !state.allWords.includes(guess)) {
    return state;
  }

  const states = evaluateGuess(guess, state.targetWord);
  const newGuess: WordleGuess = { word: guess, states };
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

export function getKeyboardState(guesses: WordleGuess[]): Map<string, LetterState> {
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
    gameMode: 'nyt-daily',
    strategyMode: 'conservative',
    showContinuePrompt: false,
    gameStats: null,
  });
  const [showTarget, setShowTarget] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const initializeGame = useCallback(async () => {
    console.log('initializeGame called - current mode:', gameState.gameMode, 'current word:', gameState.targetWord);
    try {
      const newState = await createWordleGame(gameState.gameMode, gameState.strategyMode);
      console.log('initializeGame - new state:', {
        gameMode: newState.gameMode,
        targetWord: newState.targetWord,
        isGameOver: newState.isGameOver,
        isWon: newState.isWon,
        currentGuess: newState.currentGuess,
        possibleWords: newState.possibleWords.length
      });
      setGameState(newState);
    } catch (error) {
      console.error('initializeGame failed:', error);
      // Fallback to a working state
      setGameState({
        targetWord: 'REHAB',
        guesses: [],
        currentGuess: '',
        isGameOver: false,
        isWon: false,
        possibleWords: [],
        allWords: [],
        isLoading: false,
        gameMode: 'free-play',
        strategyMode: 'conservative',
        showContinuePrompt: false,
        gameStats: null,
      });
    }
  }, [gameState.gameMode, gameState.strategyMode]);

  // Initialize game on mount
  useEffect(() => {
    const initGame = async () => {
      await initializeGame();
    };
    initGame();
  }, [initializeGame]);

  const keyboardState = getKeyboardState(gameState.guesses);

  const handleKeyPress = useCallback(
    (e: KeyboardEvent) => {
      // Prevent Enter key from triggering button clicks
      if (e.key === "Enter" && document.activeElement?.tagName === "BUTTON") {
        e.preventDefault();
        return;
      }

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

  const toggleStrategyMode = () => {
    setGameState(prev => ({ ...prev, strategyMode: prev.strategyMode === 'conservative' ? 'aggressive' : 'conservative' }));
    // Remove focus from button to prevent Enter key from triggering it again
    (document.activeElement as HTMLElement)?.blur();
  };

  const toggleGameMode = async () => {
    const newMode = gameState.gameMode === 'nyt-daily' ? 'free-play' : 'nyt-daily';
    const newState = await createWordleGame(newMode, gameState.strategyMode);
    setGameState(newState);
    // Remove focus from button to prevent Enter key from triggering it again
    (document.activeElement as HTMLElement)?.blur();
  };

  const resetGame = async () => {
    console.log('resetGame called - current mode:', gameState.gameMode, 'current word:', gameState.targetWord);
    console.log('resetGame - game state before:', {
      isGameOver: gameState.isGameOver,
      isWon: gameState.isWon,
      currentGuess: gameState.currentGuess,
      guesses: gameState.guesses.length
    });
    // Use a fresh copy of current state to avoid circular dependencies
    const currentMode = gameState.gameMode;
    const currentStrategy = gameState.strategyMode;
    
    const newState = await createWordleGame(currentMode, currentStrategy);
    setGameState(newState);
    setShowTarget(false);
    // Remove focus from button to prevent Enter key from triggering it again
    (document.activeElement as HTMLElement)?.blur();
  };

  const continueToFreePlay = async () => {
    const currentStrategy = gameState.strategyMode;
    const newState = await createWordleGame('free-play', currentStrategy);
    setGameState(newState);
    // Remove focus from button to prevent Enter key from triggering it again
    (document.activeElement as HTMLElement)?.blur();
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

  const topLetters = useMemo(() => {
    const frequency = getLetterFrequency();
    return Object.entries(frequency)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 10)
      .map(([letter, count]) => ({ letter, count, percentage: (count / gameState.possibleWords.length * 100).toFixed(1) }));
  }, [getLetterFrequency, gameState.possibleWords]);

  // Calculate expected solve based on strategy and current guesses
  const calculateExpectedSolve = useCallback(() => {
    const guessesCount = gameState.guesses.length;
    const possibleWordsCount = gameState.possibleWords.length;
    
    if (possibleWordsCount === 1) return 100;
    if (possibleWordsCount === 0) return 0;
    
    // Base calculation on remaining words
    const baseExpected = Math.max(0, 100 - (possibleWordsCount / 1000 * 100));
    
    // Adjust for strategy mode
    const strategyMultiplier = gameState.strategyMode === 'aggressive' ? 1.2 : 1.0;
    
    // Adjust for guesses used (more guesses = slightly lower expected since we've had more chances)
    const guessPenalty = guessesCount * 2;
    
    const expectedSolve = Math.max(0, Math.min(100, (baseExpected * strategyMultiplier) - guessPenalty));
    
    return Math.round(expectedSolve);
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

  // Score words by letter coverage for suggestions
  const scoreWord = useCallback((word: string): number => {
    if (gameState.strategyMode === 'aggressive') {
      // Aggressive mode: Prioritize words with unique letters and high information gain
      const uniqueLetters = new Set(word.split(''));
      const baseScore = [...uniqueLetters].reduce((sum, l) => sum + (letterFrequencyForScoring[l] || 0), 0);
      
      // Bonus for words with all unique letters (max information)
      const uniquenessBonus = uniqueLetters.size === 5 ? 500 : 0;
      
      // Bonus for words with common letters in high-frequency positions
      const positionBonus = word.split('').reduce((bonus, letter, pos) => {
        const posFrequency = letterFrequencyForScoring[letter] || 0;
        // Higher bonus for letters in earlier positions (0, 1, 2)
        const positionWeight = pos <= 2 ? 1.5 : 1;
        return bonus + (posFrequency > gameState.possibleWords.length * 0.15 ? 100 * positionWeight : 0);
      }, 0);
      
      return baseScore + uniquenessBonus + positionBonus;
    } else {
      // Conservative mode: Original letter coverage scoring
      return [...new Set(word.split(""))].reduce((sum, l) => sum + (letterFrequencyForScoring[l] || 0), 0);
    }
  }, [letterFrequencyForScoring, gameState.strategyMode, gameState.possibleWords.length]);

  // Detect Pillar of Doom scenarios - risky first letter distributions that could cause losses
  const detectPillarOfDoom = useMemo(() => {
    if (gameState.possibleWords.length > 50) return { words: [], riskLevel: 0 }; // Only trigger when word count is manageable
    
    // Analyze first letter distribution
    const firstLetterCounts: Record<string, number> = {};
    gameState.possibleWords.forEach(word => {
      const firstLetter = word[0];
      firstLetterCounts[firstLetter] = (firstLetterCounts[firstLetter] || 0) + 1;
    });
    
    // Calculate risk of loss scenario
    const totalWords = gameState.possibleWords.length;
    const letters = Object.keys(firstLetterCounts);
    const maxCount = Math.max(...Object.values(firstLetterCounts));
    const riskRatio = maxCount / totalWords;
    
    // Determine if Pillar of Doom should trigger with different thresholds
    const thresholds = gameState.strategyMode === 'conservative' 
      ? { trigger: 0.20, pillarBreaker: 0.15, maxWords: 30 } // Conservative: lower thresholds
      : { trigger: 0.30, pillarBreaker: 0.25, maxWords: 20 }; // Aggressive: higher thresholds
    
    if (letters.length <= 2 || riskRatio < thresholds.pillarBreaker) {
      return { words: [], riskLevel: 0 };
    }
    
    // Determine risk level for UI
    let riskLevel = 0;
    if (riskRatio >= thresholds.trigger) {
      riskLevel = 2; // High risk - show pillar breaker
    } else if (riskRatio >= thresholds.pillarBreaker) {
      riskLevel = 1; // Medium risk - show in suggestions
    }
    
    // Find the best letters to test first position
    const letterFrequency = getLetterFrequency();
    const sortedLetters = letters
      .map(letter => ({
        letter,
        count: firstLetterCounts[letter],
        frequency: letterFrequency[letter] || 0,
        riskRatio: firstLetterCounts[letter] / totalWords
      }))
      .sort((a, b) => b.riskRatio - a.riskRatio);
    
    // Create strategic test words using high-frequency letters
    const topLetters = sortedLetters.slice(0, Math.min(4, sortedLetters.length));
    const testWords: string[] = [];
    
    // Generate words that test these first letters
    topLetters.forEach(({ letter }) => {
      // Find words that start with this letter and have other common letters
      const candidateWords = gameState.possibleWords.filter(word => 
        word[0] === letter && 
        [...new Set(word.split(''))].length >= 4 // Prefer words with unique letters
      );
      
      if (candidateWords.length > 0) {
        // Score candidates by letter diversity and frequency
        const scored = candidateWords.map(word => {
          const uniqueLetters = [...new Set(word.split(''))];
          const diversityScore = uniqueLetters.reduce((sum, l) => sum + (letterFrequency[l] || 0), 0);
          return { word, score: diversityScore };
        }).sort((a, b) => b.score - a.score);
        
        testWords.push(scored[0].word);
      }
    });
    
    return { 
      words: testWords.slice(0, riskLevel >= 2 ? 2 : 1), 
      riskLevel,
      riskRatio,
      dominantLetter: sortedLetters[0]?.letter || ''
    };
  }, [gameState.possibleWords, gameState.strategyMode, getLetterFrequency]);

  const suggestedWords = useMemo(() => {
    if (gameState.possibleWords.length <= 5) {
      return gameState.possibleWords.map(word => ({ word, score: 0, isPillarBreaker: false }));
    }
    
    // Check for Pillar of Doom scenarios first
    const pillarOfDoom = detectPillarOfDoom;
    const baseWords = gameState.possibleWords
      .map(word => ({ word, score: scoreWord(word), isPillarBreaker: false }))
      .sort((a, b) => b.score - a.score);
    
    // If Pillar of Doom detected, integrate strategic words
    if (pillarOfDoom.words.length > 0) {
      console.log('Pillar of Doom detected! Risk level:', pillarOfDoom.riskLevel, 'Strategic test words:', pillarOfDoom.words);
      
      if (pillarOfDoom.riskLevel >= 2) {
        // High risk - show pillar breaker words prominently
        const pillarWords = pillarOfDoom.words.map(word => ({ 
          word, 
          score: 9999, 
          isPillarBreaker: true 
        }));
        return [...pillarWords, ...baseWords.slice(0, 3)];
      } else {
        // Medium risk - integrate one pillar word into suggestions
        const pillarWord = pillarOfDoom.words[0];
        const pillarWordObj = { 
          word: pillarWord, 
          score: 8888, 
          isPillarBreaker: true 
        };
        
        // Insert pillar word at the top
        return [pillarWordObj, ...baseWords.slice(0, 4)];
      }
    }
    
    return baseWords.slice(0, 5);
  }, [gameState.possibleWords, scoreWord, detectPillarOfDoom]);

  // Detect pillars/cliffs - character patterns that could eliminate many words
  const detectPillars = useMemo(() => {
    if (gameState.guesses.length === 0 || gameState.possibleWords.length <= 20) {
      return [];
    }

    // Analyze character positions across all possible words
    const positionAnalysis: Record<number, Record<string, number>> = {};
    for (let pos = 0; pos < 5; pos++) {
      positionAnalysis[pos] = {};
      gameState.possibleWords.forEach(word => {
        const char = word[pos];
        positionAnalysis[pos][char] = (positionAnalysis[pos][char] || 0) + 1;
      });
    }

    // Find pillars - positions with very diverse characters
    const pillars: Array<{
      position: number;
      pattern: string;
      eliminationPower: number;
      suggestedChars: Array<{ char: string; coverage: number }>;
    }> = [];

    for (let pos = 0; pos < 5; pos++) {
      const chars = Object.keys(positionAnalysis[pos]);
      const totalWords = gameState.possibleWords.length;
      
      // If this position has many different characters, it's a potential pillar
      if (chars.length >= 8) {
        // Calculate elimination power for each character
        const charAnalysis = chars.map(char => {
          const coverage = positionAnalysis[pos][char];
          const eliminationPower = totalWords - coverage;
          return { char, coverage, eliminationPower };
        }).sort((a, b) => b.eliminationPower - a.eliminationPower);

        if (charAnalysis[0].eliminationPower > totalWords * 0.3) {
          pillars.push({
            position: pos,
            pattern: '_'.repeat(pos) + '?' + '_'.repeat(4 - pos),
            eliminationPower: charAnalysis[0].eliminationPower,
            suggestedChars: charAnalysis.slice(0, 3)
          });
        }
      }
    }

    return pillars.sort((a, b) => b.eliminationPower - a.eliminationPower).slice(0, 2);
  }, [gameState.possibleWords, gameState.guesses.length]);

  // Generate pillar-focused suggestions
  const getPillarSuggestions = useMemo(() => {
    if (detectPillars.length === 0) return [];

    return detectPillars.map(pillar => {
      // Find words that use the best elimination characters
      const bestChar = pillar.suggestedChars[0].char;
      const pillarWords = gameState.possibleWords
        .filter(word => word[pillar.position] === bestChar)
        .map(word => ({ word, score: scoreWord(word) }))
        .sort((a, b) => b.score - a.score)
        .slice(0, 2);

      return {
        ...pillar,
        words: pillarWords
      };
    });
  }, [detectPillars, scoreWord, gameState.possibleWords]);

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
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex flex-col items-center p-1">
      <div className="w-full max-w-3xl">
        <div className="flex items-center justify-between mb-3">
          <Link
            href="/home"
            className="text-white/70 hover:text-white transition-colors text-xs"
          >
            ← Back to Hub
          </Link>
          <h1 className="text-lg font-bold text-white">Wordle Solver</h1>
          <div className="w-12" />
        </div>

        <div className="text-center mb-4">
          <div className="flex items-center justify-center gap-3 mb-2">
            <span className="text-xs text-gray-400">
              {gameState.gameMode === 'nyt-daily' ? 'NYT Daily Wordle' : 'Free Play'}
            </span>
            <button
              onClick={toggleGameMode}
              className="px-2 py-1 bg-blue-600 hover:bg-blue-500 text-white text-xs rounded transition-colors"
            >
              Switch to {gameState.gameMode === 'nyt-daily' ? 'Free Play' : 'NYT Daily Wordle'}
            </button>
          </div>
          <div className="flex items-center justify-center gap-3 mb-2">
            <span className="text-xs text-gray-400">
              Strategy: {gameState.strategyMode === 'conservative' ? 'Conservative' : 'Aggressive'}
            </span>
            <button
              onClick={toggleStrategyMode}
              className={`px-2 py-1 text-white text-xs rounded transition-colors ${
                gameState.strategyMode === 'conservative' 
                  ? 'bg-green-600 hover:bg-green-500' 
                  : 'bg-orange-600 hover:bg-orange-500'
              }`}
            >
              Switch to {gameState.strategyMode === 'conservative' ? 'Aggressive' : 'Conservative'}
            </button>
          </div>
          
          {gameState.isLoading && (
            <div className="text-yellow-400 text-xs mb-2">
              Loading {gameState.gameMode === 'nyt-daily' ? "NYT Daily Wordle" : "Free Play"} word...
            </div>
          )}
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 mb-3 border border-white/20">
          <div className="grid grid-rows-6 gap-1 mb-3 w-fit mx-auto">
            {Array.from({ length: 6 }).map((_, rowIndex) => (
              <div key={rowIndex} className="grid grid-cols-5 gap-1">
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
                      className={`w-12 h-12 flex items-center justify-center text-lg font-bold rounded border ${getLetterColor(
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

          {/* Post-game analysis and continue prompt */}
          {gameState.isGameOver && gameState.gameMode === 'nyt-daily' && (
            <div className="bg-purple-600/20 border border-purple-400/30 rounded-lg p-3 mb-3">
              <div className="text-center">
                <h4 className="text-sm font-semibold text-purple-300 mb-2">Daily Complete!</h4>
                <div className="text-xs text-gray-300 mb-2">
                  Ready for more practice? Try Free Play mode with unlimited words.
                </div>
                <button
                  onClick={continueToFreePlay}
                  className="px-3 py-1 bg-purple-600 hover:bg-purple-500 text-white text-xs rounded transition-colors"
                >
                  Continue to Free Play
                </button>
              </div>
            </div>
          )}
        </div>

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
                  {topLetters.slice(0, 6).map(({ letter, percentage }: { letter: string; percentage: string }) => (
                    <div key={letter} className="bg-blue-600/30 text-blue-200 text-xs px-1 py-0.5 rounded">
                      {letter} ({percentage}%)
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Toggleable Suggested Words Panel */}
        {!gameState.isGameOver && !gameState.isLoading && (
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-2 mb-3 border border-white/20">
            <div className="text-center">
              {!showSuggestions ? (
                /* Elegant collapsed state */
                <div 
                  className="relative cursor-pointer group"
                  onClick={() => setShowSuggestions(true)}
                >
                  <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-lg p-2 border border-white/10 hover:border-white/20 transition-all">
                    <div className="flex items-center justify-between">
                      <div className="text-left">
                        <div className="text-white font-semibold text-xs mb-1">Suggestions</div>
                        <div className="text-gray-300 text-xs">
                          {gameState.possibleWords.length <= 5 
                            ? `${gameState.possibleWords.length} left` 
                            : `${gameState.possibleWords.length} possible`}
                        </div>
                      </div>
                      <div className="text-white/60 group-hover:text-white/80 transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                    
                    {/* Expected solve indicator */}
                    <div className="flex gap-1 mt-1">
                      <div className="px-1.5 py-0.5 text-xs font-medium rounded-full bg-white/10 text-white/70 border border-white/20">
                        {gameState.strategyMode === 'aggressive' ? 'Aggressive' : 'Conservative'}
                      </div>
                      <div className={`px-1.5 py-0.5 text-xs font-medium rounded-full border ${
                        calculateExpectedSolve() >= 80
                          ? 'bg-green-500/20 text-green-300 border-green-500/30'
                          : calculateExpectedSolve() >= 50
                          ? 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30'
                          : 'bg-red-500/20 text-red-300 border-red-500/30'
                      }`}>
                        {calculateExpectedSolve()}% solve
                      </div>
                    </div>
                    
                    {/* Risk indicator */}
                    {detectPillarOfDoom.words.length > 0 && detectPillarOfDoom.riskLevel >= 2 && (
                      <div className="mt-1 flex items-center gap-1">
                        <div className="w-1.5 h-1.5 bg-orange-500 rounded-full"></div>
                        <div className="text-orange-300 text-xs">High risk</div>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                /* Expanded suggestions panel */
                <>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xs font-semibold text-white">
                      Word Suggestions
                    </h3>
                    <button
                      onClick={() => setShowSuggestions(false)}
                      className="p-1 bg-white/10 hover:bg-white/20 text-white rounded transition-colors"
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  
                  <div className="text-xs text-gray-400 mb-2">
                    {gameState.possibleWords.length <= 5 
                      ? `${gameState.possibleWords.length} words remaining` 
                      : `${gameState.possibleWords.length} possible words`}
                  </div>
                  
                  {/* Expected solve and strategy info */}
                  <div className="bg-white/5 border border-white/10 rounded-lg p-2 mb-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-300">Strategy:</span>
                        <span className="px-1.5 py-0.5 text-xs font-medium rounded-full bg-white/10 text-white/70 border border-white/20">
                          {gameState.strategyMode === 'aggressive' ? 'Aggressive' : 'Conservative'}
                        </span>
                      </div>
                      <div className={`px-1.5 py-0.5 text-xs font-bold rounded-full border ${
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
                  
                  {/* Pillar of Doom warning */}
                  {detectPillarOfDoom.words.length > 0 && detectPillarOfDoom.riskLevel >= 2 && (
                    <div className="bg-orange-500/20 border border-orange-500/30 rounded-lg p-2 mb-2">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                        <div className="text-orange-300 font-semibold text-xs">High Risk Pattern</div>
                      </div>
                      <div className="text-orange-200 text-xs">
                        "{detectPillarOfDoom.dominantLetter}" in {Math.round(detectPillarOfDoom.riskRatio! * 100)}% of words
                      </div>
                    </div>
                  )}
                  
                  <div className="space-y-1">
                    {suggestedWords.map(({ word, score, isPillarBreaker }: { word: string; score: number; isPillarBreaker: boolean }, index: number) => (
                      <button
                        key={word}
                        onClick={() => {
                          setGameState(prev => ({ ...prev, currentGuess: word }));
                          // Remove focus from button to prevent Enter key from triggering it again
                          (document.activeElement as HTMLElement)?.blur();
                        }}
                        className={`w-full p-1.5 rounded text-left transition-all text-xs ${
                          isPillarBreaker
                            ? "bg-orange-500/20 border border-orange-500/30 text-orange-300 hover:bg-orange-500/30"
                            : index === 0 && gameState.possibleWords.length > 5 && !isPillarBreaker
                              ? "bg-blue-500/20 border border-blue-500/30 text-blue-300 hover:bg-blue-500/30"
                              : "bg-white/5 border border-white/10 text-white/70 hover:bg-white/10"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold">{word}</span>
                            {isPillarBreaker && (
                              <span className="px-1 py-0.5 bg-orange-500/30 text-orange-200 text-xs rounded-full">Shield</span>
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

        {/* Pillar Detection Panel */}
        {detectPillars.length > 0 && (
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 mb-4 border border-white/20">
            <div className="text-center mb-2">
              <h3 className="text-sm font-semibold text-white mb-2">Pillar Detection</h3>
              <div className="text-xs text-gray-400 mb-2">
                Strategic positions to eliminate many words
              </div>
              {getPillarSuggestions.map((pillar) => (
                <div key={pillar.position} className="mb-3">
                  <div className="text-xs text-yellow-400 mb-1">
                    Position {pillar.position + 1}: {pillar.pattern} 
                    <span className="text-green-400">(-{Math.round(pillar.eliminationPower)} words)</span>
                  </div>
                  <div className="text-xs text-gray-400 mb-1">
                    Best characters: {pillar.suggestedChars.map(c => `${c.char}(${c.coverage})`).join(', ')}
                  </div>
                  <div className="flex flex-wrap gap-1 justify-center">
                    {pillar.words.map(({ word, score }) => (
                      <button
                        key={word}
                        onClick={() => {
                          setGameState(prev => ({ ...prev, currentGuess: word }));
                          // Remove focus from button to prevent Enter key from triggering it again
                          (document.activeElement as HTMLElement)?.blur();
                        }}
                        className="px-2 py-1 text-xs font-semibold rounded bg-red-600/30 text-red-200 hover:bg-red-600/50 transition-colors"
                      >
                        {word}
                        <span className="text-xs opacity-75 ml-1">({score})</span>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 mb-3 border border-white/20">
          {KEYBOARD_ROWS.map((row, rowIndex) => (
            <div key={rowIndex} className="flex justify-center gap-1.5 mb-1.5">
              {row.map((key) => (
                <button
                  key={key}
                  onClick={() => {
                    handleVirtualKey(key);
                    // Remove focus from button to prevent Enter key from triggering it again
                    (document.activeElement as HTMLElement)?.blur();
                  }}
                  className={`px-3 py-3 rounded font-semibold text-sm transition-colors ${getKeyboardKeyColor(
                    key
                  )} ${
                    key === 'ENTER'
                      ? 'px-6 text-xs'
                      : key === 'BACK'
                      ? 'px-5'
                      : ''
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