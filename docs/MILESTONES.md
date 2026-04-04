# Budgetino — Milestones & Issues

> This document defines all milestones and their associated GitHub issues.
> Each issue must have all required sections filled before receiving the `Ready` label.

---

## Milestone Overview

| Milestone | Name | Duration | Description |
|-----------|------|----------|-------------|
| **M0** | 🏗️ Project Setup | Day 1 | Repo scaffolding, CI/CD, tooling, DB, auth |
| **M1** | 💰 Budget Management | Day 2–3 | Budget CRUD, categories, expense tracking |
| **M2** | 🔄 Subscription Tracking | Day 3–4 | Subscription CRUD, auto-deduction |
| **M3** | 📊 Dashboard & Analytics | Day 5 | Spending overview, charts, insights |
| **M4** | 🔔 Notifications & Polish | Day 6 | Reminders, UX polish, responsive, PWA |
| **M5** | 🚀 Launch Prep | Day 7 | Testing, performance, docs, deployment |

---

## M0: 🏗️ Project Setup (Day 1)

### M0-01: Initialize Turborepo monorepo with pnpm

**Summary:** Set up the monorepo structure with `apps/web`, `apps/mobile`, and `packages/*` workspaces.

**Tasks:**
- Initialize Turborepo with pnpm workspaces
- Create `apps/web` (Next.js 15), `apps/mobile` (Expo 55)
- Create `packages/ui`, `packages/api`, `packages/db`, `packages/auth`, `packages/shared`
- Create `tooling/` configs
- Configure `turbo.json` with build/dev/lint/test pipelines
- Verify `pnpm dev` starts both apps

---

### M0-02: Configure TypeScript across all packages

**Summary:** Set up shared TypeScript configuration with strict mode.

**Tasks:**
- Create base `tsconfig.json` in `tooling/typescript/`
- Extend in each app and package
- Enable strict mode, path aliases (`@/`)
- Verify `tsc --noEmit` passes across all packages

---

### M0-03: Set up ESLint + Prettier

**Summary:** Configure linting and formatting with shared configs.

**Tasks:**
- Create shared ESLint config in `tooling/eslint/`
- Configure rules: import ordering, no unused vars, React rules, kebab-case file naming
- Create Prettier config in `tooling/prettier/`
- Add `.editorconfig`
- Add lint scripts to root `package.json`
- Verify `pnpm lint` and `pnpm format:check` work

---

### M0-04: Set up Tailwind CSS + NativeWind

**Summary:** Configure Tailwind for web (Next.js) and mobile (NativeWind/Expo).

**Tasks:**
- Install and configure Tailwind CSS in `apps/web`
- Install and configure NativeWind in `apps/mobile`
- Create shared Tailwind config in `tooling/tailwind/`
- Set up CSS variables for theming (light/dark)
- Verify styles render on both platforms

---

### M0-05: Set up shadcn/ui component library

**Summary:** Initialize shadcn/ui in the shared `packages/ui` package.

**Tasks:**
- Initialize shadcn/ui in `packages/ui`
- Install base components: Button, Card, Input, Dialog, Badge, Form, Select, Tabs
- Set up `cn()` utility with clsx + tailwind-merge
- Export components from package
- Verify components render in `apps/web`

---

### M0-06: Set up Supabase (local + cloud)

**Summary:** Configure Supabase for local development and production.

**Tasks:**
- Set up Supabase CLI for local development (Docker)
- Create Supabase project (cloud) for staging/production
- Configure environment variables (`.env.local`, `.env.example`)
- Verify connection from both local and cloud
- Document setup in README

---

### M0-07: Set up Drizzle ORM with initial schema

**Summary:** Configure Drizzle ORM in `packages/db` with the base schema.

**Tasks:**
- Install Drizzle ORM + drizzle-kit
- Create `drizzle.config.ts`
- Create initial schema: `users`, `user_preferences` tables
- Generate and run first migration
- Create seed script for development
- Export client and schema from package

---

### M0-08: Set up Supabase Auth with GitHub OAuth

