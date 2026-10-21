// Tablet & Mobile Survey Kiosk Application
// Matches the tablet interface in the reference photo with authentic Goan aesthetics
// Expanded to 4 core questions: Weather, Goan Food, Top Tourist Places, Cultural Emblems

import { WEATHER_ICONS, FOOD_ICONS, LOCATION_ICONS, EMBLEM_ICONS, GOAN_BORDER_FRIEZE } from './icons.js';
import { getArtworkImpactWriteup } from './sentiment-engine.js';

export class TabletApp {
  constructor(container, syncManager, pastSessionsManager) {
    this.container = container;
    this.syncManager = syncManager;
    this.pastSessionsManager = pastSessionsManager;

    this.currentStep = 1; // 1: Weather, 2: Food, 3: Location, 4: Emblem, 5: Note, 6: Success
    this.activeTab = 'vote'; // 'vote' | 'past'
    this.selectedWeather = null;
    this.selectedFood = null;
    this.selectedLocation = null;
    this.selectedEmblem = null;
    this.attendeeNote = '';
    this.attendeeName = '';

    this.pastSessions = (pastSessionsManager && pastSessionsManager.sessions) ? pastSessionsManager.sessions : [];
    this.resetTimer = null;
    this.init();
  }

  setPastSessions(sessions) {
    this.pastSessions = sessions || [];
    const countEl = this.container?.querySelector('#tablet-past-count');
    if (countEl) countEl.textContent = this.getPastSessions().length;
    if (this.activeTab === 'past') {
      this.render();
    }
  }

  getPastSessions() {
    return (this.pastSessionsManager && this.pastSessionsManager.sessions && this.pastSessionsManager.sessions.length > 0)
      ? this.pastSessionsManager.sessions
      : this.pastSessions;
  }

  switchTab(tab) {
    this.activeTab = tab;
    this.render();
  }

  init() {
    this.render();
  }

  render() {
    if (!this.container) return;
    const pastCount = this.getPastSessions().length;

    this.container.innerHTML = `
      <div class="tablet-kiosk-wrapper">
        <!-- Top Ornamental Goan Frieze Border -->
        <header class="tablet-header">
          <div class="tablet-header-bar">
            <div class="tablet-artist-meta">
              <span class="conclave-brand">Artwork by Harshit Agrawal <span class="brand-handle">@harshitrnnh</span></span>
              <div class="tablet-artist-bio">
                <img src="assets/harshit_agrawal.png" alt="Harshit Agrawal" class="tablet-artist-avatar" />
                <span class="tablet-artist-tagline">Held India's first solo AI Art Show, Exhibition in 20 countries, 5 TEDx Talks, Google's first Artist Resident in India.</span>
              </div>
            </div>
            
            <div class="tablet-header-right-group">
              <!-- iPad Navigation Tabs -->
              <nav class="tablet-nav-tabs" role="tablist" aria-label="Kiosk Tabs">
                <button class="tablet-tab-btn ${this.activeTab === 'vote' ? 'active' : ''}" id="tab-btn-vote" role="tab" aria-selected="${this.activeTab === 'vote'}">
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"/>
                  </svg>
                  <span>Vote / Survey</span>
                </button>
                <button class="tablet-tab-btn ${this.activeTab === 'past' ? 'active' : ''}" id="tab-btn-past" role="tab" aria-selected="${this.activeTab === 'past'}">
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14h-2v-2h2v2zm0-4h-2V7h2v5z"/>
                  </svg>
                  <span>Previous Artworks</span>
                  <span class="tab-badge-pill" id="tablet-past-count">${pastCount}</span>
                </button>
              </nav>

              <div class="tablet-poai-badge" id="tablet-poai-badge" title="POAI - Conclave">
                <img src="assets/poai_official_logo.png" alt="POAI" class="tablet-poai-logo-img" />
              </div>
            </div>
          </div>
        </header>

        <!-- Main Content Area: Survey or Previous Artworks Gallery -->
        <main class="tablet-main" id="tablet-step-container">
          ${this.activeTab === 'vote' ? this.getStepHtml() : this.renderPreviousArtworksGallery()}
        </main>

        <!-- Bottom Ornamental Goan Frieze Border -->
        <footer class="tablet-footer">
          <div class="tablet-footer-bar">
            ${this.activeTab === 'vote' ? `
              <div class="tablet-stepper">
                <span class="step-dot ${this.currentStep === 1 ? 'active' : ''}"></span>
                <span class="step-dot ${this.currentStep === 2 ? 'active' : ''}"></span>
                <span class="step-dot ${this.currentStep === 3 ? 'active' : ''}"></span>
                <span class="step-dot ${this.currentStep === 4 ? 'active' : ''}"></span>
                <span class="step-dot ${this.currentStep === 5 ? 'active' : ''}"></span>
              </div>
              <span class="kiosk-hint">Touch an option to proceed · Tapestry continuously morphs on the vertical screen</span>
            ` : `
              <span class="kiosk-hint">⏱️ 10-Second Looping GIFs · Tap any artwork to inspect attendee sentiment and generate Swag</span>
              <button class="tablet-quick-return-btn" id="footer-back-to-vote-btn" style="padding: 2px 10px; font-size: 0.72rem;">Back to Vote</button>
            `}
          </div>
        </footer>
      </div>
    `;

    this.bindEvents();
  }

