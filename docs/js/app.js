// Crisis Simulation Dashboard - App Logic
// Dynamically loads data from CSV and MD files

const CONFIG = {
  dataBaseUrl: "https://raw.githubusercontent.com/future-of-security/simulation-data/main",
  simId: "virginia-cascading-crisis",
  canvasUrl: "",  // Set your Canvas URL here
  phases: [
    { num: 1, title: "Cybersecurity & AI Threats", completed: true },
    { num: 2, title: "Data, Privacy, Surveillance, & Misinformation", completed: true },
    { num: 3, title: "Economic Security", completed: true },
    { num: 4, title: "Political & Societal Security", completed: true },
    { num: 5, title: "Health, Environmental, & Biosecurity", available: false },
    { num: 6, title: "Disaster Management", available: false }
  ]
};

let SIMULATION = {
  title: "Crisis Simulation",
  summary: "",
  teams: [],
  incidents: [],
  actions: []
};

let PHASE_STATE = null;  // { startedAt: Date } when phase_state.json exists

let showResolved = false;  // Toggle for showing resolved injects
let roleFilter = '';  // Filter incidents by role (visible_to)
let actionFilter = '';  // Filter actions by available_to

// Sorting state
let teamSort = { column: 'score', direction: 'desc' };  // Default: sort by score descending
let incidentSort = { column: 'severity', direction: 'desc' };  // Default: sort by severity descending

// Detect page type and initialize
document.addEventListener('DOMContentLoaded', async function() {
  const isIndexPage = document.getElementById('phases-list') !== null;
  const isPhasePage = typeof PHASE_NUM !== 'undefined';

  if (isIndexPage) {
    await initIndexPage();
  } else if (isPhasePage) {
    await initPhasePage(PHASE_NUM);
  }
});

// ==================== INDEX PAGE ====================

async function initIndexPage() {
  try {
    const overviewText = await fetchFile(`${CONFIG.dataBaseUrl}/${CONFIG.simId}/sim_overview.md`);
    parseOverview(overviewText);

    document.getElementById('sim-title').textContent = SIMULATION.title;
    document.getElementById('sim-summary').innerHTML = SIMULATION.summary;

    renderPhasesList();
  } catch (error) {
    console.error('Error loading overview:', error);
    document.getElementById('sim-summary').textContent = 'Error loading simulation data.';
  }
}

function renderPhasesList() {
  const container = document.getElementById('phases-list');
  container.innerHTML = '';

  CONFIG.phases.forEach((phase, index) => {
    const card = document.createElement('a');

    if (phase.completed) {
      card.className = 'phase-card phase-completed';
      card.href = `phase_${phase.num}/`;
    } else if (phase.available) {
      card.className = 'phase-card';
      card.href = `phase_${phase.num}/`;
    } else {
      card.className = 'phase-card phase-locked';
      card.href = '#';
    }

    const status = phase.completed ? 'Completed'
      : phase.available ? 'Available'
      : 'Coming Soon';

    card.innerHTML = `
      <div class="phase-number">Phase ${phase.num}</div>
      <div class="phase-title">${phase.title}</div>
      <div class="phase-status">${status}</div>
    `;

    // Staggered reveal animation
    card.style.animationDelay = `${index * 0.07}s`;
    if (phase.locked || (!phase.completed && !phase.available)) {
      card.addEventListener('animationend', () => card.classList.add('revealed'));
    }

    container.appendChild(card);
  });
}

// ==================== PHASE PAGE ====================

