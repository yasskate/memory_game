# Memory Game

## Working agreement

- Use Node 22.13.0 through asdf (`.tool-versions`) and Yarn 1.22.22.
- Run `yarn verify` before handing off a change. `yarn test` is non-interactive; use `yarn test:watch` while developing.
- Vercel deploys the static Vite output from `dist`; keep `package.json` `engines.node` aligned with `.tool-versions`.

## Project map

- `src/game/` contains the deterministic game state machine and its unit tests. Keep its reducer pure: no timers, mutable state, or browser APIs.
- `src/hooks/useGame.ts` owns the mismatch timeout and must clean it up on reset or unmount.
- `src/components/` renders the game. Keep card controls keyboard-accessible and preserve visible focus styles.
- `src/styles/` contains styled-components. Below 48rem the board uses four columns at every difficulty, with cards scaling to the viewport; keep cards at least 44px wide on a 320px screen. Wider screens: easy and medium use six columns from 48rem, and hard uses eight from 64rem.
- `src/utils/progressStorage.ts` is the only code that touches `localStorage`. It must tolerate blocked storage and corrupted data.
- Card faces are 250 x 324 WebP files in `src/assets/cards/`; every numbered file there becomes an available pair. `design/cards/` holds the tooling that builds new faces from high-resolution masters.

## Change expectations

- Add or adjust reducer tests for every game-rule change, including mismatches, new games, difficulty changes, best results, and winning states.
- Do not introduce global state for game state unless it is required by a user-facing feature.
- Avoid a visual redesign unless it is explicitly in scope; responsive and accessibility improvements are expected.
