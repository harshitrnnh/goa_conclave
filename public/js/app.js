// Main Application Bootstrap for Goa Conclave
// Integrates Computational Artwork, Tablet Kiosk, Real-Time Sync, and 30-Min Cycles

import { GoanArtworkEngine } from './particle-engine.js?v=46';
import { SentimentEngine, getArtworkImpactWriteup, scoreBestTopologyForResponse } from './sentiment-engine.js';
import { TabletApp } from './tablet-app.js';
import { SyncManager } from './sync.js';
import { PastSessionsManager } from './past-sessions.js';
import { QRHelper } from './qr-helper.js';
import { GOAN_BORDER_FRIEZE, WEATHER_ICONS, FOOD_ICONS, LOCATION_ICONS, EMBLEM_ICONS } from './icons.js';

class ConclaveApp {
  constructor() {
    this.root = document.getElementById('app-root');
    this.sentimentEngine = new SentimentEngine();
    this.artworkEngine = null;
    this.syncManager = null;
    this.tabletApp = null;
    this.pastSessionsManager = null;
    this.qrHelper = null;

    this.tvSurvey = {
      step: 1, // 1: Weather, 2: Food, 3: Location, 4: Emblem, 5: Reflection/Submit, 6: Success
      weather: null,
      food: null,
      location: null,
      emblem: null,
      author: '',
      note: '',
      resetTimer: null
    };

    this.currentMode = this.detectMode();
    this.activeShowcaseTab = 'live'; // 'live' | 'past'
    this.activeDualTab = 'vote'; // 'vote' | 'past'
    this.currentSession = null;
    this.pastSessions = [];
    this.tabletUrl = window.location.origin + '/';

    this.timerInterval = null;
    this.init();
  }

  detectMode() {
    const params = new URLSearchParams(window.location.search);
    const mode = params.get('mode');
    if (mode === 'simulate') {
      return 'simulate';
    }
    if (mode === 'tri' || mode === 'triple' || mode === '3col') {
      return 'tri';
    }
    if (mode === 'dual' || mode === 'wall' || mode === '2col') {
      return 'dual';
    }
    if (mode === 'screen') {
      return 'screen';
    }
    if (mode === 'lp' || mode === 'lowpower' || mode === 'light') {
      return 'lp';
    }
    // Default: root URL (https://goa-conclave.onrender.com/) opens ONLY tablet input mode
    return 'tablet';
  }

  isLowPowerMode() {
    const params = new URLSearchParams(window.location.search);
    const m = (params.get('mode') || this.currentMode || '').toLowerCase();
    const lpParam = (params.get('lp') || '').toLowerCase();
    return m === 'lp' || m === 'lowpower' || m === 'light' || lpParam === '1' || lpParam === 'true';
  }

  async init() {
    this.initSyncManager();
    this.setupView();
    this.setupPresenterTray();
    this.setupKeyboardShortcuts();
    this.startSessionTimer();

    // Load authentic seed points from reference images
    try {
      const res = await fetch('assets/public_points_seed.json');
      if (res.ok) {
        const seedData = await res.json();
        if (this.artworkEngine && this.artworkEngine.currentTopology === 0) {
          this.artworkEngine.loadSeedPoints(seedData);
        }
      }
    } catch (e) {
      console.warn('Seed points fetch optional fallback:', e);
    }

    // Generate historical snapshots if missing
    setTimeout(() => {
      this.ensureHistoricalSnapshots();
    }, 1200);
  }

  initSyncManager() {
    this.syncManager = new SyncManager({
      onInitialState: (data) => {
        this.currentSession = data.currentSession;
        this.pastSessions = data.pastSessions || [];
        if (data.tabletUrl) {
          this.tabletUrl = data.tabletUrl;
        }

        // Synthesize initial session parameters
        this.sentimentEngine.synthesizeSession(this.currentSession);

        if (this.artworkEngine && typeof data.currentSession?.mutationTopology === 'number') {
          const topo = data.currentSession.mutationTopology;
          this.artworkEngine.currentTopology = topo;
          this.artworkEngine.generateTopology(
            topo,
            this.artworkEngine.px,
            this.artworkEngine.py,
            this.artworkEngine.size,
            this.artworkEngine.colorIdx,
            this.artworkEngine.layer
          );
          this.artworkEngine.hx.set(this.artworkEngine.px);
          this.artworkEngine.hy.set(this.artworkEngine.py);
          this.artworkEngine.baseColorIdx.set(this.artworkEngine.colorIdx);
        }

        if (this.pastSessionsManager) {
          this.pastSessionsManager.setSessions(this.pastSessions);
        }

        if (this.tabletApp) {
          this.tabletApp.setPastSessions(this.pastSessions);
        }

        const badgeEl = document.getElementById('showcase-past-badge');
        if (badgeEl) badgeEl.textContent = this.pastSessions.length;

        this.updateHUD();
        this.updateTVArchiveCard();
        this.refreshQRCode();
        this.ensureHistoricalSnapshots();
      },

      onNewResponse: (response, totalCount) => {
        console.log('Live Response Influx:', response);
        if (this.artworkEngine) {
          this.artworkEngine.addResponseBurst(response);
        }

        if (this.currentSession) {
          if (!this.currentSession.responses) this.currentSession.responses = [];
          this.currentSession.responses.push(response);
          // Preserve active response's colors and animation forces; do not overwrite with session average
        }

        this.showToastNotification(response);
        this.updateHUD();
      },

      onCycleAdvanced: (data) => {
        console.log('30-Minute Cycle Advanced:', data);
        this.currentSession = data.currentSession;
        if (data.topologyInfo) {
          this.currentSession.topologyInfo = data.topologyInfo;
        }
        if (data.pastSessions) {
          this.pastSessions = data.pastSessions;
          if (this.pastSessionsManager) {
            this.pastSessionsManager.setSessions(this.pastSessions);
          }
          if (this.tabletApp) {
            this.tabletApp.setPastSessions(this.pastSessions);
          }
          const badgeEl = document.getElementById('showcase-past-badge');
          if (badgeEl) badgeEl.textContent = this.pastSessions.length;
          const tvTabCount = document.getElementById('tv-tab-past-count');
          if (tvTabCount) tvTabCount.textContent = this.pastSessions.length;
          if (this.activeShowcaseTab === 'past') {
            this.renderShowcasePastGallery();
          }
          this.updateTVArchiveCard();
        }

        // Capture final frame snapshot of the completed session and upload to server storage
        if (data.archivedSession && this.artworkEngine) {
          try {
            const snap = this.artworkEngine.captureCurrentFrameSnapshot('image/jpeg', 0.90);
            if (snap) {
              this.syncManager.uploadSessionSnapshot(data.archivedSession.id, snap);
            }
          } catch (e) {
            console.warn('Error capturing cycle snapshot:', e);
          }
        }

        // Trigger continuous sentiment parameter update
        this.sentimentEngine.synthesizeSession(this.currentSession);

        // Trigger cinematic structural mutation morphing (Topology 0-19)
        if (this.artworkEngine) {
          const targetTopology = (typeof data.mutationTopology === 'number')
            ? data.mutationTopology
            : ((this.artworkEngine.currentTopology + 1) % 20);
          this.artworkEngine.morphToTopology(targetTopology, 3.4);
        }

        this.updateHUD();
      },

      onSessionSnapshotUpdated: (data) => {
        console.log('Session Snapshot Updated:', data);
        if (data.pastSessions) {
          this.pastSessions = data.pastSessions;
          if (this.pastSessionsManager) {
            this.pastSessionsManager.setSessions(this.pastSessions);
          }
          if (this.tabletApp) {
            this.tabletApp.setPastSessions(this.pastSessions);
          }
          const badgeEl = document.getElementById('showcase-past-badge');
          if (badgeEl) badgeEl.textContent = this.pastSessions.length;
          const tvTabCount = document.getElementById('tv-tab-past-count');
          if (tvTabCount) tvTabCount.textContent = this.pastSessions.length;
          if (this.activeShowcaseTab === 'past') {
            this.renderShowcasePastGallery();
          }
          this.updateTVArchiveCard();
        }
      }
    });
  }

