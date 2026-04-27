#!/usr/bin/env node
// Transforms ./raw-data/strava/*.json → ./artefacts/app-coach/data/runs.json
// Run: node scripts/build-data.js

const fs = require('fs');
const path = require('path');

const rawDir = path.join(__dirname, '..', 'raw-data', 'strava');
const outFile = path.join(__dirname, '..', 'artefacts', 'app-coach', 'data', 'runs.json');

// ── helpers ──────────────────────────────────────────────────────────────────

function fmtTime(seconds) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  if (h > 0) return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  return `${m}:${String(s).padStart(2, '0')}`;
}

function classifyRun(distM, movingTimeSec, sportType) {
  if (sportType !== 'Run') return null; // exclude workouts / rides
  const distKm = distM / 1000;
  if (distKm < 1) return 'fractionne';
  if (distKm >= 18) return 'longue';
  const paceSecPerKm = distM > 0 ? movingTimeSec / distKm : 9999;
  if (paceSecPerKm < 300) return 'tempo';
  if (paceSecPerKm <= 360) return 'endurance';
  return 'recup';
}

// ── load all activities ───────────────────────────────────────────────────────

const files = fs.readdirSync(rawDir).filter(f => f.endsWith('.json'));
const activities = files.map(f => JSON.parse(fs.readFileSync(path.join(rawDir, f), 'utf8')));

// filter & map to run objects
const runs = [];
for (const a of activities) {
  const type = classifyRun(a.distance || 0, a.moving_time || 0, a.sport_type);
  if (!type) continue;

  const distKm = (a.distance || 0) / 1000;
  const paceSecPerKm = distKm > 0 ? Math.round((a.moving_time || 0) / distKm) : 0;
  const dateObj = new Date(a.date);
  const dd = String(dateObj.getDate()).padStart(2, '0');
  const mm = String(dateObj.getMonth() + 1).padStart(2, '0');

  runs.push({
    id: a.id,
    date: a.date,
    date_display: `${dd}/${mm}`,
    name: a.name,
    dist: Math.round(distKm * 100) / 100,
    time: fmtTime(a.moving_time || 0),
    pace: paceSecPerKm,
    type,
    sport_type: a.sport_type,
    ...(a.total_elevation_gain != null && a.total_elevation_gain > 0 ? { elevation: a.total_elevation_gain } : {}),
    ...(a.description ? { description: a.description } : {})
  });
}

// sort by date descending
runs.sort((a, b) => b.date.localeCompare(a.date));

// ── stats ────────────────────────────────────────────────────────────────────

const runs2026 = runs.filter(r => r.date.startsWith('2026'));
const total2026km = Math.round(runs2026.reduce((s, r) => s + r.dist, 0) * 10) / 10;
const maxLongKm = Math.max(...runs.map(r => r.dist));
const longRunsGe20 = runs.filter(r => r.dist >= 20).length;

const monthly = {};
for (const r of runs) {
  const month = r.date.substring(0, 7); // "2026-04"
  monthly[month] = Math.round(((monthly[month] || 0) + r.dist) * 10) / 10;
}

// sort monthly keys
const monthlySorted = Object.fromEntries(
  Object.entries(monthly).sort(([a], [b]) => a.localeCompare(b))
);

// ── write output ──────────────────────────────────────────────────────────────

const today = new Date().toISOString().substring(0, 10);
const output = {
  generated: today,
  count: runs.length,
  stats: {
    total_2026_km: total2026km,
    max_long_km: Math.round(maxLongKm * 10) / 10,
    long_runs_ge20km: longRunsGe20,
    monthly: monthlySorted
  },
  runs
};

fs.writeFileSync(outFile, JSON.stringify(output, null, 2));
console.log(`✅ runs.json generated: ${runs.length} runs, ${total2026km} km in 2026`);
