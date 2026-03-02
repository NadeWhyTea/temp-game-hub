import { E_DIGITS } from './e-digits'
export { E_DIGITS }

export type GameMode = 'main' | 'practice'

export interface GameState {
  currentIndex: number
  isGameOver: boolean
  isWon: boolean
  wrongDigit: string | null
  mode: GameMode
  practiceRevealedCount: number
}

export function createGame(mode: GameMode = 'main', practiceRevealedCount: number = 0): GameState {
  return {
    currentIndex: 0,
    isGameOver: false,
    isWon: false,
    wrongDigit: null,
    mode,
    practiceRevealedCount,
  }
}

export function validateDigit(gameState: GameState, digit: string): GameState {
  if (gameState.isGameOver || !/^\d$/.test(digit)) {
    return gameState
  }

  const expectedDigit = E_DIGITS[gameState.currentIndex]

  if (digit !== expectedDigit) {
    return {
      ...gameState,
      isGameOver: true,
      wrongDigit: digit,
    }
  }

  const newIndex = gameState.currentIndex + 1
  const isWon = newIndex >= E_DIGITS.length

  return {
    ...gameState,
    currentIndex: newIndex,
    isGameOver: isWon,
    isWon,
  }
}

export function getScore(gameState: GameState): number {
  return gameState.currentIndex
}

export function getPersonalBest(): number {
  if (typeof window === 'undefined') return 0
  const stored = localStorage.getItem('e-digits-best')
  return stored ? parseInt(stored, 10) : 0
}

export function savePersonalBest(score: number): void {
  if (typeof window === 'undefined') return
  const current = getPersonalBest()
  if (score > current) {
    localStorage.setItem('e-digits-best', score.toString())
  }
}

export function getDisplayDigits(gameState: GameState, windowSize: number = 30): string {
  const start = Math.max(0, gameState.currentIndex - Math.floor(windowSize / 2))
  const end = Math.min(E_DIGITS.length, start + windowSize)
  return E_DIGITS.slice(start, end)
}

export function getCursorPosition(gameState: GameState, windowSize: number = 30): number {
  const start = Math.max(0, gameState.currentIndex - Math.floor(windowSize / 2))
  return gameState.currentIndex - start
}

export function getRevealedDigits(count: number): string {
  return E_DIGITS.slice(0, count)
}

export function getPersonalBestForMode(mode: GameMode): number {
  if (typeof window === 'undefined') return 0
  const key = mode === 'main' ? 'e-digits-best' : 'e-digits-best-practice'
  const stored = localStorage.getItem(key)
  return stored ? parseInt(stored, 10) : 0
}

export function savePersonalBestForMode(score: number, mode: GameMode): void {
  if (typeof window === 'undefined') return
  const key = mode === 'main' ? 'e-digits-best' : 'e-digits-best-practice'
  const current = getPersonalBestForMode(mode)
  if (score > current) {
    localStorage.setItem(key, score.toString())
  }
}
