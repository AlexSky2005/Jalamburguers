/**
 * ================================================================
 * COOKIE CONSENT SYSTEM
 * ================================================================
 * Sistema de aceptación de cookies conforme a GDPR/LSSI-CE
 */

class CookieConsent {
  constructor() {
    this.COOKIE_NAME = 'jalburger_cookie_consent';
    this.COOKIE_DURATION = 365; // días
  }

  /**
   * Crea la notificación de cookies
   */
  createBanner() {
    const banner = document.createElement('div');
    banner.id = 'cookie-banner';
    banner.className = 'cookie-banner';
    banner.innerHTML = `
      <div class="cookie-content">
        <div class="cookie-text">
          <h3>🍪 Usamos Cookies</h3>
          <p>
            Utilizamos cookies para mejorar tu experiencia de navegación, analizar el uso del sitio y personalizar contenidos. 
            Al hacer clic en "Aceptar", consientes el uso de todas las cookies.
          </p>
        </div>
        <div class="cookie-actions">
          <button class="btn ghost cookie-btn" onclick="cookieConsent.reject()">Rechazar</button>
          <button class="btn cookie-btn" onclick="cookieConsent.accept()">Aceptar</button>
        </div>
      </div>
    `;
    
    return banner;
  }

  /**
   * Muestra el banner de cookies
   */
  show() {
    // Verificar si ya fue aceptado
    if (this.getCookie(this.COOKIE_NAME)) {
      return;
    }
    
    const banner = this.createBanner();
    document.body.appendChild(banner);
    
    // Animar entrada
    setTimeout(() => {
      banner.classList.add('active');
    }, 100);
  }

  /**
   * Establece una cookie
   */
  setCookie(name, value, days = 365) {
    const expires = new Date();
    expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
    
    const cookieString = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Strict`;
    document.cookie = cookieString;
  }

  /**
   * Obtiene una cookie
   */
  getCookie(name) {
    const nameEQ = name + '=';
    const cookies = document.cookie.split(';');
    
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.indexOf(nameEQ) === 0) {
        return cookie.substring(nameEQ.length);
      }
    }
    
    return null;
  }

  /**
   * Acepta todas las cookies
   */
  accept() {
    this.setCookie(this.COOKIE_NAME, 'accepted', this.COOKIE_DURATION);
    this.hideBanner();
    notificationManager.success('¡Gracias!', 'Cookies aceptadas. Navegación optimizada.');
  }

  /**
   * Rechaza las cookies no esenciales
   */
  reject() {
    this.setCookie(this.COOKIE_NAME, 'rejected', this.COOKIE_DURATION);
    this.hideBanner();
    notificationManager.info('Entendido', 'Solo usaremos cookies esenciales.');
  }

  /**
   * Oculta el banner
   */
  hideBanner() {
    const banner = document.getElementById('cookie-banner');
    if (banner) {
      banner.classList.remove('active');
      setTimeout(() => {
        banner.remove();
      }, 300);
    }
  }
}

// Instancia global
const cookieConsent = new CookieConsent();

// Mostrar banner cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  cookieConsent.show();
});
