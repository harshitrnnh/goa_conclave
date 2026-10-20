// Procedural Goan Shape & Constellation Generator
// Generates point clouds for:
// 1. Top Goan Dish (Fish Curry, Bebinca, Vindaloo, Prawn Curry, Xacuti, Poe Bread)
// 2. Top Tourist Place / Landmark (Dudhsagar Falls, Fort Aguada, Fontainhas, Chapora Fort, Palolem Beach, Basilica of Bom Jesus)
// 3. Top Weather Representation (Sunny Sunburst, Windy Sweeps, Monsoon Cascades, Stormy Vortex, Calm Ocean Harmonic)
// 4. Top Cultural / Natural Emblem (Mandovi Sailboat, Coconut Palm, Olive Ridley Turtle, Goan Kingfisher, Viva Carnival, Susegad)

import { DishShapeGenerator } from './dish-generator.js';

export const SHAPE_METADATA = {
  dish: {
    tag: 'CONCLAVE SPIRIT · TOP FLAVOUR',
    items: {
      fish_curry: { name: 'Fish Curry', subtitle: 'Bold & Transformative' },
      prawn_curry: { name: 'Prawn Curry', subtitle: 'Warm & Exciting' },
      vindaloo: { name: 'Vindaloo', subtitle: 'Spicy & Intense' },
      xacuti: { name: 'Xacuti', subtitle: 'Rich & Layered' },
      bebinca: { name: 'Bebinca', subtitle: 'Sweet & Optimistic' },
      poe_bread: { name: 'Poe Bread', subtitle: 'Simple & Comforting' }
    }
  },
  location: {
    tag: 'CONCLAVE SPIRIT · TOP LANDMARK',
    items: {
      dudhsagar: { name: 'Dudhsagar Waterfalls', subtitle: 'Cascading & Majestic Power' },
      aguada_fort: { name: 'Fort Aguada Lighthouse', subtitle: 'Steadfast & Visionary' },
      fontainhas: { name: 'Fontainhas Latin Quarter', subtitle: 'Vibrant Heritage & Color' },
      chapora_fort: { name: 'Chapora Fort Ramparts', subtitle: 'Expansive & Free-Spirited' },
      palolem_beach: { name: 'Palolem Beach Crescent', subtitle: 'Harmonious Coastal Peace' },
      cabo_de_rama: { name: 'Cabo de Rama Fort', subtitle: 'Dramatic Clifftop & Wild Horizon' }
    }
  },
  weather: {
    tag: 'CONCLAVE SPIRIT · WEATHER ESSENCE',
    items: {
      sunny: { name: 'Sunny & Energetic', subtitle: 'Radiant Solar Corona & Active Vitality' },
      windy: { name: 'Windy & Restless', subtitle: 'Flowing Coastal Breezes & Dispersal' },
      rainy: { name: 'Rainy & Reflective', subtitle: 'Cascading Monsoon Sheets & Depth' },
      stormy: { name: 'Stormy & Eclectic', subtitle: 'Turbulent Cyclone Vortex & Electric Sparks' },
      calm: { name: 'Calm & Serene', subtitle: 'Harmonic Undulating Arabian Sea Swells' }
    }
  },
  emblem: {
    tag: 'CONCLAVE SPIRIT · CULTURAL EMBLEM',
    items: {
      mandovi_boat: { name: 'Mandovi Sailboat', subtitle: 'Navigating New Horizons' },
      coconut_palm: { name: 'Coastal Coconut Palm', subtitle: 'Resilient, Grounded & Fertile' },
      sea_turtle: { name: 'Olive Ridley Turtle', subtitle: 'Deep & Sustainable Marine Wisdom' },
      kingfisher: { name: 'Goan Kingfisher', subtitle: 'Sharp, Agile & Insightful Vision' },
      carnival_spirit: { name: 'Viva Carnival Mask', subtitle: 'Celebratory & Bold Creative Energy' },
      susegad: { name: 'Susegad Hammock', subtitle: 'Thoughtful, Peaceful & Unhurried Flow' }
    }
  }
};

export class ShapeGenerator {
  constructor() {
    this.dishGen = new DishShapeGenerator();
    this.cache = {};
  }

  // Retrieve points for any category & item ID
  getPoints(category, id, cx = 540, cy = 820, scale = 1.35) {
    const key = `${category}_${id}_${cx}_${cy}_${scale}`;
    if (this.cache[key]) return this.cache[key];

    const points = [];

    if (category === 'dish') {
      const pts = this.dishGen.getPointsForDish(id, cx, cy, scale);
      points.push(...pts);
    } else if (category === 'location') {
      this.generateLocation(points, id, cx, cy, scale);
    } else if (category === 'weather') {
      this.generateWeather(points, id, cx, cy, scale);
    } else if (category === 'emblem') {
      this.generateEmblem(points, id, cx, cy, scale);
    }

    this.cache[key] = points;
    return points;
  }

