// Main Application Bootstrap for Goa Conclave
// Integrates Computational Artwork, Tablet Kiosk, Real-Time Sync, and 30-Min Cycles

import { GoanArtworkEngine } from './particle-engine.js';
import { SentimentEngine, getArtworkImpactWriteup } from './sentiment-engine.js';
import { TabletApp } from './tablet-app.js';
import { SyncManager } from './sync.js';
import { PastSessionsManager } from './past-sessions.js';
import { QRHelper } from './qr-helper.js';
import { GOAN_BORDER_FRIEZE, WEATHER_ICONS } from './icons.js';

class ConclaveApp {
  constructor() {
    this.root = document.getElementById('app-root');
    this.sentimentEngine = new SentimentEngine();
    this.artworkEngine = null;
    this.syncManager = null;
    this.tabletApp = null;
    this.pastSessionsManager = null;
    this.qrHelper = null;

    this.currentMode = this.detectMode();
    this.activeShowcaseTab = 'live'; // 'live' | 'past'
    this.currentSession = null;
    this.pastSessions = [];
    this.tabletUrl = window.location.origin + '/';

    this.timerInterval = null;
    this.init();
  }

  detectMode() {
    const params = new URLSearchParams(window.location.search);
    const mode = params.get('mode');
    if (mode === 'dual' || mode === 'wall') {
      return 'dual';
    }
    if (mode === 'screen') {
      return 'screen';
    }
    // Default: root URL (https://goa-conclave.onrender.com/) opens ONLY tablet input mode
    return 'tablet';
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
          this.sentimentEngine.synthesizeSession(this.currentSession);
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

        this.showToastNotification({
          author: 'Topology Mutated',
          note: `${data.topologyInfo?.name || 'New Topology'} (${data.topologyInfo?.archetype || 'Evolution'})`
        });
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
    if (this.currentMode === 'dual' || this.currentMode === 'wall') {
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

    // Bottom debug controls bar: displayed ONLY in dual/showcase mode
    const tray = document.getElementById('presenter-tray');
    if (tray) {
      tray.style.display = (this.currentMode === 'dual' || this.currentMode === 'wall') ? 'flex' : 'none';
    }

    switch (this.currentMode) {
      case 'screen':
        this.renderPureScreenView();
        break;
      case 'tablet':
        this.renderTabletView();
        break;
      case 'dual':
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
          sessionNumber: 49,
          name: 'Mandovi River Sailboat & Fluvial Wake Currents',
          timeLabel: '12:00 - 12:30 IST',
          totalResponses: 0,
          snapshotUrl: 'assets/test_fontainhas.gif',
          topologyInfo: {
            name: 'Mandovi River Sailboat & Fluvial Wake Currents',
            archetype: 'Concentric Coastal Beacon Vortex & Celestial Rays',
            reasoning: 'Restless coastal sea winds (SUNNY) and historic Aguada fortress presence (DUDHSAGAR) created 16 concentric orbital light shells and sweeping celestial ray arms.'
          }
        });

    const pastCount = this.pastSessions.length || 49;

    const weatherOptions = [
      { id: 'sunny', label: 'Sunny', sub: '& Energetic', icon: WEATHER_ICONS.sunny },
      { id: 'windy', label: 'Windy', sub: '& Restless', icon: WEATHER_ICONS.windy },
      { id: 'rainy', label: 'Rainy', sub: '& Reflective', icon: WEATHER_ICONS.rainy },
      { id: 'stormy', label: 'Stormy', sub: '& Eclectic', icon: WEATHER_ICONS.stormy },
      { id: 'calm', label: 'Calm', sub: '& Serene', icon: WEATHER_ICONS.calm }
    ];

    this.root.innerHTML = `
      <main class="touch-tv-layout" id="touch-tv-root">
        <!-- 1. LEFT PANEL: Full-Height Computational Artwork (~63.5%) -->
        <section class="touch-tv-screen-side" aria-label="Conference Sentiment Computational Artwork">
          <canvas id="artwork-canvas" class="computational-artwork-canvas"></canvas>
          
          <!-- Top-Left Floating Glass Banner -->
          <div class="tv-sentiment-pill">
            <span class="pill-diamond">◆</span>
            <span class="pill-text">Conference Sentiment Visualization</span>
            <span class="pill-diamond">◆</span>
          </div>

          <!-- Subtle bottom QR code for mobile scanning -->
          <div class="artwork-hud-bottom">
            <div class="screen-qr-badge" id="screen-qr-container"></div>
          </div>
        </section>

        <!-- 2. RIGHT PANEL: Touch-Enabled Tablet Kiosk (~36.5%) -->
        <section class="touch-tv-kiosk-side" aria-label="Audience Sentiment Touch Kiosk" id="tv-kiosk-container">
          <!-- Header: Artist Credit on Left, POAI White Logo on Right -->
          <header class="tv-kiosk-header">
            <div class="tv-artist-block">
              <span class="tv-artist-title">ARTWORK BY HARSHIT AGRAWAL</span>
              <span class="tv-artist-handle">@harshitrnnh</span>
              <div class="tv-artist-bio-row">
                <img src="assets/harshit_agrawal.png" alt="Harshit Agrawal" class="tv-artist-photo" />
                <span class="tv-artist-bio-text">Held India's first solo AI Art Show, Exhibition in 20 countries, 5 TEDx Talks, Google's first Artist Resident in India.</span>
              </div>
            </div>
            <div class="tv-poai-badge" id="tv-poai-badge" title="POAI - Conclave">
              <img src="assets/poai_logo_horizontal.png" alt="POAI" class="tv-poai-logo-img" />
            </div>
          </header>

          <!-- Action Row / Pill Buttons -->
          <div class="tv-action-row">
            <button class="tv-past-pill-btn" id="tv-toggle-archive-btn" title="Toggle Previous Artworks Archive">
              <span class="pill-plus-icon">+</span>
              <span>Previous Artworks</span>
              <span class="pill-count-badge" id="tv-past-count">${pastCount}</span>
            </button>
          </div>

          <!-- Previous Artworks Archive Card (embedded exactly as shown in reference photo) -->
          <div class="tv-archive-card" id="tv-archive-card">
            <div class="tv-archive-card-top">
              <div>
                <h3 class="tv-archive-heading">Previous Artworks Archive</h3>
                <p class="tv-archive-subtext">Looping GIFs of 30-min cycles (max 10s loop) · Responding dynamically to Goan sentiment</p>
              </div>
              <button class="tv-archive-close-btn" id="tv-archive-close-btn" title="Close Archive">&times;</button>
            </div>

            <div class="tv-archive-card-body">
              <div class="tv-archive-thumb-wrap" id="tv-archive-thumb-wrap" style="cursor: pointer;">
                <img src="${featuredSession.snapshotUrl || featuredSession.gifUrl || 'assets/test_fontainhas.gif'}" alt="${featuredSession.name || 'Artwork'}" class="tv-archive-thumb-img" id="tv-archive-thumb" />
              </div>
              <div class="tv-archive-info-wrap" id="tv-archive-info-wrap" style="cursor: pointer;">
                <h4 class="tv-archive-art-name" id="tv-archive-title">${featuredSession.topologyInfo?.name || featuredSession.name || 'Mandovi River Sailboat & Fluvial Wake Currents'}</h4>
                <div class="tv-archive-meta-row" id="tv-archive-meta">${featuredSession.timeLabel || '12:00 - 12:30 IST'} · ${featuredSession.totalResponses || 0} audience responses</div>
                <p class="tv-archive-reasoning" id="tv-archive-reasoning">${featuredSession.topologyInfo?.reasoning || featuredSession.description || 'Restless coastal sea winds (SUNNY) and historic Aguada fortress presence (DUDHSAGAR) created 16 concentric orbital light shells and sweeping celestial ray arms.'}</p>
              </div>
            </div>

            <div class="tv-archive-card-actions">
              <button class="tv-archive-btn tv-btn-dl-postcard" id="tv-btn-dl-postcard">
                <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                  <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
                </svg>
                <span>Download Postcard</span>
              </button>
              <button class="tv-archive-btn tv-btn-dl-hd" id="tv-btn-dl-hd">
                <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                  <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
                </svg>
                <span>Artwork HD</span>
              </button>
            </div>
          </div>

          <!-- Survey Section -->
          <div class="tv-survey-section" id="tv-survey-section">
            <h2 class="tv-survey-question">What did the previous session of the Conclave feel like in terms of the weather of Goa?</h2>
            
            <div class="tv-weather-row" id="tv-weather-options">
              ${weatherOptions.map(opt => `
                <button class="tv-weather-card" data-weather="${opt.id}" title="${opt.label}">
                  <div class="tv-weather-circle">
                    ${opt.icon}
                  </div>
                  <span class="tv-weather-title">${opt.label}</span>
                  <span class="tv-weather-subtitle">${opt.sub}</span>
                </button>
              `).join('')}
            </div>
          </div>

          <!-- Footer / Stepper & Touch Hint -->
          <footer class="tv-kiosk-footer">
            <div class="tv-stepper-dots">
              <span class="tv-step-dot active"></span>
              <span class="tv-step-dot"></span>
              <span class="tv-step-dot"></span>
              <span class="tv-step-dot"></span>
              <span class="tv-step-dot"></span>
            </div>
            <span class="tv-hint-text">Touch an option to proceed · Tapestry continuously morphs on the vertical screen</span>
          </footer>
        </section>
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
    // 1. Toggle archive card
    const toggleBtn = document.getElementById('tv-toggle-archive-btn');
    const archiveCard = document.getElementById('tv-archive-card');
    const closeBtn = document.getElementById('tv-archive-close-btn');

    if (toggleBtn && archiveCard) {
      toggleBtn.onclick = () => {
        const isHidden = (archiveCard.style.display === 'none');
        archiveCard.style.display = isHidden ? 'flex' : 'none';
      };
    }

    if (closeBtn && archiveCard) {
      closeBtn.onclick = () => {
        archiveCard.style.display = 'none';
      };
    }

    // 2. Download actions
    const dlPostcardBtn = document.getElementById('tv-btn-dl-postcard');
    if (dlPostcardBtn) {
      dlPostcardBtn.onclick = () => {
        if (this.pastSessionsManager && featuredSession) {
          this.pastSessionsManager.generateSwagPostcard(featuredSession);
        }
      };
    }

    const dlHdBtn = document.getElementById('tv-btn-dl-hd');
    if (dlHdBtn) {
      dlHdBtn.onclick = () => {
        if (this.pastSessionsManager && featuredSession) {
          this.pastSessionsManager.downloadRawArtwork(featuredSession);
        }
      };
    }

    // 3. Thumbnail / Title inspection modal
    const thumbWrap = document.getElementById('tv-archive-thumb-wrap');
    const infoWrap = document.getElementById('tv-archive-info-wrap');
    [thumbWrap, infoWrap].forEach(el => {
      if (el) {
        el.onclick = () => {
          if (this.pastSessionsManager && featuredSession) {
            this.pastSessionsManager.showSessionModal(featuredSession);
          }
        };
      }
    });

    // 4. Touch Survey Weather Buttons
    const weatherBtns = document.querySelectorAll('.tv-weather-card');
    weatherBtns.forEach(btn => {
      btn.onclick = () => {
        const weatherId = btn.getAttribute('data-weather');
        if (!weatherId) return;

        // Visual feedback
        weatherBtns.forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');

        // Submit sentiment to live system
        if (this.syncManager) {
          this.syncManager.submitResponse({
            weather: weatherId,
            author: 'TV Kiosk Attendee',
            note: 'Touch TV Attendee Vote'
          });
        }

        // Live shockwave burst
        if (this.artworkEngine) {
          this.artworkEngine.addResponseBurst({ weather: weatherId });
        }

        this.showToastNotification({
          author: 'Touch TV Attendee',
          weather: weatherId,
          food: 'bebinca',
          location: 'aguada_fort',
          emblem: 'mandovi_boat',
          note: 'Woven into Live Artwork'
        });

        setTimeout(() => {
          btn.classList.remove('selected');
        }, 1800);
      };
    });

    // 5. POAI badge tap feedback
    const poaiBadge = document.getElementById('tv-poai-badge');
    if (poaiBadge) {
      poaiBadge.onclick = () => {
        this.showToastNotification({
          author: 'POAI 2026',
          note: 'Goa AI Conclave · Many Minds One Tomorrow'
        });
      };
    }
  }

  updateTVArchiveCard() {
    if (this.currentMode !== 'dual' && this.currentMode !== 'wall') return;
    const featuredSession = (this.pastSessions && this.pastSessions.length > 0)
      ? this.pastSessions[this.pastSessions.length - 1]
      : (this.currentSession || null);
    if (!featuredSession) return;

    const thumbEl = document.getElementById('tv-archive-thumb');
    const titleEl = document.getElementById('tv-archive-title');
    const metaEl = document.getElementById('tv-archive-meta');
    const reasonEl = document.getElementById('tv-archive-reasoning');
    const countEl = document.getElementById('tv-past-count');

    if (thumbEl) {
      thumbEl.src = featuredSession.snapshotUrl || featuredSession.gifUrl || 'assets/test_fontainhas.gif';
    }
    if (titleEl) {
      titleEl.textContent = featuredSession.topologyInfo?.name || featuredSession.name || 'Mandovi River Sailboat & Fluvial Wake Currents';
    }
    if (metaEl) {
      metaEl.textContent = `${featuredSession.timeLabel || '12:00 - 12:30 IST'} · ${featuredSession.totalResponses || 0} audience responses`;
    }
    if (reasonEl) {
      reasonEl.textContent = featuredSession.topologyInfo?.reasoning || featuredSession.description || 'Restless coastal sea winds (SUNNY) and historic Aguada fortress presence (DUDHSAGAR) created 16 concentric orbital light shells and sweeping celestial ray arms.';
    }
    if (countEl) {
      countEl.textContent = this.pastSessions.length || 49;
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
            <p class="showcase-past-subheading">Ultra-lightweight looping GIFs (< 10s loop) generated from 30-minute attendee sentiment convergence.</p>
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
                  <img src="${imgSrc}" alt="${sess.name}" class="showcase-past-gif" loading="lazy" />
                  <div class="showcase-past-loop-tag">${loopTag}</div>
                  <div class="showcase-past-session-tag">Session #${sess.sessionNumber || (idx + 1)}</div>
                </div>
                <div class="showcase-past-body">
                  <div class="showcase-past-time-row">
                    <span>${sess.timeLabel || '30 Min Session'}</span>
                    <span class="showcase-past-voices">${sess.totalResponses || 0} voices</span>
                  </div>
                  <h3 class="showcase-past-title">${sess.name || 'Conclave Artwork'}</h3>
                  <div class="showcase-past-archetype">${topoName} · ${archetype}</div>
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
      this.artworkEngine = new GoanArtworkEngine(canvas, this.sentimentEngine);
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
    if (this.currentMode === 'screen') return; // Dedicated artwork screen: zero text at all points
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
      if (this.currentMode === 'dual' || this.currentMode === 'wall') {
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
    ['screen', 'tablet', 'dual'].forEach(m => {
      const btn = document.getElementById(`btn-mode-${m}`);
      if (btn) {
        if (m === this.currentMode || (this.currentMode === 'wall' && m === 'dual')) btn.classList.add('active');
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
