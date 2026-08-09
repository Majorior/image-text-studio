/**
 * Image Text Studio - Main Application Logic
 * Vanilla JavaScript Canvas Renderer & Control Handlers
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- Canvas & Context ---
  const canvas = document.getElementById('imageCanvas');
  const ctx = canvas.getContext('2d');
  const canvasWrapper = document.getElementById('canvasWrapper');
  const canvasDimensions = document.getElementById('canvasDimensions');
  const dropZoneOverlay = document.getElementById('dropZoneOverlay');

  // --- UI Elements ---
  const imageInput = document.getElementById('imageInput');
  const fileDropZone = document.getElementById('fileDropZone');
  const downloadBtn = document.getElementById('downloadBtn');
  const resetBtn = document.getElementById('resetBtn');
  const presetButtons = document.querySelectorAll('.preset-btn');

  const topTextInput = document.getElementById('topTextInput');
  const bottomTextInput = document.getElementById('bottomTextInput');
  const topTextColorInput = document.getElementById('topTextColorInput');
  const bottomTextColorInput = document.getElementById('bottomTextColorInput');

  const fontFamilySelect = document.getElementById('fontFamilySelect');
  const textAlignSelect = document.getElementById('textAlignSelect');
  const fontSizeSlider = document.getElementById('fontSizeSlider');
  const fontSizeVal = document.getElementById('fontSizeVal');

  const strokeWidthSlider = document.getElementById('strokeWidthSlider');
  const strokeWidthVal = document.getElementById('strokeWidthVal');
  const strokeColorInput = document.getElementById('strokeColorInput');

  const uppercaseToggle = document.getElementById('uppercaseToggle');
  const textShadowToggle = document.getElementById('textShadowToggle');

  // --- Application State ---
  const state = {
    image: null,
    topText: topTextInput.value,
    bottomText: bottomTextInput.value,
    topTextColor: topTextColorInput.value,
    bottomTextColor: bottomTextColorInput.value,
    fontFamily: fontFamilySelect.value,
    textAlign: textAlignSelect.value,
    fontSize: parseInt(fontSizeSlider.value, 10),
    strokeWidth: parseInt(strokeWidthSlider.value, 10),
    strokeColor: strokeColorInput.value,
    uppercase: uppercaseToggle.checked,
    shadow: textShadowToggle.checked,
    activePreset: 'gradient'
  };

  // Preset Image Generator (Creates procedurally generated image canvases)
  const presets = {
    gradient: createGradientPreset(),
    cat: createCatPreset(),
    cyberpunk: createCyberPreset(),
    doge: createDogePreset()
  };

  // Initialize with default preset
  loadPresetImage(state.activePreset);

  // --- Preset Image Generators ---
  function createGradientPreset() {
    const pCanvas = document.createElement('canvas');
    pCanvas.width = 1080;
    pCanvas.height = 1080;
    const pCtx = pCanvas.getContext('2d');

    // Rich Dark Gradient
    const grad = pCtx.createLinearGradient(0, 0, 1080, 1080);
    grad.addColorStop(0, '#0f172a');
    grad.addColorStop(0.5, '#1e1b4b');
    grad.addColorStop(1, '#311042');
    pCtx.fillStyle = grad;
    pCtx.fillRect(0, 0, 1080, 1080);

    // Glowing Circles
    const circleGrad1 = pCtx.createRadialGradient(250, 250, 10, 250, 250, 400);
    circleGrad1.addColorStop(0, 'rgba(99, 102, 241, 0.6)');
    circleGrad1.addColorStop(1, 'rgba(99, 102, 241, 0)');
    pCtx.fillStyle = circleGrad1;
    pCtx.beginPath();
    pCtx.arc(250, 250, 400, 0, Math.PI * 2);
    pCtx.fill();

    const circleGrad2 = pCtx.createRadialGradient(850, 850, 10, 850, 850, 450);
    circleGrad2.addColorStop(0, 'rgba(6, 182, 212, 0.5)');
    circleGrad2.addColorStop(1, 'rgba(6, 182, 212, 0)');
    pCtx.fillStyle = circleGrad2;
    pCtx.beginPath();
    pCtx.arc(850, 850, 450, 0, Math.PI * 2);
    pCtx.fill();

    return pCanvas.toDataURL();
  }

  function createCatPreset() {
    const pCanvas = document.createElement('canvas');
    pCanvas.width = 1080;
    pCanvas.height = 1080;
    const pCtx = pCanvas.getContext('2d');

    // Background
    pCtx.fillStyle = '#1e293b';
    pCtx.fillRect(0, 0, 1080, 1080);

    // Cat Face Vector Art
    pCtx.fillStyle = '#334155';
    pCtx.beginPath();
    pCtx.arc(540, 560, 260, 0, Math.PI * 2);
    pCtx.fill();

    // Ears
    pCtx.fillStyle = '#475569';
    pCtx.beginPath();
    pCtx.moveTo(320, 400);
    pCtx.lineTo(260, 180);
    pCtx.lineTo(440, 320);
    pCtx.fill();

    pCtx.beginPath();
    pCtx.moveTo(760, 400);
    pCtx.lineTo(820, 180);
    pCtx.lineTo(640, 320);
    pCtx.fill();

    // Eyes
    pCtx.fillStyle = '#38bdf8';
    pCtx.beginPath();
    pCtx.ellipse(440, 520, 45, 65, 0, 0, Math.PI * 2);
    pCtx.ellipse(640, 520, 45, 65, 0, 0, Math.PI * 2);
    pCtx.fill();

    // Pupils
    pCtx.fillStyle = '#0f172a';
    pCtx.beginPath();
    pCtx.ellipse(440, 520, 15, 55, 0, 0, Math.PI * 2);
    pCtx.ellipse(640, 520, 15, 55, 0, 0, Math.PI * 2);
    pCtx.fill();

    // Nose & Mouth
    pCtx.fillStyle = '#f43f5e';
    pCtx.beginPath();
    pCtx.moveTo(540, 600);
    pCtx.lineTo(515, 580);
    pCtx.lineTo(565, 580);
    pCtx.fill();

    return pCanvas.toDataURL();
  }

  function createCyberPreset() {
    const pCanvas = document.createElement('canvas');
    pCanvas.width = 1080;
    pCanvas.height = 1080;
    const pCtx = pCanvas.getContext('2d');

    // Cyber Sky
    const grad = pCtx.createLinearGradient(0, 0, 0, 1080);
    grad.addColorStop(0, '#050515');
    grad.addColorStop(0.5, '#2a0845');
    grad.addColorStop(1, '#64156e');
    pCtx.fillStyle = grad;
    pCtx.fillRect(0, 0, 1080, 1080);

    // Neon Sun
    const sunGrad = pCtx.createRadialGradient(540, 540, 20, 540, 540, 280);
    sunGrad.addColorStop(0, '#ff007f');
    sunGrad.addColorStop(1, '#ffaa00');
    pCtx.fillStyle = sunGrad;
    pCtx.beginPath();
    pCtx.arc(540, 540, 260, 0, Math.PI * 2);
    pCtx.fill();

    // Grid lines
    pCtx.strokeStyle = 'rgba(0, 240, 255, 0.4)';
    pCtx.lineWidth = 3;
    for (let y = 600; y < 1080; y += 40) {
      pCtx.beginPath();
      pCtx.moveTo(0, y);
      pCtx.lineTo(1080, y);
      pCtx.stroke();
    }

    return pCanvas.toDataURL();
  }

  function createDogePreset() {
    const pCanvas = document.createElement('canvas');
    pCanvas.width = 1080;
    pCanvas.height = 1080;
    const pCtx = pCanvas.getContext('2d');

    const grad = pCtx.createLinearGradient(0, 0, 1080, 1080);
    grad.addColorStop(0, '#fbbf24');
    grad.addColorStop(1, '#d97706');
    pCtx.fillStyle = grad;
    pCtx.fillRect(0, 0, 1080, 1080);

    // Coin shape
    pCtx.fillStyle = '#fef3c7';
    pCtx.beginPath();
    pCtx.arc(540, 540, 360, 0, Math.PI * 2);
    pCtx.fill();

    pCtx.fillStyle = '#b45309';
    pCtx.font = 'bold 360px sans-serif';
    pCtx.textAlign = 'center';
    pCtx.textBaseline = 'middle';
    pCtx.fillText('Ð', 540, 540);

    return pCanvas.toDataURL();
  }

  // --- Load Preset Image Handler ---
  function loadPresetImage(presetKey) {
    if (!presets[presetKey]) return;
    const img = new Image();
    img.onload = () => {
      state.image = img;
      renderCanvas();
    };
    img.src = presets[presetKey];
  }

  // --- Canvas Rendering Core Function ---
  function renderCanvas() {
    if (!state.image) return;

    // Use intrinsic image width and height or scale to crisp bounds
    const imgW = state.image.width || 1080;
    const imgH = state.image.height || 1080;

    canvas.width = imgW;
    canvas.height = imgH;
    canvasDimensions.textContent = `${imgW} × ${imgH} px`;

    // Clear canvas
    ctx.clearRect(0, 0, imgW, imgH);

    // Draw base image
    ctx.drawImage(state.image, 0, 0, imgW, imgH);

    // Text configuration
    const fontSize = Math.round((state.fontSize / 1000) * imgW); // Scaled dynamically with image resolution
    const fontStr = `bold ${fontSize}px ${state.fontFamily}`;
    ctx.font = fontStr;
    ctx.textAlign = state.textAlign;

    // Calculate X placement based on alignment
    let xPos = imgW / 2;
    if (state.textAlign === 'left') xPos = imgW * 0.05;
    if (state.textAlign === 'right') xPos = imgW * 0.95;

    // Shadow configuration
    if (state.shadow) {
      ctx.shadowColor = 'rgba(0, 0, 0, 0.85)';
      ctx.shadowBlur = Math.round(fontSize * 0.25);
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = Math.round(fontSize * 0.08);
    } else {
      ctx.shadowColor = 'transparent';
      ctx.shadowBlur = 0;
    }

    // Process Top Text
    if (state.topText.trim() !== '') {
      const text = state.uppercase ? state.topText.toUpperCase() : state.topText;
      const lines = wrapText(ctx, text, imgW * 0.9);
      const lineHeight = fontSize * 1.15;
      let yPos = fontSize * 1.1;

      lines.forEach(line => {
        drawStyledText(line, xPos, yPos, state.topTextColor);
        yPos += lineHeight;
      });
    }

    // Process Bottom Text
    if (state.bottomText.trim() !== '') {
      const text = state.uppercase ? state.bottomText.toUpperCase() : state.bottomText;
      const lines = wrapText(ctx, text, imgW * 0.9);
      const lineHeight = fontSize * 1.15;
      let yPos = imgH - (lines.length * lineHeight) + (fontSize * 0.8);

      lines.forEach(line => {
        drawStyledText(line, xPos, yPos, state.bottomTextColor);
        yPos += lineHeight;
      });
    }
  }

  // --- Draw Single Line of Text with Stroke & Fill ---
  function drawStyledText(text, x, y, fillColor) {
    // Outer Stroke / Outline
    if (state.strokeWidth > 0) {
      ctx.strokeStyle = state.strokeColor;
      // Scale stroke width to font/image size
      const scaledStroke = (state.strokeWidth / 48) * (state.fontSize / 1000 * canvas.width);
      ctx.lineWidth = Math.max(1, scaledStroke);
      ctx.lineJoin = 'round';
      ctx.strokeText(text, x, y);
    }

    // Fill Text
    ctx.fillStyle = fillColor;
    ctx.fillText(text, x, y);
  }

  // --- Auto Text Wrapping helper ---
  function wrapText(context, text, maxWidth) {
    const words = text.split(' ');
    const lines = [];
    let currentLine = words[0] || '';

    for (let i = 1; i < words.length; i++) {
      const word = words[i];
      const width = context.measureText(currentLine + ' ' + word).width;
      if (width < maxWidth) {
        currentLine += ' ' + word;
      } else {
        lines.push(currentLine);
        currentLine = word;
      }
    }
    lines.push(currentLine);
    return lines;
  }

  // --- File Upload & FileReader Handler ---
  function handleImageFile(file) {
    if (!file || !file.type.startsWith('image/')) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        state.image = img;
        // Deactivate preset buttons active class
        presetButtons.forEach(btn => btn.classList.remove('active'));
        renderCanvas();
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }

  // --- Event Listeners: Image Upload ---
  imageInput.addEventListener('change', (e) => {
    if (e.target.files && e.target.files[0]) {
      handleImageFile(e.target.files[0]);
    }
  });

  // Drag and Drop
  [canvasWrapper, fileDropZone].forEach(zone => {
    zone.addEventListener('dragover', (e) => {
      e.preventDefault();
      dropZoneOverlay.classList.add('drag-over');
    });

    zone.addEventListener('dragleave', (e) => {
      e.preventDefault();
      dropZoneOverlay.classList.remove('drag-over');
    });

    zone.addEventListener('drop', (e) => {
      e.preventDefault();
      dropZoneOverlay.classList.remove('drag-over');
      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        handleImageFile(e.dataTransfer.files[0]);
      }
    });
  });

  // Preset Buttons
  presetButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      presetButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const presetKey = btn.getAttribute('data-preset');
      state.activePreset = presetKey;
      loadPresetImage(presetKey);
    });
  });

  // --- Event Listeners: Inputs & Sliders ---
  topTextInput.addEventListener('input', (e) => {
    state.topText = e.target.value;
    renderCanvas();
  });

  bottomTextInput.addEventListener('input', (e) => {
    state.bottomText = e.target.value;
    renderCanvas();
  });

  topTextColorInput.addEventListener('input', (e) => {
    state.topTextColor = e.target.value;
    renderCanvas();
  });

  bottomTextColorInput.addEventListener('input', (e) => {
    state.bottomTextColor = e.target.value;
    renderCanvas();
  });

  fontFamilySelect.addEventListener('change', (e) => {
    state.fontFamily = e.target.value;
    renderCanvas();
  });

  textAlignSelect.addEventListener('change', (e) => {
    state.textAlign = e.target.value;
    renderCanvas();
  });

  fontSizeSlider.addEventListener('input', (e) => {
    state.fontSize = parseInt(e.target.value, 10);
    fontSizeVal.textContent = `${state.fontSize}px`;
    renderCanvas();
  });

  strokeWidthSlider.addEventListener('input', (e) => {
    state.strokeWidth = parseInt(e.target.value, 10);
    strokeWidthVal.textContent = `${state.strokeWidth}px`;
    renderCanvas();
  });

  strokeColorInput.addEventListener('input', (e) => {
    state.strokeColor = e.target.value;
    renderCanvas();
  });

  uppercaseToggle.addEventListener('change', (e) => {
    state.uppercase = e.target.checked;
    renderCanvas();
  });

  textShadowToggle.addEventListener('change', (e) => {
    state.shadow = e.target.checked;
    renderCanvas();
  });

  // Reset Button
  resetBtn.addEventListener('click', () => {
    topTextInput.value = 'ONE DOES NOT SIMPLY';
    bottomTextInput.value = 'BUILD A WEB APP WITHOUT CSS';
    state.topText = topTextInput.value;
    state.bottomText = bottomTextInput.value;
    state.topTextColor = '#FFFFFF';
    state.bottomTextColor = '#FFFFFF';
    topTextColorInput.value = '#FFFFFF';
    bottomTextColorInput.value = '#FFFFFF';
    fontSizeSlider.value = 48;
    fontSizeVal.textContent = '48px';
    state.fontSize = 48;
    renderCanvas();
  });

  // Download PNG Button
  downloadBtn.addEventListener('click', () => {
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = 'mememore.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  });
});
