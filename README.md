# Simulation

Frontend dashboard for the crisis simulation, published via GitHub Pages.

Developed for the [Future of Security](https://future-of-security.github.io/) course.

## 3-Repo Structure

| Repo | Purpose |
|------|---------|
| `simulation` (this repo) | Static frontend dashboard (HTML/CSS/JS) |
| `simulation-data` | Simulation data: roles, injects, actions CSVs and markdown |
| `simulation-skills` | Claude Code skills and update workflow scripts |

The frontend fetches all simulation data from `simulation-data` via `raw.githubusercontent.com`.
