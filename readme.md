# Boldin Clone: Indian Retirement & Financial Planner

A comprehensive, institutional-grade financial planning and retirement projection platform built specifically for the Indian market. This platform helps individuals map out their financial future, optimize taxes, and plan for major life goals, while offering a full suite of advisor and monetization tools.

## Core Features
- **Holistic Financial Dashboard:** Track net worth, assets, and liabilities using a hybrid granular/bucket model.
- **Indian Tax Engine:** Dynamically configurable rules for Old vs New tax regimes, EPF, PPF, NPS, and capital gains.
- **Goal Planning & Scenarios:** Plan for children's education, home purchases, and compare alternate financial futures.
- **Gamification & Motivation:** Peer comparisons, milestone banners, and a visual badge system to motivate savings.
- **AI Financial Assistant:** A context-aware side panel (collapsible to a floating icon) for natural language insights.
- **The Advisor Portal:** A dedicated CRM for SEBI RIAs with a custom `.ics` booking engine, shared client dashboards, and a secure inbox.
- **Marketplace & Monetization:** Integrated B2B SaaS offerings, direct mutual fund execution, and affiliate hubs for insurance, loans, and tax filing.

## Tech Stack & Architecture
- **Frontend/Backend:** Next.js (App Router), React
- **Database:** Supabase (PostgreSQL)
- **Styling:** Tailwind CSS (Clean, minimal, borderless with drop shadows, Neutral Green/Black/White palette)
- **Typography:** Modern Sans-Serif (Inter/Roboto)
- **Icons:** Google Material Icons (No emojis)
- **Authentication:** NextAuth.js (Google OAuth + Email OTP via Nodemailer)
- **Payments:** Razorpay / Stripe

## Getting Started

*(Instructions will be added here once the project skeleton is initialized)*

1. Clone the repository
2. Install dependencies (`npm install`)
3. Set up environment variables (`.env.local` with Supabase keys)
4. Start Supabase locally (`npx supabase start`)
5. Run the development server (`npm run dev`)

## Project Documentation
All architectural and planning documentation is located in the `docs/` folder:
- [`plan.md`](docs/plan.md): Product strategy, core features, and monetization.
- [`ui_plan.md`](docs/ui_plan.md): Detailed UI/UX flow, gamification, and aesthetic design rules.
- [`development_phases_and_tasks.md`](docs/development_phases_and_tasks.md): The comprehensive 14-week project roadmap.
- [`tasks.md`](docs/tasks.md): The active execution checklist for developers.
- [`ai_context.md`](docs/ai_context.md): Critical financial domain knowledge and coding standards for AI assistants.
- [`developer_commands.md`](docs/developer_commands.md): Common CLI commands for Next.js and Supabase.

## Marketing & Go-To-Market Plan (GTM)

### 1. Market Sizing & PMF
The Indian wealth management software market is growing rapidly (16.7% CAGR, projected to reach USD 1.19 billion by 2033). The primary driver is the rising "Retirement Gap" caused by the shift from joint to nuclear families and increasing life expectancy. Our Product-Market Fit (PMF) is achieved by leading with **planning and education** (AI Assistant, Scenario Manager) rather than immediate transaction pressure (unlike incumbents like INDmoney), capturing users looking for holistic life planning.

### 2. 3-Phase Execution Strategy
- **Phase 1: B2C Content & Community (Months 1-6)**
  - Leverage "Finfluencers" to showcase the "Aha!" moment of our interactive Area Charts.
  - Utilize SEO around Indian tax changes and retirement calculators.
  - Drive viral loops through the gamified "Peer Comparison" features.
- **Phase 2: B2B Employer Benefits (Months 6-12)**
  - Target HR departments of mid-sized IT/Tech companies in Tier-1 cities.
  - Sell the platform as a B2B SaaS "Financial Wellness" perk, securing a high-LTV recurring revenue stream.
- **Phase 3: The RIA Ecosystem (Year 2)**
  - Offer the "Advisor Portal" CRM for free to independent SEBI Registered Investment Advisors.
  - RIAs onboard their offline clients to our digital platform.
  - We monetize via commissions on the custom booking engine connecting our organic B2C traffic with these RIAs.
