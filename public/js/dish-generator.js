// Procedural Goan Dish Point Cloud Generator
// Generates point targets for the 6 Goan foods when particles assemble into the session's top dish

export class DishShapeGenerator {
  constructor() {
    this.cache = {};
  }

  getPointsForDish(dishId, centerX = 540, centerY = 820, scale = 1.3) {
    if (this.cache[dishId]) {
      return this.cache[dishId];
    }

    const points = [];

    switch (dishId) {
      case 'fish_curry':
        this.generateFishCurry(points, centerX, centerY, scale);
        break;
      case 'vindaloo':
        this.generateVindaloo(points, centerX, centerY, scale);
        break;
      case 'bebinca':
        this.generateBebinca(points, centerX, centerY, scale);
        break;
      case 'prawn_curry':
        this.generatePrawnCurry(points, centerX, centerY, scale);
        break;
      case 'xacuti':
        this.generateXacuti(points, centerX, centerY, scale);
        break;
      case 'poe_bread':
        this.generatePoeBread(points, centerX, centerY, scale);
        break;
      default:
        this.generateFishCurry(points, centerX, centerY, scale);
    }

    this.cache[dishId] = points;
    return points;
  }

  // 1. FISH CURRY: Traditional Goan Clay Pot with Fish Motif & Steam
  generateFishCurry(points, cx, cy, s) {
    const bowlW = 220 * s;
    const bowlH = 110 * s;

    // Clay Pot Body (curved bowl)
    for (let i = 0; i < 900; i++) {
      const u = (Math.random() - 0.5) * 2;
      const v = Math.random();
      const x = cx + u * (bowlW * 0.5) * (1 - v * 0.25);
      const y = cy + v * bowlH;
      // Dense on the outer rim and bottom
      if (Math.abs(u) > 0.4 || v > 0.7 || Math.random() < 0.3) {
        points.push({ x, y, color: 3, size: 2.2 }); // Terracotta
      }
    }

    // Bowl Rim Ellipse
    for (let i = 0; i < 600; i++) {
      const angle = Math.random() * Math.PI * 2;
      const rx = (bowlW * 0.5) * (0.85 + Math.random() * 0.15);
      const ry = 30 * s * (0.85 + Math.random() * 0.15);
      points.push({
        x: cx + Math.cos(angle) * rx,
        y: cy + Math.sin(angle) * ry,
        color: 0, // Gold rim
        size: 2.8
      });
    }

    // Fish Silhouette inside the curry bowl
    for (let i = 0; i < 1100; i++) {
      const t = (Math.random() - 0.5) * 2; // -1 (tail) to +1 (head)
      const fishLen = 140 * s;
      const fishH = 45 * s * Math.cos(t * Math.PI * 0.5); // spindle body
      const x = cx + t * fishLen * 0.5;
      const y = cy + (Math.random() - 0.5) * fishH;

      if (t < -0.7) {
        // Tail fin
        const tailSpread = (Math.random() - 0.5) * 55 * s;
        points.push({ x: cx - fishLen * 0.5 + (Math.random() - 0.5) * 15, y: cy + tailSpread, color: 5, size: 2.2 });
      } else {
        // Body & scales
        const isSpine = Math.abs(y - cy) < 4;
        points.push({ x, y, color: isSpine ? 0 : 5, size: isSpine ? 3.0 : 2.0 });
      }
    }

    // Fish Eye
    points.push({ x: cx + 45 * s, y: cy - 6 * s, color: 0, size: 4.5 });

    // Rising Steam Vapors
    for (let i = 0; i < 500; i++) {
      const steamProg = Math.random();
      const steamY = cy - 20 * s - steamProg * 140 * s;
      const steamWave = Math.sin(steamProg * Math.PI * 3) * (25 * s);
      const x = cx + (Math.random() > 0.5 ? 40 : -40) * s + steamWave + (Math.random() - 0.5) * 12;
      points.push({ x, y: steamY, color: 5, size: 1.6 + (1 - steamProg) * 1.5 });
    }
  }

