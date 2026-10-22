# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

AGENTS.md holds the project's working agreement; the essentials are repeated here.

## Environment

- Node 22.13.0 via asdf (`.tool-versions`), Yarn 1.22.22 (via Corepack, e.g. `corepack yarn install`).
- Keep `package.json` `engines.node` aligned with `.tool-versions`; Vercel uses it to pick the Node version.
- Vercel deploys the static Vite output from `dist` with no extra config.

## Commands

```bash
yarn dev                 # Vite dev server
yarn test                # vitest run (non-interactive)
yarn test:watch          # vitest watch mode while developing
yarn test:coverage       # coverage via @vitest/coverage-v8
yarn build               # tsc type-check + vite build
yarn verify              # test + build; run before handing off any change
```

Run a single test file or test by name:

```bash
yarn vitest run src/game/gameReducer.test.ts
yarn vitest run -t "mismatch"
```

There is no lint script; `tsc` (in `yarn build`) is the static check. Tests run in jsdom with Testing Library; `src/test/setup.ts` registers jest-dom matchers, cleanup, and the dialog polyfill.

## Architecture

The game is a small state machine split across three layers:

1. **`src/game/` (pure core).** `gameReducer` handles `select-card`, `resolve-mismatch`, and `new-game` actions over `GameState`. Status flows `playing` → `resolving` (two face-up cards that don't match) → back to `playing`, or → `won` once every card is matched. A move is counted when the second card of a pair is flipped. On a win the reducer updates `bestMoves` for the current difficulty and sets `isNewRecord`. `new-game` carries its own deck, so the reducer never calls `Math.random`. `difficulty.ts` maps easy/medium/hard to 8/12/16 pairs (default medium). `deck.ts` picks that many random images from `src/utils/images.ts` (a glob over the numbered WebP files) and shuffles two cards per image; `createDeck`/`shuffle` accept an injectable `random` so tests are deterministic. Keep the reducer pure: no timers, mutable state, or browser APIs.
2. **`src/hooks/useGame.ts` (side effects).** Wraps the reducer with `useReducer`, seeds it from `localStorage` through `src/utils/progressStorage.ts`, and saves difficulty and best results whenever they change. It owns the only timer: when status becomes `resolving`, it dispatches `resolve-mismatch` after a delay. The effect cleanup must clear the timeout on a new game or unmount. It also builds decks for `restart` and `changeDifficulty`.
3. **UI.** `App.tsx` consumes `useGame`, holds the current language in local state, and syncs `document.lang`, title, and meta description. Components in `src/components/` receive all strings as props from `src/i18n/translations.ts` (Spanish `es` is the default, English `en`); they don't read translations themselves. Board disables cards while status is `resolving` and sets `data-difficulty` so the grid can change columns. `WinDialog` is a native `<dialog>` opened with `showModal()` on a win; jsdom lacks `showModal`, so `src/test/setup.ts` polyfills it and clears `localStorage` after each test.

`design/cards/` is a separate npm package (only `sharp`) that turns high-resolution masters into the game's 250 x 324 WebP card faces. The masters are gitignored and live only on the author's machine.

Game state stays local to `useGame`; don't introduce global state (context/stores) unless a user-facing feature requires it.

## Change expectations

- Every game-rule change needs reducer tests in `src/game/gameReducer.test.ts`, covering mismatches, new games, difficulty changes, best results, and winning states.
- Only `src/utils/progressStorage.ts` touches `localStorage`; keep it tolerant of blocked storage and corrupted data.
- New UI strings must be added to both languages in `translations.ts` (the `TranslationStrings` interface enforces this).
- Card controls must stay keyboard-accessible with visible focus styles.
- Styles live in `src/styles/` as styled-components. Below 48rem the board is four columns at every difficulty; keep cards at least 44px wide on a 320px screen. Wider screens: easy and medium use six columns from 48rem, hard eight from 64rem.
- New card faces go in `src/assets/cards/` as numbered 250 x 324 WebP files; adding one makes it available to the deck automatically.
- No visual redesigns unless explicitly requested; responsive and accessibility improvements are welcome.
