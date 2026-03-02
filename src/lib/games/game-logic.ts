import { E_DIGITS } from './e-digits'
export { E_DIGITS }

export interface GameState {
  currentIndex: number
  isGameOver: boolean
  isWon: boolean
  wrongDigit: string | null
}

export function createGame(): GameState {
  return {
    currentIndex: 0,
    isGameOver: false,
    isWon: false,
    wrongDigit: null,
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
