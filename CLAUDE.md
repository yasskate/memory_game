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

There is no lint script; `tsc` (in `yarn build`) is the static check. Tests run in jsdom with Testing Library; `src/test/setup.ts` registers jest-dom matchers and cleanup.

## Architecture

The game is a small state machine split across three layers:

1. **`src/game/` (pure core).** `gameReducer` handles `select-card`, `resolve-mismatch`, and `restart` actions over `GameState`. Status flows `playing` → `resolving` (two face-up cards that don't match) → back to `playing`, or → `won` once every card is matched. A move is counted when the second card of a pair is flipped. `deck.ts` builds two cards per image in `src/utils/images.ts` and shuffles them; `createDeck`/`shuffle` accept an injectable `random` so tests are deterministic. Keep the reducer pure: no timers, mutable state, or browser APIs.
2. **`src/hooks/useGame.ts` (side effects).** Wraps the reducer with `useReducer` and owns the only timer: when status becomes `resolving`, it dispatches `resolve-mismatch` after a delay. The effect cleanup must clear the timeout on reset or unmount.
3. **UI.** `App.tsx` consumes `useGame`, holds the current language in local state, and syncs `document.lang`, title, and meta description. Components in `src/components/` receive all strings as props from `src/i18n/translations.ts` (Spanish `es` is the default, English `en`); they don't read translations themselves. Board disables cards while status is `resolving`.

Game state stays local to `useGame`; don't introduce global state (context/stores) unless a user-facing feature requires it.

## Change expectations

- Every game-rule change needs reducer tests in `src/game/gameReducer.test.ts`, covering mismatches, reset, and winning states.
- New UI strings must be added to both languages in `translations.ts` (the `TranslationStrings` interface enforces this).
- Card controls must stay keyboard-accessible with visible focus styles.
- Styles live in `src/styles/` as styled-components. The board grid is four columns at every width, with cards scaling to the viewport; keep cards at least 44px wide on a 320px screen.
- No visual redesigns unless explicitly requested; responsive and accessibility improvements are welcome.
