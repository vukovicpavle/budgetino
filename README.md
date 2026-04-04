# 💰 Budgetino

A cross-platform budget and subscription management app built with Next.js 15 and Expo 55.

## Features (MVP)

- **Budget Management** — Create and track multiple budgets with customizable categories
- **Expense Tracking** — Manual expense entry with category, currency, and date
- **Subscription Tracking** — Monitor recurring subscriptions with auto-deduction
- **Analytics Dashboard** — Spending breakdown by category, trends over time, budget vs. actual
- **Multi-Currency** — Track expenses in any currency with automatic conversion
- **i18n-Ready** — All strings use translation keys; English-only for MVP, ready for additional languages
- **Cross-Platform** — Web (Next.js) + Mobile (Expo) with shared codebase

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Web | Next.js 15 (App Router) |
| Mobile | Expo 55 (Expo Router) |
| UI | shadcn/ui + Tailwind CSS + NativeWind |
| API | tRPC v11 |
| Database | PostgreSQL (Supabase) |
| ORM | Drizzle |
| Auth | Supabase Auth (GitHub OAuth) |
| Monorepo | Turborepo + pnpm |
| i18n | next-intl (web) + i18next + react-i18next (mobile) |
| Testing | Vitest + Playwright + Maestro |
| Deployment | Vercel (web) + EAS (mobile) |
| CI/CD | GitHub Actions |

## Project Structure

```
budgetino/
├── apps/
│   ├── web/          # Next.js 15 app
│   └── mobile/       # Expo 55 app
├── packages/
│   ├── ui/           # Shared UI components (shadcn-style)
│   ├── api/          # tRPC routers
│   ├── db/           # Drizzle schema & migrations
│   ├── auth/         # Supabase auth helpers
│   └── shared/       # Types, utils, validators
├── tooling/          # Shared ESLint, Prettier, TS, Tailwind configs
└── docs/             # Architecture, contributing, milestones
```

## Documentation

- [Architecture](docs/ARCHITECTURE.md) — System design, database schema, API design
- [Contributing & Code Style](docs/CONTRIBUTING.md) — Code conventions, Git workflow, PR process
- [Milestones & Issues](docs/MILESTONES.md) — Complete project breakdown with all tasks
- [Labels](docs/LABELS.md) — GitHub label definitions and setup script

## Getting Started

> 🚧 Project is in planning phase. Setup instructions will be added in M0.

### Prerequisites

- Node.js 20+
- pnpm 9+
- Docker (for local Supabase)

### Development

```bash
git clone https://github.com/vukovicpavle/budgetino.git
cd budgetino
# The commands below require the Turborepo/pnpm workspace scaffold (M0)
pnpm install
pnpm dev
```

## Milestones

| # | Milestone | Timeline |
|---|-----------|----------|
| M0 | 🏗️ Project Setup | Day 1 |
| M1 | 💰 Budget Management | Day 2–3 |
| M2 | 🔄 Subscription Tracking | Day 3–4 |
| M3 | 📊 Dashboard & Analytics | Day 5 |
| M4 | 🔔 Notifications & Polish | Day 6 |
| M5 | 🚀 Launch Prep | Day 7 |

## Contributing

Please read the [Contributing Guide](docs/CONTRIBUTING.md) before making any changes.

**Key rules:**
- New app/package source files should use `kebab-case` where applicable; standard repo/documentation filenames such as `README.md` and GitHub template files are allowed exceptions
- All components must be composable (shadcn-style)
- Commits and PR titles must follow [Conventional Commits](https://www.conventionalcommits.org/)
- All CI/CD checks must pass before merge
- Issues must have all sections filled and `ready` label before starting work

## License

MIT