  // 2. VINDALOO: Fiery Goan Red Chili Pepper with Sparks
  generateVindaloo(points, cx, cy, s) {
    const chiliLen = 280 * s;

    // Curved Chili Body (S-curve taper)
    for (let i = 0; i < 2400; i++) {
      const t = Math.random(); // 0 (stem) to 1 (tip)
      // Curved spine path
      const curveX = cx + Math.sin(t * Math.PI * 1.2) * (70 * s) - (t * 40 * s);
      const curveY = (cy - 120 * s) + t * chiliLen;

      // Width tapers at stem and sharp point at tip
      const maxW = 55 * s * Math.sin(t * Math.PI * 0.9);
      const spread = (Math.random() - 0.5) * maxW * 2;
      const normAngle = Math.atan2(chiliLen, Math.cos(t * Math.PI * 1.2) * 70 * s) + Math.PI * 0.5;

      const x = curveX + Math.cos(normAngle) * spread;
      const y = curveY + Math.sin(normAngle) * spread;

      // Spicy color gradient: dark fiery crimson outside, bright paprika inside
      const color = (Math.abs(spread) / maxW > 0.7) ? 7 : (Math.random() > 0.4 ? 7 : 1);
      points.push({ x, y, color, size: 2.2 + Math.random() * 1.5 });
    }

    // Green Stem & Cap
    for (let i = 0; i < 400; i++) {
      const stemProg = Math.random();
      const stemX = cx - (stemProg * 35 * s) + (Math.random() - 0.5) * 12;
      const stemY = (cy - 120 * s) - (stemProg * 45 * s) + (Math.random() - 0.5) * 10;
      points.push({ x: stemX, y: stemY, color: 8, size: 2.5 }); // Emerald
    }

    // Fiery Embers dancing around the chili
    for (let i = 0; i < 600; i++) {
      const angle = Math.random() * Math.PI * 2;
      const dist = 70 * s + Math.random() * 80 * s;
      points.push({
        x: cx + Math.cos(angle) * dist,
        y: cy + Math.sin(angle) * dist,
        color: Math.random() > 0.5 ? 0 : 7, // Gold or Crimson
        size: 1.8 + Math.random() * 2.5
      });
    }
  }

  // 3. BEBINCA: Traditional 7-Layered Goan Dessert Slice
  generateBebinca(points, cx, cy, s) {
    const sliceW = 240 * s;
    const sliceH = 200 * s;
    const layers = 7;
    const layerH = sliceH / layers;

    // 7 Distinct Horizontal Stratified Bands
    for (let l = 0; l < layers; l++) {
      const layerTop = (cy - sliceH * 0.5) + l * layerH;
      const layerColor = (l % 2 === 0) ? 9 : 0; // Alternating Caramel and Golden Ghee
      const layerDensity = 360;

      for (let i = 0; i < layerDensity; i++) {
        // Slight isometric perspective slant
        const progressX = Math.random();
        const slantX = (1 - (l / layers) * 0.25);
        const x = cx + (progressX - 0.5) * sliceW * slantX;
        const y = layerTop + Math.random() * (layerH - 2);

        points.push({
          x,
          y,
          color: layerColor,
          size: (l % 2 === 0) ? 2.4 : 3.0
        });
      }

      // Distinct dividing line between layers
      for (let i = 0; i < 120; i++) {
        const x = cx + (Math.random() - 0.5) * sliceW * (1 - (l / layers) * 0.25);
        points.push({ x, y: layerTop + layerH - 1, color: 6, size: 1.8 }); // Umber line
      }
    }

    // Golden caramelized crust on top
    for (let i = 0; i < 300; i++) {
      const x = cx + (Math.random() - 0.5) * sliceW;
      const y = (cy - sliceH * 0.5) + (Math.random() - 0.5) * 6;
      points.push({ x, y, color: 0, size: 3.2 }); // Gold
    }
  }