**Summary:** Implement authentication using Supabase Auth with GitHub as the OAuth provider.

**Tasks:**
- Configure GitHub OAuth app (Client ID/Secret)
- Set up Supabase Auth in `packages/auth`
- Create auth middleware for Next.js
- Create auth context/provider for Expo
- Implement sign-in/sign-out flows on web and mobile
- Create protected route wrappers
- Test auth flow end-to-end

---

### M0-09: Set up tRPC

**Summary:** Configure tRPC server in Next.js API routes and clients in both apps.

**Tasks:**
- Set up tRPC server in `packages/api`
- Create tRPC context with Supabase auth session
- Set up tRPC HTTP handler in `apps/web/app/api/trpc/[trpc]/route.ts`
- Configure tRPC client in `apps/web` (React Query)
- Configure tRPC client in `apps/mobile` (React Query)
- Create `health` procedure to verify connectivity
- Add auth middleware (protected procedures)

---

### M0-10: Set up GitHub Actions CI pipeline

**Summary:** Create CI workflow that runs on every PR.

**Tasks:**
- Create `.github/workflows/ci.yml`
- Jobs: install, type-check, lint, format-check, unit-test, build
- Configure caching (pnpm store, Next.js build cache)
- Add branch protection rules for `main`
- Verify pipeline runs on test PR

---

### M0-11: Set up Vitest for unit testing

**Summary:** Configure Vitest across all packages.

**Tasks:**
- Install Vitest with workspace config
- Create shared Vitest config in `tooling/`
- Set up test utilities (mocks for Supabase, tRPC)
- Write first test (health check procedure)
- Add test scripts to `package.json`

---

### M0-12: Set up Playwright for E2E testing (web)

**Summary:** Configure Playwright for web E2E tests.

**Tasks:**
- Install Playwright in `apps/web`
- Configure `playwright.config.ts`
- Write first E2E test (landing page loads)
- Add to CI pipeline
- Document how to run locally

---

### M0-13: Set up Maestro for mobile testing

**Summary:** Configure Maestro for mobile E2E tests.

**Tasks:**
- Install Maestro
- Create first flow: app launches and shows login screen
- Document how to run locally
- Plan CI integration (EAS + Maestro Cloud, or local emulator)

---

### M0-14: Set up Vercel deployment

**Summary:** Configure Vercel for automatic web deployment.

**Tasks:**
- Connect Vercel to GitHub repo
- Configure build settings for monorepo (root: `apps/web`)
- Set environment variables
- Verify preview deploys on PRs
- Verify production deploy on `main` merge

---

### M0-15: Set up EAS Build for mobile

**Summary:** Configure Expo Application Services for mobile builds.

**Tasks:**
- Initialize EAS in `apps/mobile`
- Configure `eas.json` (development, preview, production profiles)
- Set up environment variables / secrets
- Test development build
- Document build commands

---

### M0-16: Set up i18n foundation (English only)

**Summary:** Install i18n libraries and establish the translation key pattern so all user-facing strings use `t()` from day one. MVP ships English-only.

**Tasks:**
- Install `next-intl` in `apps/web`
- Install `i18next`, `react-i18next`, `expo-localization` in `apps/mobile`
- Create `packages/shared/src/i18n/locales/en.json` with initial key structure
- Create type-safe key constants in `packages/shared/src/i18n/keys.ts`
- Configure `next-intl` provider in `apps/web/app/layout.tsx`
- Configure `i18next` provider in `apps/mobile`
- Create `t()` usage examples in both apps (verify it works)
- Add ESLint rule or guideline: no hardcoded user-facing strings
- Use `Intl.NumberFormat` / `Intl.DateTimeFormat` for all formatting
- Document i18n conventions in CONTRIBUTING.md (already done)

---

## M1: 💰 Budget Management (Day 2–3)

### M1-01: Create budget_categories database schema and seed defaults

**Summary:** Define the `budget_categories` table and seed default categories.