  // ==========================================
  // 1. TOURIST PLACES / LANDMARKS
  // ==========================================
  generateLocation(points, id, cx, cy, s) {
    switch (id) {
      case 'dudhsagar':
        this.generateDudhsagar(points, cx, cy, s);
        break;
      case 'aguada_fort':
        this.generateAguada(points, cx, cy, s);
        break;
      case 'fontainhas':
        this.generateFontainhas(points, cx, cy, s);
        break;
      case 'chapora_fort':
        this.generateChapora(points, cx, cy, s);
        break;
      case 'palolem_beach':
        this.generatePalolem(points, cx, cy, s);
        break;
      case 'cabo_de_rama':
      case 'old_goa_basilica':
        this.generateCaboDeRama(points, cx, cy, s);
        break;
      default:
        this.generateAguada(points, cx, cy, s);
    }
  }

  // Dudhsagar Falls: Multi-tier mountain gorge, cascading waterfall sheets & railway arch
  generateDudhsagar(points, cx, cy, s) {
    // Mountain Cliffs on left & right
    for (let i = 0; i < 900; i++) {
      const side = Math.random() < 0.5 ? -1 : 1;
      const cliffX = cx + side * (110 + Math.random() * 150) * s;
      const cliffY = cy - 200 * s + Math.random() * 380 * s;
      points.push({ x: cliffX, y: cliffY, color: 4, size: 2.2 }); // Deep Laterite
    }

    // Cascading Waterfalls (Milk of Sea - Dudhsagar)
    for (let i = 0; i < 1800; i++) {
      const u = (Math.random() - 0.5) * 80 * s;
      const t = Math.random();
      const fallY = cy - 200 * s + t * 380 * s;
      const fallX = cx + u * (0.6 + t * 0.8) + Math.sin(t * 8) * 8;
      // Frothy white / ivory water
      const isSpray = Math.random() < 0.35;
      points.push({ x: fallX, y: fallY, color: isSpray ? 0 : 5, size: isSpray ? 2.8 : 2.0 });
    }

    // Iconic railway viaduct arch across the waterfall
    const bridgeY = cy - 20 * s;
    for (let i = 0; i < 600; i++) {
      const x = cx - 180 * s + (i / 600) * 360 * s;
      const arch1 = Math.abs(x - (cx - 70 * s)) < 55 * s ? -Math.sqrt(Math.max(0, Math.pow(55 * s, 2) - Math.pow(x - (cx - 70 * s), 2))) * 0.5 : 0;
      const arch2 = Math.abs(x - (cx + 70 * s)) < 55 * s ? -Math.sqrt(Math.max(0, Math.pow(55 * s, 2) - Math.pow(x - (cx + 70 * s), 2))) * 0.5 : 0;
      points.push({ x, y: bridgeY + arch1 + arch2, color: 3, size: 2.5 });
      points.push({ x, y: bridgeY - 14 * s, color: 0, size: 2.2 }); // Railway tracks
    }

    // Plunge pool spray at bottom
    for (let i = 0; i < 600; i++) {
      const angle = Math.random() * Math.PI * 2;
      const r = Math.random() * 120 * s;
      points.push({ x: cx + Math.cos(angle) * r, y: cy + 180 * s + Math.sin(angle) * (r * 0.3), color: 8, size: 2.4 });
    }
  }

  // Fort Aguada Lighthouse: Circular tower, lantern beacon, laterite ramparts
  generateAguada(points, cx, cy, s) {
    // Bastion & Rampart Base
    for (let i = 0; i < 800; i++) {
      const rx = (Math.random() - 0.5) * 320 * s;
      const ry = 60 * s + Math.random() * 100 * s;
      points.push({ x: cx + rx, y: cy + ry, color: 2, size: 2.4 }); // Laterite
    }

    // Rampart Crenellations
    for (let b = -3; b <= 3; b++) {
      const bx = cx + b * 45 * s;
      for (let i = 0; i < 50; i++) {
        points.push({ x: bx + (Math.random() - 0.5) * 26 * s, y: cy + 45 * s + Math.random() * 24 * s, color: 3, size: 2.4 });
      }
    }

    // Cylindrical Lighthouse Tower (4 tiers tapering upward)
    for (let tier = 0; tier < 4; tier++) {
      const tierY = cy + 40 * s - tier * 55 * s;
      const tierW = (130 - tier * 18) * s;
      for (let i = 0; i < 400; i++) {
        const u = (Math.random() - 0.5) * tierW;
        const v = Math.random() * 55 * s;
        const isEdge = Math.abs(u) > tierW * 0.42;
        points.push({ x: cx + u, y: tierY - v, color: isEdge ? 0 : 5, size: isEdge ? 3.0 : 2.0 });
      }
    }

    // Lantern Room & Dome
    const lanternY = cy - 190 * s;
    for (let i = 0; i < 350; i++) {
      const angle = Math.random() * Math.PI * 2;
      const r = Math.random() * 35 * s;
      points.push({ x: cx + Math.cos(angle) * r, y: lanternY + Math.sin(angle) * (r * 0.7), color: 0, size: 3.2 });
    }

    // Radiant Beacon Light Rays sweeping out
    for (let ray = -1; ray <= 1; ray += 2) {
      for (let i = 0; i < 500; i++) {
        const len = 40 * s + Math.random() * 240 * s;
        const spread = (Math.random() - 0.5) * (len * 0.35);
        points.push({ x: cx + ray * len, y: lanternY + spread, color: 0, size: 2.5 });
      }
    }
  }

