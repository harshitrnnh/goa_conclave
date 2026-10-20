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
      accent: [225, 25, 20],
      p0: [255, 45, 25], p1: [240, 30, 30], p2: [190, 18, 22], p7: [255, 15, 10], p9: [205, 25, 30]
    },
    bebinca: {
      accent: [220, 155, 45],
      p0: [250, 200, 65], p1: [220, 140, 40], p2: [160, 85, 25], p7: [240, 175, 45], p9: [195, 110, 30]
    },
    fish_curry: {
      accent: [245, 180, 25],
      p0: [255, 185, 25], p1: [235, 145, 30], p2: [180, 80, 28], p7: [55, 165, 145], p8: [48, 150, 135]
    },
    prawn_curry: {
      accent: [255, 110, 100],
      p0: [255, 150, 135], p1: [248, 125, 115], p2: [215, 90, 85], p7: [255, 115, 105], p10: [255, 140, 125]
    },
    xacuti: {
      accent: [165, 90, 35],
      p0: [220, 150, 68], p1: [180, 105, 42], p2: [130, 68, 25], p7: [200, 125, 48], p9: [150, 85, 32]
    },
    poe_bread: {
      accent: [245, 225, 180],
      p0: [245, 220, 170], p1: [220, 180, 125], p2: [170, 120, 70], p5: [255, 255, 250], p7: [230, 195, 140]
    }
  },

  location: {
    dudhsagar: {
      accent: [65, 215, 165],
      p0: [210, 245, 250], p1: [145, 220, 235], p5: [255, 255, 255], p8: [48, 165, 115]
    },
    aguada_fort: {
      accent: [255, 215, 55],
      p0: [255, 225, 65], p1: [245, 185, 55], p7: [255, 235, 110]
    },
    fontainhas: {
      accent: [65, 135, 245],
      p1: [250, 180, 45], p2: [225, 55, 80], p7: [70, 135, 240], p8: [235, 65, 140], p10: [245, 140, 45]
    },
    chapora_fort: {
      accent: [205, 45, 35],
      p1: [240, 100, 52], p2: [185, 42, 32], p8: [45, 105, 200]
    },
    palolem_beach: {
      accent: [15, 195, 215],
      p1: [255, 170, 100], p2: [48, 175, 170], p10: [255, 135, 115]
    },
    cabo_de_rama: {
      accent: [229, 138, 66],
      p0: [255, 195, 75], p2: [184, 58, 36], p10: [48, 122, 120]
    },
    old_goa_basilica: {
      accent: [229, 138, 66],
      p0: [255, 195, 75], p2: [184, 58, 36], p10: [48, 122, 120]
    }
  }
};

export class GoanArtworkEngine {
  constructor(canvas, sentimentEngine) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d', { alpha: false });
    this.sentimentEngine = sentimentEngine;

    // Logical resolution (9:16 vertical ratio)
    this.width = 1080;
    this.height = 1920;
    this.aspectRatio = 9 / 16;

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

    this.initBuffers();
    this.initPalette();
    this.createDotSprites();
    this.resize();
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

  // Allocate 14 * 7 offscreen canvases once (added bold 16px size for rich painterly drops)
  createDotSprites() {
    const sizes = [2, 3, 4, 6, 8, 12, 16];
    this.dotSprites = [];
    this.spriteContexts = [];

    for (let c = 0; c < 14; c++) {
      const spriteSet = [];
      const ctxSet = [];
      sizes.forEach(diam => {
        const offCanvas = document.createElement('canvas');
        offCanvas.width = diam * 2;
        offCanvas.height = diam * 2;
        const offCtx = offCanvas.getContext('2d');
        const rad = diam;
        spriteSet.push({ canvas: offCanvas, radius: rad });
        ctxSet.push({ ctx: offCtx, radius: rad, diam: diam });
      });
      this.dotSprites.push(spriteSet);
      this.spriteContexts.push(ctxSet);
    }

    this.rebuildDotSprites(true);
  }

  // Efficiently re-render cached dot sprites with interpolated RGB colors (~0.2ms)
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
        const diam = item.diam;

