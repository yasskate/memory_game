# Memorama

Un juego de memoria hecho con React, TypeScript y Vite. Encuentra todas las parejas con el menor número de movimientos.

Hay tres niveles: fácil (8 parejas), medio (12) y difícil (16). Cada partida elige animales al azar entre las 16 cartas disponibles. El juego recuerda en el navegador el último nivel elegido y tu mejor partida de cada nivel, y al ganar muestra tus movimientos junto a tu récord.

La interfaz está disponible en español e inglés; usa el selector de idioma en la parte superior del juego.

## Requisitos

- Node `22.13.0` (gestionado por asdf en `.tool-versions`)
- Yarn `1.22.22` mediante Corepack

## Desarrollo

```bash
corepack yarn install
corepack yarn dev
```

## Calidad

```bash
corepack yarn test
corepack yarn test:watch
corepack yarn test:coverage
corepack yarn build
corepack yarn verify
```

`verify` ejecuta las pruebas y la compilación de producción.

## Arquitectura

- `src/game/`: reducer puro, niveles de dificultad, creación/barajado de cartas y reglas testeadas.
- `src/hooks/useGame.ts`: coordina el retraso de cartas no emparejadas, limpia el temporizador al reiniciar y guarda el progreso.
- `src/utils/progressStorage.ts`: lee y guarda en `localStorage` el nivel y los récords, tolerando datos corruptos o almacenamiento bloqueado.
- `src/components/`: UI accesible del tablero y los controles.
- `src/styles/`: estilos responsive. En móvil y tablet, cuatro columnas en todos los niveles; en pantallas anchas, seis columnas en fácil y medio, y ocho en difícil.
- `src/assets/cards/`: caras de las cartas en WebP de 250 × 324. `design/cards/` contiene la herramienta para generar cartas nuevas.

## Deploy en Vercel

Vercel detecta Vite sin configuración adicional. Usa el comando de build definido en `package.json` y sirve `dist`. El proyecto fija Node 22 mediante `engines` para que el entorno remoto coincida con el local.
