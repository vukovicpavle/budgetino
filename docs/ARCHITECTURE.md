# Budgetino — Architecture Document

## Overview

Budgetino is a cross-platform (web + mobile) budget and subscription management app. It allows users to track expenses, manage budget categories, handle recurring subscriptions with auto-deduction, and view spending analytics — all with multi-currency support.

---

## System Architecture

```
┌──────────────────────┐     ┌──────────────────────┐
│     Next.js 15       │     │      Expo 55         │
│     (Web App)        │     │    (Mobile App)      │
│                      │     │                      │
│  ┌────────────────┐  │     │  ┌────────────────┐  │
│  │  App Router    │  │     │  │  Expo Router   │  │
│  │  (Pages/UI)    │  │     │  │  (Screens/UI)  │  │
│  └───────┬────────┘  │     │  └───────┬────────┘  │
│          │           │     │          │           │
│  ┌───────▼────────┐  │     │  ┌───────▼────────┐  │
│  │  tRPC Client   │  │     │  │  tRPC Client   │  │
│  └───────┬────────┘  │     │  └───────┬────────┘  │
└──────────┼───────────┘     └──────────┼───────────┘
           │                            │
           └──────────┬─────────────────┘
                      │
              ┌───────▼────────┐
              │   tRPC Server  │
              │  (Next.js API) │
              └───────┬────────┘
                      │
              ┌───────▼────────┐
              │  Drizzle ORM   │
              └───────┬────────┘
                      │
              ┌───────▼────────┐
              │   Supabase     │
              │  ┌──────────┐  │
              │  │ PostgreSQL│  │
              │  └──────────┘  │
              │  ┌──────────┐  │
              │  │   Auth   │  │
              │  └──────────┘  │
              │  ┌──────────┐  │
              │  │ Realtime  │  │
              │  │ (future)  │  │
              │  └──────────┘  │
              └────────────────┘
```

---

## Tech Stack

| Layer | Technology | Version | Purpose |
|-------|-----------|---------|---------|
| **Web Framework** | Next.js | 15 | SSR, App Router, API routes |
| **Mobile Framework** | Expo | 55 | Cross-platform iOS/Android |
| **Language** | TypeScript | 5.x | Type safety across all code |
| **UI (Web)** | shadcn/ui + Tailwind CSS | Latest | Composable web components |
| **UI (Mobile)** | NativeWind + custom components | Latest | Tailwind-style on React Native |
| **API** | tRPC | v11 | End-to-end type-safe API |
| **Database** | PostgreSQL (Supabase) | 15+ | Primary data store |
| **ORM** | Drizzle | Latest | Type-safe queries, migrations |
| **Auth** | Supabase Auth | Latest | OAuth (GitHub), session management |
| **Deployment (Web)** | Vercel | — | Hosting, edge functions |
| **Deployment (Mobile)** | EAS (Expo) | — | Build & submit to stores |
| **Monorepo** | Turborepo + pnpm | Latest | Build orchestration |
| **CI/CD** | GitHub Actions | — | Automated testing, deployment |
| **Unit Testing** | Vitest | Latest | Fast unit tests |
| **E2E (Web)** | Playwright | Latest | Browser automation |
| **E2E (Mobile)** | Maestro | Latest | Mobile UI testing |

---

## Database Schema

### Entity Relationship Diagram