        offCtx.clearRect(0, 0, diam * 2, diam * 2);
        const grad = offCtx.createRadialGradient(rad, rad, 0, rad, rad, rad);
        grad.addColorStop(0, hex);
        grad.addColorStop(0.55, hex);
        grad.addColorStop(1, 'rgba(0,0,0,0)');

        offCtx.fillStyle = grad;
        offCtx.beginPath();
        offCtx.arc(rad, rad, rad, 0, Math.PI * 2);
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
    const sunY = H * 0.17;
    let idx = 0;

    // 1. Solar Center & Concentric Rings (9,000)
    for (let i = 0; i < 9000; i++) {
      if (i < 2400) {
        const r = Math.pow(Math.random(), 0.5) * 65;
        const angle = Math.random() * Math.PI * 2;
        outX[idx] = sunX + Math.cos(angle) * r;
        outY[idx] = sunY + Math.sin(angle) * r;
        outSize[idx] = 2.0 + Math.random() * 2.8;
        outColor[idx] = (Math.random() > 0.35) ? 0 : 5;
        outLayer[idx] = 0;
      } else if (i < 6500) {
        const ringIdx = Math.floor(Math.random() * 6);
        const radius = 75 + ringIdx * 26 + (Math.random() - 0.5) * 8;
        const angle = Math.random() * Math.PI * 2;
        outX[idx] = sunX + Math.cos(angle) * radius;
        outY[idx] = sunY + Math.sin(angle) * radius;
        outSize[idx] = (ringIdx % 2 === 0) ? 3.2 + Math.random() * 2.4 : 1.8 + Math.random() * 1.6;
        outColor[idx] = (ringIdx === 1 || ringIdx === 3) ? 5 : (ringIdx % 2 === 0 ? 0 : 1);
        outLayer[idx] = 1;
      } else {
        const arm = Math.floor(Math.random() * 16);
        const baseAngle = (arm / 16) * Math.PI * 2;
        const dist = 220 + Math.pow(Math.random(), 0.8) * 240;
        const spiralAngle = baseAngle + (dist / 240) * 0.65;
        outX[idx] = sunX + Math.cos(spiralAngle) * dist + (Math.random() - 0.5) * 18;
        outY[idx] = sunY + Math.sin(spiralAngle) * dist + (Math.random() - 0.5) * 18;
        outSize[idx] = 1.4 + Math.random() * 2.2;
        outColor[idx] = (Math.random() > 0.5) ? 1 : (Math.random() > 0.5 ? 3 : 0);
        outLayer[idx] = 1;
      }
      idx++;
    }

