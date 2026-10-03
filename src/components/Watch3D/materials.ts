import * as THREE from 'three';

// Procedural texture generation for Ice-Blue horizontal guilloché dial pattern with crisp branding
export function createDialTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d');

  if (ctx) {
    // Vibrant Ice-Blue / Cyan Sunburst Base (matching reference image)
    const grad = ctx.createRadialGradient(512, 512, 30, 512, 512, 512);
    grad.addColorStop(0, '#bae6fd');    // luminous ice blue center
    grad.addColorStop(0.3, '#7dd3fc');  // bright cyan
    grad.addColorStop(0.65, '#38bdf8'); // vibrant sky cyan
    grad.addColorStop(0.9, '#0284c7');  // ocean blue rim
    grad.addColorStop(1, '#0369a1');    // deep bevel edge
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 1024, 1024);

    // Fine horizontal guilloché linear ridges across dial
    ctx.lineWidth = 2.5;
    for (let y = 8; y < 1024; y += 16) {
      // Crisp white highlight line
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.45)';
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(1024, y);
      ctx.stroke();

      // Soft shadow line below ridge
      ctx.strokeStyle = 'rgba(2, 60, 95, 0.35)';
      ctx.beginPath();
      ctx.moveTo(0, y + 2.5);
      ctx.lineTo(1024, y + 2.5);
      ctx.stroke();
    }

    // Outer subtle sunburst vignette
    // Outer subtle sunburst vignette
    const vignette = ctx.createRadialGradient(512, 512, 380, 512, 512, 512);
    vignette.addColorStop(0, 'rgba(0, 0, 0, 0)');
    vignette.addColorStop(1, 'rgba(2, 44, 74, 0.45)');
    ctx.fillStyle = vignette;
    ctx.fillRect(0, 0, 1024, 1024);

    // Clean Minimalist Luxury Brand Inscription: "VIVEK R"
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // "VIVEK R" - Pure Jet Black with bold luxury typography
    ctx.fillStyle = '#000000';
    ctx.font = '900 54px "Cinzel", "Space Grotesk", "Outfit", "Arial", sans-serif';
    ctx.fillText('VIVEK R', 512, 355);

    // "Code = Poetry" - Pure Jet Black with bold thick glyph rendering so '=' is perfectly dark and clear
    ctx.fillStyle = '#000000';
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 2.0;
    ctx.font = 'bold 44px "Outfit", "Space Grotesk", "Arial", sans-serif';
    ctx.strokeText('Code = Poetry', 512, 720);
    ctx.fillText('Code = Poetry', 512, 720);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.ClampToEdgeWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.needsUpdate = true;
  return texture;
}

