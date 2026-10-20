# CruiseOne Playwright checks

This project demonstrates browser exploration with `playwright-cli` and
repeatable end-to-end tests written in TypeScript with Playwright Test.

## Requirements

- Node.js 18 or newer
- npm

## Install and run

Install the project dependencies and Chromium browser:

```sh
npm install
npx playwright install chromium
```

Run the automated checks:

```sh
npm test
```

Run the suite with a visible browser:

```sh
npm run test:headed
```

Type-check the TypeScript files:

```sh
npx tsc --noEmit
```

The tests search the travel advisor directory for the `Alaska | USA`
destination, open the first ten profiles returned by the live search, and
check the response for an invalid advisor profile. Search ranking and results
can change over time, so the test uses the current results rather than
expecting a fixed set or order of names.

The invalid-profile check is marked as an expected failure: the site currently
renders a blank main heading instead of a clear not-found message. If the
site's behavior changes, Playwright will report an unexpected pass; remove
`test.fail()` from that test once the expected not-found behavior is verified.

## Screenshots and reports

- Full-page screenshots from the test scenarios: `test-results/screenshots/`
- Failure screenshots, traces, and HTML report: `test-results/`
- Manual CLI snapshots and console logs: `.playwright-cli/`

These generated files are excluded by `.gitignore`. Open the HTML report with:

```sh
npx playwright show-report test-results/html-report
```

## Playwright CLI exploration

The CLI is useful for interactive browser exploration; it is separate from the
Playwright Test runner used by the automated suite. If `playwright-cli` is
installed, for example:

```sh
playwright-cli open https://demo.playwright.dev/todomvc/
playwright-cli snapshot
playwright-cli close
```

### Install the standalone CLI and skills

The standalone CLI is not a dependency of this project's automated tests.
Install it separately if you want to run `playwright-cli` commands from your
terminal or use the CLI-based agent workflow. Follow the
[Microsoft Playwright CLI installation guide](https://github.com/microsoft/playwright-cli):

```sh
npm install -g @playwright/cli@latest
playwright-cli --help
```

Install the upstream agent skill separately from the project root. For GitHub
Copilot, use the `.agents/skills/` target:

```sh
playwright-cli install --skills=agents
```

For tools using the Claude-compatible skill location, use:

```sh
playwright-cli install --skills
```

The generated skill directories (`.agents/skills/playwright-cli/` and
`.claude/skills/`) are ignored by Git so each developer can install the
version compatible with their local CLI. This repository does not include the
upstream workflow skill itself; it includes only a setup note at
`.github/skills/playwright-cli-setup/SKILL.md`.

The CLI package is global to the machine, so each developer who wants to use
the `playwright-cli` terminal command needs to install it on their own machine.
This is independent of the project dependencies and the `npm test` workflow.

For CruiseOne, the manual exploration artifacts were saved as `.playwright-cli/`
snapshots and root-level screenshots. Those one-off screenshots are ignored by
Git; the automated scenarios save fresh screenshots under `test-results/`.

## Example prompts

Prompts that describe the expected task clearly:

> Use the Playwright skill to explore `https://demo.playwright.dev/todomvc/`.
> Try adding and completing a todo, and capture screenshots of successful and
> unsuccessful scenarios.

> Use the Playwright skill to find Alaska cruise travel advisors on
> `https://www.cruiseone.com/home-page`. Review the first ten profiles returned
> by the Alaska filter, and capture screenshots of the search results, each
> profile, and any failure states.

> Create and run a repeatable TypeScript Playwright Test for the Alaska advisor
> search. Use resilient locators and assertions, verify the profiles returned
> by the live search instead of hard-coding their order, and save screenshots
> for successful and failing scenarios.

These are examples, not tests by themselves. For repeatable automated checks,
run the test suite with `npm test` and review its assertions and results.
