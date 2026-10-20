// Computational Artwork Animated GIF Generator
// Generates lightweight looping GIFs (~30-50KB, 9.6s loop) of the main frames
// capturing the 30-minute computational artwork evolution for past sessions.

import omggif from 'omggif';

const GIF_CACHE = new Map();

/**
 * Generate or retrieve cached animated GIF buffer for a session
 */
export function getOrCreateSessionGif(session) {
  if (!session) return null;
  const cacheKey = `${session.id}_topo${session.mutationTopology || 0}_w${session.dominantWeather}_f${session.dominantFood}`;
  if (GIF_CACHE.has(cacheKey)) {
    return GIF_CACHE.get(cacheKey);
  }

  const topoId = typeof session.mutationTopology === 'number'
    ? session.mutationTopology
    : (session.topologyInfo?.id ?? 0);

  const gifBuffer = renderSessionGif(
    topoId,
    session.dominantWeather || 'sunny',
    session.dominantFood || 'fish_curry',
    session.dominantLocation || 'palolem_beach',
    session.dominantEmblem || 'mandovi_boat'
  );

  GIF_CACHE.set(cacheKey, gifBuffer);
  return gifBuffer;
}

/**
 * Render an 8-frame, 9.6-second looping animated GIF of the session's main frames
 */
function renderSessionGif(topoId, weather, food, location, emblem) {
  const width = 216;
  const height = 384;
  const buf = Buffer.alloc(width * height * 12);
  const gifWriter = new omggif.GifWriter(buf, width, height, { loop: 0 });

  // 128-color palette tailored to weather, food, and Goan laterite/gold aesthetics
  const palette = buildPalette(weather, food);

  const numPoints = 2800;
  const pixels = new Uint8Array(width * height);
  const totalFrames = 8;
  const frameDelay = 120; // 1.20s per frame -> 8 * 1.2s = 9.6s total loop (under 10s)

  for (let f = 0; f < totalFrames; f++) {
    pixels.fill(0); // Clear to background (palette[0])
    const t = f / totalFrames; // 0.0 to 0.875

    // Evolution phases across the 30 minutes:
    // Frame 0: Genesis Influx (t=0.0)
    // Frame 1: Weather currents (t=0.125)
    // Frame 2: Masala spice swell (t=0.25)
    // Frame 3: Landmark vector crest (t=0.375)
    // Frame 4: Climax signature topology (t=0.5)
    // Frame 5: Cultural emblem flow (t=0.625)
    // Frame 6: Ambient conclave synthesis (t=0.75)
    // Frame 7: Loop return harmonic (t=0.875)

    // Morph evolution factor: expands and focuses into signature topology
    const evolutionFactor = Math.sin(t * Math.PI) * 0.7 + 0.3;

    for (let i = 0; i < numPoints; i++) {
      const u = i / numPoints;
      const seed = (i * 9301 + 49297) % 233280 / 233280;

      // Calculate base coordinate for this topology
      const [tx, ty] = getTopologyCoords(topoId, u, seed, t);

      // Influx dispersion based on frame phase
      const dispersion = (1 - evolutionFactor) * 0.35 * (seed - 0.5);
      const x = tx + Math.cos(u * Math.PI * 6 + t * Math.PI * 2) * dispersion;
      const y = ty + Math.sin(u * Math.PI * 6 + t * Math.PI * 2) * dispersion;

      const px = Math.floor(x * width);
      const py = Math.floor(y * height);

      if (px >= 1 && px < width - 1 && py >= 1 && py < height - 1) {
        // Color index based on point progress, frame phase, and sentiment
        const colorOffset = Math.floor((u * 70 + f * 7 + seed * 30) % 90);
        const colorIdx = 30 + colorOffset;

        pixels[py * width + px] = colorIdx;
        // 2x2 cluster for luminous stipple density
        if (i % 3 === 0) {
          pixels[py * width + (px + 1)] = Math.min(127, colorIdx + 10);
          pixels[(py + 1) * width + px] = Math.max(1, colorIdx - 10);
        }
      }
    }

    gifWriter.addFrame(0, 0, width, height, pixels, { palette, delay: frameDelay });
  }

  const actualLen = gifWriter.end();
  return buf.subarray(0, actualLen);
}

/**
 * 20 Topology coordinate generators matching the client-side particle engine
 */
