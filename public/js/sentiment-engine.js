// Sentiment Synthesis Engine for Goa Conclave
// Maps audience survey responses across 4 dimensions into continuous generative parameters:
// 1. Weather -> Physics, Vector Field, Solar Dynamics & Turbulence
// 2. Food -> Color Palette, Stratification Bands & Particle Textures
// 3. Location -> Macro Spatial Topology & Density Fields
// 4. Emblem -> Micro-Dynamics & Kinetic Dispersion

export class SentimentEngine {
  constructor() {
    this.currentParameters = this.getDefaultParameters();
    this.targetParameters = this.getDefaultParameters();
    this.transitionProgress = 1.0;
    this.transitionSpeed = 0.018; // Smooth morph over ~2.5 seconds
  }

  getDefaultParameters() {
    return {
      // 1. Weather Dynamics (Physics & Flow Field)
      flowSpeed: 1.1,
      turbulence: 1.0,
      curlScale: 0.0022,
      biasX: 0.15,
      biasY: -0.05,
      rainGravity: 0.0,
      windSweep: 0.0,
      stormVortex: 0.0,
      calmSwell: 0.0,

      // Solar Center Motif (Goan Sun)
      sunX: 0.72,
      sunY: 0.18,
      sunRadius: 180,
      sunIntensity: 1.2,
      sunPulseSpeed: 1.0,

      // 2. Food & Flavor (Palette, Stratification & Textures)
      emberDensity: 0.1,
      chiliSparks: 0.0,
      strataStrength: 0.0,   // Bebinca 7-layer stratification
      flourSpeckles: 0.0,    // Poe bread dust
      particleSizeScale: 1.0,
      palette: [
        { r: 242, g: 194, b: 73, weight: 0.35, name: 'Sun Gold' },       // #F2C249
        { r: 184, g: 58,  b: 36, weight: 0.30, name: 'Laterite Rust' },   // #B83A24
        { r: 221, g: 104, b: 41, weight: 0.15, name: 'Terracotta' },      // #DD6829
        { r: 255, g: 245, b: 230, weight: 0.10, name: 'Coconut Ivory' },  // #FFF5E6
        { r: 42,  g: 18,  b: 14, weight: 0.10, name: 'Deep Umber' }       // #2A120E
      ],

      // 3. Location (Macro Spatial Topology & Attraction Fields)
      dudhsagarCascade: 0.0, // Vertical waterfall corridor
      aguadaBeacon: 0.0,     // Concentric lighthouse rings & rotating beam
      fontainhasNodes: 0.0,  // High-vibrance architectural cluster nodes
      chaporaRidge: 0.0,     // Clifftop perimeter ridge
      palolemCrescent: 0.0,  // Sweeping coastal crescent bay arc
      caboRamaCape: 0.0,     // Dramatic clifftop cape & thermal updrafts

      // 4. Cultural Emblem (Micro-Dynamics & Dispersion)
      wakeRipples: 0.0,      // Mandovi boat wake waves
      frondTendrils: 0.0,    // Coconut palm drooping fronds
      turtleSwell: 0.0,      // Deep rhythmic oceanic breathing
      kingfisherDarts: 0.0,  // Agile turquoise dart streaks
      carnivalConfetti: 0.0, // Celebratory spark micro-bursts
      susegadDamping: 0.0,   // Viscous serene equilibrium

      // Dominant Categorical Metadata
      dominantWeather: 'sunny',
      dominantFood: 'fish_curry',
      dominantLocation: 'aguada_fort',
      dominantEmblem: 'mandovi_boat',
      weatherBreakdown: {},
      foodBreakdown: {},
      locationBreakdown: {},
      emblemBreakdown: {},
      totalCount: 0
    };
  }