```
┌─────────────┐       ┌──────────────────┐       ┌───────────────────┐
│    users     │       │     budgets      │       │  budget_categories│
│─────────────│       │──────────────────│       │───────────────────│
│ id (PK)     │──┐    │ id (PK)          │──┐    │ id (PK)           │
│ email       │  │    │ user_id (FK)     │  │    │ user_id (FK)      │
│ name        │  │    │ name             │  │    │ name              │
│ avatar_url  │  │    │ amount           │  │    │ color             │
│ created_at  │  │    │ currency         │  │    │ icon              │
│ updated_at  │  │    │ period           │  │    │ is_default        │
└─────────────┘  │    │ start_date       │  │    │ sort_order        │
                 │    │ created_at       │  │    │ created_at        │
                 │    │ updated_at       │  │    │ updated_at        │
                 │    └──────────────────┘  │    └───────────────────┘
                 │                          │
                 │    ┌──────────────────┐  │    ┌───────────────────┐
                 │    │    expenses      │  │    │  subscriptions    │
                 │    │──────────────────│  │    │───────────────────│
                 │    │ id (PK)          │  │    │ id (PK)           │
                 ├───▶│ user_id (FK)     │  │    │ user_id (FK)      │
                 │    │ budget_id (FK)───│──┘    │ budget_id (FK)    │
                 │    │ category_id (FK) │       │ category_id (FK)  │
                 │    │ amount           │       │ name              │
                 │    │ currency         │       │ amount            │
                 │    │ description      │       │ currency          │
                 │    │ date             │       │ frequency         │
                 │    │ is_recurring     │       │ next_billing_date │
                 │    │ subscription_id  │       │ start_date        │
                 │    │ created_at       │       │ is_active         │
                 │    └──────────────────┘       │ created_at        │
                 │                               │ updated_at        │
                 │    ┌──────────────────┐       └───────────────────┘
                 │    │   currencies     │
                 │    │──────────────────│
                 │    │ code (PK)        │
                 │    │ name             │
                 │    │ symbol           │
                 │    │ decimal_places   │
                 └───▶│ exchange_rates   │  (JSON or separate table)
                      └──────────────────┘

                      ┌──────────────────┐
                      │ user_preferences │
                      │──────────────────│
                      │ id (PK)          │
                      │ user_id (FK)     │
                      │ default_currency │
                      │ theme            │
                      │ locale           │
                      └──────────────────┘
```

### Key Design Decisions

1. **Subscriptions generate expenses** — When a subscription bills, an expense record is created with `is_recurring = true` and `subscription_id` set.
2. **Multi-currency at row level** — Each expense/subscription stores its own currency. Budgets have a primary currency; analytics convert using exchange rates.
3. **Default categories are user-scoped** — On signup, default categories are copied to the user's account. They can then edit/delete them freely.
4. **Soft concepts** — We use `is_active` on subscriptions instead of deleting, preserving history.

---

## API Design (tRPC)

### Routers

```
api/
├── routers/
│   ├── budget.ts          # Budget CRUD
│   ├── category.ts        # Category CRUD
│   ├── expense.ts         # Expense CRUD + listing with filters
│   ├── subscription.ts    # Subscription CRUD + auto-deduction
│   ├── analytics.ts       # Spending summaries, charts data
│   ├── currency.ts        # Available currencies, exchange rates
│   └── user.ts            # User profile, preferences
├── trpc.ts                # tRPC instance, context, middleware
└── root.ts                # Merge all routers
```

### Key Procedures

| Router | Procedure | Type | Description |
|--------|-----------|------|-------------|
| `budget` | `create` | mutation | Create a new budget |
| `budget` | `list` | query | List user's budgets |
| `budget` | `getById` | query | Get budget with current spending |
| `budget` | `update` | mutation | Update budget details |
| `budget` | `delete` | mutation | Delete a budget |
| `category` | `list` | query | List categories (with defaults) |
| `category` | `create` | mutation | Create custom category |
| `category` | `update` | mutation | Edit category (including defaults) |
| `category` | `reorder` | mutation | Change category sort order |
| `expense` | `create` | mutation | Add an expense |
| `expense` | `list` | query | List expenses (filtered, paginated) |
| `expense` | `update` | mutation | Edit an expense |
| `expense` | `delete` | mutation | Delete an expense |
| `subscription` | `create` | mutation | Add a subscription |
| `subscription` | `list` | query | List active subscriptions |
| `subscription` | `update` | mutation | Edit a subscription |
| `subscription` | `cancel` | mutation | Deactivate a subscription |
| `subscription` | `processdue` | mutation | Auto-create expenses for due subs |
| `analytics` | `spendingByCategory` | query | Pie chart data |
| `analytics` | `spendingOverTime` | query | Line chart data |
| `analytics` | `budgetVsActual` | query | Budget utilization |
| `analytics` | `subscriptionCost` | query | Total subscription cost breakdown |

---

## Authentication Flow

