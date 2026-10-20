// Past Sessions Gallery & Sentiment-to-Swag Generator
// Matches the "Past sessions" cards at the bottom of the reference photo

export class PastSessionsManager {
  constructor(containerElement, onSelectSession) {
    this.container = containerElement;
    this.onSelectSession = onSelectSession || (() => {});
    this.sessions = [];
  }

  setSessions(sessions) {
    this.sessions = sessions || [];
    this.render();
  }

  render() {
    if (!this.container) return;

    if (this.sessions.length === 0) {
      this.container.innerHTML = `
        <div class="past-sessions-empty">
          <p>Artwork transforms every 30 minutes. Completed session artworks will appear here.</p>
        </div>
      `;
      return;
    }

    let html = `
      <div class="past-sessions-strip">
        <div class="past-sessions-header">
          <h3 class="past-sessions-title">Past sessions</h3>
          <span class="past-sessions-subtitle">Archived 30-min Conclave Artworks</span>
        </div>
        <div class="past-sessions-cards-row">
    `;

    this.sessions.slice(-8).reverse().forEach((sess, index) => {
      const imgSrc = sess.snapshotUrl || sess.gifUrl || `/api/sessions/${sess.id}/artwork.gif`;
      const isRealSnapshot = !!sess.snapshotUrl;
      const loopTag = isRealSnapshot ? '🎨 42k Particles' : '⏱️ 9.6s GIF';

      html += `
        <div class="past-card" data-session-id="${sess.id}" tabindex="0" title="Click to view details and generate Swag card">
          <div class="past-card-artwork">
            <img src="${imgSrc}" alt="${sess.name}" class="past-card-gif" loading="lazy" />
            <span class="past-card-loop-tag">${loopTag}</span>
            <div class="past-card-badge">Session #${sess.sessionNumber || (index + 1)}</div>
          </div>
          <div class="past-card-info">
            <span class="past-card-time">${sess.timeLabel || '30 Min Session'}</span>
            <span class="past-card-stats">${sess.totalResponses || 0} voices</span>
          </div>
        </div>
      `;
    });

    html += `
        </div>
      </div>
    `;

    this.container.innerHTML = html;

    // Attach click listeners to cards
    this.container.querySelectorAll('.past-card').forEach(card => {
      card.addEventListener('click', () => {
        const sid = card.getAttribute('data-session-id');
        const session = this.sessions.find(s => s.id === sid);
        if (session) {
          this.showSessionModal(session);
        }
      });
    });
  }