**Tasks:**
- Create schema: id, user_id, name, color, icon, is_default, sort_order, timestamps
- Create migration
- Seed defaults: Food, Transport, Entertainment, Shopping, Health, Bills, Education, Other
- Each default has a color and icon

---

### M1-02: Create budgets database schema

**Summary:** Define the `budgets` table.

**Tasks:**
- Create schema: id, user_id, name, amount, currency, period (monthly/weekly/yearly/custom), start_date, timestamps
- Create migration
- Add indexes on user_id

---

### M1-03: Create expenses database schema

**Summary:** Define the `expenses` table.

**Tasks:**
- Create schema: id, user_id, budget_id, category_id, amount, currency, description, date, is_recurring, subscription_id, timestamps
- Create migration
- Add indexes on user_id, budget_id, date

---

### M1-04: Create category tRPC router (CRUD)

**Summary:** Implement tRPC procedures for managing budget categories.

**Tasks:**
- `category.list` — List user's categories (defaults + custom)
- `category.create` — Create custom category
- `category.update` — Edit category (name, color, icon)
- `category.delete` — Delete category (prevent if has expenses)
- `category.reorder` — Update sort_order
- Input validation with Zod schemas (in `packages/shared`)
- On new user: copy default categories to their account

---

### M1-05: Create budget tRPC router (CRUD)

**Summary:** Implement tRPC procedures for managing budgets.

**Tasks:**
- `budget.create` — Create budget with name, amount, currency, period
- `budget.list` — List budgets with current spending totals
- `budget.getById` — Get budget with expenses and remaining amount
- `budget.update` — Edit budget details
- `budget.delete` — Delete budget (cascade or prevent if has expenses)
- Input validation with Zod schemas

---

### M1-06: Create expense tRPC router (CRUD + filtering)

**Summary:** Implement tRPC procedures for managing expenses.

**Tasks:**
- `expense.create` — Add expense with amount, currency, category, budget, date, description
- `expense.list` — List expenses with filters (date range, category, budget) + cursor pagination
- `expense.getById` — Get single expense
- `expense.update` — Edit expense
- `expense.delete` — Delete expense
- Input validation with Zod schemas

---

### M1-07: Build category management UI (web + mobile)

**Summary:** Create screens for viewing and managing budget categories.

**Tasks:**
- Category list screen with colored icons
- Add category dialog/sheet
- Edit category (inline or dialog)
- Delete category with confirmation
- Drag-to-reorder (web: dnd-kit, mobile: gesture handler)
- Responsive: sidebar on web, bottom sheet on mobile

---

### M1-08: Build budget creation and listing UI (web + mobile)

**Summary:** Create screens for creating and viewing budgets.

**Tasks:**
- Budget list screen with cards showing name, amount, spent, remaining
- Progress bar showing budget utilization
- Create budget form (dialog on web, screen on mobile)
- Edit budget form
- Delete budget with confirmation
- Currency selector
- Period selector (monthly, weekly, yearly)

---

### M1-09: Build expense entry and listing UI (web + mobile)

**Summary:** Create screens for adding and viewing expenses.

**Tasks:**
- Expense list with grouping by date
- Quick-add expense form (amount, category, description)
- Full expense form (all fields)
- Category picker with colored icons
- Budget picker
- Currency input with symbol
- Date picker
- Edit and delete expense
- Filter bar (date range, category, budget)

---

### M1-10: Implement default category seeding on user signup

**Summary:** When a new user signs up, automatically create their default budget categories.

**Tasks:**
- Listen for Supabase auth `user.created` event (webhook or trigger)
- Copy default categories to the new user's account
- Handle edge cases (user already has categories, failed seeding)

---

## M2: 🔄 Subscription Tracking (Day 3–4)

### M2-01: Create subscriptions database schema

**Summary:** Define the `subscriptions` table.

**Tasks:**
- Create schema: id, user_id, budget_id, category_id, name, amount, currency, frequency, next_billing_date, start_date, is_active, timestamps
- Frequency enum: weekly, biweekly, monthly, quarterly, yearly
- Create migration
- Add indexes on user_id, next_billing_date, is_active

