"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";

export type LetterState = 'correct' | 'present' | 'absent' | 'empty';

export interface Guess {
  word: string;
  states: LetterState[];
  timeTaken?: number;
}

export interface SpeedWordleState {
  targetWord: string;
  guesses: Guess[];
  currentGuess: string;
  isGameOver: boolean;
  isWon: boolean;
  timeLeft: number;
  gameStarted: boolean;
  streak: number;
  bestTime: number;
}

const KEYBOARD_ROWS = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'BACK']
];

const SPEED_WORDS = [
  'ABOUT', 'AFTER', 'AGAIN', 'BELOW', 'COULD', 'EVERY', 'FIRST', 'FOUND', 'GREAT', 'HOUSE',
  'JUICE', 'KNIFE', 'LIGHT', 'MONEY', 'NIGHT', 'OCEAN', 'PIZZA', 'QUEEN', 'RADIO', 'STONE',
  'TIGER', 'UNDER', 'VOICE', 'WATER', 'YOUNG', 'ZEBRA', 'BRAVE', 'CLOUD', 'DREAM', 'EAGLE',
  'FLAME', 'GRAPE', 'HAPPY', 'ISLAND', 'JOKER', 'KNOCK', 'LEMON', 'MAGIC', 'NOISY', 'ORANGE'
];

const GAME_TIME = 120; // 2 minutes per round

