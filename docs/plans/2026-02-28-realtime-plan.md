# Realtime Dashboard Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add auto-refresh (5-min poll) and inject countdown timers (driven by `phase_state.json`) to phase dashboard pages.

**Architecture:** Pure vanilla JS additions to the existing `app.js`. A new module-level variable `PHASE_STATE` holds `{ started_at }`. A `setInterval` at 5 min re-fetches data and re-renders if fingerprint changed. A second `setInterval` at 30 sec ticks Time Left cells. The "Time Left" column is conditionally shown/hidden via a CSS class on the `<table>`.

**Tech Stack:** Vanilla JS, plain CSS. No new dependencies.

---

### Task 1: Add CSS styles for status line and countdown

**Files:**
- Modify: `docs/css/styles.css` (append to end)

**Step 1: Append these styles to `docs/css/styles.css`**

```css
/* ==================== REALTIME / LIVE PHASE ==================== */

/* "Last updated" status line in phase header */
.last-updated {
  font-size: 12px;
  color: #9CA3AF;
  margin-top: 4px;
}

/* Time Left column — hidden by default, shown when phase_state.json exists */
#incidents-table .col-time-left { display: none; }
#incidents-table.live-phase .col-time-left { display: table-cell; }

/* Countdown cell states */
.time-ok   { color: inherit; }
.time-warn { color: #D97706; font-weight: 500; }   /* amber — ≤ 10 min */
.time-crit { color: #DC2626; font-weight: 700; }   /* red   — overtime  */
.time-done { color: #9CA3AF; }                      /* resolved          */
```

**Step 2: Verify**

Open `docs/css/styles.css` — confirm the new block is at the bottom and contains all 5 rules above.

**Step 3: Commit**

```bash
git add docs/css/styles.css
git commit -m "style: add realtime status line and countdown timer styles"
```

---

### Task 2: Add status line + Time Left `<th>` to all 4 phase HTML files

**Files:**
- Modify: `docs/phase_1/index.html:21-22` (and same spot in phases 2, 3, 4)
- Modify: `docs/phase_1/index.html:124-125` incidents table header (and phases 2, 3, 4)

The two changes per file are:

**Change A** — Add `<p class="last-updated" id="last-updated"></p>` right after the subtitle on line 21:

Before (line 21):
```html
      <p class="header-subtitle" id="phase-subtitle">Loading...</p>
    </header>
```

After:
```html
      <p class="header-subtitle" id="phase-subtitle">Loading...</p>
      <p class="last-updated" id="last-updated"></p>
    </header>
```

**Change B** — Add `Time Left` `<th>` as the last column in the incidents table header. The current header (line ~123-125 in phase_4):
```html
              <th class="sortable-header" data-sort="state" onclick="sortIncidentsBy('state')">State</th>
            </tr>
```

After:
```html
              <th class="sortable-header" data-sort="state" onclick="sortIncidentsBy('state')">State</th>
              <th class="col-time-left">Time Left</th>
            </tr>
```

**Step 1: Apply Change A to phase_1/index.html**

**Step 2: Apply Change B to phase_1/index.html**

**Step 3: Repeat for phase_2, phase_3, phase_4**

**Step 4: Verify**

Open each HTML file and confirm the `last-updated` paragraph and `col-time-left` th are present.

**Step 5: Commit**

```bash
git add docs/phase_1/index.html docs/phase_2/index.html docs/phase_3/index.html docs/phase_4/index.html
git commit -m "feat: add status line and Time Left column header to phase pages"
```

---

### Task 3: Add `PHASE_STATE` variable and fetch it in `initPhasePage`

**Files:**
- Modify: `docs/js/app.js:18-24` (module-level state)
- Modify: `docs/js/app.js:103-120` (`initPhasePage` fetch block)

**Step 1: Add `PHASE_STATE` to module-level state (after line 24)**

