// Pure Abstract Computational Artwork Engine for Goa Conclave
// Ultra-Responsive Chromatic & Topological Mutation Engine:
// 1. Dynamic 30-Minute Cycle Mutations:
//    - Topology 0: Classic Goan Kaavi Tapestry & Mandovi S-Curve
//    - Topology 1: Intertwined Marine Currents & Laterite Fire Strata (New Reference Image!)
//    - Topology 2: Concentric Aguada Lighthouse Beacon & Orbital Ripples
//    - Topology 3: Dudhsagar Waterfall Torrent & Rainforest Terraces
//    - Topology 4: Fontainhas Latin Quarter Polychrome & Archways
// 2. Continuous 30-Minute In-Cycle Responsiveness:
//    - Immediate chromatic shockwave and palette bias on EACH attendee input
//    - Wave undulation, solar dynamics, and Bebinca/Vindaloo strata modulation
// 3. Instant 30-Minute Simulation & Mutation Trigger:
//    - Cinematic 3.5s fluid morphing between structural mutations

import { scoreBestTopologyForResponse } from './sentiment-engine.js';

export const THEME_PALETTES = {
  weather: {
    sunny: {
      name: 'Sunny & Energetic',
      bg: ['#220D07', '#32140C', '#1D0906', '#110403'],
      sunHalo: [245, 192, 38],
      p: [
        [255, 215, 0],   // 0: 24k Sun Gold
        [255, 168, 0],   // 1: Molten Amber
        [194, 65, 36],   // 2: Laterite Rust
        [221, 104, 41],  // 3: Terracotta Ochre
        [125, 30, 16],   // 4: Deep Laterite
        [255, 248, 230], // 5: Coconut Ivory
        [45, 18, 14],    // 6: Roasted Umber
        [240, 85, 35],   // 7: Solar Flare Crimson
        [250, 185, 45],  // 8: Golden Wave
        [215, 135, 45],  // 9: Saffron Strata
        [240, 125, 75],  // 10: Warm Coral
        [255, 205, 55],  // 11: Corona Flare
        [225, 65, 35],   // 12: Festive Clay
        [145, 52, 28]    // 13: Earth Ochre
      ]
    },
    rainy: {
      name: 'Rainy & Reflective (Goan Monsoon)',
      bg: ['#09171C', '#0E222A', '#0A181E', '#050E12'],
      sunHalo: [90, 210, 215],
      p: [
        [175, 235, 240], // 0: Ethereal Mist Silver
        [75, 185, 195],  // 1: Aquamarine Swell
        [42, 115, 130],  // 2: Deep Monsoon Teal
        [65, 150, 165],  // 3: Rainy Slate
        [20, 68, 82],    // 4: Deep Abyssal Slate
        [235, 250, 255], // 5: Crystalline Rain Droplets
        [15, 40, 50],    // 6: Wet Monsoon Charcoal
        [110, 215, 230], // 7: Lightning Ripple
        [50, 170, 190],  // 8: Seafoam Current
        [36, 100, 115],  // 9: Deep Water Strata
        [140, 210, 220], // 10: Wet Pebble
        [85, 200, 210],  // 11: Monsoon Sky
        [60, 155, 175],  // 12: River Mist
        [28, 78, 92]     // 13: Deep Riverbed
      ]
    },
    stormy: {
      name: 'Stormy & Eclectic (Western Ghats Tempest)',
      bg: ['#2E0705', '#420D09', '#240504', '#130202'],
      sunHalo: [245, 45, 25],
      p: [
        [255, 60, 35],   // 0: Fiery Magma Red
        [255, 125, 25],  // 1: Incandescent Orange
        [185, 22, 18],   // 2: Chili Crimson
        [220, 70, 25],   // 3: Smoldering Terracotta
        [115, 14, 12],   // 4: Charred Charcoal
        [255, 225, 160], // 5: White-hot Ember Spark
        [52, 10, 8],     // 6: Volcanic Umber
        [255, 30, 15],   // 7: Lightning Dart
        [245, 95, 25],   // 8: Fire Wave
        [200, 42, 22],   // 9: Spicy Strata
        [240, 85, 45],   // 10: Burning Coral
        [255, 155, 35],  // 11: Solar Flare
        [205, 20, 15],   // 12: Blood Orange
        [95, 18, 12]     // 13: Burnt Laterite
      ]
    },
    windy: {
      name: 'Windy & Restless (Sunset Dunes)',
      bg: ['#241108', '#35170D', '#1F0C06', '#120603'],
      sunHalo: [240, 140, 45],
      p: [
        [252, 185, 55],  // 0: Windblown Sand Gold
        [235, 125, 40],  // 1: Sunset Amber
        [190, 78, 32],   // 2: Terracotta Dust
        [220, 115, 45],  // 3: Desert Ochre
        [130, 45, 20],   // 4: Iron Laterite
        [255, 242, 218], // 5: Sea Spray Foam
        [48, 19, 12],    // 6: Roasted Sand Umber
        [245, 145, 45],  // 7: Gust Ripple
        [230, 110, 38],  // 8: Dune Drift
        [200, 88, 32],   // 9: Strata Layer
        [235, 135, 75],  // 10: Coastal Peach
        [250, 165, 50],  // 11: Evening Breeze
        [210, 68, 32],   // 12: Clay Red
        [140, 54, 25]    // 13: Warm Stone
      ]
    },
    calm: {
      name: 'Calm & Serene (Susegad Arabian Sea)',
      bg: ['#1A1713', '#24201A', '#181512', '#0E0D0A'],
      sunHalo: [230, 205, 155],
      p: [
        [248, 230, 180], // 0: Soft Champagne Gold
        [230, 190, 130], // 1: Golden Sand
        [170, 130, 90],  // 2: Weathered Driftwood
        [200, 160, 115], // 3: Warm Linen Ochre
        [100, 75, 48],   // 4: Quiet Sandstone
        [255, 252, 242], // 5: Mother-of-Pearl Ivory
        [42, 34, 25],    // 6: Deep Shadow
        [240, 210, 155], // 7: Gentle Sparkle
        [155, 190, 170], // 8: Soft Arabian Jade
        [185, 145, 100], // 9: Serene Strata
        [220, 175, 140], // 10: Seashell Pink
        [240, 215, 165], // 11: Calm Horizon
        [180, 120, 80],  // 12: Gentle Clay
        [120, 88, 58]    // 13: Warm Pebble
      ]
    }
  },

  food: {
    vindaloo: {
      accent: [235, 25, 20],
      p3: [235, 25, 20], p4: [255, 65, 35], p5: [185, 20, 18]
    },
    bebinca: {
      accent: [225, 155, 40],
      p3: [225, 155, 40], p4: [255, 215, 70], p5: [170, 100, 30]
    },
    fish_curry: {
      accent: [255, 195, 25],
      p3: [255, 195, 25], p4: [35, 175, 125], p5: [255, 225, 80]
    },
    prawn_curry: {
      accent: [255, 120, 110],
      p3: [255, 120, 110], p4: [240, 145, 130], p5: [255, 185, 175]
    },
    xacuti: {
      accent: [140, 75, 30],
      p3: [140, 75, 30], p4: [200, 130, 45], p5: [115, 55, 22]
    },
    poe_bread: {
      accent: [255, 250, 238],
      p3: [255, 250, 238], p4: [210, 165, 105], p5: [180, 135, 75]
    }
  },

  location: {
    dudhsagar: {
      accent: [35, 205, 125],
      p6: [35, 205, 125], p7: [165, 245, 225], p8: [245, 255, 255]
    },
    aguada_fort: {
      accent: [255, 225, 50],
      p6: [255, 225, 50], p7: [255, 240, 120], p8: [90, 220, 235]
    },
    fontainhas: {
      accent: [40, 105, 245],
      p6: [40, 105, 245], p7: [60, 165, 255], p8: [245, 175, 35]
    },
    chapora_fort: {
      accent: [215, 60, 40],
      p6: [215, 60, 40], p7: [245, 150, 50], p8: [170, 50, 30]
    },
    palolem_beach: {
      accent: [20, 210, 215],
      p6: [20, 210, 215], p7: [245, 220, 160], p8: [85, 230, 200]
    },
    cabo_de_rama: {
      accent: [30, 175, 220],
      p6: [30, 175, 220], p7: [150, 80, 170], p8: [230, 135, 60]
    },
    old_goa_basilica: {
      accent: [255, 215, 55],
      p6: [255, 215, 55], p7: [155, 25, 50], p8: [195, 135, 45]
    }
  },

  emblem: {
    kingfisher: {
      accent: [15, 225, 230],
      p9: [15, 225, 230], p10: [25, 115, 245], p11: [10, 180, 210]
    },
    coconut_palm: {
      accent: [40, 200, 105],
      p9: [40, 200, 105], p10: [135, 220, 65], p11: [25, 150, 75]
    },
    coconut_tree: {
      accent: [40, 200, 105],
      p9: [40, 200, 105], p10: [135, 220, 65], p11: [25, 150, 75]
    },
    sea_turtle: {
      accent: [25, 105, 140],
      p9: [25, 105, 140], p10: [85, 190, 165], p11: [20, 75, 105]
    },
    carnival_spirit: {
      accent: [245, 40, 140],
      p9: [245, 40, 140], p10: [175, 60, 235], p11: [255, 225, 35]
    },
    susegad: {
      accent: [175, 160, 220],
      p9: [175, 160, 220], p10: [115, 210, 225], p11: [240, 245, 245]
    },
    mandovi_boat: {
      accent: [60, 195, 225],
      p9: [60, 195, 225], p10: [255, 252, 245], p11: [35, 130, 175]
    },
    sea_shell: {
      accent: [245, 185, 195],
      p9: [245, 185, 195], p10: [255, 240, 225], p11: [200, 145, 160]
    }
  }
};

export class GoanArtworkEngine {
  constructor(canvas, sentimentEngine, options = {}) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d', { alpha: false });
    this.sentimentEngine = sentimentEngine;
    this.options = options;

    // High-performance Low-Power mode for slower processors (10,500 particles)
    this.isLP = !!options.isLP;
    this.particleStep = this.isLP ? (options.step || 4) : 1;
    this.targetFps = this.isLP ? (options.fps || 30) : 60;

    // Logical resolution (default 1:1 square ratio, perfectly matching 55vw widescreen TV section)
    this.width = 1080;
    this.height = 1080;
    this.aspectRatio = 1.0;

    // 42,000 Particles representing collective Goan conclave consciousness
    this.TOTAL_PARTICLES = 42000;

    // Simulation timing
    this.time = 0;
    this.isRunning = false;
    this.animId = null;

    // Beacon sweep angle for Aguada lighthouse effect
    this.beaconAngle = 0;

    // Dynamic Color Engine: Active & Target RGB Palettes (14 colors x 3 channels)
    this.currentPaletteRGB = new Float32Array(14 * 3);
    this.targetPaletteRGB = new Float32Array(14 * 3);

    // Dynamic Background Stops & Solar Corona Glow
    this.currentBg = [ [34, 13, 7], [50, 20, 12], [29, 9, 6], [17, 4, 3] ];
    this.targetBg = [ [34, 13, 7], [50, 20, 12], [29, 9, 6], [17, 4, 3] ];
    this.currentSunGlow = [245, 192, 38];
    this.targetSunGlow = [245, 192, 38];

    // Response Chromatic Shockwaves (expanding waves that wash across the canvas)
    this.shockwaves = [];

    // Dot sprite cache (allocated once, dynamically updated with extra sizes for bold pointillism)
    this.dotSprites = [];
    this.spriteContexts = [];
    this.paletteDirty = true;
    this.lastSpriteRebuildTime = 0;

    // Mutation Topologies & Morphing State
    this.currentTopology = 0;
    this.isMorphing = false;
    this.morphProgress = 1.0;
    this.morphDuration = 3.4;

