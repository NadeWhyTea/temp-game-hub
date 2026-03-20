
"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";

const defaultWords = ["apple", "baker", "crane", "drive", "earth"];

const WordlePracticePage = () => {
  const [words, setWords] = useState<string[]>([]);
  const [currentWord, setCurrentWord] = useState<string>("");
  const [guesses, setGuesses] = useState<string[][]>(Array(6).fill([]));
  const [currentGuess, setCurrentGuess] = useState<string[]>([]);
  const [currentRow, setCurrentRow] = useState<number>(0);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [gameWon, setGameWon] = useState<boolean>(false);
  const [stats, setStats] = useState({
    totalGames: 0,
    wins: 0,
    totalGuesses: 0,
    guessDistribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 },
  });
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
        setWords(defaultWords.map((word) => word.toUpperCase()));
      }
    };
    loadWords();

    // Load stats from localStorage
    const storedStats = localStorage.getItem("wordle-practice-stats");
    if (storedStats) {
      setStats(JSON.parse(storedStats));
    }
  }, []);

  useEffect(() => {
    if (words.length > 0 && !currentWord) {
      startNewGame();
    }
  }, [words, currentWord]);

  useEffect(() => {
    localStorage.setItem("wordle-practice-stats", JSON.stringify(stats));
  }, [stats]);

  const startNewGame = useCallback(() => {
    if (words.length === 0) return;
    const randomIndex = Math.floor(Math.random() * words.length);
    setCurrentWord(words[randomIndex]);
    setGuesses(Array(6).fill([]));
    setCurrentGuess([]);
    setCurrentRow(0);
    setGameOver(false);
    setGameWon(false);
  }, [words]);

  const handleKeyPress = useCallback(
    (key: string) => {
      if (gameOver) return;

      if (key === "ENTER") {
        if (currentGuess.length !== 5) return;
        if (!words.includes(currentGuess.join(""))) {
          alert("Not a valid word!");
          return;
        }

        const newGuesses = [...guesses];
        newGuesses[currentRow] = currentGuess;
        setGuesses(newGuesses);

        if (currentGuess.join("") === currentWord) {
          setGameWon(true);
          setGameOver(true);
          setStats((prevStats) => ({
            ...prevStats,
            totalGames: prevStats.totalGames + 1,
            wins: prevStats.wins + 1,
            totalGuesses: prevStats.totalGuesses + currentRow + 1,
            guessDistribution: {
              ...prevStats.guessDistribution,
              [(currentRow + 1).toString()]: (prevStats.guessDistribution as any)[currentRow + 1] + 1,
            },
          }));
        } else if (currentRow === 5) {
          setGameOver(true);
          setStats((prevStats) => ({
            ...prevStats,
            totalGames: prevStats.totalGames + 1,
          }));
        } else {
          setCurrentRow((prevRow) => prevRow + 1);
          setCurrentGuess([]);
        }
      } else if (key === "BACKSPACE") {
        setCurrentGuess((prevGuess) => prevGuess.slice(0, -1));
      } else if (currentGuess.length < 5 && key.length === 1 && key >= "A" && key <= "Z") {
        setCurrentGuess((prevGuess) => [...prevGuess, key]);
      }
    },
    [currentGuess, currentRow, gameOver, currentWord, guesses, words, stats]
  );

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      handleKeyPress(event.key.toUpperCase());
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyPress]);

  const getTileClass = (letter: string, index: number, guess: string[]) => {
    if (currentRow <= guesses.indexOf(guess) && guesses[guesses.indexOf(guess)][index] !== undefined) {
      if (currentWord[index] === letter) {
        return "bg-green-500"; // Correct letter, correct position
      } else if (currentWord.includes(letter)) {
        return "bg-yellow-500"; // Correct letter, wrong position
      } else {
        return "bg-gray-700"; // Incorrect letter
      }
    }
    return "bg-gray-800"; // Default empty tile
  };

  const keyboardRows = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "BACKSPACE"],
  ];

  const calculateWinRate = () => {
    if (stats.totalGames === 0) return "0%";
    return ((stats.wins / stats.totalGames) * 100).toFixed(2) + "%";
  };

  const calculateAverageGuesses = () => {
    if (stats.wins === 0) return 0;
    return (stats.totalGuesses / stats.wins).toFixed(2);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-900 to-gray-900 text-white p-4">
      <h1 className="text-4xl font-bold mb-8">Wordle Practice</h1>

      <div className="grid grid-rows-6 gap-1 mb-8">
        {guesses.map((guess, rowIndex) => (
          <div key={rowIndex} className="grid grid-cols-5 gap-1">
            {(rowIndex === currentRow ? currentGuess : guess).map((letter, colIndex) => (
              <div
                key={colIndex}
                className={`w-14 h-14 flex items-center justify-center rounded-md text-2xl font-bold ${getTileClass(letter, colIndex, guess)}`}
              >
                {letter}
              </div>
            ))}
            {Array(5 - (rowIndex === currentRow ? currentGuess : guess).length)
              .fill(null)
              .map((_, colIndex) => (
                <div
                  key={colIndex + (rowIndex === currentRow ? currentGuess : guess).length}
                  className="w-14 h-14 flex items-center justify-center rounded-md bg-gray-800 border-2 border-gray-600 text-2xl font-bold"
                ></div>
              ))}
          </div>
        ))}
      </div>

      {gameOver && (
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center mb-8">
          <h2 className="text-2xl font-bold mb-4">
            {gameWon ? "You won!" : "Game Over!"}
          </h2>
          <p className="text-xl mb-4">
            The word was: <span className="font-bold">{currentWord}</span>
          </p>
          {gameWon && (
            <p className="text-xl mb-4">
              You guessed it in {currentRow + 1} guesses!
            </p>
          )}
          <div className="flex justify-center space-x-4">
            <button
              onClick={startNewGame}
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
              Next Word
            </button>
            <button
              onClick={() => router.push("/games/wordle")}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Back to Wordle Games
            </button>
          </div>
        </div>
      )}

      <div className="keyboard mb-8">
        {keyboardRows.map((row, rowIndex) => (
          <div key={rowIndex} className="flex justify-center my-1 space-x-1">
            {row.map((key) => (
              <button
                key={key}
                onClick={() => handleKeyPress(key)}
                className={`w-10 h-14 flex items-center justify-center rounded-md text-lg font-bold ${key === "ENTER" || key === "BACKSPACE" ? "w-20 bg-gray-600" : "bg-gray-700"} hover:bg-gray-500`}
              >
                {key}
              </button>
            ))}
          </div>
        ))}
      </div>

      <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center">
        <h2 className="text-2xl font-bold mb-4">Stats</h2>
        <p>
          Total Games Played: <span className="font-bold">{stats.totalGames}</span>
        </p>
        <p>
          Win Rate: <span className="font-bold">{calculateWinRate()}</span>
        </p>
        <p>
          Average Guesses (for wins): <span className="font-bold">{calculateAverageGuesses()}</span>
        </p>
        <p className="mt-4">Guess Distribution:</p>
        <div className="flex justify-center space-x-2">
          {Object.entries(stats.guessDistribution).map(([key, value]) => (
            <div key={key} className="flex flex-col items-center">
              <span className="text-lg font-bold">{key}</span>
              <span>{value}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8">
        <button
          onClick={() => router.push("/games/wordle")}
          className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
        >
          Back to Wordle Games
        </button>
      </div>
    </div>
  );
};

export default WordlePracticePage;
