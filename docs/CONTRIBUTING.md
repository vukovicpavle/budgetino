# Contributing to Budgetino

## Table of Contents

- [Code Style Guide](#code-style-guide)
- [File & Folder Conventions](#file--folder-conventions)
- [Component Conventions](#component-conventions)
- [Git Workflow](#git-workflow)
- [Commit Conventions](#commit-conventions)
- [PR Process](#pr-process)
- [Issue Workflow](#issue-workflow)
- [Testing Requirements](#testing-requirements)
- [CI/CD Requirements](#cicd-requirements)

---

## Code Style Guide

### General Principles

1. **TypeScript everywhere** — No `any` types. Use strict mode.
2. **Functional & declarative** — Prefer functions over classes. Use declarative patterns.
3. **Small files** — Each file should have a single responsibility. If a file exceeds ~150 lines, consider splitting it.
4. **DRY but not at the cost of clarity** — Extract shared logic, but don't over-abstract.
5. **Explicit over implicit** — Name things clearly. Avoid abbreviations.
6. **i18n from day one** — All user-facing strings must use translation keys via `t()`. Never hardcode text in components. Use `Intl` APIs for date/number/currency formatting.

### TypeScript

```typescript
// ✅ Good — explicit types, descriptive names
interface BudgetCategory {
  id: string;
  name: string;
  color: string;
  isDefault: boolean;
  createdAt: Date;
}

function calculateRemainingBudget(budget: Budget, expenses: Expense[]): number {
  const totalSpent = expenses.reduce((sum, e) => sum + e.amount, 0);
  return budget.limit - totalSpent;
}

// ❌ Bad — any types, unclear names
function calc(b: any, e: any[]): any {
  return b.limit - e.reduce((s: any, x: any) => s + x.amount, 0);
}
```

### Formatting

- **Prettier** handles formatting automatically. Do not fight the formatter.
- **Single quotes** for strings
- **Semicolons** — yes
- **Trailing commas** — yes (ES5)
- **Print width** — 80 characters
- **Tab width** — 2 spaces

### Imports

- Group imports in this order (enforced by ESLint):
  1. React / framework imports
  2. Third-party libraries
  3. Internal aliases (`@/`)
  4. Relative imports
  5. Type imports
- Use path aliases (`@/`) instead of deep relative imports

```typescript
// ✅ Good
import { useState } from 'react';

import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { useBudget } from '@/hooks/use-budget';
import { formatCurrency } from '@/lib/utils';

import type { Budget } from '@/types';
```

### i18n (Internationalization)

All user-facing strings must use translation keys. No hardcoded text in components.

```typescript
// ✅ Good — translation keys
import { useTranslations } from 'next-intl'; // web
// or: import { useTranslation } from 'react-i18next'; // mobile

function BudgetHeader() {
  const t = useTranslations('budget');
  return <h1>{t('title')}</h1>;
}

// ✅ Good — locale-aware formatting
const amount = new Intl.NumberFormat(locale, {
  style: 'currency',
  currency: 'EUR',
}).format(42.5);

// ❌ Bad — hardcoded strings
function BudgetHeader() {
  return <h1>My Budgets</h1>;
}

// ❌ Bad — manual formatting
const amount = `€${value.toFixed(2)}`;
```

Translation files live in `packages/shared/src/i18n/locales/en.json`. MVP is English-only, but the pattern is in place for future languages.

---

## File & Folder Conventions

### Naming

| Item                  | Convention                    | Example                            |
| --------------------- | ----------------------------- | ---------------------------------- |
| Files                 | `kebab-case`                  | `budget-list.tsx`, `use-budget.ts` |
| Directories           | `kebab-case`                  | `budget-management/`, `ui/`        |
| Components            | `PascalCase` (export)         | `export function BudgetList()`     |
| Hooks                 | `camelCase` with `use` prefix | `export function useBudget()`      |
| Utils/Helpers         | `camelCase`                   | `export function formatCurrency()` |
| Types/Interfaces      | `PascalCase`                  | `interface BudgetCategory {}`      |
| Constants             | `SCREAMING_SNAKE_CASE`        | `const MAX_CATEGORIES = 50;`       |
| DB tables             | `snake_case`                  | `budget_categories`                |
| DB columns            | `snake_case`                  | `created_at`                       |
| API routes            | `kebab-case`                  | `/api/budget-categories`           |
| Environment variables | `SCREAMING_SNAKE_CASE`        | `NEXT_PUBLIC_SUPABASE_URL`         |

### File Structure Rules

1. **One component per file** — `budget-card.tsx` exports `BudgetCard`
2. **Co-locate related files** — Tests, styles, and types near their source
3. **Index files only for barrels** — Only use `index.ts` for re-exports, never for logic
4. **Max file length ~150 lines** — Split if larger

### Folder Structure (Monorepo)

```
budgetino/
├── apps/
│   ├── web/                    # Next.js 15 app
│   │   ├── app/                # App Router pages
│   │   │   ├── (auth)/         # Auth route group
│   │   │   ├── (dashboard)/    # Authenticated pages
│   │   │   ├── api/            # API routes (tRPC)
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx
│   │   ├── components/         # Web-specific components
│   │   ├── next.config.ts
│   │   └── package.json
│   │
│   └── mobile/                 # Expo 55 app
│       ├── app/                # Expo Router pages
│       ├── components/         # Mobile-specific components
│       ├── app.json
│       └── package.json
│
├── packages/
│   ├── ui/                     # Shared UI components (shadcn-style)
│   │   ├── src/
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   └── index.ts
│   │   └── package.json
│   │
│   ├── api/                    # tRPC routers & procedures
│   │   ├── src/
│   │   │   ├── routers/
│   │   │   │   ├── budget.ts
│   │   │   │   ├── subscription.ts
│   │   │   │   └── index.ts
│   │   │   ├── trpc.ts
│   │   │   └── root.ts
│   │   └── package.json
│   │
│   ├── db/                     # Drizzle schema & migrations
│   │   ├── src/
│   │   │   ├── schema/
│   │   │   │   ├── budget.ts
│   │   │   │   ├── subscription.ts
│   │   │   │   ├── user.ts
│   │   │   │   └── index.ts
│   │   │   ├── migrations/
│   │   │   ├── client.ts
│   │   │   └── index.ts
│   │   ├── drizzle.config.ts
│   │   └── package.json
│   │
│   ├── auth/                   # Supabase auth helpers
│   │   └── package.json
│   │
│   └── shared/                 # Shared types, utils, constants
│       ├── src/
│       │   ├── types/
│       │   ├── utils/
│       │   ├── constants/
│       │   ├── validators/     # Zod schemas (shared between client & server)
│       │   └── i18n/           # Shared translation keys & locale files
│       │       ├── locales/
│       │       │   └── en.json # English (MVP)
│       │       ├── keys.ts     # Type-safe key constants
│       │       └── index.ts
│       └── package.json
│
├── tooling/                    # Shared tooling configs
│   ├── eslint/
│   ├── prettier/
│   ├── typescript/
│   └── tailwind/
│
├── .github/
│   ├── ISSUE_TEMPLATE/
│   ├── workflows/
│   └── PULL_REQUEST_TEMPLATE.md
│
├── turbo.json
├── package.json
└── pnpm-workspace.yaml
```

---

## Component Conventions

### Composable Components (shadcn-style)

All components MUST be composable — built from smaller, flexible primitives.

```typescript
// ✅ Good — Composable component
// packages/ui/src/budget-card.tsx

import type { HTMLAttributes, ReactNode } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './card';
import { Badge } from './badge';
import { cn } from '@/lib/utils';

interface BudgetCardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

function BudgetCard({ className, children, ...props }: BudgetCardProps) {
  return (
    <Card className={cn('w-full', className)} {...props}>
      {children}
    </Card>
  );
}

function BudgetCardHeader({ children, className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <CardHeader className={cn(className)} {...props}>
      {children}
    </CardHeader>
  );
}

function BudgetCardAmount({ amount, currency }: { amount: number; currency: string }) {
  return (
    <span className="text-2xl font-bold">
      {new Intl.NumberFormat(undefined, { style: 'currency', currency }).format(amount)}
    </span>
  );
}

export { BudgetCard, BudgetCardHeader, BudgetCardAmount };

// Usage:
// <BudgetCard>
//   <BudgetCardHeader>
//     <h3>{t('budgets.categories.groceries')}</h3>
//     <Badge>{t('budgets.frequency.monthly')}</Badge>
//   </BudgetCardHeader>
//   <BudgetCardAmount amount={500} currency="USD" />
// </BudgetCard>
```

```typescript
// ❌ Bad — Monolithic component with too many props
function BudgetCard({
  title,
  amount,
  currency,
  badge,
  showHeader,
  onEdit,
  onDelete,
  variant,
  // ... 15 more props
}: BudgetCardProps) {
  // 200 lines of conditional rendering
}
```

### Component Rules

1. **Forward refs** when wrapping DOM elements
2. **Extend native HTML attributes** with `React.HTMLAttributes<HTMLElement>`
3. **Use `cn()` utility** for className merging (clsx + tailwind-merge)
4. **Export named, not default** — `export function Button()` not `export default Button`
5. **Props interfaces** — Define above the component, name as `ComponentNameProps`
6. **No business logic in UI components** — Extract to hooks

### Hooks

```typescript
// ✅ Good — Custom hook with clear responsibility
// packages/shared/src/hooks/use-budget.ts

export function useBudget(budgetId: string) {
  const { data, isLoading, error } = api.budget.getById.useQuery({
    id: budgetId,
  });

  const remaining = useMemo(() => {
    if (!data) return 0;
    return data.limit - data.spent;
  }, [data]);

  return { budget: data, remaining, isLoading, error };
}
```

---

## Git Workflow

### Branch Naming

```
<type>/<issue-number>-<short-description>

feat/12-add-subscription-form
fix/34-currency-format-bug
refactor/56-extract-budget-hooks
chore/78-setup-ci-pipeline
```

### Workflow

1. Create a branch from `main`
2. Make changes in small, focused commits
3. Push and open a PR
4. All CI checks must pass
5. Self-review the diff
6. Request review (when team grows)
7. Squash merge into `main`

---

## Commit Conventions

We follow [Conventional Commits](https://www.conventionalcommits.org/) strictly.

### Format

```
<type>(<scope>): <description>

[optional body]

[optional footer(s)]
```

### Types

| Type       | Description                                             |
| ---------- | ------------------------------------------------------- |
| `feat`     | New feature                                             |
| `fix`      | Bug fix                                                 |
| `refactor` | Code change that neither fixes a bug nor adds a feature |
| `style`    | Formatting, white-space, etc. (not CSS)                 |
| `docs`     | Documentation only                                      |
| `test`     | Adding or correcting tests                              |
| `chore`    | Build process, CI, tooling, dependencies                |
| `perf`     | Performance improvement                                 |
| `ci`       | CI/CD changes                                           |
| `revert`   | Reverts a previous commit                               |

### Scopes

| Scope    | Description                        |
| -------- | ---------------------------------- |
| `web`    | Next.js app                        |
| `mobile` | Expo app                           |
| `ui`     | Shared UI package                  |
| `api`    | tRPC / API                         |
| `db`     | Database schema, migrations        |
| `auth`   | Authentication                     |
| `shared` | Shared utilities, types            |
| `ci`     | GitHub Actions                     |
| `deps`   | Dependencies                       |
| `i18n`   | Internationalization, translations |

### Examples

```
feat(db): add budget_categories table schema
fix(web): correct currency formatting for JPY
refactor(api): extract subscription validation to shared schema
chore(ci): add lint and type-check to PR workflow
test(api): add unit tests for budget calculation utils
docs: update README with setup instructions
```

### Rules

- Subject line max 72 characters
- Use imperative mood: "add" not "added" or "adds"
- No period at the end of the subject line
- Body wraps at 80 characters
- Reference issues: `Closes #12` or `Refs #34`

---

## PR Process

### PR Title

Must follow the same Conventional Commits format as commit messages:

```
feat(web): add budget creation form
fix(api): handle duplicate subscription names
```

### PR Requirements

1. **All CI/CD checks must pass** — No exceptions
2. **PR description filled out** — Using the template
3. **Linked to an issue** — Every PR must close or reference an issue
4. **Small and focused** — One concern per PR
5. **Self-reviewed** — Read your own diff before requesting review

---

## Issue Workflow

### Issue Lifecycle

```
Created → Triaged → Ready → In Progress → In Review → Done
```

### Labels

| Label              | Color     | Description                                 |
| ------------------ | --------- | ------------------------------------------- |
| `feature`          | `#0E8A16` | New feature request                         |
| `bug`              | `#D73A4A` | Bug report                                  |
| `needs-triage`     | `#FBCA04` | Needs review and prioritization             |
| `ready`            | `#0075CA` | All sections filled, ready for development  |
| `in-progress`      | `#6F42C1` | Currently being worked on                   |
| `in-review`        | `#1D76DB` | PR open, awaiting review                    |
| `blocked`          | `#B60205` | Blocked by another issue or external factor |
| `p0-critical`      | `#B60205` | Blocks other work                           |
| `p1-high`          | `#D93F0B` | Core MVP feature                            |
| `p2-medium`        | `#FBCA04` | Important but not blocking                  |
| `p3-low`           | `#0E8A16` | Nice to have                                |
| `m0-setup`         | `#C2E0C6` | Milestone 0: Project Setup                  |
| `m1-budget`        | `#C2E0C6` | Milestone 1: Budget Management              |
| `m2-subscriptions` | `#C2E0C6` | Milestone 2: Subscription Tracking          |
| `m3-analytics`     | `#C2E0C6` | Milestone 3: Dashboard & Analytics          |
| `m4-polish`        | `#C2E0C6` | Milestone 4: Notifications & Polish         |
| `m5-launch`        | `#C2E0C6` | Milestone 5: Launch Prep                    |
| `web`              | `#BFD4F2` | Affects web (Next.js)                       |
| `mobile`           | `#BFD4F2` | Affects mobile (Expo)                       |
| `api`              | `#BFD4F2` | Affects API / backend                       |
| `db`               | `#BFD4F2` | Affects database                            |

### Ready Criteria

An issue receives the `ready` label ONLY when ALL of the following are filled:

- [ ] **Summary** — Clear description of what and why
- [ ] **Architecture Plan** — Technical approach documented
- [ ] **UI/UX Direction** — Design and flow documented
- [ ] **Acceptance Criteria** — Testable checkboxes
- [ ] **Definition of Done** — Quality gates defined

**Do not start work on an issue without the `ready` label.**

---

## Testing Requirements

### Unit Tests (Vitest)

- All utility functions must have unit tests
- All tRPC procedures must have unit tests
- All custom hooks must have unit tests
- Test file naming: `<filename>.test.ts` (co-located)
- Minimum coverage target: 80%

### E2E Tests (Playwright — Web)

- All critical user flows must have E2E tests
- Test file naming: `<flow-name>.spec.ts`
- Must run against both development and production builds

### Mobile Tests (Maestro — Mobile)

- Core user flows on mobile must have Maestro tests
- Test file naming: `<flow-name>.yaml`
- Flow files live in `apps/mobile/.maestro/`

#### Local Setup

1. **Install Maestro CLI** (macOS/Linux):

   Prefer the official installation instructions from Maestro:
   <https://maestro.mobile.dev/getting-started/installing-maestro>

   If you use the installer script, download it first, inspect it, and then run it:

   ```bash
   curl -Ls 'https://get.maestro.mobile.dev' -o install-maestro.sh
   # Review the script before executing it
   bash install-maestro.sh
   ```

   Verify the installation:

   ```bash
   maestro --version
   ```

2. **Start an emulator/simulator:**

   - **Android:** Launch an Android emulator via Android Studio or `emulator -avd <name>`
   - **iOS (macOS only):** Launch an iOS simulator via Xcode or `open -a Simulator`

3. **Install a native development build on the emulator/simulator:**

   ```bash
   # From the repo root
   # Android
   pnpm --filter mobile android

   # iOS (macOS only)
   pnpm --filter mobile ios
   ```

   If you prefer Expo commands directly, you can use `expo run:android` or `expo run:ios` from `apps/mobile`.

4. **Start the Metro bundler for the installed app:**

   ```bash
   # From the repo root
   pnpm dev:mobile
   ```

   This starts `expo start`. Run it after the native app binary is installed. Maestro can launch the installed app by its app id (`com.budgetino.app`) as long as that native build is present; Metro is needed so the Expo development build can load the JavaScript bundle and render the UI (otherwise it may open to a red screen or a "bundler not running" message).

5. **Run Maestro flows against the installed app:**

   ```bash
   # Run all flows
   maestro test apps/mobile/.maestro/

   # Run a single flow
   maestro test apps/mobile/.maestro/app-launches.yaml
   ```

#### CI Integration Plan

Maestro tests will be integrated into CI in a future milestone. The planned approach:

- **Option A — Maestro Cloud:** Use [Maestro Cloud](https://cloud.mobile.dev) with EAS Build to upload builds and run flows in the cloud. This avoids managing emulators in CI.
- **Option B — Local emulator in CI:** Use a GitHub Actions workflow with an Android emulator (`reactivecircus/android-emulator-runner`) to run Maestro flows on each PR.

The chosen approach will depend on cost and complexity trade-offs at the time of implementation.

---

## CI/CD Requirements

### PR Checks (must ALL pass)

1. **Type Check** — `tsc --noEmit`
2. **Lint** — `eslint .`
3. **Format** — `prettier --check .`
4. **Unit Tests** — `vitest run`
5. **E2E Tests** — `playwright test` (web)
6. **Build** — `next build` + `expo export`

### Merge Rules

- All checks must pass
- PR title follows Conventional Commits
- At least 1 approval (when team grows; self-merge OK for solo dev initially)
- Squash merge only (keeps `main` clean)

---

## Development Setup

### Prerequisites

- Node.js 20+
- pnpm 9+
- Docker (for local Supabase)

### Getting Started

> **Note:** The Turborepo/pnpm workspace scaffold and related scripts are planned for M0 and are not yet present in the repository. The commands below will work once the scaffold is in place.

```bash
# Clone the repo
git clone https://github.com/vukovicpavle/budgetino.git
cd budgetino

# Install dependencies
pnpm install

# Start local Supabase
pnpm db:start

# Run database migrations
pnpm db:migrate

# Start development servers
pnpm dev          # All apps
pnpm dev:web      # Web only
pnpm dev:mobile   # Mobile only
```
