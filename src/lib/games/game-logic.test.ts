import { describe, it, expect } from 'vitest'
import { createGame, validateDigit, getScore, E_DIGITS } from '@/lib/games/game-logic'

describe('e-digits game logic', () => {
  it('should create a new game with initial state', () => {
    const game = createGame()
    expect(game.currentIndex).toBe(0)
    expect(game.isGameOver).toBe(false)
    expect(game.isWon).toBe(false)
    expect(game.wrongDigit).toBe(null)
  })

  it('should accept correct first digit (7)', () => {
    const game = createGame()
    const result = validateDigit(game, '7')
    expect(result.currentIndex).toBe(1)
    expect(result.isGameOver).toBe(false)
  })

  it('should accept correct second digit (1)', () => {
    const game = createGame()
    const step1 = validateDigit(game, '7')
    const result = validateDigit(step1, '1')
    expect(result.currentIndex).toBe(2)
    expect(result.isGameOver).toBe(false)
  })

  it('should end game on wrong digit', () => {
    const game = createGame()
    const result = validateDigit(game, '5') // First digit should be 7
    expect(result.isGameOver).toBe(true)
    expect(result.wrongDigit).toBe('5')
  })

  it('should calculate score correctly', () => {
    const game = createGame()
    const step1 = validateDigit(game, '7')
    const step2 = validateDigit(step1, '1')
    expect(getScore(step2)).toBe(2)
  })

  it('should accept the first 10 digits correctly', () => {
    const digits = '7182818284' // First 10 digits of e after decimal
    let game = createGame()
    
    for (const digit of digits) {
      game = validateDigit(game, digit)
      expect(game.isGameOver).toBe(false)
    }
    
    expect(game.currentIndex).toBe(10)
  })

  it('should not accept non-digit input', () => {
    const game = createGame()
    const result = validateDigit(game, 'a')
    expect(result.currentIndex).toBe(0)
    expect(result.isGameOver).toBe(false)
  })
})