    // 2. Flowing S-Curves & River Strata (24,000)
    for (let i = 0; i < 24000; i++) {
      const progress = Math.random();
      const baseY = progress * H;
      const wave1 = Math.sin(progress * Math.PI * 3.4 + 0.3) * 290;
      const wave2 = Math.cos(progress * Math.PI * 1.6 - 0.2) * 160;
      const baseX = W * 0.52 + wave1 + wave2;

      const spread = (Math.random() - 0.5) * 380 * (1.1 - progress * 0.25);
      outX[idx] = baseX + spread;
      outY[idx] = baseY + (Math.random() - 0.5) * 45;
      outSize[idx] = 1.3 + Math.random() * 2.8;
      outLayer[idx] = 2;

      const band = Math.floor(Math.abs(spread) / 36) % 7;
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
    const sunX = W * 0.82;
    const sunY = H * 0.11;
    let idx = 0;

    // 1. Terracotta Sun Disc & Halo (4,500)
    for (let i = 0; i < 4500; i++) {
      const r = Math.pow(Math.random(), 0.5) * 85;
      const angle = Math.random() * Math.PI * 2;
      outX[idx] = sunX + Math.cos(angle) * r;
      outY[idx] = sunY + Math.sin(angle) * r;
      outSize[idx] = (Math.random() < 0.25) ? 4.5 + Math.random() * 4.0 : 1.8 + Math.random() * 2.2;
      outColor[idx] = (Math.random() < 0.6) ? 1 : (Math.random() < 0.5 ? 0 : 3); // Amber, Gold, Terracotta
      outLayer[idx] = 0;
      idx++;
    }

    // 2. Arabian Sea Oceanic Current (16,000)
    // Sweeps from upper right down across center to lower left in deep teal & silver foam
    for (let i = 0; i < 16000; i++) {
      const progress = Math.random();
      const baseY = progress * H;
      const wave = Math.sin(progress * Math.PI * 2.8 + 0.2) * 320 + Math.cos(progress * Math.PI * 1.4) * 160;
      const baseX = W * 0.48 + wave;

      const spread = (Math.random() - 0.5) * 340;
      outX[idx] = baseX + spread;
      outY[idx] = baseY + (Math.random() - 0.5) * 55;
      outLayer[idx] = 2;

      // Variable dot scales matching the reference painting: bold drops vs fine stipples
      const rScale = Math.random();
      if (rScale < 0.14) {
        outSize[idx] = 7.5 + Math.random() * 6.5; // Bold painterly drop!
      } else if (rScale < 0.48) {
        outSize[idx] = 3.6 + Math.random() * 3.2; // Medium dot
      } else {
        outSize[idx] = 1.4 + Math.random() * 1.8; // Fine spray
      }

      // Alternating oceanic teal, aquamarine, silver foam, and deep slate
      const band = Math.floor(Math.abs(spread) / 40) % 5;
      if (band === 0) outColor[idx] = 8;       // Vibrant Aquamarine
      else if (band === 1) outColor[idx] = 10; // Crystal Sea Spray
      else if (band === 2) outColor[idx] = 7;  // Deep Marine Teal
      else if (band === 3) outColor[idx] = 9;  // Seafoam Turquoise
      else outColor[idx] = 11;                 // Abyssal Slate
      idx++;
    }

    // 3. Laterite Fire Current (15,000)
    // Intertwines from upper left through center to lower right in fiery crimson & marigold
    for (let i = 0; i < 15000; i++) {
      const progress = Math.random();
      const baseY = progress * H;
      const wave = -Math.sin(progress * Math.PI * 2.9 + 0.4) * 310 - Math.cos(progress * Math.PI * 1.5 - 0.3) * 150;
      const baseX = W * 0.52 + wave;

      const spread = (Math.random() - 0.5) * 340;
      outX[idx] = baseX + spread;
      outY[idx] = baseY + (Math.random() - 0.5) * 55;
      outLayer[idx] = 2;

      const rScale = Math.random();
      if (rScale < 0.14) {
        outSize[idx] = 8.0 + Math.random() * 7.0; // Bold fiery drop!
      } else if (rScale < 0.48) {
        outSize[idx] = 3.6 + Math.random() * 3.4;
      } else {
        outSize[idx] = 1.5 + Math.random() * 1.8;
      }

      // Fiery vermilion, kashmiri chili, marigold, terracotta, and caramel
      const band = Math.floor(Math.abs(spread) / 40) % 5;
      if (band === 0) outColor[idx] = 1;       // Fiery Vermilion
      else if (band === 1) outColor[idx] = 0;  // 24k Sun Gold
      else if (band === 2) outColor[idx] = 2;  // Terracotta Ochre
      else if (band === 3) outColor[idx] = 12; // Hot Chili Spark
      else outColor[idx] = 4;                  // Spiced Caramel
      idx++;
    }

    // 4. Concentric Swirling Eddy Vortices (remaining particles)
    // Recreates the circular concentric ripples in upper-left and lower-right
    while (idx < N) {
      const isUpper = (idx % 2 === 0);
      const vcx = isUpper ? W * 0.18 : W * 0.84;
      const vcy = isUpper ? H * 0.22 : H * 0.82;
      const ring = Math.floor(Math.random() * 8);
      const r = 40 + ring * 32 + (Math.random() - 0.5) * 14;
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

      const rwTheme = THEME_PALETTES.weather[rwKey] || wTheme;
      const rfTheme = THEME_PALETTES.food[rfKey] || fTheme;
      const rlTheme = THEME_PALETTES.location[rlKey] || lTheme;

      const inpPalette = new Float32Array(42);
      for (let i = 0; i < 14; i++) {
        const rgb = rwTheme.p[i];
        const base = i * 3;
        inpPalette[base] = rgb[0];
        inpPalette[base + 1] = rgb[1];
        inpPalette[base + 2] = rgb[2];
      }

      for (const [key, rgb] of Object.entries(rfTheme)) {
        if (key.startsWith('p')) {
          const idx = parseInt(key.substring(1), 10);
          if (idx >= 0 && idx < 14) {
            const base = idx * 3;
            inpPalette[base] = inpPalette[base] * 0.2 + rgb[0] * 0.8;
            inpPalette[base + 1] = inpPalette[base + 1] * 0.2 + rgb[1] * 0.8;
            inpPalette[base + 2] = inpPalette[base + 2] * 0.2 + rgb[2] * 0.8;
          }
        }
      }

      for (const [key, rgb] of Object.entries(rlTheme)) {
        if (key.startsWith('p')) {
          const idx = parseInt(key.substring(1), 10);
          if (idx >= 0 && idx < 14) {
            const base = idx * 3;
            inpPalette[base] = inpPalette[base] * 0.3 + rgb[0] * 0.7;
            inpPalette[base + 1] = inpPalette[base + 1] * 0.3 + rgb[1] * 0.7;
            inpPalette[base + 2] = inpPalette[base + 2] * 0.3 + rgb[2] * 0.7;
          }
        }
      }

      const inpBg = rwTheme.bg.map(h => this.hexToRgb(h));
      const inpSun = [...rwTheme.sunHalo];

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
    }

    // When Topology 1 (Intertwined Marine & Fire Strata) is active:
    // Faithfully preserve the dual contrast between the Arabian Sea teal/aquamarine current
    // and the laterite vermilion fire current as seen in the reference painting
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
        // Blend 82% authentic reference color with 18% crowd sentiment dynamics
        this.targetPaletteRGB[base] = rgb[0] * 0.82 + this.targetPaletteRGB[base] * 0.18;
        this.targetPaletteRGB[base + 1] = rgb[1] * 0.82 + this.targetPaletteRGB[base + 1] * 0.18;
        this.targetPaletteRGB[base + 2] = rgb[2] * 0.82 + this.targetPaletteRGB[base + 2] * 0.18;
      }
      this.targetBg = [
        [38, 14, 9],     // Upper Right: Warm Laterite Umber around the Sun
        [18, 30, 38],    // Mid Upper: Interlocking currents
        [12, 38, 48],    // Mid Lower: Deep Arabian Sea
        [8, 20, 26]      // Bottom: Abyssal ocean floor
      ];
      this.targetSunGlow = [242, 108, 38]; // Terracotta solar disc glow
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

