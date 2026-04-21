# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this
repository.

## Commands

Package manager is **yarn 4** (Berry, `nodeLinker: node-modules`; see `.yarnrc.yml` and
`yarn.lock`).

- `yarn start` — Vite dev server on http://localhost:5173
- `yarn build` — runs `tsc --noEmit` then `vite build`; output goes to `./site` (see note in
  `vite.config.ts` `outDir`)
- `yarn preview` — serve the production build locally
- `yarn test` — Vitest (jsdom); pass `--run` for one-shot, e.g. `yarn test --run src/App.test.tsx`
- `yarn lint` — ESLint 9 flat config (`eslint.config.js`)
- `scripts/build.sh` — `yarn install --immutable && yarn build`; output in `./site`

## Deployment

The `./site` directory is **committed to this repo**. The VM host checks out the repo and serves
`./site` directly from disk — there is no remote build step. Rebuild locally (or in CI) with
`scripts/build.sh`, commit the updated `./site`, and push.

Stack: Vite 8, React 19, TypeScript 6, react-router-dom 7. No create-react-app, no TSLint, no Jest.

## Architecture

Finnish-language branching text adventure ("seikkailu" = adventure), deployed at
https://seikkailut.pomeranssi.fi.

### Content comes from Contentful, not from this repo

`src/data/GameService.ts` wraps the Contentful SDK. Space ID and read-only access token are
hardcoded there; the SDK talks directly to `cdn.contentful.com` (no proxy — Contentful's Delivery
API ships CORS headers for browser use). Games, scenes, choices, items, conditions, and actions are
all Contentful entries — changing game content means editing Contentful. The service uses
deliberately loose `CEntry` typing at the Contentful boundary and relies on the
`toGame`/`toScene`/`toChoice`/etc. adapter functions to produce the strict domain types in
`src/data/Game.ts`. Three module-level maps (`gameCache`, `sceneCache`, `itemCache`) memoize fetched
entries.

### Game state lives in the URL, not in React state

There is no Redux/Context/state library. The player's full progress is encoded in the route:

- `/g/:gameId` — start of game
- `/g/:gameId/:sceneId` — current scene
- `/g/:gameId/:sceneId/:itemIds` — scene + inventory (item IDs joined by `-`)

`src/App.tsx` wires these routes with react-router-dom 7 (`Routes`/`Route element={…}`).
`RoutedGamePage` in `src/ui/GamePage.tsx` is a thin function-component wrapper that calls
`useParams` and `useNavigate`, then hands a plain `navigate: (path: string) => void` function down
to the class components (see the `NavigateFn` type exported from `GamePage.tsx`). When a player
picks a choice (`src/ui/SceneView.tsx` → `ChoiceView.selectLink`), the choice's `actions` mutate the
item list and the app navigates to a new URL.

Any new mechanic that affects player state must be representable in the URL, or it won't survive a
reload/share.

Condition evaluation (`SceneView.canShowChoice`/`matchCondition`) and action application
(`ChoiceView.filterItems`) happen client-side against that URL-derived item list. The supported
types are enumerated in `src/data/Game.ts` (`hasItem`/`doesNotHaveItem`, `receiveItem`/`loseItem`)
and mapped from Contentful content-type IDs in `GameService.toConditionType`/`toActionType`.

### Router mode depends on PWA install

`src/App.tsx` picks `HashRouter` when running as an installed PWA (`display-mode: standalone`) and
`BrowserRouter` otherwise. This is intentional — see
https://ayastreb.me/react-router-in-home-screen-pwa/ for why. Don't "simplify" this to a single
router type without understanding the PWA implications.

### Service worker is self-destructing

`public/service-worker.js` is registered from `src/serviceWorkerCleanup.ts` at app startup. Its only
job is to replace any previously-installed SW (e.g. the old CRA precache worker), delete all caches,
and then unregister itself so clients stop receiving stale cached content. After returning users
load the site once, they end up with no SW registered at all. Do **not** turn this back into a real
caching SW without a deliberate cache-busting plan — the whole point of this file is to evict the
old one.

### Debug logging

The `debug` package is used throughout with namespaces like `game:service`, `game:game-page`,
`game:scene-view`. Enable in the browser console with `localStorage.debug = 'game:*'`.

## TypeScript config notes

`tsconfig.json` is strict (`strict`, `noUnusedLocals`, `noUnusedParameters`, `noImplicitReturns`),
`moduleResolution: bundler`, `jsx: react-jsx` (no more `import * as React`). The custom `Map<V>`
type in `src/data/Types.ts` is a plain index signature — not ES `Map` — and is used as a cache shape
in the data layer.