  // Fontainhas Latin Quarter: Heritage Portuguese house with balcão & pitched terracotta roof
  generateFontainhas(points, cx, cy, s) {
    // Pitched Terracotta Roof Gable
    for (let i = 0; i < 1100; i++) {
      const t = Math.random(); // 0 (peak) to 1 (eaves)
      const roofPeakY = cy - 180 * s;
      const roofW = 320 * s * t;
      const side = Math.random() < 0.5 ? -1 : 1;
      const x = cx + side * roofW * 0.5;
      const y = roofPeakY + t * 110 * s;
      points.push({ x, y, color: 2, size: 2.5 }); // Terracotta Rust
    }

    // Facade Wall (Vibrant Portuguese heritage yellow/ochre)
    for (let i = 0; i < 1200; i++) {
      const x = cx + (Math.random() - 0.5) * 280 * s;
      const y = cy - 70 * s + Math.random() * 210 * s;
      points.push({ x, y, color: 0, size: 2.0 }); // Sun Gold ochre
    }

    // Arched Heritage Windows with Shutters
    const winY = cy - 30 * s;
    [-75, 75].forEach(offset => {
      const wx = cx + offset * s;
      for (let i = 0; i < 260; i++) {
        const angle = Math.PI + Math.random() * Math.PI;
        const r = Math.random() * 28 * s;
        const isArch = Math.random() < 0.4;
        points.push({
          x: wx + Math.cos(angle) * r,
          y: isArch ? winY + Math.sin(angle) * r : winY + Math.random() * 50 * s,
          color: 5, // White ivory border
          size: 2.8
        });
      }
    });

    // Balcão (Goan projecting balcony with wooden railing)
    const balcãoY = cy + 90 * s;
    for (let i = 0; i < 600; i++) {
      const bx = cx + (Math.random() - 0.5) * 200 * s;
      const by = balcãoY + Math.random() * 45 * s;
      points.push({ x: bx, y: by, color: 3, size: 2.6 });
    }
  }

  // Chapora Fort: Clifftop fort ramparts overlooking the ocean headland
  generateChapora(points, cx, cy, s) {
    // Ocean Cliff Slope
    for (let i = 0; i < 700; i++) {
      const t = Math.random();
      const x = cx - 220 * s + t * 440 * s;
      const cliffBaseY = cy + 120 * s - Math.cos(t * Math.PI) * 40 * s;
      points.push({ x, y: cliffBaseY + Math.random() * 60 * s, color: 4, size: 2.2 });
    }

    // Curving Laterite Fort Rampart
    for (let i = 0; i < 1400; i++) {
      const t = Math.random();
      const x = cx - 200 * s + t * 400 * s;
      const wallY = cy + 40 * s - Math.sin(t * Math.PI) * 110 * s;
      points.push({ x, y: wallY + (Math.random() - 0.5) * 35 * s, color: 2, size: 2.5 });
      // Crenellations
      if (Math.sin(t * 30) > 0.4) {
        points.push({ x, y: wallY - 22 * s, color: 3, size: 2.8 });
      }
    }

    // Bastion Flagpole
    const flagX = cx - 60 * s;
    const flagBaseY = cy - 70 * s;
    for (let i = 0; i < 160; i++) {
      points.push({ x: flagX, y: flagBaseY - (i / 160) * 110 * s, color: 5, size: 2.2 });
    }
    // Flag billowing in coastal wind
    for (let i = 0; i < 300; i++) {
      const fx = flagX + Math.random() * 55 * s;
      const fy = flagBaseY - 110 * s + Math.random() * 35 * s + Math.sin(fx * 0.1) * 6;
      points.push({ x: fx, y: fy, color: 0, size: 2.5 });
    }
  }

  // Palolem Beach: Crescent bay shoreline, rolling waves, swaying coconut palms
  generatePalolem(points, cx, cy, s) {
    // Crescent Bay Shoreline Curve
    for (let i = 0; i < 1200; i++) {
      const angle = (Math.PI * 0.15) + (Math.random() * Math.PI * 0.7);
      const r = 240 * s + (Math.random() - 0.5) * 30 * s;
      const x = cx + Math.cos(angle) * r;
      const y = cy + 10 * s + Math.sin(angle) * (r * 0.5);
      points.push({ x, y, color: 0, size: 2.5 }); // Golden sand
    }

    // Arabian Sea Gentle Rolling Surf
    for (let wave = 1; wave <= 4; wave++) {
      for (let i = 0; i < 350; i++) {
        const u = (i / 350 - 0.5) * 380 * s;
        const wy = cy + 50 * s + wave * 28 * s + Math.sin(u * 0.02) * 12;
        points.push({ x: cx + u, y: wy, color: 8, size: 2.2 }); // Emerald sea
      }
    }

    // Leaning Coastal Coconut Palms
    [-140, 140].forEach((pxOffset, pIdx) => {
      const palmX = cx + pxOffset * s;
      const palmBaseY = cy + 20 * s;
      for (let i = 0; i < 350; i++) {
        const t = i / 350;
        const lean = Math.pow(t, 1.4) * (pIdx === 0 ? 50 : -50) * s;
        points.push({ x: palmX + lean, y: palmBaseY - t * 190 * s, color: 3, size: 2.8 });
      }
      // Fronds
      for (let frond = 0; frond < 6; frond++) {
        const fAngle = (frond / 6) * Math.PI * 2;
        for (let j = 0; j < 60; j++) {
          const flen = (j / 60) * 70 * s;
          const drop = Math.pow(j / 60, 2) * 25 * s;
          const fx = palmX + (pIdx === 0 ? 50 : -50) * s + Math.cos(fAngle) * flen;
          const fy = palmBaseY - 190 * s + Math.sin(fAngle) * (flen * 0.5) + drop;
          points.push({ x: fx, y: fy, color: 0, size: 2.0 });
        }
      }
    });
  }

