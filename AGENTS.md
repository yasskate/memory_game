# Memory Game

## Working agreement

- Use Node 22.13.0 through asdf (`.tool-versions`) and Yarn 1.22.22.
- Run `yarn verify` before handing off a change. `yarn test` is non-interactive; use `yarn test:watch` while developing.
- Vercel deploys the static Vite output from `dist`; keep `package.json` `engines.node` aligned with `.tool-versions`.

## Project map

- `src/game/` contains the deterministic game state machine and its unit tests. Keep its reducer pure: no timers, mutable state, or browser APIs.
- `src/hooks/useGame.ts` owns the mismatch timeout and must clean it up on reset or unmount.
- `src/components/` renders the game. Keep card controls keyboard-accessible and preserve visible focus styles.
- `src/styles/` contains styled-components. The board must support two columns on narrow screens, three on medium screens, and four on desktop.

## Change expectations

- Add or adjust reducer tests for every game-rule change, including mismatches, reset, and winning states.
- Do not introduce global state for game state unless it is required by a user-facing feature.
- Avoid a visual redesign unless it is explicitly in scope; responsive and accessibility improvements are expected.
