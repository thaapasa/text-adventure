# Text Adventure

A small Finnish-language branching text adventure for kids, deployed at
[seikkailut.pomeranssi.fi](https://seikkailut.pomeranssi.fi).

The player moves between scenes by picking choices. Scenes, choices, items, and item-based
conditions/actions are all authored in [Contentful](https://www.contentful.com/) — this repo is just
the rendering shell. The player's current scene and inventory are encoded in the URL, so progress
survives reloads and can be shared as a link.

## Tech

- [Vite](https://vitejs.dev/) + [React 19](https://react.dev/) +
  [TypeScript](https://www.typescriptlang.org/)
- [react-router-dom 7](https://reactrouter.com/) for routing (hash router when installed as a PWA,
  browser router otherwise)
- [Contentful](https://www.contentful.com/) SDK for content
- [Vitest](https://vitest.dev/) for tests, [ESLint 9](https://eslint.org/) for linting
- Yarn 4 (Berry)

## Running locally

```sh
yarn install
yarn start     # Vite dev server at http://localhost:5173
yarn test      # Vitest (jsdom)
yarn lint      # ESLint
yarn build     # produces ./site
```

## Deployment

The production build in `./site` is **committed to the repo**. The VM host checks out this repo and
serves `./site` directly from disk — there's no remote build step. To ship a change:

```sh
scripts/build.sh    # runs yarn install --immutable && yarn build
git add site
git commit
git push
```

Then pull on the VM.

## Credits

### App icon (book)

<div>Icons made by <a href="http://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>