  getStepHtml() {
    switch (this.currentStep) {
      case 1:
        return this.renderWeatherStep();
      case 2:
        return this.renderFoodStep();
      case 3:
        return this.renderLocationStep();
      case 4:
        return this.renderEmblemStep();
      case 5:
        return this.renderReflectionStep();
      case 6:
        return this.renderSuccessStep();
      default:
        return this.renderWeatherStep();
    }
  }

  // Question 1: Weather of Goa
  renderWeatherStep() {
    const options = [
      { id: 'sunny', label: 'Sunny', subtitle: '& Energetic', icon: WEATHER_ICONS.sunny },
      { id: 'windy', label: 'Windy', subtitle: '& Restless', icon: WEATHER_ICONS.windy },
      { id: 'rainy', label: 'Rainy', subtitle: '& Reflective', icon: WEATHER_ICONS.rainy },
      { id: 'stormy', label: 'Stormy', subtitle: '& Eclectic', icon: WEATHER_ICONS.stormy },
      { id: 'calm', label: 'Calm', subtitle: '& Serene', icon: WEATHER_ICONS.calm }
    ];

    return `
      <section class="question-section" aria-label="Question 1">
        <h2 class="question-title">
          What did the previous session of the Conclave feel like in terms of the weather of Goa?
        </h2>
        <div class="sentiment-grid weather-grid">
          ${options.map(opt => `
            <button class="sentiment-card ${this.selectedWeather === opt.id ? 'selected' : ''}" data-weather="${opt.id}">
              <div class="sentiment-icon-circle">
                ${opt.icon}
              </div>
              <div class="sentiment-card-label">
                <span class="label-primary">${opt.label}</span>
                <span class="label-secondary">${opt.subtitle}</span>
              </div>
            </button>
          `).join('')}
        </div>
      </section>
    `;
  }

  // Question 2: Goan Food Metaphor
  renderFoodStep() {
    const options = [
      { id: 'fish_curry', label: 'Fish Curry', subtitle: '(Bold & Transformative)', icon: FOOD_ICONS.fish_curry },
      { id: 'prawn_curry', label: 'Prawn Curry', subtitle: '(Warm & Exciting)', icon: FOOD_ICONS.prawn_curry },
      { id: 'vindaloo', label: 'Vindaloo', subtitle: '(Spicy & Intense)', icon: FOOD_ICONS.vindaloo },
      { id: 'xacuti', label: 'Xacuti', subtitle: '(Rich & Layered)', icon: FOOD_ICONS.xacuti },
      { id: 'bebinca', label: 'Bebinca', subtitle: '(Sweet & Optimistic)', icon: FOOD_ICONS.bebinca },
      { id: 'poe_bread', label: 'Poe Bread', subtitle: '(Simple & Comforting)', icon: FOOD_ICONS.poe_bread }
    ];

    return `
      <section class="question-section" aria-label="Question 2">
        <div class="question-nav-back">
          <button class="back-link-btn" id="step-back-btn">&larr; Back to Weather</button>
        </div>
        <h2 class="question-title">
          How do you feel about AI in terms of Goan foods?
        </h2>
        <div class="sentiment-grid food-grid">
          ${options.map(opt => `
            <button class="sentiment-card ${this.selectedFood === opt.id ? 'selected' : ''}" data-food="${opt.id}">
              <div class="sentiment-icon-circle">
                ${opt.icon}
              </div>
              <div class="sentiment-card-label">
                <span class="label-primary">${opt.label}</span>
                <span class="label-secondary">${opt.subtitle}</span>
              </div>
            </button>
          `).join('')}
        </div>
      </section>
    `;
  }

