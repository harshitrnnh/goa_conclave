import express from 'express';
import http from 'http';
import { WebSocketServer, WebSocket } from 'ws';
import path from 'path';
import { fileURLToPath } from 'url';
import os from 'os';
import fs from 'fs';
import QRCode from 'qrcode';
import { getOrCreateSessionGif } from './server-gif-generator.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ server });

const PORT = process.env.PORT || 3000;
const SESSION_DURATION_MINUTES = 30;
const SESSION_DURATION_MS = SESSION_DURATION_MINUTES * 60 * 1000;

// Persistent Storage Directories
const STORAGE_DIR = path.join(__dirname, 'storage');
const ARCHIVE_DIR = path.join(__dirname, 'public', 'archive');
const SESSIONS_FILE = path.join(STORAGE_DIR, 'sessions.json');

if (!fs.existsSync(STORAGE_DIR)) fs.mkdirSync(STORAGE_DIR, { recursive: true });
if (!fs.existsSync(ARCHIVE_DIR)) fs.mkdirSync(ARCHIVE_DIR, { recursive: true });

// Network IP helper
function getLocalNetworkIP() {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const net of interfaces[name]) {
      // Look for IPv4 and non-internal (i.e. not 127.0.0.1)
      if (net.family === 'IPv4' && !net.internal) {
        return net.address;
      }
    }
  }
  return 'localhost';
}

const LOCAL_IP = getLocalNetworkIP();

// Trust reverse proxies (Render, Railway, Fly.io, Cloudflare, Nginx)
app.set('trust proxy', true);

// Protocol-aware base URL helper
function getBaseUrl(req) {
  const proto = req.headers['x-forwarded-proto'] || (req.secure ? 'https' : (req.protocol || 'http'));
  const host = req.get('host') || `${LOCAL_IP}:${PORT}`;
  return `${proto}://${host}`;
}