function getTopologyCoords(topoId, u, seed, t) {
  const topo = topoId % 20;
  let x = 0.5;
  let y = 0.5;

  switch (topo) {
    case 0: { // Mandovi S-Curve & Sacred Kaavi
      y = 0.12 + u * 0.76;
      x = 0.5 + Math.sin(u * Math.PI * 2 + t * Math.PI * 2) * 0.28 + (seed - 0.5) * 0.08;
      break;
    }
    case 1: { // Intertwined Marine Currents & Laterite Fire Strata
      const isFire = (seed > 0.5);
      y = 0.15 + u * 0.7;
      const phase = isFire ? 0 : Math.PI;
      x = 0.5 + Math.sin(u * Math.PI * 3 + phase + t * Math.PI * 2) * 0.24 + (seed - 0.5) * 0.06;
      break;
    }
    case 2: { // Fort Aguada Lighthouse Beacon & Orbital Ripples
      const ring = Math.floor(u * 14);
      const theta = (u * 14 % 1.0) * Math.PI * 2 + t * Math.PI * 2;
      const r = 0.04 + ring * 0.026;
      x = 0.5 + Math.cos(theta) * r;
      y = 0.38 + Math.sin(theta) * r * 1.5;
      break;
    }
    case 3: { // Dudhsagar Waterfall Torrent & Rainforest Terraces
      if (seed < 0.65) {
        x = 0.5 + (seed - 0.5) * 0.16 * (1 - u * 0.4);
        y = (u + t * 0.2) % 0.85 + 0.08;
      } else {
        const terrace = Math.floor(u * 5);
        y = 0.5 + terrace * 0.09;
        x = 0.2 + (u * 5 % 1.0) * 0.6 + Math.sin(t * Math.PI * 2 + terrace) * 0.04;
      }
      break;
    }
    case 4: { // Fontainhas Latin Quarter Archways & Polychrome Mosaic
      const arch = Math.floor(u * 3);
      const theta = (u * 3 % 1.0) * Math.PI;
      const rad = 0.14 + arch * 0.11;
      x = 0.5 + Math.cos(theta) * rad + (seed - 0.5) * 0.04;
      y = 0.78 - Math.sin(theta) * rad * 1.6 + Math.sin(t * Math.PI * 2 + arch) * 0.02;
      break;
    }
    case 5: { // Palolem Crescent Bay & Harmonic Swells
      const theta = 0.15 + (u * 0.7) * Math.PI;
      const rad = 0.38 + (seed - 0.5) * 0.08;
      x = 0.5 + Math.cos(theta) * rad * 0.85;
      y = 0.25 + Math.sin(theta) * rad * 1.2 + Math.sin(t * Math.PI * 2) * 0.03;
      break;
    }
    case 6: { // Chapora Clifftop Ridge & Western Sea Winds
      x = 0.12 + u * 0.76;
      const ridgeY = 0.45 + Math.sin(x * 6 + t * 2) * 0.12;
      y = ridgeY + (seed - 0.5) * 0.18;
      break;
    }
    case 7: { // Wood-Fired Goan Poi Bread & Baker Hearth
      if (u < 0.6) {
        // Puffed bread body
        const theta = (u / 0.6) * Math.PI * 2;
        const rad = 0.28 * Math.sqrt(seed);
        x = 0.5 + Math.cos(theta) * rad * 1.15;
        y = 0.44 + Math.sin(theta) * rad * 0.72 + Math.sin(t * Math.PI * 2) * 0.015;
      } else if (u < 0.8) {
        // Aeration slash cut across center
        const sx = ((u - 0.6) / 0.2 - 0.5) * 0.36;
        x = 0.5 + sx;
        y = 0.44 + Math.sin((sx + 0.18) * 8) * 0.02 + (seed - 0.5) * 0.02;
      } else {
        // Oven hearth arch beneath
        const aTheta = ((u - 0.8) / 0.2) * Math.PI;
        x = 0.5 + Math.cos(aTheta) * 0.38;
        y = 0.72 - Math.sin(aTheta) * 0.22 + (seed - 0.5) * 0.03;
      }
      break;
    }
    case 8: { // Cumbarjua Mangrove Estuary & Braided Waterways
      const branch = Math.floor(u * 4);
      y = 0.12 + (u * 4 % 1.0) * 0.76;
      const angle = (branch - 1.5) * 0.4;
      x = 0.5 + Math.sin(y * 8 + t * 2 + branch) * 0.14 + (y - 0.5) * angle;
      break;
    }
    case 9: { // Susegad Celestial Nebula & Twilight Drift
      const angle = u * Math.PI * 6 + t * Math.PI * 2;
      const r = 0.08 + Math.sqrt(seed) * 0.32;
      x = 0.5 + Math.cos(angle) * r * 0.8;
      y = 0.48 + Math.sin(angle) * r * 1.2;
      break;
    }
    case 10: { // Bebinca Seven-Layer Caramel Culinary Strata
      const layer = Math.floor(u * 7);
      y = 0.22 + layer * 0.08 + Math.sin(u * 20 + t * Math.PI * 2) * 0.015;
      x = 0.18 + (u * 7 % 1.0) * 0.64 + (seed - 0.5) * 0.04;
      break;
    }
    case 11: { // Mandovi River Sailboat & Fluvial Wake Currents
      if (u < 0.35) {
        // Boat hull
        const tVal = (u / 0.35 - 0.5) * 2;
        x = 0.5 + tVal * 0.32;
        y = 0.62 + Math.pow(Math.abs(tVal), 1.8) * 0.04 + Math.sin(t * Math.PI * 2) * 0.01;
      } else if (u < 0.75) {
        // Billowing triangular sail
        const sProg = (u - 0.35) / 0.40;
        const sy = 0.22 + sProg * 0.38;
        const maxW = 0.28 * Math.sin(sProg * Math.PI * 0.85);
        x = 0.48 + (seed * maxW) + Math.sin(t * Math.PI * 2 + sProg * 2) * 0.015;
        y = sy;
      } else {
        // Diverging wake ripples
        const wProg = (u - 0.75) / 0.25;
        const arm = (seed < 0.5) ? -1 : 1;
        x = 0.5 + arm * (wProg * 0.38) + (seed - 0.5) * 0.04;
        y = 0.64 + wProg * 0.24 + Math.sin(t * Math.PI * 2 + wProg * 6) * 0.02;
      }
      break;
    }
    case 12: { // Morjim Olive Ridley Nesting Swell & Ocean Drift
      const arcTheta = (u * Math.PI * 1.4) - 0.2;
      const swellR = 0.32 + Math.sin(t * Math.PI * 2 + u * 4) * 0.05;
      x = 0.5 + Math.cos(arcTheta) * swellR * 0.85;
      y = 0.52 + Math.sin(arcTheta) * swellR * 1.1;
      break;
    }
    case 13: { // Zuari Railway Bridge & Industrial Horizon Strata
      if (seed < 0.4) {
        y = 0.48 + (seed - 0.2) * 0.05;
        x = 0.1 + u * 0.8;
      } else {
        const span = Math.floor(u * 6);
        const spanX = 0.15 + span * 0.12;
        const diag = (u * 6 % 1.0);
        x = spanX + diag * 0.12;
        y = 0.48 - Math.sin(diag * Math.PI) * 0.18 + Math.sin(t * Math.PI * 2) * 0.02;
      }
      break;
    }
    case 14: { // Goa Carnival Samba Corona & Chromatic Confetti
      const angle = u * Math.PI * 8 + t * Math.PI * 2;
      const rayLen = 0.1 + (Math.sin(angle * 6) * 0.5 + 0.5) * 0.28;
      x = 0.5 + Math.cos(angle) * rayLen * 0.8;
      y = 0.48 + Math.sin(angle) * rayLen * 1.2;
      break;
    }
    case 15: { // Chorao Bird Sanctuary & Kingfisher Flight Vectors
      const wingSide = (seed < 0.5) ? -1 : 1;
      const wingSpan = (u % 0.5) * 2;
      x = 0.5 + wingSpan * 0.42 * wingSide;
      y = 0.55 - Math.sin(wingSpan * Math.PI * 0.5) * 0.32 + Math.sin(t * Math.PI * 2 + wingSpan * 3) * 0.04;
      break;
    }
    case 16: { // Anjuna Flea Market Kaleidoscope & Mandala Vortex
      const petals = 8;
      const angle = (Math.floor(u * petals) / petals) * Math.PI * 2 + t * Math.PI * 2;
      const dist = 0.08 + (u % (1 / petals)) * petals * 0.3;
      x = 0.5 + Math.cos(angle) * dist * 0.8;
      y = 0.48 + Math.sin(angle) * dist * 1.2;
      break;
    }
    case 17: { // Divar Island Monsoon Puddle Ripples & Rain Columns
      if (seed < 0.5) {
        x = 0.15 + (seed * 2) * 0.7;
        y = (u + t * 0.4) % 0.85 + 0.08;
      } else {
        const ring = Math.floor(u * 6);
        const theta = (u * 6 % 1.0) * Math.PI * 2;
        const r = 0.05 + ring * 0.045 + (t % 0.2) * 0.15;
        x = 0.5 + Math.cos(theta) * r * 0.8;
        y = 0.65 + Math.sin(theta) * r * 0.45;
      }
      break;
    }
    case 18: { // Goan Cashew Apple & Curved Kidney Nut
      if (u < 0.65) {
        const tVal = (u / 0.65);
        const theta = tVal * Math.PI * 2;
        const rad = (0.16 + (tVal * 0.14)) * Math.sqrt(seed);
        x = 0.5 + Math.cos(theta) * rad * 1.15;
        y = 0.40 + Math.sin(theta) * (rad * 1.25) + Math.sin(t * Math.PI * 2) * 0.015;
      } else if (u < 0.88) {
        const nTheta = ((u - 0.65) / 0.23) * Math.PI * 1.8 - 0.2;
        const nRad = 0.09 + (seed - 0.5) * 0.03;
        x = 0.51 + Math.cos(nTheta) * (nRad * 1.2);
        y = 0.67 + Math.sin(nTheta) * nRad;
      } else {
        x = 0.5 + (seed - 0.5) * 0.6;
        y = 0.16 + ((u - 0.88) / 0.12) * 0.6;
      }
      break;
    }
    case 19: // Cabo de Rama Sunset Horizon & Golden Hour Thermals
    default: {
      if (seed < 0.45) { // Radiant half-sun
        const theta = (u * Math.PI);
        const r = 0.22 + (seed - 0.22) * 0.08;
        x = 0.5 + Math.cos(theta) * r * 0.9;
        y = 0.58 - Math.sin(theta) * r * 0.85;
      } else { // Rising convection plumes
        x = 0.2 + (seed - 0.45) * 1.4;
        y = 0.58 - ((u * 1.5 + t * 0.4) % 0.55);
      }
      break;
    }
  }

  return [x, y];
}

