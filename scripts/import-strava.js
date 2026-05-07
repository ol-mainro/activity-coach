#!/usr/bin/env node
// Imports full Strava activity data (including private_note) via REST API.
// Reads credentials from ~/.config/strava-mcp/config.json (managed by Strava MCP).
// Run: node scripts/import-strava.js

const fs = require('fs');
const path = require('path');
const https = require('https');
const os = require('os');

const CONFIG_PATH = path.join(os.homedir(), '.config', 'strava-mcp', 'config.json');
const RAW_DIR = path.join(__dirname, '..', 'raw-data', 'strava');
const RECENT_DAYS = 7;
const RATE_DELAY_MS = 300;

function httpsRequest(options, body = null) {
  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try { resolve({ status: res.statusCode, body: JSON.parse(data) }); }
        catch (e) { reject(new Error(`JSON parse: ${data.substring(0, 200)}`)); }
      });
    });
    req.on('error', reject);
    if (body) req.write(body);
    req.end();
  });
}

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

async function getValidToken(config) {
  const now = Math.floor(Date.now() / 1000);
  if (config.expiresAt > now + 60) return config.accessToken;

  console.log('🔄 Refreshing access token...');
  const params = new URLSearchParams({
    client_id: config.clientId,
    client_secret: config.clientSecret,
    grant_type: 'refresh_token',
    refresh_token: config.refreshToken,
  });

  const res = await httpsRequest({
    hostname: 'www.strava.com',
    path: '/oauth/token',
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  }, params.toString());

  if (res.status !== 200) throw new Error(`Token refresh failed: ${JSON.stringify(res.body)}`);

  config.accessToken = res.body.access_token;
  config.refreshToken = res.body.refresh_token;
  config.expiresAt = res.body.expires_at;
  fs.writeFileSync(CONFIG_PATH, JSON.stringify(config, null, 2));
  console.log('✅ Token refreshed');
  return config.accessToken;
}

async function fetchActivityList(token) {
  const all = [];
  let page = 1;
  while (true) {
    const res = await httpsRequest({
      hostname: 'www.strava.com',
      path: `/api/v3/athlete/activities?per_page=200&page=${page}`,
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.status !== 200) throw new Error(`List failed p${page}: ${JSON.stringify(res.body)}`);
    if (res.body.length === 0) break;
    all.push(...res.body);
    if (res.body.length < 200) break;
    page++;
    await sleep(RATE_DELAY_MS);
  }
  return all;
}

async function fetchActivityDetail(token, id) {
  const res = await httpsRequest({
    hostname: 'www.strava.com',
    path: `/api/v3/activities/${id}`,
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` },
  });
  if (res.status !== 200) throw new Error(`Detail ${id} failed: ${JSON.stringify(res.body)}`);
  return res.body;
}

function isSparse(filePath) {
  try {
    const d = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    return Object.keys(d).length < 15;
  } catch { return true; }
}

async function main() {
  fs.mkdirSync(RAW_DIR, { recursive: true });

  const forceAll = process.argv.includes('--force-all');
  if (forceAll) console.log('⚠️  --force-all: reimporting all activities');

  const config = JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf8'));
  const token = await getValidToken(config);

  const recentCutoff = new Date(Date.now() - RECENT_DAYS * 24 * 60 * 60 * 1000);

  console.log('📋 Fetching activity list...');
  const summaries = await fetchActivityList(token);
  console.log(`   ${summaries.length} activities found\n`);

  let saved = 0, updated = 0, skipped = 0, errors = 0;

  for (const summary of summaries) {
    const { id, name, start_date } = summary;
    const filePath = path.join(RAW_DIR, `${id}.json`);
    const existed = fs.existsSync(filePath);
    const isRecent = new Date(start_date) >= recentCutoff;
    const needsUpdate = forceAll || isRecent || (existed && isSparse(filePath));

    if (existed && !needsUpdate) { skipped++; continue; }

    try {
      const detail = await fetchActivityDetail(token, id);
      fs.writeFileSync(filePath, JSON.stringify(detail, null, 2));

      const hasNote = detail.private_note ? ` [note: "${detail.private_note.substring(0, 40)}"]` : '';
      if (existed) {
        updated++;
        console.log(`  🔄 ${id} ${name}${hasNote}`);
      } else {
        saved++;
        console.log(`  ✅ ${id} ${name}${hasNote}`);
      }

      await sleep(RATE_DELAY_MS);
    } catch (err) {
      errors++;
      console.error(`  ❌ ${id}: ${err.message}`);
    }
  }

  console.log(`\nDone — saved: ${saved} | updated: ${updated} | skipped: ${skipped} | errors: ${errors}`);
}

main().catch(err => { console.error('Fatal:', err.message); process.exit(1); });