// Enable large JSON bodies for canvas snapshot uploads
app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({ limit: '25mb', extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/archive', express.static(ARCHIVE_DIR));

// Pre-configured options matching the tablet UI
export const WEATHER_OPTIONS = [
  { id: 'sunny', label: 'Sunny & Energetic', subtitle: 'Bright, radiant, active flow', color: '#F2C249' },
  { id: 'windy', label: 'Windy & Restless', subtitle: 'Breezy sweeps, dynamic dispersal', color: '#E58A42' },
  { id: 'rainy', label: 'Rainy & Reflective', subtitle: 'Cascading drops, deep reflections', color: '#6A92A6' },
  { id: 'stormy', label: 'Stormy & Eclectic', subtitle: 'Turbulent vortex, fiery embers', color: '#B53823' },
  { id: 'calm', label: 'Calm & Serene', subtitle: 'Undulating harmonic ocean swells', color: '#D4A373' }
];

export const FOOD_OPTIONS = [
  { id: 'fish_curry', label: 'Fish Curry', subtitle: 'Bold & Transformative', color: '#D66829' },
  { id: 'prawn_curry', label: 'Prawn Curry', subtitle: 'Warm & Exciting', color: '#E27D60' },
  { id: 'vindaloo', label: 'Vindaloo', subtitle: 'Spicy & Intense', color: '#9E2A2B' },
  { id: 'xacuti', label: 'Xacuti', subtitle: 'Rich & Layered', color: '#854D27' },
  { id: 'bebinca', label: 'Bebinca', subtitle: 'Sweet & Optimistic', color: '#C88B37' },
  { id: 'poe_bread', label: 'Poe Bread', subtitle: 'Simple & Comforting', color: '#C39B77' }
];

export const LOCATION_OPTIONS = [
  { id: 'dudhsagar', label: 'Dudhsagar Falls', subtitle: 'Cascading & Majestic Power', color: '#6A92A6' },
  { id: 'aguada_fort', label: 'Fort Aguada Lighthouse', subtitle: 'Steadfast & Visionary', color: '#D4A373' },
  { id: 'fontainhas', label: 'Fontainhas Latin Quarter', subtitle: 'Vibrant Heritage & Color', color: '#E27D60' },
  { id: 'chapora_fort', label: 'Chapora Fort Ramparts', subtitle: 'Expansive & Free-Spirited', color: '#C88B37' },
  { id: 'palolem_beach', label: 'Palolem Beach Crescent', subtitle: 'Harmonious Coastal Peace', color: '#307A78' },
  { id: 'cabo_de_rama', label: 'Cabo de Rama Fort', subtitle: 'Dramatic Clifftop & Wild Horizon', color: '#E58A42' }
];

export const EMBLEM_OPTIONS = [
  { id: 'mandovi_boat', label: 'Mandovi Sailboat', subtitle: 'Navigating New Horizons', color: '#F2C249' },
  { id: 'coconut_palm', label: 'Coastal Coconut Palm', subtitle: 'Resilient & Grounded', color: '#3A7D44' },
  { id: 'sea_turtle', label: 'Olive Ridley Turtle', subtitle: 'Deep & Sustainable Wisdom', color: '#2A9D8F' },
  { id: 'kingfisher', label: 'Goan Kingfisher', subtitle: 'Sharp, Agile & Insightful', color: '#264653' },
  { id: 'carnival_spirit', label: 'Viva Carnival Mask', subtitle: 'Celebratory & Bold Creativity', color: '#E76F51' },
  { id: 'susegad', label: 'Susegad Hammock', subtitle: 'Thoughtful & Unhurried Flow', color: '#E9C46A' }
];

// Seed past sessions used if no persistent sessions.json exists on disk
const DEFAULT_PAST_SESSIONS = [
  {
    id: 'session-01',
    sessionNumber: 1,
    name: 'Opening Keynote & AI Futures',
    timeLabel: '09:30 - 10:00 AM',
    timestamp: Date.now() - 90 * 60 * 1000,
    dominantWeather: 'sunny',
    dominantFood: 'bebinca',
    dominantLocation: 'fontainhas',
    dominantEmblem: 'mandovi_boat',
    weatherDistribution: { sunny: 28, windy: 12, rainy: 3, stormy: 4, calm: 9 },
    foodDistribution: { bebinca: 24, fish_curry: 18, prawn_curry: 8, xacuti: 3, vindaloo: 1, poe_bread: 2 },
    locationDistribution: { fontainhas: 26, dudhsagar: 14, aguada_fort: 8, chapora_fort: 4, palolem_beach: 3, cabo_de_rama: 1 },
    emblemDistribution: { mandovi_boat: 25, carnival_spirit: 15, coconut_palm: 8, kingfisher: 5, sea_turtle: 2, susegad: 1 },
    totalResponses: 56,
    seedVariant: 1,
    mutationTopology: 4,
    topologyInfo: {
      id: 4,
      name: 'Fontainhas Latin Quarter Archways & Polychrome Mosaic',
      archetype: 'Triple Portuguese Archways & Polychrome Rosettes',
      reasoning: 'Vibrant heritage architecture (FONTAINHAS) and celebratory Carnival spirit (CARNIVAL_SPIRIT) formed triple nested Portuguese baroque archways.'
    },
    snapshotUrl: '/archive/session-01.jpg',
    gifUrl: '/api/sessions/session-01/artwork.gif'
  },
  {
    id: 'session-02',
    sessionNumber: 2,
    name: 'Ethics, Heritage & Goan Languages',
    timeLabel: '10:00 - 10:30 AM',
    timestamp: Date.now() - 60 * 60 * 1000,
    dominantWeather: 'rainy',
    dominantFood: 'xacuti',
    dominantLocation: 'cabo_de_rama',
    dominantEmblem: 'sea_turtle',
    weatherDistribution: { rainy: 31, calm: 19, sunny: 8, windy: 5, stormy: 2 },
    foodDistribution: { xacuti: 27, poe_bread: 18, fish_curry: 10, bebinca: 6, prawn_curry: 3, vindaloo: 1 },
    locationDistribution: { cabo_de_rama: 32, fontainhas: 16, aguada_fort: 9, palolem_beach: 5, dudhsagar: 2, chapora_fort: 1 },
    emblemDistribution: { sea_turtle: 30, susegad: 18, coconut_palm: 9, mandovi_boat: 4, kingfisher: 3, carnival_spirit: 1 },
    totalResponses: 65,
    seedVariant: 2,
    mutationTopology: 3,
    topologyInfo: {
      id: 3,
      name: 'Dudhsagar Waterfall Torrent & Rainforest Terraces',
      archetype: 'Vertical Roaring Plume & Stepped Mist Pools',
      reasoning: 'Goan monsoon deluge (RAINY) and Dudhsagar waterfall dominance (DUDHSAGAR) channeled particles into a roaring vertical plume.'
    },
    snapshotUrl: '/archive/session-02.jpg',
    gifUrl: '/api/sessions/session-02/artwork.gif'
  },
  {
    id: 'session-03',
    sessionNumber: 3,
    name: 'Autonomous Agents & Creative Tools',
    timeLabel: '10:30 - 11:00 AM',
    timestamp: Date.now() - 30 * 60 * 1000,
    dominantWeather: 'stormy',
    dominantFood: 'vindaloo',
    dominantLocation: 'dudhsagar',
    dominantEmblem: 'kingfisher',
    weatherDistribution: { stormy: 34, windy: 22, sunny: 14, calm: 4, rainy: 3 },
    foodDistribution: { vindaloo: 32, fish_curry: 20, prawn_curry: 12, bebinca: 7, xacuti: 4, poe_bread: 2 },
    locationDistribution: { dudhsagar: 38, chapora_fort: 20, aguada_fort: 10, fontainhas: 5, palolem_beach: 2, cabo_de_rama: 2 },
    emblemDistribution: { kingfisher: 35, carnival_spirit: 22, mandovi_boat: 11, coconut_palm: 5, sea_turtle: 2, susegad: 2 },
    totalResponses: 77,
    seedVariant: 1,
    mutationTopology: 11,
    topologyInfo: {
      id: 11,
      name: 'Mandovi River Sailboat & Fluvial Wake Currents',
      archetype: 'Graceful Hull Silhouette, Billowing Solar Sails & Diverging Wake Ripples',
      reasoning: 'River navigation heritage and iconic sailboat emblem (MANDOVI_BOAT) mapped to a graceful hull silhouette, billowing solar sails, and expanding fluvial wake ripples.'
    },
    snapshotUrl: '/archive/session-03.jpg',
    gifUrl: '/api/sessions/session-03/artwork.gif'
  }
];

// Load persisted sessions from disk storage
export function loadPersistedSessions() {
  if (fs.existsSync(SESSIONS_FILE)) {
    try {
      const data = JSON.parse(fs.readFileSync(SESSIONS_FILE, 'utf8'));
      if (Array.isArray(data)) {
        console.log(`[Storage] Loaded ${data.length} past sessions from disk.`);
        return data;
      }
    } catch (e) {
      console.warn('[Storage] Failed to read sessions.json:', e);
    }
  }
  savePersistedSessions([]);
  return [];
}

// Save sessions to disk storage
export function savePersistedSessions(sessions) {
  try {
    fs.writeFileSync(SESSIONS_FILE, JSON.stringify(sessions, null, 2), 'utf8');
    console.log(`[Storage] Persisted ${sessions.length} sessions to ${SESSIONS_FILE}`);
  } catch (e) {
    console.error('[Storage] Error saving sessions:', e);
  }
}

// Format IST (Indian Standard Time) cycle window e.g. "11:00 AM - 11:30 AM IST"
export function formatTimeLabelIST(startTimeMs, durationMs) {
  const start = new Date(startTimeMs);
  const end = new Date(startTimeMs + durationMs);
  const fmt = (d) => {
    return d.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
      timeZone: 'Asia/Kolkata'
    });
  };
  return `${fmt(start)} - ${fmt(end)} IST`;
}

