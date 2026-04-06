# Deployment Guide

This document describes how to deploy **Budgetino web** to [Vercel](https://vercel.com) and how to enable [Turborepo Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching).

---

## Prerequisites

- A [Vercel](https://vercel.com) account (free Hobby plan is sufficient)
- Access to the GitHub repository (`vukovicpavle/budgetino`)
- A [Supabase](https://supabase.com) project with the API keys ready

---

## 1 — Connect Vercel to GitHub

1. Go to <https://vercel.com/new> and click **Import Git Repository**.
2. Select the `vukovicpavle/budgetino` repository.
3. Vercel will detect the repository and ask for project settings — **do not deploy yet**.

---

## 2 — Configure Project Settings

In the **Configure Project** screen (or later in *Project → Settings → General*), use the following settings:

| Setting | Value |
|---|---|
| **Root Directory** | *(leave blank — repo root)* |
| **Framework Preset** | Next.js (auto-detected) |
| **Build Command** | *(leave blank — uses `vercel.json`)* |
| **Install Command** | *(leave blank — uses `vercel.json`)* |
| **Output Directory** | *(leave blank — uses `vercel.json`)* |

> **Why repo root?**  
> `vercel.json` lives at the repo root and uses repo-root-relative paths (e.g. `apps/web/.next`
> for output, `pnpm turbo build --filter=web` for the build). Setting Root Directory to
> `apps/web` would break these paths and cause Vercel to ignore the root-level config.
> Keeping the project root at the repo root lets `vercel.json` drive everything.

---

## 3 — Set Environment Variables

In *Project → Settings → Environment Variables*, add the following variables.  
Use `.env.example` at the repo root as a reference.

| Variable | Environments | Description |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Production, Preview, Development | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Production, Preview, Development | Supabase public anon key |
| `SUPABASE_SERVICE_ROLE_KEY` | Production, Preview | Supabase service role key (server-side only) |
| `NEXT_PUBLIC_APP_URL` | Production | Base URL, e.g. `https://budgetino.vercel.app` |

> **Security note:** Never commit real keys to source control.  
> The `.env.example` file contains only placeholder values and is safe to commit.

---

## 4 — Enable Turborepo Remote Caching

Vercel provides free remote caching for Turborepo on all plans.

1. In the Vercel dashboard, go to *Project → Settings → Turborepo Remote Caching*.
2. Toggle **Enable Remote Caching** on.
3. Vercel automatically injects `TURBO_TOKEN` and `TURBO_TEAM` into the build environment.

No `turbo.json` changes are required — Turborepo detects Vercel's environment variables automatically.

---

## 5 — Deploy Behaviour

| Event | Deploy Type | Notes |
|---|---|---|
| Push to `main` | Production | Automatically triggers a production build |
| Open / update a PR | Preview | Each PR gets a unique preview URL |
| Other branches | Preview | Optionally enable in *Project → Settings → Git* |

The `ignoreCommand` in `vercel.json` uses [`turbo-ignore`](https://turbo.build/repo/docs/reference/turbo-ignore) to skip rebuilds when no files affecting the `web` workspace have changed.

---

## 6 — Local Development

Copy the example env file and fill in your values:

```bash
cp .env.example apps/web/.env.local
```

Then start the dev server:

```bash
pnpm dev:web
```

---

## Troubleshooting

| Problem | Fix |
|---|---|
| Build fails with "workspace not found" | Ensure **Root Directory** is left blank (repo root) in Vercel project settings |
| Missing env vars at runtime | Add them in *Vercel → Project → Settings → Environment Variables* and redeploy |
| Preview deploy not triggered on PR | Check *Project → Settings → Git → Preview Branches* configuration |
| Remote caching not working | Verify **Turborepo Remote Caching** is enabled in Vercel project settings |
