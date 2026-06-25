# AI Context & Coding Guidelines

## Project Overview
This project is an Indian clone of the Boldin (formerly NewRetirement) platform. It provides holistic financial and retirement planning tailored to the Indian economic environment.

## Domain Knowledge (Indian Finance)
AI assistants must rely on the following Indian financial concepts:
- **Tax Regimes:** India has two personal income tax regimes (Old and New). The Old regime allows deductions (80C, 80D, etc.), while the New regime offers lower rates but no deductions.
- **Retirement Accounts:** 
  - **EPF:** 12% employer + 12% employee contribution. Tax-free on maturity.
  - **PPF:** Max ₹1.5L/year. 15-year lock-in. Tax-free (EEE).
  - **NPS:** Market-linked. 60% tax-free withdrawal at age 60, 40% mandatory annuity.
- **Investment Modeling (Hybrid Approach):** Start with simple "buckets" (e.g., Total Equity, Total FDs) utilizing average historical returns to reduce onboarding friction. Power users can drill down to enter granular details later (e.g., specific ISINs, precise FD rates).
- **Inflation:** Use 6% as a standard default for general inflation, and 10% for medical and education inflation.
- **Currency:** All monetary values are in INR (₹) and should ideally be formatted in the Indian numbering system (Lakhs and Crores). 1 Lakh = 1,00,000; 1 Crore = 1,00,00,000.

## Coding Standards & Architecture
- **Tax & Scheme Configurations:** Because Indian union budgets frequently change tax brackets and scheme limits (e.g. LTCG rates), DO NOT hardcode rates directly into calculation functions. Abstract all tax slabs, limits, and rates into a configurable JSON or database table so they can be updated annually without deploying new code logic.
- **Framework:** Next.js (App Router) + React.
- **Styling:** Use Tailwind CSS for consistent styling.
- **Typescript:** Use strict TypeScript for all financial models to prevent calculation errors.
- **State Management:** Use Zustand or Redux for managing complex user financial plans and scenarios.
- **Math:** Avoid floating-point errors for currency. Use libraries like `currency.js` or `decimal.js` for financial calculations.

## Architectural Decisions
- Financial logic should be decoupled from UI components. Create a `lib/financial-engine` directory for pure functions.
- Every financial calculator must have corresponding unit tests in a `tests/` directory.

## Tech Stack & Architecture (Aligned via Grill-Me)
- **Frontend Framework:** Next.js (App Router recommended).
- **Database:** Supabase (migrated from Prisma/Postgres for MVP).
- **Authentication:** NextAuth.js supporting Google OAuth and Email OTP (using Nodemailer with a custom SMTP provider like Gmail).
- **Brokerage Integration:** Manual portfolio additions initially (Google Finance style).

## Legacy Platform Insights (From Boldin Archive)
- **Rendering Pattern:** The original platform heavily utilized Client-Side Rendering (CSR) with Webpack bundles (e.g. `_app.js`, `[slug].js`).
- **API Pattern:** Extensive use of REST API endpoints fetched asynchronously from the client.
- **UI:** Extensive use of CSS-in-JS (like Emotion/MUI) combined with highly structured layouts (Persistent sidebars, responsive overlays).
- **Security:** CSRF tokens and invisible hCaptcha flows are present on sensitive endpoints.