Current block (lines 18-24):
```javascript
let SIMULATION = {
  title: "Crisis Simulation",
  summary: "",
  teams: [],
  incidents: [],
  actions: []
};
```

Add after it:
```javascript
let PHASE_STATE = null;  // { started_at: Date } when phase_state.json exists
```

**Step 2: Fetch `phase_state.json` in `initPhasePage`**

Current `Promise.all` (lines 107-113):
```javascript
    const [overviewText, phaseOverviewText, rolesText, injectsText, actionsText] = await Promise.all([
      fetchFile(`${simBase}/sim_overview.md`),
      fetchFile(`${base}/overview.md`).catch(() => ''),
      fetchFile(`${base}/roles.csv`),
      fetchFile(`${base}/injects.csv`),
      fetchFile(`${base}/actions.csv`).catch(() => '')
    ]);
```

Replace with:
```javascript
    const [overviewText, phaseOverviewText, rolesText, injectsText, actionsText, stateText] = await Promise.all([
      fetchFile(`${simBase}/sim_overview.md`),
      fetchFile(`${base}/overview.md`).catch(() => ''),
      fetchFile(`${base}/roles.csv`),
      fetchFile(`${base}/injects.csv`),
      fetchFile(`${base}/actions.csv`).catch(() => ''),
      fetchFile(`${base}/phase_state.json`).catch(() => '')
    ]);
```

**Step 3: Parse `phase_state.json` and set `PHASE_STATE`**

After line 120 (`if (actionsText) { ... }`), add:
```javascript
    // Parse phase state (live countdown)
    PHASE_STATE = null;
    if (stateText) {
      try {
        const ps = JSON.parse(stateText);
        if (ps.started_at) {
          PHASE_STATE = { startedAt: new Date(ps.started_at) };
          document.getElementById('incidents-table')?.classList.add('live-phase');
        }
      } catch (e) { /* malformed JSON — ignore */ }
    } else {
      document.getElementById('incidents-table')?.classList.remove('live-phase');
    }
```

**Step 4: Verify**

- Reload a phase page in browser devtools
- Confirm no JS errors on load
- If no `phase_state.json` exists yet, `PHASE_STATE` stays `null` (expected)

**Step 5: Commit**

```bash
git add docs/js/app.js
git commit -m "feat: fetch phase_state.json and set PHASE_STATE on load"
```

---

### Task 4: Add `getTimeLeft` helper and Time Left cell to `renderIncidentsTable`

**Files:**
- Modify: `docs/js/app.js` — add helper after `formatTimeLimit`, update `renderIncidentsTable`

**Step 1: Add `getTimeLeft` helper after `formatTimeLimit` (around line 627)**

```javascript
function getTimeLeft(inject) {
  if (!PHASE_STATE) return null;
  if (inject.state === 'resolved' || inject.state === 'partially_resolved') {
    return { html: '<span class="time-done">—</span>' };
  }
  const deadlineMs = PHASE_STATE.startedAt.getTime() + inject.timeLimit * 60 * 1000;
  const remainingMs = deadlineMs - Date.now();
  const remainingMin = Math.round(remainingMs / 60000);

  if (remainingMs > 10 * 60 * 1000) {
    return { html: `<span class="time-ok">${remainingMin}m</span>` };
  } else if (remainingMs > 0) {
    return { html: `<span class="time-warn">${remainingMin}m</span>` };
  } else {
    const overMin = Math.abs(remainingMin);
    return { html: `<span class="time-crit">+${overMin}m</span>` };
  }
}
```

**Step 2: Add Time Left `<td>` to each row in `renderIncidentsTable`**

Current row template (lines 465-470):
```javascript
    tr.innerHTML = `
      <td>${escapeHtml(incident.title)}</td>
      <td>${getSeverityBadge(incident.severity)}</td>
      <td>${formatTimeLimit(incident.timeLimit)}</td>
      <td>${getStateIndicator(incident.state)}</td>
    `;
```

