# UI tests using Playwright

## Setup
npm init playwright

## Usage
npx playwright test
npx playwright test --headed
npx playwright test --project=firefox
npx playwright test tests/ui.edge.cases.spec.ts

### Running on local machine
npx playwright test
npx playwright test tests/ui.happy.path.spec.js

### Test scenarios
Test heuristics:
- Negative inspections
- Error prediction
- Limit value analysis
- Comprehensive testing
- Equivalent partitioning
- Others (e.g. other characters, whitespaces, minimum and maximum, numerics, non-email ad)

## Reporting
test runs are automatically saved under the `playwright-report` folder with command: `npx playwright test --reporter=html`

## Components / Packages used
playwright
faker

## Gotchas / Known issues

## TODO / Tech debt
- include `npm audit` on CI to prevent from proceeding if <1 vulnerabilities 
- Increase code coverage and unit test #Arrange/Act/Assert
- Include CONTRIBUTING.md to set coding standards
- Cross-browser testing using different browsers
- Include cypress-axe for a11y tests
- Include renovatebot to automate upgrading of npm dependencies
- Visual regression / Snapshot testing