  showSessionModal(session) {
    const modalId = 'conclave-session-modal';
    let modal = document.getElementById(modalId);
    if (!modal) {
      modal = document.createElement('div');
      modal.id = modalId;
      modal.className = 'conclave-modal-backdrop';
      document.body.appendChild(modal);
    }

    const wDist = session.weatherDistribution || {};
    const fDist = session.foodDistribution || {};

    modal.innerHTML = `
      <div class="conclave-modal-card">
        <button class="conclave-modal-close" aria-label="Close">&times;</button>
        <div class="conclave-modal-header">
          <span class="modal-session-tag">Goa Conclave 2026 · Session #${session.sessionNumber}</span>
          <h2 class="modal-title">${session.name || 'Conclave Session'}</h2>
          <p class="modal-subtitle">${session.timeLabel} · ${session.totalResponses} audience responses</p>
        </div>

        <div class="conclave-modal-body">
          <div class="modal-artwork-preview">
            <div class="modal-canvas-frame">
              <img src="${session.snapshotUrl || session.gifUrl || `/api/sessions/${session.id}/artwork.gif`}" alt="${session.name || 'Conclave Artwork'}" class="modal-artwork-gif" />
              <div class="modal-gif-tag">${session.snapshotUrl ? '🎨 42,000 Particles · Authentic Canvas Render' : '⏱️ 9.6s Loop · 8 Keyframes'}</div>
            </div>
            <div class="modal-download-actions">
              <button class="swag-download-btn" id="generate-swag-btn" title="Download Commemorative Postcard with Authentic Artwork">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                  <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
                </svg>
                <span>Download Postcard</span>
              </button>
              <button class="swag-download-btn secondary-btn" id="download-raw-artwork-btn" title="Download Pure 42,000 Particle High-Resolution Artwork">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                  <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
                </svg>
                <span>Artwork HD</span>
              </button>
            </div>
          </div>

          <div class="modal-sentiment-details">
            ${session.topologyInfo ? `
              <div class="modal-topology-box" style="margin-bottom: 16px; background: rgba(42, 18, 14, 0.7); border-left: 3px solid var(--goa-gold); padding: 10px 12px; border-radius: 0 8px 8px 0;">
                <div style="font-family: 'Cinzel', serif; font-size: 0.85rem; color: var(--goa-gold); font-weight: 700;">${session.topologyInfo.name}</div>
                <div style="font-size: 0.76rem; color: #E2A085; font-style: italic; margin-top: 2px;">${session.topologyInfo.archetype || ''}</div>
                <div style="font-size: 0.74rem; color: #FFF; margin-top: 4px; line-height: 1.35;">${session.topologyInfo.reasoning || ''}</div>
              </div>
            ` : ''}
            <h4 class="details-heading">1. Weather Sentiment</h4>
            <div class="sentiment-bars">
              ${this.renderBar('Sunny & Energetic', wDist.sunny || 0, session.totalResponses, '#F2C249')}
              ${this.renderBar('Windy & Restless', wDist.windy || 0, session.totalResponses, '#E58A42')}
              ${this.renderBar('Rainy & Reflective', wDist.rainy || 0, session.totalResponses, '#6A92A6')}
              ${this.renderBar('Stormy & Eclectic', wDist.stormy || 0, session.totalResponses, '#B53823')}
              ${this.renderBar('Calm & Serene', wDist.calm || 0, session.totalResponses, '#D4A373')}
            </div>

            <h4 class="details-heading" style="margin-top: 18px;">2. Goan Food Metaphors</h4>
            <div class="sentiment-bars">
              ${this.renderBar('Fish Curry', fDist.fish_curry || 0, session.totalResponses, '#D66829')}
              ${this.renderBar('Prawn Curry', fDist.prawn_curry || 0, session.totalResponses, '#E27D60')}
              ${this.renderBar('Vindaloo', fDist.vindaloo || 0, session.totalResponses, '#9E2A2B')}
              ${this.renderBar('Xacuti', fDist.xacuti || 0, session.totalResponses, '#854D27')}
              ${this.renderBar('Bebinca', fDist.bebinca || 0, session.totalResponses, '#C88B37')}
              ${this.renderBar('Poe Bread', fDist.poe_bread || 0, session.totalResponses, '#C39B77')}
            </div>

            <h4 class="details-heading" style="margin-top: 18px;">3. Top Goa Landmarks</h4>
            <div class="sentiment-bars">
              ${this.renderBar('Dudhsagar Falls', (session.locationDistribution || {}).dudhsagar || 0, session.totalResponses, '#6A92A6')}
              ${this.renderBar('Aguada Lighthouse', (session.locationDistribution || {}).aguada_fort || 0, session.totalResponses, '#D4A373')}
              ${this.renderBar('Fontainhas Quarter', (session.locationDistribution || {}).fontainhas || 0, session.totalResponses, '#E27D60')}
              ${this.renderBar('Chapora Fort', (session.locationDistribution || {}).chapora_fort || 0, session.totalResponses, '#C88B37')}
              ${this.renderBar('Palolem Beach', (session.locationDistribution || {}).palolem_beach || 0, session.totalResponses, '#307A78')}
              ${this.renderBar('Cabo de Rama Fort', ((session.locationDistribution || {}).cabo_de_rama || (session.locationDistribution || {}).old_goa_basilica || 0), session.totalResponses, '#E58A42')}
            </div>

            <h4 class="details-heading" style="margin-top: 18px;">4. Goan Cultural & Natural Emblems</h4>
            <div class="sentiment-bars">
              ${this.renderBar('Mandovi Sailboat', (session.emblemDistribution || {}).mandovi_boat || 0, session.totalResponses, '#F2C249')}
              ${this.renderBar('Coconut Palm', (session.emblemDistribution || {}).coconut_palm || 0, session.totalResponses, '#3A7D44')}
              ${this.renderBar('Olive Ridley Turtle', (session.emblemDistribution || {}).sea_turtle || 0, session.totalResponses, '#2A9D8F')}
              ${this.renderBar('Goan Kingfisher', (session.emblemDistribution || {}).kingfisher || 0, session.totalResponses, '#264653')}
              ${this.renderBar('Viva Carnival Mask', (session.emblemDistribution || {}).carnival_spirit || 0, session.totalResponses, '#E76F51')}
              ${this.renderBar('Susegad Hammock', (session.emblemDistribution || {}).susegad || 0, session.totalResponses, '#E9C46A')}
            </div>
          </div>
        </div>
      </div>
    `;

    modal.classList.add('active');

    modal.querySelector('.conclave-modal-close').onclick = () => modal.classList.remove('active');
    modal.onclick = (e) => {
      if (e.target === modal) modal.classList.remove('active');
    };

    modal.querySelector('#generate-swag-btn').onclick = () => {
      this.generateSwagPostcard(session);
    };

    modal.querySelector('#download-raw-artwork-btn').onclick = () => {
      this.downloadRawArtwork(session);
    };
  }