let pastSessions = loadPersistedSessions();

// WebSocket broadcast helper
function broadcast(data) {
  const message = JSON.stringify(data);
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  });
}



// =========================================================================
// 20 DIVERSE COMPUTATIONAL ARTWORK TOPOLOGIES & COMBINED SENTIMENT SCORING
// =========================================================================
const TOPOLOGY_CATALOG = [
  {
    id: 0,
    name: 'Mandovi S-Curve & Sacred Kaavi Geometry',
    archetype: 'Meandering River S-Curve & Kaavi Solar Geometry',
    affinity: { weather: ['sunny', 'calm'], food: ['fish_curry', 'poe_bread'], location: ['aguada_fort'], emblem: ['mandovi_boat'] },
    reasoning: (w, f, l, e) => `Sunny riverside optimism (${w.toUpperCase()}) and Mandovi boat motifs (${e.toUpperCase()}) mapped to sacred Kaavi solar geometry and graceful fluvial S-curves.`
  },
  {
    id: 1,
    name: 'Intertwined Marine Currents & Laterite Fire Strata',
    archetype: 'Dual Opposing Oceanic Teal & Laterite Vermilion Waves',
    affinity: { weather: ['stormy', 'rainy'], food: ['vindaloo', 'xacuti'], location: ['palolem_beach'], emblem: ['sea_turtle'] },
    reasoning: (w, f, l, e) => `Western Ghats tempest energy (${w.toUpperCase()}) colliding with Vindaloo spice heat (${f.toUpperCase()}) generated interlocking Arabian Sea teal and laterite vermilion dual currents with bold stipple drops.`
  },
  {
    id: 2,
    name: 'Fort Aguada Lighthouse Beacon & Expanding Orbital Ripples',
    archetype: 'Concentric Coastal Beacon Vortex & Celestial Rays',
    affinity: { weather: ['windy', 'sunny'], food: ['fish_curry'], location: ['aguada_fort'], emblem: ['kingfisher'] },
    reasoning: (w, f, l, e) => `Restless coastal sea winds (${w.toUpperCase()}) and historic Aguada fortress presence (${l.toUpperCase()}) created 16 concentric orbital light shells and sweeping celestial ray arms.`
  },
  {
    id: 3,
    name: 'Dudhsagar Waterfall Torrent & Rainforest Terraces',
    archetype: 'Vertical Roaring Plume & Stepped Mist Pools',
    affinity: { weather: ['rainy'], food: ['xacuti'], location: ['dudhsagar'], emblem: ['sea_turtle'] },
    reasoning: (w, f, l, e) => `Goan monsoon deluge (${w.toUpperCase()}) and Dudhsagar waterfall dominance (${l.toUpperCase()}) channeled particles into a roaring vertical plume feeding horizontal rainforest spray terraces.`
  },
  {
    id: 4,
    name: 'Fontainhas Latin Quarter Archways & Polychrome Mosaic',
    archetype: 'Triple Portuguese Archways & Polychrome Rosettes',
    affinity: { weather: ['sunny'], food: ['prawn_curry'], location: ['fontainhas'], emblem: ['carnival_spirit'] },
    reasoning: (w, f, l, e) => `Vibrant heritage architecture (${l.toUpperCase()}) and celebratory Carnival spirit (${e.toUpperCase()}) formed triple nested Portuguese baroque archways and polychromatic mosaic stipples.`
  },
  {
    id: 5,
    name: 'Palolem Crescent Bay & Harmonic Tidal Swells',
    archetype: 'Semicircular Coastal Arc & Rhythmic Swells',
    affinity: { weather: ['calm'], food: ['fish_curry'], location: ['palolem_beach'], emblem: ['susegad'] },
    reasoning: (w, f, l, e) => `Serene Susegad mindset (${e.toUpperCase()}) and southern Palolem crescent beach affinity (${l.toUpperCase()}) produced sweeping semicircular curved wavefronts and calm tidal swells.`
  },
  {
    id: 6,
    name: 'Chapora Clifftop Ridge & Western Sea Winds',
    archetype: 'Elevated Contour Crest & Windblown Aerosol Spray',
    affinity: { weather: ['windy'], food: ['vindaloo'], location: ['chapora_fort'], emblem: ['kingfisher'] },
    reasoning: (w, f, l, e) => `High clifftop winds skimming Chapora ramparts (${l.toUpperCase()}) generated an elevated undulating contour ridge with high-speed horizontal particle drift.`
  },
  {
    id: 7,
    name: 'Wood-Fired Goan Poi Bread & Baker Hearth',
    archetype: 'Puffed Dough Pockets, Aeration Slits & Flour-Dust Stipples',
    affinity: { weather: ['calm', 'sunny'], food: ['poe_bread'], location: ['fontainhas', 'cabo_de_rama'], emblem: ['susegad', 'mandovi_boat'] },
    reasoning: (w, f, l, e) => `Traditional Goan Poder baking heritage (${f.toUpperCase()}) and soothing village mornings mapped to wood-fired oven hearth contours, puffy crust pockets, and flour-dust ivory stipples.`
  },
  {
    id: 8,
    name: 'Cumbarjua Mangrove Estuary & Braided Waterways',
    archetype: 'Dendritic Root Networks & Braided Silt Channels',
    affinity: { weather: ['rainy'], food: ['fish_curry'], location: ['dudhsagar'], emblem: ['coconut_palm'] },
    reasoning: (w, f, l, e) => `Estuarine river currents and coconut palm motifs (${e.toUpperCase()}) formed dendritic branching root channels weaving through emerald and silt mud banks.`
  },
  {
    id: 9,
    name: 'Susegad Celestial Nebula & Twilight Drift',
    archetype: 'Elliptical Cosmic Cloud & Harmonic Breathing Nodes',
    affinity: { weather: ['calm'], food: ['bebinca'], location: ['palolem_beach'], emblem: ['susegad'] },
    reasoning: (w, f, l, e) => `Peak Susegad tranquility (${e.toUpperCase()}) and sweet Bebinca balance (${f.toUpperCase()}) created a diffuse champagne and mother-of-pearl cosmic cloud with slow harmonic breathing.`
  },
  {
    id: 10,
    name: 'Bebinca Seven-Layer Caramel Culinary Strata',
    archetype: 'Horizontal Multi-Tiered Caramel & Coconut Bands',
    affinity: { weather: ['sunny'], food: ['bebinca'], location: ['fontainhas'], emblem: ['coconut_palm'] },
    reasoning: (w, f, l, e) => `Consensus around iconic 7-layer Bebinca (${f.toUpperCase()}) stratified the point field into 7 rich horizontal bands of golden caramel, jaggery, and coconut ivory.`
  },
  {
    id: 11,
    name: 'Mandovi River Sailboat & Fluvial Wake Currents',
    archetype: 'Graceful Hull Silhouette, Billowing Solar Sails & Diverging Wake Ripples',
    affinity: { weather: ['windy', 'sunny'], food: ['fish_curry'], location: ['aguada_fort', 'palolem_beach'], emblem: ['mandovi_boat'] },
    reasoning: (w, f, l, e) => `Mandovi river navigation heritage and iconic sailboat emblem (${e.toUpperCase()}) mapped to a graceful hull silhouette, billowing solar sails, and expanding fluvial wake ripples.`
  },
  {
    id: 12,
    name: 'Morjim Olive Ridley Nesting Swell & Ocean Drift',
    archetype: 'Elliptical Flipper Wave Arcs & Bioluminescent Drifts',
    affinity: { weather: ['calm'], food: ['fish_curry'], location: ['palolem_beach'], emblem: ['sea_turtle'] },
    reasoning: (w, f, l, e) => `Coastal conservation consciousness and sea turtle emblem (${e.toUpperCase()}) generated expansive rhythmic flipper stroke arcs through bioluminescent night currents.`
  },
  {
    id: 13,
    name: 'Zuari Railway Bridge & Industrial Horizon Strata',
    archetype: 'Diagonal Structural Truss Lattice & Crossing Currents',
    affinity: { weather: ['windy'], food: ['poe_bread'], location: ['aguada_fort'], emblem: ['mandovi_boat'] },
    reasoning: (w, f, l, e) => `Intersection of Goan connectivity and river transport (${e.toUpperCase()}) created geometric truss line lattices spanning across deep blue-green tidal currents.`
  },
  {
    id: 14,
    name: 'Goa Carnival Samba Corona & Chromatic Confetti',
    archetype: 'Radial Starburst Corona & Swirling Serpentine Spirals',
    affinity: { weather: ['sunny'], food: ['prawn_curry'], location: ['fontainhas'], emblem: ['carnival_spirit'] },
    reasoning: (w, f, l, e) => `Peak festive energy and Carnival spirit (${e.toUpperCase()}) unleashed an explosive radial starburst corona with multi-hued serpentine ribbons.`
  },
  {
    id: 15,
    name: 'Chorao Bird Sanctuary & Kingfisher Flight Vectors',
    archetype: 'Aerodynamic Vector Plumes & Turquoise Dart Plumes',
    affinity: { weather: ['windy'], food: ['fish_curry'], location: ['dudhsagar'], emblem: ['kingfisher'] },
    reasoning: (w, f, l, e) => `Agile kingfisher emblem (${e.toUpperCase()}) and breezy coastal air (${w.toUpperCase()}) shaped particles into aerodynamic cobalt and turquoise flight vector plumes.`
  },
  {
    id: 16,
    name: 'Anjuna Flea Market Kaleidoscope & Mandala Vortex',
    archetype: 'Octagonal Sacred Mandala & Alternating Point Rings',
    affinity: { weather: ['sunny'], food: ['vindaloo'], location: ['chapora_fort'], emblem: ['carnival_spirit'] },
    reasoning: (w, f, l, e) => `Bohemian eclectic sentiment and sunny energy (${w.toUpperCase()}) triggered an octagonal geometric mandala vortex with alternating kaleidoscopic density rings.`
  },
  {
    id: 17,
    name: 'Divar Island Monsoon Puddle Ripples & Rain Columns',
    archetype: 'Six Concentric Impact Circles & Vertical Droplet Trails',
    affinity: { weather: ['rainy'], food: ['poe_bread'], location: ['cabo_de_rama'], emblem: ['coconut_palm'] },
    reasoning: (w, f, l, e) => `Introspective monsoon reflection (${w.toUpperCase()}) and heritage island reverence (${l.toUpperCase()}) formed 6 localized concentric puddle ripples under vertical rain shafts.`
  },
  {
    id: 18,
    name: 'Goan Cashew Apple & Curved Kidney Nut',
    archetype: 'Ripe Golden-Vermilion Bell Apple, Kidney Nut Crescent & Orchard Mist',
    affinity: { weather: ['sunny', 'windy'], food: ['xacuti', 'vindaloo'], location: ['chapora_fort', 'dudhsagar'], emblem: ['carnival_spirit', 'coconut_palm'] },
    reasoning: (w, f, l, e) => `Goan cashew harvest heritage (${f.toUpperCase()}) and coastal sunshine (${w.toUpperCase()}) mapped to luscious pear-bell fruit contours, curved kidney nut crescent, and golden orchard mist.`
  },
  {
    id: 19,
    name: 'Cabo de Rama Sunset Horizon & Golden Hour Thermals',
    archetype: 'Low Radiant Sun Hearth & Rising Thermal Convection Plumes',
    affinity: { weather: ['sunny'], food: ['bebinca'], location: ['palolem_beach'], emblem: ['susegad'] },
    reasoning: (w, f, l, e) => `Warm sunset nostalgia and southern cliffside tranquility (${e.toUpperCase()}) anchored a radiant solar hearth low on the horizon, driving golden thermal convection plumes upward.`
  }
];

