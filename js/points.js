/**
 * ================================================================
 * POINTS & LOYALTY SYSTEM
 * ================================================================
 * Maneja la lógica de puntos, compras y gastos del usuario
 * Persiste datos en localStorage
 */

class PointsManager {
  constructor() {
    this.points = parseInt(localStorage.getItem('points')) || 0;
    this.purchases = parseInt(localStorage.getItem('purchases')) || 0;
    this.revenue = parseFloat(localStorage.getItem('revenue')) || 0.0;
  }

  /**
   * Formatea un valor numérico a formato de moneda EUR
   * @param {number} value - Valor a formatear
   * @returns {string} Valor formateado en EUR
   */
  formatCurrency(value) {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  }

  /**
   * Guarda los datos actuales en localStorage
   */
  saveData() {
    localStorage.setItem('points', this.points.toString());
    localStorage.setItem('purchases', this.purchases.toString());
    localStorage.setItem('revenue', this.revenue.toFixed(2));
  }

  /**
   * Actualiza la UI con los valores actuales
   */
  updateUI() {
    const ptsEl = document.getElementById('points');
    const purEl = document.getElementById('purchases');
    const revEl = document.getElementById('revenue');

    if (ptsEl) ptsEl.innerText = this.points.toString();
    if (purEl) purEl.innerText = this.purchases.toString();
    if (revEl) revEl.innerText = this.formatCurrency(this.revenue);
  }

  /**
   * Añade una compra y actualiza puntos y gasto
   * @param {number} price - Precio del producto
   * @param {number} pointsEarned - Puntos a ganar
   */
  addPurchase(price, pointsEarned) {
    this.points += pointsEarned;
    this.purchases += 1;
    this.revenue += parseFloat(price);
    this.saveData();
    this.updateUI();
  }

  /**
   * Deduce puntos al canjear una recompensa
   * @param {number} cost - Puntos a deducir
   * @returns {boolean} True si la operación fue exitosa
   */
  redeemPoints(cost) {
    if (this.points >= cost) {
      this.points -= cost;
      this.saveData();
      this.updateUI();
      return true;
    }
    return false;
  }
}

// Instancia global del gestor de puntos
const pointsManager = new PointsManager();

// Inicializar UI cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  pointsManager.updateUI();
});