  renderCuratorCardHtml() {
    return `
      <aside class="curator-reference-card" id="curator-card" aria-label="Curator Reference">
        <div class="curator-badge-row">
          <span class="curator-tag" id="curator-tag">Topology #1 / 20</span>
          <span class="curator-timer" id="curator-timer">30:00 cycle</span>
        </div>
        <h2 class="curator-title" id="curator-title">Mandovi Estuary Flux</h2>
        <div class="curator-archetype" id="curator-archetype">Tidal Fluidity & Estuarine Vectors</div>
        <div class="curator-reasoning-box">
          <span class="curator-reasoning-label">Topology Selection Reasoning</span>
          <p id="curator-reasoning">Responding to current Goan sentiment...</p>
        </div>
        <div class="curator-data-grid">
          <div class="curator-data-item">
            <span class="data-label">Weather Sentiment</span>
            <span class="data-value" id="curator-data-weather">Calm</span>
          </div>
          <div class="curator-data-item">
            <span class="data-label">Food Flavour</span>
            <span class="data-value" id="curator-data-food">Fish Curry</span>
          </div>
          <div class="curator-data-item">
            <span class="data-label">Goan Location</span>
            <span class="data-value" id="curator-data-location">Palolem Beach</span>
          </div>
          <div class="curator-data-item">
            <span class="data-label">Cultural Emblem</span>
            <span class="data-value" id="curator-data-emblem">Susegad Life</span>
          </div>
        </div>
        <div class="curator-debug-bar">
          <span id="curator-debug-voices">Voices: 0</span> · 
          <span id="curator-debug-session">Session #1</span> · 
          <span class="debug-live-dot">●</span> <span>Live Sync</span>
        </div>
      </aside>
    `;
  }

  switchShowcaseTab(tab) {
    this.activeShowcaseTab = tab;
    if (this.currentMode === 'dual' || this.currentMode === 'tri' || this.currentMode === 'wall') {
      this.setupView();
    }
  }

  formatTag(str) {
    if (!str) return '';
    return str.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  }

  setupView() {
    this.root.innerHTML = '';
    this.updateTrayButtons();

    // Bottom debug controls bar: displayed ONLY in simulate mode (/?mode=simulate)
    const tray = document.getElementById('presenter-tray');
    if (tray) {
      tray.style.display = (this.currentMode === 'simulate') ? 'flex' : 'none';
    }

    switch (this.currentMode) {
      case 'screen':
      case 'lp': {
        const params = new URLSearchParams(window.location.search);
        const view = (params.get('view') || '').toLowerCase();
        if (view === 'dual' || view === 'showcase' || params.get('dual') === '1') {
          this.renderUnifiedShowcaseView();
        } else {
          this.renderPureScreenView();
        }
        break;
      }
      case 'tablet':
        this.renderTabletView();
        break;
      case 'simulate':
      case 'dual':
      case 'tri':
      case 'wall':
      default:
        if (this.activeShowcaseTab === 'past') {
          this.renderShowcasePastGallery();
        } else {
          this.renderUnifiedShowcaseView();
        }
    }
  }

  // Unified Showcase: Horizontal Touch-Enabled TV Layout (63.5% Artwork Canvas + 36.5% Interactive Tablet Kiosk + POAI Logo)
  renderUnifiedShowcaseView() {
    const featuredSession = (this.pastSessions && this.pastSessions.length > 0)
      ? this.pastSessions[this.pastSessions.length - 1]
      : (this.currentSession || {
          sessionNumber: 1,
          name: 'Many Minds - Collective Artworks',
          timeLabel: '11:00 - 11:30 IST',
          totalResponses: 0,
          snapshotUrl: null,
          topologyInfo: {
            name: 'Intertwined Marine Currents & Laterite Fire Strata',
            archetype: 'Dual Opposing Oceanic Teal & Laterite Vermilion Waves',
            reasoning: 'Western Ghats tempest energy colliding with coastal warmth generated interlocking Arabian Sea teal and laterite vermilion dual currents.'
          }
        });

    const pastCount = (this.pastSessions && Array.isArray(this.pastSessions)) ? this.pastSessions.length : 0;

    const weatherOptions = [
      { id: 'sunny', label: 'Sunny', sub: '& Energetic', icon: WEATHER_ICONS.sunny },
      { id: 'windy', label: 'Windy', sub: '& Restless', icon: WEATHER_ICONS.windy },
      { id: 'rainy', label: 'Rainy', sub: '& Reflective', icon: WEATHER_ICONS.rainy },
      { id: 'stormy', label: 'Stormy', sub: '& Eclectic', icon: WEATHER_ICONS.stormy },
      { id: 'calm', label: 'Calm', sub: '& Serene', icon: WEATHER_ICONS.calm }
    ];

    const isTriMode = (this.currentMode === 'tri');

    this.root.innerHTML = `
      <main class="touch-tv-layout ${isTriMode ? 'touch-tv-layout-tri' : ''}" id="touch-tv-root">
        <!-- 1. LEFT PANEL: Full-Height Computational Artwork (Uncropped 9:16 Vertical Screen Ratio) -->
        <section class="touch-tv-screen-side" aria-label="Conference Sentiment Computational Artwork">
          <div class="tv-vertical-screen-frame" id="vertical-frame">
            <canvas id="artwork-canvas" class="computational-artwork-canvas"></canvas>
          </div>
        </section>

        <!-- 2. MIDDLE PANEL / KIOSK PANEL: Interactive Survey & Previous Artworks -->
        <section class="touch-tv-kiosk-side ${isTriMode ? 'touch-tv-middle-side' : ''}" aria-label="Audience Sentiment Touch Kiosk" id="tv-kiosk-container">
          <!-- Header: Artist Credit on Left, Layout Switcher & POAI Logo on Top Right -->
          <header class="tv-kiosk-header">
            <div class="tv-artist-block">
              <div class="tv-artist-title-row">
                <span class="tv-artist-title">Artwork by Harshit Agrawal</span>
                <span class="tv-artist-handle">@harshitrnnh</span>
              </div>
              <div class="tv-artist-bio-row">
                <img src="assets/harshit_agrawal.png" alt="Harshit Agrawal" class="tv-artist-photo" />
                <span class="tv-artist-bio-text">Held India's first solo AI Art Show, Exhibition in 20 countries, 5 TEDx Talks, Google's first Artist Resident in India.</span>
              </div>
            </div>

            <div class="tv-header-right-group">
              <div class="tv-layout-toggle-pill" role="group" aria-label="Layout Version">
                <button type="button" class="tv-layout-pill-btn ${!isTriMode ? 'active' : ''}" id="btn-switch-dual" title="Switch to 2-Column Layout">2-Col</button>
                <button type="button" class="tv-layout-pill-btn ${isTriMode ? 'active' : ''}" id="btn-switch-tri" title="Switch to 3-Column Layout">3-Col</button>
              </div>
              <div class="tv-poai-badge" id="tv-poai-badge" title="POAI - Conclave">
                <img src="assets/poai_official_logo.png" alt="POAI" class="tv-poai-logo-img" />
              </div>
            </div>
          </header>

          <!-- Dedicated Navigation Bar Row for 16:9 Display -->
          <div class="tv-nav-bar-row">
            <nav class="tablet-nav-tabs" role="tablist" aria-label="Dual Kiosk Tabs">
              <button class="tablet-tab-btn ${this.activeDualTab === 'vote' ? 'active' : ''}" id="dual-tab-btn-vote" role="tab" aria-selected="${this.activeDualTab === 'vote'}">
                <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor">
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"/>
                </svg>
                <span>Vote</span>
              </button>
              <button class="tablet-tab-btn ${this.activeDualTab === 'past' ? 'active' : ''}" id="dual-tab-btn-past" role="tab" aria-selected="${this.activeDualTab === 'past'}">
                <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14h-2v-2h2v2zm0-4h-2V7h2v5z"/>
                </svg>
                <span>Previous Artworks</span>
                <span class="tab-badge-pill" id="tv-tab-past-count">${pastCount}</span>
              </button>
            </nav>
          </div>

          <!-- Main Kiosk Body: Interactive Survey OR Previous Artworks Archive Grid -->
          <div id="tv-kiosk-body-container" class="tv-kiosk-body-container"></div>
        </section>

        ${isTriMode ? `
        <!-- 3. RIGHT PANEL: Dedicated QR Code Column -->
        <aside class="touch-tv-qr-side" aria-label="Scan to Participate">
          <div class="tv-qr-col-inner">
            <div class="tv-qr-col-header">
              <div class="tv-qr-live-pill">
                <span class="tv-live-pulse-dot"></span>
                <span class="tv-qr-live-text">LIVE INTERACTIVE</span>
              </div>
              <h3 class="tv-qr-col-title">SCAN TO PARTICIPATE</h3>
              <p class="tv-qr-col-sub">Point smartphone camera to weave into the live artwork from your mobile screen</p>
            </div>

            <div class="tv-qr-col-box-wrap">
              <div class="tv-qr-col-frame">
                <div class="tv-kiosk-qr-box" id="screen-qr-container"></div>
              </div>
            </div>

            <div class="tv-qr-col-footer">
              <p class="tv-qr-hint">No app download needed · Instant mobile browser vote</p>
              <div class="tv-qr-conclave-badge">
                <span>Goa AI Conclave 2026</span>
                <span class="badge-dot">•</span>
                <span>Many Minds</span>
              </div>
            </div>
          </div>
        </aside>
        ` : ''}
      </main>

      <!-- Toast notifications container -->
      <div class="influx-toast-container" id="toast-container"></div>
      <section id="past-sessions-strip-container" style="display: none;"></section>
    `;

    this.mountArtworkCanvas();
    this.mountQRHelpers();
    this.mountPastSessions();
    this.bindTouchTVEvents(featuredSession);
  }