let usedTopologies = [1]; // Start tracking; 1 is initial reference image

function selectBestTopology(domWeather, domFood, domLocation, domEmblem, dist, totalResponses) {
  // Score all 20 topologies against the combined sentiment of the 4 questions
  const scores = TOPOLOGY_CATALOG.map(topo => {
    let score = 0;
    if (topo.affinity.weather.includes(domWeather)) score += 4;
    if (topo.affinity.food.includes(domFood)) score += 4;
    if (topo.affinity.location.includes(domLocation)) score += 4;
    if (topo.affinity.emblem.includes(domEmblem)) score += 3;

    // Additional nuanced score based on distribution counts
    if (dist && dist.weather && dist.weather[topo.affinity.weather[0]] > 0) score += 1;
    if (dist && dist.food && dist.food[topo.affinity.food[0]] > 0) score += 1;
    if (dist && dist.location && dist.location[topo.affinity.location[0]] > 0) score += 1;
    if (dist && dist.emblem && dist.emblem[topo.affinity.emblem[0]] > 0) score += 1;

    return { id: topo.id, score, topo };
  });

  // Filter out any topology that has already been shown in the current cycle run
  let candidates = scores.filter(s => !usedTopologies.includes(s.id));

  // If all 20 have been exhausted, reset history (preserving the last 2 to avoid immediate repeat)
  if (candidates.length === 0) {
    const lastTwo = usedTopologies.slice(-2);
    usedTopologies = [...lastTwo];
    candidates = scores.filter(s => !usedTopologies.includes(s.id));
  }

  // Pick highest scoring unvisited topology
  candidates.sort((a, b) => b.score - a.score);
  const best = candidates[0] || scores[0];
  usedTopologies.push(best.id);

  const reasoning = best.topo.reasoning(domWeather, domFood, domLocation, domEmblem);
  return {
    id: best.id,
    name: best.topo.name,
    archetype: best.topo.archetype,
    reasoning,
    score: best.score
  };
}

