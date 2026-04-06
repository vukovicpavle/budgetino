# 💰 Budgetino

[![CI](https://github.com/vukovicpavle/budgetino/actions/workflows/ci.yml/badge.svg)](https://github.com/vukovicpavle/budgetino/actions/workflows/ci.yml)

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

| Layer      | Technology                                         |
| ---------- | -------------------------------------------------- |
| Web        | Next.js 15 (App Router)                            |
| Mobile     | Expo 55 (Expo Router)                              |
| UI         | shadcn/ui + Tailwind CSS + NativeWind              |
| API        | tRPC v11                                           |
| Database   | PostgreSQL (Supabase)                              |
| ORM        | Drizzle                                            |
| Auth       | Supabase Auth (GitHub OAuth)                       |
| Monorepo   | Turborepo + pnpm                                   |
| i18n       | next-intl (web) + i18next + react-i18next (mobile) |
| Testing    | Vitest + Playwright + Maestro                      |
| Deployment | Vercel (web) + EAS (mobile)                        |
| CI/CD      | GitHub Actions                                     |

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

### Prerequisites

- Node.js 20+
- pnpm 9+
- Docker (for local Supabase)

### Development

```bash
git clone https://github.com/vukovicpavle/budgetino.git
cd budgetino

# Install all workspace dependencies
pnpm install

# Start all apps in development mode
pnpm dev

# Or start a specific app
pnpm dev:web      # Web only (Next.js on http://localhost:3000)
pnpm dev:mobile   # Mobile only (Expo)
```

### Other Commands

```bash
# Build all apps and packages
pnpm build

# Type-check all packages
pnpm type-check

# Run all tests (not yet wired up — test scripts will be added per package in subsequent milestones)
pnpm test

# Lint all packages
pnpm lint
```

### EAS Build (Mobile)

> **Prerequisites:** `eas-cli` (`18.4.0`) is included as a devDependency. Run `pnpm install` from the repo root to set it up.

```bash
# Build for development (dev client with simulator support)
cd apps/mobile && pnpm exec eas build --profile development

# Build for preview (internal distribution for testing)
cd apps/mobile && pnpm exec eas build --profile preview

# Build for production (store-ready build)
cd apps/mobile && pnpm exec eas build --profile production

# Platform-specific builds
cd apps/mobile && pnpm exec eas build --profile preview --platform ios
cd apps/mobile && pnpm exec eas build --profile preview --platform android
```

Or use pnpm filters from the repo root:

```bash
pnpm --filter mobile eas-build:development
pnpm --filter mobile eas-build:preview
pnpm --filter mobile eas-build:production
```

**Secrets:** Set secrets via the EAS dashboard or CLI — do not commit secrets to source code. When using the CLI, omit `--value` so EAS prompts for the secret instead of storing it in shell history:

```bash
cd apps/mobile && pnpm exec eas secret:create --name API_URL
```

See [EAS secrets](https://docs.expo.dev/build-reference/variables/#using-secrets-in-environment-variables) for more details.

### Supabase (Database)

Budgetino uses [Supabase](https://supabase.com) for the database and authentication layer. Local development runs via Docker using the Supabase CLI.

#### Prerequisites

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed and running
- [Supabase CLI](https://supabase.com/docs/guides/cli/getting-started) installed (`brew install supabase/tap/supabase` on macOS)

#### Local Development

```bash
# Start the local Supabase stack (PostgreSQL + Auth + Studio)
pnpm db:start

# Stop the local Supabase stack
pnpm db:stop

# Reset the local database
pnpm db:reset

# Check the status of the local Supabase services
pnpm db:status
```

After running `pnpm db:start`, the following local services are available:

| Service          | URL                                                       |
| ---------------- | --------------------------------------------------------- |
| API / REST       | `http://127.0.0.1:54321`                                  |
| Studio (UI)      | `http://127.0.0.1:54323`                                  |
| Database         | `postgresql://postgres:postgres@127.0.0.1:54322/postgres` |
| Inbucket (email) | `http://127.0.0.1:54324`                                  |

#### Environment Setup

Copy `.env.example` to `.env.local` and fill in the values:

```bash
cp .env.example .env.local
```

For **local development**, the values from `pnpm db:status` can be used directly. For **cloud/production**, retrieve the keys from the Supabase Dashboard → Project Settings → API.

| Variable                        | Description                                               |
| ------------------------------- | --------------------------------------------------------- |
| `NEXT_PUBLIC_SUPABASE_URL`      | Supabase project URL (safe for browser)                   |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Anonymous/public API key (safe for browser)               |
| `SUPABASE_SERVICE_ROLE_KEY`     | Service role key — **server-side only, never expose**     |
| `DATABASE_URL`                  | PostgreSQL connection string (used by Drizzle/migrations) |

> **Security:** Never commit `.env.local` or any file containing real API keys. `.env.local` is gitignored by default.

## Milestones

| #   | Milestone                 | Timeline |
| --- | ------------------------- | -------- |
| M0  | 🏗️ Project Setup          | Day 1    |
| M1  | 💰 Budget Management      | Day 2–3  |
| M2  | 🔄 Subscription Tracking  | Day 3–4  |
| M3  | 📊 Dashboard & Analytics  | Day 5    |
| M4  | 🔔 Notifications & Polish | Day 6    |
| M5  | 🚀 Launch Prep            | Day 7    |

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
