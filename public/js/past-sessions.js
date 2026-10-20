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
            <button class="swag-download-btn" id="generate-swag-btn">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
              </svg>
              <span>Download "Sentiment to Swag" Postcard</span>
            </button>
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

  // Generate a commemorative high-res postcard image for download
  generateSwagPostcard(session) {
    const canvas = document.createElement('canvas');
    canvas.width = 1200;
    canvas.height = 1800;
    const ctx = canvas.getContext('2d');

    // Rich background
    const grad = ctx.createLinearGradient(0, 0, 0, 1800);
    grad.addColorStop(0, '#1E0B07');
    grad.addColorStop(0.4, '#872012');
    grad.addColorStop(0.8, '#D05228');
    grad.addColorStop(1, '#F2C249');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 1200, 1800);

    // Decorative outer border
    ctx.strokeStyle = '#F8EFE3';
    ctx.lineWidth = 14;
    ctx.strokeRect(30, 30, 1140, 1740);
    ctx.lineWidth = 2;
    ctx.strokeRect(46, 46, 1108, 1708);

    // Conclave Stamp Header
    ctx.fillStyle = '#F8EFE3';
    ctx.font = 'bold 36px Georgia, serif';
    ctx.textAlign = 'center';
    ctx.fillText('GOA AI TECH CONCLAVE 2026', 600, 110);
    
    ctx.font = '22px Georgia, serif';
    ctx.fillText('SENTIMENT TO SWAG · COLLECTIVE COMPUTATIONAL ART', 600, 145);

    // Sunburst illustration
    ctx.beginPath();
    ctx.arc(600, 500, 140, 0, Math.PI * 2);
    ctx.fillStyle = '#F2C249';
    ctx.fill();

    // Session badge
    ctx.fillStyle = '#F8EFE3';
    ctx.font = 'bold 44px Georgia, serif';
    ctx.fillText(`Session #${session.sessionNumber}`, 600, 1100);

    ctx.font = '28px sans-serif';
    ctx.fillText(session.timeLabel || '30-Minute Cycle', 600, 1150);

    ctx.font = 'italic 24px Georgia, serif';
    ctx.fillText(`"Woven from ${session.totalResponses} Conclave attendee voices"`, 600, 1220);

    // Footer info
    ctx.fillStyle = 'rgba(248, 239, 227, 0.85)';
    ctx.font = '20px monospace';
    ctx.fillText(`Weather: ${session.dominantWeather?.toUpperCase()} · Flavour: ${session.dominantFood?.toUpperCase()} · Landmark: ${session.dominantLocation?.toUpperCase()} · Emblem: ${session.dominantEmblem?.toUpperCase()}`, 600, 1680);

    // Trigger download
    const link = document.createElement('a');
    link.download = `Goa-Conclave-Session-${session.sessionNumber}-Swag.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  }
}