  // Synthesize audience survey responses into target generative parameters
  synthesizeSession(sessionData) {
    const responses = sessionData.responses || [];
    const weatherCounts = { sunny: 0, windy: 0, rainy: 0, stormy: 0, calm: 0 };
    const foodCounts = { fish_curry: 0, prawn_curry: 0, vindaloo: 0, xacuti: 0, bebinca: 0, poe_bread: 0 };
    const locationCounts = { dudhsagar: 0, aguada_fort: 0, fontainhas: 0, chapora_fort: 0, palolem_beach: 0, cabo_de_rama: 0 };
    const emblemCounts = { mandovi_boat: 0, coconut_palm: 0, sea_turtle: 0, kingfisher: 0, carnival_spirit: 0, susegad: 0 };

    responses.forEach(r => {
      if (weatherCounts[r.weather] !== undefined) weatherCounts[r.weather]++;
      if (foodCounts[r.food] !== undefined) foodCounts[r.food]++;
      if (locationCounts[r.location] !== undefined) {
        locationCounts[r.location]++;
      } else if (r.location === 'old_goa_basilica') {
        locationCounts.cabo_de_rama++;
      }
      if (emblemCounts[r.emblem] !== undefined) emblemCounts[r.emblem]++;
    });

    const total = responses.length || 1;
    const wDist = {
      sunny: weatherCounts.sunny / total,
      windy: weatherCounts.windy / total,
      rainy: weatherCounts.rainy / total,
      stormy: weatherCounts.stormy / total,
      calm: weatherCounts.calm / total
    };

    const fDist = {
      fish_curry: foodCounts.fish_curry / total,
      prawn_curry: foodCounts.prawn_curry / total,
      vindaloo: foodCounts.vindaloo / total,
      xacuti: foodCounts.xacuti / total,
      bebinca: foodCounts.bebinca / total,
      poe_bread: foodCounts.poe_bread / total
    };

    const lDist = {
      dudhsagar: locationCounts.dudhsagar / total,
      aguada_fort: locationCounts.aguada_fort / total,
      fontainhas: locationCounts.fontainhas / total,
      chapora_fort: locationCounts.chapora_fort / total,
      palolem_beach: locationCounts.palolem_beach / total,
      cabo_de_rama: locationCounts.cabo_de_rama / total
    };

    const eDist = {
      mandovi_boat: emblemCounts.mandovi_boat / total,
      coconut_palm: emblemCounts.coconut_palm / total,
      sea_turtle: emblemCounts.sea_turtle / total,
      kingfisher: emblemCounts.kingfisher / total,
      carnival_spirit: emblemCounts.carnival_spirit / total,
      susegad: emblemCounts.susegad / total
    };

    // Find dominants
    let dominantWeather = 'sunny';
    let maxW = -1;
    for (const [k, v] of Object.entries(weatherCounts)) {
      if (v > maxW) { maxW = v; dominantWeather = k; }
    }

    let dominantFood = 'fish_curry';
    let maxF = -1;
    for (const [k, v] of Object.entries(foodCounts)) {
      if (v > maxF) { maxF = v; dominantFood = k; }
    }

    let dominantLocation = 'aguada_fort';
    let maxL = -1;
    for (const [k, v] of Object.entries(locationCounts)) {
      if (v > maxL) { maxL = v; dominantLocation = k; }
    }

    let dominantEmblem = 'mandovi_boat';
    let maxE = -1;
    for (const [k, v] of Object.entries(emblemCounts)) {
      if (v > maxE) { maxE = v; dominantEmblem = k; }
    }

    const target = this.getDefaultParameters();
    target.totalCount = responses.length;
    target.dominantWeather = dominantWeather;
    target.dominantFood = dominantFood;
    target.dominantLocation = dominantLocation;
    target.dominantEmblem = dominantEmblem;
    target.weatherBreakdown = weatherCounts;
    target.foodBreakdown = foodCounts;
    target.locationBreakdown = locationCounts;
    target.emblemBreakdown = emblemCounts;

    // ==========================================
    // 1. WEATHER MAPPINGS (Physics, Flow & Solar)
    // ==========================================
    // Flow Speed & Turbulence
    target.flowSpeed = 0.5 + (wDist.sunny * 0.9) + (wDist.windy * 1.5) + (wDist.stormy * 1.8) - (wDist.calm * 0.3);
    target.turbulence = 0.3 + (wDist.stormy * 2.2) + (wDist.windy * 0.8) - (wDist.calm * 0.25);
    target.curlScale = 0.0018 + (wDist.stormy * 0.0035) + (wDist.windy * 0.0012);

    // Directional Biases & Physical Forces
    target.windSweep = wDist.windy * 2.4;
    target.rainGravity = wDist.rainy * 2.2;
    target.stormVortex = wDist.stormy * 2.5;
    target.calmSwell = wDist.calm * 1.8;

    target.biasX = (wDist.windy * 2.2) + (wDist.sunny * 0.2) - (wDist.rainy * 0.3);
    target.biasY = (wDist.rainy * 2.0) - (wDist.windy * 0.4) - (wDist.sunny * 0.1);

    // Solar Center & Corona
    target.sunRadius = 130 + (wDist.sunny * 140) + (lDist.aguada_fort * 60) - (wDist.rainy * 40);
    target.sunIntensity = 0.7 + (wDist.sunny * 1.5) - (wDist.stormy * 0.3) - (wDist.rainy * 0.4);
    target.sunPulseSpeed = 0.6 + (wDist.sunny * 1.4) + (wDist.stormy * 1.2);

    // ==========================================
    // 2. FOOD MAPPINGS (Palette, Stratification & Textures)
    // ==========================================
    target.emberDensity = 0.05 + (fDist.vindaloo * 0.5) + (eDist.carnival_spirit * 0.3);
    target.chiliSparks = fDist.vindaloo * 1.8;
    target.strataStrength = fDist.bebinca * 2.2; // 7 distinct stratified caramel bands
    target.flourSpeckles = fDist.poe_bread * 1.5;
    target.particleSizeScale = 0.85 + (fDist.fish_curry * 0.3) + (fDist.poe_bread * 0.25);

    // Rich Goan Palette Weighted by Food & Weather Votes
    const palette = [];
    palette.push({ r: 184, g: 58, b: 36, weight: 0.25, name: 'Goan Laterite Rust' });

    if (fDist.vindaloo > 0) {
      palette.push({ r: 178, g: 26, b: 26, weight: fDist.vindaloo * 0.55, name: 'Vindaloo Chili Crimson' });
      palette.push({ r: 232, g: 55, b: 35, weight: fDist.vindaloo * 0.35, name: 'Fiery Paprika' });
    }
    if (fDist.fish_curry > 0) {
      palette.push({ r: 235, g: 168, b: 35, weight: fDist.fish_curry * 0.45, name: 'Turmeric Ochre' });
      palette.push({ r: 48, g: 122, b: 120, weight: fDist.fish_curry * 0.35, name: 'Arabian Sea Emerald' });
    }
    if (fDist.bebinca > 0) {
      palette.push({ r: 218, g: 155, b: 58, weight: fDist.bebinca * 0.5, name: 'Caramelized Jaggery' });
      palette.push({ r: 104, g: 46, b: 22, weight: fDist.bebinca * 0.4, name: 'Toasted Ghee Brown' });
    }
    if (fDist.prawn_curry > 0) {
      palette.push({ r: 230, g: 110, b: 75, weight: fDist.prawn_curry * 0.5, name: 'Prawn Coral' });
    }
    if (fDist.xacuti > 0) {
      palette.push({ r: 133, g: 77, b: 39, weight: fDist.xacuti * 0.45, name: 'Roasted Xacuti Masala' });
      palette.push({ r: 70, g: 30, b: 16, weight: fDist.xacuti * 0.35, name: 'Toasted Coconut Umber' });
    }
    if (fDist.poe_bread > 0) {
      palette.push({ r: 200, g: 165, b: 130, weight: fDist.poe_bread * 0.35, name: 'Poe Crust' });
      palette.push({ r: 248, g: 240, b: 228, weight: fDist.poe_bread * 0.3, name: 'Flour Dust Ivory' });
    }

    // Weather palette influences
    if (wDist.sunny > 0) {
      palette.push({ r: 255, g: 210, b: 90, weight: wDist.sunny * 0.35, name: 'Solar Corona Gold' });
    }
    if (wDist.rainy > 0) {
      palette.push({ r: 106, g: 146, b: 166, weight: wDist.rainy * 0.4, name: 'Monsoon Slate Blue' });
    }
    if (eDist.kingfisher > 0) {
      palette.push({ r: 38, g: 166, b: 154, weight: eDist.kingfisher * 0.35, name: 'Kingfisher Azure Turquoise' });
    }

    palette.push({ r: 255, g: 246, b: 215, weight: 0.12, name: 'Sunlight Highlights' });
    palette.push({ r: 35, g: 14, b: 10, weight: 0.12, name: 'Deep Laterite Shadow' });

    const totalWeight = palette.reduce((acc, p) => acc + p.weight, 0);
    palette.forEach(p => p.weight /= totalWeight);
    target.palette = palette;

    // ==========================================
    // 3. LOCATION MAPPINGS (Macro Spatial Topology)
    // ==========================================
    target.dudhsagarCascade = lDist.dudhsagar * 2.2;  // Vertical cascade plume
    target.aguadaBeacon = lDist.aguada_fort * 2.2;    // Concentric lighthouse rings & rotating beams
    target.fontainhasNodes = lDist.fontainhas * 2.0;  // Multi-chromatic architectural vibrance nodes
    target.chaporaRidge = lDist.chapora_fort * 2.0;   // Elevated clifftop perimeter ridge
    target.palolemCrescent = lDist.palolem_beach * 2.2; // Sweeping coastal crescent bay arc
    target.caboRamaCape = lDist.cabo_de_rama * 2.2;     // Dramatic clifftop cape & thermal updrafts

    // ==========================================
    // 4. EMBLEM MAPPINGS (Micro-Dynamics & Kinetics)
    // ==========================================
    target.wakeRipples = eDist.mandovi_boat * 2.0;      // Mandovi boat wake waves
    target.frondTendrils = eDist.coconut_palm * 2.0;    // Arching drooping frond tendrils
    target.turtleSwell = eDist.sea_turtle * 2.2;        // Deep slow-motion oceanic breathing
    target.kingfisherDarts = eDist.kingfisher * 2.4;    // Rapid agile turquoise dart streaks
    target.carnivalConfetti = eDist.carnival_spirit * 2.2; // Multicolored festive celebratory sparks
    target.susegadDamping = eDist.susegad * 2.0;        // Viscous tranquil damping

    this.targetParameters = target;
    this.transitionProgress = 0.0;
  }

