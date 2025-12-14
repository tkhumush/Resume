# Repository Guidelines

## Project Structure & Module Organization
- Next.js (pages router) with TypeScript lives in `src`; routes under `src/pages`, shared UI in `src/components`, and layout plumbing in `_app.tsx` and `_document.tsx`.
- Resume content is centralized in `src/data/resume-data.json`; keep `README.md` aligned when updating that file. Static assets belong in `public/`.
- Global styles and Tailwind v4 directives sit in `src/styles/globals.css`; prefer utility classes over new CSS unless styling cannot be expressed in utilities.
- Scripts or tooling helpers live in `scripts/`; build and lint configuration is in the root (`next.config.ts`, `tsconfig.json`, `eslint.config.mjs`).

## Build, Test, and Development Commands
- `npm install` — install dependencies (Node 18+ recommended for Next 16).
- `npm run dev` — start the local dev server on http://localhost:3000.
- `npm run lint` — run ESLint with the Next.js config; resolve all warnings before opening a PR.
- `npm run build` — production build; verify this passes for release branches. `npm start` serves the built app.

## Coding Style & Naming Conventions
- Use TypeScript and functional components; prefer arrow functions and React hooks. Two-space indentation, semicolons, and single quotes where possible.
- Components and files are PascalCase (`Layout.tsx`, `Map.tsx`); variables, props, and functions use camelCase.
- Favor Tailwind utility classes in JSX; keep inline styles minimal (only for targeted sizing like the map container). Co-locate small component-specific styles rather than expanding global CSS.
- Treat `src/data/resume-data.json` as the single source of truth for resume text; avoid scattering hard-coded copies across components.

## Testing Guidelines
- There is no automated test suite yet; treat `npm run lint` plus manual verification as the current gate.
- For UI changes, run `npm run dev` and sanity-check the home page on desktop and mobile widths, especially the hero copy, resume content, and the map area sizing.
- If you add data-processing logic, add lightweight unit tests alongside the module or note manual test steps in the PR until a test harness is added.

## Commit & Pull Request Guidelines
- Commits: use imperative mood and keep scope focused (e.g., `Add map placeholder paths`, `Sync resume data`). Avoid bundling unrelated changes.
- Pull requests: include a brief summary, screenshots for UI changes, lint/build status, and linked issues. Call out updates to `resume-data.json`, `README.md`, or static assets so reviewers can re-verify copy and layout.
