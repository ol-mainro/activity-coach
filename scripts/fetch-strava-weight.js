#!/usr/bin/env node
// Fetches athlete profile (including weight) from Strava API.
// Saves raw profile to ./raw-data/strava/athlete-profile.json
//
// Credential resolution order:
//   1. ~/.config/strava-mcp/config.json       (MCP Strava, auto-refresh)
//   2. ./ext-services-config/credentials.local.yml  (local override, gitignored)
//
// Run: node scripts/fetch-strava-weight.js

const fs = require('fs');
const path = require('path');
const https = require('https');
const os = require('os');

const MCP_CONFIG_PATH = path.join(os.homedir(), '.config', 'strava-mcp', 'config.json');
const LOCAL_CREDS_PATH = path.join(__dirname, '..', 'ext-services-config', 'credentials.local.yml');
const OUTPUT_PATH = path.join(__dirname, '..', 'raw-data', 'strava', 'athlete-profile.json');

function parseCredentialsYml(content) {
  const get = (key) => {
    const m = content.match(new RegExp(`^\\s+${key}:\\s*["']?([^"'\\n]+)["']?`, 'm'));
    return m ? m[1].trim() : null;
  };
  return {
    clientId:     get('client_id'),
    clientSecret: get('client_secret'),
    accessToken:  get('access_token'),
    refreshToken: get('refresh_token'),
    expiresAt:    Number(get('expires_at') || 0),
    _source:      'local',
  };
}

function saveCredentialsYml(config) {
  const content = `strava:\n  client_id: "${config.clientId}"\n  client_secret: "${config.clientSecret}"\n  access_token: "${config.accessToken}"\n  refresh_token: "${config.refreshToken}"\n  expires_at: ${config.expiresAt}\n`;
  fs.writeFileSync(LOCAL_CREDS_PATH, content);
}

function loadConfig() {
  if (fs.existsSync(MCP_CONFIG_PATH)) {
    const cfg = JSON.parse(fs.readFileSync(MCP_CONFIG_PATH, 'utf8'));
    cfg._source = 'mcp';
    return cfg;
  }
  if (fs.existsSync(LOCAL_CREDS_PATH)) {
    return parseCredentialsYml(fs.readFileSync(LOCAL_CREDS_PATH, 'utf8'));
  }
  throw new Error(
    'Aucun credential Strava trouvé.\n' +
    '  → Connecter le MCP Strava (génère ~/.config/strava-mcp/config.json)\n' +
    '  → OU créer ext-services-config/credentials.local.yml (voir credentials.yml pour le guide)'
  );
}

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
  if (config._source === 'local') saveCredentialsYml(config);
  else fs.writeFileSync(MCP_CONFIG_PATH, JSON.stringify(config, null, 2));
  console.log('✅ Token refreshed');
  return config.accessToken;
}

async function main() {
  const config = loadConfig();
  console.log(`🔑 Credentials source: ${config._source}`);
  const token = await getValidToken(config);

  console.log('📡 Fetching athlete profile...');
  const res = await httpsRequest({
    hostname: 'www.strava.com',
    path: '/api/v3/athlete',
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` },
  });

  if (res.status !== 200) throw new Error(`Athlete profile fetch failed: ${JSON.stringify(res.body)}`);

  const profile = res.body;
  const fetchedAt = new Date().toISOString();

  const output = { ...profile, _fetched_at: fetchedAt };
  fs.mkdirSync(path.dirname(OUTPUT_PATH), { recursive: true });
  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(output, null, 2));

  const weightKg = profile.weight;
  if (weightKg) {
    console.log(`⚖️  Poids : ${weightKg} kg`);
  } else {
    console.log('⚠️  Aucun poids renseigné dans le profil Strava.');
  }
  console.log(`✅ Profil sauvegardé → ${OUTPUT_PATH}`);
}

main().catch(err => { console.error('Fatal:', err.message); process.exit(1); });
