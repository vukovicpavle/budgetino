# Budgetino — GitHub Labels

> Run this script or manually create these labels in GitHub Settings → Labels.

## Setup Script

```bash
#!/bin/bash
# Usage: ./create-labels.sh owner/repo
# Requires: gh CLI authenticated

REPO="vukovicpavle/budgetino"

# Delete default labels (optional)
# gh label delete "bug" --repo $REPO --yes 2>/dev/null
# gh label delete "documentation" --repo $REPO --yes 2>/dev/null
# gh label delete "enhancement" --repo $REPO --yes 2>/dev/null

# Type labels
gh label create "feature" --color "0E8A16" --description "New feature request" --repo $REPO --force
gh label create "bug" --color "D73A4A" --description "Bug report" --repo $REPO --force
gh label create "refactor" --color "E4E669" --description "Code refactoring" --repo $REPO --force
gh label create "docs" --color "0075CA" --description "Documentation" --repo $REPO --force
gh label create "chore" --color "BFDADC" --description "Maintenance, tooling, CI" --repo $REPO --force
gh label create "test" --color "BFD4F2" --description "Testing related" --repo $REPO --force

# Workflow labels
gh label create "needs-triage" --color "FBCA04" --description "Needs review and prioritization" --repo $REPO --force
gh label create "ready" --color "0075CA" --description "All sections filled, ready for development" --repo $REPO --force
gh label create "in-progress" --color "6F42C1" --description "Currently being worked on" --repo $REPO --force
gh label create "in-review" --color "1D76DB" --description "PR open, awaiting review" --repo $REPO --force
gh label create "blocked" --color "B60205" --description "Blocked by dependency or external factor" --repo $REPO --force
gh label create "wontfix" --color "FFFFFF" --description "Will not be addressed" --repo $REPO --force
gh label create "duplicate" --color "CFD3D7" --description "Duplicate of another issue" --repo $REPO --force

# Priority labels
gh label create "p0-critical" --color "B60205" --description "Blocks other work" --repo $REPO --force
gh label create "p1-high" --color "D93F0B" --description "Core MVP feature" --repo $REPO --force
gh label create "p2-medium" --color "FBCA04" --description "Important but not blocking" --repo $REPO --force
gh label create "p3-low" --color "0E8A16" --description "Nice to have" --repo $REPO --force

# Milestone labels
gh label create "m0-setup" --color "C2E0C6" --description "Milestone 0: Project Setup" --repo $REPO --force
gh label create "m1-budget" --color "C2E0C6" --description "Milestone 1: Budget Management" --repo $REPO --force
gh label create "m2-subscriptions" --color "C2E0C6" --description "Milestone 2: Subscription Tracking" --repo $REPO --force
gh label create "m3-analytics" --color "C2E0C6" --description "Milestone 3: Dashboard & Analytics" --repo $REPO --force
gh label create "m4-polish" --color "C2E0C6" --description "Milestone 4: Notifications & Polish" --repo $REPO --force
gh label create "m5-launch" --color "C2E0C6" --description "Milestone 5: Launch Prep" --repo $REPO --force

# Platform labels
gh label create "web" --color "BFD4F2" --description "Affects web (Next.js)" --repo $REPO --force
gh label create "mobile" --color "BFD4F2" --description "Affects mobile (Expo)" --repo $REPO --force
gh label create "api" --color "BFD4F2" --description "Affects API / backend" --repo $REPO --force
gh label create "db" --color "BFD4F2" --description "Affects database" --repo $REPO --force
gh label create "ui" --color "BFD4F2" --description "Affects shared UI components" --repo $REPO --force

echo "✅ Labels created successfully!"
```

## Label Reference

### Type Labels

| Label | Color | Description |
|-------|-------|-------------|
| `feature` | 🟢 `#0E8A16` | New feature request |
| `bug` | 🔴 `#D73A4A` | Bug report |
| `refactor` | 🟡 `#E4E669` | Code refactoring |
| `docs` | 🔵 `#0075CA` | Documentation |
| `chore` | ⚪ `#BFDADC` | Maintenance, tooling, CI |
| `test` | 🔵 `#BFD4F2` | Testing related |

### Workflow Labels

| Label | Color | Description |
|-------|-------|-------------|
| `needs-triage` | 🟡 `#FBCA04` | Needs review and prioritization |
| `ready` | 🔵 `#0075CA` | All sections filled, ready for dev |
| `in-progress` | 🟣 `#6F42C1` | Currently being worked on |
| `in-review` | 🔵 `#1D76DB` | PR open, awaiting review |
| `blocked` | 🔴 `#B60205` | Blocked by dependency |

### Priority Labels

| Label | Color | Description |
|-------|-------|-------------|
| `p0-critical` | 🔴 `#B60205` | Blocks other work |
| `p1-high` | 🟠 `#D93F0B` | Core MVP feature |
| `p2-medium` | 🟡 `#FBCA04` | Important but not blocking |
| `p3-low` | 🟢 `#0E8A16` | Nice to have |

### Milestone Labels

| Label | Color | Description |
|-------|-------|-------------|
| `m0-setup` | 🟢 `#C2E0C6` | Project Setup |
| `m1-budget` | 🟢 `#C2E0C6` | Budget Management |
| `m2-subscriptions` | 🟢 `#C2E0C6` | Subscription Tracking |
| `m3-analytics` | 🟢 `#C2E0C6` | Dashboard & Analytics |
| `m4-polish` | 🟢 `#C2E0C6` | Notifications & Polish |
| `m5-launch` | 🟢 `#C2E0C6` | Launch Prep |

### Platform Labels

| Label | Color | Description |
|-------|-------|-------------|
| `web` | 🔵 `#BFD4F2` | Next.js |
| `mobile` | 🔵 `#BFD4F2` | Expo |
| `api` | 🔵 `#BFD4F2` | tRPC / API |
| `db` | 🔵 `#BFD4F2` | Database |
| `ui` | 🔵 `#BFD4F2` | Shared UI |
