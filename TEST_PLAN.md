# Penny Auth End-to-End Test Plan

### Scope
Automated testing for **[Penny Auth](https://penny-auth.vercel.app)** using **Playwright**.

These tests validate the full user authentication flow:
- validate the positive flow when the user create new account, sign out , sign in again
- Validation errors for required fields and input formats
- Error handling for unregistered users and wrong credentials

---

## Test Environment
| Component | Details |
|------------|----------|
| Framework | Playwright Test |
| Base URL | `https://penny-auth.vercel.app` |
| Languages | TypeScript |
| Browsers | Chromium, Firefox|
| Devices | Desktop, iPhone 16 |
| OS | Ubuntu (CI), macOS (local) |

---
## Test Scenarios

### Positive Scenarios
| ID | Scenario | Expected Result |
|----|-----------|----------------|
| P-01 | **Sign-Up new user** | Redirect to `/dashboard`, no validation or server errors |
| P-02 | **Sign-Out** | Redirect to `/sign-in`, user session cleared |
| P-03 | **Sign-In** | Redirect to `/dashboard`, session restored |

### Negative Scenarios
| ID | Scenario | Expected Result |
|----|-----------|----------------|
| N-01 | **Unregistered user tries to sign in** | Error: “No account found for this email.” |
| N-02 | **Registered email + wrong password** | Error: “Incorrect password.” |
| N-03 | **Submit empty sign-up form** | Four inline errors: “This field is required.” |
| N-04 | **Short password (< 6)** | Error: “At least 6 characters.” |
| N-05 | **Invalid email format** | Error: “Enter a valid email.” |
---

## CI/CD Integration Summary
- Workflow: `.github/workflows/e2e.yml`
- Triggered on:
  - Pull Requests → smoke & Chromium only
  - Push to `main` → full browser/device matrix
- Artifacts uploaded:
  - HTML report (`playwright-report/`)
  - Traces (`test-results/**/trace.zip`)
  - Optional test videos
- Reports retained 7 days for inspection.

---

## Reporting
- Local run:  
  ```bash
  npx playwright test --reporter=list,html
  npx playwright show-report
