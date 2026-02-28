# Realtime Dashboard Design

**Date:** 2026-02-28
**Status:** Approved

## Goal

Add two live features to phase pages:
1. **Auto-refresh** — re-fetch data every 5 minutes and re-render tables when something changed
2. **Countdown timers** — show time remaining per inject based on a facilitator-set phase start time

## Data: `phase_state.json`

A new file in `simulation-data` per active phase:

```
virginia-cascading-crisis/phase_N/phase_state.json
```

```json
{
  "started_at": "2026-02-28T09:15:00-05:00"
}
```

- Facilitator creates this file when a phase goes live and pushes it alongside `roles.csv` / `injects.csv`
- If absent (404) — completed phases, locked phases — countdown column is hidden entirely, no errors shown

## Auto-Refresh

Phase pages only (not index).

- `setInterval` every **5 minutes** (matches raw.githubusercontent.com CDN cache window)
- Re-fetches `roles.csv`, `injects.csv`, `actions.csv`, `phase_state.json` in parallel
- **Fingerprint check**: concatenate all four raw responses, compare to previous fingerprint
  - Identical → skip re-render (no flicker, no wasted DOM work)
  - Changed → re-render teams table, injects table, stats card; leave header and context card untouched
- A **"Last updated: HH:MM AM/PM"** status line in the header updates on every successful poll
- Fetch failures → silently retry next cycle (no error UI)

## Countdown Timers

When `phase_state.json` is present, a **"Time Left"** column is added as the last column of the Active Incidents table.

Time remaining per inject = `started_at + time_limit_mins − now`

| Remaining | Display | Style |
|-----------|---------|-------|
| > 10 min | `42m` | normal |
| ≤ 10 min | `8m` | amber/yellow |
| ≤ 0 | `OVERTIME +3m` | red bold |
| Resolved inject | `—` | muted |

- `setInterval` every **30 seconds** re-renders only the Time Left cells (not full table rows)
- When `phase_state.json` absent → column hidden entirely

## Files Changed

| File | Change |
|------|--------|
| `docs/js/app.js` | Add poll loop, fingerprint check, `phase_state.json` fetch, countdown timer logic, status line update |
| `docs/phase_N/index.html` (all 4) | Add "Time Left" `<th>` to incidents table header; add status line element to header |
| `docs/css/styles.css` | Add styles for `.time-warning` (amber), `.time-critical` (red), `.last-updated` status line |
| `simulation-data/virginia-cascading-crisis/phase_N/phase_state.json` | New file (facilitator creates when phase goes live) |

## Out of Scope

- Index page auto-refresh (phases don't change mid-session)
- Per-second countdown tick (30s is sufficient; phases run 60 min)
- Server-side push / WebSockets
