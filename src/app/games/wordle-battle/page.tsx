"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const defaultWords = ['ABOUT', 'CRANE', 'STARE', 'LIGHT', 'MONEY'];

type Difficulty = 'easy' | 'medium' | 'hard';

export default function WordleBattle() {
  const [words, setWords] = useState<string[]>([]);
  const [difficulty, setDifficulty] = useState<Difficulty>('medium');
  const [gameStarted, setGameStarted] = useState(false);
  const [targetWord, setTargetWord] = useState('');
  const [guesses, setGuesses] = useState<string[][]>(Array(6).fill([]));
  const [currentGuess, setCurrentGuess] = useState<string[]>([]);
  const [currentRow, setCurrentRow] = useState<number>(0);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [gameWon, setGameWon] = useState<boolean>(false);
  
  // AI state
  const [aiGuesses, setAiGuesses] = useState<string[][]>(Array(6).fill([]));
  const [aiCurrentGuess, setAiCurrentGuess] = useState<string[]>([]);
  const [aiCurrentRow, setAiCurrentRow] = useState<number>(0);
  const [aiGameOver, setAiGameOver] = useState<boolean>(false);
  const [aiGameWon, setAiGameWon] = useState<boolean>(false);
  const [isPlayerTurn, setIsPlayerTurn] = useState<boolean>(true);
  const [aiPossibleWords, setAiPossibleWords] = useState<string[]>([]);
  
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
    
    // Reset player state
    setGuesses(Array(6).fill([]));
    setCurrentGuess([]);
    setCurrentRow(0);
    setGameOver(false);
    setGameWon(false);
    
    // Reset AI state
    setAiGuesses(Array(6).fill([]));
    setAiCurrentGuess([]);
    setAiCurrentRow(0);
    setAiGameOver(false);
    setAiGameWon(false);
    setIsPlayerTurn(true);
    setAiPossibleWords(words.filter(word => word !== words[randomIndex]));
    
    setGameStarted(true);
  };

  // AI scoring function
  const scoreWord = (word: string, possibleWords: string[]): number => {
    const freq: Record<string, number> = {};
    possibleWords.forEach((w) => {
      [...new Set(w.split(''))].forEach((l) => {
        freq[l] = (freq[l] || 0) + 1;
      });
    });
    return [...new Set(word.split(''))].reduce((sum, l) => sum + (freq[l] || 0), 0);
  };

  // AI turn logic
  const aiMakeGuess = () => {
    if (aiPossibleWords.length === 0) return;
    
    let selectedWord: string;
    
    if (difficulty === 'easy') {
      // Easy: picks randomly from remaining possible words
      const randomIndex = Math.floor(Math.random() * aiPossibleWords.length);
      selectedWord = aiPossibleWords[randomIndex];
    } else if (difficulty === 'medium') {
      // Medium: scores all remaining words, picks randomly from top 10
      const scoredWords = aiPossibleWords.map(word => ({
        word,
        score: scoreWord(word, aiPossibleWords)
      })).sort((a, b) => b.score - a.score);
      const topWords = scoredWords.slice(0, 10);
      const randomIndex = Math.floor(Math.random() * topWords.length);
      selectedWord = topWords[randomIndex].word;
    } else {
      // Hard: scores all remaining words, always picks top scoring word but with 20% chance to pick from top 5
      const scoredWords = aiPossibleWords.map(word => ({
        word,
        score: scoreWord(word, aiPossibleWords)
      })).sort((a, b) => b.score - a.score);
      
      if (Math.random() < 0.2) {
        // 20% chance: pick from top 5
        const topWords = scoredWords.slice(0, 5);
        const randomIndex = Math.floor(Math.random() * topWords.length);
        selectedWord = topWords[randomIndex].word;
      } else {
        // 80% chance: pick top scoring word
        selectedWord = scoredWords[0].word;
      }
    }
    
    // Update AI guess
    const newAiGuesses = [...aiGuesses];
    newAiGuesses[aiCurrentRow] = selectedWord.split('');
    setAiGuesses(newAiGuesses);
    setAiCurrentGuess(selectedWord.split(''));
    
    // Simulate thinking delay
    setTimeout(() => {
      setIsPlayerTurn(true);
    }, 800);
  };

  const evaluateGuess = (guess: string, target: string): ('correct' | 'present' | 'absent')[] => {
    const result: ('correct' | 'present' | 'absent')[] = Array(target.length).fill('absent');
    const targetLetters = target.split('');
    const guessLetters = guess.split('');

    // Mark correct letters first
    for (let i = 0; i < target.length; i++) {
      if (guessLetters[i] === targetLetters[i]) {
        result[i] = 'correct';
        targetLetters[i] = '_';
        guessLetters[i] = '_';
      }
    }

    // Mark present letters
    for (let i = 0; i < target.length; i++) {
      if (guessLetters[i] !== '_' && targetLetters.includes(guessLetters[i])) {
        result[i] = 'present';
        const targetIndex = targetLetters.indexOf(guessLetters[i]);
        if (targetIndex !== -1) {
          targetLetters[targetIndex] = '_';
        }
      }
    }

    return result;
  };

  const handleKeyPress = useCallback(
    (pressedKey: string) => {
      // Handle AI turn
      if (!isPlayerTurn && !gameOver && gameStarted) {
        return; // AI is thinking, don't allow input
      }

      if (gameOver || !gameStarted) return;

      if (pressedKey === 'ENTER') {
        if (isPlayerTurn) {
          // Player's turn
          if (currentGuess.length !== 5) return;
          if (!words.includes(currentGuess.join(''))) {
            alert('Not a valid word!');
            return;
          }

          const newGuesses = [...guesses];
          newGuesses[currentRow] = currentGuess;
          setGuesses(newGuesses);

          if (currentGuess.join('') === targetWord) {
            setGameWon(true);
            setGameOver(true);
          } else if (currentRow === 5) {
            setGameOver(true);
          } else {
            setCurrentRow((prevRow) => prevRow + 1);
            setCurrentGuess([]);
          }

          // Filter AI possible words based on player's guess
          const newAiPossibleWords = aiPossibleWords.filter(word => {
            for (let i = 0; i < 5; i++) {
              const guessLetter = currentGuess[i];
              const targetLetter = targetWord[i];
              const wordLetter = word[i];
              
              if (guessLetter === targetLetter && wordLetter !== targetLetter) {
                return false; // Word has letter in correct position but Player's guess was wrong
              }
              if (guessLetter === targetLetter && wordLetter !== targetLetter) {
                return false; // Word has letter in wrong position but Player's guess had it there
              }
            }
            return true;
          });
          setAiPossibleWords(newAiPossibleWords);

          // Switch to AI turn
          setIsPlayerTurn(false);
          setTimeout(() => {
            aiMakeGuess();
          }, 800);
        }
      } else if (pressedKey === 'BACK') {
        setCurrentGuess((prevGuess) => prevGuess.slice(0, -1));
      } else if (currentGuess.length < 5 && pressedKey.length === 1 && pressedKey >= 'A' && pressedKey <= 'Z') {
        setCurrentGuess((prevGuess) => [...prevGuess, pressedKey]);
      }
    },
    [isPlayerTurn, gameOver, gameStarted, currentGuess, currentRow, targetWord, aiPossibleWords]
  );

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      handleKeyPress(event.key.toUpperCase());
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyPress]);

  const getTileClass = (state: 'correct' | 'present' | 'absent') => {
    switch (state) {
      case 'correct':
        return 'bg-green-500 text-white';
      case 'present':
        return 'bg-yellow-500 text-white';
      case 'absent':
        return 'bg-gray-700 text-white';
      default:
        return 'bg-gray-800 text-gray-300';
    }
  };

  const keyboardRows = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'BACK'],
  ];

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
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
}
