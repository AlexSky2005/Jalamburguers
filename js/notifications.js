/**
 * ================================================================
 * TOAST NOTIFICATION SYSTEM
 * ================================================================
 * Sistema de notificaciones que aparecen desde la parte inferior derecha
 */

class Toast {
  constructor(title, message, type = 'info', duration = 4000) {
    this.title = title;
    this.message = message;
    this.type = type;
    this.duration = duration;
    this.id = Date.now();
    this.element = null;
    this.timeoutId = null;
  }

  /**
   * Obtiene el ícono basado en el tipo de notificación
   */
  getIcon() {
    const icons = {
      success: '✅',
      error: '❌',
      info: 'ℹ️',
      warning: '⚠️'
    };
    return icons[this.type] || icons.info;
  }

  /**
   * Crea el elemento HTML del toast
   */
  createElement() {
    const toast = document.createElement('div');
    toast.className = `toast ${this.type}`;
    toast.id = `toast-${this.id}`;
    
    toast.innerHTML = `
      <div class="toast-icon">${this.getIcon()}</div>
      <div class="toast-content">
        <h3 class="toast-title">${this.title}</h3>
        ${this.message ? `<p class="toast-message">${this.message}</p>` : ''}
      </div>
      <button class="toast-close" onclick="notificationManager.remove('${this.id}')">
        ✕
      </button>
    `;
    
    this.element = toast;
    return toast;
  }

  /**
   * Muestra el toast en la pantalla
   */
  show() {
    const container = notificationManager.getContainer();
    container.appendChild(this.createElement());
    
    // Auto-remove después del tiempo especificado
    this.timeoutId = setTimeout(() => {
      this.remove();
    }, this.duration);
  }

  /**
   * Remueve el toast de la pantalla
   */
  remove() {
    if (this.element) {
      this.element.classList.add('removing');
      setTimeout(() => {
        this.element?.remove();
      }, 300);
    }
    if (this.timeoutId) clearTimeout(this.timeoutId);
  }
}

class NotificationManager {
  constructor() {
    this.toasts = [];
    this.container = null;
  }

  /**
   * Obtiene o crea el contenedor de toasts
   */
  getContainer() {
    if (!this.container) {
      this.container = document.createElement('div');
      this.container.className = 'toast-container';
      this.container.id = 'toast-container';
      document.body.appendChild(this.container);
    }
    return this.container;
  }

  /**
   * Muestra una notificación
   * @param {string} title - Título del toast
   * @param {string} message - Mensaje del toast
   * @param {string} type - Tipo: success, error, info, warning
   * @param {number} duration - Duración en ms (0 = infinita)
   */
  show(title, message = '', type = 'info', duration = 4000) {
    const toast = new Toast(title, message, type, duration);
    toast.show();
    this.toasts.push(toast);
    return this.toasts.length - 1;
  }

  /**
   * Muestra un toast de éxito
   */
  success(title, message = '') {
    return this.show(title, message, 'success', 4000);
  }

  /**
   * Muestra un toast de error
   */
  error(title, message = '') {
    return this.show(title, message, 'error', 6000);
  }

  /**
   * Muestra un toast de información
   */
  info(title, message = '') {
    return this.show(title, message, 'info', 4000);
  }

  /**
   * Muestra un toast de advertencia
   */
  warning(title, message = '') {
    return this.show(title, message, 'warning', 5000);
  }

  /**
   * Remueve un toast por su ID
   */
  remove(toastId) {
    const index = this.toasts.findIndex(t => t.id == toastId);
    if (index !== -1) {
      this.toasts[index].remove();
      this.toasts.splice(index, 1);
    }
  }

  /**
   * Remueve todos los toasts
   */
  removeAll() {
    this.toasts.forEach(toast => toast.remove());
    this.toasts = [];
  }
}

// Instancia global del gestor de notificaciones
const notificationManager = new NotificationManager();

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  notificationManager.getContainer();
});
