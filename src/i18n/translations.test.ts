import { describe, expect, it } from 'vitest'
import { translations } from './translations'

describe('translations', () => {
  it('provides localized win messages with singular and plural move counts', () => {
    expect(translations.es.winMessage(1)).toBe('¡Lo lograste en 1 movimiento!')
    expect(translations.es.winMessage(3)).toBe('¡Lo lograste en 3 movimientos!')
    expect(translations.en.winMessage(1)).toBe('You won in 1 move!')
    expect(translations.en.winMessage(3)).toBe('You won in 3 moves!')
  })

  it('provides localized best results with singular and plural move counts', () => {
    expect(translations.es.bestResult(1)).toBe('Tu mejor partida: 1 movimiento')
    expect(translations.es.bestResult(12)).toBe('Tu mejor partida: 12 movimientos')
    expect(translations.en.bestResult(1)).toBe('Your best game: 1 move')
    expect(translations.en.bestResult(12)).toBe('Your best game: 12 moves')
  })
})
