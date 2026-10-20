---
name: playwright-cli-setup
description: Setup guide only. Use when installing the Playwright CLI and its agent skill for this project.
---

# Playwright CLI setup

This is a setup note, not the Playwright CLI workflow skill. The upstream skill
is intentionally installed separately and is not included in this repository.

From the project root, install the CLI and the skill for GitHub Copilot:

```sh
npm install -g @playwright/cli@latest
playwright-cli install --skills=agents
```

The CLI skill is installed under `.agents/skills/playwright-cli/`, which is
ignored by Git in this project.

For tools using the Claude-compatible skill location instead, install with:

```sh
playwright-cli install --skills
```

That installs under `.claude/skills/playwright-cli/`, also ignored by Git.

See the upstream project for current instructions:
https://github.com/microsoft/playwright-cli