Replace with:
```javascript
    const timeLeft = getTimeLeft(incident);
    tr.innerHTML = `
      <td>${escapeHtml(incident.title)}</td>
      <td>${getSeverityBadge(incident.severity)}</td>
      <td>${formatTimeLimit(incident.timeLimit)}</td>
      <td>${getStateIndicator(incident.state)}</td>
      <td class="col-time-left">${timeLeft ? timeLeft.html : ''}</td>
    `;
```

**Step 3: Verify**

- Open a phase page in browser
- If no `phase_state.json`, the Time Left column is hidden (CSS `.col-time-left { display: none }`)
- No JS errors

**Step 4: Commit**

```bash
git add docs/js/app.js
git commit -m "feat: add getTimeLeft helper and Time Left column to incidents table"
```

---

### Task 5: Add 30-second countdown tick interval

**Files:**
- Modify: `docs/js/app.js` — add `startCountdownTick` function and call it from `initPhasePage`

**Step 1: Add `startCountdownTick` function (before the `// ==================== DATA LOADING ====================` section)**

```javascript
// ==================== REALTIME ====================

let countdownInterval = null;

function startCountdownTick() {
  if (countdownInterval) clearInterval(countdownInterval);
  if (!PHASE_STATE) return;

  countdownInterval = setInterval(() => {
    const tbody = document.querySelector('#incidents-table tbody');
    if (!tbody) return;

    const rows = tbody.querySelectorAll('tr');
    const visibleIncidents = PHASE_STATE
      ? (showResolved
          ? SIMULATION.incidents.filter(i => i.state !== 'hidden')
          : SIMULATION.incidents.filter(i => i.state !== 'resolved' && i.state !== 'hidden'))
      : [];

    if (roleFilter) {
      // same filter as renderIncidentsTable — only update if filters match count
    }

    rows.forEach((tr, i) => {
      const incident = visibleIncidents[i];
      if (!incident) return;
      const td = tr.querySelector('.col-time-left');
      if (!td) return;
      const timeLeft = getTimeLeft(incident);
      if (timeLeft) td.innerHTML = timeLeft.html;
    });
  }, 30 * 1000);
}
```

**Step 2: Call `startCountdownTick()` at the end of `initPhasePage`** (after `renderActionsTable()`, before the catch block)

```javascript
    startCountdownTick();
```

**Step 3: Verify**

- With a `phase_state.json` present in simulation-data for a phase, Time Left cells should appear and update every 30 seconds
- Without it, no countdown, no errors

**Step 4: Commit**

```bash
git add docs/js/app.js
git commit -m "feat: add 30-second countdown tick for Time Left cells"
```

---

### Task 6: Add 5-minute data poll loop with fingerprint check

**Files:**
- Modify: `docs/js/app.js` — add `startPollLoop` function and call from `initPhasePage`

**Step 1: Add `startPollLoop` function (in the `// ==================== REALTIME ====================` section)**

```javascript
let pollInterval = null;
let lastFingerprint = '';

function updateLastUpdated() {
  const el = document.getElementById('last-updated');
  if (!el) return;
  const now = new Date();
  el.textContent = `Updated ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
}