  // Question 3: Top Tourist Place / Landmark of Goa
  renderLocationStep() {
    const options = [
      { id: 'dudhsagar', label: 'Dudhsagar Falls', subtitle: '(Cascading Power)', icon: LOCATION_ICONS.dudhsagar },
      { id: 'aguada_fort', label: 'Aguada Lighthouse', subtitle: '(Steadfast & Visionary)', icon: LOCATION_ICONS.aguada_fort },
      { id: 'fontainhas', label: 'Fontainhas Quarter', subtitle: '(Vibrant Heritage)', icon: LOCATION_ICONS.fontainhas },
      { id: 'chapora_fort', label: 'Chapora Fort', subtitle: '(Expansive Spirit)', icon: LOCATION_ICONS.chapora_fort },
      { id: 'palolem_beach', label: 'Palolem Beach', subtitle: '(Harmonious Peace)', icon: LOCATION_ICONS.palolem_beach },
      { id: 'cabo_de_rama', label: 'Cabo de Rama Fort', subtitle: '(Wild Clifftop Horizon)', icon: LOCATION_ICONS.cabo_de_rama }
    ];

    return `
      <section class="question-section" aria-label="Question 3">
        <div class="question-nav-back">
          <button class="back-link-btn" id="step-back-btn">&larr; Back to Food</button>
        </div>
        <h2 class="question-title">
          How did the previous session feel in terms of top Goa locations?
        </h2>
        <div class="sentiment-grid location-grid">
          ${options.map(opt => `
            <button class="sentiment-card ${this.selectedLocation === opt.id ? 'selected' : ''}" data-location="${opt.id}">
              <div class="sentiment-icon-circle">
                ${opt.icon}
              </div>
              <div class="sentiment-card-label">
                <span class="label-primary">${opt.label}</span>
                <span class="label-secondary">${opt.subtitle}</span>
              </div>
            </button>
          `).join('')}
        </div>
      </section>
    `;
  }

  // Question 4: Goan Cultural / Natural Emblem
  renderEmblemStep() {
    const options = [
      { id: 'mandovi_boat', label: 'Mandovi Sailboat', subtitle: '(Navigating Horizons)', icon: EMBLEM_ICONS.mandovi_boat },
      { id: 'coconut_palm', label: 'Coconut Palm', subtitle: '(Resilient & Grounded)', icon: EMBLEM_ICONS.coconut_palm },
      { id: 'sea_turtle', label: 'Olive Ridley Turtle', subtitle: '(Sustainable Wisdom)', icon: EMBLEM_ICONS.sea_turtle },
      { id: 'kingfisher', label: 'Goan Kingfisher', subtitle: '(Agile & Insightful)', icon: EMBLEM_ICONS.kingfisher },
      { id: 'carnival_spirit', label: 'Viva Carnival Mask', subtitle: '(Bold Creative Energy)', icon: EMBLEM_ICONS.carnival_spirit },
      { id: 'susegad', label: 'Susegad Hammock', subtitle: '(Unhurried Serenity)', icon: EMBLEM_ICONS.susegad }
    ];

    return `
      <section class="question-section" aria-label="Question 4">
        <div class="question-nav-back">
          <button class="back-link-btn" id="step-back-btn">&larr; Back to Locations</button>
        </div>
        <h2 class="question-title">
          Which Goan cultural spirit or emblem captures the essence of this session?
        </h2>
        <div class="sentiment-grid emblem-grid">
          ${options.map(opt => `
            <button class="sentiment-card ${this.selectedEmblem === opt.id ? 'selected' : ''}" data-emblem="${opt.id}">
              <div class="sentiment-icon-circle">
                ${opt.icon}
              </div>
              <div class="sentiment-card-label">
                <span class="label-primary">${opt.label}</span>
                <span class="label-secondary">${opt.subtitle}</span>
              </div>
            </button>
          `).join('')}
        </div>
      </section>
    `;
  }

  // Step 5: Attendee Reflection & Name note
  renderReflectionStep() {
    return `
      <section class="question-section reflection-section" aria-label="Confirm & Submit">
        <div class="question-nav-back">
          <button class="back-link-btn" id="step-back-btn">&larr; Change selections</button>
        </div>
        <h2 class="question-title">
          Leave your mark on this 30-minute tapestry
        </h2>
        
        <div class="selections-recap">
          <div class="recap-badge">
            <span class="recap-label">Weather:</span>
            <strong>${(this.selectedWeather || 'SUNNY').replace('_', ' ').toUpperCase()}</strong>
          </div>
          <div class="recap-badge">
            <span class="recap-label">Flavour:</span>
            <strong>${(this.selectedFood || 'FISH CURRY').replace('_', ' ').toUpperCase()}</strong>
          </div>
          <div class="recap-badge">
            <span class="recap-label">Landmark:</span>
            <strong>${(this.selectedLocation || 'AGUADA').replace('_', ' ').toUpperCase()}</strong>
          </div>
          <div class="recap-badge">
            <span class="recap-label">Emblem:</span>
            <strong>${(this.selectedEmblem || 'SAILBOAT').replace('_', ' ').toUpperCase()}</strong>
          </div>
        </div>

        <div class="reflection-actions-only" style="margin-top: 28px; width: 100%; max-width: 480px;">
          <button type="button" class="weave-btn" id="submit-weave-btn" style="width: 100%;">
            <span>Weave Into Live Artwork &rarr;</span>
          </button>
        </div>
      </section>
    `;
  }

