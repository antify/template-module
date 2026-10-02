# AGENTS.md

Guide for coding agents working in `@antify/template-module`. Everything below was verified by running it (Node 24 / pnpm 10.18 locally, CI uses Node 22).

## WARNING: merging to main publishes a new npm release automatically

Pushing to any branch runs the `chromatic` workflow (build + Chromatic visual upload). When that workflow succeeds on `main`, the `release` workflow runs without any manual approval: `standard-version` bumps the version from the commit messages, writes the changelog, tags and pushes the release commit to `main`, then `pnpm publish --access public` publishes to npmjs.com. Lint, typecheck and tests are not part of that gate. Treat every merge to `main` as a release.

- Never run `pnpm release`, `pnpm publish` or `pnpm chromatic` locally.
- Do not edit `.github/workflows/chromatic.yml` or `release.yml` unless explicitly asked.

## Purpose

Nuxt 3 module (ESM, pnpm) that wraps `@antify/ui` for antify projects: it registers a toaster plugin, the `useUiClient` composable, project-specific components (prefix `AntTemplate`) and re-exports all `@antify/ui` components.

## Requirements

- Node >= 22.14 (`.nvmrc`: 22), pnpm 10.18 (`packageManager` field; use corepack or install that version).
- No database, no `.env`, no secrets needed to install, build or run the playground.

## Commands

| Command | Duration | Notes |
|---|---|---|
| `pnpm install` | ~2-6 s warm | `.npmrc` sets `shamefully-hoist=true` |
| `pnpm dev:prepare` | ~2 s | generates `playground/.nuxt` (gitignored) |
| `pnpm build` | ~10 s | `nuxt-module-build`, writes `dist/` (gitignored) |
| `pnpm lint` | ~3 s | read-only; `pnpm lint:fix` rewrites files |
| `pnpm typecheck` | ~7 s | `nuxi typecheck playground`; currently fails (see below) |
| `pnpm dev` | ~40 s to start | Nuxt playground (port 3000) and Storybook (port 6006); the next free port is used if busy; run it in the background or with a timeout |

Fastest check after a change: `pnpm install && pnpm dev:prepare && pnpm build` (~15 s). This is the only check that is currently green; it does not catch lint or type errors.

## Layout

- `src/module.ts`: module definition (config key `templateModule`, option `tailwindCSSPath`). Registers the plugin, the `runtime/composables` auto-import, the `#template-module` alias, the component directory (prefix `AntTemplate`, `pathPrefix: false`, so the folder name is not part of the component name: `buttons/SaveButton.vue` becomes `AntTemplateSaveButton`), the Tailwind 4 Vite plugin and fonts under `/_template-module/fonts`.
- `src/uiComponents.ts`: hand-maintained list of `@antify/ui` components that are re-exported. A new component in `@antify/ui` must be added here manually.
- `src/runtime/`: `components/` (buttons, crud, dialogs, inputs, `SwitchCard.vue`), `composables/useUiClient.ts`, `plugins/template-module.ts` (provides `$templateModule.toaster`), `utils.ts`, `types.ts`, `index.ts`, CSS and fonts.
- `playground/`: Nuxt app that loads `../src/module` plus Storybook config (`playground/.storybook`). Stories live next to components in `__stories/*.stories.ts`.

## Conventions

- `@antify/ui` is pinned to an exact version in `dependencies` and comes from npm; bumps are separate commits (`chore: update @antify/ui to version X`).
- Commits follow Conventional Commits (`feat:`, `fix:`, `chore:` ...) in English, because `standard-version` derives the next version from them.
- Code style is enforced by ESLint (`eslint.config.js`, @stylistic): 2 spaces, semicolons, trailing commas, one object property per line.

## Known state (checked 2026-10-02)

- There are no tests (no runner, no spec files).
- `pnpm lint` reports 131 problems (53 errors, 78 warnings) in source files, all pre-existing.
- `pnpm typecheck` reports 47 TypeScript errors, most inside `@antify/ui` typings, some in `src` and `playground/nuxt.config.ts`; pre-existing.
- Rule: do not fix unrelated legacy errors, but introduce no new lint or type errors in files you touch.
- CI on pull requests (`pr.yml`) requires install, dev:prepare and build; lint and typecheck run there as non-blocking steps until the baseline is green.