  bindTouchTVEvents(featuredSession) {
    const voteTab = document.getElementById('dual-tab-btn-vote');
    if (voteTab) {
      voteTab.onclick = () => this.switchDualTab('vote');
    }

    const pastTab = document.getElementById('dual-tab-btn-past');
    if (pastTab) {
      pastTab.onclick = () => this.switchDualTab('past');
    }

    // Layout switchers
    const btnDual = document.getElementById('btn-switch-dual');
    if (btnDual) {
      btnDual.onclick = () => this.switchMode('dual');
    }

    const btnTri = document.getElementById('btn-switch-tri');
    if (btnTri) {
      btnTri.onclick = () => this.switchMode('tri');
    }

    // POAI badge tap feedback
    const poaiBadge = document.getElementById('tv-poai-badge');
    if (poaiBadge) {
      poaiBadge.onclick = () => {
        this.showToastNotification({
          author: 'POAI 2026',
          note: 'Goa AI Conclave · Many Minds - Collective Artworks'
        });
      };
    }

    this.renderDualKioskContent(featuredSession);
  }

  switchDualTab(tab) {
    this.activeDualTab = tab;
    this.renderDualKioskContent();
  }

  renderDualKioskContent(featuredSession) {
    const bodyContainer = document.getElementById('tv-kiosk-body-container');
    if (!bodyContainer) return;

    const voteTab = document.getElementById('dual-tab-btn-vote');
    const pastTab = document.getElementById('dual-tab-btn-past');
    if (voteTab) voteTab.classList.toggle('active', this.activeDualTab === 'vote');
    if (pastTab) pastTab.classList.toggle('active', this.activeDualTab === 'past');

    if (this.activeDualTab === 'past') {
      bodyContainer.innerHTML = this.renderDualPastGallery();
      this.bindDualPastGalleryEvents();
    } else {
      const session = featuredSession || (this.pastSessions && this.pastSessions.length > 0
        ? this.pastSessions[this.pastSessions.length - 1]
        : (this.currentSession || {
            name: 'Mandovi River Sailboat & Fluvial Wake Currents',
            timeLabel: 'Live 30-Min Cycle',
            topologyInfo: {
              name: 'Mandovi River Sailboat & Fluvial Wake Currents',
              reasoning: 'Restless coastal sea winds (SUNNY) and historic Aguada fortress presence (DUDHSAGAR) created 16 concentric orbital light shells and sweeping celestial ray arms.'
            }
          }));

      bodyContainer.innerHTML = `
        <!-- Previous 2 Artworks Grid with 3rd View More Card (Above Current Artwork Description) -->
        <div class="tv-past-preview-grid" id="tv-past-preview-grid"></div>

        <!-- Current Live Artwork Information (Title & Brief Description) -->
        <div class="tv-current-artwork-card" id="tv-current-artwork-card">
          <div class="tv-current-art-top-row">
            <div class="tv-current-art-header">
              <span class="tv-live-pulse-dot"></span>
              <span class="tv-current-art-badge">CURRENT LIVE ARTWORK</span>
            </div>
          </div>
          <h3 class="tv-current-art-title" id="tv-current-art-title">${session.topologyInfo?.name || session.name || 'Mandovi River Sailboat & Fluvial Wake Currents'}</h3>
          <p class="tv-current-art-desc" id="tv-current-art-desc">${session.topologyInfo?.reasoning || session.description || 'Restless coastal sea winds (SUNNY) and historic Aguada fortress presence (DUDHSAGAR) created 16 concentric orbital light shells and sweeping celestial ray arms.'}</p>
        </div>

        <!-- Survey Section (All input options in UI + Inline QR Code) -->
        <div class="tv-survey-section" id="tv-survey-section"></div>
      `;

      this.renderTVPastPreviewGrid();
      this.renderTVSurveyStep();
    }
  }

