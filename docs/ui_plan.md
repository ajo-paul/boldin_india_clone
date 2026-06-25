# User Interface (UI) & UX Architecture Plan

This document outlines the detailed UI architecture and user flow for the Indian Retirement & Financial Planner.

## 1. Landing Page
**Objective:** Convert visitors to free users by highlighting platform value.
- **Hero Section:** High-contrast, premium dark mode aesthetic. Headline: "Master Your Indian Retirement." CTA: "Build My Plan for Free".
- **Social Proof:** "Trusted by 10,000+ Indians to optimize their EPF, PPF, and Taxes."
- **Feature Grid:** 
  - 📊 Interactive visual charts (animated preview).
  - 🤖 AI Financial Assistant (chat UI preview).
  - ⚖️ Tax Optimization (Old vs. New regime preview).
- **Footer:** Links to Pricing, Privacy Policy, and Contact.

## 2. Authentication & Onboarding
**Objective:** Gather essential data with zero friction, hook the user, and securely create their account.
- **Phase 1: The Hook (Pre-Signup):**
  - A quick, 3-step questionnaire (Age, Income, Primary Goal).
  - Shows a teased, simplified version of their financial future.
- **Phase 2: Authentication:**
  - To view the full dashboard and advanced features, users are prompted to create an account.
  - Minimalist Login/Signup form: Google OAuth + Email OTP (powered by Nodemailer/Custom SMTP).
- **Phase 3: The Full Picture (Post-Signup):**
  - Users are guided through the rest of the questionnaire (EPF/PPF/NPS, Expenses, specific Indian tax regimes).
  - After generating the full plan, a strategic popup overlay appears offering the Pro Plan upgrade for advanced features.

## 3. Dashboard Application (App Shell)
**Objective:** Provide a highly functional, multi-page workspace.
- **Layout:** Standard SaaS layout. Top navigation bar (Profile, Notifications) and a persistent left Side Panel.
- **Side Panel Links:**
  - 🏠 **Overview:** Main dashboard and chart.
  - 💰 **Income & Savings:** Manage salary and investments (Manual addition, similar to Google Finance portfolio feature).
  - 📉 **Expenses & Goals:** Manage living costs and large purchases.
  - 🏛️ **Tax Engine:** Optimize deductions.
  - 🔄 **Scenario Manager:** (PRO) Compare multiple futures.
  - 💬 **AI Assistant:** Full-page chat interface.
  - 📅 **Advisor Consult:** Book a consultation with a verified advisor.

## 4. Key Pages & Components

### A. Overview Page (The "Aha!" Moment)
- **Top Metrics Row:** Net Worth (₹), Retirement Score (e.g., 85/100), Target Corpus (₹).
- **Plan Visual Chart:** A massive, interactive Area Chart (Recharts/Chart.js). 
  - X-axis: Age (from current to 100).
  - Y-axis: Portfolio Value (₹).
  - Lines: Projected Wealth vs. Target Wealth.
  - Tooltips: Hovering over age 60 shows exactly how much is in EPF, PPF, and Equity.
- **Action Items:** "You can save ₹45,000 more by switching to the New Tax Regime."
- **Motivational & Gamification Widgets (NEW):**
  - **Milestone Celebrations:** Dynamic banners celebrating hitting net-worth or savings goals (e.g. "🎉 You reached ₹10 Lakhs in Mutual Funds!").
  - **Peer Comparison:** "You are saving 15% more than the average 35-year-old in Bangalore."
  - **Badge System:** Visual badges earned for consistent tracking, tax optimization, and hitting savings rates.

### B. AI Chat Assistant
- **Permanent Sidebar Panel:** Embedded directly into the right side of the dashboard layout, allowing continuous chat with context-aware insights.
- **Collapsible to Floating Icon:** Includes a "Hide" button that collapses the entire panel into a modern, unobtrusive floating icon at the bottom right. Clicking the icon smoothly animates the panel back into view.

### C. Booking Appointments & Advisor Connect
- **Custom Booking Engine:** Clients can browse a directory of advisors and select available slots directly within the app.
- **Flow:** Select RIA -> Pick Time -> Confirm. 
- **Notifications:** System automatically emails an `.ics` calendar invite to the client and advisor. Follow-up email/SMS reminders are sent if opted in.
- **Video Links:** The advisor pastes their preferred meeting link (Zoom/Meet) into the appointment on their dashboard, which is automatically emailed to the client.

## 5. The Advisor Portal (Dedicated Experience)
**Objective:** Provide financial advisors with a CRM-like experience to manage their clients on the platform.
- **Client Roster & Shared Dashboard:** 
  - Connection is two-way: Clients can invite an advisor after a consultation, or an advisor can request access to a client.
  - Once accepted, the advisor can view a restricted version of the client's dashboard.
  - **Advisor Permissions:** Advisors can create new scenarios and make limited "advisor-only" recommendations without overwriting the client's baseline data.
- **Advisor Inbox:**
  - An email-style messaging interface integrated directly into the portal.
  - Advisors can send and receive emails to/from their clients.
  - To prevent spam, outbound emails are strictly limited to whitelisted client email addresses.
- **Schedule Manager:**
  - Advisors define their availability hours and manage upcoming bookings.

## 6. Design System & Aesthetics
- **Typography:** Modern Sans-Serif (e.g., Inter, Roboto, or SF Pro) for high legibility and a premium tech feel.
- **Color Palette:**
  - **Primary:** Neutral Green (indicating growth, health, and positive financial trajectory).
  - **Base:** Black & White.
  - **Negative/Error:** Soft Muted Red or Coral (for debts and expenses, contrasting clearly without being aggressively alarming).
- **Iconography:** Google Material Icons exclusively. Absolutely no emojis.
- **Card Styling:** Borderless design with soft, large-radius drop shadows. Cards blend smoothly into a light background for an ultra-clean, elevated look.
- **Animations:** 
  - Smooth hover states on all interactive elements (buttons, cards, links).
  - Elegant loading skeleton animations (shimmer effects) for charts or data fetching that take longer to load.

## 7. Monetization & Pro Plan Upsell
**Objective:** Convert free users to paid subscribers when they hit advanced needs.
- **Feature Locks:** Advanced features (like the Scenario Manager or unlimited AI chats) have a subtle lock or star icon next to them. If applicable, the premium content area is visually blurred out.
- **Upgrade Button & Popup Modal:** 
  - A prominent "Upgrade" button in the navigation triggers the payment flow.
  - Clicking a locked/blurred feature also opens the popup overlay.
  - UI: Glassmorphism effect overlaying the dashboard.
  - Content: "Unlock Scenario Planning & Unlimited AI Insights with Pro."
  - Action: Stripe/Razorpay checkout integration button.
- **Pricing Page:** A standalone page accessible from settings, comparing "Free" vs "Pro" tiers with toggle for Monthly/Annual billing.
