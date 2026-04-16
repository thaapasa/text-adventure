# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

Package manager is **yarn** (see `yarn.lock`, no `package-lock.json`).

- `yarn start` — dev server (react-scripts-ts)
- `yarn build` — production build into `./build`
- `yarn test` — Jest in jsdom (pass e.g. `yarn test --testPathPattern=App` for a single file)
- `yarn lint` — TSLint against the project (config in `tslint.json`, not ESLint)
- `scripts/build-prod.sh` — pulls git, builds, and deploys `./build` to `/var/www/seikkailut.pomeranssi.fi/html-ssl` on the server

The toolchain is pinned to the legacy `react-scripts-ts@3.1.0` / React 16 / TypeScript 3.9 stack. Do not assume modern CRA, React 17+, or hooks-era patterns are set up — class components are the norm here.

## Architecture

This is a Finnish-language branching text adventure ("seikkailu" = adventure). The deployed app lives at https://seikkailut.pomeranssi.fi.

### Content comes from Contentful, not from this repo

`src/data/GameService.ts` is a thin client over the Contentful SDK. The Contentful space ID and read-only access token are hardcoded there; the `host` is pointed at `seikkailut.pomeranssi.fi` with `basePath: 'contentful'`, meaning Contentful API calls are proxied through the game's own domain rather than hitting `cdn.contentful.com` directly. Games, scenes, choices, items, conditions, and actions are all Contentful entries — changing game content means editing Contentful, not this repo. The service maps Contentful entry shapes (`CGame`, `CScene`, `CChoice`, `CItemCondition`, `CItemAction`, `CItem`) to the domain types in `src/data/Game.ts` and caches them in module-level maps (`gameCache`, `sceneCache`, `itemCache`).

### Game state lives in the URL, not in React state

There is no Redux/Context/state library. The player's full progress is encoded in the route:

- `/g/:gameId` — start of game
- `/g/:gameId/:sceneId` — current scene
- `/g/:gameId/:sceneId/:itemIds` — current scene + inventory (item IDs joined by `-`)

`src/App.tsx` wires these routes. When a player picks a choice (`src/ui/SceneView.tsx` → `ChoiceView.selectLink`), the choice's `actions` mutate the item list and the app navigates to a new URL via `history.push`. `RoutedGamePage` in `src/ui/GamePage.tsx` reads `match.params` and splits `itemIds` back out. This means: any new mechanic that affects player state must be representable in the URL, or it will not survive a reload / share.

Condition evaluation (`SceneView.canShowChoice` / `matchCondition`) and action application (`ChoiceView.filterItems`) are done client-side against that URL-derived item list. Supported condition/action types are enumerated in `src/data/Game.ts` (`hasItem` / `doesNotHaveItem`, `receiveItem` / `loseItem`) and mapped from Contentful content-type IDs in `GameService.toConditionType` / `toActionType`.

### History mode depends on PWA install

`src/History.ts` returns `createHashHistory()` when running as an installed PWA (`display-mode: standalone`) and `createBrowserHistory()` otherwise. This is intentional — see the comment linking to the ayastreb.me article. Don't "simplify" this to a single history type without understanding the PWA implications.

### Debug logging

The `debug` package is used throughout with namespaces like `game:service`, `game:game-page`, `game:scene-view`. Enable in the browser console with `localStorage.debug = 'game:*'`.

## TypeScript config notes

`tsconfig.json` has `strictNullChecks`, `noImplicitAny`, `noUnusedLocals`, and `suppressImplicitAnyIndexErrors` on. The custom `Map<V>` type in `src/data/Types.ts` is a plain index signature — not ES `Map` — and is used as a cache shape throughout the data layer.
