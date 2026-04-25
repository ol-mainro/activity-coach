#\!/usr/bin/env node
// Saves activity summary data to raw-data/strava/{id}.json
// Run: node scripts/save-activities.js

const fs = require('fs');
const path = require('path');

const activities = [
  { id: 18237676883, name: "Course à pied du midi", date: "2026-04-24", distance: 10132.1, moving_time: 2810, sport_type: "Run", total_elevation_gain: null },
  { id: 18224962111, name: "Course à pied dans l'après-midi", date: "2026-04-23", distance: 10155.6, moving_time: 2770, sport_type: "Run", total_elevation_gain: null },
  { id: 18210382799, name: "Course à pied du midi", date: "2026-04-22", distance: 10056.2, moving_time: 2668, sport_type: "Run", total_elevation_gain: null },
  { id: 18176068588, name: "Allé on reconstitut les forces", date: "2026-04-19", distance: 5, moving_time: 10, sport_type: "Workout", total_elevation_gain: null },
  { id: 18171190655, name: "Course à pied du midi", date: "2026-04-19", distance: 20140.6, moving_time: 6000, sport_type: "Run", total_elevation_gain: null },
  { id: 18169210651, name: "Entraînement drapeau", date: "2026-04-19", distance: 0, moving_time: 6, sport_type: "Workout", total_elevation_gain: null },
  { id: 18144255874, name: "Course à pied dans l'après-midi", date: "2026-04-17", distance: 5183.6, moving_time: 1546, sport_type: "Run", total_elevation_gain: null },
  { id: 18143872028, name: "Course à pied dans l'après-midi", date: "2026-04-17", distance: 5028.2, moving_time: 1283, sport_type: "Run", total_elevation_gain: null },
  { id: 18118057699, name: "Course à pied dans l'après-midi", date: "2026-04-15", distance: 9116.4, moving_time: 3035, sport_type: "Run", total_elevation_gain: null },
  { id: 18103140364, name: "Course à pied du midi", date: "2026-04-14", distance: 10165.7, moving_time: 2671, sport_type: "Run", total_elevation_gain: null },
  { id: 18082788772, name: "Exploration des laideurs des environs", date: "2026-04-12", distance: 12382, moving_time: 4800, sport_type: "Run", total_elevation_gain: null },
  { id: 18081158357, name: "Escapade hors des sentiers battus", date: "2026-04-12", distance: 4913.1, moving_time: 1743, sport_type: "Run", total_elevation_gain: null },
  { id: 18052838900, name: "Course à pied du midi", date: "2026-04-10", distance: 10867.3, moving_time: 3720, sport_type: "Run", total_elevation_gain: null },
  { id: 18031840887, name: "Course à pied le soir", date: "2026-04-08", distance: 12379.8, moving_time: 4680, sport_type: "Run", total_elevation_gain: null },
  { id: 17987034671, name: "Course à pied matinale", date: "2026-04-05", distance: 28218.6, moving_time: 9900, sport_type: "Run", total_elevation_gain: null },
  { id: 17961390051, name: "Entraînement Drapeau", date: "2026-04-03", distance: 0, moving_time: 7, sport_type: "Workout", total_elevation_gain: null },
  { id: 17961138682, name: "400m 3", date: "2026-04-03", distance: 422, moving_time: 73, sport_type: "Run", total_elevation_gain: null },
  { id: 17961089863, name: "400m 2", date: "2026-04-03", distance: 417, moving_time: 87, sport_type: "Run", total_elevation_gain: null },
  { id: 17961019973, name: "400m 1", date: "2026-04-03", distance: 413, moving_time: 85, sport_type: "Run", total_elevation_gain: null },
  { id: 17898925048, name: "Course à pied du midi", date: "2026-03-29", distance: 21606.3, moving_time: 6240, sport_type: "Run", total_elevation_gain: null },
  { id: 17876519765, name: "Course à pied du midi", date: "2026-03-27", distance: 8295, moving_time: 3110, sport_type: "Run", total_elevation_gain: null },
  { id: 17864736287, name: "Course à pied dans l'après-midi", date: "2026-03-26", distance: 6022.6, moving_time: 1753, sport_type: "Run", total_elevation_gain: null },
  { id: 17864364129, name: "Course à pied du midi", date: "2026-03-26", distance: 2036.9, moving_time: 526, sport_type: "Run", total_elevation_gain: null },
  { id: 17864220152, name: "Course à pied du midi, demi Cooper", date: "2026-03-26", distance: 1664.8, moving_time: 367, sport_type: "Run", total_elevation_gain: null },
  { id: 17814899715, name: "Course à pied matinale", date: "2026-03-22", distance: 30057.7, moving_time: 9420, sport_type: "Run", total_elevation_gain: null },
  { id: 17790863044, name: "« Endurance fondamentale », qu'ils disent", date: "2026-03-20", distance: 10102.5, moving_time: 3660, sport_type: "Run", total_elevation_gain: null },
  { id: 17765817672, name: "Course à pied du midi", date: "2026-03-18", distance: 8220.8, moving_time: 2120, sport_type: "Run", total_elevation_gain: null },
  { id: 17731411879, name: "Course à pied du midi", date: "2026-03-15", distance: 22755.1, moving_time: 7380, sport_type: "Run", total_elevation_gain: null },
  { id: 17684654206, name: "Course à pied dans l'après-midi", date: "2026-03-11", distance: 12353.9, moving_time: 3400, sport_type: "Run", total_elevation_gain: null },
  { id: 17645863750, name: "Course à pied le matin", date: "2026-03-08", distance: 15275, moving_time: 5460, sport_type: "Run", total_elevation_gain: null },
  { id: 17568394162, name: "Course à pied le soir", date: "2026-03-01", distance: 5157.1, moving_time: 1698, sport_type: "Run", total_elevation_gain: null },
  { id: 17567786117, name: "Course à pied dans l'après-midi", date: "2026-03-01", distance: 13088.4, moving_time: 4320, sport_type: "Run", total_elevation_gain: null },
  { id: 17485862472, name: "Course à pied dans l'après-midi", date: "2026-02-22", distance: 8103.2, moving_time: 2319, sport_type: "Run", total_elevation_gain: null },
  { id: 17460859889, name: "Course à pied dans l'après-midi", date: "2026-02-20", distance: 6081, moving_time: 1614, sport_type: "Run", total_elevation_gain: null },
  { id: 17415447645, name: "Course à pied dans l'après-midi", date: "2026-02-16", distance: 6204.2, moving_time: 1730, sport_type: "Run", total_elevation_gain: null },
  { id: 17383623025, name: "Course à pied dans l'après-midi", date: "2026-02-13", distance: 5205.5, moving_time: 1443, sport_type: "Run", total_elevation_gain: null },
  { id: 17332103370, name: "Course à pied le soir", date: "2026-02-08", distance: 5152.5, moving_time: 1567, sport_type: "Run", total_elevation_gain: null },
  { id: 17175258625, name: "Course à pied dans l'après-midi", date: "2026-01-25", distance: 7870.5, moving_time: 2476, sport_type: "Run", total_elevation_gain: null },
  { id: 17089730369, name: "Trail de Trilport", date: "2026-01-18", distance: 18326.1, moving_time: 6420, sport_type: "Run", total_elevation_gain: null },
  { id: 12410005544, name: "Course à pied le soir", date: "2024-09-14", distance: 4775.2, moving_time: 1551, sport_type: "Run", total_elevation_gain: null },
  { id: 12373515908, name: "Course à pied dans l'après-midi", date: "2024-09-10", distance: 8122.8, moving_time: 2509, sport_type: "Run", total_elevation_gain: null },
  { id: 12361329262, name: "Course à pied le soir", date: "2024-09-08", distance: 10434.5, moving_time: 3352, sport_type: "Run", total_elevation_gain: null },
  { id: 12301152675, name: "Course à pied le soir", date: "2024-09-01", distance: 4806.8, moving_time: 1678, sport_type: "Run", total_elevation_gain: null },
  { id: 12262732853, name: "Course à pied du midi", date: "2024-08-28", distance: 4045.1, moving_time: 1158, sport_type: "Run", total_elevation_gain: null },
  { id: 12214697848, name: "Course à pied le soir", date: "2024-08-22", distance: 3545.5, moving_time: 1214, sport_type: "Run", total_elevation_gain: null },
  { id: 12212156104, name: "Course à pied du midi", date: "2024-08-22", distance: 3880.9, moving_time: 1103, sport_type: "Run", total_elevation_gain: null },
  { id: 12195328857, name: "Course à pied dans l'après-midi", date: "2024-08-20", distance: 2387.9, moving_time: 760, sport_type: "Run", total_elevation_gain: null },
  { id: 12195180161, name: "Course à pied dans l'après-midi", date: "2024-08-20", distance: 1889.2, moving_time: 476, sport_type: "Run", total_elevation_gain: null },
  { id: 12182015191, name: "Course à pied le soir", date: "2024-08-18", distance: 5160.4, moving_time: 1783, sport_type: "Run", total_elevation_gain: null },
  { id: 12181662931, name: "Course à pied le soir", date: "2024-08-18", distance: 5069.4, moving_time: 1343, sport_type: "Run", total_elevation_gain: null },
  { id: 12156388448, name: "Course à pied le soir", date: "2024-08-15", distance: 5270, moving_time: 1836, sport_type: "Run", total_elevation_gain: null },
  { id: 12155979228, name: "Course à pied le soir", date: "2024-08-15", distance: 4800, moving_time: 1314, sport_type: "Run", total_elevation_gain: null },
  { id: 12054544042, name: "Course à pied le soir", date: "2024-08-03", distance: 7100, moving_time: 2386, sport_type: "Run", total_elevation_gain: null },
  { id: 12008558511, name: "Course à pied du midi", date: "2024-07-29", distance: 14590, moving_time: 5760, sport_type: "Run", total_elevation_gain: null },
  { id: 11997143366, name: "Course à pied dans l'après-midi", date: "2024-07-26", distance: 7680, moving_time: 2704, sport_type: "Run", total_elevation_gain: null },
  { id: 11966922031, name: "Course à pied matinale", date: "2024-07-24", distance: 15590, moving_time: 5340, sport_type: "Run", total_elevation_gain: null },
  { id: 11950065060, name: "Course à pied du midi", date: "2024-07-22", distance: 11060, moving_time: 3660, sport_type: "Run", total_elevation_gain: null },
  { id: 11910379540, name: "Course à pied dans l'après-midi", date: "2024-07-17", distance: 7440, moving_time: 2258, sport_type: "Run", total_elevation_gain: null },
  { id: 11869259744, name: "Course à pied dans l'après-midi", date: "2024-07-12", distance: 8550, moving_time: 2477, sport_type: "Run", total_elevation_gain: null },
  { id: 11828262997, name: "Course à pied du midi", date: "2024-07-07", distance: 10520, moving_time: 3407, sport_type: "Run", total_elevation_gain: null },
  { id: 11824088413, name: "Course à pied le soir", date: "2024-07-06", distance: 11440, moving_time: 3402, sport_type: "Run", total_elevation_gain: null },
  { id: 11776874488, name: "Course à pied le soir", date: "2024-06-30", distance: 7680, moving_time: 2436, sport_type: "Run", total_elevation_gain: null },
  { id: 11696682085, name: "Course à pied dans l'après-midi", date: "2024-06-20", distance: 10510, moving_time: 3431, sport_type: "Run", total_elevation_gain: null },
  { id: 11642274147, name: "Course à pied dans l'après-midi", date: "2024-06-13", distance: 10320, moving_time: 3055, sport_type: "Run", total_elevation_gain: null },
  { id: 11628008178, name: "Vélo en soirée", date: "2024-06-11", distance: 19970, moving_time: 3358, sport_type: "Ride", total_elevation_gain: null },
  { id: 11614088630, name: "Trilport - Germiny - Trilport", date: "2024-06-09", distance: 10180, moving_time: 3181, sport_type: "Run", total_elevation_gain: null },
  { id: 11594821356, name: "Course à pied dans l'après-midi", date: "2024-06-07", distance: 8620, moving_time: 2616, sport_type: "Run", total_elevation_gain: null },
  { id: 11580476521, name: "Course à pied dans l'après-midi", date: "2024-06-05", distance: 10920, moving_time: 3600, sport_type: "Run", total_elevation_gain: null },
  { id: 11562706718, name: "Course à pied dans l'après-midi", date: "2024-06-03", distance: 3670, moving_time: 1162, sport_type: "Run", total_elevation_gain: null },
  { id: 11562572282, name: "Course à pied dans l'après-midi", date: "2024-06-03", distance: 8120, moving_time: 2392, sport_type: "Run", total_elevation_gain: null },
  { id: 11525470888, name: "Course à pied dans l'après-midi", date: "2024-05-29", distance: 10510, moving_time: 3505, sport_type: "Run", total_elevation_gain: null },
  { id: 11504620194, name: "Vélo en soirée", date: "2024-05-26", distance: 15610, moving_time: 3071, sport_type: "Ride", total_elevation_gain: null },
  { id: 11485408032, name: "Course à pied dans l'après-midi", date: "2024-05-24", distance: 7750, moving_time: 2275, sport_type: "Run", total_elevation_gain: null },
  { id: 11462659326, name: "Course à pied dans l'après-midi", date: "2024-05-21", distance: 9550, moving_time: 3221, sport_type: "Run", total_elevation_gain: null },
  { id: 11438100030, name: "Course à pied dans l'après-midi", date: "2024-05-18", distance: 9680, moving_time: 3079, sport_type: "Run", total_elevation_gain: null }
];

const outDir = path.join(__dirname, '..', 'raw-data', 'strava');
fs.mkdirSync(outDir, { recursive: true });

let saved = 0, skipped = 0;
for (const act of activities) {
  const filePath = path.join(outDir, `${act.id}.json`);
  if (\!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify(act, null, 2));
    saved++;
  } else {
    skipped++;
  }
}
console.log(`✅ Saved: ${saved} | Skipped (already exist): ${skipped}`);
