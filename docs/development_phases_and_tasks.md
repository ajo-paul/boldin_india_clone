# Detailed Development Phases & Tasks

## Phase 1: Foundation & The Hook (Weeks 1-2)
**Goal:** Set up the platform architecture and build the initial user acquisition flow.
- **Tasks:**
  - Initialize Next.js (App Router) project with Tailwind CSS.
  - Set up Supabase PostgreSQL database schemas (Users, Goals, Assets).
  - Implement the "Hook" Pre-Signup Questionnaire (Age, Income, Primary Goal -> Preview Plan).
  - Setup NextAuth.js for Authentication (Google OAuth).
  - Implement Nodemailer with Custom SMTP for Email OTP, Welcome, and Password Resets.

## Phase 2: Core Financial Engine & Client Dashboard (Weeks 3-5)
**Goal:** Build the robust math engine for the Indian financial system and visualize it.
- **Tasks:**
  - Write pure utility functions in `lib/financial-engine` for EPF, PPF, NPS, and compounding.
  - Develop the Tax Engine module (Income Tax slabs, Old/New regime logic).
  - Build the Post-Signup full questionnaire.
  - Develop the 'Overview' dashboard with an interactive area chart (Recharts/Chart.js).
  - Build the Manual Investment Portfolio tracker (Google Finance style).

## Phase 3: Advanced Features & AI Chat (Weeks 6-7)
**Goal:** Provide the 'Aha!' moment and embed the AI Advisor.
- **Tasks:**
  - Develop the Scenario Manager (ability to clone a baseline plan and change variables).
  - Build the AI Chat Assistant as a permanent right-side panel.
  - Implement the "Hide" animation to collapse the AI chat into a floating icon.
  - Wire up the AI Assistant to have read-access to the user's financial state for context-aware answers.

## Phase 4: Monetization & Marketplace (Weeks 8-9)
**Goal:** Build the revenue-generating hubs and payment gateways.
- **Tasks:**
  - Build the dedicated "Marketplace" tab for Affiliates (Insurance, Tax Filing via ClearTax, Loans).
  - Integrate Stripe/Razorpay for Pro Plan subscriptions.
  - Implement "Feature Locks" and the Pro subscription upsell popup overlay.
  - Build infrastructure for Flat-Fee Direct Mutual Fund Execution (integration with broker APIs if applicable, or placeholder).
  - Configure AI Assistant to strategically and contextually recommend Marketplace products.

## Phase 5: The Advisor Portal (Weeks 10-12)
**Goal:** Provide financial advisors with a CRM-like experience and booking tools.
- **Tasks:**
  - Build a Custom Booking Engine allowing clients to browse advisors and book slots.
  - Implement an `.ics` generator and email/SMS reminder service for bookings.
  - Build the Advisor Dashboard (Schedule management, Video link pasting, Client roster).
  - Implement the Two-Way Connection flow (Client invites advisor, or Advisor requests access).
  - Build the Shared Dashboard view (Advisors viewing client data, creating advisor-only scenarios).
  - Build the built-in Advisor Inbox (email-style) restricted to whitelisted client emails.

## Phase 6: B2B Prep, Polish & Launch (Weeks 13-14)
**Goal:** Final QA, B2B adaptations, and production release.
- **Tasks:**
  - Develop the B2B Employer Benefits administration panel (SaaS onboarding for HR).
  - Write robust unit tests for financial math and E2E tests for booking/auth flows.
  - Perform security audit (CSRF, DPDP Act compliance).
  - Final UI/UX polish across mobile and desktop.
  - Production deployment (Vercel/Supabase).