---

### M2-02: Create subscription tRPC router (CRUD)

**Summary:** Implement tRPC procedures for managing subscriptions.

**Tasks:**
- `subscription.create` — Add subscription with all fields
- `subscription.list` — List active (and optionally inactive) subscriptions
- `subscription.getById` — Get subscription with upcoming billing info
- `subscription.update` — Edit subscription details
- `subscription.cancel` — Set is_active = false (soft delete)
- `subscription.reactivate` — Set is_active = true
- Input validation with Zod schemas

---

### M2-03: Implement subscription auto-deduction system

**Summary:** Build the system that auto-creates expenses from due subscriptions.

**Tasks:**
- Create `subscription.processDue` procedure
- Query subscriptions where `next_billing_date <= today AND is_active = true`
- For each: create expense record with `is_recurring = true`, `subscription_id`
- Update `next_billing_date` based on frequency
- Handle errors gracefully (partial failures)
- Create Supabase Edge Function or cron job to run daily
- Log processing results

---

### M2-04: Build subscription management UI (web + mobile)

**Summary:** Create screens for managing subscriptions.

**Tasks:**
- Subscription list with cards (name, amount, frequency, next billing date)
- Active/inactive toggle or filter
- Add subscription form (name, amount, currency, frequency, start date, category, budget)
- Edit subscription form
- Cancel subscription with confirmation
- Reactivate subscription option
- Visual indicator for "billing soon" (within 3 days)

---

### M2-05: Build subscription overview/summary component

**Summary:** Create a summary component showing total subscription costs.

**Tasks:**
- Total monthly cost (convert all subscriptions to monthly equivalent)
- Total yearly cost
- Breakdown by category
- Most expensive subscription highlight
- Currency conversion for multi-currency subscriptions
- Reusable for both dashboard and subscription page

---

## M3: 📊 Dashboard & Analytics (Day 5)

### M3-01: Create analytics tRPC router

**Summary:** Implement tRPC procedures for analytics data.

**Tasks:**
- `analytics.spendingByCategory` — Category breakdown for a period (pie chart data)
- `analytics.spendingOverTime` — Daily/weekly/monthly spending (line chart data)
- `analytics.budgetVsActual` — Budget utilization per budget
- `analytics.subscriptionCost` — Subscription cost breakdown
- `analytics.monthSummary` — Total income/expense/balance for a month
- Support date range filters and currency conversion

---

### M3-02: Build main dashboard screen (web + mobile)

**Summary:** Create the main dashboard with key financial metrics.

**Tasks:**
- Total balance / remaining budget for current period
- Quick-add expense button (prominent)
- Recent expenses list (last 5–10)
- Budget progress cards (top 3 budgets)
- Upcoming subscriptions (next 7 days)
- "This month" spending summary
- Responsive layout: grid on web, scroll on mobile

---

### M3-03: Build spending by category chart

**Summary:** Create a pie/donut chart showing spending breakdown by category.

**Tasks:**
- Pie/donut chart with category colors
- Period selector (this week, this month, this year, custom)
- Legend with amounts and percentages
- Tap/click on segment to see detail
- Use a chart library compatible with both platforms (e.g., Victory Native / Recharts)

---

### M3-04: Build spending over time chart

**Summary:** Create a line/bar chart showing spending trends.

**Tasks:**
- Line or bar chart showing daily/weekly/monthly spending
- Overlay budget limit line
- Period selector
- Comparison with previous period (optional for MVP)
- Responsive sizing

---

### M3-05: Build budget vs actual comparison view

**Summary:** Create a view comparing budgeted amounts to actual spending.

**Tasks:**
- List of budgets with progress bars
- Color coding: green (<80%), yellow (80–100%), red (>100%)
- Amount remaining or overspent
- Period selector
- Sortable by utilization percentage

---

## M4: 🔔 Notifications & Polish (Day 6)

### M4-01: Implement subscription renewal reminders

