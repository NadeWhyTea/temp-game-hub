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
    const response = await fetch('/nyt-answers.json');
    if (response.ok) {
      const answers = await response.json();
      const START_DATE = new Date(2021, 5, 19); // June 19, 2021
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const dayIndex = Math.floor((today.getTime() - START_DATE.getTime()) / 86400000);
      const word = answers[dayIndex % answers.length];
      return word.toUpperCase();
    }
  } catch {
    console.warn("Failed to fetch NYT answers, using random word");
  }
  return allWords[Math.floor(Math.random() * allWords.length)];
}