async function initPhasePage(phaseNum) {
  try {
    const base = `${CONFIG.dataBaseUrl}/${CONFIG.simId}/phase_${phaseNum}`;
    const simBase = `${CONFIG.dataBaseUrl}/${CONFIG.simId}`;
    const [overviewText, phaseOverviewText, rolesText, injectsText, actionsText, stateText] = await Promise.all([
      fetchFile(`${simBase}/sim_overview.md`),
      fetchFile(`${base}/overview.md`).catch(() => ''),
      fetchFile(`${base}/roles.csv`),
      fetchFile(`${base}/injects.csv`),
      fetchFile(`${base}/actions.csv`).catch(() => ''),
      fetchFile(`${base}/phase_state.json`).catch(() => '')
    ]);

    parseOverview(overviewText);
    SIMULATION.teams = parseCSV(rolesText, parseTeamRow);
    SIMULATION.incidents = parseCSV(injectsText, parseInjectRow);
    if (actionsText) {
      SIMULATION.actions = parseCSV(actionsText, parseActionRow);
    }

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

    // Update phase header
    const phaseInfo = CONFIG.phases.find(p => p.num === phaseNum);
    document.getElementById('phase-title').textContent = `Phase ${phaseNum}: ${phaseInfo?.title || ''}`;
    document.getElementById('phase-subtitle').textContent = SIMULATION.title;

    // Parse and display phase context
    if (phaseOverviewText) {
      const context = parsePhaseContext(phaseOverviewText);
      const contextEl = document.getElementById('phase-context');
      if (contextEl && context) {
        contextEl.innerHTML = context;
      }
    }

    updateOverviewStats();
    populateRoleFilter();
    populateActionFilter();
    renderTeamsTable();
    renderIncidentsTable();
    renderActionsTable();

  } catch (error) {
    console.error('Error loading phase data:', error);
  }
}

function parsePhaseContext(text) {
  const lines = text.split('\n');

  // Find ## Context section
  const contextIndex = lines.findIndex(l => l.toLowerCase().includes('## context'));
  if (contextIndex === -1) return null;

  let context = [];
  for (let i = contextIndex + 1; i < lines.length; i++) {
    if (lines[i].startsWith('##')) break;  // Stop at next section
    if (lines[i].startsWith('---')) break; // Stop at horizontal rule
    if (lines[i].trim()) {
      context.push(lines[i].trim());
    }
  }

  // Convert to HTML paragraphs
  return context.map(p => `<p>${p}</p>`).join('');
}

// ==================== DATA LOADING ====================

async function fetchFile(path) {
  const response = await fetch(path);
  if (!response.ok) throw new Error(`Failed to load ${path}`);
  return response.text();
}

function parseOverview(text) {
  const lines = text.split('\n');

  // First # heading is the title
  const titleMatch = lines.find(l => l.startsWith('# '));
  if (titleMatch) {
    SIMULATION.title = titleMatch.replace('# ', '').trim();
  }

  // Look for ## Summary section
  const summaryIndex = lines.findIndex(l => l.toLowerCase().includes('## summary'));
  if (summaryIndex !== -1) {
    let summary = [];
    for (let i = summaryIndex + 1; i < lines.length; i++) {
      if (lines[i].startsWith('##')) break;
      if (lines[i].trim()) summary.push(lines[i].trim());
    }
    SIMULATION.summary = summary.join('<br><br>');
  }
}

// ==================== CSV PARSING ====================

function parseCSV(text, rowParser) {
  const lines = text.split('\n').filter(l => l.trim());
  if (lines.length < 2) return [];

  const headers = parseCSVLine(lines[0]);
  const results = [];

  for (let i = 1; i < lines.length; i++) {
    const values = parseCSVLine(lines[i]);
    if (values.length >= headers.length) {
      const row = {};
      headers.forEach((h, idx) => row[h.trim()] = values[idx]?.trim() || '');
      const parsed = rowParser(row);
      if (parsed) results.push(parsed);
    }
  }
  return results;
}

function parseCSVLine(line) {
  const result = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      result.push(current);
      current = '';
    } else {
      current += char;
    }
  }
  result.push(current);
  return result;
}

