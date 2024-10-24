# Portfolio Test Automation

## Project Overview

This test automation suite is designed to verify the functionality of [Orane Findley's portfolio](https://oranefindley.com).

## Table of Contents

- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Running Tests](#running-tests)
- [Continuous Integration](#continuous-integration)
- [Contributing](#contributing)

## Technologies Used

- TypeScript
- Playwright
- Node.js

## Project Structure

```
portfolio-test-automation/
├── tests/
│   │   └── testName.spec.ts
├── pages/
│   │   └── pageObject.page.ts
├── data/
│   ├── dataFile.data.ts
├── playwright.config.ts
├── package.json
├── .gitignore
└── README.md
```

- `data/`: Contains data files used in tests.
- `pages/`: Contains page object files for different pages or components of the application.
- `tests/`: Contains test files organized by test suites or features.
- `.github/workflows/`: Contains GitHub Actions workflow
  - `playwright.yml`: Defines the CI pipeline for running Playwright tests
- `playwright.config.ts`: Configuration file for Playwright
- `package.json`: Defines project dependencies and scripts
- `.gitignore`: Specifies intentionally untracked files to ignore

## Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```

## Running Tests

To run the tests, use the following command:

```
npx playwright test
```

## Continuous Integration

This project uses GitHub Actions for continuous integration. The workflow is defined in:
`.github/workflows/playwright.yml`.

The CI pipeline runs on push to main/master branches and on pull requests.

## Contributing

1. Fork the repository
2. Create a new branch
3. Make your changes
4. Submit a pull request