// Procedural Date Window Texture for sharp date numerals
export function createDateTexture(day: string): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');

  if (ctx) {
    // Pure White Date Wheel Background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, 256, 256);

    // Silver inner border
    ctx.strokeStyle = '#cbd5e1';
    ctx.lineWidth = 12;
    ctx.strokeRect(6, 6, 244, 244);

    // Date Numeral in bold black
    ctx.fillStyle = '#0f172a';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = 'bold 125px "Outfit", "JetBrains Mono", "Arial", monospace';
    ctx.fillText(day, 128, 132);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

// Procedural bump map for the horizontal dial grooves
export function createDialBumpMap(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d');

  if (ctx) {
    ctx.fillStyle = '#808080';
    ctx.fillRect(0, 0, 1024, 1024);

    for (let y = 8; y < 1024; y += 16) {
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, y, 1024, 2);
      ctx.fillStyle = '#202020';
      ctx.fillRect(0, y + 2, 1024, 2);
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

// Brushed Stainless Steel Texture for realistic anisotropic steel reflections
export function createBrushedSteelTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  if (ctx) {
    ctx.fillStyle = '#888888';
    ctx.fillRect(0, 0, 512, 512);

    for (let i = 0; i < 5000; i++) {
      const y = Math.random() * 512;
      const length = 50 + Math.random() * 200;
      const x = Math.random() * 512;
      const alpha = 0.04 + Math.random() * 0.08;
      ctx.strokeStyle = Math.random() > 0.5 ? `rgba(255,255,255,${alpha})` : `rgba(0,0,0,${alpha})`;
      ctx.lineWidth = 1 + Math.random();
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x + length, y);
      ctx.stroke();
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.needsUpdate = true;
  return texture;
}

// Procedural high-resolution Bezel Texture with deep navy finish and crisp white numerals
export function createBezelTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d');

  if (ctx) {
    ctx.clearRect(0, 0, 1024, 1024);

    // Outer Navy Ring
    const grad = ctx.createRadialGradient(512, 512, 380, 512, 512, 510);
    grad.addColorStop(0, '#0c1a30');
    grad.addColorStop(0.5, '#0e2344');
    grad.addColorStop(0.85, '#0a1932');
    grad.addColorStop(1, '#061022');

    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(512, 512, 505, 0, Math.PI * 2);
    ctx.arc(512, 512, 380, 0, Math.PI * 2, true);
    ctx.fill();

    // Inner & Outer metallic rim accent lines
    ctx.strokeStyle = 'rgba(203, 213, 225, 0.6)';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(512, 512, 502, 0, Math.PI * 2);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(512, 512, 383, 0, Math.PI * 2);
    ctx.stroke();

    // 60-minute tick marks
    for (let m = 0; m < 60; m++) {
      const angle = (m / 60) * Math.PI * 2 - Math.PI / 2;
      const isFive = m % 5 === 0;

      if (!isFive) {
        const rInner = 465;
        const rOuter = 485;
        const x1 = 512 + Math.cos(angle) * rInner;
        const y1 = 512 + Math.sin(angle) * rInner;
        const x2 = 512 + Math.cos(angle) * rOuter;
        const y2 = 512 + Math.sin(angle) * rOuter;

        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      }
    }

    // Numerals: 60, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55
    const labels = [
      { m: 0, text: '60' },
      { m: 5, text: '5' },
      { m: 10, text: '10' },
      { m: 15, text: '15' },
      { m: 20, text: '20' },
      { m: 25, text: '25' },
      { m: 30, text: '30' },
      { m: 35, text: '35' },
      { m: 40, text: '40' },
      { m: 45, text: '45' },
      { m: 50, text: '50' },
      { m: 55, text: '55' },
    ];

    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = 'bold 52px "Outfit", "Arial", sans-serif';

    labels.forEach(({ m, text }) => {
      const angle = (m / 60) * Math.PI * 2 - Math.PI / 2;
      const r = 442;
      const x = 512 + Math.cos(angle) * r;
      const y = 512 + Math.sin(angle) * r;

      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle + Math.PI / 2);
      ctx.fillText(text, 0, 0);
      ctx.restore();
    });

    // Luminous Triangle at 60 (top)
    ctx.save();
    ctx.translate(512, 512 - 475);
    ctx.fillStyle = '#38bdf8';
    ctx.beginPath();
    ctx.moveTo(0, 18);
    ctx.lineTo(-14, -14);
    ctx.lineTo(14, -14);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(0, 0, 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

// Procedural high-resolution Caseback Steel Ring Texture with circular laser engraving
export function createCasebackRingTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d');

  if (ctx) {
    ctx.clearRect(0, 0, 1024, 1024);

    // Brushed steel base ring with radial light variation
    const grad = ctx.createRadialGradient(512, 512, 280, 512, 512, 512);
    grad.addColorStop(0, '#94a3b8');
    grad.addColorStop(0.2, '#e2e8f0');
    grad.addColorStop(0.5, '#cbd5e1');
    grad.addColorStop(0.8, '#94a3b8');
    grad.addColorStop(1, '#475569');

    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(512, 512, 510, 0, Math.PI * 2);
    ctx.arc(512, 512, 280, 0, Math.PI * 2, true);
    ctx.fill();

    // Circular concentric micro-brushing rings
    for (let r = 290; r < 505; r += 4) {
      ctx.strokeStyle = `rgba(255, 255, 255, ${0.05 + (r % 8 === 0 ? 0.08 : 0.02)})`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(512, 512, r, 0, Math.PI * 2);
      ctx.stroke();
    }

    // Circular Laser Engraving: "CRAFTED BY VIVEK R" (Top) and "DEDICATED TO WATCH ENGINEERING & CRAFTSMEN" (Bottom)
    const topText = '★ CRAFTED BY VIVEK R ★';
    const botText = '★ DEDICATED TO WATCH ENGINEERING & CRAFTSMEN ★';

    ctx.font = '900 42px "Outfit", "Space Grotesk", sans-serif';
    ctx.fillStyle = '#0f172a';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // 1. Draw curved top text (Clockwise from left to right along top arc)
    const rTop = 410;
    const stepTop = (Math.PI * 0.72) / topText.length;
    const startAngleTop = -Math.PI / 2 - (stepTop * topText.length) / 2 + stepTop / 2;

    for (let i = 0; i < topText.length; i++) {
      const char = topText[i];
      const angle = startAngleTop + i * stepTop;
      const x = 512 + Math.cos(angle) * rTop;
      const y = 512 + Math.sin(angle) * rTop;

      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle + Math.PI / 2);
      ctx.fillText(char, 0, 0);
      ctx.restore();
    }

    // 2. Draw curved bottom text (Smooth left-to-right reading along bottom arc)
    ctx.font = '800 34px "Outfit", "Space Grotesk", sans-serif';
    const rBot = 410;
    const stepBot = (Math.PI * 1.05) / botText.length;
    const startAngleBot = Math.PI / 2 + (stepBot * botText.length) / 2 - stepBot / 2;

    for (let i = 0; i < botText.length; i++) {
      const char = botText[i];
      const angle = startAngleBot - i * stepBot;
      const x = 512 + Math.cos(angle) * rBot;
      const y = 512 + Math.sin(angle) * rBot;

      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle - Math.PI / 2);
      ctx.fillText(char, 0, 0);
      ctx.restore();
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

// Procedural Geneva Stripes (Côtes de Genève) for Caliber Movement
export function createCaliberGenevaTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  if (ctx) {
    // Rhodium base
    ctx.fillStyle = '#cbd5e1';
    ctx.fillRect(0, 0, 512, 512);

    // Geneva stripes (alternating soft wave gradients)
    const stripeWidth = 28;
    for (let x = 0; x < 512; x += stripeWidth) {
      const grad = ctx.createLinearGradient(x, 0, x + stripeWidth, 0);
      grad.addColorStop(0, 'rgba(255, 255, 255, 0.45)');
      grad.addColorStop(0.4, 'rgba(203, 213, 225, 0.25)');
      grad.addColorStop(0.85, 'rgba(100, 116, 139, 0.35)');
      grad.addColorStop(1, 'rgba(51, 65, 85, 0.45)');

      ctx.fillStyle = grad;
      ctx.fillRect(x, 0, stripeWidth, 512);
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.needsUpdate = true;
  return texture;
}

// Procedural 24K Gold Rotor Inscription Texture
export function createRotorTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  if (ctx) {
    ctx.clearRect(0, 0, 1024, 512);

    // 24K Gold metallic gradient
    const grad = ctx.createLinearGradient(0, 0, 1024, 0);
    grad.addColorStop(0, '#d97706');
    grad.addColorStop(0.3, '#fbbf24');
    grad.addColorStop(0.6, '#fef08a');
    grad.addColorStop(0.85, '#f59e0b');
    grad.addColorStop(1, '#b45309');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 1024, 512);

    // Clean Inscription: "CRAFTED BY VIVEK R" & "DEDICATED TO WATCH ENGINEERING & CRAFTSMEN"
    ctx.font = 'bold 38px "Outfit", "Space Grotesk", sans-serif';
    ctx.fillStyle = '#78350f';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('CRAFTED BY VIVEK R', 512, 125);
    ctx.font = 'bold 26px "Outfit", "Space Grotesk", sans-serif';
    ctx.fillStyle = '#92400e';
    ctx.fillText('DEDICATED TO WATCH ENGINEERING & CRAFTSMEN', 512, 215);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

// Procedural Brushed Stainless Steel Texture for Bracelet Links
export function createBraceletTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  if (ctx) {
    ctx.fillStyle = '#cbd5e1';
    ctx.fillRect(0, 0, 512, 512);

    // Vertical satin brush lines
    for (let i = 0; i < 6000; i++) {
      const x = Math.random() * 512;
      const y = Math.random() * 512;
      const length = 40 + Math.random() * 180;
      const alpha = 0.05 + Math.random() * 0.1;
      ctx.strokeStyle = Math.random() > 0.5 ? `rgba(255,255,255,${alpha})` : `rgba(71,85,105,${alpha})`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x, y + length);
      ctx.stroke();
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.needsUpdate = true;
  return texture;
}


