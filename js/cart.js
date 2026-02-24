/**
 * ================================================================
 * SHOPPING CART & CHECKOUT SYSTEM
 * ================================================================
 * Gestiona el carrito de compras y el proceso de checkout
 */

const MENU = [
  { id: 1, name: 'JalBurger Proteica', desc: 'Carne magra de res + pan integral + tomate fresco + lechuga', price: 8 },
  { id: 2, name: 'JalVegan Power', desc: 'Tofu marinado + espinaca + aguacate + salsa de tahini', price: 7 },
  { id: 3, name: 'Chicken Boost', desc: 'Pollo grill + aguacate + queso mozzarella + pan tostado', price: 9 }
];

const PAYMENT_METHODS = [
  { id: 'card', name: 'Tarjeta de crédito/débito' },
  { id: 'cash', name: 'Efectivo' },
  { id: 'wallet', name: 'Billetera digital' }
];

class ShoppingCart {
  constructor() {
    this.items = [];
    this.deliveryMethod = 'pickup'; // 'pickup' o 'delivery'
    this.location = '';
    this.address = '';
    this.customerName = '';
    this.paymentMethod = 'card';
  }

  /**
   * Añade un producto al carrito
   */
  addItem(menuId, quantity = 1) {
    const product = MENU.find(m => m.id === menuId);
    if (!product) return false;

    const existingItem = this.items.find(item => item.id === menuId);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.items.push({
        id: menuId,
        name: product.name,
        price: product.price,
        quantity: quantity
      });
    }
    return true;
  }

  /**
   * Remueve un producto del carrito
   */
  removeItem(menuId) {
    this.items = this.items.filter(item => item.id !== menuId);
  }

  /**
   * Calcula el total del pedido
   */
  getTotal() {
    return this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }

  /**
   * Obtiene el número de items en el carrito
   */
  getItemCount() {
    return this.items.reduce((sum, item) => sum + item.quantity, 0);
  }

  /**
   * Genera un número de pedido aleatorio
   */
  generateOrderNumber() {
    const prefix = 'JAL';
    const timestamp = Date.now().toString().slice(-5);
    const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    return `${prefix}-${timestamp}${random}`;
  }

  /**
   * Valida que los datos del pedido sean completos
   */
  isValid() {
    if (this.items.length === 0) return false;
    if (!this.customerName || this.customerName.trim() === '') return false;
    if (this.deliveryMethod === 'delivery' && (!this.address || this.address.trim() === '')) return false;
    if (this.deliveryMethod === 'pickup' && (!this.location || this.location.trim() === '')) return false;
    return true;
  }

  /**
   * Resetea el carrito después de un pedido exitoso
   */
  reset() {
    this.items = [];
    this.deliveryMethod = 'pickup';
    this.location = '';
    this.address = '';
    this.customerName = '';
    this.paymentMethod = 'card';
  }
}

class CheckoutModal {
  constructor() {
    this.cart = new ShoppingCart();
    this.modalElement = null;
    this.currentStep = 'menu'; // 'menu', 'checkout', 'success'
  }