    this.resize();
    this.initBuffers();
    this.initPalette();
    this.createDotSprites();
  }

  initBuffers() {
    const N = this.TOTAL_PARTICLES;
    this.px = new Float32Array(N);              // current animated X
    this.py = new Float32Array(N);              // current animated Y
    this.vx = new Float32Array(N);              // velocity X
    this.vy = new Float32Array(N);              // velocity Y
    this.hx = new Float32Array(N);              // home anchor X
    this.hy = new Float32Array(N);              // home anchor Y
    this.size = new Float32Array(N);            // particle diameter
    this.alpha = new Float32Array(N);           // particle opacity
    this.phase = new Float32Array(N);           // individual oscillation phase
    this.layer = new Uint8Array(N);             // layer: 0=sun core, 1=sun rings, 2=river meander, 3=laterite field, 4=burst
    this.colorIdx = new Uint8Array(N);          // current sprite color index
    this.baseColorIdx = new Uint8Array(N);      // permanent structural base color index
    this.colorExciteTime = new Float32Array(N); // transient excitation countdown

    // Morphing Buffers
    this.morphStartX = new Float32Array(N);
    this.morphStartY = new Float32Array(N);
    this.morphStartSize = new Float32Array(N);
    this.morphTargetX = new Float32Array(N);
    this.morphTargetY = new Float32Array(N);
    this.morphTargetSize = new Float32Array(N);
    this.morphTargetColor = new Uint8Array(N);
    this.morphTargetLayer = new Uint8Array(N);

    this.generateTopology(0, this.px, this.py, this.size, this.colorIdx, this.layer);
    this.hx.set(this.px);
    this.hy.set(this.py);
    this.baseColorIdx.set(this.colorIdx);
    for (let i = 0; i < N; i++) {
      this.phase[i] = Math.random() * Math.PI * 2;
      this.alpha[i] = 0.35 + Math.random() * 0.45;
    }
  }

  // Initialize active palette to Sunny default
  initPalette() {
    const defaultTheme = THEME_PALETTES.weather.sunny;
    for (let i = 0; i < 14; i++) {
      const rgb = defaultTheme.p[i];
      const base = i * 3;
      this.currentPaletteRGB[base] = rgb[0];
      this.currentPaletteRGB[base + 1] = rgb[1];
      this.currentPaletteRGB[base + 2] = rgb[2];
      this.targetPaletteRGB[base] = rgb[0];
      this.targetPaletteRGB[base + 1] = rgb[1];
      this.targetPaletteRGB[base + 2] = rgb[2];
    }
  }

  // Allocate 14 * 7 offscreen canvases once for crisp pointillist dots
  createDotSprites() {
    const sizes = [1.8, 2.5, 3.4, 4.6, 6.0, 7.8, 10.0];
    this.dotSprites = [];
    this.spriteContexts = [];

    for (let c = 0; c < 14; c++) {
      const spriteSet = [];
      const ctxSet = [];
      sizes.forEach(diam => {
        const offCanvas = document.createElement('canvas');
        const d = Math.ceil(diam * 2) + 2;
        offCanvas.width = d;
        offCanvas.height = d;
        const offCtx = offCanvas.getContext('2d');
        const rad = d / 2;
        const dotR = diam;
        spriteSet.push({ canvas: offCanvas, radius: rad });
        ctxSet.push({ ctx: offCtx, radius: rad, dotR: dotR, d: d });
      });
      this.dotSprites.push(spriteSet);
      this.spriteContexts.push(ctxSet);
    }

    this.rebuildDotSprites(true);
  }

  // Efficiently re-render cached dot sprites with crisp pointillist edges (~0.2ms)
  rebuildDotSprites(force = false) {
    for (let c = 0; c < 14; c++) {
      const base = c * 3;
      const r = Math.round(this.currentPaletteRGB[base]);
      const g = Math.round(this.currentPaletteRGB[base + 1]);
      const b = Math.round(this.currentPaletteRGB[base + 2]);
      const hex = `rgb(${r},${g},${b})`;

      const ctxSet = this.spriteContexts[c];
      for (let s = 0; s < ctxSet.length; s++) {
        const item = ctxSet[s];
        const offCtx = item.ctx;
        const rad = item.radius;
        const dotR = item.dotR;
        const d = item.d;

        offCtx.clearRect(0, 0, d, d);
        // Crisp mineral pointillist dot: solid core with clean anti-aliased edge
        const grad = offCtx.createRadialGradient(rad, rad, 0, rad, rad, dotR);
        grad.addColorStop(0, hex);
        grad.addColorStop(0.82, hex);
        grad.addColorStop(1, 'rgba(0,0,0,0)');

        offCtx.fillStyle = grad;
        offCtx.beginPath();
        offCtx.arc(rad, rad, dotR, 0, Math.PI * 2);
        offCtx.fill();
      }
    }
  }

  // =========================================================================
  // STRUCTURAL MUTATION TOPOLOGIES (Mutates every 30-minute cycle!)
  // =========================================================================

  // Generate target coordinates, sizes, layers & colors for any chosen topology (0 to 19)
  generateTopology(mutationIndex, outX, outY, outSize, outColor, outLayer) {
    const topo = ((mutationIndex % 20) + 20) % 20;
    switch (topo) {
      case 1:  return this.buildTopology_IntertwinedMarineFire(outX, outY, outSize, outColor, outLayer);
      case 2:  return this.buildTopology_AguadaBeaconVortex(outX, outY, outSize, outColor, outLayer);
      case 3:  return this.buildTopology_DudhsagarCascade(outX, outY, outSize, outColor, outLayer);
      case 4:  return this.buildTopology_FontainhasMosaic(outX, outY, outSize, outColor, outLayer);
      case 5:  return this.buildTopology_PalolemCrescent(outX, outY, outSize, outColor, outLayer);
      case 6:  return this.buildTopology_ChaporaRidge(outX, outY, outSize, outColor, outLayer);
      case 7:  return this.buildTopology_PoiBread(outX, outY, outSize, outColor, outLayer);
      case 8:  return this.buildTopology_MangroveEstuary(outX, outY, outSize, outColor, outLayer);
      case 9:  return this.buildTopology_SusegadNebula(outX, outY, outSize, outColor, outLayer);
      case 10: return this.buildTopology_BebincaStrata(outX, outY, outSize, outColor, outLayer);
      case 11: return this.buildTopology_MandoviBoat(outX, outY, outSize, outColor, outLayer);
      case 12: return this.buildTopology_TurtleSwell(outX, outY, outSize, outColor, outLayer);
      case 13: return this.buildTopology_ZuariTruss(outX, outY, outSize, outColor, outLayer);
      case 14: return this.buildTopology_CarnivalCorona(outX, outY, outSize, outColor, outLayer);
      case 15: return this.buildTopology_KingfisherVectors(outX, outY, outSize, outColor, outLayer);
      case 16: return this.buildTopology_MandalaVortex(outX, outY, outSize, outColor, outLayer);
      case 17: return this.buildTopology_MonsoonRipples(outX, outY, outSize, outColor, outLayer);
      case 18: return this.buildTopology_GoanCashew(outX, outY, outSize, outColor, outLayer);
      case 19: return this.buildTopology_SunsetThermals(outX, outY, outSize, outColor, outLayer);
      default: return this.buildTopology_MandoviScurve(outX, outY, outSize, outColor, outLayer);
    }
  }

  // Topology 0: The Classic Goan Kaavi Tapestry & Mandovi S-Curve
  buildTopology_MandoviScurve(outX, outY, outSize, outColor, outLayer) {
    const N = this.TOTAL_PARTICLES;
    const W = this.width;
    const H = this.height;
    const sunX = W * 0.74;
    const sunY = H * 0.20;
    let idx = 0;

    // 1. Solar Center & Concentric Rings (9,000)
    for (let i = 0; i < 9000; i++) {
      if (i < 2400) {
        const r = Math.pow(Math.random(), 0.5) * (Math.min(W, H) * 0.07);
        const angle = Math.random() * Math.PI * 2;
        outX[idx] = sunX + Math.cos(angle) * r;
        outY[idx] = sunY + Math.sin(angle) * r;
        outSize[idx] = 2.0 + Math.random() * 2.8;
        outColor[idx] = (Math.random() > 0.35) ? 0 : 5;
        outLayer[idx] = 0;
      } else if (i < 6500) {
        const ringIdx = Math.floor(Math.random() * 6);
        const radius = 45 + ringIdx * 18 + (Math.random() - 0.5) * 6;
        const angle = Math.random() * Math.PI * 2;
        outX[idx] = sunX + Math.cos(angle) * radius;
        outY[idx] = sunY + Math.sin(angle) * radius;
        outSize[idx] = (ringIdx % 2 === 0) ? 3.2 + Math.random() * 2.4 : 1.8 + Math.random() * 1.6;
        outColor[idx] = (ringIdx === 1 || ringIdx === 3) ? 5 : (ringIdx % 2 === 0 ? 0 : 1);
        outLayer[idx] = 1;
      } else {
        const arm = Math.floor(Math.random() * 16);
        const baseAngle = (arm / 16) * Math.PI * 2;
        const dist = 140 + Math.pow(Math.random(), 0.8) * 150;
        const spiralAngle = baseAngle + (dist / 150) * 0.65;
        outX[idx] = sunX + Math.cos(spiralAngle) * dist + (Math.random() - 0.5) * 14;
        outY[idx] = sunY + Math.sin(spiralAngle) * dist + (Math.random() - 0.5) * 14;
        outSize[idx] = 1.4 + Math.random() * 2.2;
        outColor[idx] = (Math.random() > 0.5) ? 1 : (Math.random() > 0.5 ? 3 : 0);
        outLayer[idx] = 1;
      }
      idx++;
    }

    // 2. Flowing S-Curves & River Strata (24,000)
    for (let i = 0; i < 24000; i++) {
      const progress = Math.random();
      const baseY = H * 0.06 + progress * (H * 0.88);
      const wave1 = Math.sin(progress * Math.PI * 3.2 + 0.3) * (W * 0.20);
      const wave2 = Math.cos(progress * Math.PI * 1.6 - 0.2) * (W * 0.09);
      const baseX = W * 0.50 + wave1 + wave2;

      const spread = (Math.random() - 0.5) * (W * 0.22);
      outX[idx] = Math.max(16, Math.min(W - 16, baseX + spread));
      outY[idx] = baseY + (Math.random() - 0.5) * 35;
      outSize[idx] = 1.3 + Math.random() * 2.8;
      outLayer[idx] = 2;

      const band = Math.floor(Math.abs(spread) / 28) % 7;
      let cVal = 0;
      if (band === 0) cVal = 0;
      else if (band === 1) cVal = 5;
      else if (band === 2) cVal = 2;
      else if (band === 3) cVal = 3;
      else if (band === 4) cVal = 1;
      else if (band === 5) cVal = 4;
      else cVal = 6;
      outColor[idx] = cVal;
      idx++;
    }

    // 3. Laterite Field (remaining)
    while (idx < N) {
      outX[idx] = Math.random() * W;
      outY[idx] = Math.random() * H;
      outSize[idx] = 1.0 + Math.random() * 2.2;
      outLayer[idx] = 3;
      const rand = Math.random();
      let cVal = 4;
      if (rand < 0.45) cVal = 4;
      else if (rand < 0.70) cVal = 2;
      else if (rand < 0.88) cVal = 6;
      else if (rand < 0.96) cVal = 3;
      else cVal = 5;
      outColor[idx] = cVal;
      idx++;
    }
  }

  // Topology 1: Intertwined Marine Currents & Laterite Fire Strata (The New Reference Image!)
  // Characterized by:
  // - Top right terracotta solar disc
  // - Interlocking diagonal currents of deep Arabian sea teal/aquamarine and fiery vermilion laterite
  // - Large bold circular pointillist drops (up to 14px) contrasting with fine stipple spray
  // - Swirling concentric vortex eddies in upper-left and lower-right
  buildTopology_IntertwinedMarineFire(outX, outY, outSize, outColor, outLayer) {
    const N = this.TOTAL_PARTICLES;
    const W = this.width;
    const H = this.height;
    const sunX = W * 0.80;
    const sunY = H * 0.16;
    let idx = 0;

    // 1. Terracotta Sun Disc & Halo (4,500)
    for (let i = 0; i < 4500; i++) {
      const r = Math.pow(Math.random(), 0.5) * (Math.min(W, H) * 0.08);
      const angle = Math.random() * Math.PI * 2;
      outX[idx] = sunX + Math.cos(angle) * r;
      outY[idx] = sunY + Math.sin(angle) * r;
      outSize[idx] = (Math.random() < 0.25) ? 4.5 + Math.random() * 4.0 : 1.8 + Math.random() * 2.2;
      outColor[idx] = (Math.random() < 0.6) ? 1 : (Math.random() < 0.5 ? 0 : 3);
      outLayer[idx] = 0;
      idx++;
    }

    // 2. Arabian Sea Oceanic Current (16,000)
    // Sweeps from upper right down across center to lower left in deep teal & silver foam
    for (let i = 0; i < 16000; i++) {
      const progress = Math.random();
      const baseY = H * 0.06 + progress * (H * 0.88);
      const wave = Math.sin(progress * Math.PI * 2.8 + 0.2) * (W * 0.21) + Math.cos(progress * Math.PI * 1.4) * (W * 0.08);
      const baseX = W * 0.50 + wave;

      const spread = (Math.random() - 0.5) * (W * 0.20);
      outX[idx] = Math.max(16, Math.min(W - 16, baseX + spread));
      outY[idx] = baseY + (Math.random() - 0.5) * 35;
      outLayer[idx] = 2;

      // Variable dot scales matching the reference painting: bold drops vs fine stipples
      const rScale = Math.random();
      if (rScale < 0.14) {
        outSize[idx] = 7.5 + Math.random() * 6.5;
      } else if (rScale < 0.48) {
        outSize[idx] = 3.6 + Math.random() * 3.2;
      } else {
        outSize[idx] = 1.4 + Math.random() * 1.8;
      }

      // Alternating oceanic teal, aquamarine, silver foam, and deep slate
      const band = Math.floor(Math.abs(spread) / 36) % 5;
      if (band === 0) outColor[idx] = 8;
      else if (band === 1) outColor[idx] = 10;
      else if (band === 2) outColor[idx] = 7;
      else if (band === 3) outColor[idx] = 9;
      else outColor[idx] = 11;
      idx++;
    }

    // 3. Laterite Fire Current (15,000)
    // Intertwines from upper left through center to lower right in fiery crimson & marigold
    for (let i = 0; i < 15000; i++) {
      const progress = Math.random();
      const baseY = H * 0.06 + progress * (H * 0.88);
      const wave = -Math.sin(progress * Math.PI * 2.8 + 0.4) * (W * 0.21) - Math.cos(progress * Math.PI * 1.4 - 0.3) * (W * 0.08);
      const baseX = W * 0.50 + wave;

      const spread = (Math.random() - 0.5) * (W * 0.20);
      outX[idx] = Math.max(16, Math.min(W - 16, baseX + spread));
      outY[idx] = baseY + (Math.random() - 0.5) * 35;
      outLayer[idx] = 2;

      const rScale = Math.random();
      if (rScale < 0.14) {
        outSize[idx] = 8.0 + Math.random() * 7.0;
      } else if (rScale < 0.48) {
        outSize[idx] = 3.6 + Math.random() * 3.4;
      } else {
        outSize[idx] = 1.5 + Math.random() * 1.8;
      }

      // Fiery vermilion, kashmiri chili, marigold, terracotta, and caramel
      const band = Math.floor(Math.abs(spread) / 36) % 5;
      if (band === 0) outColor[idx] = 1;
      else if (band === 1) outColor[idx] = 0;
      else if (band === 2) outColor[idx] = 2;
      else if (band === 3) outColor[idx] = 12;
      else outColor[idx] = 4;
      idx++;
    }

    // 4. Concentric Swirling Eddy Vortices (remaining particles)
    while (idx < N) {
      const isUpper = (idx % 2 === 0);
      const vcx = isUpper ? W * 0.20 : W * 0.80;
      const vcy = isUpper ? H * 0.22 : H * 0.78;
      const ring = Math.floor(Math.random() * 8);
      const r = 25 + ring * (Math.min(W, H) * 0.02) + (Math.random() - 0.5) * 10;
      const angle = Math.random() * Math.PI * 2;

      outX[idx] = vcx + Math.cos(angle) * r;
      outY[idx] = vcy + Math.sin(angle) * r;
      outSize[idx] = (Math.random() < 0.22) ? 6.5 + Math.random() * 5.0 : 1.8 + Math.random() * 2.4;
      outLayer[idx] = 2;
      outColor[idx] = isUpper ? ((ring % 2 === 0) ? 1 : 0) : ((ring % 2 === 0) ? 8 : 10);
      idx++;
    }
  }

  // Topology 2: Concentric Fort Aguada Beacon & Orbital Ripples
  buildTopology_AguadaBeaconVortex(outX, outY, outSize, outColor, outLayer) {
    const N = this.TOTAL_PARTICLES;
    const W = this.width;
    const H = this.height;
    const bx = W * 0.65;
    const by = H * 0.28;
    let idx = 0;

    // 16 Expanding Concentric Ripple Shells (32,000)
    for (let i = 0; i < 32000; i++) {
      const shell = Math.floor(Math.random() * 16);
      const r = 50 + Math.pow(shell / 16, 0.9) * 1150 + (Math.random() - 0.5) * 18;
      const angle = Math.random() * Math.PI * 2;

      outX[idx] = bx + Math.cos(angle) * r;
      outY[idx] = by + Math.sin(angle) * r;
      outSize[idx] = (shell % 3 === 0) ? 3.8 + Math.random() * 3.0 : 1.6 + Math.random() * 1.8;
      outLayer[idx] = 1;
      outColor[idx] = (shell % 2 === 0) ? 0 : (shell % 4 === 1 ? 5 : 2);
      idx++;
    }

    // 8 Spiral Celestial Ray Arms (remaining)
    while (idx < N) {
      const arm = Math.floor(Math.random() * 8);
      const baseAngle = (arm / 8) * Math.PI * 2;
      const dist = 100 + Math.random() * 1100;
      const spiralAngle = baseAngle + (dist / 1100) * 1.8;

      outX[idx] = bx + Math.cos(spiralAngle) * dist + (Math.random() - 0.5) * 25;
      outY[idx] = by + Math.sin(spiralAngle) * dist + (Math.random() - 0.5) * 25;
      outSize[idx] = 2.2 + Math.random() * 2.8;
      outLayer[idx] = 2;
      outColor[idx] = (Math.random() < 0.6) ? 1 : 0;
      idx++;
    }
  }

  // Topology 3: Dudhsagar Waterfall Plume & Horizontal Rainforest Terraces
  buildTopology_DudhsagarCascade(outX, outY, outSize, outColor, outLayer) {
    const N = this.TOTAL_PARTICLES;
    const W = this.width;
    const H = this.height;
    let idx = 0;

    // 1. Central Vertical Cascade Gorge (18,000)
    for (let i = 0; i < 18000; i++) {
      const y = Math.random() * (H * 0.48);
      const gorgeSpread = (Math.random() - 0.5) * (140 + (y / H) * 220);
      outX[idx] = W * 0.5 + gorgeSpread;
      outY[idx] = y;
      outSize[idx] = (Math.random() < 0.2) ? 4.5 + Math.random() * 3.5 : 1.5 + Math.random() * 2.0;
      outLayer[idx] = 2;
      outColor[idx] = (Math.random() < 0.4) ? 5 : (Math.random() < 0.5 ? 1 : 8); // White foam, aquamarine, emerald
      idx++;
    }

    // 2. Terraced Horizontal Crescent Pools at H*0.48, H*0.68, H*0.88 (16,000)
    for (let i = 0; i < 16000; i++) {
      const tier = Math.floor(Math.random() * 3);
      const tierBaseY = H * (0.50 + tier * 0.18);
      const span = (Math.random() - 0.5) * (W * 0.85);
      const arc = Math.pow(span / (W * 0.42), 2) * 90;

      outX[idx] = W * 0.5 + span;
      outY[idx] = tierBaseY + arc + (Math.random() - 0.5) * 35;
      outSize[idx] = (Math.random() < 0.15) ? 5.5 + Math.random() * 4.0 : 1.8 + Math.random() * 2.4;
      outLayer[idx] = 2;
      outColor[idx] = (tier === 0) ? 1 : (tier === 1 ? 8 : 2);
      idx++;
    }

    // 3. Surrounding Western Ghats Foliage Spray (remaining)
    while (idx < N) {
      outX[idx] = Math.random() * W;
      outY[idx] = Math.random() * H;
      outSize[idx] = 1.0 + Math.random() * 2.2;
      outLayer[idx] = 3;
      outColor[idx] = (Math.random() < 0.4) ? 8 : 4; // Emerald & deep umber
      idx++;
    }
  }

  // Topology 4: Fontainhas Latin Polychrome & Archways
  buildTopology_FontainhasMosaic(outX, outY, outSize, outColor, outLayer) {
    const N = this.TOTAL_PARTICLES;
    const W = this.width;
    const H = this.height;
    let idx = 0;

    // 3 Nested Portuguese Archway Ribbons (26,000)
    for (let i = 0; i < 26000; i++) {
      const arch = Math.floor(Math.random() * 3);
      const progress = Math.random();
      const angle = progress * Math.PI;
      const radX = (W * 0.38) + arch * 70;
      const radY = (H * 0.28) + arch * 60;
      const centerY = H * (0.35 + arch * 0.22);

      outX[idx] = W * 0.5 + Math.cos(angle) * radX + (Math.random() - 0.5) * 38;
      outY[idx] = centerY - Math.sin(angle) * radY + (Math.random() - 0.5) * 38;
      outSize[idx] = (Math.random() < 0.18) ? 5.0 + Math.random() * 4.0 : 1.8 + Math.random() * 2.2;
      outLayer[idx] = 2;
      // Vibrant polychrome: indigo, yellow, magenta, coral
      outColor[idx] = (arch === 0) ? 0 : (arch === 1 ? 11 : 7);
      idx++;
    }

    // Mosaic Rosettes & Stippling (remaining)
    while (idx < N) {
      outX[idx] = Math.random() * W;
      outY[idx] = Math.random() * H;
      outSize[idx] = 1.2 + Math.random() * 2.4;
      outLayer[idx] = 3;
      outColor[idx] = (Math.random() < 0.3) ? 10 : (Math.random() < 0.5 ? 3 : 5);
      idx++;
    }
  }

  // Topology 5: Palolem Crescent Bay & Harmonic Tidal Swells
  buildTopology_PalolemCrescent(outX, outY, outSize, outColor, outLayer) {
    const N = this.TOTAL_PARTICLES;
    const W = this.width;
    const H = this.height;
    let idx = 0;

    // 28,000 Crescent Coastal Arc Waves
    for (let i = 0; i < 28000; i++) {
      const progress = Math.random();
      const angle = (0.15 + progress * 0.95) * Math.PI;
      const baseRadius = W * 0.58;
      const spread = (Math.random() - 0.5) * 160;
      const r = baseRadius + spread;

      outX[idx] = W * 0.85 - Math.sin(angle) * r;
      outY[idx] = H * 0.42 + Math.cos(angle) * (r * 0.82) + (Math.random() - 0.5) * 35;
      outSize[idx] = (Math.random() < 0.16) ? 5.5 + Math.random() * 4.5 : 1.6 + Math.random() * 2.2;
      outLayer[idx] = 2;
      const band = Math.floor(Math.abs(spread) / 28) % 4;
      outColor[idx] = (band === 0) ? 8 : (band === 1 ? 9 : (band === 2 ? 7 : 10));
      idx++;
    }

    // 14,000 Golden Sand Stipples
    while (idx < N) {
      outX[idx] = Math.random() * W;
      outY[idx] = Math.random() * H;
      outSize[idx] = 1.2 + Math.random() * 2.2;
      outLayer[idx] = 3;
      outColor[idx] = (Math.random() < 0.5) ? 0 : (Math.random() < 0.4 ? 1 : 5);
      idx++;
    }
  }

  // Topology 6: Chapora Clifftop Ridge & Western Sea Winds
  buildTopology_ChaporaRidge(outX, outY, outSize, outColor, outLayer) {
    const N = this.TOTAL_PARTICLES;
    const W = this.width;
    const H = this.height;
    let idx = 0;

    // 26,000 High Clifftop Contour Ridge & Windstream
    for (let i = 0; i < 26000; i++) {
      const progress = Math.random();
      const baseX = progress * W;
      const ridgeY = H * 0.38 + Math.sin(progress * Math.PI * 4.0) * 85 + Math.cos(progress * Math.PI * 1.8) * 60;
      const spread = (Math.random() - 0.5) * 180;

      outX[idx] = baseX + (Math.random() - 0.5) * 45;
      outY[idx] = ridgeY + spread;
      outSize[idx] = (Math.random() < 0.18) ? 6.0 + Math.random() * 5.0 : 1.6 + Math.random() * 2.4;
      outLayer[idx] = 2;
      outColor[idx] = (spread < 0) ? ((Math.random() < 0.5) ? 2 : 0) : ((Math.random() < 0.5) ? 3 : 12);
      idx++;
    }

    // 16,000 Steep Coastal Drop-off Aerosol Spray
    while (idx < N) {
      outX[idx] = Math.random() * W;
      outY[idx] = H * 0.45 + Math.random() * (H * 0.55);
      outSize[idx] = 1.2 + Math.random() * 2.0;
      outLayer[idx] = 3;
      outColor[idx] = (Math.random() < 0.4) ? 4 : (Math.random() < 0.5 ? 6 : 8);
      idx++;
    }
  }

  // Topology 7: Wood-Fired Goan Poi Bread & Baker Hearth
  buildTopology_PoiBread(outX, outY, outSize, outColor, outLayer) {
    const N = this.TOTAL_PARTICLES;
    const W = this.width;
    const H = this.height;
    let idx = 0;

    const poiCenterX = W * 0.5;
    const poiCenterY = H * 0.44;
    const rx = W * 0.36;
    const ry = H * 0.21;

    // 1. Puffed Poi Crust & Aeration Pocket Slit (24,000 particles)
    for (let i = 0; i < 24000; i++) {
      const isSlit = (i < 5000);
      if (isSlit) {
        // Horizontal crescent slash across the belly of the bread
        const t = (Math.random() - 0.5) * 2; // -1 to 1
        const slitX = poiCenterX + t * (rx * 0.78);
        const slitY = poiCenterY + Math.sin((t + 1) * Math.PI * 0.5) * 22 + (Math.random() - 0.5) * 16;
        outX[idx] = slitX + (Math.random() - 0.5) * 10;
        outY[idx] = slitY;
        outSize[idx] = 1.4 + Math.random() * 2.2;
        outLayer[idx] = 2;
        outColor[idx] = (Math.random() < 0.6) ? 5 : 0; // Ivory flour dusted slash
      } else {
        // Puffed elliptical body with darker toasted top crust and golden edges
        const angle = Math.random() * Math.PI * 2;
        const dist = Math.pow(Math.random(), 0.65);
        const px = poiCenterX + Math.cos(angle) * (rx * dist);
        const py = poiCenterY + Math.sin(angle) * (ry * dist) * (1.0 + Math.sin(angle) * 0.12);

        outX[idx] = px + (Math.random() - 0.5) * 14;
        outY[idx] = py + (Math.random() - 0.5) * 14;
        outSize[idx] = (Math.random() < 0.18) ? 5.2 + Math.random() * 3.8 : 1.7 + Math.random() * 2.2;
        outLayer[idx] = 2;

        // Color gradation: rim is toasted crust (3/4/2), top is golden (0/1), center is flour dusted (5)
        if (dist > 0.82) {
          outColor[idx] = (Math.random() < 0.5) ? 4 : (Math.random() < 0.5 ? 2 : 3); // Toasted crust brown
        } else if (dist > 0.5) {
          outColor[idx] = (Math.random() < 0.5) ? 1 : (Math.random() < 0.5 ? 9 : 3); // Golden baked dough
        } else {
          outColor[idx] = (Math.random() < 0.55) ? 5 : (Math.random() < 0.5 ? 0 : 8); // Soft flour dust interior
        }
      }
      idx++;
    }

    // 2. Wood-Fired Brick Oven Hearth Arch & Glowing Embers (9,000 particles)
    for (let i = 0; i < 9000; i++) {
      const archAngle = (0.05 + Math.random() * 0.90) * Math.PI;
      const archR = W * 0.44 + (Math.random() - 0.5) * 45;
      const ax = W * 0.5 + Math.cos(archAngle) * archR;
      const ay = H * 0.72 - Math.sin(archAngle) * (H * 0.36) + (Math.random() - 0.5) * 25;

      outX[idx] = ax;
      outY[idx] = ay;
      outSize[idx] = (Math.random() < 0.15) ? 5.0 + Math.random() * 3.5 : 1.5 + Math.random() * 2.0;
      outLayer[idx] = 1;
      outColor[idx] = (ay > H * 0.62) ? ((Math.random() < 0.4) ? 7 : 2) : ((Math.random() < 0.5) ? 4 : 6); // Hearth ember & clay
      idx++;
    }

    // 3. Floating Airborne Flour Dust Ivory Stipples (9,000 particles)
    while (idx < N) {
      outX[idx] = Math.random() * W;
      outY[idx] = Math.random() * H;
      outSize[idx] = 1.0 + Math.random() * 2.0;
      outLayer[idx] = 3;
      outColor[idx] = (Math.random() < 0.75) ? 5 : (Math.random() < 0.5 ? 0 : 8); // Fine flour dust ivory
      idx++;
    }
  }

  // Topology 8: Cumbarjua Mangrove Estuary & Braided Waterways
  buildTopology_MangroveEstuary(outX, outY, outSize, outColor, outLayer) {
    const N = this.TOTAL_PARTICLES;
    const W = this.width;
    const H = this.height;
    let idx = 0;

    // 30,000 Dendritic Braided Channels & Root Tendrils
    for (let i = 0; i < 30000; i++) {
      const channel = Math.floor(Math.random() * 4);
      const progress = Math.random();
      const baseY = progress * H;
      const branchX = W * (0.22 + channel * 0.20) + Math.sin(progress * Math.PI * 3.2 + channel) * 110;
      const spread = (Math.random() - 0.5) * 120;

      outX[idx] = branchX + spread;
      outY[idx] = baseY + (Math.random() - 0.5) * 35;
      outSize[idx] = (Math.random() < 0.16) ? 6.0 + Math.random() * 4.5 : 1.7 + Math.random() * 2.2;
      outLayer[idx] = 2;
      outColor[idx] = (channel % 2 === 0) ? ((spread < 0) ? 8 : 7) : ((spread < 0) ? 11 : 4);
      idx++;
    }

    // 12,000 Silt Mud Banks
    while (idx < N) {
      outX[idx] = Math.random() * W;
      outY[idx] = Math.random() * H;
      outSize[idx] = 1.2 + Math.random() * 2.0;
      outLayer[idx] = 3;
      outColor[idx] = (Math.random() < 0.5) ? 6 : (Math.random() < 0.5 ? 4 : 2);
      idx++;
    }
  }

  // Topology 9: Susegad Celestial Nebula & Twilight Drift
  buildTopology_SusegadNebula(outX, outY, outSize, outColor, outLayer) {
    const N = this.TOTAL_PARTICLES;
    const W = this.width;
    const H = this.height;
    let idx = 0;

    // 34,000 Elliptical Cosmic Cloud with Harmonic Nodes
    for (let i = 0; i < 34000; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radX = Math.pow(Math.random(), 0.6) * (W * 0.46);
      const radY = Math.pow(Math.random(), 0.6) * (H * 0.38);

      outX[idx] = W * 0.5 + Math.cos(angle) * radX + (Math.random() - 0.5) * 30;
      outY[idx] = H * 0.48 + Math.sin(angle) * radY + (Math.random() - 0.5) * 30;
      outSize[idx] = (Math.random() < 0.20) ? 5.0 + Math.random() * 4.0 : 1.6 + Math.random() * 2.4;
      outLayer[idx] = 2;
      outColor[idx] = (Math.random() < 0.35) ? 0 : (Math.random() < 0.4 ? 5 : (Math.random() < 0.5 ? 10 : 1));
      idx++;
    }

    // 8,000 Slow Ambient Stipples
    while (idx < N) {
      outX[idx] = Math.random() * W;
      outY[idx] = Math.random() * H;
      outSize[idx] = 1.0 + Math.random() * 1.8;
      outLayer[idx] = 3;
      outColor[idx] = (Math.random() < 0.6) ? 5 : 0;
      idx++;
    }
  }

  // Topology 10: Bebinca Seven-Layer Caramel Culinary Strata
  buildTopology_BebincaStrata(outX, outY, outSize, outColor, outLayer) {
    const N = this.TOTAL_PARTICLES;
    const W = this.width;
    const H = this.height;
    let idx = 0;

    // 34,000 Seven Horizontal Undulating Strata Tiers
    const tierColors = [0, 4, 1, 5, 2, 4, 0];
    for (let i = 0; i < 34000; i++) {
      const tier = Math.floor(Math.random() * 7);
      const baseY = H * (0.16 + tier * 0.10);
      const x = Math.random() * W;
      const wave = Math.sin(x * 0.012 + tier * 0.85) * 26 + Math.cos(x * 0.005 - tier) * 16;

      outX[idx] = x;
      outY[idx] = baseY + wave + (Math.random() - 0.5) * 36;
      outSize[idx] = (Math.random() < 0.18) ? 6.5 + Math.random() * 5.0 : 1.8 + Math.random() * 2.2;
      outLayer[idx] = 2;
      outColor[idx] = tierColors[tier];
      idx++;
    }

    // 8,000 Flour & Jaggery Dusting Speckles
    while (idx < N) {
      outX[idx] = Math.random() * W;
      outY[idx] = Math.random() * H;
      outSize[idx] = 1.2 + Math.random() * 2.0;
      outLayer[idx] = 3;
      outColor[idx] = (Math.random() < 0.6) ? 5 : 4;
      idx++;
    }
  }

  // Topology 11: Mandovi River Sailboat & Fluvial Wake Currents
  buildTopology_MandoviBoat(outX, outY, outSize, outColor, outLayer) {
    const N = this.TOTAL_PARTICLES;
    const W = this.width;
    const H = this.height;
    let idx = 0;

    const boatCx = W * 0.48;
    const boatCy = H * 0.58;

    // 1. Sleek Wooden Riverboat Hull & Keel (14,000 particles)
    for (let i = 0; i < 14000; i++) {
      const t = (Math.random() - 0.5) * 2;
      const hullLen = W * 0.38;
      const hx = boatCx + t * hullLen;
      const sheerCurve = Math.pow(Math.abs(t), 1.8) * 45;
      const hy = boatCy + sheerCurve + (Math.random() * 28 - 14);

      outX[idx] = hx + (Math.random() - 0.5) * 8;
      outY[idx] = hy;
      outSize[idx] = (Math.random() < 0.2) ? 5.5 + Math.random() * 3.5 : 1.7 + Math.random() * 2.2;
      outLayer[idx] = 2;
      outColor[idx] = (t > 0.4) ? ((Math.random() < 0.5) ? 2 : 4) : ((Math.random() < 0.5) ? 6 : 13);
      idx++;
    }

    // 2. Tall Mast & Billowing Triangular Solar Sails (16,000 particles)
    const mastTopY = H * 0.18;
    const mastBaseY = boatCy - 8;

    for (let i = 0; i < 16000; i++) {
      if (i < 2500) {
        const my = mastTopY + Math.random() * (mastBaseY - mastTopY);
        outX[idx] = boatCx - W * 0.04 + (Math.random() - 0.5) * 6;
        outY[idx] = my;
        outSize[idx] = 2.2 + Math.random() * 2.0;
        outLayer[idx] = 1;
        outColor[idx] = 0;
      } else if (i < 10500) {
        const progress = Math.random();
        const sy = mastTopY + progress * (mastBaseY - mastTopY);
        const maxSailW = W * 0.34 * Math.sin(progress * Math.PI * 0.85);
        const sailDist = Math.random();
        const sx = (boatCx - W * 0.04) + sailDist * maxSailW + Math.sin(sailDist * Math.PI) * 18;

        outX[idx] = sx + (Math.random() - 0.5) * 10;
        outY[idx] = sy + (Math.random() - 0.5) * 8;
        outSize[idx] = (Math.random() < 0.18) ? 4.8 + Math.random() * 3.4 : 1.6 + Math.random() * 2.0;
        outLayer[idx] = 2;
        outColor[idx] = (sailDist > 0.7) ? 5 : ((Math.random() < 0.6) ? 0 : 8);
      } else {
        const progress = Math.random();
        const jy = mastTopY + progress * (mastBaseY - mastTopY);
        const maxJibW = W * 0.22 * Math.sin(progress * Math.PI * 0.75);
        const jDist = Math.random();
        const jx = (boatCx - W * 0.04) - jDist * maxJibW;

        outX[idx] = jx + (Math.random() - 0.5) * 8;
        outY[idx] = jy + (Math.random() - 0.5) * 8;
        outSize[idx] = 1.5 + Math.random() * 2.0;
        outLayer[idx] = 2;
        outColor[idx] = (Math.random() < 0.5) ? 5 : 0;
      }
      idx++;
    }

    // 3. Diverging Kelvin Wake Waves & River Currents (12,000 particles)
    for (let i = 0; i < 12000; i++) {
      const arm = (i % 2 === 0) ? -1 : 1;
      const progress = Math.random();
      const wakeAngle = progress * Math.PI * 2.5;
      const spreadY = progress * H * 0.32;
      const wy = boatCy + 25 + spreadY + Math.sin(wakeAngle) * 14;
      const wx = boatCx + arm * (progress * W * 0.44) + Math.cos(wakeAngle) * 22;

      outX[idx] = wx + (Math.random() - 0.5) * 18;
      outY[idx] = wy;
      outSize[idx] = (Math.random() < 0.16) ? 5.2 + Math.random() * 4.0 : 1.5 + Math.random() * 2.2;
      outLayer[idx] = 1;
      outColor[idx] = (progress < 0.3) ? 5 : ((arm > 0) ? 1 : 10);
      idx++;
    }
  }

  // Topology 18: Goan Cashew Apple & Curved Kidney Nut
  buildTopology_GoanCashew(outX, outY, outSize, outColor, outLayer) {
    const N = this.TOTAL_PARTICLES;
    const W = this.width;
    const H = this.height;
    let idx = 0;

    const appleCenterX = W * 0.5;
    const appleCenterY = H * 0.40;

    // 1. Luscious Pear/Bell-Shaped Cashew Apple (24,000 particles)
    for (let i = 0; i < 24000; i++) {
      const t = Math.random();
      const baseRx = W * (0.12 + Math.sin(t * Math.PI * 0.85) * 0.22);
      const angle = Math.random() * Math.PI * 2;
      const dist = Math.pow(Math.random(), 0.62);

      const px = appleCenterX + Math.cos(angle) * (baseRx * dist);
      const py = appleCenterY + (t - 0.45) * (H * 0.42);

      outX[idx] = px + (Math.random() - 0.5) * 12;
      outY[idx] = py + (Math.random() - 0.5) * 12;
      outSize[idx] = (Math.random() < 0.20) ? 5.8 + Math.random() * 4.2 : 1.7 + Math.random() * 2.2;
      outLayer[idx] = 2;

      // Color gradation: sunny gold at top/center, vibrant ruby vermilion/laterite at bottom/edges
      if (t > 0.65 || dist > 0.80) {
        outColor[idx] = (Math.random() < 0.5) ? 7 : (Math.random() < 0.5 ? 12 : 2); // Ripe vermilion kaju
      } else if (t > 0.35) {
        outColor[idx] = (Math.random() < 0.5) ? 1 : (Math.random() < 0.5 ? 8 : 3); // Molten amber & terracotta
      } else {
        outColor[idx] = (Math.random() < 0.6) ? 0 : (Math.random() < 0.4 ? 8 : 5); // Golden yellow top
      }
      idx++;
    }

    // 2. Signature Curved Kidney Cashew Nut (Caju Biyo) at bottom (9,000 particles)
    const nutCenterX = W * 0.51;
    const nutCenterY = H * 0.67;
    const nutR = W * 0.14;

    for (let i = 0; i < 9000; i++) {
      const theta = (0.05 + Math.random() * 0.90) * Math.PI * 2;
      const notch = 1.0 - 0.35 * Math.sin(theta);
      const rad = nutR * (0.65 + Math.random() * 0.45) * notch;

      const nx = nutCenterX + Math.cos(theta) * (rad * 1.15);
      const ny = nutCenterY + Math.sin(theta) * rad;

      outX[idx] = nx + (Math.random() - 0.5) * 8;
      outY[idx] = ny + (Math.random() - 0.5) * 8;
      outSize[idx] = (Math.random() < 0.16) ? 4.8 + Math.random() * 3.2 : 1.6 + Math.random() * 2.0;
      outLayer[idx] = 2;
      outColor[idx] = (Math.random() < 0.45) ? 4 : (Math.random() < 0.4 ? 6 : (Math.random() < 0.5 ? 13 : 5));
      idx++;
    }

    // 3. Orchard Canopy, Stem & Aromatic Distillation Mist (9,000 particles)
    for (let i = 0; i < 9000; i++) {
      if (i < 3000) {
        const leafAngle = (Math.random() < 0.5) ? (0.75 + Math.random() * 0.4) * Math.PI : (-0.15 + Math.random() * 0.4) * Math.PI;
        const leafDist = Math.random() * (W * 0.28);
        outX[idx] = appleCenterX + Math.cos(leafAngle) * leafDist + (Math.random() - 0.5) * 16;
        outY[idx] = H * 0.20 + Math.sin(leafAngle) * (leafDist * 0.5) + (Math.random() - 0.5) * 14;
        outSize[idx] = 1.5 + Math.random() * 2.2;
        outLayer[idx] = 1;
        outColor[idx] = (Math.random() < 0.5) ? 3 : (Math.random() < 0.5 ? 9 : 0);
      } else {
        outX[idx] = Math.random() * W;
        outY[idx] = Math.random() * H;
        outSize[idx] = 1.0 + Math.random() * 1.8;
        outLayer[idx] = 3;
        outColor[idx] = (Math.random() < 0.5) ? 0 : (Math.random() < 0.4 ? 8 : 5);
      }
      idx++;
    }
  }

  // Topology 12: Morjim Olive Ridley Nesting Swell & Ocean Drift
  buildTopology_TurtleSwell(outX, outY, outSize, outColor, outLayer) {
    const N = this.TOTAL_PARTICLES;
    const W = this.width;
    const H = this.height;
    let idx = 0;

    // 30,000 Expansive Rhythmic Flipper Stroke Wave Arcs
    for (let i = 0; i < 30000; i++) {
      const arc = Math.floor(Math.random() * 5);
      const angle = (0.2 + Math.random() * 1.6) * Math.PI;
      const radX = (180 + arc * 130) * 1.1;
      const radY = (130 + arc * 95) * 1.1;

      outX[idx] = W * 0.5 + Math.cos(angle) * radX + (Math.random() - 0.5) * 40;
      outY[idx] = H * 0.52 + Math.sin(angle) * radY + (Math.random() - 0.5) * 40;
      outSize[idx] = (Math.random() < 0.16) ? 6.0 + Math.random() * 5.0 : 1.7 + Math.random() * 2.2;
      outLayer[idx] = 2;
      outColor[idx] = (arc % 2 === 0) ? 8 : (arc === 1 ? 9 : (arc === 3 ? 10 : 7));
      idx++;
    }

    // 12,000 Deep Bioluminescent Night Currents
    while (idx < N) {
      outX[idx] = Math.random() * W;
      outY[idx] = Math.random() * H;
      outSize[idx] = 1.2 + Math.random() * 2.0;
      outLayer[idx] = 3;
      outColor[idx] = (Math.random() < 0.6) ? 11 : 7;
      idx++;
    }
  }

  // Topology 13: Zuari Railway Bridge & Industrial Horizon Strata
  buildTopology_ZuariTruss(outX, outY, outSize, outColor, outLayer) {
    const N = this.TOTAL_PARTICLES;
    const W = this.width;
    const H = this.height;
    let idx = 0;

    // 28,000 Triangular Structural Truss Lattice Lines
    for (let i = 0; i < 28000; i++) {
      const progress = Math.random();
      const x = progress * W;
      const trussY = H * 0.44 + Math.abs(Math.sin(progress * Math.PI * 6.0)) * 130;

      outX[idx] = x + (Math.random() - 0.5) * 24;
      outY[idx] = trussY + (Math.random() - 0.5) * 24;
      outSize[idx] = (Math.random() < 0.16) ? 5.5 + Math.random() * 4.0 : 1.8 + Math.random() * 2.0;
      outLayer[idx] = 2;
      outColor[idx] = (Math.random() < 0.4) ? 2 : (Math.random() < 0.4 ? 0 : 3);
      idx++;
    }

    // 14,000 Crossing River Water Strata
    while (idx < N) {
      outX[idx] = Math.random() * W;
      outY[idx] = H * 0.48 + Math.random() * (H * 0.50);
      outSize[idx] = 1.4 + Math.random() * 2.2;
      outLayer[idx] = 3;
      outColor[idx] = (Math.random() < 0.5) ? 7 : 8;
      idx++;
    }
  }

  // Topology 14: Goa Carnival Samba Corona & Chromatic Confetti
  buildTopology_CarnivalCorona(outX, outY, outSize, outColor, outLayer) {
    const N = this.TOTAL_PARTICLES;
    const W = this.width;
    const H = this.height;
    const cx = W * 0.5;
    const cy = H * 0.48;
    let idx = 0;

    // 30,000 Radial Starburst Corona & 12 Serpentine Spiral Arms
    for (let i = 0; i < 30000; i++) {
      const arm = Math.floor(Math.random() * 12);
      const r = 50 + Math.pow(Math.random(), 0.75) * (W * 0.50);
      const angle = (arm / 12) * Math.PI * 2 + (r / 500) * 2.4;

      outX[idx] = cx + Math.cos(angle) * r + (Math.random() - 0.5) * 32;
      outY[idx] = cy + Math.sin(angle) * r + (Math.random() - 0.5) * 32;
      outSize[idx] = (Math.random() < 0.22) ? 6.5 + Math.random() * 5.5 : 1.8 + Math.random() * 2.4;
      outLayer[idx] = 2;
      const cSet = [0, 1, 8, 12, 10, 5, 11];
      outColor[idx] = cSet[Math.floor(Math.random() * cSet.length)];
      idx++;
    }

    // 12,000 Festive Confetti Stipples
    while (idx < N) {
      outX[idx] = Math.random() * W;
      outY[idx] = Math.random() * H;
      outSize[idx] = 1.4 + Math.random() * 2.8;
      outLayer[idx] = 3;
      outColor[idx] = (Math.random() < 0.5) ? 0 : 12;
      idx++;
    }
  }

  // Topology 15: Chorao Bird Sanctuary & Kingfisher Flight Vectors
  buildTopology_KingfisherVectors(outX, outY, outSize, outColor, outLayer) {
    const N = this.TOTAL_PARTICLES;
    const W = this.width;
    const H = this.height;
    let idx = 0;

    // 30,000 Aerodynamic Curved Vector Plumes
    for (let i = 0; i < 30000; i++) {
      const plume = Math.floor(Math.random() * 4);
      const progress = Math.random();
      const px = W * (0.18 + plume * 0.22);
      const py = H * (0.22 + plume * 0.18);
      const angle = (0.2 + progress * 0.8) * Math.PI * 2;
      const r = 40 + Math.pow(progress, 0.7) * 260;

      outX[idx] = px + Math.cos(angle) * r + (Math.random() - 0.5) * 36;
      outY[idx] = py + Math.sin(angle) * (r * 1.4) + (Math.random() - 0.5) * 36;
      outSize[idx] = (Math.random() < 0.18) ? 6.0 + Math.random() * 4.5 : 1.8 + Math.random() * 2.2;
      outLayer[idx] = 2;
      outColor[idx] = (Math.random() < 0.45) ? 8 : (Math.random() < 0.4 ? 11 : 1);
      idx++;
    }

    // 12,000 Dense Canopy Foliage
    while (idx < N) {
      outX[idx] = Math.random() * W;
      outY[idx] = Math.random() * H;
      outSize[idx] = 1.2 + Math.random() * 2.0;
      outLayer[idx] = 3;
      outColor[idx] = (Math.random() < 0.6) ? 7 : 4;
      idx++;
    }
  }

  // Topology 16: Anjuna Flea Market Kaleidoscope & Mandala Vortex
  buildTopology_MandalaVortex(outX, outY, outSize, outColor, outLayer) {
    const N = this.TOTAL_PARTICLES;
    const W = this.width;
    const H = this.height;
    const cx = W * 0.5;
    const cy = H * 0.48;
    let idx = 0;

    // 32,000 Octagonal Sacred Mandala Rings
    for (let i = 0; i < 32000; i++) {
      const ring = Math.floor(Math.random() * 8);
      const oct = Math.floor(Math.random() * 8);
      const baseAngle = (oct / 8) * Math.PI * 2;
      const angle = baseAngle + (Math.random() - 0.5) * 0.35;
      const r = 60 + ring * 82 + (Math.random() - 0.5) * 16;

      outX[idx] = cx + Math.cos(angle) * r;
      outY[idx] = cy + Math.sin(angle) * r;
      outSize[idx] = (ring % 2 === 0) ? 4.8 + Math.random() * 3.8 : 1.8 + Math.random() * 2.0;
      outLayer[idx] = 2;
      outColor[idx] = (ring % 2 === 0) ? 0 : (ring % 4 === 1 ? 2 : 5);
      idx++;
    }

    // 10,000 Bohemian Kaleidoscope Stipples
    while (idx < N) {
      outX[idx] = Math.random() * W;
      outY[idx] = Math.random() * H;
      outSize[idx] = 1.3 + Math.random() * 2.2;
      outLayer[idx] = 3;
      outColor[idx] = (Math.random() < 0.35) ? 10 : (Math.random() < 0.5 ? 1 : 5);
      idx++;
    }
  }

  // Topology 17: Divar Island Monsoon Puddle Ripples & Rain Columns
  buildTopology_MonsoonRipples(outX, outY, outSize, outColor, outLayer) {
    const N = this.TOTAL_PARTICLES;
    const W = this.width;
    const H = this.height;
    let idx = 0;

    // 24,000 Six Localized Concentric Impact Puddle Ripples
    const puddles = [
      [0.25, 0.45], [0.72, 0.40], [0.38, 0.65],
      [0.82, 0.70], [0.28, 0.85], [0.65, 0.88]
    ];
    for (let i = 0; i < 24000; i++) {
      const pIdx = Math.floor(Math.random() * 6);
      const px = puddles[pIdx][0] * W;
      const py = puddles[pIdx][1] * H;
      const ring = Math.floor(Math.random() * 6);
      const r = 25 + ring * 24 + (Math.random() - 0.5) * 8;
      const angle = Math.random() * Math.PI * 2;

      outX[idx] = px + Math.cos(angle) * r;
      outY[idx] = py + Math.sin(angle) * (r * 0.75);
      outSize[idx] = (ring % 2 === 0) ? 4.8 + Math.random() * 3.5 : 1.8 + Math.random() * 2.0;
      outLayer[idx] = 2;
      outColor[idx] = (ring % 2 === 0) ? 8 : (ring === 1 ? 10 : 7);
      idx++;
    }

    // 18,000 Vertical Falling Monsoon Rain Shafts
    while (idx < N) {
      outX[idx] = Math.random() * W;
      outY[idx] = Math.random() * H;
      outSize[idx] = 1.2 + Math.random() * 2.2;
      outLayer[idx] = 3;
      outColor[idx] = (Math.random() < 0.5) ? 5 : 8;
      idx++;
    }
  }

  // Topology 18: Spice Plantation Vanilla & Black Pepper Spiral Tendrils
  buildTopology_SpiceSpirals(outX, outY, outSize, outColor, outLayer) {
    const N = this.TOTAL_PARTICLES;
    const W = this.width;
    const H = this.height;
    let idx = 0;

    // 30,000 Climbing Fibonacci Double Spirals
    for (let i = 0; i < 30000; i++) {
      const sign = (i % 2 === 0) ? 1 : -1;
      const theta = Math.random() * Math.PI * 8.0;
      const r = 35 + Math.pow(theta, 1.15) * 30;

      outX[idx] = W * 0.5 + sign * Math.cos(theta) * (r * 0.62) + (Math.random() - 0.5) * 35;
      outY[idx] = H * 0.90 - theta * (H * 0.034) + (Math.random() - 0.5) * 35;
      outSize[idx] = (Math.random() < 0.18) ? 6.0 + Math.random() * 4.5 : 1.8 + Math.random() * 2.2;
      outLayer[idx] = 2;
      outColor[idx] = (Math.random() < 0.4) ? 0 : (Math.random() < 0.4 ? 2 : 4);
      idx++;
    }

    // 12,000 Aromatic Terroir Stipples
    while (idx < N) {
      outX[idx] = Math.random() * W;
      outY[idx] = Math.random() * H;
      outSize[idx] = 1.3 + Math.random() * 2.2;
      outLayer[idx] = 3;
      outColor[idx] = (Math.random() < 0.5) ? 6 : 3;
      idx++;
    }
  }

  // Topology 19: Cabo de Rama Sunset Horizon & Golden Hour Thermals
  buildTopology_SunsetThermals(outX, outY, outSize, outColor, outLayer) {
    const N = this.TOTAL_PARTICLES;
    const W = this.width;
    const H = this.height;
    const sunX = W * 0.5;
    const sunY = H * 0.74;
    let idx = 0;

    // 14,000 Low Radiant Solar Hearth
    for (let i = 0; i < 14000; i++) {
      const r = Math.pow(Math.random(), 0.5) * (W * 0.32);
      const angle = Math.random() * Math.PI * 2;
      outX[idx] = sunX + Math.cos(angle) * r;
      outY[idx] = sunY + Math.sin(angle) * (r * 0.75);
      outSize[idx] = (Math.random() < 0.24) ? 6.5 + Math.random() * 5.0 : 2.0 + Math.random() * 2.4;
      outLayer[idx] = 0;
      outColor[idx] = (Math.random() < 0.6) ? 0 : 1;
      idx++;
    }

    // 28,000 Rising Curved Convective Thermal Plumes
    while (idx < N) {
      const progress = Math.random();
      const plume = Math.floor(Math.random() * 5);
      const x = W * (0.15 + plume * 0.18) + Math.sin(progress * Math.PI * 2.5) * 60;
      const y = sunY - progress * (H * 0.68);

      outX[idx] = x + (Math.random() - 0.5) * 36;
      outY[idx] = y + (Math.random() - 0.5) * 36;
      outSize[idx] = (Math.random() < 0.16) ? 5.0 + Math.random() * 4.0 : 1.6 + Math.random() * 2.0;
      outLayer[idx] = 2;
      outColor[idx] = (progress < 0.4) ? 2 : (progress < 0.7 ? 10 : 5);
      idx++;
    }
  }

  // Cinematic 3.5s fluid morph into any designated mutation topology!
  morphToTopology(topologyIndex, durationSec = 3.4) {
    console.log(`[ArtworkEngine] Morphing to Mutation Topology #${topologyIndex}...`);
    this.generateTopology(
      topologyIndex,
      this.morphTargetX,
      this.morphTargetY,
      this.morphTargetSize,
      this.morphTargetColor,
      this.morphTargetLayer
    );

    this.morphStartX.set(this.px);
    this.morphStartY.set(this.py);
    this.morphStartSize.set(this.size);

    this.isMorphing = true;
    this.morphProgress = 0.0;
    this.morphDuration = durationSec;
    this.currentTopology = topologyIndex;

    // Trigger an expansive shockwave to celebrate the mutation
    this.shockwaves.push({
      x: this.width * 0.5,
      y: this.height * 0.5,
      radius: 0,
      maxRadius: Math.hypot(this.width, this.height),
      speed: 34,
      colorIdx: 0,
      rgb: [255, 215, 0],
      thickness: 220,
      intensity: 1.0
    });
  }

  // Load authentic pre-extracted seed points extracted from goa_abstract.png
  loadSeedPoints(seedData) {
    if (!seedData) return;
    const rawPoints = seedData.seed1 || seedData.points || [];
    if (!rawPoints.length) return;

    this.seedPoints = rawPoints;
    const count = Math.min(rawPoints.length, 12000);

    for (let i = 0; i < count; i++) {
      const pt = rawPoints[i];
      const targetIdx = 9000 + i;
      if (targetIdx < this.TOTAL_PARTICLES) {
        this.hx[targetIdx] = pt[0] * this.width;
        this.hy[targetIdx] = pt[1] * this.height;
        this.px[targetIdx] = this.hx[targetIdx];
        this.py[targetIdx] = this.hy[targetIdx];
        this.size[targetIdx] = Math.max(1.3, (pt[5] || 0.3) * 3.4);

        const r = pt[2] || 160;
        const g = pt[3] || 50;

        let col = 2;
        if (r > 200 && g > 170) col = 0;
        else if (r > 220 && g > 210) col = 5;
        else if (r > 190 && g > 90) col = 3;
        else if (r > 160 && g < 70) col = 2;
        else if (r < 90) col = 6;
        else col = 4;

        this.colorIdx[targetIdx] = col;
        this.baseColorIdx[targetIdx] = col;
        this.layer[targetIdx] = 2;
      }
    }
    console.log(`[ArtworkEngine] Loaded ${count} authentic Goan Kaavi seed points.`);
  }

  // Parse hex color string to [r,g,b]
  hexToRgb(hex) {
    const c = hex.replace('#', '');
    return [
      parseInt(c.substring(0, 2), 16),
      parseInt(c.substring(2, 4), 16),
      parseInt(c.substring(4, 6), 16)
    ];
  }

  // Update target palette & background based on active sentiment parameters & recent input burst
  syncThemePalette(p) {
    const weatherKey = p.dominantWeather || 'sunny';
    const foodKey = p.dominantFood || 'fish_curry';
    const locKey = p.dominantLocation || 'aguada_fort';

    const wTheme = THEME_PALETTES.weather[weatherKey] || THEME_PALETTES.weather.sunny;
    const fTheme = THEME_PALETTES.food[foodKey] || THEME_PALETTES.food.fish_curry;
    const lTheme = THEME_PALETTES.location[locKey] || THEME_PALETTES.location.aguada_fort;

    // 1. Calculate collective base palette
    const collPalette = new Float32Array(42);
    for (let i = 0; i < 14; i++) {
      const rgb = wTheme.p[i];
      const base = i * 3;
      collPalette[base] = rgb[0];
      collPalette[base + 1] = rgb[1];
      collPalette[base + 2] = rgb[2];
    }

    // Blend Food Accents
    for (const [key, rgb] of Object.entries(fTheme)) {
      if (key.startsWith('p')) {
        const idx = parseInt(key.substring(1), 10);
        if (idx >= 0 && idx < 14) {
          const base = idx * 3;
          collPalette[base] = collPalette[base] * 0.35 + rgb[0] * 0.65;
          collPalette[base + 1] = collPalette[base + 1] * 0.35 + rgb[1] * 0.65;
          collPalette[base + 2] = collPalette[base + 2] * 0.35 + rgb[2] * 0.65;
        }
      }
    }

    // Blend Location Accents
    for (const [key, rgb] of Object.entries(lTheme)) {
      if (key.startsWith('p')) {
        const idx = parseInt(key.substring(1), 10);
        if (idx >= 0 && idx < 14) {
          const base = idx * 3;
          collPalette[base] = collPalette[base] * 0.45 + rgb[0] * 0.55;
          collPalette[base + 1] = collPalette[base + 1] * 0.45 + rgb[1] * 0.55;
          collPalette[base + 2] = collPalette[base + 2] * 0.45 + rgb[2] * 0.55;
        }
      }
    }

    const collBg = wTheme.bg.map(h => this.hexToRgb(h));
    const collSun = [...wTheme.sunHalo];

    // 2. Check if a recent input has chromatic dominance (dramatic change per input!)
    if (this.recentInput && this.recentInput.weight > 0.02) {
      const rwKey = this.recentInput.weather || weatherKey;
      const rfKey = this.recentInput.food || foodKey;
      const rlKey = this.recentInput.location || locKey;
      const reKey = this.recentInput.emblem || 'mandovi_boat';

      const rwTheme = THEME_PALETTES.weather[rwKey] || wTheme;
      const rfTheme = THEME_PALETTES.food[rfKey] || fTheme;
      const rlTheme = THEME_PALETTES.location[rlKey] || lTheme;
      const reTheme = THEME_PALETTES.emblem[reKey] || THEME_PALETTES.emblem.mandovi_boat;

      const inpPalette = new Float32Array(42);

      // Slots 0, 1, 2: 1. Weather atmospheric tones
      inpPalette[0] = rwTheme.p[0][0]; inpPalette[1] = rwTheme.p[0][1]; inpPalette[2] = rwTheme.p[0][2];
      inpPalette[3] = rwTheme.p[1][0]; inpPalette[4] = rwTheme.p[1][1]; inpPalette[5] = rwTheme.p[1][2];
      inpPalette[6] = rwTheme.p[2][0]; inpPalette[7] = rwTheme.p[2][1]; inpPalette[8] = rwTheme.p[2][2];

      // Slots 3, 4, 5: 2. Food / Culinary signature tones
      const f3 = rfTheme.p3 || rfTheme.accent || [235, 25, 20];
      const f4 = rfTheme.p4 || [255, 65, 35];
      const f5 = rfTheme.p5 || [185, 20, 18];
      inpPalette[9]  = f3[0]; inpPalette[10] = f3[1]; inpPalette[11] = f3[2];
      inpPalette[12] = f4[0]; inpPalette[13] = f4[1]; inpPalette[14] = f4[2];
      inpPalette[15] = f5[0]; inpPalette[16] = f5[1]; inpPalette[17] = f5[2];

      // Slots 6, 7, 8: 3. Location / Regional heritage landmark tones
      const l6 = rlTheme.p6 || rlTheme.accent || [40, 105, 245];
      const l7 = rlTheme.p7 || [60, 165, 255];
      const l8 = rlTheme.p8 || [245, 175, 35];
      inpPalette[18] = l6[0]; inpPalette[19] = l6[1]; inpPalette[20] = l6[2];
      inpPalette[21] = l7[0]; inpPalette[22] = l7[1]; inpPalette[23] = l7[2];
      inpPalette[24] = l8[0]; inpPalette[25] = l8[1]; inpPalette[26] = l8[2];

      // Slots 9, 10, 11: 4. Cultural Emblem kinetic accents & motifs
      const e9  = reTheme.p9  || reTheme.accent || [15, 225, 230];
      const e10 = reTheme.p10 || [25, 115, 245];
      const e11 = reTheme.p11 || [10, 180, 210];
      inpPalette[27] = e9[0];  inpPalette[28] = e9[1];  inpPalette[29] = e9[2];
      inpPalette[30] = e10[0]; inpPalette[31] = e10[1]; inpPalette[32] = e10[2];
      inpPalette[33] = e11[0]; inpPalette[34] = e11[1]; inpPalette[35] = e11[2];

      // Slot 12: Harmonious Fusion 1 (Weather + Food blend)
      inpPalette[36] = Math.round(inpPalette[0] * 0.5 + inpPalette[9] * 0.5);
      inpPalette[37] = Math.round(inpPalette[1] * 0.5 + inpPalette[10] * 0.5);
      inpPalette[38] = Math.round(inpPalette[2] * 0.5 + inpPalette[11] * 0.5);

      // Slot 13: Harmonious Fusion 2 (Location + Emblem blend)
      inpPalette[39] = Math.round(inpPalette[18] * 0.5 + inpPalette[27] * 0.5);
      inpPalette[40] = Math.round(inpPalette[19] * 0.5 + inpPalette[28] * 0.5);
      inpPalette[41] = Math.round(inpPalette[20] * 0.5 + inpPalette[29] * 0.5);

      // Background incorporates all 4 dimensions:
      // Stop 0: Weather sky
      // Stop 1: Food warmth
      // Stop 2: Location regional earth
      // Stop 3: Emblem deep shadow
      const rawWbg = rwTheme.bg.map(h => this.hexToRgb(h));
      const inpBg = [
        rawWbg[0],
        [
          Math.min(255, Math.round(rawWbg[1][0] * 0.45 + f3[0] * 0.35)),
          Math.min(255, Math.round(rawWbg[1][1] * 0.45 + f3[1] * 0.25)),
          Math.min(255, Math.round(rawWbg[1][2] * 0.45 + f3[2] * 0.25))
        ],
        [
          Math.min(255, Math.round(rawWbg[2][0] * 0.45 + l6[0] * 0.35)),
          Math.min(255, Math.round(rawWbg[2][1] * 0.45 + l6[1] * 0.35)),
          Math.min(255, Math.round(rawWbg[2][2] * 0.45 + l6[2] * 0.35))
        ],
        [
          Math.min(255, Math.round(rawWbg[3][0] * 0.55 + e9[0] * 0.25)),
          Math.min(255, Math.round(rawWbg[3][1] * 0.55 + e9[1] * 0.25)),
          Math.min(255, Math.round(rawWbg[3][2] * 0.55 + e9[2] * 0.25))
        ]
      ];

      // Sun halo combines Weather solar radiance (60%) + Food culinary warmth (40%)
      const inpSun = [
        Math.min(255, Math.round(rwTheme.sunHalo[0] * 0.6 + f3[0] * 0.4)),
        Math.min(255, Math.round(rwTheme.sunHalo[1] * 0.6 + f3[1] * 0.4)),
        Math.min(255, Math.round(rwTheme.sunHalo[2] * 0.6 + f3[2] * 0.4))
      ];

      const w = this.recentInput.weight;
      for (let k = 0; k < 42; k++) {
        this.targetPaletteRGB[k] = collPalette[k] * (1 - w) + inpPalette[k] * w;
      }
      for (let k = 0; k < 4; k++) {
        this.targetBg[k] = [
          collBg[k][0] * (1 - w) + inpBg[k][0] * w,
          collBg[k][1] * (1 - w) + inpBg[k][1] * w,
          collBg[k][2] * (1 - w) + inpBg[k][2] * w
        ];
      }
      this.targetSunGlow = [
        collSun[0] * (1 - w) + inpSun[0] * w,
        collSun[1] * (1 - w) + inpSun[1] * w,
        collSun[2] * (1 - w) + inpSun[2] * w
      ];
    } else {
      for (let k = 0; k < 42; k++) {
        this.targetPaletteRGB[k] = collPalette[k];
      }
      for (let k = 0; k < 4; k++) {
        this.targetBg[k] = collBg[k];
      }
      this.targetSunGlow = collSun;

      // When Topology 1 (Intertwined Marine & Fire Strata) is active AND no attendee has voted:
      // Show default reference painting colors
      if (this.currentTopology === 1) {
        const marineFireOverrides = [
          [255, 215, 45],  // 0: 24k Sun Gold
          [228, 48, 22],   // 1: Fiery Vermilion
          [220, 95, 38],   // 2: Terracotta Ochre
          [150, 35, 20],   // 3: Deep Laterite Rust
          [215, 138, 42],  // 4: Spiced Caramel Bebinca
          [255, 245, 230], // 5: Coconut Ivory
          [42, 15, 12],    // 6: Roasted Umber Ground
          [20, 118, 135],  // 7: Deep Marine Teal
          [46, 188, 208],  // 8: Vibrant Aquamarine
          [110, 228, 240], // 9: Seafoam Turquoise
          [232, 252, 255], // 10: Crystal Sea Spray Ivory
          [14, 54, 68],    // 11: Abyssal Ocean Slate
          [255, 78, 32],   // 12: Hot Chili Spark
          [168, 62, 28]    // 13: Burnished Copper
        ];
        for (let i = 0; i < 14; i++) {
          const rgb = marineFireOverrides[i];
          const base = i * 3;
          this.targetPaletteRGB[base] = rgb[0];
          this.targetPaletteRGB[base + 1] = rgb[1];
          this.targetPaletteRGB[base + 2] = rgb[2];
        }
      }
    }
  }

  // Trigger immediate, dramatic input-driven transformation with each submission!
  addResponseBurst(response) {
    if (!response) return;
    const W = this.width;
    const H = this.height;

    const wKey = (response.weather || 'sunny').toLowerCase();
    const fKey = (response.food || 'fish_curry').toLowerCase();
    const lKey = (response.location || 'aguada_fort').toLowerCase();
    const eKey = (response.emblem || 'mandovi_boat').toLowerCase();

    // Base Macro Spatial Topology (Form & Structure) does NOT change on individual votes.
    // It changes exclusively on the 30-minute cycle.
    // Individual attendee inputs dynamically modulate: animation movement, flow physics, and color themes!

    // 1. Tightly couple animation movement and physical forces across ALL 4 dimensions
    if (this.sentimentEngine) {
      if (typeof this.sentimentEngine.addResponse === 'function') {
        this.sentimentEngine.addResponse(response);
      }
      const p = this.sentimentEngine.currentParameters;

      // Reset base multipliers
      p.windSweep = 0;
      p.rainGravity = 0;
      p.calmSwell = 0;
      p.stormVortex = 0;
      p.strataStrength = 0;
      p.chiliSparks = 0;
      p.flourSpeckles = 0;
      p.flowCurvature = 0;
      p.convectivePulse = 0;
      p.dudhsagarCascade = 0;
      p.aguadaBeacon = 0;
      p.fontainhasNodes = 0;
      p.palolemCrescent = 0;
      p.chaporaRidge = 0;
      p.caboRamaCape = 0;
      p.wakeRipples = 0;
      p.kingfisherDarts = 0;
      p.frondTendrils = 0;
      p.turtleSwell = 0;
      p.carnivalConfetti = 0;
      p.susegadDamping = 0;

      // 1. Weather atmospheric physics (expressive dynamics, especially for windy & stormy)
      if (wKey === 'sunny') {
        p.flowSpeed = 0.85;
        p.turbulence = 0.55;
        p.sunRadius = 1.40;
        p.sunPulseSpeed = 1.20;
        p.sunIntensity = 1.40;
      } else if (wKey === 'windy') {
        p.windSweep = 3.80;
        p.biasX = 2.80;
        p.biasY = -0.80;
        p.flowSpeed = 2.50;
        p.turbulence = 1.80;
      } else if (wKey === 'rainy') {
        p.rainGravity = 1.80;
        p.biasX = 0;
        p.biasY = 1.20;
        p.flowSpeed = 0.95;
        p.turbulence = 0.45;
      } else if (wKey === 'stormy') {
        p.stormVortex = 2.60;
        p.turbulence = 1.80;
        p.flowSpeed = 1.60;
      } else if (wKey === 'calm') {
        p.calmSwell = 1.10;
        p.susegadDamping = 2.4;
        p.flowSpeed = 0.38;
        p.turbulence = 0.18;
      }

      // 2. Food culinary dynamics & texture
      if (fKey === 'bebinca') {
        p.strataStrength = 3.5;
        p.particleSizeScale = 1.45;
      } else if (fKey === 'vindaloo') {
        p.chiliSparks = 3.5;
        p.emberDensity = 3.2;
      } else if (fKey === 'poe_bread') {
        p.flourSpeckles = 3.5;
        p.particleSizeScale = 0.85;
      } else if (fKey === 'fish_curry') {
        p.particleSizeScale = 1.3;
        p.curlScale = 0.0038;
        p.flowCurvature = 2.5;
      } else if (fKey === 'prawn_curry') {
        p.emberDensity = 2.2;
        p.convectivePulse = 2.5;
        p.particleSizeScale = 1.25;
      } else if (fKey === 'xacuti') {
        p.flourSpeckles = 1.2;
        p.curlScale = 0.0044;
      }

      // 3. Location regional landmark harmonics
      if (lKey === 'dudhsagar') p.dudhsagarCascade = 3.5;
      if (lKey === 'aguada_fort') p.aguadaBeacon = 3.5;
      if (lKey === 'fontainhas') p.fontainhasNodes = 3.5;
      if (lKey === 'palolem_beach') p.palolemCrescent = 3.5;
      if (lKey === 'chapora_fort') p.chaporaRidge = 3.5;
      if (lKey === 'cabo_de_rama') p.caboRamaCape = 3.5;

      // 4. Emblem kinetic signatures
      if (eKey === 'kingfisher') p.kingfisherDarts = 4.2;
      if (eKey === 'mandovi_boat') p.wakeRipples = 3.8;
      if (eKey === 'sea_turtle') p.turtleSwell = 3.6;
      if (eKey === 'coconut_tree' || eKey === 'coconut_palm') p.frondTendrils = 3.6;
      if (eKey === 'carnival_spirit') p.carnivalConfetti = 3.8;
      if (eKey === 'susegad') p.susegadDamping = 3.4;
      if (eKey === 'sea_shell') { p.stormVortex = 1.8; p.calmSwell = 2.0; }

      // Persist the attendee's physical & animation forces until next input
      this.sentimentEngine.targetParameters = JSON.parse(JSON.stringify(p));
      this.sentimentEngine.isTransitioning = false;
    }

    // 2. Chromatic Dominance for all 4 inputs (persists continuously until next input)
    this.recentInput = {
      weather: wKey,
      food: fKey,
      location: lKey,
      emblem: eKey,
      weight: 1.0
    };
    this.paletteDirty = true;

    // 3. Permanently and visibly weave ALL 4 dimensions across the 42,000 particle color indices
    const colorStep = this.particleStep || 1;
    for (let i = 0; i < this.TOTAL_PARTICLES; i += colorStep) {
      const lyr = this.layer[i];
      const r = (i * 17 + (i >> 2)) % 100;
      if (lyr === 0 || lyr === 1) {
        // Solar Core & Corona: 55% Weather (0, 1), 25% Food (3, 5), 20% Emblem (10)
        if (r < 55) this.baseColorIdx[i] = (r % 2 === 0) ? 0 : 1;
        else if (r < 80) this.baseColorIdx[i] = (r % 2 === 0) ? 3 : 5;
        else this.baseColorIdx[i] = 10;
      } else if (lyr === 2) {
        // Main Meander & Oceanic/Laterite currents:
        // Evenly and prominently alternates all 4 dimensions in micro-bands:
        const band = (i + Math.floor(this.hy[i] / 28)) % 4;
        if (band === 0) this.baseColorIdx[i] = (r < 55) ? 0 : 1;       // 1. Weather
        else if (band === 1) this.baseColorIdx[i] = (r < 55) ? 3 : 4;  // 2. Food
        else if (band === 2) this.baseColorIdx[i] = (r < 55) ? 6 : 7;  // 3. Location
        else this.baseColorIdx[i] = (r < 55) ? 9 : 10;                // 4. Emblem
      } else {
        // Ambient laterite & background field:
        const cat = i % 4;
        if (cat === 0) this.baseColorIdx[i] = (r < 50) ? 1 : 2;       // 1. Weather
        else if (cat === 1) this.baseColorIdx[i] = (r < 50) ? 4 : 5;  // 2. Food
        else if (cat === 2) this.baseColorIdx[i] = (r < 50) ? 7 : 8;  // 3. Location
        else this.baseColorIdx[i] = (r < 50) ? 10 : 11;              // 4. Emblem
      }
      this.colorIdx[i] = this.baseColorIdx[i];
    }

    // 4. Custom Thematic Shockwave & Directional Particle Burst
    let burstOriginX = W * 0.5;
    let burstOriginY = H * 0.5;
    let burstDirection = -Math.PI * 0.5;

    if (lKey === 'dudhsagar') {
      burstOriginX = W * 0.5;
      burstOriginY = H * 0.06;
      burstDirection = Math.PI * 0.5; // Downward waterfall plunge
    } else if (lKey === 'aguada_fort') {
      burstOriginX = W * 0.74;
      burstOriginY = H * 0.17;
      burstDirection = Math.random() * Math.PI * 2;
    } else if (lKey === 'fontainhas') {
      burstOriginX = W * 0.38;
      burstOriginY = H * 0.35;
      burstDirection = -Math.PI * 0.4;
    } else if (lKey === 'palolem_beach') {
      burstOriginX = W * 0.45;
      burstOriginY = H * 0.85;
      burstDirection = -Math.PI * 0.55;
    } else if (lKey === 'chapora_fort') {
      burstOriginX = W * 0.75;
      burstOriginY = H * 0.28;
      burstDirection = -Math.PI * 0.7;
    } else if (lKey === 'cabo_de_rama') {
      burstOriginX = W * 0.5;
      burstOriginY = H * 0.9;
      burstDirection = -Math.PI * 0.5;
    } else if (wKey === 'windy') {
      burstOriginX = W * 0.08;
      burstOriginY = H * 0.92;
      burstDirection = -Math.PI * 0.22; // High-velocity diagonal sweep
    } else if (wKey === 'rainy') {
      burstOriginX = W * (0.25 + Math.random() * 0.5);
      burstOriginY = H * 0.04;
      burstDirection = Math.PI * 0.5; // Downward rain
    } else if (fKey === 'bebinca') {
      burstOriginX = W * 0.5;
      burstOriginY = H * 0.65;
      burstDirection = 0; // Horizontal strata ripple
    }

    const rwTheme = THEME_PALETTES.weather[wKey] || THEME_PALETTES.weather.sunny;
    const rfTheme = THEME_PALETTES.food[fKey] || THEME_PALETTES.food.fish_curry;
    const rlTheme = THEME_PALETTES.location[lKey] || THEME_PALETTES.location.aguada_fort;
    const reTheme = THEME_PALETTES.emblem[eKey] || THEME_PALETTES.emblem.mandovi_boat;

    const sigW = (rwTheme.p && rwTheme.p[0]) || [255, 215, 45];
    const sigF = (rfTheme.p3) || rfTheme.accent || [235, 25, 20];
    const sigL = (rlTheme.p6) || rlTheme.accent || [40, 105, 245];
    const sigE = (reTheme.p9) || reTheme.accent || [15, 225, 230];

    // Emit 4 Concentric Harmonic Shockwave Rings representing ALL 4 Questions!
    this.shockwaves.push(
      { x: burstOriginX, y: burstOriginY, radius: 0,   maxRadius: Math.hypot(W, H) * 1.25, speed: 46, colorIdx: 0, rgb: sigW, thickness: 160, intensity: 1.0 },
      { x: burstOriginX, y: burstOriginY, radius: -45, maxRadius: Math.hypot(W, H) * 1.25, speed: 42, colorIdx: 3, rgb: sigF, thickness: 160, intensity: 1.0 },
      { x: burstOriginX, y: burstOriginY, radius: -90, maxRadius: Math.hypot(W, H) * 1.25, speed: 38, colorIdx: 6, rgb: sigL, thickness: 160, intensity: 1.0 },
      { x: burstOriginX, y: burstOriginY, radius: -135, maxRadius: Math.hypot(W, H) * 1.25, speed: 34, colorIdx: 9, rgb: sigE, thickness: 160, intensity: 1.0 }
    );

    // High-energy particles partitioned evenly across the 4 dimensions
    let spawned = 0;
    const maxSpawn = this.isLP ? 210 : 420;
    const colors = [0, 3, 6, 9]; // Weather, Food, Location, Emblem
    const spawnStep = this.particleStep || 1;
    for (let i = 0; i < this.TOTAL_PARTICLES && spawned < maxSpawn; i += spawnStep) {
      if ((this.layer[i] === 3 || this.layer[i] === 2) && Math.random() < 0.35) {
        this.layer[i] = 4;
        this.px[i] = burstOriginX + (Math.random() - 0.5) * 90;
        this.py[i] = burstOriginY + (Math.random() - 0.5) * 90;

        const angle = burstDirection + (Math.random() - 0.5) * 1.3;
        const speed = (wKey === 'windy') ? (18.0 + Math.random() * 26.0) : (10.0 + Math.random() * 18.0);
        this.vx[i] = Math.cos(angle) * speed;
        this.vy[i] = Math.sin(angle) * speed;
        this.size[i] = 3.6 + Math.random() * 4.4;
        this.alpha[i] = 1.0;
        this.colorIdx[i] = colors[spawned % 4];

        spawned++;
      }
    }
  }

  // Cubic easing helper
  easeInOutCubic(x) {
    return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
  }

  // Physics, shockwaves, morphing and color excitation update
  update() {
    const dt = this.isLP ? 0.018 : 0.016;
    this.time += dt;
    const p = this.sentimentEngine.currentParameters;
    const W = this.width;
    const H = this.height;

    // Persist recent input chromatic dominance until the next attendee input is given
    if (this.recentInput) {
      this.recentInput.weight = 1.0;
    }

    // Sync collective theme palette with current sentiment & input burst
    this.syncThemePalette(p);

    // Smoothly glide active palette RGBs toward target
    let maxDelta = 0;
    const baseLerp = (this.recentInput && this.recentInput.weight > 0.5) ? 0.12 : 0.07;
    const lerpSpeed = this.isLP ? Math.min(0.24, baseLerp * 1.8) : baseLerp;
    for (let k = 0; k < 42; k++) {
      const diff = this.targetPaletteRGB[k] - this.currentPaletteRGB[k];
      this.currentPaletteRGB[k] += diff * lerpSpeed;
      const absDiff = Math.abs(diff);
      if (absDiff > maxDelta) maxDelta = absDiff;
    }

    // Smoothly glide background stops & sun glow
    const bgLerp = this.isLP ? 0.095 : 0.05;
    for (let k = 0; k < 4; k++) {
      for (let c = 0; c < 3; c++) {
        this.currentBg[k][c] += (this.targetBg[k][c] - this.currentBg[k][c]) * bgLerp;
      }
    }
    for (let c = 0; c < 3; c++) {
      this.currentSunGlow[c] += (this.targetSunGlow[c] - this.currentSunGlow[c]) * bgLerp;
    }

    if (maxDelta > 0.8 || this.paletteDirty) {
      this.rebuildDotSprites();
      this.paletteDirty = false;
    }

    // Advance chromatic shockwaves
    const waveStep = this.isLP ? 2 : 1;
    for (let sw = this.shockwaves.length - 1; sw >= 0; sw--) {
      const wave = this.shockwaves[sw];
      wave.radius += wave.speed * waveStep;
      wave.intensity *= Math.pow(0.985, waveStep);
      if (wave.radius > wave.maxRadius || wave.intensity < 0.04) {
        this.shockwaves.splice(sw, 1);
      }
    }

    // Handle 30-Minute Cycle Structural Morphing
    let morphT = 1.0;
    let isMorphing = this.isMorphing;
    if (isMorphing) {
      this.morphProgress += dt / this.morphDuration;
      morphT = this.easeInOutCubic(Math.min(1.0, this.morphProgress));
      if (this.morphProgress >= 1.0) {
        this.isMorphing = false;
        isMorphing = false;
        this.baseColorIdx.set(this.morphTargetColor);
        this.colorIdx.set(this.morphTargetColor);
        this.layer.set(this.morphTargetLayer);
        this.hx.set(this.morphTargetX);
        this.hy.set(this.morphTargetY);
        this.size.set(this.morphTargetSize);
      } else if (this.morphProgress > 0.25 && this.baseColorIdx[0] !== this.morphTargetColor[0]) {
        this.baseColorIdx.set(this.morphTargetColor);
        this.colorIdx.set(this.morphTargetColor);
        this.layer.set(this.morphTargetLayer);
      }
    }

    const flowSpeed = p.flowSpeed || 0.80;
    const turbulence = p.turbulence || 0.60;
    const sunX = (this.currentTopology === 1) ? W * 0.82 : W * (p.sunX || 0.72);
    const sunY = (this.currentTopology === 1) ? H * 0.11 : H * (p.sunY || 0.18);
    const sunPulse = Math.sin(this.time * 1.0 * (p.sunPulseSpeed || 1.0)) * 0.07 + 1.0;

    this.beaconAngle += (this.isLP ? 0.030 : 0.020) * (p.aguadaBeacon > 0.2 ? 1.0 : 0.4);

    const N = this.TOTAL_PARTICLES;
    const hasWaves = this.shockwaves.length > 0;
    const step = this.particleStep || 1;

    for (let i = 0; i < N; i += step) {
      const layer = this.layer[i];

      // Update morphing anchor target if actively morphing between 30-min cycles
      if (isMorphing) {
        const swirlX = Math.sin(this.phase[i] + this.time * 1.2) * Math.sin(morphT * Math.PI) * 20.0;
        const swirlY = Math.cos(this.phase[i] + this.time * 1.0) * Math.sin(morphT * Math.PI) * 20.0;
        this.hx[i] = this.morphStartX[i] * (1 - morphT) + this.morphTargetX[i] * morphT + swirlX;
        this.hy[i] = this.morphStartY[i] * (1 - morphT) + this.morphTargetY[i] * morphT + swirlY;
        this.size[i] = this.morphStartSize[i] * (1 - morphT) + this.morphTargetSize[i] * morphT;
      }

      // ==========================================
      // Layer 4: Real-Time Live Response Bursts
      // ==========================================
      if (layer === 4) {
        this.px[i] += this.vx[i];
        this.py[i] += this.vy[i];
        this.vx[i] *= 0.94;
        this.vy[i] *= 0.94;
        this.vy[i] -= 0.14;
        this.alpha[i] -= 0.012;

        if (this.alpha[i] <= 0.08) {
          this.layer[i] = 3;
          this.px[i] = this.hx[i];
          this.py[i] = this.hy[i];
          this.vx[i] = 0;
          this.vy[i] = 0;
          this.alpha[i] = 0.35;
          this.colorIdx[i] = this.baseColorIdx[i];
        }
        continue;
      }

      // Check Shockwave impact on particles
      if (hasWaves) {
        const px = this.px[i];
        const py = this.py[i];
        for (let sw = 0; sw < this.shockwaves.length; sw++) {
          const wave = this.shockwaves[sw];
          if (wave.radius <= 0) continue;
          const dx = px - wave.x;
          const dy = py - wave.y;
          const dist = Math.hypot(dx, dy);
          const distDiff = Math.abs(dist - wave.radius);

          if (distDiff < wave.thickness) {
            const impact = (1.0 - distDiff / wave.thickness) * wave.intensity;
            this.colorIdx[i] = wave.colorIdx;
            this.colorExciteTime[i] = 1.0;
            this.alpha[i] = Math.min(1.0, this.alpha[i] + impact * 0.6);
            this.vy[i] -= impact * 1.4;
            break;
          }
        }
      }

      // Decay transient color excitation back to base color
      if (this.colorExciteTime[i] > 0) {
        this.colorExciteTime[i] -= (this.isLP ? 0.028 : 0.014);
        if (this.colorExciteTime[i] <= 0) {
          this.colorExciteTime[i] = 0;
          this.colorIdx[i] = this.baseColorIdx[i];
        }
      }

      // ==========================================
      // Layers 0 & 1: Solar Disc & Corona Rings
      // ==========================================
      if (layer === 0 || layer === 1) {
        const dx = this.hx[i] - sunX;
        const dy = this.hy[i] - sunY;
        const dist = Math.sqrt(dx * dx + dy * dy) || 1;

        const baseAngle = Math.atan2(dy, dx);
        const orbitOffset = (this.time * 0.03 * flowSpeed + this.phase[i]) * 0.02;
        const curAngle = baseAngle + orbitOffset;

        const dynamicRad = dist * sunPulse + Math.sin(this.time * 0.4 + this.phase[i]) * 1.5;
        let targetX = sunX + Math.cos(curAngle) * dynamicRad;
        let targetY = sunY + Math.sin(curAngle) * dynamicRad;

        if (p.windSweep > 0.2) {
          const windDrift = (dist / (sunRad * 1.5)) * 46.0 * (p.windSweep / 2.5);
          targetX += Math.sin(this.time * 2.2 + curAngle) * 14.0 + windDrift;
          targetY -= Math.cos(this.time * 2.0 + curAngle) * 10.0 + windDrift * 0.35;
        }

        this.px[i] += (targetX - this.px[i]) * 0.035;
        this.py[i] += (targetY - this.py[i]) * 0.035;

        this.alpha[i] = 0.70 + Math.sin(this.phase[i] + this.time * 0.6 * (p.sunPulseSpeed || 1.0)) * 0.12;
        continue;
      }

      // ==========================================
      // Layers 2 & 3: River Meanders & Laterite Field
      // ==========================================
      const x = this.px[i];
      const y = this.py[i];

      // Organic Curl Noise Flow (expressive, living fluid current)
      const nx = x * (p.curlScale || 0.0022) + this.time * 0.045 * flowSpeed;
      const ny = y * ((p.curlScale || 0.0022) * 0.75) + this.time * 0.035 * flowSpeed;
      const fieldAngle = Math.sin(nx * 2.8) * Math.cos(ny * 2.2) * Math.PI * 2 * turbulence;

      let fx = Math.cos(fieldAngle) * 0.48 * flowSpeed;
      let fy = Math.sin(fieldAngle) * 0.48 * flowSpeed;

      // ----------------------------------------------------
      // 1. WEATHER PHYSICAL FORCES & CURRENTS (Question 1)
      // ----------------------------------------------------
      if (p.windSweep > 0.15) {
        // Dramatic multi-harmonic wind surges & sweeping gusts
        const gustCycle = Math.sin(this.time * 2.2 + (x * 0.002 + y * 0.004));
        const gustSurge = (gustCycle * 1.6 + Math.sin(this.time * 4.2 + y * 0.008) * 0.9 + 1.8);
        fx += gustSurge * 1.8 * p.windSweep;
        // Thermal coastal lift & eddy flutter
        fy -= (Math.cos(this.time * 2.0 + x * 0.003) * 0.75 + 0.5) * p.windSweep;
        // Aerodynamic ripple oscillation
        fx += Math.sin(this.time * 5.4 + (y + this.phase[i]) * 0.012) * 0.85 * p.windSweep;
      }
      if (p.rainGravity > 0.15) {
        fy += (Math.sin(this.phase[i] + this.time * 2.6) * 0.6 + 0.9) * p.rainGravity;
      }
      if (p.stormVortex > 0.15) {
        const vdx = x - W * 0.5;
        const vdy = y - H * 0.5;
        const vdist = Math.hypot(vdx, vdy) || 1;
        fx += (-vdy / vdist) * 1.4 * p.stormVortex;
        fy += (vdx / vdist) * 1.4 * p.stormVortex;
      }
      if (p.calmSwell > 0.15) {
        fy += Math.sin(this.time * 0.7 + x * 0.004) * 0.65 * p.calmSwell;
        fx *= (1.0 - Math.min(0.6, p.calmSwell * 0.25));
      }

      // ----------------------------------------------------
      // 2. FOOD CULINARY KINETICS & FLUID DYNAMICS (Question 2)
      // ----------------------------------------------------
      // Bebinca: Horizontal laminar strata shear
      if (p.strataStrength > 0.2) {
        fx += Math.sin((this.hy[i] / H) * Math.PI * 7 + this.time * 0.9) * 0.6 * p.strataStrength;
      }
      // Fish Curry: Hydrodynamic orbital curls
      if (p.flowCurvature > 0.2) {
        const cAng = Math.sin(x * 0.004) * Math.cos(y * 0.004) * Math.PI * 2;
        fx += Math.cos(cAng) * 0.5 * p.flowCurvature;
        fy += Math.sin(cAng) * 0.5 * p.flowCurvature;
      }
      // Prawn Curry: Convective simmering bubble pulse from bottom-center
      if (p.convectivePulse > 0.2) {
        const pcdx = x - W * 0.5;
        const pcdy = y - H * 0.7;
        const pcdist = Math.hypot(pcdx, pcdy) || 1;
        const pcpulse = Math.sin(this.time * 1.5 - pcdist * 0.015) * p.convectivePulse;
        fx += (pcdx / pcdist) * pcpulse * 0.35;
        fy += (pcdy / pcdist) * pcpulse * 0.35;
      }
      // Poe Bread: Airy buoyant flour lofting
      if (p.flourSpeckles > 0.2) {
        fx += Math.sin(this.phase[i] + this.time * 1.2) * 0.25 * p.flourSpeckles;
        fy -= (0.2 + Math.cos(this.phase[i] + this.time * 1.0) * 0.15) * p.flourSpeckles;
      }

      // ----------------------------------------------------
      // 3. LOCATION LANDMARK HARMONICS & VORTICES (Question 3)
      // ----------------------------------------------------
      // Dudhsagar: Powerful vertical cataract plunge
      if (p.dudhsagarCascade > 0.2) {
        if (Math.abs(x - W * 0.5) < W * 0.32) {
          fy += (Math.sin(x * 0.015 + this.time * 1.8) * 0.35 + 0.7) * p.dudhsagarCascade;
        } else {
          fy += 0.25 * p.dudhsagarCascade;
        }
      }
      // Aguada Fort: Rotating lighthouse sweeping beam
      if (p.aguadaBeacon > 0.2) {
        const adx = x - W * 0.74;
        const ady = y - H * 0.17;
        const bang = Math.atan2(ady, adx);
        const bdiff = Math.abs(Math.sin((bang - this.beaconAngle) * 0.5));
        if (bdiff < 0.14) {
          const push = (1.0 - bdiff / 0.14) * 0.9 * p.aguadaBeacon;
          fx += Math.cos(bang) * push;
          fy += Math.sin(bang) * push;
        }
      }
      // Fontainhas: Portuguese quarter rosette nodes dance
      if (p.fontainhasNodes > 0.2) {
        fx += Math.sin(x * 0.008 + this.time * 0.8) * Math.cos(y * 0.008) * 0.5 * p.fontainhasNodes;
        fy += Math.cos(x * 0.008) * Math.sin(y * 0.008 + this.time * 0.8) * 0.5 * p.fontainhasNodes;
      }
      // Palolem Beach: Coastal crescent tidal bay swell
      if (p.palolemCrescent > 0.2) {
        fy += Math.sin(x * 0.005 + this.time * 0.9) * 0.6 * p.palolemCrescent;
        fx += Math.cos(x * 0.004) * 0.35 * p.palolemCrescent;
      }
      // Chapora Fort: Clifftop ridge lift
      if (p.chaporaRidge > 0.2) {
        fy -= (Math.cos(x * 0.005 + this.time * 0.8) * 0.4 + 0.3) * p.chaporaRidge;
      }
      // Cabo de Rama: Dramatic headland thermal updrafts
      if (p.caboRamaCape > 0.2 || p.basilicaSymmetry > 0.2) {
        fy -= (Math.sin(x * 0.007 + this.time * 1.1) * 0.35 + 0.4) * (p.caboRamaCape || p.basilicaSymmetry || 0);
      }

      // ----------------------------------------------------
      // 4. EMBLEM CULTURAL KINETICS & MOTIFS (Question 4)
      // ----------------------------------------------------
      // Mandovi Boat: Oscillating V-wake ripples
      if (p.wakeRipples > 0.2) {
        fy += Math.sin(x * 0.018 + this.time * 1.8) * 0.6 * p.wakeRipples;
        fx += Math.cos(y * 0.012) * 0.3 * p.wakeRipples;
      }
      // Coconut Palm: Arching fronds swaying in tropical breeze
      if (p.frondTendrils > 0.2) {
        fx += Math.cos(y * 0.008 + this.time * 1.0) * 0.6 * p.frondTendrils;
        fy += Math.sin(x * 0.006 + this.time * 0.8) * 0.25 * p.frondTendrils;
      }
      // Sea Turtle: Deep, slow rhythmic oceanic respiration
      if (p.turtleSwell > 0.2) {
        const tBreath = Math.sin(this.time * 0.4);
        fy += tBreath * 0.5 * p.turtleSwell;
        fx += Math.cos(this.time * 0.4) * 0.25 * p.turtleSwell;
      }
      // Kingfisher: Rapid, agile turquoise dart streaks
      if (p.kingfisherDarts > 0.25 && Math.random() < 0.0015 * p.kingfisherDarts) {
        this.vx[i] += (Math.random() - 0.4) * 4.5;
        this.vy[i] += (Math.random() - 0.5) * 3.0;
        this.colorIdx[i] = 9; // Electric turquoise
        this.colorExciteTime[i] = 0.8;
        this.alpha[i] = 1.0;
      }
      // Carnival Spirit: Celebratory confetti micro-bursts
      if (p.carnivalConfetti > 0.25 && Math.random() < 0.0015 * p.carnivalConfetti) {
        this.vx[i] += (Math.random() - 0.5) * 3.0;
        this.vy[i] -= Math.random() * 3.0;
        this.colorIdx[i] = (Math.random() < 0.5 ? 9 : 10);
        this.colorExciteTime[i] = 0.8;
        this.alpha[i] = 1.0;
      }
      // Vindaloo Chili Sparks
      if (p.chiliSparks > 0.25 && Math.random() < 0.0015 * p.chiliSparks) {
        this.vy[i] -= 2.8;
        this.vx[i] += (Math.random() - 0.5) * 1.5;
        this.colorIdx[i] = 3; // Vindaloo chili crimson
        this.colorExciteTime[i] = 0.8;
        this.alpha[i] = 1.0;
      }

      // ----------------------------------------------------
      // 5. SUBTLE STRUCTURAL CHANGES (DRIVEN BY ALL 4 DIMENSIONS)
      // Modulates anchor spring targets subtly (10-25px) without breaking 30-min base topology
      // ----------------------------------------------------
      let sox = 0;
      let soy = 0;

      // 1. Weather Structural Flex:
      if (p.windSweep > 0.2) {
        const windPower = Math.min(4.0, p.windSweep);
        // Dramatic rolling sweep & elastic dune sway
        sox += (Math.sin(y * 0.0032 + this.time * 2.2) * 58.0 + Math.sin(y * 0.0012 + this.time * 1.0) * 42.0) * (windPower / 2.2);
        soy += (Math.cos(x * 0.003 + this.time * 1.8) * 24.0 - 18.0) * (windPower / 2.2);
      }
      if (p.rainGravity > 0.2) {
        soy += Math.sin(x * 0.008) * 16.0 * (p.rainGravity / 3.4);
      }
      if (p.stormVortex > 0.2) {
        const sang = Math.atan2(y - H * 0.5, x - W * 0.5);
        sox += Math.cos(sang + Math.PI * 0.5) * 18.0 * (p.stormVortex / 3.6);
        soy += Math.sin(sang + Math.PI * 0.5) * 18.0 * (p.stormVortex / 3.6);
      }
      if (p.calmSwell > 0.2) {
        sox += Math.sin(y * 0.005) * 12.0 * (p.calmSwell / 3.2);
        soy += Math.cos(x * 0.005) * 8.0 * (p.calmSwell / 3.2);
      }

      // 2. Food Structural Flex:
      if (p.strataStrength > 0.2) {
        // Bebinca 7-layer horizontal strata consolidation
        soy += Math.sin((this.hy[i] / H) * Math.PI * 7) * 14.0 * (p.strataStrength / 3.5);
      }
      if (p.flowCurvature > 0.2) {
        // Fish curry winding meanders
        sox += Math.sin(y * 0.007) * 14.0 * (p.flowCurvature / 2.5);
      }
      if (p.convectivePulse > 0.2) {
        // Prawn curry convex thermal swell
        soy += Math.cos(x * 0.006) * 12.0 * (p.convectivePulse / 2.5);
      }
      if (p.flourSpeckles > 0.2) {
        // Poe bread airy lofting
        soy -= 10.0 * (p.flourSpeckles / 3.5);
        sox += Math.sin(this.phase[i]) * 8.0 * (p.flourSpeckles / 3.5);
      }
      if (p.chiliSparks > 0.2) {
        // Vindaloo thermal expansion
        sox += Math.sin(x * 0.015) * 10.0 * (p.chiliSparks / 3.5);
        soy -= Math.abs(Math.sin(y * 0.015)) * 10.0 * (p.chiliSparks / 3.5);
      }

      // 3. Location Structural Flex:
      if (p.dudhsagarCascade > 0.2) {
        // Dudhsagar corridor compaction
        if (Math.abs(x - W * 0.5) < W * 0.35) {
          sox += (W * 0.5 - x) * 0.08 * (p.dudhsagarCascade / 3.5);
          soy += 14.0 * (p.dudhsagarCascade / 3.5);
        }
      }
      if (p.aguadaBeacon > 0.2) {
        // Aguada concentric ring ripple alignment
        const adx = x - W * 0.74;
        const ady = y - H * 0.17;
        const adist = Math.hypot(adx, ady) || 1;
        const ringSnap = Math.sin(adist * 0.04) * 12.0 * (p.aguadaBeacon / 3.5);
        sox += (adx / adist) * ringSnap;
        soy += (ady / adist) * ringSnap;
      }
      if (p.fontainhasNodes > 0.2) {
        // Fontainhas architectural cluster rosette
        sox += Math.sin(x * 0.01) * Math.cos(y * 0.01) * 14.0 * (p.fontainhasNodes / 3.5);
        soy += Math.cos(x * 0.01) * Math.sin(y * 0.01) * 14.0 * (p.fontainhasNodes / 3.5);
      }
      if (p.chaporaRidge > 0.2) {
        // Chapora perimeter cliff crest elevation
        soy -= Math.sin(x * 0.005) * 16.0 * (p.chaporaRidge / 3.5);
      }
      if (p.palolemCrescent > 0.2) {
        // Palolem crescent bay concave warp
        const cdx = (x - W * 0.45) / W;
        soy += (cdx * cdx * 120.0) * (p.palolemCrescent / 3.5);
      }
      if (p.caboRamaCape > 0.2) {
        // Cabo de Rama headland convergence
        if (y > H * 0.45) {
          sox += Math.sin(y * 0.006) * 16.0 * (p.caboRamaCape / 3.5);
        }
      }

      // 4. Emblem Structural Flex:
      if (p.wakeRipples > 0.2) {
        // Mandovi boat angled chevron wake
        sox += Math.sign(x - W * 0.5) * 10.0 * (p.wakeRipples / 3.8);
        soy += Math.sin(x * 0.016) * 10.0 * (p.wakeRipples / 3.8);
      }
      if (p.frondTendrils > 0.2) {
        // Coconut palm cascading curve
        soy += Math.sin(x * 0.005) * 12.0 * (p.frondTendrils / 3.6);
        sox += Math.cos(y * 0.005) * 10.0 * (p.frondTendrils / 3.6);
      }
      if (p.turtleSwell > 0.2) {
        // Sea turtle carapace dome
        const tdx = (x - W * 0.5);
        const tdy = (y - H * 0.6);
        const tdist = Math.hypot(tdx, tdy);
        if (tdist < W * 0.35) {
          soy -= (1.0 - tdist / (W * 0.35)) * 14.0 * (p.turtleSwell / 3.6);
        }
      }
      if (p.kingfisherDarts > 0.2) {
        // Kingfisher aerodynamic directional stream
        sox += Math.sin(y * 0.009) * 10.0 * (p.kingfisherDarts / 4.2);
      }
      if (p.carnivalConfetti > 0.2) {
        // Carnival festive radial vibration
        sox += Math.sin(this.phase[i] * 2.5) * 10.0 * (p.carnivalConfetti / 3.8);
        soy += Math.cos(this.phase[i] * 2.5) * 10.0 * (p.carnivalConfetti / 3.8);
      }

      // Integrate damping & expressive home anchor spring
      const dampingFactor = 0.86 - ((p.susegadDamping || 0) * 0.04);
      const ax = ((this.hx[i] + sox) - x) * 0.042;
      const ay = ((this.hy[i] + soy) - y) * 0.042;

      this.vx[i] = (this.vx[i] + fx + ax) * dampingFactor;
      this.vy[i] = (this.vy[i] + fy + ay) * dampingFactor;

      const posStep = 1.0;
      this.px[i] += this.vx[i] * posStep;
      this.py[i] += this.vy[i] * posStep;

      // Reset to base color when transient excitation ends
      if (this.colorExciteTime[i] <= 0 && !isMorphing) {
        this.colorIdx[i] = this.baseColorIdx[i];
      }

      this.alpha[i] = 0.35 + Math.sin(this.phase[i] + this.time * 1.5) * 0.32;
    }
  }

  // Render purely abstract Goan computational artwork
  render() {
    const ctx = this.ctx;
    const W = this.width;
    const H = this.height;
    const p = this.sentimentEngine.currentParameters;

    // 1. Dynamic Background Laterite Gradient
    const bgGrad = ctx.createLinearGradient(0, 0, W, H);
    const bg = this.currentBg;
    bgGrad.addColorStop(0, `rgb(${Math.round(bg[0][0])},${Math.round(bg[0][1])},${Math.round(bg[0][2])})`);
    bgGrad.addColorStop(0.32, `rgb(${Math.round(bg[1][0])},${Math.round(bg[1][1])},${Math.round(bg[1][2])})`);
    bgGrad.addColorStop(0.72, `rgb(${Math.round(bg[2][0])},${Math.round(bg[2][1])},${Math.round(bg[2][2])})`);
    bgGrad.addColorStop(1, `rgb(${Math.round(bg[3][0])},${Math.round(bg[3][1])},${Math.round(bg[3][2])})`);
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, W, H);

    // 2. Solar Halo & Radiant Corona Glow
    const sunX = W * (p.sunX || 0.72);
    const sunY = H * (p.sunY || 0.18);
    const sunRad = p.sunRadius || 180;
    const sunIntensity = p.sunIntensity || 1.2;
    const sg = this.currentSunGlow;

    const sunGlow = ctx.createRadialGradient(sunX, sunY, 15, sunX, sunY, sunRad * 1.9);
    sunGlow.addColorStop(0, `rgba(${Math.round(sg[0])}, ${Math.round(sg[1])}, ${Math.round(sg[2])}, ${0.38 * sunIntensity})`);
    sunGlow.addColorStop(0.45, `rgba(${Math.round(sg[0] * 0.85)}, ${Math.round(sg[1] * 0.55)}, ${Math.round(sg[2] * 0.3)}, ${0.16 * sunIntensity})`);
    sunGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = sunGlow;
    ctx.beginPath();
    ctx.arc(sunX, sunY, sunRad * 1.9, 0, Math.PI * 2);
    ctx.fill();

    // 3. Fort Aguada Lighthouse Rotating Beacon Beam
    if (p.aguadaBeacon > 0.25) {
      ctx.save();
      ctx.translate(sunX, sunY);
      ctx.rotate(this.beaconAngle);
      const beamGrad = ctx.createLinearGradient(0, 0, 900, 0);
      beamGrad.addColorStop(0, `rgba(${Math.round(sg[0])}, ${Math.round(sg[1])}, ${Math.round(sg[2])}, ${0.30 * p.aguadaBeacon})`);
      beamGrad.addColorStop(0.3, `rgba(${Math.round(sg[0])}, ${Math.round(sg[1])}, ${Math.round(sg[2])}, ${0.16 * p.aguadaBeacon})`);
      beamGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = beamGrad;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(900, -80);
      ctx.lineTo(900, 80);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    }

    // 4. Render Points with crisp pointillist pigment blending
    ctx.globalCompositeOperation = 'source-over';

    const N = this.TOTAL_PARTICLES;
    const px = this.px;
    const py = this.py;
    const size = this.size;
    const alpha = this.alpha;
    const colorIdx = this.colorIdx;
    const sprites = this.dotSprites;
    const scale = p.particleSizeScale || 1.0;
    const step = this.particleStep || 1;
    const totalScale = scale * 1.0;

    let lastAlpha = -1;

    for (let i = 0; i < N; i += step) {
      const x = px[i];
      const y = py[i];

      if (x < -20 || x > W + 20 || y < -20 || y > H + 20) continue;

      let a = alpha[i];
      if (a <= 0.05) continue;

      const quantAlpha = Math.round(a * 10) / 10;
      if (quantAlpha !== lastAlpha) {
        ctx.globalAlpha = quantAlpha;
        lastAlpha = quantAlpha;
      }

      const cIdx = colorIdx[i] % 14;
      const spriteSet = sprites[cIdx] || sprites[0];

      const s = size[i] * totalScale;
      let sBracket = 1;
      if (s < 1.4) sBracket = 0;
      else if (s < 2.0) sBracket = 1;
      else if (s < 2.8) sBracket = 2;
      else if (s < 4.0) sBracket = 3;
      else if (s < 5.8) sBracket = 4;
      else if (s < 8.0) sBracket = 5;
      else sBracket = 6;

      const sprite = spriteSet[sBracket];
      const rad = sprite.radius;
      ctx.drawImage(sprite.canvas, x - rad, y - rad);
    }

    // Radiant Chromatic Shockwave Wavefronts
    if (this.shockwaves.length > 0) {
      for (let sw = 0; sw < this.shockwaves.length; sw++) {
        const wave = this.shockwaves[sw];
        if (!wave || wave.radius <= 0) continue;

        const r0 = Math.max(0.1, wave.radius - 80);
        const r1 = Math.max(r0 + 1, wave.radius + 80);
        const rgb = wave.rgb || [255, 215, 0];
        const waveGrad = ctx.createRadialGradient(
          wave.x, wave.y, r0,
          wave.x, wave.y, r1
        );
        waveGrad.addColorStop(0, 'rgba(0,0,0,0)');
        waveGrad.addColorStop(0.5, `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${0.30 * wave.intensity})`);
        waveGrad.addColorStop(1, 'rgba(0,0,0,0)');

        ctx.fillStyle = waveGrad;
        ctx.beginPath();
        ctx.arc(wave.x, wave.y, r1, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    ctx.globalAlpha = 1.0;
    ctx.globalCompositeOperation = 'source-over';
  }

  // Text rendered outside the screen per user design requirements
  renderConclaveHUD(ctx, W, H, p) {
    // Artwork area is kept purely visual with no internal text overlays
  }

  start() {
    if (this.isRunning) return;
    this.isRunning = true;

    let lastTime = performance.now();
    const frameInterval = this.isLP ? (1000 / this.targetFps) : 0;

    const loop = (currentTime) => {
      if (!this.isRunning) return;
      try {
        const delta = currentTime - lastTime;
        if (!frameInterval || delta >= frameInterval) {
          lastTime = frameInterval ? (currentTime - (delta % frameInterval)) : currentTime;
          this.sentimentEngine.update();
          this.update();
          this.render();
        }
      } catch (err) {
        console.error('GoanArtworkEngine render loop error:', err);
      }
      this.animId = requestAnimationFrame(loop);
    };

    this.animId = requestAnimationFrame(loop);
  }

  stop() {
    this.isRunning = false;
    if (this.animId) {
      cancelAnimationFrame(this.animId);
      this.animId = null;
    }
  }

  resize() {
    const oldW = this.width || 1080;
    const oldH = this.height || 1080;
    const rect = this.canvas ? this.canvas.getBoundingClientRect() : null;
    if (rect && rect.width > 0 && rect.height > 0) {
      this.width = Math.round(rect.width);
      this.height = Math.round(rect.height);
    } else {
      this.width = 1080;
      this.height = 1080;
    }
    if (this.canvas) {
      this.canvas.width = this.width;
      this.canvas.height = this.height;
    }
    this.aspectRatio = this.width / this.height;

    // Rescale buffers if dimensions changed and coordinates exist
    if (this.px && (oldW !== this.width || oldH !== this.height)) {
      const scaleX = this.width / oldW;
      const scaleY = this.height / oldH;
      const N = this.TOTAL_PARTICLES;
      for (let i = 0; i < N; i++) {
        this.px[i] *= scaleX;
        this.py[i] *= scaleY;
        this.hx[i] *= scaleX;
        this.hy[i] *= scaleY;
      }
    }
  }

  // Capture current canvas frame at high resolution as base64 JPEG
  captureCurrentFrameSnapshot(format = 'image/jpeg', quality = 0.90) {
    if (!this.canvas) return null;
    return this.canvas.toDataURL(format, quality);
  }

  // Render an authentic offscreen snapshot of any topology with sentiment
  renderTopologySnapshot(topologyIndex = 0, sentimentData = {}, width = 540, height = 960) {
    const offCanvas = document.createElement('canvas');
    offCanvas.width = width;
    offCanvas.height = height;
    const offEngine = new GoanArtworkEngine(offCanvas, this.sentimentEngine);
    if (this.seedPoints && this.seedPoints.length > 0) {
      offEngine.loadSeedPoints({ seed1: this.seedPoints });
    }

    // Set topology directly
    offEngine.generateTopology(
      topologyIndex,
      offEngine.px,
      offEngine.py,
      offEngine.size,
      offEngine.colorIdx,
      offEngine.layer
    );
    offEngine.currentTopology = topologyIndex;
    offEngine.isMorphing = false;

    // Apply sentiment
    const sentimentParams = {
      dominantWeather: sentimentData.dominantWeather || 'sunny',
      dominantFood: sentimentData.dominantFood || 'fish_curry',
      dominantLocation: sentimentData.dominantLocation || 'aguada_fort',
      dominantEmblem: sentimentData.dominantEmblem || 'mandovi_boat'
    };
    offEngine.syncThemePalette(sentimentParams);
    for (let k = 0; k < 42; k++) {
      offEngine.currentPaletteRGB[k] = offEngine.targetPaletteRGB[k];
    }
    for (let k = 0; k < 4; k++) {
      offEngine.currentBg[k] = [...offEngine.targetBg[k]];
    }
    offEngine.currentSunGlow = [...offEngine.targetSunGlow];
    offEngine.rebuildDotSprites();

    // Step a few cycles so particle flow and harmonic undulation settle
    for (let i = 0; i < 15; i++) {
      offEngine.update();
    }
    offEngine.render();

    return offCanvas.toDataURL('image/jpeg', 0.90);
  }
}
