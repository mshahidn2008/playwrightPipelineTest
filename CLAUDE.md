# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

There are no npm scripts defined (`package.json` has an empty `scripts` block) — invoke the Playwright CLI directly with `npx`.

- Run all tests (chromium, firefox, webkit): `npx playwright test`
- Run a single file: `npx playwright test tests/orangehrm-login.spec.ts`
- Run a single test by name: `npx playwright test -g "Admin can log in and view the dashboard"`
- Run on one browser project: `npx playwright test --project=chromium`
- Debug/headed run: `npx playwright test --headed` or `npx playwright test --debug`
- View the last HTML report: `npx playwright show-report`
- Install/update browser binaries after a Playwright version bump: `npx playwright install --with-deps`

CI (`.github/workflows/playwright.yml`) runs `npm ci`, `npx playwright install --with-deps`, then `npx playwright test` on push/PR to `main`/`master`, and uploads the `playwright-report/` artifact.

## Architecture

This is a Playwright end-to-end test suite (TypeScript, no application source code — the system under test is external, e.g. the OrangeHRM demo site). Structure:

- `tests/*.spec.ts` — all specs live flat in `tests/` (per `playwright.config.ts` `testDir`).
- `playwright.config.ts` — runs fully parallel across three browser projects (chromium, firefox, webkit); trace capture is `on-first-retry`; CI mode (`process.env.CI`) forbids `test.only`, enables retries, and disables parallel workers.
- `playwright-report/` and `test-results/` are generated output (gitignored) — don't hand-edit or commit into them.

### Testing standard (`CONTEXT.md`)

`CONTEXT.md` is the authoritative testing standard for this repo and should shape how new tests are written and reviewed:

- Locator priority: `getByRole` / `getByLabel` / `getByTestId` / text — never CSS classes, XPath, or positional selectors unless no semantic locator exists.
- Assert user-visible outcomes and meaningful side effects, not implementation details or layout.
- Tests must be independent and order-agnostic — no shared state or dependency on another test's data.
- No fixed delays (`waitForTimeout`); rely on Playwright's auto-waiting `expect`.
- Never commit `test.only` or disabled tests without a tracked reason (CI fails on committed focused tests).
- Trace/screenshot/video evidence must be retained for failed CI runs.
- Mandatory MCP interaction rules when generating tests via Playwright MCP tools: interact with the real app, inspect actual DOM/behavior, and generate code only from verified interactions — never hallucinate selectors or assume DOM structure.
