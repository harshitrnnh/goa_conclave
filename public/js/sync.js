// Real-time synchronization layer for Goa Conclave
// Uses WebSockets with BroadcastChannel & LocalStorage fallback

export class SyncManager {
  constructor(options = {}) {
    this.onInitialState = options.onInitialState || (() => {});
    this.onNewResponse = options.onNewResponse || (() => {});
    this.onCycleAdvanced = options.onCycleAdvanced || (() => {});
    this.onSessionSnapshotUpdated = options.onSessionSnapshotUpdated || (() => {});
    this.onStatusChange = options.onStatusChange || (() => {});

    this.ws = null;
    this.isConnected = false;
    this.reconnectAttempts = 0;
    this.broadcastChannel = null;

    this.initBroadcastChannel();
    this.connectWebSocket();
  }

  initBroadcastChannel() {
    if (typeof BroadcastChannel !== 'undefined') {
      this.broadcastChannel = new BroadcastChannel('goa_conclave_channel');
      this.broadcastChannel.onmessage = (event) => {
        this.handleMessage(event.data);
      };
    }

    // LocalStorage fallback event listener for multi-tab support
    window.addEventListener('storage', (e) => {
      if (e.key === 'goa_conclave_event' && e.newValue) {
        try {
          const data = JSON.parse(e.newValue);
          this.handleMessage(data);
        } catch (err) {}
      }
    });
  }

  connectWebSocket() {
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const host = window.location.host;
    const wsUrl = `${protocol}//${host}`;

    try {
      this.ws = new WebSocket(wsUrl);

      this.ws.onopen = () => {
        this.isConnected = true;
        this.reconnectAttempts = 0;
        this.onStatusChange({ connected: true, type: 'websocket' });
        console.log('Connected to Conclave WebSocket server.');
      };

      this.ws.onmessage = (evt) => {
        try {
          const data = JSON.parse(evt.data);
          this.handleMessage(data);
        } catch (err) {
          console.error('Error parsing WS message:', err);
        }
      };

      this.ws.onclose = () => {
        this.isConnected = false;
        this.onStatusChange({ connected: false, type: 'websocket' });
        this.scheduleReconnect();
      };

      this.ws.onerror = (err) => {
        console.warn('WebSocket connection error, falling back to local channel.');
        this.isConnected = false;
      };
    } catch (e) {
      console.warn('Failed to initiate WebSocket, using fallback.');
    }
  }

  scheduleReconnect() {
    const delay = Math.min(10000, 1000 * Math.pow(1.5, this.reconnectAttempts++));
    setTimeout(() => {
      if (!this.isConnected) {
        this.connectWebSocket();
      }
    }, delay);
  }

  handleMessage(data) {
    if (!data || !data.type) return;

    switch (data.type) {
      case 'INITIAL_STATE':
        this.onInitialState(data);
        break;

      case 'NEW_RESPONSE':
        this.onNewResponse(data.response, data.totalCount);
        break;

      case 'CYCLE_ADVANCED':
        this.onCycleAdvanced(data);
        break;

      case 'SESSION_SNAPSHOT_UPDATED':
        this.onSessionSnapshotUpdated(data);
        break;

      default:
        break;
    }
  }

  // Submit survey response
  async submitResponse(formData) {
    try {
      // 1. Try REST API
      const res = await fetch('/api/respond', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        return await res.json();
      }
    } catch (e) {
      console.warn('REST API unavailable, falling back to BroadcastChannel');
    }

    // Fallback broadcast
    const entry = {
      id: 'local-' + Date.now(),
      ...formData,
      timestamp: Date.now()
    };
    const payload = { type: 'NEW_RESPONSE', response: entry };
    if (this.broadcastChannel) this.broadcastChannel.postMessage(payload);
    localStorage.setItem('goa_conclave_event', JSON.stringify({ ...payload, _ts: Date.now() }));
    this.handleMessage(payload);
    return { success: true, response: entry };
  }

  // Trigger manual 30-minute transition (for demos and testing)
  async triggerCycleTransition(customName) {
    try {
      const res = await fetch('/api/trigger-cycle', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ customName })
      });
      return await res.json();
    } catch (e) {
      console.warn('Server trigger failed, triggering locally');
      const payload = { type: 'CYCLE_ADVANCED', timestamp: Date.now() };
      if (this.broadcastChannel) this.broadcastChannel.postMessage(payload);
      this.handleMessage(payload);
    }
  }

  // Simulate an entire 30-minute cycle of 28-36 audience votes and mutate the artwork
  async simulateCycleAndAdvance() {
    try {
      const res = await fetch('/api/simulate-cycle', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
      return await res.json();
    } catch (e) {
      console.warn('Simulate cycle failed, triggering fallback:', e);
      return this.triggerCycleTransition();
    }
  }

  // Inject simulated audience responses
  async injectMockVotes(count = 5) {
    try {
      const res = await fetch('/api/inject-mock', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ count })
      });
      return await res.json();
    } catch (e) {
      console.error('Failed to inject mock votes:', e);
    }
  }

  // Upload authentic canvas snapshot data to server for persistent storage
  async uploadSessionSnapshot(sessionId, imageData) {
    try {
      const res = await fetch(`/api/sessions/${sessionId}/snapshot`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageData })
      });
      const data = await res.json();
      console.log(`[Sync] Snapshot uploaded successfully for ${sessionId}:`, data);
      return data;
    } catch (err) {
      console.error(`[Sync] Error uploading snapshot for ${sessionId}:`, err);
      return null;
    }
  }
}