    // 1. Tightly couple animation movement and physical forces in sentimentEngine
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
      p.dudhsagarCascade = 0;
      p.aguadaBeacon = 0;
      p.fontainhasNodes = 0;
      p.palolemCrescent = 0;
      p.wakeRipples = 0;
      p.kingfisherDarts = 0;
      p.frondTendrils = 0;
      p.turtleSwell = 0;

      // Weather atmospheric physics
      if (wKey === 'sunny') {
        p.flowSpeed = 1.7;
        p.turbulence = 0.85;
        p.sunRadius = 1.6;
        p.sunPulseSpeed = 2.2;
        p.sunIntensity = 1.7;
      } else if (wKey === 'windy') {
        p.windSweep = 3.0;
        p.biasX = 1.3;
        p.biasY = -0.4;
        p.flowSpeed = 2.1;
        p.turbulence = 1.6;
      } else if (wKey === 'rainy') {
        p.rainGravity = 3.2;
        p.biasX = 0;
        p.biasY = 1.8;
        p.flowSpeed = 1.9;
        p.turbulence = 0.7;
      } else if (wKey === 'stormy') {
        p.stormVortex = 3.4;
        p.turbulence = 3.0;
        p.flowSpeed = 2.5;
        p.chiliSparks = 2.8;
      } else if (wKey === 'calm') {
        p.calmSwell = 3.0;
        p.susegadDamping = 2.4;
        p.flowSpeed = 0.45;
        p.turbulence = 0.25;
      }