  // Smoothly interpolate parameters over time
  update() {
    if (this.transitionProgress < 1.0) {
      this.transitionProgress = Math.min(1.0, this.transitionProgress + this.transitionSpeed);
      const t = this.easeInOutCubic(this.transitionProgress);

      const cur = this.currentParameters;
      const tgt = this.targetParameters;

      // Weather physics
      cur.flowSpeed = this.lerp(cur.flowSpeed, tgt.flowSpeed, t);
      cur.turbulence = this.lerp(cur.turbulence, tgt.turbulence, t);
      cur.curlScale = this.lerp(cur.curlScale, tgt.curlScale, t);
      cur.biasX = this.lerp(cur.biasX, tgt.biasX, t);
      cur.biasY = this.lerp(cur.biasY, tgt.biasY, t);
      cur.windSweep = this.lerp(cur.windSweep, tgt.windSweep, t);
      cur.rainGravity = this.lerp(cur.rainGravity, tgt.rainGravity, t);
      cur.stormVortex = this.lerp(cur.stormVortex, tgt.stormVortex, t);
      cur.calmSwell = this.lerp(cur.calmSwell, tgt.calmSwell, t);

      // Solar center
      cur.sunRadius = this.lerp(cur.sunRadius, tgt.sunRadius, t);
      cur.sunIntensity = this.lerp(cur.sunIntensity, tgt.sunIntensity, t);
      cur.sunPulseSpeed = this.lerp(cur.sunPulseSpeed, tgt.sunPulseSpeed, t);

      // Food & texture
      cur.emberDensity = this.lerp(cur.emberDensity, tgt.emberDensity, t);
      cur.chiliSparks = this.lerp(cur.chiliSparks, tgt.chiliSparks, t);
      cur.strataStrength = this.lerp(cur.strataStrength, tgt.strataStrength, t);
      cur.flourSpeckles = this.lerp(cur.flourSpeckles, tgt.flourSpeckles, t);
      cur.particleSizeScale = this.lerp(cur.particleSizeScale, tgt.particleSizeScale, t);

      // Location topology
      cur.dudhsagarCascade = this.lerp(cur.dudhsagarCascade, tgt.dudhsagarCascade, t);
      cur.aguadaBeacon = this.lerp(cur.aguadaBeacon, tgt.aguadaBeacon, t);
      cur.fontainhasNodes = this.lerp(cur.fontainhasNodes, tgt.fontainhasNodes, t);
      cur.chaporaRidge = this.lerp(cur.chaporaRidge, tgt.chaporaRidge, t);
      cur.palolemCrescent = this.lerp(cur.palolemCrescent, tgt.palolemCrescent, t);
      cur.caboRamaCape = this.lerp(cur.caboRamaCape || 0, tgt.caboRamaCape || 0, t);

      // Emblem micro-dynamics
      cur.wakeRipples = this.lerp(cur.wakeRipples, tgt.wakeRipples, t);
      cur.frondTendrils = this.lerp(cur.frondTendrils, tgt.frondTendrils, t);
      cur.turtleSwell = this.lerp(cur.turtleSwell, tgt.turtleSwell, t);
      cur.kingfisherDarts = this.lerp(cur.kingfisherDarts, tgt.kingfisherDarts, t);
      cur.carnivalConfetti = this.lerp(cur.carnivalConfetti, tgt.carnivalConfetti, t);
      cur.susegadDamping = this.lerp(cur.susegadDamping, tgt.susegadDamping, t);

      // Metadata
      cur.dominantWeather = tgt.dominantWeather;
      cur.dominantFood = tgt.dominantFood;
      cur.dominantLocation = tgt.dominantLocation;
      cur.dominantEmblem = tgt.dominantEmblem;
      cur.weatherBreakdown = tgt.weatherBreakdown;
      cur.foodBreakdown = tgt.foodBreakdown;
      cur.locationBreakdown = tgt.locationBreakdown;
      cur.emblemBreakdown = tgt.emblemBreakdown;
      cur.totalCount = tgt.totalCount;

      if (this.transitionProgress >= 1.0) {
        this.currentParameters = JSON.parse(JSON.stringify(tgt));
      }
    }
  }

