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

export async function createWordleGame(useTodayWord: boolean = true): Promise<WordleState> {
  const allWords = await fetchWordList();

  const targetWord = useTodayWord
    ? await fetchTodayWordleWord(allWords)
    : allWords[Math.floor(Math.random() * allWords.length)];

  return {
    targetWord,
    guesses: [],
    currentGuess: '',
    isGameOver: false,
    isWon: false,
    possibleWords: [...allWords],
    allWords,
    isLoading: false,
    useTodayWord,
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