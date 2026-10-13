export type Language = 'es' | 'en'

export interface TranslationStrings {
  eyebrow: string
  title: string
  intro: string
  languageLabel: string
  movesLabel: string
  newGame: string
  boardLabel: string
  hiddenCard: string
  revealedCard: string
  winMessage: (moves: number) => string
  documentTitle: string
  description: string
}

export const translations: Record<Language, TranslationStrings> = {
  es: {
    eyebrow: 'Juego de memoria',
    title: 'Memorama',
    intro: 'Encuentra las nueve parejas con el menor número de movimientos.',
    languageLabel: 'Idioma',
    movesLabel: 'Movimientos',
    newGame: 'Nueva partida',
    boardLabel: 'Tablero de memorama',
    hiddenCard: 'Carta oculta',
    revealedCard: 'Carta descubierta',
    winMessage: moves => `¡Lo lograste en ${moves} ${moves === 1 ? 'movimiento' : 'movimientos'}!`,
    documentTitle: 'Memorama',
    description: 'Un juego de memoria para encontrar nueve parejas.',
  },
  en: {
    eyebrow: 'Memory game',
    title: 'Memory Match',
    intro: 'Find all nine pairs using as few moves as you can.',
    languageLabel: 'Language',
    movesLabel: 'Moves',
    newGame: 'New game',
    boardLabel: 'Memory game board',
    hiddenCard: 'Hidden card',
    revealedCard: 'Revealed card',
    winMessage: moves => `You won in ${moves} ${moves === 1 ? 'move' : 'moves'}!`,
    documentTitle: 'Memory Match',
    description: 'A memory game to find nine matching pairs.',
  },
}
