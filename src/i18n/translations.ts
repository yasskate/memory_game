import type { Difficulty } from '../game/types'

export type Language = 'es' | 'en'

export interface TranslationStrings {
  eyebrow: string
  title: string
  intro: string
  languageLabel: string
  movesLabel: string
  bestLabel: string
  noBest: string
  newGame: string
  difficultyLabel: string
  difficulties: Record<Difficulty, string>
  boardLabel: string
  hiddenCard: string
  revealedCard: string
  winTitle: string
  winMessage: (moves: number) => string
  winDifficulty: (difficulty: string) => string
  bestResult: (moves: number) => string
  newRecord: string
  playAgain: string
  viewBoard: string
  documentTitle: string
  description: string
}

const spanishMoves = (moves: number) => `${moves} ${moves === 1 ? 'movimiento' : 'movimientos'}`
const englishMoves = (moves: number) => `${moves} ${moves === 1 ? 'move' : 'moves'}`

export const translations: Record<Language, TranslationStrings> = {
  es: {
    eyebrow: 'Juego de memoria',
    title: 'Memorama',
    intro: 'Encuentra todas las parejas con el menor número de movimientos.',
    languageLabel: 'Idioma',
    movesLabel: 'Movimientos',
    bestLabel: 'Récord',
    noBest: '—',
    newGame: 'Nueva partida',
    difficultyLabel: 'Dificultad',
    difficulties: { easy: 'Fácil', medium: 'Medio', hard: 'Difícil' },
    boardLabel: 'Tablero de memorama',
    hiddenCard: 'Carta oculta',
    revealedCard: 'Carta descubierta',
    winTitle: '¡Ganaste!',
    winMessage: moves => `¡Lo lograste en ${spanishMoves(moves)}!`,
    winDifficulty: difficulty => `Nivel ${difficulty}`,
    bestResult: moves => `Tu mejor partida: ${spanishMoves(moves)}`,
    newRecord: '¡Nuevo récord!',
    playAgain: 'Jugar de nuevo',
    viewBoard: 'Ver tablero',
    documentTitle: 'Memorama',
    description: 'Un juego de memoria con tres niveles de dificultad.',
  },
  en: {
    eyebrow: 'Memory game',
    title: 'Memory Match',
    intro: 'Find every pair using as few moves as you can.',
    languageLabel: 'Language',
    movesLabel: 'Moves',
    bestLabel: 'Best',
    noBest: '—',
    newGame: 'New game',
    difficultyLabel: 'Difficulty',
    difficulties: { easy: 'Easy', medium: 'Medium', hard: 'Hard' },
    boardLabel: 'Memory game board',
    hiddenCard: 'Hidden card',
    revealedCard: 'Revealed card',
    winTitle: 'You won!',
    winMessage: moves => `You won in ${englishMoves(moves)}!`,
    winDifficulty: difficulty => `${difficulty} level`,
    bestResult: moves => `Your best game: ${englishMoves(moves)}`,
    newRecord: 'New best!',
    playAgain: 'Play again',
    viewBoard: 'View board',
    documentTitle: 'Memory Match',
    description: 'A memory game with three difficulty levels.',
  },
}