function parseTeamRow(row) {
  return {
    name: row.team,
    role: row.role,
    sector: row.sector,
    budget: parseBudget(row.budget),
    trust: parseInt(row.trust) || 5,
    score: parseInt(row.score) || 0
  };
}

function parseInjectRow(row) {
  return {
    id: parseInt(row.id) || 0,
    title: row.incident,
    description: row.description,
    location: row.location,
    severity: parseInt(row.severity) || 3,
    timeLimit: parseInt(row.time_limit) || 10,
    state: row.state || 'open',
    visibleTo: (row.visible_to || '').split(';').map(t => t.trim()).filter(t => t),
    points: parseInt(row.points_resolve) || 0
  };
}

function parseActionRow(row) {
  return {
    id: row.action_id || '',
    name: row.action_name || '',
    availableTo: (row.available_to || '').split(';').map(t => t.trim()).filter(t => t),
    cost: row.cost || '$0',
    delay: row.delay_mins || '0',
    approval: row.requires_approval || 'NONE',
    trustImpact: row.trust_impact || '0',
    description: row.description || ''
  };
}

function parseBudget(str) {
  if (!str) return 0;
  const cleaned = str.replace(/[$,]/g, '').toUpperCase();
  if (cleaned.includes('M')) return parseFloat(cleaned.replace('M', '')) * 1000000;
  if (cleaned.includes('K')) return parseFloat(cleaned.replace('K', '')) * 1000;
  return parseFloat(cleaned) || 0;
}

// ==================== PHASE PAGE RENDERING ====================

function updateOverviewStats() {
  const teams = SIMULATION.teams;
  const allIncidents = SIMULATION.incidents;
  const visibleIncidents = allIncidents.filter(i => i.state !== 'hidden');
  const activeIncidents = visibleIncidents.filter(i => i.state !== 'resolved');
  const resolvedIncidents = visibleIncidents.filter(i => i.state === 'resolved');

  // Incident stats
  const totalCount = visibleIncidents.length;
  const activeCount = activeIncidents.length;
  const resolvedCount = resolvedIncidents.length;
  const resolveRate = totalCount > 0 ? Math.round((resolvedCount / totalCount) * 100) : 0;

  document.getElementById('incident-total').textContent = totalCount;
  document.getElementById('incident-active').textContent = activeCount;
  document.getElementById('incident-resolved').textContent = resolvedCount;
  document.getElementById('resolve-rate').textContent = `${resolveRate}%`;

  // Team stats - Top 3 by score
  const sortedTeams = [...teams].sort((a, b) => b.score - a.score);
  const top3 = sortedTeams.slice(0, 3);
  const medals = ['🥇', '🥈', '🥉'];
  const top3Html = top3.length > 0
    ? top3.map((t, i) => `${medals[i]} ${t.name} (${t.score})`).join('<br>')
    : '—';
  document.getElementById('top-teams').innerHTML = top3Html;

  // Average trust
  const avgTrust = teams.length > 0 ? teams.reduce((sum, t) => sum + t.trust, 0) / teams.length : 0;
  document.getElementById('avg-trust').textContent = `${Math.round(avgTrust * 10)}%`;

  // Total budget
  document.getElementById('total-budget').textContent = formatCurrency(teams.reduce((sum, t) => sum + t.budget, 0));
}

