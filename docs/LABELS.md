# Budgetino — GitHub Labels

> Save the script below as `create-labels.sh`, or manually create these labels in GitHub Settings → Labels.

## Setup Script

```bash
#!/bin/bash
# Usage: ./create-labels.sh owner/repo
# Requires: gh CLI authenticated

if [ -z "$1" ]; then
  echo "Usage: ./create-labels.sh owner/repo" >&2
  exit 1
fi

REPO="$1"

# Delete default labels (optional)
# gh label delete "bug" --repo "$REPO" --yes 2>/dev/null
# gh label delete "documentation" --repo "$REPO" --yes 2>/dev/null
# gh label delete "enhancement" --repo "$REPO" --yes 2>/dev/null

# Workflow labels
gh label create "ready" --color "0075CA" --description "All sections filled, ready for development" --repo "$REPO" --force

echo "✅ Labels created successfully!"
```

## Label Reference

### Workflow Labels

| Label | Color | Description |
|-------|-------|-------------|
| `ready` | 🔵 `#0075CA` | All sections filled, ready for dev |