  // 4. PRAWN CURRY: Saffron Curry Bowl with Curled Prawn
  generatePrawnCurry(points, cx, cy, s) {
    const bowlW = 220 * s;
    const bowlH = 100 * s;

    // Clay Bowl Base
    for (let i = 0; i < 900; i++) {
      const u = (Math.random() - 0.5) * 2;
      const v = Math.random();
      const x = cx + u * (bowlW * 0.5) * (1 - v * 0.25);
      const y = cy + v * bowlH;
      points.push({ x, y, color: 3, size: 2.2 }); // Terracotta
    }

    // Curled Prawn Spiral Motif
    for (let i = 0; i < 1400; i++) {
      const t = Math.random(); // 0 (tail) to 1 (head)
      const spiralA = t * Math.PI * 1.5;
      const spiralR = 65 * s * (0.4 + t * 0.6);
      const baseX = cx + Math.cos(spiralA) * spiralR;
      const baseY = (cy - 10 * s) + Math.sin(spiralA) * spiralR;

      const segW = 28 * s * Math.sin(t * Math.PI);
      const spreadX = (Math.random() - 0.5) * segW;
      const spreadY = (Math.random() - 0.5) * segW;

      points.push({
        x: baseX + spreadX,
        y: baseY + spreadY,
        color: 10, // Prawn coral
        size: 2.4 + Math.random() * 1.5
      });
    }

    // Prawn Tail Fins
    for (let i = 0; i < 200; i++) {
      const angle = Math.PI * 0.2 + (Math.random() - 0.5) * 0.6;
      const dist = 30 * s + Math.random() * 25 * s;
      points.push({
        x: cx + Math.cos(angle) * dist,
        y: (cy - 10 * s) + Math.sin(angle) * dist,
        color: 1, // Amber
        size: 2.0
      });
    }
  }

  // 5. XACUTI: Roasted Masala Dish with Star Anise Petals
  generateXacuti(points, cx, cy, s) {
    const bowlW = 220 * s;
    const bowlH = 105 * s;

    // Deep curry dish
    for (let i = 0; i < 900; i++) {
      const u = (Math.random() - 0.5) * 2;
      const v = Math.random();
      const x = cx + u * (bowlW * 0.5) * (1 - v * 0.25);
      const y = cy + v * bowlH;
      points.push({ x, y, color: 6, size: 2.2 }); // Roasted Umber
    }

    // Star Anise (8 Radiating Petals)
    const petals = 8;
    for (let p = 0; p < petals; p++) {
      const baseA = (p / petals) * Math.PI * 2;
      for (let i = 0; i < 150; i++) {
        const prog = Math.random();
        const dist = prog * 65 * s;
        const petalW = Math.sin(prog * Math.PI) * (18 * s);
        const side = (Math.random() - 0.5) * petalW;

        const x = cx + Math.cos(baseA) * dist - Math.sin(baseA) * side;
        const y = (cy + 10 * s) + Math.sin(baseA) * dist + Math.cos(baseA) * side;

        points.push({ x, y, color: 0, size: 2.5 }); // Golden spice seed
      }
    }

    // Roasted Coconut & Peppercorn Speckles
    for (let i = 0; i < 600; i++) {
      const angle = Math.random() * Math.PI * 2;
      const dist = Math.random() * 95 * s;
      points.push({
        x: cx + Math.cos(angle) * dist,
        y: (cy + 15 * s) + Math.sin(angle) * dist * 0.5,
        color: Math.random() > 0.5 ? 5 : 6, // Coconut ivory & roasted peppercorn
        size: 1.6 + Math.random() * 2.0
      });
    }
  }

  // 6. POE BREAD: Traditional Crusty Goan Bread with Slash Pocket
  generatePoeBread(points, cx, cy, s) {
    const rx = 140 * s;
    const ry = 95 * s;

    // Oval Bread Loaf Body
    for (let i = 0; i < 2200; i++) {
      const angle = Math.random() * Math.PI * 2;
      const r = Math.sqrt(Math.random());
      const x = cx + Math.cos(angle) * rx * r;
      const y = cy + Math.sin(angle) * ry * r;

      // Darker crust around circumference, soft golden bread inside
      const isCrust = r > 0.82;
      const isFlour = Math.random() < 0.15;
      const color = isFlour ? 5 : (isCrust ? 6 : 3); // Ivory flour, umber crust, warm wheat
      points.push({ x, y, color, size: isFlour ? 1.5 : 2.4 });
    }

    // Classic Center Slash Pocket
    for (let i = 0; i < 500; i++) {
      const progress = (Math.random() - 0.5) * 2;
      const slashW = rx * 0.75;
      const x = cx + progress * slashW;
      const y = cy + Math.sin(progress * Math.PI) * (18 * s) + (Math.random() - 0.5) * 6;
      points.push({ x, y, color: 0, size: 2.8 }); // Golden baked interior
    }
  }
}
