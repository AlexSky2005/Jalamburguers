/**
 * ================================================================
 * AUTHENTICATION SYSTEM
 * ================================================================
 * Sistema de registro e inicio de sesión personal
 */

class AuthManager {
  constructor() {
    this.USERS_KEY = 'jal_users';
    this.CURRENT_USER_KEY = 'jal_current_user';
    this.users = this.loadUsers();
    this.currentUser = this.loadCurrentUser();
  }

  /**
   * Carga usuarios de localStorage
   */
  loadUsers() {
    const stored = localStorage.getItem(this.USERS_KEY);
    return stored ? JSON.parse(stored) : {};
  }

  /**
   * Carga usuario actual de localStorage
   */
  loadCurrentUser() {
    const stored = localStorage.getItem(this.CURRENT_USER_KEY);
    return stored ? JSON.parse(stored) : null;
  }

  /**
   * Guarda usuarios en localStorage
   */
  saveUsers() {
    localStorage.setItem(this.USERS_KEY, JSON.stringify(this.users));
  }

  /**
   * Guarda usuario actual en localStorage
   */
  saveCurrentUser() {
    localStorage.setItem(this.CURRENT_USER_KEY, JSON.stringify(this.currentUser));
  }

  /**
   * Hash simple de contraseña (en producción usar bcrypt en servidor)
   */
  hashPassword(password) {
    let hash = 0;
    for (let i = 0; i < password.length; i++) {
      const char = password.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return Math.abs(hash).toString(16);
  }

  /**
   * Valida email
   */
  isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  /**
   * Valida contraseña (mín 6 caracteres)
   */
  isValidPassword(password) {
    return password.length >= 6;
  }

  /**
   * Registra un nuevo usuario
   */
  register(name, email, password) {
    // Validaciones
    if (!name || !email || !password) {
      return { success: false, message: 'Por favor complete todos los campos' };
    }

    if (!this.isValidEmail(email)) {
      return { success: false, message: 'Email inválido' };
    }

    if (!this.isValidPassword(password)) {
      return { success: false, message: 'La contraseña debe tener al menos 6 caracteres' };
    }

    if (this.users[email]) {
      return { success: false, message: 'Este email ya está registrado' };
    }

    // Registrar usuario
    this.users[email] = {
      name: name,
      email: email,
      password: this.hashPassword(password),
      createdAt: new Date().toISOString(),
      points: 0,
      purchases: 0,
      revenue: 0
    };

    this.saveUsers();
    return { success: true, message: 'Registro exitoso. Por favor inicia sesión.' };
  }

  /**
   * Inicia sesión de usuario
   */
  login(email, password) {
    if (!email || !password) {
      return { success: false, message: 'Email y contraseña requeridos' };
    }

    const user = this.users[email];
    if (!user) {
      return { success: false, message: 'Email o contraseña incorrectos' };
    }

    if (user.password !== this.hashPassword(password)) {
      return { success: false, message: 'Email o contraseña incorrectos' };
    }

    // Crear sesión
    this.currentUser = {
      email: user.email,
      name: user.name,
      points: user.points,
      purchases: user.purchases,
      revenue: user.revenue
    };

    this.saveCurrentUser();
    return { success: true, message: `¡Bienvenido de vuelta, ${user.name}!` };
  }

  /**
   * Cierra sesión del usuario
   */
  logout() {
    this.currentUser = null;
    localStorage.removeItem(this.CURRENT_USER_KEY);
    return { success: true, message: 'Sesión cerrada' };
  }

  /**
   * Chequea si hay usuario activo
   */
  isLoggedIn() {
    return this.currentUser !== null;
  }

  /**
   * Obtiene usuario actual
   */
  getCurrentUser() {
    return this.currentUser;
  }

  /**
   * Actualiza datos del usuario
   */
  updateUser(updates) {
    if (!this.currentUser) return;

    const email = this.currentUser.email;
    Object.assign(this.users[email], updates);
    Object.assign(this.currentUser, updates);
    
    this.saveUsers();
    this.saveCurrentUser();
  }
}

// Instancia global
const authManager = new AuthManager();

/**
 * Muestra el modal de login/registro
 */
function openAuthModal() {
  if (authManager.isLoggedIn()) {
    showProfileMenu();
    return;
  }

  const modal = document.createElement('div');
  modal.className = 'modal-overlay active';
  modal.id = 'auth-modal-overlay';

  const content = document.createElement('div');
  content.className = 'modal auth-modal';
  content.id = 'auth-modal';

  content.innerHTML = `
    <div class="modal-header">
      <h2>Inicia Sesión o Regístrate</h2>
      <button class="modal-close" onclick="closeAuthModal()">✕</button>
    </div>
    <div class="modal-body auth-body">
      <!-- Tab de Login -->
      <div id="login-tab" class="auth-tab active">
        <h3>Iniciar Sesión</h3>
        <form onsubmit="handleLogin(event)">
          <div class="form-group">
            <label>Email</label>
            <input type="email" id="login-email" required>
          </div>
          <div class="form-group">
            <label>Contraseña</label>
            <input type="password" id="login-password" required>
          </div>
          <button type="submit" class="btn" style="width: 100%; margin-top: 12px;">Inicia Sesión</button>
        </form>
        <p style="text-align: center; margin-top: 16px; color: var(--color-text-light);">
          ¿No tienes cuenta? <a href="#" onclick="switchTab('register'); return false;" style="color: var(--color-accent); font-weight: 600;">Regístrate aquí</a>
        </p>
      </div>

      <!-- Tab de Registro -->
      <div id="register-tab" class="auth-tab">
        <h3>Crear Cuenta</h3>
        <form onsubmit="handleRegister(event)">
          <div class="form-group">
            <label>Nombre Completo</label>
            <input type="text" id="register-name" required>
          </div>
          <div class="form-group">
            <label>Email</label>
            <input type="email" id="register-email" required>
          </div>
          <div class="form-group">
            <label>Contraseña</label>
            <input type="password" id="register-password" required>
          </div>
          <div class="form-group">
            <label>
              <input type="checkbox" required>
              Acepto los <a href="#" style="color: var(--color-accent);">términos de servicio</a>
            </label>
          </div>
          <button type="submit" class="btn" style="width: 100%; margin-top: 12px;">Registrarse</button>
        </form>
        <p style="text-align: center; margin-top: 16px; color: var(--color-text-light);">
          ¿Ya tienes cuenta? <a href="#" onclick="switchTab('login'); return false;" style="color: var(--color-accent); font-weight: 600;">Inicia sesión</a>
        </p>
      </div>
    </div>
  `;

  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay active';
  overlay.id = 'auth-overlay';
  overlay.onclick = (e) => {
    if (e.target === overlay) closeAuthModal();
  };

  overlay.appendChild(content);
  document.body.appendChild(overlay);
}

/**
 * Cierra el modal de auth
 */
function closeAuthModal() {
  const overlay = document.getElementById('auth-overlay');
  if (overlay) {
    overlay.classList.remove('active');
    setTimeout(() => overlay.remove(), 300);
  }
}

/**
 * Cambia entre tabs (login/register)
 */
function switchTab(tab) {
  const loginTab = document.getElementById('login-tab');
  const registerTab = document.getElementById('register-tab');

  if (tab === 'login') {
    loginTab.classList.add('active');
    registerTab.classList.remove('active');
  } else {
    registerTab.classList.add('active');
    loginTab.classList.remove('active');
  }
}

/**
 * Maneja el login
 */
function handleLogin(event) {
  event.preventDefault();

  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;

  const result = authManager.login(email, password);

  if (result.success) {
    notificationManager.success('¡Éxito!', result.message);
    closeAuthModal();
    updateAuthUI();
  } else {
    notificationManager.error('Error', result.message);
  }
}

/**
 * Maneja el registro
 */
function handleRegister(event) {
  event.preventDefault();

  const name = document.getElementById('register-name').value;
  const email = document.getElementById('register-email').value;
  const password = document.getElementById('register-password').value;

  const result = authManager.register(name, email, password);

  if (result.success) {
    notificationManager.success('¡Registro completado!', result.message);
    switchTab('login');
  } else {
    notificationManager.error('Error en registro', result.message);
  }
}

/**
 * Actualiza la UI según estado de login
 */
function updateAuthUI() {
  const authBtn = document.getElementById('auth-btn');
  if (!authBtn) return;

  if (authManager.isLoggedIn()) {
    const user = authManager.getCurrentUser();
    authBtn.innerHTML = `👤 ${user.name}`;
    authBtn.onclick = showProfileMenu;
  } else {
    authBtn.innerHTML = '🔐 Iniciar Sesión';
    authBtn.onclick = openAuthModal;
  }
}

/**
 * Muestra el menú de perfil
 */
function showProfileMenu() {
  const user = authManager.getCurrentUser();
  if (!user) return;

  const confirmed = confirm(
    `👤 ${user.name}\n📧 ${user.email}\n⭐ ${user.points} puntos\n💰 ${user.purchases} compras\n\n¿Cerrar sesión?`
  );

  if (confirmed) {
    authManager.logout();
    notificationManager.success('Adiós', 'Sesión cerrada');
    updateAuthUI();
  }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  updateAuthUI();
});