  // Step 6: Celebratory Confirmation
  renderSuccessStep() {
    const icon = EMBLEM_ICONS[this.selectedEmblem] || LOCATION_ICONS[this.selectedLocation] || WEATHER_ICONS[this.selectedWeather] || WEATHER_ICONS.sunny;
    const impact = getArtworkImpactWriteup({
      weather: this.selectedWeather,
      food: this.selectedFood,
      location: this.selectedLocation,
      emblem: this.selectedEmblem
    });

    return `
      <section class="question-section success-section" aria-label="Thank You">
        <div class="celebration-mandala">
          <div class="mandala-outer-ring"></div>
          <div class="mandala-core">
            ${icon}
          </div>
        </div>

        <h2 class="success-title">Your voice is now woven into the artwork</h2>
        <p class="success-subtitle">
          Watch the vertical screen! The particle tapestry is dynamically responding to your choices.
        </p>

        <!-- Dynamic Artwork Transformation Writeup (Concise) -->
        <div class="impact-writeup-card concise-card">
          <div class="impact-card-header">
            <span class="impact-card-badge">✨ Live Transformation</span>
            <span class="impact-card-tagline">${impact.headline}</span>
          </div>
          <p class="impact-card-summary" style="margin: 0; font-size: 0.9rem; font-style: normal; color: #4A170B; font-weight: 500; line-height: 1.45;">
            ${impact.conciseNote}
          </p>
        </div>

        <div class="success-actions">
          <button class="action-btn-primary go-to-input-btn" id="vote-again-btn" aria-label="Back to Giving Votes">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: middle; margin-right: 8px;">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            <span>Back to Giving Votes (Next Attendee)</span>
          </button>
          <button class="action-btn-secondary" id="view-past-gallery-btn">
            View Past Artworks Gallery
          </button>
        </div>
      </section>
    `;
  }

  renderPreviousArtworksGallery() {
    const sessions = this.getPastSessions();
    if (!sessions || sessions.length === 0) {
      return `
        <div class="tablet-past-empty-state" style="padding: 40px 20px; text-align: center; color: var(--goa-sand);">
          <p>No previous artworks recorded yet. Artworks archive every 30 minutes.</p>
          <button class="tablet-quick-return-btn" id="gallery-return-vote-btn" style="margin-top: 16px; background: var(--goa-gold); color: #4A170B; border: none; padding: 8px 16px; border-radius: 20px; font-weight: 700; cursor: pointer;">Return to Survey</button>
        </div>
      `;
    }

    return `
      <div class="tablet-past-gallery-scroll">
        <div class="tablet-past-gallery-header">
          <div>
            <h2 class="tablet-past-gallery-title">Previous Artworks Archive</h2>
            <p class="tablet-past-gallery-subtitle">Looping GIFs of 30-min cycles (max 10s loop) · Responding dynamically to Goan sentiment</p>
          </div>
          <button class="tablet-quick-return-btn" id="gallery-return-vote-btn">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
              <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"/>
            </svg>
            <span>Back to Vote</span>
          </button>
        </div>

        <div class="tablet-past-cards-grid">
          ${sessions.map((sess, idx) => {
            const imgSrc = sess.snapshotUrl || sess.gifUrl || `/api/sessions/${sess.id}/artwork.gif`;
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
      </div>
    `;
  }

  formatTag(str) {
    if (!str) return '';
    return str.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  }