  // Cabo de Rama Fort: Dramatic Clifftop Cape, Ramparts, Bastion & Ocean Surf
  generateCaboDeRama(points, cx, cy, s) {
    // 1. Towering Rocky Cape Escarpment (Clifftop Face)
    for (let i = 0; i < 1100; i++) {
      const t = Math.random();
      const cliffX = cx - 180 * s + t * 320 * s;
      const topY = cy - 60 * s + t * 40 * s;
      const bottomY = cy + 130 * s;
      const y = topY + Math.random() * (bottomY - topY);
      points.push({ x: cliffX, y, color: (Math.random() < 0.6) ? 4 : 2, size: 2.2 });
    }

    // 2. Fort Bastion Ramparts & Crenellated Battlements along the Crest
    for (let i = 0; i < 700; i++) {
      const t = i / 700;
      const x = cx - 180 * s + t * 290 * s;
      const crestY = cy - 60 * s + t * 36 * s;
      points.push({ x, y: crestY, color: 0, size: 2.8 });
      if (Math.sin(t * Math.PI * 24) > 0.1) {
        points.push({ x, y: crestY - 14 * s, color: 3, size: 2.4 });
      }
    }

    // 3. Cabo Lookout Watchtower / Beacon at Clifftop Edge
    const towerX = cx + 80 * s;
    const towerY = cy - 30 * s;
    for (let i = 0; i < 350; i++) {
      const angle = Math.random() * Math.PI * 2;
      const r = Math.random() * 26 * s;
      points.push({ x: towerX + Math.cos(angle) * r, y: towerY - 45 * s + (Math.random() - 0.5) * 50 * s, color: 5, size: 2.6 });
    }
    for (let i = 0; i < 200; i++) {
      const rayAngle = -0.3 + (i / 200) * 0.9;
      const rayLen = 40 * s + Math.random() * 90 * s;
      points.push({ x: towerX + Math.cos(rayAngle) * rayLen, y: towerY - 65 * s + Math.sin(rayAngle) * rayLen, color: 0, size: 3.0 });
    }

    // 4. Crashing Arabian Sea Surf Waves at the Base
    for (let w = 0; w < 4; w++) {
      const waveBaseY = cy + 85 * s + w * 22 * s;
      for (let i = 0; i < 320; i++) {
        const wx = cx - 200 * s + (i / 320) * 400 * s;
        const wy = waveBaseY + Math.sin((i / 320) * Math.PI * 8 + w) * 10 * s;
        points.push({ x: wx, y: wy, color: (w % 2 === 0) ? 5 : 1, size: 2.4 });
      }
    }
  }