// Initialize active session starting fresh from Session 1 (or next session based on persisted pastSessions)
export function initCurrentSession() {
  const sessionNum = pastSessions.length + 1;
  const sessionId = `session-${String(sessionNum).padStart(2, '0')}`;
  const topoIndex = sessionNum === 1 ? 1 : ((sessionNum - 1) % TOPOLOGY_CATALOG.length);
  const initialTopo = TOPOLOGY_CATALOG[topoIndex];
  const now = Date.now();

  return {
    id: sessionId,
    sessionNumber: sessionNum,
    name: initialTopo.name,
    timeLabel: formatTimeLabelIST(now, SESSION_DURATION_MS),
    startTime: now,
    durationMs: SESSION_DURATION_MS,
    mutationTopology: initialTopo.id,
    topologyInfo: {
      id: initialTopo.id,
      name: initialTopo.name,
      archetype: initialTopo.archetype,
      reasoning: initialTopo.reasoning('sunny', 'fish_curry', 'aguada_fort', 'mandovi_boat'),
      dataSummary: {
        dominantWeather: 'sunny',
        dominantFood: 'fish_curry',
        dominantLocation: 'aguada_fort',
        dominantEmblem: 'mandovi_boat',
        totalResponses: 0,
        weatherDist: { sunny: 0, windy: 0, rainy: 0, stormy: 0, calm: 0 },
        foodDist: { fish_curry: 0, prawn_curry: 0, vindaloo: 0, xacuti: 0, bebinca: 0, poe_bread: 0 },
        locationDist: { aguada_fort: 0, dudhsagar: 0, fontainhas: 0, chapora_fort: 0, palolem_beach: 0, cabo_de_rama: 0 },
        emblemDist: { mandovi_boat: 0, coconut_palm: 0, sea_turtle: 0, kingfisher: 0, carnival_spirit: 0, susegad: 0 }
      }
    },
    responses: []
  };
}

let currentSession = initCurrentSession();

// Check and evolve session every 30 minutes
function checkSessionCycle() {
  const elapsed = Date.now() - currentSession.startTime;
  if (elapsed >= currentSession.durationMs) {
    console.log(`[Cycle] 30 minutes elapsed (${elapsed}ms). Advancing to next session...`);
    advanceToNextSession();
  }
}

setInterval(checkSessionCycle, 5000);

