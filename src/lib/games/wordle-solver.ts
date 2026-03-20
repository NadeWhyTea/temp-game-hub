// This file now contains only type definitions and helper functions
// All game logic has been moved to the page component for better organization

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
  useTodayWord: boolean;
}

// Helper functions for word fetching - can be used by other components if needed
export async function fetchWordList(): Promise<string[]> {
  try {
    const res = await fetch('/words.json');
    if (!res.ok) throw new Error('Failed to load words.json');
    const data = await res.json();
    const list: string[] = Array.isArray(data) ? data : (data.words ?? data.answers ?? []);
    return list.map((w: string) => w.toUpperCase()).filter((w: string) => w.length === 5);
  } catch (e) {
    console.warn('Could not load /public/words.json, using fallback word list.', e);
    return [];
  }
}

export async function fetchTodayWordleWord(allWords: string[]): Promise<string> {
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