  renderDualPastGallery() {
    const sessions = (this.pastSessionsManager && this.pastSessionsManager.sessions && this.pastSessionsManager.sessions.length > 0)
      ? this.pastSessionsManager.sessions
      : this.pastSessions;

    if (!sessions || sessions.length === 0) {
      return `
        <div class="tablet-past-empty-state" style="padding: 40px 20px; text-align: center; color: #7A2818;">
          <p>No previous artworks recorded yet. Artworks archive every 30 minutes.</p>
          <button class="tablet-quick-return-btn" id="dual-past-return-vote-btn" style="margin-top: 16px;">Return to Vote</button>
        </div>
      `;
    }

    return `
      <div class="tablet-past-gallery-scroll" style="height: 100%; overflow-y: auto;">
        <div class="tablet-past-gallery-header" style="margin-bottom: 12px;">
          <div>
            <h2 class="tablet-past-gallery-title">Previous Artworks Archive</h2>
          </div>
          <button class="tablet-quick-return-btn" id="dual-past-return-vote-btn">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
              <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"/>
            </svg>
            <span>Back to Vote</span>
          </button>
        </div>

        <div class="tablet-past-cards-grid">
          ${sessions.map((sess, idx) => {
            const imgSrc = sess.snapshotUrl || sess.gifUrl || `/archive/${sess.id}.jpg`;
            const reasoning = sess.topologyInfo?.reasoning || sess.description || 'Generated from 30-min attendee sentiment vector convergence.';

            return `
              <article class="tablet-art-card" data-session-id="${sess.id}">
                <div class="tablet-art-thumb-frame" data-session-id="${sess.id}" style="cursor: pointer;">
                  <img src="${imgSrc}" alt="Artwork" class="tablet-art-gif" loading="lazy" />
                </div>
                <div class="tablet-art-card-body">
                  <p class="tablet-art-reasoning">${reasoning}</p>
                  <div class="tablet-card-sentiment-tags">
                    ${sess.dominantWeather ? `<span class="tablet-tag">☀️ ${this.formatTag(sess.dominantWeather)}</span>` : ''}
                    ${sess.dominantFood ? `<span class="tablet-tag">🍲 ${this.formatTag(sess.dominantFood)}</span>` : ''}
                    ${sess.dominantLocation ? `<span class="tablet-tag">📍 ${this.formatTag(sess.dominantLocation)}</span>` : ''}
                    ${sess.dominantEmblem ? `<span class="tablet-tag">🌴 ${this.formatTag(sess.dominantEmblem)}</span>` : ''}
                  </div>
                  <button class="tablet-card-detail-btn" data-session-id="${sess.id}">
                    <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                      <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
                    </svg>
                    <span>Inspect Sentiment & Swag</span>
                  </button>
                </div>
              </article>
            `;
          }).join('')}
        </div>

        <div style="padding: 16px 0 24px 0; text-align: center;">
          <button class="tablet-quick-return-btn" id="dual-past-return-vote-bottom-btn" style="padding: 8px 20px; font-size: 0.88rem;">
            ← Back to Vote / Input View
          </button>
        </div>
      </div>
    `;
  }

  bindDualPastGalleryEvents() {
    const returnBtn = document.getElementById('dual-past-return-vote-btn');
    if (returnBtn) {
      returnBtn.onclick = () => this.switchDualTab('vote');
    }

    const returnBottomBtn = document.getElementById('dual-past-return-vote-bottom-btn');
    if (returnBottomBtn) {
      returnBottomBtn.onclick = () => this.switchDualTab('vote');
    }

    const bodyContainer = document.getElementById('tv-kiosk-body-container');
    if (!bodyContainer) return;

    bodyContainer.querySelectorAll('.tablet-card-detail-btn, .tablet-art-thumb-frame').forEach(el => {
      el.onclick = (e) => {
        e.stopPropagation();
        const sid = el.getAttribute('data-session-id');
        const session = this.pastSessions.find(s => s.id === sid);
        if (session && this.pastSessionsManager) {
          this.pastSessionsManager.showSessionModal(session);
        }
      };
    });
  }

  // ==========================================================================
  // TOUCH TV INTERACTIVE MULTI-STEP SURVEY (Matches Tablet Behavior)
  // ==========================================================================
  // ==========================================================================
  // TOUCH TV INTERACTIVE ALL-INPUTS SURVEY
  // ==========================================================================
  renderTVSurveyStep() {
    const container = document.getElementById('tv-survey-section');
    if (!container) return;

    container.innerHTML = this.getTVSurveyAllInputsHtml();
    this.bindTVSurveyEvents();
  }

  getTVSurveyAllInputsHtml() {
    if (!this.tvSurvey.weather) this.tvSurvey.weather = 'sunny';
    if (!this.tvSurvey.food) this.tvSurvey.food = 'fish_curry';
    if (!this.tvSurvey.location) this.tvSurvey.location = 'dudhsagar';
    if (!this.tvSurvey.emblem) this.tvSurvey.emblem = 'mandovi_boat';

    const weatherOptions = [
      { id: 'sunny', label: 'Sunny', sub: '& Energetic', icon: WEATHER_ICONS.sunny },
      { id: 'windy', label: 'Windy', sub: '& Restless', icon: WEATHER_ICONS.windy },
      { id: 'rainy', label: 'Rainy', sub: '& Reflective', icon: WEATHER_ICONS.rainy },
      { id: 'stormy', label: 'Stormy', sub: '& Eclectic', icon: WEATHER_ICONS.stormy },
      { id: 'calm', label: 'Calm', sub: '& Serene', icon: WEATHER_ICONS.calm }
    ];

    const foodOptions = [
      { id: 'fish_curry', label: 'Fish Curry', sub: '(Bold & Transformative)', icon: FOOD_ICONS.fish_curry },
      { id: 'prawn_curry', label: 'Prawn Curry', sub: '(Warm & Exciting)', icon: FOOD_ICONS.prawn_curry },
      { id: 'vindaloo', label: 'Vindaloo', sub: '(Spicy & Intense)', icon: FOOD_ICONS.vindaloo },
      { id: 'xacuti', label: 'Xacuti', sub: '(Rich & Layered)', icon: FOOD_ICONS.xacuti },
      { id: 'bebinca', label: 'Bebinca', sub: '(Sweet & Optimistic)', icon: FOOD_ICONS.bebinca },
      { id: 'poe_bread', label: 'Poe Bread', sub: '(Simple & Comforting)', icon: FOOD_ICONS.poe_bread }
    ];

    const locationOptions = [
      { id: 'dudhsagar', label: 'Dudhsagar Falls', sub: '(Cascading Power)', icon: LOCATION_ICONS.dudhsagar },
      { id: 'aguada_fort', label: 'Aguada Lighthouse', sub: '(Steadfast & Visionary)', icon: LOCATION_ICONS.aguada_fort },
      { id: 'fontainhas', label: 'Fontainhas Quarter', sub: '(Vibrant Heritage)', icon: LOCATION_ICONS.fontainhas },
      { id: 'chapora_fort', label: 'Chapora Fort', sub: '(Expansive Spirit)', icon: LOCATION_ICONS.chapora_fort },
      { id: 'palolem_beach', label: 'Palolem Beach', sub: '(Harmonious Peace)', icon: LOCATION_ICONS.palolem_beach },
      { id: 'cabo_de_rama', label: 'Cabo de Rama Fort', sub: '(Wild Clifftop Horizon)', icon: LOCATION_ICONS.cabo_de_rama }
    ];

    const emblemOptions = [
      { id: 'mandovi_boat', label: 'Mandovi Sailboat', sub: '(Navigating Horizons)', icon: EMBLEM_ICONS.mandovi_boat },
      { id: 'coconut_palm', label: 'Coconut Palm', sub: '(Resilient & Grounded)', icon: EMBLEM_ICONS.coconut_palm },
      { id: 'sea_turtle', label: 'Olive Ridley Turtle', sub: '(Sustainable Wisdom)', icon: EMBLEM_ICONS.sea_turtle },
      { id: 'kingfisher', label: 'Goan Kingfisher', sub: '(Agile & Insightful)', icon: EMBLEM_ICONS.kingfisher },
      { id: 'carnival_spirit', label: 'Viva Carnival Mask', sub: '(Bold Creative Energy)', icon: EMBLEM_ICONS.carnival_spirit },
      { id: 'susegad', label: 'Susegad Hammock', sub: '(Unhurried Serenity)', icon: EMBLEM_ICONS.susegad }
    ];

    const isTriMode = (this.currentMode === 'tri');

    return `
      <div class="tv-all-inputs-wrapper">
        <div class="tv-questions-grid ${isTriMode ? 'tv-questions-stacked' : ''}">
          <!-- 1. Weather of Goa -->
          <div class="tv-question-card">
            <h4 class="tv-question-title">1. Weather of Goa (Mood & Atmosphere)</h4>
            <div class="sentiment-grid weather-grid" id="tv-weather-options">
              ${weatherOptions.map(opt => `
                <button type="button" class="sentiment-card tv-option-btn ${this.tvSurvey.weather === opt.id ? 'selected' : ''}" data-type="weather" data-value="${opt.id}" title="${opt.label}">
                  <div class="sentiment-icon-circle">${opt.icon}</div>
                  <div class="sentiment-card-label">
                    <span class="label-primary">${opt.label}</span>
                    <span class="label-secondary">${opt.sub}</span>
                  </div>
                </button>
              `).join('')}
            </div>
          </div>

          <!-- 2. Goan Culinary Flavour -->
          <div class="tv-question-card">
            <h4 class="tv-question-title">2. Goan Culinary Flavour (Taste & Spice)</h4>
            <div class="sentiment-grid food-grid" id="tv-food-options">
              ${foodOptions.map(opt => `
                <button type="button" class="sentiment-card tv-option-btn ${this.tvSurvey.food === opt.id ? 'selected' : ''}" data-type="food" data-value="${opt.id}" title="${opt.label}">
                  <div class="sentiment-icon-circle">${opt.icon}</div>
                  <div class="sentiment-card-label">
                    <span class="label-primary">${opt.label}</span>
                    <span class="label-secondary">${opt.sub}</span>
                  </div>
                </button>
              `).join('')}
            </div>
          </div>

          <!-- 3. Goa Landmark -->
          <div class="tv-question-card">
            <h4 class="tv-question-title">3. Goa Landmark (Place & Heritage)</h4>
            <div class="sentiment-grid location-grid" id="tv-location-options">
              ${locationOptions.map(opt => `
                <button type="button" class="sentiment-card tv-option-btn ${this.tvSurvey.location === opt.id ? 'selected' : ''}" data-type="location" data-value="${opt.id}" title="${opt.label}">
                  <div class="sentiment-icon-circle">${opt.icon}</div>
                  <div class="sentiment-card-label">
                    <span class="label-primary">${opt.label}</span>
                    <span class="label-secondary">${opt.sub}</span>
                  </div>
                </button>
              `).join('')}
            </div>
          </div>

          <!-- 4. Cultural Spirit & Emblem -->
          <div class="tv-question-card">
            <h4 class="tv-question-title">4. Goan Cultural Emblem (Essence & Spirit)</h4>
            <div class="sentiment-grid emblem-grid" id="tv-emblem-options">
              ${emblemOptions.map(opt => `
                <button type="button" class="sentiment-card tv-option-btn ${this.tvSurvey.emblem === opt.id ? 'selected' : ''}" data-type="emblem" data-value="${opt.id}" title="${opt.label}">
                  <div class="sentiment-icon-circle">${opt.icon}</div>
                  <div class="sentiment-card-label">
                    <span class="label-primary">${opt.label}</span>
                    <span class="label-secondary">${opt.sub}</span>
                  </div>
                </button>
              `).join('')}
            </div>
          </div>
        </div>

        <!-- Submit Button (Vertically stacked below the 4 questions) -->
        <div class="tv-submit-action-wrap">
          <button type="button" class="weave-btn" id="tv-submit-weave-btn">
            <span>Weave Into Live Artwork &rarr;</span>
          </button>
        </div>

        <!-- Inline Live Transformation Feedback Area -->
        <div class="tv-inline-feedback-area" id="tv-submit-feedback">
          ${this.tvSurvey.submitted ? this.getTVInlineImpactHtml() : ''}
        </div>

        ${!isTriMode ? `
        <!-- QR Code Section directly below the inputs (2-Column Mode) -->
        <div class="tv-kiosk-qr-card-wrap">
          <aside class="tv-kiosk-inline-qr" aria-label="Scan to Participate">
            <span class="tv-kiosk-qr-title">Scan to Participate</span>
            <div class="tv-kiosk-qr-box" id="screen-qr-container"></div>
          </aside>
        </div>
        ` : ''}
      </div>
    `;
  }

