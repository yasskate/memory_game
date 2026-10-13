# Memorama

Un juego de memoria hecho con React, TypeScript y Vite. Encuentra las nueve parejas con el menor número de movimientos.

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

- `src/game/`: reducer puro, creación/barajado de cartas y reglas testeadas.
- `src/hooks/useGame.ts`: coordina el retraso de cartas no emparejadas y limpia el temporizador al reiniciar.
- `src/components/`: UI accesible del tablero y los controles.
- `src/styles/`: estilos responsive; dos columnas en móvil, tres en tablet y cuatro en escritorio.

## Deploy en Vercel

Vercel detecta Vite sin configuración adicional. Usa el comando de build definido en `package.json` y sirve `dist`. El proyecto fija Node 22 mediante `engines` para que el entorno remoto coincida con el local.
