# waldo — Where's Waldo game

## Commands
```sh
pnpm dev       # Vite dev server
pnpm build     # Production build
pnpm lint      # ESLint (JSX + React hooks rules)
pnpm preview   # Preview production build
```
No test or typecheck commands exist.

## Stack
- **Vite 8** + **React 19** (JSX, no TypeScript)
- **Tailwind CSS v4** via `@tailwindcss/vite` plugin
- **pnpm** (v11) — always use `pnpm`, never `npm` or `yarn`

## Architecture
```
src/
  main.jsx          ← Entry point (DOM render)
  App.jsx           ← Root component
  components/       ← UI components (SRP)
    Game.jsx          Orchestrator — all state + handlers
    GameImage.jsx     Image + overlays (forwardRef for img element)
    StartPopup.jsx    Map carousel + Start button
    Header.jsx        Title
    StatsBar.jsx      Timer + mistake counter
    PlayAgainButton.jsx
  logic/            ← Pure logic, no React
    gameLogic.js      isHit(), getWaldoDisplayBox() — accept `level` param
    clickCoordinator.js  getClickCoordinates(event, imgEl)
    sounds.js         Web Audio API synthesis (no external files)
  hooks/
    useTimer.js       elapsed, startTimer, stopTimer
  data/
    maps.js           MAPS array: { level, label, image }
    coordinates.json  [{ level, x, y, width, height }]
  assets/            ~2 MB JPGs per map
```

## Key conventions
- **Coordinates**: `coordinates.json` stores top-left corner `(x, y)` + `width`/`height` in **natural image pixels**. The `isHit()` check is `clickNaturalX >= x && clickNaturalX <= x + width` (same for Y). Do not treat `(x, y)` as center.
- **Map levels** in `coordinates.json` must match `maps.js` keys. Invalid level → `isHit` returns `false`, `getWaldoDisplayBox` returns zero box.
- **Sounds** use the Web Audio API (oscillators + gain envelopes). No audio files or network requests.
- **Popup/game separation**: The `<img>` tag (and its ~2 MB download) only mounts after the user clicks "Start Game". Never render the image while the popup is shown.
- **Reset flow**: "Play Again" sets `started = false`, showing the popup again. The game component unmounts and remounts, so `useTimer` starts fresh.
- **Single Responsibility Principle**: `Game.jsx` only orchestrates state + handlers. All UI is extracted to leaf components.
- **Win overlay** and **Waldo highlight box** are pointer-events-none so they don't intercept clicks.
