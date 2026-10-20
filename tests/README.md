# CruiseOne Playwright checks

These TypeScript end-to-end checks use Playwright Test to:

- Search the advisor directory for the `Alaska | USA` destination.
- Verify the first ten advisors returned by the live Alaska-filtered search and
  open each profile. The directory's ranking can change, so the test does not
  assume a fixed result order or fixed set of advisors.
- Check the invalid-profile page for a clear not-found message.

The invalid-profile test is marked as an expected failure because the site
currently renders a blank main heading for an invalid advisor ID. If the site
is fixed, Playwright will report an unexpected pass so the annotation can be
removed.

## Run

From the project root:

```sh
npm install
npx playwright install chromium
npm test
```

Full-page scenario screenshots are written to `test-results/screenshots/`.
Playwright also saves failure screenshots and traces under `test-results/`.