```
User clicks "Sign in with GitHub"
        │
        ▼
Supabase Auth initiates OAuth flow
        │
        ▼
GitHub authorization page
        │
        ▼
Callback to Supabase → JWT issued
        │
        ▼
┌──────────────────┐
│ Web (Next.js)    │ — Cookie-based session (SSR-compatible)
│ Mobile (Expo)    │ — Secure storage token (AsyncStorage)
└──────────────────┘
        │
        ▼
tRPC middleware validates session
        │
        ▼
Authenticated API access
```

### Auth Rules

- All API routes require authentication (except health check)
- tRPC context extracts user from Supabase session
- Row-level security: Users can only access their own data
- Token refresh handled automatically by Supabase client

---

## Auto-Deduction System

Subscriptions with `is_active = true` are processed for auto-deduction:

```
1. Cron job / Supabase Edge Function runs daily
2. Query: SELECT * FROM subscriptions WHERE next_billing_date <= TODAY AND is_active = true
3. For each due subscription:
   a. Create expense record (amount, currency, category, budget_id, is_recurring=true)
   b. Update subscription.next_billing_date based on frequency
4. Log results
```

### Frequency Options

| Frequency | Calculation |
|-----------|------------|
| `weekly` | +7 days |
| `biweekly` | +14 days |
| `monthly` | +1 month |
| `quarterly` | +3 months |
| `yearly` | +1 year |

---

## Multi-Currency Strategy

### MVP Approach

1. **User sets a default currency** in preferences
2. **Each transaction stores its own currency** — no forced conversion
3. **Analytics show totals in default currency** using stored exchange rates
4. **Exchange rates** — Updated periodically (daily cron) from a free API (e.g., exchangerate-api.com)
5. **No real-time conversion** — Rates are snapshots, acceptable for personal budgeting

### Data Model

```typescript
// currencies table
{
  code: 'EUR',          // ISO 4217
  name: 'Euro',
  symbol: '€',
  decimalPlaces: 2,
}

// Exchange rates stored as JSON or separate table
// Base currency: USD
{
  EUR: 0.92,
  GBP: 0.79,
  JPY: 149.50,
  // ...
}
```

---

## Deployment Architecture

```
┌─────────────────────────────────┐
│          GitHub Repo            │
│                                 │
│  push to main                   │
│       │                         │
│       ▼                         │
│  GitHub Actions CI              │
│  ├── Lint + Type Check          │
│  ├── Unit Tests (Vitest)        │
│  ├── E2E Tests (Playwright)     │
│  ├── Build Check                │
│  │                              │
│  │   On success:                │
│  ├── Deploy Web → Vercel        │
│  └── Build Mobile → EAS         │
└─────────────────────────────────┘

┌──────────────┐    ┌──────────────┐
│   Vercel     │    │     EAS      │
│  (Web Host)  │    │ (Mobile CI)  │
│              │    │              │
│  Next.js SSR │    │  iOS Build   │
│  API Routes  │    │  Android     │
│  Edge Funcs  │    │  Build       │
└──────────────┘    └──────────────┘
         │
         │
┌────────▼─────────┐
│    Supabase      │
│                  │
│  PostgreSQL DB   │
│  Auth Service    │
│  Edge Functions  │
│  (cron jobs)     │
└──────────────────┘
```

---

## Security Considerations

1. **Row-Level Security (RLS)** — Supabase RLS policies ensure users only access their own data
2. **Input validation** — Zod schemas shared between client and server (in `packages/shared`)
3. **CSRF protection** — Handled by Next.js + Supabase auth
4. **Rate limiting** — Applied at API route level
5. **Environment variables** — Never committed; managed via Vercel/EAS secrets
6. **Dependency auditing** — Regular `pnpm audit` in CI

---

## Performance Considerations

1. **Server components** — Use React Server Components in Next.js where possible
2. **Pagination** — All list endpoints are cursor-paginated
3. **Caching** — tRPC query caching with stale-while-revalidate
4. **Database indexes** — On `user_id`, `budget_id`, `date`, `next_billing_date`
5. **Bundle splitting** — Automatic with Next.js App Router
6. **Mobile performance** — Minimal re-renders, memoized lists with FlashList
