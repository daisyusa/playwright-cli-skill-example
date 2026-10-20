import { mkdir } from "node:fs/promises";
import { join } from "node:path";
import { expect, test, type Page } from "@playwright/test";

const screenshotsDirectory = join(process.cwd(), "test-results", "screenshots");
const directoryPath = "/agents?AgentState=&AgentName=&AgentZip=";

async function saveScreenshot(
  page: Page,
  filename: string,
): Promise<void> {
  await mkdir(screenshotsDirectory, { recursive: true });
  await page.screenshot({
    path: join(screenshotsDirectory, filename),
    fullPage: true,
  });
}

test("searches Alaska advisors and verifies the first ten results", async ({
  page,
}) => {
  await page.goto(directoryPath);
  await page.getByRole("textbox", { name: "Destination" }).click();
  await page.getByRole("option", { name: "Alaska | USA", exact: true }).click();
  await page.getByRole("button", { name: "Search", exact: true }).click();

  await expect(page).toHaveURL(/AgentDestination=Alaska\+%7C\+USA/);

  const profileLinks = page.getByRole("link", {
    name: "My Profile",
    exact: true,
  });
  await expect(profileLinks).toHaveCount(10);

  const profilePaths = await profileLinks.evaluateAll((links) =>
    links
      .map((link) => (link as HTMLAnchorElement).getAttribute("href"))
      .filter((path): path is string => path !== null),
  );
  expect(profilePaths).toHaveLength(10);
  for (const path of profilePaths) {
    expect(path).toMatch(/^\/agents\/agent\/\d+(?:\/[^/]+)?$/);
  }
  await expect(page.locator("main")).toContainText("Alaska");

  await saveScreenshot(page, "alaska-advisor-search-results.png");

  for (const path of profilePaths) {
    await page.goto(path);
    await expect(page).toHaveTitle(/^Travel Agent .+ \| Dream Vacations$/);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(/\S/);

    await saveScreenshot(
      page,
      `advisor-${path.split("/").filter(Boolean).at(-1)}.png`,
    );
  }
});

test("an invalid advisor profile displays a not-found message", async ({
  page,
}) => {
  test.fail(
    true,
    "Known site issue: this invalid profile currently renders a blank main heading.",
  );

  await page.goto("/agents/agent/0/not-a-real-agent");
  await saveScreenshot(page, "advisor-profile-not-found.png");

  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    /not found|unavailable/i,
  );
});