export default function SpeedWordle() {
  const [gameState, setGameState] = useState<SpeedWordleState>({
    targetWord: '',
    guesses: [],
    currentGuess: '',
    isGameOver: false,
    isWon: false,
    timeLeft: GAME_TIME,
    gameStarted: false,
    streak: 0,
    bestTime: 0
  });

  const [roundStartTime, setRoundStartTime] = useState<number>(0);

  const startGame = useCallback(() => {
    const targetWord = SPEED_WORDS[Math.floor(Math.random() * SPEED_WORDS.length)];
    setRoundStartTime(Date.now());
    setGameState(prev => ({
      ...prev,
      targetWord,
      guesses: [],
      currentGuess: '',
      isGameOver: false,
      isWon: false,
      timeLeft: GAME_TIME,
      gameStarted: true
    }));
  }, []);

  const evaluateGuess = useCallback((guess: string, target: string): LetterState[] => {
    const result: LetterState[] = new Array(target.length).fill('empty');
    const targetLetters: (string | null)[] = target.split('');
    const guessLetters = guess.split('');

    guessLetters.forEach((letter, index) => {
      if (targetLetters[index] === letter) {
        result[index] = 'correct';
        targetLetters[index] = null;
      }
    });

    guessLetters.forEach((letter, index) => {
      if (result[index] === 'empty' && targetLetters.includes(letter as string)) {
        result[index] = 'present';
        const targetIndex = targetLetters.indexOf(letter);
        if (targetIndex !== -1) {
          targetLetters[targetIndex] = null;
        }
      }
    });

    return result.map((state, index) => 
      state === 'empty' ? 'absent' : state
    );
  }, []);

  const submitGuess = useCallback(() => {
    if (gameState.currentGuess.length !== 5 || gameState.isGameOver) {
      return;
    }

    const timeTaken = Math.round((Date.now() - roundStartTime) / 1000);
    const states = evaluateGuess(gameState.currentGuess, gameState.targetWord);
    const newGuess: Guess = { word: gameState.currentGuess, states, timeTaken };
    const newGuesses = [...gameState.guesses, newGuess];

    const isWon = gameState.currentGuess === gameState.targetWord;
    const isGameOver = isWon || newGuesses.length >= 6;

    if (isWon) {
      const newBestTime = gameState.bestTime === 0 || timeTaken < gameState.bestTime ? timeTaken : gameState.bestTime;
      setGameState(prev => ({
        ...prev,
        guesses: newGuesses,
        currentGuess: '',
        isGameOver,
        isWon,
        gameStarted: false,
        streak: prev.streak + 1,
        bestTime: newBestTime
      }));
    } else if (isGameOver) {
      setGameState(prev => ({
        ...prev,
        guesses: newGuesses,
        currentGuess: '',
        isGameOver,
        isWon,
        gameStarted: false,
        streak: 0
      }));
    } else {
      setGameState({
        ...gameState,
        guesses: newGuesses,
        currentGuess: ''
      });
    }
  }, [gameState, roundStartTime, evaluateGuess]);

  const addLetter = useCallback((letter: string) => {
    if (gameState.currentGuess.length < 5 && !gameState.isGameOver && gameState.gameStarted) {
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

  // Timer effect
  useEffect(() => {
    if (!gameState.gameStarted || gameState.isGameOver) return;

    const timer = setInterval(() => {
      setGameState(prev => {
        if (prev.timeLeft <= 1) {
          return {
            ...prev,
            timeLeft: 0,
            isGameOver: true,
            gameStarted: false,
            streak: 0
          };
        }
        return { ...prev, timeLeft: prev.timeLeft - 1 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameState.gameStarted, gameState.isGameOver]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex flex-col items-center p-4">
      <div className="max-w-2xl w-full">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-white mb-2">⚡ Speed Wordle</h1>
          
          {/* Stats Bar */}
          <div className="flex justify-center gap-4 mb-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2 border border-white/20">
              <div className="text-xs text-gray-400">Time</div>
              <div className={`text-lg font-bold ${
                gameState.timeLeft <= 30 ? 'text-red-400' : 
                gameState.timeLeft <= 60 ? 'text-yellow-400' : 'text-green-400'
              }`}>
                {formatTime(gameState.timeLeft)}
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2 border border-white/20">
              <div className="text-xs text-gray-400">Streak</div>
              <div className="text-lg font-bold text-orange-400">{gameState.streak}</div>
            </div>
            {gameState.bestTime > 0 && (
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2 border border-white/20">
                <div className="text-xs text-gray-400">Best Time</div>
                <div className="text-lg font-bold text-purple-400">{formatTime(gameState.bestTime)}</div>
              </div>
            )}
          </div>
        </div>

        {!gameState.gameStarted && !gameState.isGameOver && (
          <div className="text-center mb-6">
            <button
              onClick={startGame}
              className="px-8 py-3 bg-yellow-500 hover:bg-yellow-400 text-white font-bold rounded-lg transition-colors text-lg"
            >
              Start Speed Round
            </button>
          </div>
        )}

        {gameState.gameStarted && (
          <>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 mb-4 border border-white/20">
              <div className="grid gap-2 mb-4 justify-center">
                {Array.from({ length: 6 }).map((_, rowIndex) => (
                  <div key={rowIndex} className="flex gap-2 justify-center">
                    {Array.from({ length: 5 }).map((_, colIndex) => (
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
                {Array.from({ length: 5 }).map((_, index) => (
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
          </>
        )}

        {gameState.isGameOver && (
          <div className="text-center mt-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 mb-4">
              <h2 className={`text-2xl font-bold mb-2 ${
                gameState.isWon ? 'text-green-400' : 'text-red-400'
              }`}>
                {gameState.isWon ? '🎉 Speed Master!' : '⏰ Time\'s Up!'}
              </h2>
              {gameState.isWon && gameState.guesses[gameState.guesses.length - 1]?.timeTaken && (
                <p className="text-white mb-4">
                  Time: <span className="font-bold text-yellow-400">
                    {formatTime(gameState.guesses[gameState.guesses.length - 1].timeTaken!)}
                  </span>
                </p>
              )}
              <p className="text-white mb-4">
                The word was: <span className="font-bold">{gameState.targetWord}</span>
              </p>
              <div className="flex gap-2 justify-center">
                <button
                  onClick={startGame}
                  className="px-6 py-2 bg-yellow-500 hover:bg-yellow-400 text-white font-bold rounded-lg transition-colors"
                >
                  Next Round
                </button>
                <Link
                  href="/games/wordle"
                  className="px-6 py-2 bg-gray-600 hover:bg-gray-500 text-white font-bold rounded-lg transition-colors"
                >
                  Game Menu
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