  lerp(a, b, t) {
    return a + (b - a) * t;
  }

  easeInOutCubic(x) {
    return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
  }
}

// Generate dynamic brief narrative writeups explaining how any attendee input mutates the artwork
export function getArtworkImpactWriteup(response = {}) {
  const weatherMap = {
    sunny: {
      name: 'Sunny & Energetic',
      title: 'Solar Radiance & Corona Expansion',
      detail: 'Intensifies the Goan sun corona radius, accelerating particle flow velocity and infusing golden solar highlights.'
    },
    windy: {
      name: 'Windy & Restless',
      title: 'Breeze Vector Sweeps',
      detail: 'Injects dynamic diagonal wind forces across the river streamlines, dispersing particles into buoyant swirling eddies.'
    },
    rainy: {
      name: 'Rainy & Reflective',
      title: 'Monsoon Cascades',
      detail: 'Pulls cascading vertical ribbons downward, suffusing the tapestry in monsoon slate-blue and cool teal tones.'
    },
    stormy: {
      name: 'Stormy & Eclectic',
      title: 'Turbulent Angular Vortices',
      detail: 'Ignites tight spiral vortices, spiking kinetic turbulence and launching volatile glowing embers across the field.'
    },
    calm: {
      name: 'Calm & Serene',
      title: 'Susegad Harmonic Swells',
      detail: 'Damps chaotic noise into slow, rhythmic oceanic breathing waves with serene equilibrium.'
    }
  };

  const foodMap = {
    fish_curry: {
      name: 'Fish Curry',
      title: 'Turmeric Ochre & Emerald Tides',
      detail: 'Enlarges particle scales and weaves deep turmeric ochre with Arabian Sea emerald accents.'
    },
    prawn_curry: {
      name: 'Prawn Curry',
      title: 'Warm Saffron Coral Glow',
      detail: 'Bathes the currents in a rich coral-terracotta glow, evoking warm coastal energy.'
    },
    vindaloo: {
      name: 'Vindaloo',
      title: 'Chili Crimson Sparks & Embers',
      detail: 'Spikes ember density, sending crackling fiery crimson sparks drifting vigorously through the flow.'
    },
    xacuti: {
      name: 'Xacuti',
      title: 'Roasted Masala & Coconut Umber',
      detail: 'Enriches the tapestry with deep roasted umber tones and complex multi-spice speckles.'
    },
    bebinca: {
      name: 'Bebinca',
      title: '7-Layer Caramelized Strata',
      detail: 'Forms 7 distinct caramelized horizontal bands in toasted jaggery and golden ghee.'
    },
    poe_bread: {
      name: 'Poe Bread',
      title: 'Flour Dust & Rustic Crust',
      detail: 'Sprinkles delicate flour-white dusting ivory speckles and rustic comforting crust undertones.'
    }
  };

  const locationMap = {
    dudhsagar: {
      name: 'Dudhsagar Falls',
      detail: 'Channels vertical waterfall cascades with frothy mist spray down the central corridor.'
    },
    aguada_fort: {
      name: 'Fort Aguada Lighthouse',
      detail: 'Sweeps a rotating lighthouse beacon beam across the point cloud.'
    },
    fontainhas: {
      name: 'Fontainhas Latin Quarter',
      detail: 'Ignites vibrant architectural cluster nodes of color across the canvas.'
    },
    chapora_fort: {
      name: 'Chapora Fort Ridge',
      detail: 'Sculpts an elevated clifftop perimeter stone ridge along the upper currents.'
    },
    palolem_beach: {
      name: 'Palolem Beach Crescent',
      detail: 'Guides particle trajectories into a graceful coastal crescent bay arc.'
    },
    cabo_de_rama: {
      name: 'Cabo de Rama Fort',
      detail: 'Sculpts a dramatic clifftop promontory over ocean swells and draws warm thermal updrafts.'
    },
    old_goa_basilica: {
      name: 'Cabo de Rama Fort',
      detail: 'Sculpts a dramatic clifftop promontory over ocean swells and draws warm thermal updrafts.'
    }
  };

  const emblemMap = {
    mandovi_boat: {
      name: 'Mandovi Sailboat',
      detail: 'Leaves kinetic wake ripples across the Mandovi river flow.'
    },
    coconut_palm: {
      name: 'Coconut Palm',
      detail: 'Spreads arching frond canopy tendrils gracefully overhead.'
    },
    sea_turtle: {
      name: 'Olive Ridley Turtle',
      detail: 'Deepens oceanic gliding currents and tranquil hydrodynamic swells.'
    },
    kingfisher: {
      name: 'Common Kingfisher',
      detail: 'Streaks agile turquoise azure darts cutting swiftly through the currents.'
    },
    carnival_spirit: {
      name: 'Carnival Spirit',
      detail: 'Detonates festive micro-bursts of celebratory multi-colored sparks.'
    },
    susegad: {
      name: 'Susegad Philosophy',
      detail: 'Imparts viscous peace and contemplative balance across the entire canvas.'
    }
  };

  const wKey = (response.weather || 'sunny').toLowerCase();
  const fKey = (response.food || 'fish_curry').toLowerCase();
  const lKey = (response.location || '').toLowerCase();
  const eKey = (response.emblem || '').toLowerCase();

  const w = weatherMap[wKey] || weatherMap.sunny;
  const f = foodMap[fKey] || foodMap.fish_curry;
  const loc = locationMap[lKey];
  const emb = emblemMap[eKey];

  const highlights = [
    { label: `Weather: ${w.name}`, text: w.detail },
    { label: `Flavour: ${f.name}`, text: f.detail }
  ];
  if (loc) highlights.push({ label: `Landmark: ${loc.name}`, text: loc.detail });
  if (emb) highlights.push({ label: `Emblem: ${emb.name}`, text: emb.detail });

  const summary = `${w.detail} Concurrently, ${f.detail.charAt(0).toLowerCase() + f.detail.slice(1)}`;

  return {
    headline: `${w.title} · ${f.title}`,
    summary,
    weatherDetail: w.detail,
    foodDetail: f.detail,
    locationDetail: loc ? loc.detail : null,
    emblemDetail: emb ? emb.detail : null,
    highlights
  };
}
