# Repository Guidelines

## Project Structure & Module Organization
- Next.js App Router lives in `src/app` with `layout.tsx`, `page.tsx`, and route-level styles in `globals.css`; client components should declare `use client`.
- Reusable UI sits in `src/components` (e.g., `NavigationBar.tsx`); import with the `@/...` alias defined in `tsconfig.json`.
- Static assets belong in `public`; generated route/type helpers in `types/` should not be edited directly.
- Tailwind CSS 4 runs through `src/app/globals.css` and `@tailwindcss/postcss`; prefer CSS variables for shared tokens.

## Build, Test, and Development Commands
- Run `npm install` to sync dependencies (`package-lock.json` is canonical).
- `npm run dev` starts the app at http://localhost:3000 with HMR.
- `npm run build` creates the production bundle; `npm run start` serves the built output.
- `npm run lint` applies ESLint with Next.js core web-vitals rules; fix warnings or justify disables inline.
- `npm run format` runs Prettier; lint-staged + Husky auto-format staged files on commit.

## Coding Style & Naming Conventions
- TypeScript runs in strict mode; prefer typed props and return values for components and hooks.
- Prettier (2-space indentation, double quotes, trailing semicolons) is the source of truth for formatting.
- Components use PascalCase; hooks use camelCase with a `use` prefix; align file names with the primary export.
- Keep Tailwind classlists readable by grouping layout/spacing/typography; favor semantic HTML and ARIA labels.
- Use `@/` imports instead of deep relative paths for anything under `src`.

## Testing Guidelines
- Automated tests are not configured yet; when adding features, include lightweight checks (e.g., React Testing Library or Playwright) co-located as `*.test.tsx`/`*.spec.ts` or under `src/__tests__`.
- Cover navigation flows, async data branches, and form validation edge cases; document manual QA steps in the PR until suites exist.
- Keep tests deterministic—stub network calls and Next navigation when needed, and avoid relying on external services.

## Commit & Pull Request Guidelines
- Follow existing history: `<type>: <brief summary>` (types like `design`, `chore`, `move`; summary in imperative, lower-case type).
- PRs should include purpose/scope, linked issue or task ID, screenshots or recordings for UI changes, and commands you ran (`npm run lint`, manual checks).
- Keep changes atomic and documented; update related docs/assets when renaming or moving files, and request reviews early for larger UI changes.