  generateBasilica(points, cx, cy, s) {
    this.generateCaboDeRama(points, cx, cy, s);
  }
    }

    // Central Arched Portal Ivory Rim
    for (let i = 0; i < 300; i++) {
      const angle = Math.PI + (i / 300) * Math.PI;
      const r = 40 * s;
      points.push({ x: cx + Math.cos(angle) * r, y: cy + 45 * s + Math.sin(angle) * r, color: 5, size: 3.0 });
    }

    // Tier 2 Middle Layer with Fluted Columns & Rose Window
    for (let i = 0; i < 800; i++) {
      const x = cx + (Math.random() - 0.5) * 230 * s;
      const y = cy - 90 * s + Math.random() * 100 * s;
      points.push({ x, y, color: 2, size: 2.2 });
    }
    // Rose Window
    for (let i = 0; i < 300; i++) {
      const angle = Math.random() * Math.PI * 2;
      const r = Math.random() * 32 * s;
      points.push({ x: cx + Math.cos(angle) * r, y: cy - 40 * s + Math.sin(angle) * r, color: 0, size: 2.8 });
    }

    // Tier 3 Pediment with Jesuit Monogram IHS & Cross
    for (let i = 0; i < 600; i++) {
      const t = Math.random();
      const w = 170 * s * (1 - t);
      const x = cx + (Math.random() - 0.5) * w;
      const y = cy - 90 * s - t * 80 * s;
      points.push({ x, y, color: 3, size: 2.4 });
    }

    // Cross Finial at Peak
    const crossY = cy - 180 * s;
    for (let i = 0; i < 100; i++) {
      points.push({ x: cx, y: crossY - (i / 100) * 45 * s, color: 0, size: 3.2 });
    }
    for (let i = 0; i < 60; i++) {
      points.push({ x: cx - 20 * s + (i / 60) * 40 * s, y: crossY - 26 * s, color: 0, size: 3.2 });
    }
  }

  // ==========================================
  // 2. WEATHER REPRESENTATIONS
  // ==========================================
  generateWeather(points, id, cx, cy, s) {
    switch (id) {
      case 'sunny':
        this.generateSunny(points, cx, cy, s);
        break;
      case 'windy':
        this.generateWindy(points, cx, cy, s);
        break;
      case 'rainy':
        this.generateRainy(points, cx, cy, s);
        break;
      case 'stormy':
        this.generateStormy(points, cx, cy, s);
        break;
      case 'calm':
        this.generateCalm(points, cx, cy, s);
        break;
      default:
        this.generateSunny(points, cx, cy, s);
    }
  }

  // Sunny: Giant Radiant Solar Disc with 16 geometric radiating rays
  generateSunny(points, cx, cy, s) {
    // Core Solar Disc
    for (let i = 0; i < 1500; i++) {
      const r = Math.pow(Math.random(), 0.6) * 90 * s;
      const angle = Math.random() * Math.PI * 2;
      points.push({ x: cx + Math.cos(angle) * r, y: cy + Math.sin(angle) * r, color: 0, size: 3.2 });
    }

    // Concentric Corona Frieze Rings
    [105, 125, 145].forEach((rad, rIdx) => {
      const count = 300 + rIdx * 80;
      for (let i = 0; i < count; i++) {
        const angle = (i / count) * Math.PI * 2;
        points.push({ x: cx + Math.cos(angle) * rad * s, y: cy + Math.sin(angle) * rad * s, color: 1, size: 2.4 });
      }
    });

    // 16 Radiant Triangular Solar Beam Rays
    for (let ray = 0; ray < 16; ray++) {
      const rayAngle = (ray / 16) * Math.PI * 2;
      for (let i = 0; i < 120; i++) {
        const dist = 150 * s + Math.random() * 140 * s;
        const spread = (Math.random() - 0.5) * (dist * 0.14);
        const rx = cx + Math.cos(rayAngle) * dist - Math.sin(rayAngle) * spread;
        const ry = cy + Math.sin(rayAngle) * dist + Math.cos(rayAngle) * spread;
        points.push({ x: rx, y: ry, color: 0, size: 2.8 });
      }
    }
  }

  // Windy: Sweeping flowing coastal breeze spirals & aerodynamic streamline ribbons
  generateWindy(points, cx, cy, s) {
    for (let ribbon = -3; ribbon <= 3; ribbon++) {
      const rOffset = ribbon * 42 * s;
      for (let i = 0; i < 500; i++) {
        const t = (i / 500 - 0.5) * 500 * s;
        const wave = Math.sin(t * 0.015) * 50 * s + Math.cos(t * 0.008) * 30 * s;
        const x = cx + t;
        const y = cy + rOffset + wave;
        points.push({ x, y, color: Math.abs(ribbon) <= 1 ? 0 : 1, size: 2.4 });
      }
    }

    // Vortex curls at ribbon terminals
    [-1, 1].forEach(side => {
      for (let i = 0; i < 400; i++) {
        const angle = i * 0.08;
        const r = angle * 8 * s;
        points.push({
          x: cx + side * 180 * s + Math.cos(angle) * r,
          y: cy + (side > 0 ? -60 : 60) * s + Math.sin(angle) * r,
          color: 0,
          size: 2.6
        });
      }
    });
  }

  // Rainy: Cascading monsoon sheets, cloud canopy & concentric ripple rings
  generateRainy(points, cx, cy, s) {
    // Monsoon Cloud Canopy at top
    for (let i = 0; i < 1100; i++) {
      const cxOffset = (Math.random() - 0.5) * 360 * s;
      const cyOffset = -140 * s + (Math.random() - 0.5) * 70 * s;
      points.push({ x: cx + cxOffset, y: cy + cyOffset, color: 4, size: 2.8 });
    }

    // Cascading Diagonal Rain Streaks
    for (let i = 0; i < 1800; i++) {
      const streakProgress = Math.random();
      const x = cx - 180 * s + Math.random() * 360 * s - streakProgress * 45 * s;
      const y = cy - 80 * s + streakProgress * 280 * s;
      points.push({ x, y, color: 8, size: 2.0 }); // Emerald sea / cool rain
    }

    // Concentric Splash Ripple Rings on ground
    for (let ring = 1; ring <= 4; ring++) {
      const ringX = cx + (ring % 2 === 0 ? 80 : -80) * s;
      const ringY = cy + 180 * s;
      for (let i = 0; i < 180; i++) {
        const angle = Math.random() * Math.PI * 2;
        const rx = ring * 32 * s;
        const ry = ring * 12 * s;
        points.push({ x: ringX + Math.cos(angle) * rx, y: ringY + Math.sin(angle) * ry, color: 5, size: 2.4 });
      }
    }
  }

  // Stormy: Dramatic cyclone vortex spiral with intense eye and lightning sparks
  generateStormy(points, cx, cy, s) {
    // Eye of the Cyclone
    points.push({ x: cx, y: cy, color: 0, size: 5.5 });

    // 4 Logarithmic Cyclone Vortex Arms
    for (let arm = 0; arm < 4; arm++) {
      const armOffset = (arm / 4) * Math.PI * 2;
      for (let i = 0; i < 750; i++) {
        const theta = armOffset + (i / 750) * Math.PI * 4.5;
        const r = Math.pow(i / 750, 1.2) * 240 * s;
        const jitter = (Math.random() - 0.5) * 18 * s;
        const x = cx + Math.cos(theta) * (r + jitter);
        const y = cy + Math.sin(theta) * (r + jitter);
        points.push({ x, y, color: (arm % 2 === 0) ? 7 : 0, size: 2.6 }); // Crimson & Gold
      }
    }

    // Angular Lightning Sparks
    for (let i = 0; i < 400; i++) {
      const lx = cx + (Math.random() - 0.5) * 320 * s;
      const ly = cy + (Math.random() - 0.5) * 320 * s;
      points.push({ x: lx, y: ly, color: 5, size: 3.5 }); // Bright Ivory sparks
    }
  }

  // Calm: Hypnotic undulating ocean harmonic wave swells
  generateCalm(points, cx, cy, s) {
    for (let row = -5; row <= 5; row++) {
      const baseRowY = cy + row * 34 * s;
      const rowAmplitude = 22 * s * (1 - Math.abs(row) * 0.12);
      for (let i = 0; i < 350; i++) {
        const x = cx - 220 * s + (i / 350) * 440 * s;
        const wave = Math.sin((x - cx) * 0.018 + row * 0.6) * rowAmplitude;
        points.push({ x, y: baseRowY + wave, color: (row % 2 === 0) ? 0 : 8, size: 2.4 });
      }
    }
  }

  // ==========================================
  // 3. CULTURAL / NATURAL EMBLEMS
  // ==========================================
  generateEmblem(points, id, cx, cy, s) {
    switch (id) {
      case 'mandovi_boat':
        this.generateMandoviBoat(points, cx, cy, s);
        break;
      case 'coconut_palm':
        this.generateCoconutPalm(points, cx, cy, s);
        break;
      case 'sea_turtle':
        this.generateSeaTurtle(points, cx, cy, s);
        break;
      case 'kingfisher':
        this.generateKingfisher(points, cx, cy, s);
        break;
      case 'carnival_spirit':
        this.generateCarnivalMask(points, cx, cy, s);
        break;
      case 'susegad':
        this.generateSusegadHammock(points, cx, cy, s);
        break;
      default:
        this.generateMandoviBoat(points, cx, cy, s);
    }
  }

  // Mandovi Sailboat: Traditional twin-sail Goan river boat
  generateMandoviBoat(points, cx, cy, s) {
    // Curved Wooden Hull
    for (let i = 0; i < 1100; i++) {
      const u = (Math.random() - 0.5) * 320 * s;
      const hullCurve = Math.pow(u / (160 * s), 2) * 45 * s;
      const y = cy + 70 * s + hullCurve + Math.random() * 32 * s;
      points.push({ x: cx + u, y, color: 3, size: 2.5 });
    }

    // Tall Central Mast
    for (let i = 0; i < 300; i++) {
      const my = cy + 80 * s - (i / 300) * 260 * s;
      points.push({ x: cx + 15 * s, y: my, color: 0, size: 3.2 });
    }

    // Billowing Main Triangular Sail
    for (let i = 0; i < 1200; i++) {
      const t = Math.random(); // 0 (top) to 1 (boom)
      const sailW = t * 140 * s;
      const sx = cx + 15 * s + Math.random() * sailW + Math.sin(t * Math.PI) * 15 * s;
      const sy = cy - 170 * s + t * 230 * s;
      points.push({ x: sx, y: sy, color: 5, size: 2.2 }); // White Ivory sail
    }

    // Jib Sail (front sail)
    for (let i = 0; i < 600; i++) {
      const t = Math.random();
      const jibW = t * 90 * s;
      const sx = cx + 10 * s - Math.random() * jibW;
      const sy = cy - 140 * s + t * 200 * s;
      points.push({ x: sx, y: sy, color: 0, size: 2.2 });
    }

    // Mandovi River Wake Ripples
    for (let i = 0; i < 500; i++) {
      const wx = cx + (Math.random() - 0.5) * 400 * s;
      const wy = cy + 125 * s + Math.random() * 30 * s;
      points.push({ x: wx, y: wy, color: 8, size: 2.2 });
    }
  }

  // Coconut Palm: Tall curved trunk with rings, drooping fronds, coconuts
  generateCoconutPalm(points, cx, cy, s) {
    // Graceful Arched Trunk
    const trunkBaseY = cy + 180 * s;
    for (let i = 0; i < 900; i++) {
      const t = i / 900;
      const curve = Math.sin(t * Math.PI * 0.7) * 70 * s;
      const ty = trunkBaseY - t * 340 * s;
      const tx = cx + curve + (Math.random() - 0.5) * (18 * s * (1 - t * 0.4));
      // Ring segments
      const isRing = (i % 35 < 8);
      points.push({ x: tx, y: ty, color: isRing ? 0 : 3, size: isRing ? 3.0 : 2.2 });
    }

    const crownX = cx + Math.sin(Math.PI * 0.7) * 70 * s;
    const crownY = trunkBaseY - 340 * s;

    // 8 Drooping Radial Fronds
    for (let f = 0; f < 8; f++) {
      const angle = (f / 8) * Math.PI * 2;
      for (let j = 0; j < 240; j++) {
        const prog = j / 240;
        const len = prog * 130 * s;
        const sag = Math.pow(prog, 2.2) * 55 * s;
        const fx = crownX + Math.cos(angle) * len;
        const fy = crownY + Math.sin(angle) * (len * 0.5) + sag;
        points.push({ x: fx, y: fy, color: 0, size: 2.2 });
      }
    }

    // Cluster of 4 Coconuts at crown center
    for (let c = 0; c < 4; c++) {
      const cAngle = (c / 4) * Math.PI * 2;
      for (let i = 0; i < 40; i++) {
        points.push({
          x: crownX + Math.cos(cAngle) * 16 * s + (Math.random() - 0.5) * 8,
          y: crownY + 14 * s + Math.sin(cAngle) * 10 * s,
          color: 2,
          size: 3.5
        });
      }
    }
  }

  // Olive Ridley Sea Turtle: Carapace with scute patterns, long swimming flippers
  generateSeaTurtle(points, cx, cy, s) {
    // Shell Carapace Ellipse & Scute Pattern
    for (let i = 0; i < 1400; i++) {
      const angle = Math.random() * Math.PI * 2;
      const r = Math.pow(Math.random(), 0.7) * 110 * s;
      const x = cx + Math.cos(angle) * (r * 0.85);
      const y = cy + Math.sin(angle) * (r * 1.15);
      // Scute pattern highlight
      const isScuteLine = Math.abs(Math.sin(angle * 6)) > 0.8 || Math.abs(r - 70 * s) < 8;
      points.push({ x, y, color: isScuteLine ? 0 : 8, size: isScuteLine ? 3.0 : 2.2 });
    }

    // Turtle Head
    const headY = cy - 145 * s;
    for (let i = 0; i < 300; i++) {
      const angle = Math.random() * Math.PI * 2;
      const r = Math.random() * 32 * s;
      points.push({ x: cx + Math.cos(angle) * (r * 0.8), y: headY + Math.sin(angle) * r, color: 8, size: 2.6 });
    }

    // Front Swimming Flippers (wings)
    [-1, 1].forEach(side => {
      for (let i = 0; i < 700; i++) {
        const t = Math.random();
        const flipLen = t * 180 * s;
        const sweep = Math.pow(t, 1.5) * 70 * s;
        const fx = cx + side * (80 * s + flipLen);
        const fy = cy - 40 * s + sweep + (Math.random() - 0.5) * (30 * s * (1 - t * 0.7));
        points.push({ x: fx, y: fy, color: 0, size: 2.4 });
      }
    });

    // Rear Flippers
    [-1, 1].forEach(side => {
      for (let i = 0; i < 200; i++) {
        const t = Math.random();
        const fx = cx + side * (60 * s + t * 65 * s);
        const fy = cy + 110 * s + t * 45 * s;
        points.push({ x: fx, y: fy, color: 8, size: 2.2 });
      }
    });
  }

  // Goan Kingfisher: Profile with long pointed bill, crest, folded wing, perched branch
  generateKingfisher(points, cx, cy, s) {
    // Perched Wooden Branch
    for (let i = 0; i < 400; i++) {
      const bx = cx - 180 * s + (i / 400) * 360 * s;
      const by = cy + 120 * s + Math.sin(bx * 0.01) * 8;
      points.push({ x: bx, y: by, color: 4, size: 3.2 });
    }

    // Kingfisher Oval Body
    for (let i = 0; i < 1100; i++) {
      const angle = Math.random() * Math.PI * 2;
      const r = Math.pow(Math.random(), 0.7) * 75 * s;
      const x = cx - 15 * s + Math.cos(angle) * (r * 0.8);
      const y = cy + 20 * s + Math.sin(angle) * (r * 1.15);
      points.push({ x, y, color: 8, size: 2.4 }); // Arabian Sea turquoise
    }

    // Head with Feather Crest
    const headX = cx - 35 * s;
    const headY = cy - 75 * s;
    for (let i = 0; i < 450; i++) {
      const angle = Math.random() * Math.PI * 2;
      const r = Math.random() * 45 * s;
      points.push({ x: headX + Math.cos(angle) * r, y: headY + Math.sin(angle) * r, color: 8, size: 2.5 });
    }

    // Iconic Long Sharp Spear Beak
    for (let i = 0; i < 500; i++) {
      const t = Math.random(); // 0 (tip) to 1 (base)
      const beakX = headX - 25 * s - (1 - t) * 160 * s;
      const beakW = t * 18 * s;
      const beakY = headY + 5 * s + (Math.random() - 0.5) * beakW;
      points.push({ x: beakX, y: beakY, color: 7, size: 2.6 }); // Crimson chili
    }

    // Eye
    points.push({ x: headX - 10 * s, y: headY - 6 * s, color: 5, size: 5.5 });
    points.push({ x: headX - 10 * s, y: headY - 6 * s, color: 0, size: 3.0 });

    // Folded Wing Feather Barbs
    for (let i = 0; i < 600; i++) {
      const t = Math.random();
      const wx = cx + (Math.random() - 0.5) * 50 * s;
      const wy = cy - 20 * s + t * 110 * s;
      points.push({ x: wx, y: wy, color: 0, size: 2.5 }); // Golden wing barbs
    }
  }

  // Viva Carnival Mask: Festive masquerade mask with eye cutouts & plumage
  generateCarnivalMask(points, cx, cy, s) {
    // Mask Body
    for (let i = 0; i < 1500; i++) {
      const u = (Math.random() - 0.5) * 260 * s;
      const v = (Math.random() - 0.5) * 120 * s;
      // Mask curved contour
      const contour = Math.cos((u / (130 * s)) * Math.PI * 0.5);
      if (Math.abs(v) < 60 * s * contour) {
        // Cut out eyes
        const eyeL = Math.hypot(u - (-55 * s), v);
        const eyeR = Math.hypot(u - (55 * s), v);
        if (eyeL > 22 * s && eyeR > 22 * s) {
          points.push({ x: cx + u, y: cy + v, color: 2, size: 2.5 }); // Festive Laterite
        }
      }
    }

    // Golden Mask Edge Filigree
    for (let i = 0; i < 400; i++) {
      const angle = (i / 400) * Math.PI * 2;
      const radX = 130 * s;
      const radY = 60 * s;
      points.push({ x: cx + Math.cos(angle) * radX, y: cy + Math.sin(angle) * radY, color: 0, size: 2.8 });
    }

    // Eye Rim Outlines
    [-55, 55].forEach(offset => {
      for (let i = 0; i < 150; i++) {
        const angle = (i / 150) * Math.PI * 2;
        points.push({
          x: cx + offset * s + Math.cos(angle) * 22 * s,
          y: cy + Math.sin(angle) * 14 * s,
          color: 0,
          size: 2.6
        });
      }
    });

    // Tall Dramatic Plumage Feathers fan out from crown
    for (let f = -3; f <= 3; f++) {
      const fanAngle = -Math.PI * 0.5 + (f / 3) * 0.55;
      for (let i = 0; i < 180; i++) {
        const flen = (i / 180) * 160 * s;
        const fx = cx + Math.cos(fanAngle) * flen;
        const fy = cy - 50 * s + Math.sin(fanAngle) * flen;
        points.push({ x: fx, y: fy, color: Math.abs(f) % 2 === 0 ? 0 : 7, size: 2.6 });
      }
    }
  }

  // Susegad Siesta Hammock: Suspended hammock between two palms, gentle sag, pillow
  generateSusegadHammock(points, cx, cy, s) {
    // Two Supporting Palm Trunks
    [-170, 170].forEach(tx => {
      for (let i = 0; i < 350; i++) {
        const ty = cy - 140 * s + (i / 350) * 320 * s;
        points.push({ x: cx + tx * s, y: ty, color: 4, size: 3.0 });
      }
    });

    // Suspension Ropes
    for (let i = 0; i < 150; i++) {
      const t = i / 150;
      points.push({ x: cx - 170 * s + t * 50 * s, y: cy - 20 * s + t * 50 * s, color: 0, size: 2.2 });
      points.push({ x: cx + 170 * s - t * 50 * s, y: cy - 20 * s + t * 50 * s, color: 0, size: 2.2 });
    }

    // Curved Hammock Weave Sling
    for (let i = 0; i < 1400; i++) {
      const u = (Math.random() - 0.5) * 230 * s;
      const sag = Math.cos((u / (115 * s)) * Math.PI * 0.5) * 65 * s;
      const hy = cy + 40 * s + (65 * s - sag) + Math.random() * 22 * s;
      points.push({ x: cx + u, y: hy, color: 0, size: 2.4 }); // Golden weave
    }

    // Fringe Tassels hanging beneath
    for (let i = 0; i < 400; i++) {
      const u = (Math.random() - 0.5) * 200 * s;
      const sag = Math.cos((u / (100 * s)) * Math.PI * 0.5) * 65 * s;
      const ty = cy + 40 * s + (65 * s - sag) + 22 * s + Math.random() * 25 * s;
      points.push({ x: cx + u, y: ty, color: 5, size: 2.0 });
    }

    // Resting Siesta Pillow
    for (let i = 0; i < 200; i++) {
      const angle = Math.random() * Math.PI * 2;
      const r = Math.random() * 25 * s;
      points.push({ x: cx - 65 * s + Math.cos(angle) * r, y: cy + 62 * s + Math.sin(angle) * (r * 0.6), color: 5, size: 2.6 });
    }
  }
}