**Summary:** Notify users before a subscription renews.

**Tasks:**
- Check for subscriptions billing in the next 3 days
- Push notification (mobile) via Expo Notifications
- In-app notification banner (web + mobile)
- Create notification preferences (on/off, days before)
- Store notification state (don't re-notify)

---

### M4-02: Implement budget threshold alerts

**Summary:** Warn users when approaching or exceeding budget limits.

**Tasks:**
- Alert at 80% budget utilization
- Alert at 100% budget utilization
- In-app banner/toast notification
- Push notification (mobile)
- Configurable thresholds in user preferences

---

### M4-03: Implement dark mode

**Summary:** Add dark mode support across web and mobile.

**Tasks:**
- CSS variables for light/dark themes (Tailwind)
- System preference detection
- Manual toggle in settings
- Persist preference
- Verify all components look correct in both themes

---

### M4-04: Build settings/profile screen

**Summary:** Create user settings screen.

**Tasks:**
- Profile info (name, email, avatar from GitHub)
- Default currency selector
- Theme preference (light/dark/system)
- Notification preferences
- Sign out button
- Account deletion (future consideration)

---

### M4-05: Responsive design polish (web)

**Summary:** Ensure the web app is fully responsive.

**Tasks:**
- Mobile-first breakpoints
- Navigation: sidebar on desktop, bottom tab on mobile viewport
- Dialog vs. full-screen on mobile
- Touch-friendly targets
- Test on common screen sizes

---

### M4-06: Add loading states, error handling, and empty states

**Summary:** Polish all screens with proper loading, error, and empty states.

**Tasks:**
- Skeleton loaders for all lists and cards
- Error boundaries with retry buttons
- Empty state illustrations/messages for each section
- Toast notifications for success/failure actions
- Form validation error messages

---

### M4-07: Set up currencies table and exchange rate updates

**Summary:** Implement the currency system with exchange rate data.

**Tasks:**
- Create `currencies` table with ISO 4217 codes, names, symbols
- Seed with common currencies (USD, EUR, GBP, JPY, etc.)
- Integrate exchange rate API (free tier)
- Create daily cron job to update rates
- Implement currency conversion utility in `packages/shared`

---

## M5: 🚀 Launch Prep (Day 7)

### M5-01: Write comprehensive unit tests

**Summary:** Achieve minimum 80% coverage on critical paths.

**Tasks:**
- Test all tRPC procedures (budget, expense, subscription, category, analytics)
- Test utility functions (currency conversion, date calculations)
- Test Zod validation schemas
- Test auto-deduction logic
- Mock Supabase client for tests

---

### M5-02: Write E2E tests (Playwright)

**Summary:** Cover critical user flows with E2E tests.

**Tasks:**
- Auth flow (sign in with GitHub, sign out)
- Create budget → add expense → view on dashboard
- Create subscription → verify in list
- Edit and delete operations
- Category management
- Analytics page loads with data

---

### M5-03: Write mobile E2E tests (Maestro)

**Summary:** Cover critical mobile flows with Maestro tests.

**Tasks:**
- Auth flow on mobile
- Add expense flow
- Subscription management flow
- Navigation between tabs
- Dark mode toggle

---

### M5-04: Performance optimization

**Summary:** Optimize performance for production.

**Tasks:**
- Analyze Next.js bundle size (next-bundle-analyzer)
- Implement React.memo / useMemo where needed
- Optimize database queries (check for N+1)
- Add database indexes for common queries
- Lazy load routes and heavy components
- Image optimization (if any images)

---

### M5-05: Write README and documentation

**Summary:** Create comprehensive project documentation.

**Tasks:**
- Update README with project description, screenshots, setup guide
- Document all environment variables
- API documentation (auto-generated from tRPC, or manual)
- Deployment guide
- Contributing guide (already done, review and update)

---

### M5-06: Production deployment checklist

**Summary:** Final checks before public launch.

**Tasks:**
- All CI/CD checks pass on `main`
- Environment variables set in Vercel + EAS
- Supabase production project configured
- RLS policies reviewed and tested
- Error monitoring (Sentry or similar)
- Analytics (optional: Vercel Analytics, PostHog)
- Custom domain (if applicable)
- App store submission (if applicable)
- Open source license file (MIT)
- GitHub repo settings (description, topics, social preview)

---

## Issue Creation Checklist

When creating each issue in GitHub:

1. Use the Feature template
2. Fill in ALL sections:
   - [ ] Summary
   - [ ] Architecture Plan
   - [ ] UI/UX Direction (N/A for backend-only issues)
   - [ ] Acceptance Criteria
   - [ ] Definition of Done
   - [ ] Out of Scope
   - [ ] Target Milestone
   - [ ] Priority
   - [ ] Dependencies
3. Add appropriate labels
4. Assign to milestone
5. Only add `ready` label when ALL sections are complete

---

## Dependency Graph (Simplified)

```
M0-01 (Turborepo) ─────────────────────────────────────┐
  ├── M0-02 (TypeScript)                                │
  ├── M0-03 (ESLint/Prettier)                           │
  ├── M0-04 (Tailwind/NativeWind)                       │
  │     └── M0-05 (shadcn/ui)                           │
  ├── M0-06 (Supabase)                                  │
  │     ├── M0-07 (Drizzle + Schema)                    │
  │     └── M0-08 (Auth)                                │
  ├── M0-09 (tRPC) ← depends on M0-07, M0-08           │
  ├── M0-10 (CI) ← depends on M0-02, M0-03             │
  ├── M0-11 (Vitest)                                    │
  ├── M0-12 (Playwright)                                │
  ├── M0-13 (Maestro)                                   │
  ├── M0-14 (Vercel)                                    │
  ├── M0-15 (EAS)                                       │
  └── M0-16 (i18n Foundation) ← M0-01, M0-02            │
                                                        │
M1-01 (Categories Schema) ← M0-07 ─────────────────────┤
M1-02 (Budgets Schema) ← M0-07                         │
M1-03 (Expenses Schema) ← M0-07                        │
M1-04 (Category Router) ← M1-01, M0-09                 │
M1-05 (Budget Router) ← M1-02, M0-09                   │
M1-06 (Expense Router) ← M1-03, M0-09                  │
M1-07 (Category UI) ← M1-04, M0-05, M0-16              │
M1-08 (Budget UI) ← M1-05, M0-05, M0-16               │
M1-09 (Expense UI) ← M1-06, M0-05, M0-16              │
M1-10 (Default Seeding) ← M1-01, M0-08                 │
                                                        │
M2-01 (Subscription Schema) ← M0-07                    │
M2-02 (Subscription Router) ← M2-01, M0-09             │
M2-03 (Auto-deduction) ← M2-02, M1-06                  │
M2-04 (Subscription UI) ← M2-02, M0-05                 │
M2-05 (Subscription Summary) ← M2-02                   │
                                                        │
M3-01 (Analytics Router) ← M1-06, M2-02                │
M3-02 (Dashboard) ← M3-01, M1-08, M2-05               │
M3-03 (Category Chart) ← M3-01                         │
M3-04 (Time Chart) ← M3-01                             │
M3-05 (Budget vs Actual) ← M3-01                       │
                                                        │
M4-01 (Sub Reminders) ← M2-02                          │
M4-02 (Budget Alerts) ← M1-05                          │
M4-03 (Dark Mode) ← M0-04                              │
M4-04 (Settings) ← M0-08                               │
M4-05 (Responsive) ← M3-02                             │
M4-06 (Loading/Error States) ← M3-02                   │
M4-07 (Currencies) ← M0-07                             │
                                                        │
M5-01 (Unit Tests) ← M1, M2, M3                        │
M5-02 (E2E Web) ← M3-02                                │
M5-03 (E2E Mobile) ← M3-02                             │
M5-04 (Performance) ← M3                               │
M5-05 (Documentation) ← All                            │
M5-06 (Deployment) ← All                               │
```
