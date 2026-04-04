# Budgetino — Issue Reference

> Maps milestone issues to GitHub issue numbers.
> Created from [MILESTONES.md](MILESTONES.md).

## Issue Summary

| # | ID | Title | Milestone | Priority |
|---|-----|-------|-----------|----------|
| #4 | M0-01 | Initialize Turborepo monorepo with pnpm | M0: Setup | P0 |
| #5 | M0-02 | Configure TypeScript across all packages | M0: Setup | P0 |
| #6 | M0-03 | Set up ESLint + Prettier | M0: Setup | P0 |
| #7 | M0-04 | Set up Tailwind CSS + NativeWind | M0: Setup | P1 |
| #8 | M0-05 | Set up shadcn/ui component library | M0: Setup | P1 |
| #9 | M0-06 | Set up Supabase (local + cloud) | M0: Setup | P0 |
| #10 | M0-07 | Set up Drizzle ORM with initial schema | M0: Setup | P0 |
| #11 | M0-08 | Set up Supabase Auth with GitHub OAuth | M0: Setup | P0 |
| #12 | M0-09 | Set up tRPC | M0: Setup | P0 |
| #13 | M0-10 | Set up GitHub Actions CI pipeline | M0: Setup | P1 |
| #14 | M0-11 | Set up Vitest for unit testing | M0: Setup | P1 |
| #15 | M0-12 | Set up Playwright for E2E testing (web) | M0: Setup | P2 |
| #16 | M0-13 | Set up Maestro for mobile testing | M0: Setup | P3 |
| #17 | M0-14 | Set up Vercel deployment | M0: Setup | P2 |
| #18 | M0-15 | Set up EAS Build for mobile | M0: Setup | P2 |
| #19 | M0-16 | Set up i18n foundation (English only) | M0: Setup | P1 |
| #20 | M1-01 | Create budget_categories database schema and seed defaults | M1: Budget | P0 |
| #21 | M1-02 | Create budgets database schema | M1: Budget | P0 |
| #22 | M1-03 | Create expenses database schema | M1: Budget | P0 |
| #23 | M1-04 | Create category tRPC router (CRUD) | M1: Budget | P1 |
| #24 | M1-05 | Create budget tRPC router (CRUD) | M1: Budget | P1 |
| #25 | M1-06 | Create expense tRPC router (CRUD + filtering) | M1: Budget | P1 |
| #26 | M1-07 | Build category management UI (web + mobile) | M1: Budget | P1 |
| #27 | M1-08 | Build budget creation and listing UI (web + mobile) | M1: Budget | P1 |
| #28 | M1-09 | Build expense entry and listing UI (web + mobile) | M1: Budget | P1 |
| #29 | M1-10 | Implement default category seeding on user signup | M1: Budget | P1 |
| #30 | M2-01 | Create subscriptions database schema | M2: Subscriptions | P0 |
| #31 | M2-02 | Create subscription tRPC router (CRUD) | M2: Subscriptions | P1 |
| #32 | M2-03 | Implement subscription auto-deduction system | M2: Subscriptions | P1 |
| #33 | M2-04 | Build subscription management UI (web + mobile) | M2: Subscriptions | P1 |
| #34 | M2-05 | Build subscription overview/summary component | M2: Subscriptions | P2 |
| #35 | M3-01 | Create analytics tRPC router | M3: Analytics | P1 |
| #36 | M3-02 | Build main dashboard screen (web + mobile) | M3: Analytics | P1 |
| #37 | M3-03 | Build spending by category chart | M3: Analytics | P1 |
| #38 | M3-04 | Build spending over time chart | M3: Analytics | P2 |
| #39 | M3-05 | Build budget vs actual comparison view | M3: Analytics | P2 |
| #40 | M4-01 | Implement subscription renewal reminders | M4: Polish | P2 |
| #41 | M4-02 | Implement budget threshold alerts | M4: Polish | P2 |
| #42 | M4-03 | Implement dark mode | M4: Polish | P2 |
| #43 | M4-04 | Build settings/profile screen | M4: Polish | P2 |
| #44 | M4-05 | Responsive design polish (web) | M4: Polish | P2 |
| #45 | M4-06 | Add loading states, error handling, and empty states | M4: Polish | P2 |
| #46 | M4-07 | Set up currencies table and exchange rate updates | M4: Polish | P2 |
| #47 | M5-01 | Write comprehensive unit tests | M5: Launch | P1 |
| #48 | M5-02 | Write E2E tests (Playwright) | M5: Launch | P1 |
| #49 | M5-03 | Write mobile E2E tests (Maestro) | M5: Launch | P2 |
| #50 | M5-04 | Performance optimization | M5: Launch | P2 |
| #51 | M5-05 | Write README and documentation | M5: Launch | P2 |
| #52 | M5-06 | Production deployment checklist | M5: Launch | P1 |

## Labels to Apply

> **Note:** Labels could not be created automatically due to token permissions.
> Use the script in [LABELS.md](LABELS.md) to create labels, then apply them per the table below.

Each issue body contains a **Labels** section at the bottom with the intended labels. You can also use this quick reference:

### By Milestone

| Milestone Label | Issues |
|----------------|--------|
| `m0-setup` | #4–#19 |
| `m1-budget` | #20–#29 |
| `m2-subscriptions` | #30–#34 |
| `m3-analytics` | #35–#39 |
| `m4-polish` | #40–#46 |
| `m5-launch` | #47–#52 |

### Notes

- Issue #3 is a test issue that was created during setup (can be closed/deleted)
- All issues follow the feature template structure from `.github/ISSUE_TEMPLATE/feature.yml`
- Dependencies are documented in each issue body and cross-reference issue numbers
