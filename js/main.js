/**
 * ================================================================
 * PRODUCT & REWARD HANDLERS
 * ================================================================
 * Maneja las acciones de compra y canje de recompensas
 */

/**
 * Abre el modal de compra
 */
function openCheckout() {
  if (checkoutModal) {
    checkoutModal.open();
  } else {
    notificationManager.error('Error', 'Sistema de compra no disponible');
  }
}

/**
 * Procesa la compra de un producto (abre el modal)
 * @param {number} price - Precio del producto en euros
 * @param {number} earnedPoints - Puntos que se ganan con la compra
 */
function buyProduct(price, earnedPoints) {
  openCheckout();
}

/**
 * Canjea puntos por un descuento en burger
 * @param {number} cost - Puntos requeridos
 */
function redeem(cost) {
  if (!pointsManager) {
    notificationManager.error('Error', 'Sistema de puntos no disponible');
    return;
  }

  if (pointsManager.points < cost) {
    notificationManager.error('Puntos insuficientes', `Necesitas ${cost} puntos, tienes ${pointsManager.points}`);
    return;
  }

  if (!confirm(`¿Canjear ${cost} puntos por 20% descuento en burger?`)) {
    return;
  }

  if (pointsManager.redeemPoints(cost)) {
    notificationManager.success('¡Descuento activo!', '20% en tu próxima burger');
  }
}

/**
 * Canjea puntos por descuento en JalFits y redirige
 * @param {number} cost - Puntos requeridos
 */
function redeemGym(cost) {
  if (!pointsManager) {
    notificationManager.error('Error', 'Sistema de puntos no disponible');
    return;
  }

  if (pointsManager.points < cost) {
    notificationManager.error('Puntos insuficientes', `Necesitas ${cost} puntos, tienes ${pointsManager.points}`);
    return;
  }

  if (!confirm(`¿Canjear ${cost} puntos por 30% descuento en JalFits?`)) {
    return;
  }

  if (pointsManager.redeemPoints(cost)) {
    notificationManager.success('¡Descuento aplicado!', 'Redirigiendo a JalFits...');
    localStorage.setItem('gymDiscount', 'true');
    
    // Esperar 1.5s antes de redirigir para que se vea el mensaje
    setTimeout(() => {
      window.location.href = 'jalfits.html';
    }, 1500);
  }
}

/**
 * Enrolls the user in a gym plan and redirects to the registration page
 * @param {string} plan - The plan to enroll in
 */
function enrollPlan(plan) {
  // Show a toast then redirect to the gym registration page
  const price = (typeof GYM_PLANS !== 'undefined') ? (GYM_PLANS[plan]?.price || 0) : 0;
  const message = `Has seleccionado el plan ${plan}. Abriendo formulario de registro...`;
  if (typeof notificationManager !== 'undefined') notificationManager.success('Registro JalFits', message);

  const params = new URLSearchParams({ plan, price: price.toString() });
  setTimeout(() => { window.location.href = `jalfits-register.html?${params.toString()}`; }, 900);
}