/**
 * Build 128-color palette attuned to session sentiment
 */
function buildPalette(weather, food) {
  const palette = [];
  palette.push(0x0e0503); // 0: Deep background laterite black

  for (let i = 1; i < 128; i++) {
    const t = i / 127;
    let r, g, b;

    if (weather === 'rainy') {
      // Monsoon blues, aquatic viridian & wet laterite
      r = Math.floor(18 + 75 * t + 30 * t * t);
      g = Math.floor(45 + 175 * t);
      b = Math.floor(75 + 170 * t);
    } else if (weather === 'stormy' || food === 'vindaloo') {
      // Fiery chili volcanic magma & crimson embers
      r = Math.floor(65 + 190 * t);
      g = Math.floor(15 + 95 * t * t);
      b = Math.floor(8 + 35 * t * t);
    } else if (weather === 'calm' || food === 'fish_curry') {
      // Arabian Sea azure, coconut ivory & warm susegad sand
      r = Math.floor(30 + 190 * t);
      g = Math.floor(55 + 175 * t);
      b = Math.floor(70 + 110 * t);
    } else if (weather === 'windy') {
      // Clifftop ocean spray cyan & golden sand
      r = Math.floor(45 + 195 * t);
      g = Math.floor(40 + 165 * t);
      b = Math.floor(25 + 95 * t);
    } else { // Sunny & Bebinca / default
      // Sacred Kaavi vermilion, golden sunburst & warm laterite ochre
      r = Math.floor(48 + 207 * t);
      g = Math.floor(22 + 185 * t);
      b = Math.floor(12 + 65 * t);
    }

    palette.push((Math.min(255, r) << 16) | (Math.min(255, g) << 8) | Math.min(255, b));
  }

  return palette;
}