function advanceToNextSession(customName, forcedMutation) {
  // Archive current session
  const weatherDist = {};
  WEATHER_OPTIONS.forEach(w => weatherDist[w.id] = 0);
  const foodDist = {};
  FOOD_OPTIONS.forEach(f => foodDist[f.id] = 0);
  const locationDist = {};
  LOCATION_OPTIONS.forEach(l => locationDist[l.id] = 0);
  const emblemDist = {};
  EMBLEM_OPTIONS.forEach(e => emblemDist[e.id] = 0);

  currentSession.responses.forEach(r => {
    if (weatherDist[r.weather] !== undefined) weatherDist[r.weather]++;
    if (foodDist[r.food] !== undefined) foodDist[r.food]++;
    if (locationDist[r.location] !== undefined) locationDist[r.location]++;
    if (emblemDist[r.emblem] !== undefined) emblemDist[r.emblem]++;
  });

  let domWeather = 'sunny';
  let maxW = -1;
  for (const [w, count] of Object.entries(weatherDist)) {
    if (count > maxW) { maxW = count; domWeather = w; }
  }

  let domFood = 'fish_curry';
  let maxF = -1;
  for (const [f, count] of Object.entries(foodDist)) {
    if (count > maxF) { maxF = count; domFood = f; }
  }

  let domLocation = 'aguada_fort';
  let maxL = -1;
  for (const [l, count] of Object.entries(locationDist)) {
    if (count > maxL) { maxL = count; domLocation = l; }
  }

  let domEmblem = 'mandovi_boat';
  let maxE = -1;
  for (const [e, count] of Object.entries(emblemDist)) {
    if (count > maxE) { maxE = count; domEmblem = e; }
  }

  // Select the next topology based on attendee consensus
  let selectedTopoInfo;
  if (typeof forcedMutation === 'number') {
    const topo = TOPOLOGY_CATALOG[forcedMutation % TOPOLOGY_CATALOG.length];
    selectedTopoInfo = {
      id: topo.id,
      name: topo.name,
      archetype: topo.archetype,
      reasoning: topo.reasoning(domWeather, domFood, domLocation, domEmblem)
    };
    if (!usedTopologies.includes(topo.id)) usedTopologies.push(topo.id);
  } else {
    selectedTopoInfo = selectBestTopology(
      domWeather, domFood, domLocation, domEmblem,
      { weather: weatherDist, food: foodDist, location: locationDist, emblem: emblemDist },
      currentSession.responses.length
    );
  }

  const snapshotFile = `${currentSession.id}.jpg`;
  const snapshotPath = path.join(ARCHIVE_DIR, snapshotFile);
  const snapshotExists = fs.existsSync(snapshotPath);

  // Archive the completed session preserving its actual running topology & sentiment
  const archived = {
    id: currentSession.id,
    sessionNumber: currentSession.sessionNumber,
    name: currentSession.topologyInfo?.name || currentSession.name,
    timeLabel: currentSession.timeLabel,
    timestamp: currentSession.startTime,
    dominantWeather: domWeather,
    dominantFood: domFood,
    dominantLocation: domLocation,
    dominantEmblem: domEmblem,
    weatherDistribution: weatherDist,
    foodDistribution: foodDist,
    locationDistribution: locationDist,
    emblemDistribution: emblemDist,
    totalResponses: currentSession.responses.length,
    seedVariant: (currentSession.mutationTopology % 2) + 1,
    mutationTopology: currentSession.mutationTopology,
    topologyInfo: currentSession.topologyInfo,
    snapshotUrl: snapshotExists ? `/archive/${snapshotFile}?v=${Date.now()}` : null,
    gifUrl: `/api/sessions/${currentSession.id}/artwork.gif`
  };

  pastSessions.push(archived);
  savePersistedSessions(pastSessions);
  console.log(`[Cycle] Archived ${archived.id} (#${archived.sessionNumber}). Total past sessions: ${pastSessions.length}`);

  // Initialize new session with the newly computed consensus topology and real IST time
  const nextNumber = currentSession.sessionNumber + 1;
  const nextId = `session-${String(nextNumber).padStart(2, '0')}`;
  const now = Date.now();

  currentSession = {
    id: nextId,
    sessionNumber: nextNumber,
    name: customName || selectedTopoInfo.name,
    timeLabel: formatTimeLabelIST(now, SESSION_DURATION_MS),
    startTime: now,
    durationMs: SESSION_DURATION_MS,
    mutationTopology: selectedTopoInfo.id,
    topologyInfo: {
      ...selectedTopoInfo,
      dataSummary: {
        dominantWeather: domWeather,
        dominantFood: domFood,
        dominantLocation: domLocation,
        dominantEmblem: domEmblem,
        totalResponses: 0,
        weatherDist,
        foodDist,
        locationDist,
        emblemDist
      }
    },
    responses: []
  };

  console.log(`[Cycle] Started ${currentSession.id} (#${currentSession.sessionNumber}) - "${currentSession.name}" (${currentSession.timeLabel})`);

  broadcast({
    type: 'CYCLE_ADVANCED',
    currentSession,
    archivedSession: archived,
    pastSessions,
    mutationTopology: selectedTopoInfo.id,
    topologyInfo: currentSession.topologyInfo
  });

  return {
    currentSession,
    archivedSession: archived,
    pastSessions
  };
}

// API Routes
app.get('/api/state', (req, res) => {
  const baseUrl = getBaseUrl(req);
  const tabletUrl = `${baseUrl}/`;
  
  res.json({
    localIP: LOCAL_IP,
    port: PORT,
    tabletUrl,
    currentSession,
    pastSessions,
    weatherOptions: WEATHER_OPTIONS,
    foodOptions: FOOD_OPTIONS,
    locationOptions: LOCATION_OPTIONS,
    emblemOptions: EMBLEM_OPTIONS,
    serverTime: Date.now()
  });
});

app.get('/api/sessions', (req, res) => {
  res.json({
    currentSession,
    pastSessions
  });
});

