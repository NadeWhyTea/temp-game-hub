"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";

const defaultWords = ['ABOUT', 'CRANE', 'STARE', 'LIGHT', 'MONEY'];

type Difficulty = 'easy' | 'medium' | 'hard';
type LetterState = 'correct' | 'present' | 'absent' | 'empty';

interface EvaluatedGuess {
  word: string;
  states: LetterState[];
}

export default function WordleBattle() {
  const [words, setWords] = useState<string[]>([]);
  const [difficulty, setDifficulty] = useState<Difficulty>('medium');
  const [gameStarted, setGameStarted] = useState(false);
  const [targetWord, setTargetWord] = useState('');

  // Player state
  const [playerGuesses, setPlayerGuesses] = useState<EvaluatedGuess[]>([]);
  const [currentGuess, setCurrentGuess] = useState<string[]>([]);
  const [playerGameOver, setPlayerGameOver] = useState(false);
  const [playerWon, setPlayerWon] = useState(false);

  // AI state
  const [aiGuesses, setAiGuesses] = useState<EvaluatedGuess[]>([]);
  const [aiPossibleWords, setAiPossibleWords] = useState<string[]>([]);
  const [aiGameOver, setAiGameOver] = useState(false);
  const [aiWon, setAiWon] = useState(false);
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);

  const bothDone = playerGameOver && aiGameOver;

  useEffect(() => {
    const loadWords = async () => {
      try {
        const response = await fetch("/words.json");
        const data = await response.json();
        const list = Array.isArray(data) ? data : (data.words ?? data.answers ?? []);
        const five = list.map((w: string) => w.toUpperCase()).filter((w: string) => w.length === 5);
        setWords(five.length > 0 ? five : defaultWords);
      } catch {
        setWords(defaultWords);
      }
    };
    loadWords();
  }, []);

  const evaluateGuess = (guess: string, target: string): LetterState[] => {
    const states: LetterState[] = Array(5).fill('absent');
    const targetLetters = target.split('');
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
        targetLetters[targetLetters.indexOf(guessLetters[i])] = '_';
      }
    }
    return states;
  };

  const filterWords = (possible: string[], guesses: EvaluatedGuess[]): string[] => {
    return possible.filter(word => {
      for (const g of guesses) {
        for (let i = 0; i < 5; i++) {
          const gl = g.word[i];
          const wl = word[i];
          const s = g.states[i];
          if (s === 'correct' && wl !== gl) return false;
          if (s === 'absent' && word.includes(gl)) {
            const hasPresent = g.states.some((st, j) => st === 'present' && g.word[j] === gl);
            if (!hasPresent) return false;
          }
          if (s === 'present' && !word.includes(gl)) return false;
          if (s === 'present' && wl === gl) return false;
        }
      }
      return true;
    });
  };

  const scoreWord = (word: string, possible: string[]): number => {
    const freq: Record<string, number> = {};
    possible.forEach(w => [...new Set(w.split(''))].forEach(l => { freq[l] = (freq[l] || 0) + 1; }));
    return [...new Set(word.split(''))].reduce((sum, l) => sum + (freq[l] || 0), 0);
  };

  const pickAiWord = (possible: string[], diff: Difficulty): string => {
    if (diff === 'easy') {
      return possible[Math.floor(Math.random() * possible.length)];
    }
    const scored = [...possible].sort((a, b) => scoreWord(b, possible) - scoreWord(a, possible));
    if (diff === 'medium') {
      const top = scored.slice(0, 10);
      return top[Math.floor(Math.random() * top.length)];
    }
    // hard
    if (Math.random() < 0.2) {
      const top = scored.slice(0, 5);
      return top[Math.floor(Math.random() * top.length)];
    }
    return scored[0];
  };

  const startGame = useCallback(() => {
    if (words.length === 0) return;
    const word = words[Math.floor(Math.random() * words.length)];
    setTargetWord(word);
    setPlayerGuesses([]);
    setCurrentGuess([]);
    setPlayerGameOver(false);
    setPlayerWon(false);
    setAiGuesses([]);
    setAiPossibleWords([...words]);
    setAiGameOver(false);
    setAiWon(false);
    setIsPlayerTurn(true);
    setGameStarted(true);
  }, [words]);

  // AI takes its turn after player submits
  const runAiTurn = useCallback((currentAiGuesses: EvaluatedGuess[], currentPossible: string[], target: string) => {
    if (currentAiGuesses.length >= 6) {
      setAiGameOver(true);
      setIsPlayerTurn(true);
      return;
    }

    const possible = filterWords(currentPossible, currentAiGuesses);
    if (possible.length === 0) {
      setAiGameOver(true);
      setIsPlayerTurn(true);
      return;
    }

    const aiWord = pickAiWord(possible, difficulty);
    const states = evaluateGuess(aiWord, target);
    const newGuess: EvaluatedGuess = { word: aiWord, states };
    const newAiGuesses = [...currentAiGuesses, newGuess];

    setAiGuesses(newAiGuesses);
    setAiPossibleWords(possible);

    const won = aiWord === target;
    const over = won || newAiGuesses.length >= 6;

    if (won) setAiWon(true);
    if (over) setAiGameOver(true);

    setIsPlayerTurn(true);
  }, [difficulty]);

  const handleKeyPress = useCallback((key: string) => {
    if (!isPlayerTurn || playerGameOver || !gameStarted) return;

    if (key === 'ENTER') {
      if (currentGuess.length !== 5) return;
      const guessWord = currentGuess.join('');
      if (!words.includes(guessWord)) {
        alert('Not a valid word!');
        return;
      }

      const states = evaluateGuess(guessWord, targetWord);
      const newGuess: EvaluatedGuess = { word: guessWord, states };
      const newPlayerGuesses = [...playerGuesses, newGuess];
      setPlayerGuesses(newPlayerGuesses);
      setCurrentGuess([]);

      const won = guessWord === targetWord;
      const over = won || newPlayerGuesses.length >= 6;
      if (won) setPlayerWon(true);
      if (over) {
        setPlayerGameOver(true);
        // Still run AI turn unless AI is already done
        if (!aiGameOver) {
          setIsPlayerTurn(false);
          setTimeout(() => runAiTurn(aiGuesses, aiPossibleWords, targetWord), 800);
        }
        return;
      }

      // Switch to AI turn
      setIsPlayerTurn(false);
      setTimeout(() => runAiTurn(aiGuesses, aiPossibleWords, targetWord), 800);

    } else if (key === 'BACK' || key === 'BACKSPACE') {
      setCurrentGuess(prev => prev.slice(0, -1));
    } else if (key.length === 1 && key >= 'A' && key <= 'Z' && currentGuess.length < 5) {
      setCurrentGuess(prev => [...prev, key]);
    }
  }, [isPlayerTurn, playerGameOver, gameStarted, currentGuess, words, targetWord, playerGuesses, aiGuesses, aiPossibleWords, aiGameOver, runAiTurn]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => handleKeyPress(e.key.toUpperCase());
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [handleKeyPress]);

  const getTileColor = (state: LetterState): string => {
    switch (state) {
      case 'correct': return 'bg-green-500 border-green-500 text-white';
      case 'present': return 'bg-yellow-500 border-yellow-500 text-white';
      case 'absent':  return 'bg-gray-600 border-gray-600 text-white';
      default:        return 'bg-gray-800 border-gray-600 text-gray-300';
    }
  };

  const getWinnerMessage = () => {
    if (!bothDone) return null;
    if (playerWon && aiWon) {
      return playerGuesses.length <= aiGuesses.length ? "You Win! 🎉" : "AI Wins! 🤖";
    }
    if (playerWon) return "You Win! 🎉";
    if (aiWon) return "AI Wins! 🤖";
    return "Draw! 🤝";
  };

  const KEYBOARD_ROWS = [
    ['Q','W','E','R','T','Y','U','I','O','P'],
    ['A','S','D','F','G','H','J','K','L'],
    ['ENTER','Z','X','C','V','B','N','M','BACK'],
  ];

  if (!gameStarted) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex flex-col items-center justify-center p-4">
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">Wordle Battle</h1>
            <p className="text-gray-300">Play against AI — same word, who solves it faster?</p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
            <h2 className="text-xl font-bold text-white mb-6 text-center">Select Difficulty</h2>
            <div className="flex flex-col gap-3 mb-8">
              {(['easy', 'medium', 'hard'] as Difficulty[]).map(d => (
                <button
                  key={d}
                  onClick={() => setDifficulty(d)}
                  className={`px-8 py-3 rounded-lg font-bold transition-all capitalize ${
                    difficulty === d
                      ? d === 'easy' ? 'bg-green-600 text-white'
                        : d === 'medium' ? 'bg-yellow-600 text-white'
                        : 'bg-red-600 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
            <button
              onClick={startGame}
              disabled={words.length === 0}
              className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-bold py-3 px-8 rounded-lg transition-colors"
            >
              {words.length === 0 ? 'Loading...' : 'Start Battle'}
            </button>
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

  const renderBoard = (guessHistory: EvaluatedGuess[], isPlayer: boolean) => {
    const activeRow = guessHistory.length;
    return (
      <div className="grid grid-rows-6 gap-1">
        {Array.from({ length: 6 }).map((_, rowIndex) => {
          const completedGuess = guessHistory[rowIndex];
          const isActive = isPlayer && rowIndex === activeRow && !playerGameOver;
          return (
            <div key={rowIndex} className="grid grid-cols-5 gap-1">
              {Array.from({ length: 5 }).map((_, colIndex) => {
                const letter = completedGuess
                  ? completedGuess.word[colIndex]
                  : isActive
                  ? currentGuess[colIndex] || ''
                  : '';
                const state: LetterState = completedGuess ? completedGuess.states[colIndex] : 'empty';
                return (
                  <div
                    key={colIndex}
                    className={`w-10 h-10 flex items-center justify-center rounded text-sm font-bold border-2 ${getTileColor(state)}`}
                  >
                    {letter}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex flex-col items-center p-4">
      <div className="w-full max-w-2xl">
        <div className="flex items-center justify-between mb-4">
          <Link href="/games/wordle" className="text-white/70 hover:text-white transition-colors text-sm">
            ← Back to Wordle Games
          </Link>
          <h1 className="text-xl font-bold text-white">Wordle Battle</h1>
          <span className="text-xs text-gray-400 capitalize">{difficulty}</span>
        </div>

        {/* Winner banner */}
        {bothDone && (
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 mb-4 border border-white/20 text-center">
            <div className="text-2xl font-bold text-white mb-1">{getWinnerMessage()}</div>
            <div className="text-sm text-gray-300">
              The word was <span className="font-bold text-green-400">{targetWord}</span>
            </div>
          </div>
        )}

        {/* Turn indicator */}
        {!bothDone && (
          <div className="text-center mb-3">
            <span className={`text-sm font-semibold px-3 py-1 rounded-full ${
              isPlayerTurn ? 'bg-blue-600/30 text-blue-300' : 'bg-purple-600/30 text-purple-300'
            }`}>
              {isPlayerTurn ? 'Your Turn' : 'AI is thinking...'}
            </span>
          </div>
        )}

        {/* Boards */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/20">
            <div className="text-center text-sm font-semibold text-white mb-2">
              You {playerWon ? '✅' : playerGameOver ? '❌' : ''}
            </div>
            {renderBoard(playerGuesses, true)}
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/20">
            <div className="text-center text-sm font-semibold text-white mb-2">
              AI {aiWon ? '✅' : aiGameOver ? '❌' : ''}
            </div>
            {renderBoard(aiGuesses, false)}
          </div>
        </div>

        {/* Keyboard */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 mb-4 border border-white/20">
          {KEYBOARD_ROWS.map((row, rowIndex) => (
            <div key={rowIndex} className="flex justify-center gap-1 mb-1">
              {row.map(key => (
                <button
                  key={key}
                  onClick={() => handleKeyPress(key)}
                  disabled={!isPlayerTurn || playerGameOver}
                  className={`py-2 rounded font-semibold text-xs transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                    key === 'ENTER' || key === 'BACK' ? 'px-2 bg-gray-600 text-white' : 'px-2 bg-gray-700 text-white hover:bg-gray-500'
                  }`}
                >
                  {key === 'BACK' ? '⌫' : key}
                </button>
              ))}
            </div>
          ))}
        </div>

        {/* Action buttons */}
        <div className="flex gap-2 justify-center">
          <button
            onClick={startGame}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white text-sm font-semibold rounded transition-colors"
          >
            New Game
          </button>
          <Link
            href="/games/wordle"
            className="px-4 py-2 bg-gray-600 hover:bg-gray-500 text-white text-sm font-semibold rounded transition-colors"
          >
            Game Menu
          </Link>
        </div>
      </div>
    </main>
  );
}