      // Food texture & structure
      if (fKey === 'bebinca') {
        p.strataStrength = 3.4;
        p.particleSizeScale = 1.45;
      } else if (fKey === 'vindaloo') {
        p.chiliSparks = 3.4;
        p.emberDensity = 3.2;
      } else if (fKey === 'poe_bread') {
        p.flourSpeckles = 3.4;
        p.particleSizeScale = 0.85;
      } else if (fKey === 'fish_curry') {
        p.particleSizeScale = 1.3;
        p.curlScale = 0.0036;
      } else if (fKey === 'prawn_curry') {
        p.emberDensity = 2.0;
        p.particleSizeScale = 1.25;
      } else if (fKey === 'xacuti') {
        p.flourSpeckles = 0.8;
        p.curlScale = 0.0042;
      }

      // Location spatial geometry
      if (lKey === 'dudhsagar') p.dudhsagarCascade = 3.4;
      if (lKey === 'aguada_fort') p.aguadaBeacon = 3.4;
      if (lKey === 'fontainhas') p.fontainhasNodes = 3.2;
      if (lKey === 'palolem_beach') p.palolemCrescent = 3.2;
      if (lKey === 'chapora_fort') p.chaporaRidge = 3.2;

      // Emblem kinetic signatures
      if (eKey === 'kingfisher') p.kingfisherDarts = 4.0;
      if (eKey === 'mandovi_boat') p.wakeRipples = 3.6;
      if (eKey === 'sea_turtle') p.turtleSwell = 3.4;
      if (eKey === 'coconut_tree' || eKey === 'coconut_palm') p.frondTendrils = 3.4;
      if (eKey === 'sea_shell') { p.stormVortex = 1.8; p.calmSwell = 1.5; }
    }

    // 3. Chromatic Dominance
    this.recentInput = {
      weather: wKey,
      food: fKey,
      location: lKey,
      emblem: eKey,
      weight: 1.0
    };
    this.paletteDirty = true;

    // 4. Custom Thematic Shockwave & Directional Particle Burst
    let burstOriginX = W * 0.5;
    let burstOriginY = H * 0.5;
    let burstDirection = -Math.PI * 0.5;

    if (lKey === 'dudhsagar') {
      burstOriginX = W * 0.5;
      burstOriginY = H * 0.06;
      burstDirection = Math.PI * 0.5; // Downward plunge
    } else if (lKey === 'aguada_fort') {
      burstOriginX = W * 0.74;
      burstOriginY = H * 0.17;
      burstDirection = Math.random() * Math.PI * 2;
    } else if (lKey === 'palolem_beach') {
      burstOriginX = W * 0.45;
      burstOriginY = H * 0.85;
      burstDirection = -Math.PI * 0.55;
    } else if (wKey === 'windy') {
      burstOriginX = W * 0.12;
      burstOriginY = H * 0.88;
      burstDirection = -Math.PI * 0.25; // Diagonal sweep
    } else if (wKey === 'rainy') {
      burstOriginX = W * (0.25 + Math.random() * 0.5);
      burstOriginY = H * 0.04;
      burstDirection = Math.PI * 0.5; // Downward rain
    } else if (fKey === 'bebinca') {
      burstOriginX = W * 0.5;
      burstOriginY = H * 0.65;
      burstDirection = 0; // Horizontal strata ripple
    }

    // Signature color for the shockwave
    let signatureColorIdx = 0;
    let signatureRGB = [255, 215, 0];
    if (wKey === 'rainy') { signatureColorIdx = 1; signatureRGB = [75, 185, 195]; }
    else if (wKey === 'stormy' || fKey === 'vindaloo') { signatureColorIdx = 7; signatureRGB = [245, 45, 25]; }
    else if (fKey === 'bebinca') { signatureColorIdx = 9; signatureRGB = [225, 160, 45]; }
    else if (fKey === 'prawn_curry') { signatureColorIdx = 10; signatureRGB = [255, 120, 110]; }
    else if (eKey === 'kingfisher') { signatureColorIdx = 1; signatureRGB = [38, 166, 154]; }
    else if (lKey === 'dudhsagar') { signatureColorIdx = 8; signatureRGB = [50, 195, 150]; }
    else if (lKey === 'fontainhas') { signatureColorIdx = 11; signatureRGB = [70, 135, 240]; }

    // Chromatic Shockwave
    this.shockwaves.push({
      x: burstOriginX,
      y: burstOriginY,
      radius: 0,
      maxRadius: Math.hypot(W, H) * 1.2,
      speed: 44,
      colorIdx: signatureColorIdx,
      rgb: signatureRGB,
      thickness: 220,
      intensity: 1.0
    });

    // High-energy particles launching in the signature direction
    let spawned = 0;
    const maxSpawn = 420;
    for (let i = 0; i < this.TOTAL_PARTICLES && spawned < maxSpawn; i++) {
      if ((this.layer[i] === 3 || this.layer[i] === 2) && Math.random() < 0.35) {
        this.layer[i] = 4;
        this.px[i] = burstOriginX + (Math.random() - 0.5) * 90;
        this.py[i] = burstOriginY + (Math.random() - 0.5) * 90;

        const angle = burstDirection + (Math.random() - 0.5) * 1.2;
        const speed = 10.0 + Math.random() * 18.0;
        this.vx[i] = Math.cos(angle) * speed;
        this.vy[i] = Math.sin(angle) * speed;
        this.size[i] = 3.6 + Math.random() * 4.4;
        this.alpha[i] = 1.0;
        this.colorIdx[i] = signatureColorIdx;

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
    this.time += 0.016;
    const p = this.sentimentEngine.currentParameters;
    const W = this.width;
    const H = this.height;

    // Decay recent input chromatic dominance smoothly
    if (this.recentInput && this.recentInput.weight > 0) {
      this.recentInput.weight = Math.max(0, this.recentInput.weight - 0.0028);
    }

    // Sync collective theme palette with current sentiment & input burst
    this.syncThemePalette(p);

    // Smoothly glide active palette RGBs toward target
    let maxDelta = 0;
    const lerpSpeed = (this.recentInput && this.recentInput.weight > 0.5) ? 0.12 : 0.07;
    for (let k = 0; k < 42; k++) {
      const diff = this.targetPaletteRGB[k] - this.currentPaletteRGB[k];
      this.currentPaletteRGB[k] += diff * lerpSpeed;
      const absDiff = Math.abs(diff);
      if (absDiff > maxDelta) maxDelta = absDiff;
    }

    // Smoothly glide background stops & sun glow
    for (let k = 0; k < 4; k++) {
      for (let c = 0; c < 3; c++) {
        this.currentBg[k][c] += (this.targetBg[k][c] - this.currentBg[k][c]) * 0.05;
      }
    }
    for (let c = 0; c < 3; c++) {
      this.currentSunGlow[c] += (this.targetSunGlow[c] - this.currentSunGlow[c]) * 0.05;
    }

    if (maxDelta > 0.8 || this.paletteDirty) {
      this.rebuildDotSprites();
      this.paletteDirty = false;
    }

    // Advance chromatic shockwaves
    for (let sw = this.shockwaves.length - 1; sw >= 0; sw--) {
      const wave = this.shockwaves[sw];
      wave.radius += wave.speed;
      wave.intensity *= 0.985;
      if (wave.radius > wave.maxRadius || wave.intensity < 0.04) {
        this.shockwaves.splice(sw, 1);
      }
    }

    // Handle 30-Minute Cycle Structural Morphing
    let morphT = 1.0;
    let isMorphing = this.isMorphing;
    if (isMorphing) {
      this.morphProgress += 0.016 / this.morphDuration;
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

    const flowSpeed = p.flowSpeed || 1.1;
    const turbulence = p.turbulence || 1.0;
    const sunX = (this.currentTopology === 1) ? W * 0.82 : W * (p.sunX || 0.72);
    const sunY = (this.currentTopology === 1) ? H * 0.11 : H * (p.sunY || 0.18);
    const sunPulse = Math.sin(this.time * 2.2 * (p.sunPulseSpeed || 1.0)) * 0.15 + 1.0;

    this.beaconAngle += 0.025 * (p.aguadaBeacon > 0.2 ? 1.0 : 0.4);

    const N = this.TOTAL_PARTICLES;
    const hasWaves = this.shockwaves.length > 0;

    for (let i = 0; i < N; i++) {
      const layer = this.layer[i];

      // Update morphing anchor target if actively morphing between 30-min cycles
      if (isMorphing) {
        const swirlX = Math.sin(this.phase[i] + this.time * 2.6) * Math.sin(morphT * Math.PI) * 45.0;
        const swirlY = Math.cos(this.phase[i] + this.time * 2.2) * Math.sin(morphT * Math.PI) * 45.0;
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
        this.colorExciteTime[i] -= 0.014;
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
        const orbitOffset = (this.time * 0.18 * flowSpeed + this.phase[i]) * 0.05;
        const curAngle = baseAngle + orbitOffset;

        const dynamicRad = dist * sunPulse + Math.sin(this.time * 1.5 + this.phase[i]) * 6.0;
        const targetX = sunX + Math.cos(curAngle) * dynamicRad;
        const targetY = sunY + Math.sin(curAngle) * dynamicRad;

        this.px[i] += (targetX - this.px[i]) * 0.08;
        this.py[i] += (targetY - this.py[i]) * 0.08;

        this.alpha[i] = 0.55 + Math.sin(this.phase[i] + this.time * 3.0 * (p.sunPulseSpeed || 1.0)) * 0.35;
        continue;
      }

      // ==========================================
      // Layers 2 & 3: River Meanders & Laterite Field
      // ==========================================
      const x = this.px[i];
      const y = this.py[i];

      // Organic Curl Noise Flow
      const nx = x * (p.curlScale || 0.0022) + this.time * 0.08 * flowSpeed;
      const ny = y * ((p.curlScale || 0.0022) * 0.75) + this.time * 0.06 * flowSpeed;
      const fieldAngle = Math.sin(nx * 2.8) * Math.cos(ny * 2.2) * Math.PI * 2 * turbulence;

      let fx = Math.cos(fieldAngle) * 0.75 * flowSpeed;
      let fy = Math.sin(fieldAngle) * 0.75 * flowSpeed;

      // Weather Waves
      if (p.windSweep > 0.2) {
        fx += (Math.sin(this.time * 2.2 + y * 0.003) * 1.4 + 0.6) * p.windSweep;
      }
      if (p.rainGravity > 0.2) {
        fy += (Math.sin(this.phase[i] + this.time * 4.0) * 0.8 + 0.9) * p.rainGravity;
      }
      if (p.calmSwell > 0.2) {
        fy += Math.sin(this.time * 1.2 + x * 0.004) * 1.2 * p.calmSwell;
        fx *= (1.0 - p.calmSwell * 0.25);
      }

      // Location Harmonics
      if (p.dudhsagarCascade > 0.25) {
        fy += (Math.sin(x * 0.01 + this.time * 2.5) * 0.6 + 1.1) * p.dudhsagarCascade;
      }
      if (p.palolemCrescent > 0.25) {
        fy += Math.sin(x * 0.006 + this.time * 1.8) * 1.4 * p.palolemCrescent;
      }
      if (p.chaporaRidge > 0.25) {
        fy -= (Math.cos(x * 0.005 + this.time * 1.5) * 0.8 + 0.6) * p.chaporaRidge;
      }
      if (p.caboRamaCape > 0.25 || p.basilicaSymmetry > 0.25) {
        fy -= (Math.sin(x * 0.007 + this.time * 2.2) * 0.6 + 0.8) * (p.caboRamaCape || p.basilicaSymmetry || 0);
      }

      // Emblem Kinetics
      if (p.wakeRipples > 0.25) {
        fy += Math.sin(x * 0.018 + this.time * 4.0) * 1.2 * p.wakeRipples;
      }
      if (p.frondTendrils > 0.25) {
        fx += Math.cos(y * 0.008 + this.time * 2.0) * 1.0 * p.frondTendrils;
      }
      if (p.kingfisherDarts > 0.35 && Math.random() < 0.002) {
        this.vx[i] += (Math.random() - 0.4) * 8.0 * p.kingfisherDarts;
        this.alpha[i] = 1.0;
      }

      const dampingFactor = 0.88 - ((p.susegadDamping || 0) * 0.06);
      const ax = (this.hx[i] - x) * 0.055;
      const ay = (this.hy[i] - y) * 0.055;

      this.vx[i] = (this.vx[i] + fx + ax) * dampingFactor;
      this.vy[i] = (this.vy[i] + fy + ay) * dampingFactor;

      this.px[i] += this.vx[i];
      this.py[i] += this.vy[i];

      // Food Stratification Mapping (Bebinca 7-layer Bands & Vindaloo Sparks)
      if (this.colorExciteTime[i] <= 0 && !isMorphing) {
        if (p.strataStrength > 0.4 && layer === 2) {
          const bandIndex = Math.floor((this.hy[i] / H) * 7) % 7;
          if (bandIndex === 0) this.colorIdx[i] = 0;
          else if (bandIndex === 1) this.colorIdx[i] = 9;
          else if (bandIndex === 2) this.colorIdx[i] = 4;
          else if (bandIndex === 3) this.colorIdx[i] = 1;
          else if (bandIndex === 4) this.colorIdx[i] = 9;
          else if (bandIndex === 5) this.colorIdx[i] = 2;
          else this.colorIdx[i] = 5;
        } else {
          this.colorIdx[i] = this.baseColorIdx[i];
        }

        if (p.chiliSparks > 0.3 && Math.random() < 0.0008 * p.chiliSparks) {
          this.vy[i] -= 5.0;
          this.colorIdx[i] = 7;
          this.alpha[i] = 1.0;
        }
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

    // 4. Render 42,000 Points using high-performance cached sprites
    ctx.globalCompositeOperation = 'lighter';

    const N = this.TOTAL_PARTICLES;
    const px = this.px;
    const py = this.py;
    const size = this.size;
    const alpha = this.alpha;
    const colorIdx = this.colorIdx;
    const sprites = this.dotSprites;
    const scale = p.particleSizeScale || 1.0;

    for (let i = 0; i < N; i++) {
      const x = px[i];
      const y = py[i];

      if (x < -20 || x > W + 20 || y < -20 || y > H + 20) continue;

      const a = alpha[i];
      if (a <= 0.05) continue;

      ctx.globalAlpha = Math.min(1.0, a);
      const cIdx = colorIdx[i] % 14;
      const spriteSet = sprites[cIdx] || sprites[0];

      const s = size[i] * scale;
      let sBracket = 1;
      if (s < 1.4) sBracket = 0;
      else if (s < 2.2) sBracket = 1;
      else if (s < 3.2) sBracket = 2;
      else if (s < 5.0) sBracket = 3;
      else if (s < 7.5) sBracket = 4;
      else if (s < 11.0) sBracket = 5;
      else sBracket = 6;

      const sprite = spriteSet[sBracket];
      const rad = sprite.radius;
      ctx.drawImage(sprite.canvas, x - rad, y - rad);
    }

    // Radiant Chromatic Shockwave Wavefronts
    if (this.shockwaves.length > 0) {
      for (let sw = 0; sw < this.shockwaves.length; sw++) {
        const wave = this.shockwaves[sw];
        const rgb = wave.rgb || [255, 215, 0];
        const waveGrad = ctx.createRadialGradient(
          wave.x, wave.y, Math.max(1, wave.radius - 80),
          wave.x, wave.y, wave.radius + 80
        );
        waveGrad.addColorStop(0, 'rgba(0,0,0,0)');
        waveGrad.addColorStop(0.5, `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${0.30 * wave.intensity})`);
        waveGrad.addColorStop(1, 'rgba(0,0,0,0)');

        ctx.fillStyle = waveGrad;
        ctx.beginPath();
        ctx.arc(wave.x, wave.y, wave.radius + 80, 0, Math.PI * 2);
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

    const loop = () => {
      if (!this.isRunning) return;
      this.sentimentEngine.update();
      this.update();
      this.render();
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
    this.canvas.width = this.width;
    this.canvas.height = this.height;
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