  renderBar(label, count, total, color) {
    const pct = total > 0 ? Math.round((count / total) * 100) : 0;
    return `
      <div class="sentiment-bar-row">
        <span class="bar-label">${label}</span>
        <div class="bar-track">
          <div class="bar-fill" style="width: ${pct}%; background-color: ${color}"></div>
        </div>
        <span class="bar-pct">${pct}% (${count})</span>
      </div>
    `;
  }

  // Generate a commemorative high-res postcard image embedding the authentic 42,000 particle artwork
  generateSwagPostcard(session) {
    const canvas = document.createElement('canvas');
    canvas.width = 1200;
    canvas.height = 1800;
    const ctx = canvas.getContext('2d');

    const downloadDirect = () => {
      const link = document.createElement('a');
      link.download = `ManyMindsOneTomorrow-Session-${session.sessionNumber || 'Artwork'}-Postcard.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    };

    const drawCard = (artworkImg) => {
      // 1. Rich Museum Background
      const grad = ctx.createLinearGradient(0, 0, 0, 1800);
      grad.addColorStop(0, '#0D0403');
      grad.addColorStop(0.4, '#180705');
      grad.addColorStop(0.8, '#240A07');
      grad.addColorStop(1, '#0A0302');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 1200, 1800);

      // Subtle atmospheric warmth in center
      const radial = ctx.createRadialGradient(600, 680, 50, 600, 680, 700);
      radial.addColorStop(0, 'rgba(184, 58, 36, 0.22)');
      radial.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = radial;
      ctx.fillRect(0, 0, 1200, 1800);

      // 2. Decorative Double Gold Border
      ctx.strokeStyle = '#D4AF37';
      ctx.lineWidth = 4;
      ctx.strokeRect(36, 36, 1128, 1728);
      ctx.strokeStyle = 'rgba(242, 194, 73, 0.4)';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(48, 48, 1104, 1704);

      // Corner flourishes
      const cornerSize = 28;
      const drawCorner = (x, y, dx, dy) => {
        ctx.beginPath();
        ctx.moveTo(x, y + dy * cornerSize);
        ctx.lineTo(x, y);
        ctx.lineTo(x + dx * cornerSize, y);
        ctx.strokeStyle = '#F2C249';
        ctx.lineWidth = 3;
        ctx.stroke();
      };
      drawCorner(48, 48, 1, 1);
      drawCorner(1152, 48, -1, 1);
      drawCorner(48, 1752, 1, -1);
      drawCorner(1152, 1752, -1, -1);

      // 3. Exhibition Title & Artist Attribution
      ctx.fillStyle = '#F2C249';
      ctx.font = 'bold 36px Georgia, serif';
      ctx.textAlign = 'center';
      ctx.fillText('MANY MINDS ONE TOMORROW', 600, 112);

      ctx.fillStyle = '#E2A085';
      ctx.font = '500 22px Georgia, serif';
      ctx.fillText('ARTWORK BY HARSHIT AGRAWAL  ·  @harshitrnnh', 600, 150);

      // Fine separator
      ctx.strokeStyle = 'rgba(242, 194, 73, 0.35)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(250, 175);
      ctx.lineTo(950, 175);
      ctx.stroke();

      // 4. Authentic 42,000 Particle Artwork Canvas Area
      const artW = 540;
      const artH = 960;
      const artX = (1200 - artW) / 2; // 330
      const artY = 205;

      // Glow behind artwork
      ctx.save();
      ctx.shadowColor = 'rgba(221, 104, 41, 0.45)';
      ctx.shadowBlur = 30;
      ctx.fillStyle = '#050201';
      ctx.fillRect(artX, artY, artW, artH);
      ctx.restore();

      // Draw real artwork image
      if (artworkImg && artworkImg.naturalWidth) {
        ctx.drawImage(artworkImg, artX, artY, artW, artH);
      } else {
        ctx.fillStyle = '#1a0805';
        ctx.fillRect(artX, artY, artW, artH);
      }

      // Gold rim around artwork
      ctx.strokeStyle = 'rgba(242, 194, 73, 0.6)';
      ctx.lineWidth = 2;
      ctx.strokeRect(artX, artY, artW, artH);

      // 5. Session & Topology Information (Below Artwork)
      const topoName = session.topologyInfo?.name || 'Collective Computational Tapestry';
      const topoArchetype = session.topologyInfo?.archetype || 'Goan Environmental & Cultural Synthesis';

      ctx.fillStyle = '#F8EFE3';
      ctx.font = 'bold 32px Georgia, serif';
      ctx.fillText(topoName, 600, 1230);

      ctx.fillStyle = '#E5A93C';
      ctx.font = 'italic 20px Georgia, serif';
      ctx.fillText(topoArchetype, 600, 1268);

      // Session number badge & timing
      ctx.fillStyle = '#F8EFE3';
      ctx.font = '600 24px sans-serif';
      ctx.fillText(`Session #${session.sessionNumber || '0'}   ·   ${session.timeLabel || '30-Minute Cycle'}`, 600, 1324);

      // Attendees attribution
      ctx.fillStyle = '#C99688';
      ctx.font = 'italic 20px Georgia, serif';
      const voicesText = session.totalResponses
        ? `"Woven dynamically from ${session.totalResponses} Conclave attendee voices"`
        : '"Living computational synthesis of collective attendee sentiment"';
      ctx.fillText(voicesText, 600, 1362);

      // Fine separator
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(180, 1405);
      ctx.lineTo(1020, 1405);
      ctx.stroke();

      // 6. Sentiment Synthesis Strip (Dominant choices)
      const weather = (session.dominantWeather || 'Sunny').replace('_', ' ').toUpperCase();
      const food = (session.dominantFood || 'Fish Curry').replace('_', ' ').toUpperCase();
      const location = (session.dominantLocation || 'Aguada Fort').replace('_', ' ').toUpperCase();
      const emblem = (session.dominantEmblem || 'Mandovi Boat').replace('_', ' ').toUpperCase();

      const items = [
        { label: 'WEATHER', val: weather },
        { label: 'FLAVOUR', val: food },
        { label: 'LANDMARK', val: location },
        { label: 'EMBLEM', val: emblem }
      ];

      const colW = 220;
      const startX = 170;
      items.forEach((item, idx) => {
        const x = startX + idx * colW;
        ctx.fillStyle = '#E5A93C';
        ctx.font = 'bold 13px sans-serif';
        ctx.fillText(item.label, x + colW / 2, 1450);

        ctx.fillStyle = '#F8EFE3';
        ctx.font = '600 16px Georgia, serif';
        ctx.fillText(item.val, x + colW / 2, 1480);
      });

      // 7. Footer Tagline
      ctx.fillStyle = 'rgba(248, 239, 227, 0.45)';
      ctx.font = '14px sans-serif';
      ctx.fillText('Goa AI Tech Conclave  ·  Live Algorithmic Tapestry  ·  Many Minds One Tomorrow', 600, 1680);

      downloadDirect();
    };

    // Load actual high-res session artwork image
    const rawUrl = session.snapshotUrl || session.gifUrl || `/archive/session-0${session.sessionNumber || 1}.jpg`;
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => drawCard(img);
    img.onerror = () => {
      console.warn('Could not load snapshot directly, drawing without image');
      drawCard(null);
    };
    img.src = rawUrl;
  }

  // Direct 1-click download of the raw 42,000 particle high-res artwork image
  downloadRawArtwork(session) {
    const rawUrl = session.snapshotUrl || session.gifUrl || `/archive/session-0${session.sessionNumber || 1}.jpg`;
    const link = document.createElement('a');
    link.download = `ManyMindsOneTomorrow-Session-${session.sessionNumber || 'Artwork'}-HD.jpg`;
    link.href = rawUrl;
    link.target = '_blank';
    link.click();
  }
}
