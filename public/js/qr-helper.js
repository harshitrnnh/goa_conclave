// QR Code Generator & Tablet Link Manager

export class QRHelper {
  constructor(containerElement) {
    this.container = containerElement;
    this.currentUrl = '';
  }

  async renderQRCode(targetUrl) {
    this.currentUrl = targetUrl || window.location.origin + '/';

    try {
      // 1. Fetch from server API
      const res = await fetch(`/api/qr?url=${encodeURIComponent(this.currentUrl)}`);
      if (res.ok) {
        const data = await res.json();
        this.displayImage(data.dataUrl, this.currentUrl);
        return;
      }
    } catch (e) {
      console.warn('QR API fetch error, rendering SVG placeholder:', e);
    }

    // Fallback QR display with stylized icon & link
    this.displayFallback(this.currentUrl);
  }

  displayImage(dataUrl, url) {
    this.container.innerHTML = `
      <div class="qr-code-wrapper" title="Scan to open tablet survey">
        <a href="${url}" target="_blank" rel="noopener" class="qr-link">
          <img src="${dataUrl}" alt="Scan QR Code" class="qr-image" />
        </a>
      </div>
    `;
  }

  displayFallback(url) {
    this.container.innerHTML = `
      <div class="qr-code-wrapper">
        <a href="${url}" target="_blank" rel="noopener" class="qr-link qr-text-fallback">
          <div class="qr-code-icon-box">
            <svg viewBox="0 0 48 48" width="56" height="56" fill="#872012">
              <path d="M8 8h14v14H8zm4 4v6h6v-6zm14-4h14v14H26zm4 4v6h6v-6zM8 26h14v14H8zm4 4v6h6v-6zm20-4h4v4h-4zm6 0h4v4h-4zm-6 6h4v4h-4zm6 6h4v4h-4zm-6 4h10v4H32zm-6-10h4v10h-4z"/>
            </svg>
          </div>
          <span>Open Tablet Survey</span>
        </a>
      </div>
    `;
  }
}