  /**
   * Abre el modal de compra
   */
  open() {
    const existing = document.getElementById('checkout-modal');
    if (existing) existing.remove();

    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay active';
    overlay.id = 'checkout-overlay';
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) this.close();
    });

    const modal = this.createModalElement();
    overlay.appendChild(modal);
    this.modalElement = modal;

    document.body.appendChild(overlay);
    this.renderMenuStep();
  }

  /**
   * Crea el elemento principal del modal
   */
  createModalElement() {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.id = 'checkout-modal';

    modal.innerHTML = `
      <div class="modal-header">
        <h2>🛒 Tu Compra</h2>
        <button class="modal-close" onclick="checkoutModal.close()">✕</button>
      </div>
      <div class="modal-body" id="modal-content">
        <!-- Contenido dinámico aquí -->
      </div>
    `;

    return modal;
  }

  /**
   * Renderiza el paso de selección de menú
   */
  renderMenuStep() {
    const content = document.getElementById('modal-content');
    if (!content) return;

    let html = `
      <div class="modal-section">
        <h3>📋 Elige tu comida</h3>
        <div class="menu-item" style="flex-direction: column; align-items: flex-start;">
    `;

    MENU.forEach(product => {
      const isAdded = this.cart.items.some(item => item.id === product.id);
      html += `
        <div class="menu-item ${isAdded ? 'added' : ''}">
          <div class="menu-item-info">
            <h4>${product.name}</h4>
            <p>${product.desc}</p>
          </div>
          <div style="display: flex; align-items: center; gap: 12px;">
            <span class="menu-item-price">${product.price}€</span>
            <button class="btn" style="padding: 8px 12px; font-size: 0.875rem;" onclick="checkoutModal.addItemToCart(${product.id})">
              ${isAdded ? '✓ Añadido' : 'Añadir'}
            </button>
          </div>
        </div>
      `;
    });

    html += `
        </div>
      </div>
    `;

    // Resumen del pedido a la derecha
    html += this.renderOrderSummary();

    content.innerHTML = html;
  }

  /**
   * Renderiza el resumen del pedido
   */
  renderOrderSummary() {
    const total = this.cart.getTotal();
    const itemCount = this.cart.getItemCount();

    let html = `
      <div class="modal-section">
        <div class="order-summary">
          <h3>📦 Resumen</h3>
    `;

    if (this.cart.items.length === 0) {
      html += `<p style="color: var(--color-text-light); text-align: center;">Añade productos a tu carrito</p>`;
    } else {
      this.cart.items.forEach(item => {
        html += `
          <div class="order-item">
            <div class="order-item-name">
              ${item.name} x${item.quantity}
            </div>
            <div style="display: flex; gap: 12px; align-items: center;">
              <span class="order-item-price">${(item.price * item.quantity).toFixed(2)}€</span>
              <button class="btn" style="padding: 4px 8px; font-size: 0.75rem; background-color: #ef4444;" onclick="checkoutModal.removeItemFromCart(${item.id})">
                ✕
              </button>
            </div>
          </div>
        `;
      });

      html += `
        <div class="order-total">
          <span>Total:</span>
          <span>${total.toFixed(2)}€</span>
        </div>
      `;
    }

    html += `
        </div>
        <button class="btn" style="width: 100%; margin-top: 12px;" ${this.cart.items.length === 0 ? 'disabled' : ''} onclick="checkoutModal.goToCheckout()">
          Continuar → Datos
        </button>
      </div>
    `;

    return html;
  }

  /**
   * Renderiza el paso de checkout (datos del cliente)
   */
  renderCheckoutStep() {
    const total = this.cart.getTotal();

    let html = `
      <div class="modal-section">
        <h3>📍 Tipo de entrega</h3>
        <div class="radio-group">
          <label class="radio-option">
            <input type="radio" name="delivery" value="pickup" ${this.cart.deliveryMethod === 'pickup' ? 'checked' : ''} onchange="checkoutModal.setDeliveryMethod('pickup')">
            <span>Recoger en local</span>
          </label>
          <label class="radio-option">
            <input type="radio" name="delivery" value="delivery" ${this.cart.deliveryMethod === 'delivery' ? 'checked' : ''} onchange="checkoutModal.setDeliveryMethod('delivery')">
            <span>A domicilio</span>
          </label>
        </div>

        ${this.cart.deliveryMethod === 'pickup' ? `
          <div class="form-group">
            <label>Local para recoger</label>
            <input type="text" placeholder="Ej: Local Centro" value="${this.cart.location}" onchange="checkoutModal.setLocation(this.value)">
          </div>
        ` : `
          <div class="form-group">
            <label>Dirección de entrega</label>
            <textarea placeholder="Calle, número, piso, puerta..." onchange="checkoutModal.setAddress(this.value)">${this.cart.address}</textarea>
          </div>
        `}
      </div>

      <div class="modal-section">
        <h3>👤 Datos del cliente</h3>
        <div class="form-group">
          <label>Nombre completo</label>
          <input type="text" placeholder="Tu nombre" value="${this.cart.customerName}" onchange="checkoutModal.setCustomerName(this.value)">
        </div>

        <h3 style="margin-top: 16px;">💳 Método de pago</h3>
        <div class="radio-group">
          ${PAYMENT_METHODS.map(method => `
            <label class="radio-option">
              <input type="radio" name="payment" value="${method.id}" ${this.cart.paymentMethod === method.id ? 'checked' : ''} onchange="checkoutModal.setPaymentMethod('${method.id}')">
              <span>${method.name}</span>
            </label>
          `).join('')}
        </div>
      </div>

      <div class="modal-section">
        <div class="order-summary">
          <h3>📦 Resumen de pedido</h3>
          ${this.cart.items.map(item => `
            <div class="order-item">
              <span class="order-item-name">${item.name} x${item.quantity}</span>
              <span class="order-item-price">${(item.price * item.quantity).toFixed(2)}€</span>
            </div>
          `).join('')}
          <div class="order-total">
            <span>Total:</span>
            <span>${total.toFixed(2)}€</span>
          </div>
        </div>
      </div>

      <div style="display: flex; gap: 12px; margin-top: 16px;">
        <button class="btn ghost" style="flex: 1;" onclick="checkoutModal.goToMenu()">← Volver</button>
        <button class="btn" style="flex: 1;" onclick="checkoutModal.submitOrder()">Completar pedido ✓</button>
      </div>
    `;

    const content = document.getElementById('modal-content');
    if (content) content.innerHTML = html;
  }

  /**
   * Renderiza el paso de éxito
   */
  renderSuccessStep(orderNumber) {
    const total = this.cart.getTotal();
    const deliveryText = this.cart.deliveryMethod === 'pickup'
      ? `en el local: <strong>${this.cart.location}</strong>`
      : `a la dirección: <strong>${this.cart.address}</strong>`;

    let html = `
      <div class="success-modal">
        <div class="checkmark">✓</div>
        <h2>¡Pedido confirmado!</h2>
        <p>Tu pedido ha sido procesado exitosamente.</p>
        
        <div class="order-number">#${orderNumber}</div>

        <div style="text-align: left; background-color: var(--color-card); padding: 16px; border-radius: 12px; margin: 16px 0;">
          <p><strong>Cliente:</strong> ${this.cart.customerName}</p>
          <p><strong>Entrega:</strong> ${deliveryText}</p>
          <p><strong>Total:</strong> ${total.toFixed(2)}€</p>
          <p><strong>Método de pago:</strong> ${this.getPaymentMethodName()}</p>
          <p style="margin-top: 12px; color: var(--color-text-light); font-size: 0.875rem;">
            ⏱️ Tiempo estimado: 20-30 minutos
          </p>
        </div>

        <button class="btn" style="width: 100%;" onclick="checkoutModal.close()">Cerrar</button>
      </div>
    `;

    const content = document.getElementById('modal-content');
    const modalBody = document.getElementById('checkout-modal')?.parentElement?.querySelector('.modal-body');
    
    if (content) content.innerHTML = html;
    if (modalBody) modalBody.classList.add('success');
  }

  /**
   * Obtiene el nombre del método de pago
   */
  getPaymentMethodName() {
    const method = PAYMENT_METHODS.find(m => m.id === this.cart.paymentMethod);
    return method ? method.name : 'Desconocido';
  }

  /**
   * Cierra el modal
   */
  close() {
    const overlay = document.getElementById('checkout-overlay');
    if (overlay) {
      overlay.classList.remove('active');
      setTimeout(() => overlay.remove(), 300);
    }
    this.cart.reset();
    this.currentStep = 'menu';
  }

  /**
   * Añade un producto al carrito y actualiza la vista
   */
  addItemToCart(menuId) {
    this.cart.addItem(menuId, 1);
    this.renderMenuStep();
    notificationManager.success('Producto añadido', `Producto añadido al carrito (${this.cart.getItemCount()} items)`);
  }

  /**
   * Remueve un producto del carrito y actualiza la vista
   */
  removeItemFromCart(menuId) {
    this.cart.removeItem(menuId);
    if (this.currentStep === 'menu') {
      this.renderMenuStep();
    } else {
      this.renderCheckoutStep();
    }
  }

  /**
   * Va al paso de checkout
   */
  goToCheckout() {
    if (this.cart.items.length === 0) {
      notificationManager.error('Carrito vacío', 'Añade al menos un producto');
      return;
    }
    this.currentStep = 'checkout';
    this.renderCheckoutStep();
  }

  /**
   * Vuelve al paso de selección de menú
   */
  goToMenu() {
    this.currentStep = 'menu';
    const modalBody = document.getElementById('checkout-modal')?.parentElement?.querySelector('.modal-body');
    if (modalBody) modalBody.classList.remove('success');
    this.renderMenuStep();
  }

  /**
   * Envía el pedido
   */
  submitOrder() {
    if (!this.cart.isValid()) {
      notificationManager.error('Datos incompletos', 'Por favor completa todos los campos requeridos');
      return;
    }

    const orderNumber = this.cart.generateOrderNumber();
    this.currentStep = 'success';
    this.renderSuccessStep(orderNumber);

    // Guardar el pedido (en un caso real aquí irías a una API)
    console.log('Pedido completado:', {
      orderNumber,
      items: this.cart.items,
      total: this.cart.getTotal(),
      customerName: this.cart.customerName,
      delivery: this.cart.deliveryMethod,
      location: this.cart.location || this.cart.address,
      paymentMethod: this.cart.paymentMethod
    });

    // Añadir puntos a la cuenta (10 puntos por cada unidad comprada)
    const earnedPoints = this.cart.items.reduce((sum, it) => sum + (it.quantity * 10), 0);

    // `pointsManager` se define con `const` en js/points.js (no como propiedad de window),
    // por eso comprobamos ambas variantes y usamos la que exista.
    const pm = (typeof pointsManager !== 'undefined') ? pointsManager : (window.pointsManager || null);
    if (pm) {
      try {
        pm.addPurchase(this.cart.getTotal(), earnedPoints);
        notificationManager.success('¡Gracias!', `Has ganado ${earnedPoints} puntos`);
      } catch (err) {
        console.error('Error actualizando puntos:', err);
      }
    }
  }

  /**
   * Setea el método de entrega
   */
  setDeliveryMethod(method) {
    this.cart.deliveryMethod = method;
    this.renderCheckoutStep();
  }

  /**
   * Setea el local para recoger
   */
  setLocation(location) {
    this.cart.location = location;
  }

  /**
   * Setea la dirección de entrega
   */
  setAddress(address) {
    this.cart.address = address;
  }

  /**
   * Setea el nombre del cliente
   */
  setCustomerName(name) {
    this.cart.customerName = name;
  }

  /**
   * Setea el método de pago
   */
  setPaymentMethod(method) {
    this.cart.paymentMethod = method;
  }
}

// Instancia global del modal de checkout
const checkoutModal = new CheckoutModal();

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  // Disponible globalmente para onclick handlers
  window.checkoutModal = checkoutModal;
});
