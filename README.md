# Penny Auth — End-to-End Tests

Playwright E2E tests for **https://penny-auth.vercel.app**.  
Covers signup, signout, and signin flows plus negative cases (unregistered email, wrong password, validation).

## Why a separate repo?
To keep tests independent from the app’s code and deploy cycle, and to target any environment via `BASE_URL`.

---

## Quick Start

**Requirements**
- Node.js 18+ (Node 20 recommended)
- npm

**Install**
```bash
npm ci
npx playwright install --with-deps