function renderTeamsTable() {
  const tbody = document.querySelector('#teams-table tbody');
  if (!tbody) return;
  tbody.innerHTML = '';

  // Sort teams
  const sortedTeams = [...SIMULATION.teams].sort((a, b) => {
    let aVal, bVal;
    switch (teamSort.column) {
      case 'name': aVal = a.name.toLowerCase(); bVal = b.name.toLowerCase(); break;
      case 'role': aVal = a.role.toLowerCase(); bVal = b.role.toLowerCase(); break;
      case 'budget': aVal = a.budget; bVal = b.budget; break;
      case 'trust': aVal = a.trust; bVal = b.trust; break;
      case 'score': aVal = a.score; bVal = b.score; break;
      default: aVal = a.score; bVal = b.score;
    }
    if (typeof aVal === 'string') {
      return teamSort.direction === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
    }
    return teamSort.direction === 'asc' ? aVal - bVal : bVal - aVal;
  });

  sortedTeams.forEach(team => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${escapeHtml(team.name)}</td>
      <td>${escapeHtml(team.role)}</td>
      <td>${formatCurrency(team.budget)}</td>
      <td>${Math.round(team.trust * 10)}%</td>
      <td>${team.score}</td>
    `;
    tbody.appendChild(tr);
  });

  staggerRows(tbody);
  updateSortIndicators('teams-table', teamSort);
}

function sortTeamsBy(column) {
  if (teamSort.column === column) {
    teamSort.direction = teamSort.direction === 'asc' ? 'desc' : 'asc';
  } else {
    teamSort.column = column;
    teamSort.direction = 'desc';  // Default to descending for new column
  }
  renderTeamsTable();
}

function populateRoleFilter() {
  const select = document.getElementById('role-filter');
  if (!select) return;

  // Get unique role names from incidents' visibleTo field
  const roles = new Set();
  SIMULATION.incidents.forEach(incident => {
    incident.visibleTo.forEach(role => roles.add(role));
  });

  // Add options sorted alphabetically
  const sortedRoles = [...roles].sort();
  sortedRoles.forEach(role => {
    const option = document.createElement('option');
    option.value = role;
    option.textContent = role;
    select.appendChild(option);
  });
}

function filterByRole() {
  const select = document.getElementById('role-filter');
  roleFilter = select ? select.value : '';
  renderIncidentsTable();
}

function populateActionFilter() {
  const select = document.getElementById('action-filter');
  if (!select) return;

  // Get unique role names from actions' availableTo field
  const roles = new Set();
  SIMULATION.actions.forEach(action => {
    action.availableTo.forEach(role => {
      if (role !== 'ALL') roles.add(role);
    });
  });

  // Add options sorted alphabetically
  const sortedRoles = [...roles].sort();
  sortedRoles.forEach(role => {
    const option = document.createElement('option');
    option.value = role;
    option.textContent = role;
    select.appendChild(option);
  });
}

function filterByAction() {
  const select = document.getElementById('action-filter');
  actionFilter = select ? select.value : '';
  renderActionsTable();
}

function renderIncidentsTable() {
  const tbody = document.querySelector('#incidents-table tbody');
  if (!tbody) return;
  tbody.innerHTML = '';

  // Filter based on showResolved toggle
  let incidents = showResolved
    ? SIMULATION.incidents.filter(i => i.state !== 'hidden')
    : SIMULATION.incidents.filter(i => i.state !== 'resolved' && i.state !== 'hidden');

  // Filter by role if selected
  if (roleFilter) {
    incidents = incidents.filter(i => i.visibleTo.includes(roleFilter));
  }

  // Sort incidents
  const stateOrder = { 'escalated': 0, 'open': 1, 'in_progress': 2, 'partially_resolved': 3, 'resolved': 4 };
  incidents.sort((a, b) => {
    let aVal, bVal;
    switch (incidentSort.column) {
      case 'title': aVal = a.title.toLowerCase(); bVal = b.title.toLowerCase(); break;
      case 'severity': aVal = a.severity; bVal = b.severity; break;
      case 'timeLimit': aVal = a.timeLimit; bVal = b.timeLimit; break;
      case 'state': aVal = stateOrder[a.state] ?? 5; bVal = stateOrder[b.state] ?? 5; break;
      default: aVal = a.severity; bVal = b.severity;
    }
    if (typeof aVal === 'string') {
      return incidentSort.direction === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
    }
    return incidentSort.direction === 'asc' ? aVal - bVal : bVal - aVal;
  });

  incidents.forEach(incident => {
    const tr = document.createElement('tr');
    const isResolved = incident.state === 'resolved';
    tr.className = `clickable-row ${isResolved ? 'resolved-row' : ''}`;
    tr.onclick = () => showInjectModal(incident);
    const timeLeft = getTimeLeft(incident);
    tr.innerHTML = `
      <td>${escapeHtml(incident.title)}</td>
      <td>${getSeverityBadge(incident.severity)}</td>
      <td>${formatTimeLimit(incident.timeLimit)}</td>
      <td>${getStateIndicator(incident.state)}</td>
      <td class="col-time-left">${timeLeft ? timeLeft.html : ''}</td>
    `;
    tbody.appendChild(tr);
  });

  staggerRows(tbody);

  // Update toggle button text
  updateResolvedToggle();
  updateSortIndicators('incidents-table', incidentSort);
}

function sortIncidentsBy(column) {
  if (incidentSort.column === column) {
    incidentSort.direction = incidentSort.direction === 'asc' ? 'desc' : 'asc';
  } else {
    incidentSort.column = column;
    incidentSort.direction = 'desc';  // Default to descending for new column
  }
  renderIncidentsTable();
}

function toggleResolvedInjects() {
  showResolved = !showResolved;
  renderIncidentsTable();
}

function updateResolvedToggle() {
  const btn = document.getElementById('toggle-resolved');
  if (!btn) return;

  const resolvedCount = SIMULATION.incidents.filter(i => i.state === 'resolved').length;
  if (resolvedCount === 0) {
    btn.style.display = 'none';
    return;
  }

  btn.style.display = 'inline-flex';
  btn.textContent = showResolved
    ? `Hide Resolved (${resolvedCount})`
    : `Show Resolved (${resolvedCount})`;
  btn.className = showResolved ? 'btn btn-toggle active' : 'btn btn-toggle';
}

function renderActionsTable() {
  const tbody = document.querySelector('#actions-table tbody');
  if (!tbody) return;
  tbody.innerHTML = '';

  // Filter actions by selected role
  let actions = [...SIMULATION.actions];
  if (actionFilter) {
    actions = actions.filter(a =>
      a.availableTo.includes(actionFilter) || a.availableTo.includes('ALL')
    );
  }

  if (actions.length === 0) {
    const tr = document.createElement('tr');
    tr.innerHTML = '<td colspan="8" style="text-align: center; color: var(--text-muted, #6B7280);">No actions available</td>';
    tbody.appendChild(tr);
    return;
  }

  actions.forEach(action => {
    const tr = document.createElement('tr');
    const availableToStr = action.availableTo.includes('ALL')
      ? 'All Teams'
      : action.availableTo.length > 2
        ? action.availableTo.slice(0, 2).join(', ') + ` +${action.availableTo.length - 2}`
        : action.availableTo.join(', ');
    const delayStr = action.delay === '0' ? 'Immediate' : `${action.delay} min`;
    const approvalStr = action.approval === 'NONE' ? '—' : action.approval;
    const trustStr = action.trustImpact === '0' ? '—' : action.trustImpact;

    tr.innerHTML = `
      <td><strong>${escapeHtml(action.id)}</strong></td>
      <td>${escapeHtml(action.name)}</td>
      <td class="available-to-cell" title="${escapeHtml(action.availableTo.join(', '))}">${escapeHtml(availableToStr)}</td>
      <td>${escapeHtml(action.cost)}</td>
      <td>${delayStr}</td>
      <td>${escapeHtml(approvalStr)}</td>
      <td>${escapeHtml(trustStr)}</td>
      <td class="description-cell">${escapeHtml(action.description)}</td>
    `;
    tbody.appendChild(tr);
  });

  staggerRows(tbody);
}

// ==================== ANIMATION HELPERS ====================

function staggerRows(tbody) {
  const rows = tbody.querySelectorAll('tr');
  rows.forEach((row, i) => {
    row.classList.add('stagger-in');
    row.style.animationDelay = `${i * 0.03}s`;
  });
}

// ==================== HELPERS ====================

function getSeverityBadge(severity) {
  const map = {
    5: { label: 'Critical', class: 'badge-critical' },
    4: { label: 'High', class: 'badge-high' },
    3: { label: 'Medium', class: 'badge-medium' },
    2: { label: 'Low', class: 'badge-low' },
    1: { label: 'Info', class: 'badge-info' }
  };
  const s = map[severity] || map[3];
  return `<span class="badge ${s.class}">${s.label}</span>`;
}

function getStateIndicator(state) {
  const map = {
    'open': { label: 'Pending', class: 'state-pending' },
    'in_progress': { label: 'In Progress', class: 'state-in-progress' },
    'escalated': { label: 'Escalated', class: 'state-escalated' },
    'resolved': { label: 'Resolved', class: 'state-resolved' },
    'partially_resolved': { label: 'Partial', class: 'state-partial' },
    'hidden': { label: 'Hidden', class: 'state-hidden' }
  };
  const s = map[state] || map['open'];
  return `<span class="state ${s.class}"><span class="state-dot"></span>${s.label}</span>`;
}

function formatCurrency(amount) {
  if (amount >= 1000000) return '$' + (amount / 1000000).toFixed(0) + 'M';
  if (amount >= 1000) return '$' + (amount / 1000).toFixed(0) + 'K';
  return '$' + amount.toLocaleString();
}

function escapeHtml(text) {
  if (!text) return '';
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function updateSortIndicators(tableId, sortState) {
  const table = document.getElementById(tableId);
  if (!table) return;

  // Remove existing sort indicators
  table.querySelectorAll('th').forEach(th => {
    th.classList.remove('sort-asc', 'sort-desc');
  });

  // Add indicator to current sort column
  const th = table.querySelector(`th[data-sort="${sortState.column}"]`);
  if (th) {
    th.classList.add(sortState.direction === 'asc' ? 'sort-asc' : 'sort-desc');
  }
}

function formatTimeLimit(minutes) {
  if (minutes >= 60) return `${Math.round(minutes / 60)}h`;
  return `${minutes}m`;
}

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

// ==================== INJECT MODAL ====================

function showInjectModal(inject) {
  const modal = document.getElementById('inject-modal');
  if (!modal) return;

  // Populate modal content
  document.getElementById('modal-title').textContent = inject.title;
  document.getElementById('modal-description').textContent = inject.description || 'No description available.';
  document.getElementById('modal-location').textContent = inject.location || '—';
  document.getElementById('modal-time').textContent = formatTimeLimit(inject.timeLimit);
  document.getElementById('modal-visible').textContent = inject.visibleTo.length > 0 ? inject.visibleTo.join(', ') : 'All Teams';
  document.getElementById('modal-points').textContent = inject.points || '—';

  // Set severity badge
  const severityEl = document.getElementById('modal-severity');
  const severityInfo = getSeverityInfo(inject.severity);
  severityEl.textContent = severityInfo.label;
  severityEl.className = `badge ${severityInfo.class}`;

  // Set state indicator
  const stateEl = document.getElementById('modal-state');
  stateEl.innerHTML = getStateIndicator(inject.state);

  // Show modal
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeInjectModal() {
  const modal = document.getElementById('inject-modal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

function closeModal(event) {
  if (event.target.classList.contains('modal')) {
    closeInjectModal();
  }
}

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeInjectModal();
});

function getSeverityInfo(severity) {
  const map = {
    5: { label: 'Critical', class: 'badge-critical' },
    4: { label: 'High', class: 'badge-high' },
    3: { label: 'Medium', class: 'badge-medium' },
    2: { label: 'Low', class: 'badge-low' },
    1: { label: 'Info', class: 'badge-info' }
  };
  return map[severity] || map[3];
}