  getTVInlineImpactHtml() {
    const impact = getArtworkImpactWriteup({
      weather: this.tvSurvey.weather,
      food: this.tvSurvey.food,
      location: this.tvSurvey.location,
      emblem: this.tvSurvey.emblem
    });

    return `
      <div class="impact-writeup-card concise-card" style="margin-top: 14px; animation: fadeIn 0.4s ease;">
        <div class="impact-card-header">
          <span class="impact-card-badge">✨ Live Transformation</span>
          <span class="impact-card-tagline">${impact.headline}</span>
        </div>
        <div class="impact-two-line-summary">
          <p class="impact-line"><strong>🎨 Colors:</strong> ${impact.line1}</p>
          <p class="impact-line"><strong>⚡ Dynamics:</strong> ${impact.line2}</p>
        </div>
      </div>
    `;
  }

  bindTVSurveyEvents() {
    // Option selection within each category
    const optionBtns = document.querySelectorAll('.tv-option-btn');
    optionBtns.forEach(btn => {
      btn.onclick = () => {
        const type = btn.getAttribute('data-type');
        const value = btn.getAttribute('data-value');
        if (!type || !value) return;

        this.tvSurvey[type] = value;
        const parentGrid = btn.closest('.sentiment-grid');
        if (parentGrid) {
          parentGrid.querySelectorAll('.tv-option-btn').forEach(b => b.classList.remove('selected'));
        }
        btn.classList.add('selected');
      };
    });

    // Weave button
    const submitBtn = document.getElementById('tv-submit-weave-btn');
    if (submitBtn) {
      submitBtn.onclick = () => {
        const fullResponse = {
          weather: this.tvSurvey.weather || 'sunny',
          food: this.tvSurvey.food || 'fish_curry',
          location: this.tvSurvey.location || 'dudhsagar',
          emblem: this.tvSurvey.emblem || 'mandovi_boat',
          author: 'TV Attendee',
          note: 'Touch TV Attendee Vote'
        };

        if (this.syncManager) {
          this.syncManager.submitResponse(fullResponse);
        }

        if (this.artworkEngine) {
          this.artworkEngine.addResponseBurst(fullResponse);
        }

        this.tvSurvey.submitted = true;
        const feedbackContainer = document.getElementById('tv-submit-feedback');
        if (feedbackContainer) {
          feedbackContainer.innerHTML = this.getTVInlineImpactHtml();
          feedbackContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      };
    }

    // Mount QR code into the inline container
    this.mountQRHelpers();
  }

  resetTVSurvey() {
    this.tvSurvey = {
      step: 1,
      weather: 'sunny',
      food: 'fish_curry',
      location: 'dudhsagar',
      emblem: 'mandovi_boat',
      author: '',
      note: '',
      submitted: false,
      resetTimer: null
    };
    this.renderTVSurveyStep();
  }

  updateTVArchiveCard() {
    if (this.currentMode !== 'dual' && this.currentMode !== 'tri' && this.currentMode !== 'wall' && this.currentMode !== 'simulate') return;
    const session = this.currentSession || (this.pastSessions && this.pastSessions.length > 0
      ? this.pastSessions[this.pastSessions.length - 1]
      : null);
    if (!session) return;

    const titleEl = document.getElementById('tv-current-art-title');
    const descEl = document.getElementById('tv-current-art-desc');
    const timeEl = document.getElementById('tv-current-art-time');
    const countEl = document.getElementById('tv-past-count');

    if (titleEl) {
      titleEl.textContent = session.topologyInfo?.name || session.name || 'Mandovi River Sailboat & Fluvial Wake Currents';
    }
    if (descEl) {
      descEl.textContent = session.topologyInfo?.reasoning || session.description || 'Restless coastal sea winds (SUNNY) and historic Aguada fortress presence (DUDHSAGAR) created 16 concentric orbital light shells and sweeping celestial ray arms.';
    }
    if (timeEl) {
      timeEl.remove();
    }
    if (countEl) {
      countEl.textContent = this.pastSessions.length || 55;
    }

    this.renderTVPastPreviewGrid();
  }

  renderTVPastPreviewGrid() {
    const gridEl = document.getElementById('tv-past-preview-grid');
    if (!gridEl) return;

    const count = this.pastSessions ? this.pastSessions.length : 0;
    const p1 = count > 0 ? this.pastSessions[count - 1] : null;
    const p2 = count > 1 ? this.pastSessions[count - 2] : null;

    const getThumbHtml = (sess, slotNum) => {
      if (!sess) {
        const slotLabel = slotNum === 1 ? 'Session 1 Live' : 'Upcoming Session';
        return `
          <div class="tv-past-thumb-card tv-past-empty-card" title="Artwork archives every 30 minutes">
            <div class="tv-thumb-empty-ph">
              <span class="tv-thumb-empty-icon">⏳</span>
              <span class="tv-thumb-empty-txt">${slotLabel}</span>
              <span class="tv-thumb-empty-sub">Archives in 30m</span>
            </div>
          </div>
        `;
      }
      const imgSrc = sess.snapshotUrl || sess.gifUrl || `/archive/${sess.id}.jpg`;
      const title = sess.topologyInfo?.name || sess.name || `Artwork #${sess.sessionNumber || slotNum}`;
      const time = sess.timeLabel || 'Previous Cycle';
      const sessionNum = sess.sessionNumber || slotNum;

      return `
        <div class="tv-past-thumb-card" data-session-id="${sess.id}" title="${title} (Tap to Inspect)" tabindex="0">
          <div class="tv-thumb-img-wrap">
            <img src="${imgSrc}" alt="${title}" class="tv-thumb-img" onerror="this.onerror=null; this.src='assets/harshit_agrawal.png'; this.style.opacity='0.4';" />
          </div>
        </div>
      `;
    };

    gridEl.innerHTML = `
      <div class="tv-past-grid-row">
        ${getThumbHtml(p1, count > 0 ? count : 1)}
        ${getThumbHtml(p2, count > 1 ? count - 1 : 2)}
        <div class="tv-past-thumb-card tv-past-view-more-card" id="tv-open-archive-grid-btn" title="View & Download All Past 30-Min Artworks" tabindex="0">
          <div class="tv-thumb-more-inner">
            <div class="tv-thumb-more-icon">
              <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="3" y="3" width="7" height="7"></rect>
                <rect x="14" y="3" width="7" height="7"></rect>
                <rect x="14" y="14" width="7" height="7"></rect>
                <rect x="3" y="14" width="7" height="7"></rect>
              </svg>
            </div>
            <span class="tv-more-text">View More</span>
            <span class="tv-more-badge">${count > 2 ? `+${count - 2} Artworks &rarr;` : (count > 0 ? 'All Artworks &rarr;' : 'Archive &rarr;')}</span>
          </div>
        </div>
      </div>
    `;

    gridEl.querySelectorAll('.tv-past-thumb-card[data-session-id]').forEach(card => {
      card.onclick = () => {
        const sid = card.getAttribute('data-session-id');
        const session = this.pastSessions.find(s => s.id === sid);
        if (session && this.pastSessionsManager) {
          this.pastSessionsManager.showSessionModal(session);
        }
      };
    });

    const moreBtn = document.getElementById('tv-open-archive-grid-btn');
    if (moreBtn) {
      moreBtn.onclick = () => {
        this.switchDualTab('past');
      };
    }
  }

  // Showcase Gallery View for Previous 30-Minute Artworks (Animated Looping GIFs)
  renderShowcasePastGallery() {
    if (this.artworkEngine) {
      this.artworkEngine.stop();
    }

    this.root.innerHTML = `
      <!-- Showcase Navigation Tabs -->
      <nav class="showcase-header-nav" role="tablist" aria-label="Showcase Navigation">
        <button class="showcase-nav-btn" id="btn-showcase-tab-live">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14h-2v-2h2v2zm0-4h-2V7h2v5z"/>
          </svg>
          <span>🎨 Live Showcase</span>
        </button>
        <button class="showcase-nav-btn active" id="btn-showcase-tab-past">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
            <path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H8V4h12v12z"/>
          </svg>
          <span>🏛️ Previous Artworks</span>
          <span class="showcase-nav-badge" id="showcase-past-badge">${this.pastSessions.length}</span>
        </button>
      </nav>

      <div class="showcase-past-wrapper">
        <header class="showcase-past-header">
          <div>
            <h1 class="showcase-past-heading">Previous 30-Minute Artwork Cycles</h1>
            <p class="showcase-past-subheading">Generated from 30-minute attendee sentiment convergence.</p>
          </div>
          <button class="showcase-back-live-btn" id="showcase-return-live-btn">
            ← Return to Live Showcase
          </button>
        </header>

        <div class="showcase-past-grid">
          ${this.pastSessions.length === 0 ? `
            <div style="grid-column: 1 / -1; text-align: center; color: var(--goa-sand); padding: 60px 20px;">
              <p>No previous artworks recorded yet. Artworks generate every 30 minutes or via the presenter tray simulate button.</p>
            </div>
          ` : this.pastSessions.slice().reverse().map((sess, idx) => {
            const imgSrc = sess.snapshotUrl || sess.gifUrl || `/api/sessions/${sess.id}/artwork.gif`;
            const isRealSnapshot = !!sess.snapshotUrl;
            const loopTag = isRealSnapshot ? '🎨 42k Particles' : '⏱️ 9.6s GIF Loop';
            const topoInfo = sess.topologyInfo || {};
            const topoName = topoInfo.name || `Topology #${sess.mutationTopology !== undefined ? sess.mutationTopology + 1 : idx + 1}`;
            const archetype = topoInfo.archetype || 'Parametric Morph';
            const reasoning = topoInfo.reasoning || sess.description || 'Responding to Goan sentiment influx during 30-min window.';

            return `
              <article class="showcase-past-card" data-session-id="${sess.id}">
                <div class="showcase-past-media" style="cursor: pointer;" data-session-id="${sess.id}">
                  <img src="${imgSrc}" alt="Artwork" class="showcase-past-gif" loading="lazy" />
                </div>
                <div class="showcase-past-body">
                  <div class="showcase-past-reasoning">
                    <strong>Topology Reasoning:</strong> ${reasoning}
                  </div>
                  <div class="showcase-past-tags">
                    ${sess.dominantWeather ? `<span class="showcase-tag">☀️ ${this.formatTag(sess.dominantWeather)}</span>` : ''}
                    ${sess.dominantFood ? `<span class="showcase-tag">🍲 ${this.formatTag(sess.dominantFood)}</span>` : ''}
                    ${sess.dominantLocation ? `<span class="showcase-tag">📍 ${this.formatTag(sess.dominantLocation)}</span>` : ''}
                    ${sess.dominantEmblem ? `<span class="showcase-tag">🌴 ${this.formatTag(sess.dominantEmblem)}</span>` : ''}
                  </div>
                  <button class="showcase-past-action-btn" data-session-id="${sess.id}">
                    <span>Inspect Sentiment & Swag</span>
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                      <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
                    </svg>
                  </button>
                </div>
              </article>
            `;
          }).join('')}
        </div>
      </div>
      <section id="past-sessions-strip-container" style="display: none;"></section>
    `;

    this.mountPastSessions();

    document.getElementById('btn-showcase-tab-live')?.addEventListener('click', () => {
      this.switchShowcaseTab('live');
    });

    document.getElementById('showcase-return-live-btn')?.addEventListener('click', () => {
      this.switchShowcaseTab('live');
    });

    this.root.querySelectorAll('.showcase-past-action-btn, .showcase-past-media').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const sid = btn.getAttribute('data-session-id') || btn.closest('.showcase-past-card')?.getAttribute('data-session-id');
        if (sid) {
          const session = this.pastSessions.find(s => s.id === sid);
          if (session && this.pastSessionsManager) {
            this.pastSessionsManager.showSessionModal(session);
          }
        }
      });
    });
  }

  renderPillarView() {
    this.renderUnifiedShowcaseView();
  }

  renderDualView() {
    this.renderUnifiedShowcaseView();
  }

  // 2. Pure Vertical Screen View (Direct 16:9 for dedicated vertical display - ZERO text at all points)
  renderPureScreenView() {
    this.root.innerHTML = `
      <div class="screen-view-container pure-screen-layout">
        <!-- 16:9 Vertical Framed Screen (Canvas + subtle QR badge only) -->
        <div class="vertical-screen-frame fullscreen-kiosk" id="vertical-frame">
          <canvas id="artwork-canvas" class="computational-artwork-canvas"></canvas>

          <div class="artwork-hud-bottom">
            <div class="screen-qr-badge" id="screen-qr-container"></div>
          </div>
        </div>
      </div>

      <div class="influx-toast-container" id="toast-container" style="display: none;"></div>
      <section id="past-sessions-strip-container" style="display: none;"></section>
    `;

    this.mountArtworkCanvas();
    this.mountQRHelpers();
    this.mountPastSessions();
  }

  // 3. Tablet Kiosk View (Replicates tablet lying beside the display)
  renderTabletView() {
    this.root.innerHTML = `
      <div class="tablet-view-container">
        <div class="tablet-device-frame" id="tablet-frame">
          <!-- Tablet App mounts here -->
        </div>
      </div>
      <section id="past-sessions-strip-container" style="display: none;"></section>
    `;

    const tabletFrame = document.getElementById('tablet-frame');
    this.mountPastSessions();
    this.tabletApp = new TabletApp(tabletFrame, this.syncManager, this.pastSessionsManager);
  }

  mountArtworkCanvas() {
    const canvas = document.getElementById('artwork-canvas');
    if (canvas) {
      if (this.artworkEngine) {
        this.artworkEngine.stop();
      }
      const isLP = this.isLowPowerMode();
      this.artworkEngine = new GoanArtworkEngine(canvas, this.sentimentEngine, { isLP });
      if (this.currentSession && typeof this.currentSession.mutationTopology === 'number') {
        const topo = this.currentSession.mutationTopology;
        this.artworkEngine.currentTopology = topo;
        this.artworkEngine.generateTopology(
          topo,
          this.artworkEngine.px,
          this.artworkEngine.py,
          this.artworkEngine.size,
          this.artworkEngine.colorIdx,
          this.artworkEngine.layer
        );
        this.artworkEngine.hx.set(this.artworkEngine.px);
        this.artworkEngine.hy.set(this.artworkEngine.py);
        this.artworkEngine.baseColorIdx.set(this.artworkEngine.colorIdx);
      }
      this.artworkEngine.start();

      if (isLP) {
        this.mountLPBadge();
      }
    }
  }

  mountLPBadge() {
    const frame = document.getElementById('vertical-frame');
    if (frame && !document.getElementById('lp-mode-badge')) {
      const badge = document.createElement('div');
      badge.id = 'lp-mode-badge';
      badge.className = 'lp-mode-badge';
      badge.title = 'Fast LP Mode Active: 21,000 Particles @ 30 FPS · Hardware Accelerated';
      badge.innerHTML = `<span class="lp-icon">⚡</span><span>FAST LP (21K)</span>`;
      frame.appendChild(badge);
    }
  }

  mountQRHelpers() {
    const screenQr = document.getElementById('screen-qr-container');
    const pillarQr = document.getElementById('pillar-qr-container');

    const qrHelperScreen = screenQr ? new QRHelper(screenQr) : null;
    const qrHelperPillar = pillarQr ? new QRHelper(pillarQr) : null;

    if (qrHelperScreen) qrHelperScreen.renderQRCode(this.tabletUrl);
    if (qrHelperPillar) qrHelperPillar.renderQRCode(this.tabletUrl);
  }

  mountPastSessions() {
    const pastContainer = document.getElementById('past-sessions-strip-container');
    this.pastSessionsManager = new PastSessionsManager(pastContainer, (session) => {
      console.log('Selected past session:', session);
    });

    if (this.pastSessions && this.pastSessions.length > 0) {
      this.pastSessionsManager.setSessions(this.pastSessions);
    }
  }

  refreshQRCode() {
    this.mountQRHelpers();
  }

  startSessionTimer() {
    if (this.timerInterval) clearInterval(this.timerInterval);

    this.timerInterval = setInterval(() => {
      this.updateHUD();
    }, 1000);
  }

  formatName(str) {
    if (!str) return '—';
    return String(str).replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  }

  updateHUD() {
    const timerEl = document.getElementById('curator-timer');
    const countEl = document.getElementById('curator-debug-voices');
    const sessionEl = document.getElementById('curator-debug-session');
    const tagEl = document.getElementById('curator-tag');
    const titleEl = document.getElementById('curator-title');
    const archEl = document.getElementById('curator-archetype');
    const reasonEl = document.getElementById('curator-reasoning');
    const weatherEl = document.getElementById('curator-data-weather');
    const foodEl = document.getElementById('curator-data-food');
    const locEl = document.getElementById('curator-data-location');
    const emblemEl = document.getElementById('curator-data-emblem');

    if (!this.currentSession) return;

    const topoInfo = this.currentSession.topologyInfo || {};
    const topoId = (typeof this.currentSession.mutationTopology === 'number')
      ? this.currentSession.mutationTopology
      : (topoInfo.id ?? 0);

    if (tagEl) {
      tagEl.textContent = `Topology #${topoId + 1} / 20`;
    }
    if (titleEl && topoInfo.name) {
      titleEl.textContent = topoInfo.name;
    }
    if (archEl && topoInfo.archetype) {
      archEl.textContent = topoInfo.archetype;
    }
    if (reasonEl && topoInfo.reasoning) {
      reasonEl.textContent = topoInfo.reasoning;
    }

    const ds = topoInfo.dataSummary || {};
    if (weatherEl) weatherEl.textContent = this.formatName(ds.weather || 'Balanced Breeze');
    if (foodEl) foodEl.textContent = this.formatName(ds.food || 'Goan Medley');
    if (locEl) locEl.textContent = this.formatName(ds.location || 'Coastal Strip');
    if (emblemEl) emblemEl.textContent = this.formatName(ds.emblem || 'Susegad Spirit');

    const totalVotes = (this.currentSession.responses && this.currentSession.responses.length > 0)
      ? this.currentSession.responses.length
      : (ds.votesCount || 0);

    if (countEl) countEl.textContent = `Voices: ${totalVotes}`;
    if (sessionEl) sessionEl.textContent = `Session #${this.currentSession.sessionNumber || 1}`;

    if (timerEl) {
      const elapsed = Date.now() - (this.currentSession.startTime || Date.now());
      const remaining = Math.max(0, (this.currentSession.durationMs || 1800000) - elapsed);
      const mins = Math.floor(remaining / 60000);
      const secs = Math.floor((remaining % 60000) / 1000);
      timerEl.textContent = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')} cycle`;
    }
  }

  showToastNotification(response) {
    if (this.currentMode === 'screen' || this.currentMode === 'dual' || this.currentMode === 'tri' || this.currentMode === 'wall' || this.currentMode === 'simulate') return; // Zero temporary text over artwork
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'influx-toast';

    if (response.weather && response.food) {
      const impact = getArtworkImpactWriteup(response);
      toast.innerHTML = `
        <div class="toast-star-icon">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="#F2C249">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
        </div>
        <div class="toast-text-wrap">
          <div class="toast-meta-row">
            <span class="toast-author-name">${response.author || 'New Attendee Voice'}</span>
            <span class="toast-headline-tag">${impact.headline}</span>
          </div>
          <div class="toast-narrative-desc">${impact.summary}</div>
        </div>
      `;
    } else {
      toast.innerHTML = `
        <div class="toast-star-icon">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="#F2C249">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
        </div>
        <div class="toast-text-wrap">
          <div class="toast-meta-row">
            <strong class="toast-author-name">${response.author || 'System'}</strong>
          </div>
          <div class="toast-narrative-desc">${response.note || ''}</div>
        </div>
      `;
    }

    container.appendChild(toast);
    setTimeout(() => {
      if (toast.parentNode) toast.parentNode.removeChild(toast);
    }, 6000);
  }

  // Check and render authentic snapshots for any historical sessions missing a high-res image
  async ensureHistoricalSnapshots() {
    if (!this.artworkEngine || !this.pastSessions || this.pastSessions.length === 0) return;

    for (const sess of this.pastSessions) {
      let needsGeneration = false;
      if (!sess.snapshotUrl || sess.snapshotUrl.endsWith('.gif')) {
        needsGeneration = true;
      } else {
        try {
          const testRes = await fetch(sess.snapshotUrl, { method: 'HEAD' });
          if (!testRes.ok) needsGeneration = true;
        } catch (e) {
          needsGeneration = true;
        }
      }

      if (needsGeneration) {
        try {
          console.log(`[Storage] Rendering authentic snapshot for ${sess.id} (Topology #${sess.mutationTopology})...`);
          const snapshotData = this.artworkEngine.renderTopologySnapshot(
            sess.mutationTopology ?? 0,
            sess,
            540,
            960
          );
          if (snapshotData) {
            const res = await this.syncManager.uploadSessionSnapshot(sess.id, snapshotData);
            if (res && res.snapshotUrl) {
              sess.snapshotUrl = res.snapshotUrl;
              if (this.tabletApp) this.tabletApp.setPastSessions(this.pastSessions);
              if (this.pastSessionsManager) this.pastSessionsManager.setSessions(this.pastSessions);
            }
          }
        } catch (err) {
          console.warn(`[Storage] Error generating snapshot for ${sess.id}:`, err);
        }
      }
    }
  }

  setupPresenterTray() {
    document.getElementById('btn-mode-wall')?.addEventListener('click', () => this.switchMode('wall'));
    document.getElementById('btn-mode-screen')?.addEventListener('click', () => this.switchMode('screen'));
    document.getElementById('btn-mode-tablet')?.addEventListener('click', () => this.switchMode('tablet'));
    document.getElementById('btn-mode-dual')?.addEventListener('click', () => this.switchMode('dual'));
    document.getElementById('btn-mode-lp')?.addEventListener('click', () => this.switchMode('lp'));

    document.getElementById('btn-simulate-cycle')?.addEventListener('click', async () => {
      const btn = document.getElementById('btn-simulate-cycle');
      if (btn) btn.style.opacity = '0.6';
      await this.syncManager.simulateCycleAndAdvance();
      if (btn) btn.style.opacity = '1.0';
    });

    document.getElementById('btn-evolve-session')?.addEventListener('click', async () => {
      await this.syncManager.triggerCycleTransition();
    });

    document.getElementById('btn-inject-mock')?.addEventListener('click', async () => {
      await this.syncManager.injectMockVotes(5);
    });

    document.getElementById('btn-open-past')?.addEventListener('click', () => {
      if (this.currentMode === 'dual' || this.currentMode === 'tri' || this.currentMode === 'wall') {
        this.switchShowcaseTab(this.activeShowcaseTab === 'past' ? 'live' : 'past');
      } else if (this.pastSessionsManager && this.pastSessions.length > 0) {
        this.pastSessionsManager.showSessionModal(this.pastSessions[this.pastSessions.length - 1]);
      }
    });

    document.getElementById('btn-toggle-fs')?.addEventListener('click', () => {
      this.toggleFullscreen();
    });
  }

  switchMode(mode) {
    this.currentMode = mode;
    const url = new URL(window.location);
    if (mode === 'tablet') {
      url.searchParams.delete('mode');
    } else {
      url.searchParams.set('mode', mode);
    }
    window.history.replaceState({}, '', url);
    this.setupView();
  }

  updateTrayButtons() {
    ['screen', 'tablet', 'dual', 'lp'].forEach(m => {
      const btn = document.getElementById(`btn-mode-${m}`);
      if (btn) {
        let isActive = false;
        if (m === 'lp') {
          isActive = this.isLowPowerMode();
        } else if (m === 'dual') {
          isActive = (this.currentMode === 'dual' || this.currentMode === 'wall' || this.currentMode === 'simulate');
        } else {
          isActive = (m === this.currentMode);
        }
        if (isActive) btn.classList.add('active');
        else btn.classList.remove('active');
      }
    });
  }

  toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      if (document.exitFullscreen) document.exitFullscreen();
    }
  }

  setupKeyboardShortcuts() {
    window.addEventListener('keydown', (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

      if (e.key === 'd' || e.key === 'D') {
        const tray = document.getElementById('presenter-tray');
        if (tray) tray.style.display = (tray.style.display === 'none') ? 'flex' : 'none';
      } else if (e.key === 'f' || e.key === 'F') {
        this.toggleFullscreen();
      } else if (e.key === 's' || e.key === 'S' || e.key === 'c' || e.key === 'C') {
        this.syncManager.simulateCycleAndAdvance();
      } else if (e.key === 'm' || e.key === 'M') {
        this.syncManager.injectMockVotes(5);
      } else if (e.key === 'e' || e.key === 'E') {
        this.syncManager.triggerCycleTransition();
      } else if (e.key === '1') {
        // Preset 1: Sunny + Bebinca 7-layer caramel strata + Aguada beacon
        for (let k = 0; k < 4; k++) {
          this.syncManager.submitResponse({ weather: 'sunny', food: 'bebinca', location: 'aguada_fort', emblem: 'mandovi_boat', note: 'Sunny Bebinca layers' });
        }
      } else if (e.key === '2') {
        // Preset 2: Windy sweeps + Vindaloo chili crimson sparks + Chapora ridge
        for (let k = 0; k < 4; k++) {
          this.syncManager.submitResponse({ weather: 'windy', food: 'vindaloo', location: 'chapora_fort', emblem: 'kingfisher', note: 'Windy Vindaloo sparks' });
        }
      } else if (e.key === '3') {
        // Preset 3: Rainy vertical cascades + Xacuti roasted masala + Dudhsagar waterfall
        for (let k = 0; k < 4; k++) {
          this.syncManager.submitResponse({ weather: 'rainy', food: 'xacuti', location: 'dudhsagar', emblem: 'sea_turtle', note: 'Rainy Dudhsagar cascade' });
        }
      } else if (e.key === '4') {
        // Preset 4: Calm harmonic swells + Fish Curry ochre & emerald + Palolem crescent + Susegad
        for (let k = 0; k < 4; k++) {
          this.syncManager.submitResponse({ weather: 'calm', food: 'fish_curry', location: 'palolem_beach', emblem: 'susegad', note: 'Calm Palolem susegad' });
        }
      } else if (e.key === '5') {
        // Preset 5: Stormy cyclone vortex + Prawn Coral + Cabo de Rama Fort + Carnival sparks
        for (let k = 0; k < 4; k++) {
          this.syncManager.submitResponse({ weather: 'stormy', food: 'prawn_curry', location: 'cabo_de_rama', emblem: 'carnival_spirit', note: 'Stormy Cabo de Rama Carnival' });
        }
      }
    });
  }
}

// Start application when DOM is ready
window.addEventListener('DOMContentLoaded', () => {
  window.__conclaveApp = new ConclaveApp();
});
