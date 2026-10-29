
# Amazon Playwright Automation

## Overview
A UI automation project using Playwright and TypeScript
to practise reliable browser testing on Amazon India.

## Tech Stack
- Playwright
- TypeScript
- Node.js
- Page Object Model (POM)
- Git and GitHub Actions

## Test Scenarios
- Data-driven product searches
- Search results validation
- Product details verification
- Browser navigation
- Screenshot, video, and trace evidence

## Project Structure

pages/          - Page Object Model classes
tests/          - Playwright test cases
.github/
  workflows/    - GitHub Actions CI workflow

## Setup

Install dependencies:

npm ci

Install Chromium:

npx playwright install chromium

## Run Tests

Run Chromium tests:

npx playwright test --project=chromium

Run tests in headed mode:

npx playwright test --project=chromium --headed

Open the HTML report:

npx playwright show-report

## CI

GitHub Actions runs the Chromium test suite on
pushes and pull requests. Test reports and failure
artifacts are uploaded when available.

## Notes

Tests use a live external website. Results may vary
due to availability, consent prompts, CAPTCHA, or
changes to the website's UI.
