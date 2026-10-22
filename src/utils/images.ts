// Every numbered card face (001.webp, 002.webp, ...) becomes an available pair, keyed by its number.
const cardModules = import.meta.glob<string>('../assets/cards/*.webp', { eager: true, import: 'default' })

export const images: Record<number, string> = Object.fromEntries(
  Object.entries(cardModules)
    .map(([path, url]) => [path.match(/\/(\d{3})\.webp$/)?.[1], url] as const)
    .filter((entry): entry is readonly [string, string] => entry[0] !== undefined)
    .map(([number, url]) => [Number(number), url]),
)
