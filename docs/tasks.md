# Master Task List

- `[ ]` **Phase 1: Project Setup & Foundation**
  - `[ ]` Initialize Next.js (App Router) repository.
  - `[ ]` Configure Database (Supabase PostgreSQL).
  - `[ ]` Setup Authentication (NextAuth with Google OAuth & Email OTP).
  - `[ ]` Setup Nodemailer with Custom SMTP (e.g. Gmail).
  - `[ ]` **Setup Design System:** Configure Tailwind CSS with Neutral Green/Black/White palette, Inter/Roboto fonts, and global shadow/borderless utilities.
  - `[ ]` Setup Google Material Icons.

- `[ ]` **Phase 2: Core Calculators & Data Models**
  - `[ ]` Build Dynamic Rule Engine (Store Tax slabs, PPF limits, LTCG rates in Supabase/JSON).
  - `[ ]` Implement EPF/VPF, PPF, and NPS Calculators.
  - `[ ]` Build Indian Tax Engine (reading from dynamic rules).
  - `[ ]` Implement Inflation Adjusted Future Value Calculator.

- `[ ]` **Phase 3: User Interface & Core Dashboard**
  - `[ ]` Build Landing Page (Hero, Features, Social Proof).
  - `[ ]` Build Phase 1 Onboarding (Pre-Signup Hook Questionnaire).
  - `[ ]` Build Auth Pages (Google/Email).
  - `[ ]` Build Post-Signup Full Questionnaire.
  - `[ ]` Build Dashboard App Shell (Top Nav, Persistent Side Panel).
  - `[ ]` Build 'Overview' Page with Plan Visual Area Chart and skeleton loading states.
  - `[ ]` Build Hybrid Investment Portfolio Addition (Buckets + Drill down).
  - `[ ]` Implement Gamification: Milestone Banners, Peer Comparison widget, Badge system.

- `[ ]` **Phase 4: Advanced Features & Monetization**
  - `[ ]` Implement AI Chat Assistant (Permanent Right Panel + Collapsible Floating Icon).
  - `[ ]` Build Dedicated Marketplace Hub (Affiliate Insurance, Tax, Loans).
  - `[ ]` Configure AI to serve Contextual Marketplace Recommendations.
  - `[ ]` Implement Feature Locks & Pro Subscription Popup Modal.
  - `[ ]` Integrate Stripe/Razorpay for Pro Plan Checkout.
  - `[ ]` Setup infrastructure for Flat-Fee Direct Mutual Fund execution.

- `[ ]` **Phase 5: The Advisor Portal**
  - `[ ]` Build Advisor Auth & Onboarding flow.
  - `[ ]` Build Advisor Dashboard (Schedule Management, Client Roster).
  - `[ ]` Implement two-way "Invite & Accept" connection mechanism.
  - `[ ]` Implement Restricted Shared Dashboard (Advisors can create scenarios).
  - `[ ]` Build Email-style Inbox within the portal with whitelisted sending.

- `[ ]` **Phase 6: Testing & Deployment**
  - `[ ]` Write Unit Tests for financial calculators.
  - `[ ]` Write E2E Tests for critical user flows.
  - `[ ]` Setup CI/CD pipeline.
  - `[ ]` Deploy to Vercel/AWS/Render.