app.get('/api/sessions/:id', (req, res) => {
  const sid = req.params.id;
  const session = pastSessions.find(s => s.id === sid) || (currentSession.id === sid ? currentSession : null);
  if (!session) return res.status(404).json({ error: 'Session not found' });
  res.json({ session });
});

// Upload and persist real canvas snapshot image (JPEG/WebP dataUrl)
app.post('/api/sessions/:id/snapshot', (req, res) => {
  const sessionId = req.params.id;
  const { imageData } = req.body || {};

  if (!imageData) {
    return res.status(400).json({ error: 'Missing imageData parameter' });
  }

  try {
    const base64Data = imageData.replace(/^data:image\/\w+;base64,/, '');
    const buffer = Buffer.from(base64Data, 'base64');
    const filename = `${sessionId}.jpg`;
    const filePath = path.join(ARCHIVE_DIR, filename);

    fs.writeFileSync(filePath, buffer);
    const snapshotUrl = `/archive/${filename}?v=${Date.now()}`;

    // Update in pastSessions if found
    const session = pastSessions.find(s => s.id === sessionId);
    if (session) {
      session.snapshotUrl = snapshotUrl;
      savePersistedSessions(pastSessions);
    }

    console.log(`[Storage] Saved snapshot for ${sessionId} (${buffer.length} bytes) -> ${filePath}`);

    // Broadcast snapshot update to all displays and tablets
    broadcast({
      type: 'SESSION_SNAPSHOT_UPDATED',
      sessionId,
      snapshotUrl,
      pastSessions
    });

    res.json({ success: true, sessionId, snapshotUrl });
  } catch (err) {
    console.error(`[Storage] Error saving snapshot for ${sessionId}:`, err);
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/qr', async (req, res) => {
  try {
    const baseUrl = getBaseUrl(req);
    const url = req.query.url || `${baseUrl}/`;
    const qrDataUrl = await QRCode.toDataURL(url, {
      margin: 1,
      color: {
        dark: '#4A170B',
        light: '#F8EFE3'
      },
      width: 512
    });
    res.json({ dataUrl: qrDataUrl, targetUrl: url });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Serve 10-second looping animated GIF of main frames for previous 30-min session artworks
app.get('/api/sessions/:id/artwork.gif', (req, res) => {
  const sessionId = req.params.id;
  let session = pastSessions.find(s => s.id === sessionId);
  if (!session && currentSession.id === sessionId) {
    session = currentSession;
  }
  if (!session) {
    session = pastSessions.find(s => String(s.sessionNumber) === sessionId || s.id.endsWith(sessionId));
  }
  if (!session && pastSessions.length > 0) {
    session = pastSessions[pastSessions.length - 1];
  }

  if (!session) {
    return res.status(404).send('Session artwork not found');
  }

  try {
    const gifBuffer = getOrCreateSessionGif(session);
    res.setHeader('Content-Type', 'image/gif');
    res.setHeader('Cache-Control', 'public, max-age=60');
    res.setHeader('Content-Length', gifBuffer.length);
    res.send(gifBuffer);
  } catch (err) {
    console.error('Error serving session GIF:', err);
    res.status(500).send('Error generating GIF');
  }
});

app.post('/api/respond', (req, res) => {
  const { weather, food, location, emblem, note, author } = req.body;
  if (!weather || !food) {
    return res.status(400).json({ error: 'Weather and food selections are required.' });
  }

  const responseEntry = {
    id: 'resp-' + Date.now() + '-' + Math.random().toString(36).substr(2, 4),
    weather,
    food,
    location: location || 'aguada_fort',
    emblem: emblem || 'mandovi_boat',
    note: note ? note.slice(0, 140) : '',
    author: author ? author.slice(0, 50) : 'Anonymous Attendee',
    timestamp: Date.now()
  };

  currentSession.responses.push(responseEntry);

  // Broadcast to all displays immediately
  broadcast({
    type: 'NEW_RESPONSE',
    response: responseEntry,
    totalCount: currentSession.responses.length
  });

  res.json({ success: true, response: responseEntry });
});

app.post('/api/trigger-cycle', (req, res) => {
  const { customName, mutationTopology } = req.body || {};
  advanceToNextSession(customName, mutationTopology);
  res.json({ success: true, currentSession });
});

// 20 Thematic Cycle Presets directly generated from the 20 Topologies Catalog
const CYCLE_PRESETS = TOPOLOGY_CATALOG.map(topo => {
  const primaryWeather = topo.affinity.weather[0] || 'sunny';
  const secondaryWeather = topo.affinity.weather[1] || 'calm';
  const primaryFood = topo.affinity.food[0] || 'fish_curry';
  const secondaryFood = topo.affinity.food[1] || 'bebinca';
  const primaryLoc = topo.affinity.location[0] || 'aguada_fort';
  const primaryEmblem = topo.affinity.emblem[0] || 'mandovi_boat';

  return {
    name: topo.name,
    dominantWeather: primaryWeather,
    dominantFood: primaryFood,
    dominantLocation: primaryLoc,
    dominantEmblem: primaryEmblem,
    mutationTopology: topo.id,
    dist: {
      weather: [primaryWeather, primaryWeather, secondaryWeather, 'sunny'],
      food: [primaryFood, primaryFood, secondaryFood, 'fish_curry'],
      location: [primaryLoc, primaryLoc, 'aguada_fort', 'palolem_beach'],
      emblem: [primaryEmblem, primaryEmblem, 'mandovi_boat', 'susegad']
    }
  };
});

let cyclePresetIndex = 0;

app.get('/api/topologies', (req, res) => {
  res.json({
    total: TOPOLOGY_CATALOG.length,
    topologies: TOPOLOGY_CATALOG,
    usedTopologies
  });
});

app.post('/api/simulate-cycle', (req, res) => {
  // Support forced topology or automatic non-repeating cycle progression
  let targetTopologyId;
  if (req.body && typeof req.body.topology === 'number') {
    targetTopologyId = req.body.topology % TOPOLOGY_CATALOG.length;
  }

  let preset;
  if (targetTopologyId !== undefined) {
    preset = CYCLE_PRESETS[targetTopologyId];
  } else {
    preset = CYCLE_PRESETS[cyclePresetIndex % CYCLE_PRESETS.length];
    cyclePresetIndex++;
  }

  // Generate 28-36 realistic attendee votes matching this cycle's distinct theme
  const voteCount = Math.floor(Math.random() * 8) + 28;
  const sampleNotes = [
    'Vernacular architecture insights were profound',
    'AI for coastal marine mapping in Zuari estuary',
    'Loved the intergenerational debate on open models',
    'Goan Kaavi art traditions revitalized with algorithms',
    'Sensory resonance between food, soil, and intelligence',
    'Susegad pacing gives deeper clarity',
    'Dudhsagar cascades of open innovation',
    'Sustainable edge compute for coastal conservation'
  ];

  for (let i = 0; i < voteCount; i++) {
    const weather = preset.dist.weather[Math.floor(Math.random() * preset.dist.weather.length)];
    const food = preset.dist.food[Math.floor(Math.random() * preset.dist.food.length)];
    const location = preset.dist.location[Math.floor(Math.random() * preset.dist.location.length)];
    const emblem = preset.dist.emblem[Math.floor(Math.random() * preset.dist.emblem.length)];
    const note = sampleNotes[Math.floor(Math.random() * sampleNotes.length)];

    currentSession.responses.push({
      id: 'sim-' + Date.now() + '-' + i,
      weather,
      food,
      location,
      emblem,
      note,
      author: 'Attendee #' + Math.floor(Math.random() * 800 + 100),
      timestamp: Date.now() - Math.floor(Math.random() * 1800000)
    });
  }

  // Advance session with the designated mutation topology or automatic selection
  const adv = advanceToNextSession(preset.name, preset.mutationTopology);

  res.json({
    success: true,
    simulatedVotes: voteCount,
    theme: preset.name,
    mutationTopology: currentSession.mutationTopology,
    topologyInfo: currentSession.topologyInfo,
    currentSession,
    archivedSession: adv ? adv.archivedSession : null,
    pastSessions
  });
});

app.post('/api/inject-mock', (req, res) => {
  const count = parseInt(req.body.count || '5', 10);
  const sampleNotes = [
    'Brilliant discussion on Goan vernacular datasets',
    'AI for marine conservation in Zuari estuary',
    'Heritage architecture meets spatial neural models',
    'Loved the intergenerational mentorship!',
    'Inspiring to see grassroots solutions in Konkani',
    'Inclusivity makes all the difference',
    'Susegad mindset for sustainable AI progress',
    'Dudhsagar cascades of open innovation'
  ];

  const added = [];
  for (let i = 0; i < count; i++) {
    const weather = WEATHER_OPTIONS[Math.floor(Math.random() * WEATHER_OPTIONS.length)].id;
    const food = FOOD_OPTIONS[Math.floor(Math.random() * FOOD_OPTIONS.length)].id;
    const location = LOCATION_OPTIONS[Math.floor(Math.random() * LOCATION_OPTIONS.length)].id;
    const emblem = EMBLEM_OPTIONS[Math.floor(Math.random() * EMBLEM_OPTIONS.length)].id;
    const note = sampleNotes[Math.floor(Math.random() * sampleNotes.length)];
    const entry = {
      id: 'mock-' + Date.now() + '-' + i,
      weather,
      food,
      location,
      emblem,
      note,
      author: 'Attendee #' + Math.floor(Math.random() * 800 + 100),
      timestamp: Date.now()
    };
    currentSession.responses.push(entry);
    added.push(entry);

    broadcast({
      type: 'NEW_RESPONSE',
      response: entry,
      totalCount: currentSession.responses.length
    });
  }

  res.json({ success: true, addedCount: added.length, total: currentSession.responses.length });
});

// WebSocket Connection handling
wss.on('connection', (ws) => {
  // Send initial state snapshot
  ws.send(JSON.stringify({
    type: 'INITIAL_STATE',
    currentSession,
    pastSessions,
    weatherOptions: WEATHER_OPTIONS,
    foodOptions: FOOD_OPTIONS,
    locationOptions: LOCATION_OPTIONS,
    emblemOptions: EMBLEM_OPTIONS,
    serverTime: Date.now()
  }));

  ws.on('message', (msg) => {
    try {
      const data = JSON.parse(msg.toString());
      if (data.type === 'PING') {
        ws.send(JSON.stringify({ type: 'PONG' }));
      }
    } catch (e) {}
  });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`======================================================`);
  console.log(`  Goa Conclave: Computational Artwork & Tablet System`);
  console.log(`  Artwork Display Screen (9:16 Vertical):`);
  console.log(`  -> http://localhost:${PORT}/?mode=screen`);
  console.log(`  Tablet Survey Kiosk / Mobile Web App:`);
  console.log(`  -> http://${LOCAL_IP}:${PORT}/?mode=tablet`);
  console.log(`  Dual Presentation Mode (Screen + Tablet Side-by-Side):`);
  console.log(`  -> http://localhost:${PORT}/?mode=dual`);
  console.log(`  Fast Low-Power Mode (Optimized for Slower Processors):`);
  console.log(`  -> http://localhost:${PORT}/?mode=lp`);
  console.log(`======================================================`);
});