async function pollData(phaseNum) {
  const base = `${CONFIG.dataBaseUrl}/${CONFIG.simId}/phase_${phaseNum}`;
  try {
    const [rolesText, injectsText, actionsText, stateText] = await Promise.all([
      fetchFile(`${base}/roles.csv`),
      fetchFile(`${base}/injects.csv`),
      fetchFile(`${base}/actions.csv`).catch(() => ''),
      fetchFile(`${base}/phase_state.json`).catch(() => '')
    ]);

    const fingerprint = rolesText + injectsText + actionsText + stateText;
    updateLastUpdated();

    if (fingerprint === lastFingerprint) return;  // nothing changed
    lastFingerprint = fingerprint;

    // Update data
    SIMULATION.teams = parseCSV(rolesText, parseTeamRow);
    SIMULATION.incidents = parseCSV(injectsText, parseInjectRow);
    if (actionsText) SIMULATION.actions = parseCSV(actionsText, parseActionRow);

    // Re-parse phase state
    PHASE_STATE = null;
    if (stateText) {
      try {
        const ps = JSON.parse(stateText);
        if (ps.started_at) {
          PHASE_STATE = { startedAt: new Date(ps.started_at) };
          document.getElementById('incidents-table')?.classList.add('live-phase');
        }
      } catch (e) {}
    } else {
      document.getElementById('incidents-table')?.classList.remove('live-phase');
    }

    // Re-render dynamic sections only
    updateOverviewStats();
    renderTeamsTable();
    renderIncidentsTable();
    renderActionsTable();
    startCountdownTick();

  } catch (e) {
    // Silently ignore — retry next cycle
  }
}

function startPollLoop(phaseNum) {
  if (pollInterval) clearInterval(pollInterval);
  // Set initial fingerprint from what was already loaded
  pollInterval = setInterval(() => pollData(phaseNum), 5 * 60 * 1000);
}
```

**Step 2: Set `lastFingerprint` at the end of `initPhasePage`** (after initial data is loaded, before `startCountdownTick()`)

```javascript
    lastFingerprint = rolesText + injectsText + (actionsText || '') + (stateText || '');
    updateLastUpdated();
    startPollLoop(phaseNum);
    startCountdownTick();
```

**Step 3: Verify**

- In browser devtools Network tab: after 5 minutes, confirm new fetch requests go to `raw.githubusercontent.com`
- "Updated HH:MM" appears in the header after load
- No console errors

**Step 4: Commit**

```bash
git add docs/js/app.js
git commit -m "feat: add 5-minute data poll loop with fingerprint change detection"
```

---

### Task 7: Create example `phase_state.json` in simulation-data

**Files:**
- Create: `simulation-data` repo — `virginia-cascading-crisis/phase_5/phase_state.json` (example for Phase 5 when it goes live)

**Step 1: Note — do NOT create this for past phases (1–4)** — they are completed and should not show countdowns.

**Step 2: Document the facilitator workflow** — when Phase 5 goes live, create:

`/c/Users/hlz/Downloads/repos/simulation-data/virginia-cascading-crisis/phase_5/phase_state.json`
```json
{
  "started_at": "2026-MM-DDTHH:MM:SS-05:00"
}
```

Then push simulation-data. The dashboard will show Time Left within ~5 minutes (CDN cache).

**Step 3: Update AGENTS.md in simulation-skills** — add a note to the update cycle workflow:

Add after step 1 (Fetch submissions):
> Before phase start: create `phase_N/phase_state.json` with `{ "started_at": "<ISO timestamp with timezone>" }` and push.

**Step 4: Commit simulation-skills**

```bash
cd /c/Users/hlz/Downloads/repos/simulation-skills
git add AGENTS.md
git commit -m "docs: add phase_state.json creation to update cycle workflow"
```

---

### Task 8: Push simulation repo and verify

**Step 1: Push simulation repo**

```bash
cd /c/Users/hlz/Downloads/repos/simulation
git push origin main
```

**Step 2: Wait ~2 minutes for GitHub Pages to redeploy**

**Step 3: Open a completed phase page (e.g. Phase 4) in browser**

- "Updated HH:MM" should appear in the header
- Time Left column should be hidden (no `phase_state.json` for Phase 4)
- No console errors

**Step 4: Test countdown manually** — temporarily create `phase_state.json` in simulation-data for phase 4 with a `started_at` 55 minutes ago. Push. Wait ~5 min for CDN. Reload — Time Left column should appear with several injects showing red OVERTIME.

**Step 5: Remove the test `phase_state.json`** and push simulation-data again.
