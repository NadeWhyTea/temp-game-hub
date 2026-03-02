"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  createGame,
  validateDigit,
  getScore,
  getPersonalBest,
  savePersonalBest,
  GameState,
} from "@/lib/games/game-logic";

export default function EDigitsGame() {
  const [gameState, setGameState] = useState<GameState>(createGame());
  const [personalBest, setPersonalBest] = useState(0);
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    setPersonalBest(getPersonalBest());
  }, []);

  useEffect(() => {
    if (gameState.isGameOver && !gameState.isWon) {
      const score = getScore(gameState);
      savePersonalBest(score);
      setPersonalBest(getPersonalBest());
    }
  }, [gameState]);

  const handleKeyPress = useCallback(
    (e: KeyboardEvent) => {
      if (gameState.isGameOver) return;

      if (e.key >= "0" && e.key <= "9") {
        setGameState((prev) => validateDigit(prev, e.key));
      }
    },
    [gameState.isGameOver]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [handleKeyPress]);

  const resetGame = () => {
    setGameState(createGame());
    setShowHint(false);
  };

  const score = getScore(gameState);
  const displayText = `2.${"71828182845904523536028747135".slice(0, Math.min(score + 30, 30))}`;
  const enteredDigits = gameState.currentIndex > 0 
    ? "71828182845904523536028747135".slice(0, gameState.currentIndex) 
    : "";

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex flex-col items-center p-4">
      <div className="w-full max-w-2xl">
        <div className="flex items-center justify-between mb-8">
          <Link
            href="/"
            className="text-white/70 hover:text-white transition-colors"
          >
            ← Back to Hub
          </Link>
          <h1 className="text-2xl font-bold text-white">e-Digits Memory</h1>
          <div className="w-20" />
        </div>

        <div className="text-center mb-8">
          <p className="text-gray-300 mb-2">
            Type the digits of e (Euler's number) one at a time.
          </p>
          <p className="text-sm text-gray-400">
            Starts with <span className="font-mono text-purple-300">2.</span> — you begin with the first digit after the decimal.
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-6 border border-white/20">
          <div className="text-center">
            <div className="mb-6">
              <span className="text-lg text-gray-400">Current Score</span>
              <div className="text-5xl font-bold text-white mt-2">{score}</div>
            </div>

            {personalBest > 0 && (
              <div className="mb-6">
                <span className="text-sm text-purple-300">
                  Personal Best: {personalBest}
                </span>
              </div>
            )}

            <div className="font-mono text-2xl sm:text-3xl tracking-wider text-white break-all leading-relaxed">
              <span className="text-purple-300">2.</span>
              {enteredDigits && (
                <span className="text-green-400">{enteredDigits}</span>
              )}
              <span className="animate-pulse">|</span>
            </div>
          </div>
        </div>

        {gameState.isGameOver && (
          <div className="bg-red-500/20 border border-red-500/50 rounded-xl p-6 text-center mb-6">
            {gameState.isWon ? (
              <>
                <h2 className="text-2xl font-bold text-green-400 mb-2">
                  Incredible! You won!
                </h2>
                <p className="text-gray-300">
                  You memorized all 1000 digits of e!
                </p>
              </>
            ) : (
              <>
                <h2 className="text-2xl font-bold text-red-400 mb-2">
                  Game Over!
                </h2>
                <p className="text-gray-300 mb-2">
                  You entered{" "}
                  <span className="font-mono text-red-300 text-xl">
                    {gameState.wrongDigit}
                  </span>{" "}
                  but should have entered{" "}
                  <span className="font-mono text-green-300 text-xl">
                    {"718281828459045235360287471352662497757247093699959574966967627724076630353547594571382178525166427427466391932003059921817413596629043572900334295260595630738132328627943490763233829880753195251019011573834187930702154089149934884167509244761460668082264800168477411853742345442437107539077744992069551702761838606261331384583000752044933826560297606737113200709328709127443747047230696977209310141692836819025515108657463772111252389784425056953696770785449969967946864454905987931636889230098793127736178215424999229576351482208269895193668033182528869398496465105820939239829488793320362509443117301238197068416140397019837679320683282376464804295311802328782509819455815301756717361332069811250996181881593041690351598888519345807273866738589422879228499892086805825749279610484198444363463244968487560233624827041978623209002160990235304369941849146314093431738143640546253152096183690888707601788033614048349476037895361643694787037077460895535814552681168680959178316066730281698266622440603073883405836647194635374766431825390715243161587324468441523816221256732157602252424405038264131900659608609521937344200681202834852336133103647272889277407328981986394964061334167179048593919704966562163852490613828362136305217341202130483836884216158572637053061932658946795058188699459632459801761815266408742062454452217691130370602570055874492866054430090709667460666757838867549291855342601877772123341258562102273502399136936871112665738452686206533485091520345956884743301703103350128933412559188612814869465898524716374432910732097182443193611673226317845400426429484519467856234917595220024625238592390846583365782492064546736556168690856551352246683089192463372918726086356201952096708078326382985955394538250272221932679775581441829359104406332917105782343812435636916473902144932571012838111482866795202277878354762063"[gameState.currentIndex]}
                  </span>
                </p>
                <p className="text-sm text-gray-400">
                  Score: {score} digit{score !== 1 ? "s" : ""} of e memorized
                </p>
              </>
            )}
          </div>
        )}

        <div className="flex gap-4 justify-center">
          <button
            onClick={resetGame}
            className="px-6 py-3 bg-purple-600 hover:bg-purple-500 text-white font-semibold rounded-lg transition-colors"
          >
            {gameState.isGameOver ? "Play Again" : "Restart"}
          </button>

          {!gameState.isGameOver && (
            <button
              onClick={() => setShowHint(!showHint)}
              className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg transition-colors"
            >
              {showHint ? "Hide Hint" : "Show Hint"}
            </button>
          )}
        </div>

        {showHint && !gameState.isGameOver && (
          <div className="mt-6 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg text-center">
            <p className="text-yellow-200 text-sm">
              Next digits: {"718281828459045235360287471352662497757247093699959574966967627724076630353547594571382178525166427427466391932003059921817413596629043572900334295260595630738132328627943490763233829880753195251019011573834187930702154089149934884167509244761460668082264800168477411853742345442437107539077744992069551702761838606261331384583000752044933826560297606737113200709328709127443747047230696977209310141692836819025515108657463772111252389784425056953696770785449969967946864454905987931636889230098793127736178215424999229576351482208269895193668033182528869398496465105820939239829488793320362509443117301238197068416140397019837679320683282376464804295311802328782509819455815301756717361332069811250996181881593041690351598888519345807273866738589422879228499892086805825749279610484198444363463244968487560233624827041978623209002160990235304369941849146314093431738143640546253152096183690888707601788033614048349476037895361643694787037077460895535814552681168680959178316066730281698266622440603073883405836647194635374766431825390715243161587324468441523816221256732157602252424405038264131900659608609521937344200681202834852336133103647272889277407328981986394964061334167179048593919704966562163852490613828362136305217341202130483836884216158572637053061932658946795058188699459632459801761815266408742062454452217691130370602570055874492866054430090709667460666757838867549291855342601877772123341258562102273502399136936871112665738452686206533485091520345956884743301703103350128933412559188612814869465898524716374432910732097182443193611673226317845400426429484519467856234917595220024625238592390846583365782492064546736556168690856551352246683089192463372918726086356201952096708078326382985955394538250272221932679775581441829359104406332917105782343812435636916473902144932571012838111482866795202277878354762063".slice(gameState.currentIndex, gameState.currentIndex + 10)}
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