  bindEvents() {
    // Top Tabs navigation
    const tabVoteBtn = this.container.querySelector('#tab-btn-vote');
    if (tabVoteBtn) {
      tabVoteBtn.onclick = () => this.switchTab('vote');
    }

    const tabPastBtn = this.container.querySelector('#tab-btn-past');
    if (tabPastBtn) {
      tabPastBtn.onclick = () => this.switchTab('past');
    }

    const galleryReturnBtn = this.container.querySelector('#gallery-return-vote-btn');
    if (galleryReturnBtn) {
      galleryReturnBtn.onclick = () => this.switchTab('vote');
    }

    const footerBackBtn = this.container.querySelector('#footer-back-to-vote-btn');
    if (footerBackBtn) {
      footerBackBtn.onclick = () => this.switchTab('vote');
    }

    // Previous Artworks card detail button or thumbnail click
    this.container.querySelectorAll('.tablet-card-detail-btn, .tablet-art-thumb-frame').forEach(el => {
      el.onclick = (e) => {
        const sid = el.getAttribute('data-session-id') || el.closest('.tablet-art-card')?.getAttribute('data-session-id');
        if (sid) {
          const session = this.getPastSessions().find(s => s.id === sid);
          if (session && this.pastSessionsManager) {
            this.pastSessionsManager.showSessionModal(session);
          }
        }
      };
    });

    if (this.activeTab === 'past') {
      return; // Survey events not needed in gallery view
    }

    // 1. Weather selection
    this.container.querySelectorAll('[data-weather]').forEach(btn => {
      btn.onclick = () => {
        this.selectedWeather = btn.getAttribute('data-weather');
        this.currentStep = 2;
        this.render();
      };
    });

    // 2. Food selection
    this.container.querySelectorAll('[data-food]').forEach(btn => {
      btn.onclick = () => {
        this.selectedFood = btn.getAttribute('data-food');
        this.currentStep = 3;
        this.render();
      };
    });

    // 3. Location selection
    this.container.querySelectorAll('[data-location]').forEach(btn => {
      btn.onclick = () => {
        this.selectedLocation = btn.getAttribute('data-location');
        this.currentStep = 4;
        this.render();
      };
    });

    // 4. Emblem selection
    this.container.querySelectorAll('[data-emblem]').forEach(btn => {
      btn.onclick = () => {
        this.selectedEmblem = btn.getAttribute('data-emblem');
        this.currentStep = 5;
        this.render();
      };
    });

    // Back button
    const backBtn = this.container.querySelector('#step-back-btn');
    if (backBtn) {
      backBtn.onclick = () => {
        this.currentStep = Math.max(1, this.currentStep - 1);
        this.render();
      };
    }

    // Direct submit weave button (no text form inputs required)
    const weaveBtn = this.container.querySelector('#submit-weave-btn');
    if (weaveBtn) {
      weaveBtn.onclick = async (e) => {
        e.preventDefault();
        weaveBtn.disabled = true;
        weaveBtn.style.opacity = '0.7';
        weaveBtn.innerHTML = '<span>Weaving into Live Artwork...</span>';

        const payload = {
          weather: this.selectedWeather || 'sunny',
          food: this.selectedFood || 'bebinca',
          location: this.selectedLocation || 'aguada_fort',
          emblem: this.selectedEmblem || 'sailboat',
          author: '',
          note: ''
        };

        // Submit all 4 answers to sync manager with fallback
        try {
          if (this.syncManager && typeof this.syncManager.submitResponse === 'function') {
            await this.syncManager.submitResponse(payload);
          } else {
            await fetch('/api/respond', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(payload)
            });
          }
        } catch (err) {
          console.warn('Sync submission error, continuing to celebratory screen:', err);
        }

        this.currentStep = 6;
        if (this.resetTimer) {
          clearInterval(this.resetTimer);
          this.resetTimer = null;
        }
        this.render();
      };
    }

    // Past sessions button in header
    const pastBtn = this.container.querySelector('#open-past-sessions-btn');
    if (pastBtn) {
      pastBtn.onclick = () => this.switchTab('past');
    }

    // Success screen actions
    const viewPastBtn = this.container.querySelector('#view-past-gallery-btn');
    if (viewPastBtn) {
      viewPastBtn.onclick = () => this.switchTab('past');
    }

    const voteAgainBtn = this.container.querySelector('#vote-again-btn');
    if (voteAgainBtn) {
      voteAgainBtn.onclick = () => this.reset();
    }
  }

  startAutoReset() {
    let timeLeft = 15;
    if (this.resetTimer) clearInterval(this.resetTimer);

    this.resetTimer = setInterval(() => {
      timeLeft--;
      const counterEl = this.container.querySelector('#reset-counter');
      if (counterEl) counterEl.textContent = timeLeft;

      if (timeLeft <= 0) {
        clearInterval(this.resetTimer);
        this.reset();
      }
    }, 1000);
  }

  reset() {
    if (this.resetTimer) clearInterval(this.resetTimer);
    this.currentStep = 1;
    this.selectedWeather = null;
    this.selectedFood = null;
    this.selectedLocation = null;
    this.selectedEmblem = null;
    this.attendeeName = '';
    this.attendeeNote = '';
    this.render();
  }
}
