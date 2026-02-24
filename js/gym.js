/**
 * ================================================================
 * GYM REGISTRATION, CARD GENERATION & LOOKUP
 * ================================================================
 * Manage gym sign-up flow, create a physical-card design and
 * store card records in localStorage under 'gym_cards'.
 */

const Gym = (function() {
  function generateCardCode() {
    const prefix = 'JAL';
    const part1 = Math.floor(1000 + Math.random() * 9000).toString();
    const part2 = Math.random().toString(36).slice(2, 6).toUpperCase();
    return `${prefix}-${part1}-${part2}`;
  }

  function monthsForPlan(plan) {
    if (plan === 'mensual') return 1;
    if (plan === 'trimestral') return 3;
    return 1;
  }

  function saveCard(card) {
    const raw = localStorage.getItem('gym_cards');
    let cards = [];
    try { cards = JSON.parse(raw) || []; } catch(e) { cards = []; }
    cards.push(card);
    localStorage.setItem('gym_cards', JSON.stringify(cards));
  }

  function createCardVisual(card) {
    // Diseño simple de tarjeta: verde/negro con código
    return `
      <div style="max-width:420px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #0f172a 0%, #064e3b 100%); color: #fff; border-radius:12px; padding:18px; box-shadow: 0 8px 24px rgba(2,6,23,0.6);">
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <div>
              <div style="font-weight:700; font-size:1.1rem;">JalFits Membership</div>
              <div style="font-size:0.85rem; opacity:0.9; margin-top:6px;">${card.plan.toUpperCase()} — Titular: ${card.name}</div>
            </div>
            <div style="text-align:right;">
              <div style="font-weight:800; font-size:1.25rem; letter-spacing:1px;">${card.code}</div>
              <div style="font-size:0.75rem; opacity:0.85; margin-top:6px;">Vence: ${new Date(card.expiryDate).toLocaleDateString()}</div>
            </div>
          </div>
          <div style="margin-top:12px; display:flex; gap:12px; align-items:center;">
            <div style="width:64px; height:64px; border-radius:8px; background:rgba(255,255,255,0.08); display:flex; align-items:center; justify-content:center; font-weight:700;">JF</div>
            <div style="font-size:0.85rem; opacity:0.95;">Presenta esta tarjeta en recepción para validar tu acceso.</div>
          </div>
        </div>
      </div>
    `;
  }

  function registerFromForm(formEl) {
    const form = formEl instanceof HTMLFormElement ? formEl : document.getElementById(formEl);
    if (!form) return;

    const name = (form.querySelector('[name="name"]')?.value || '').trim();
    const dni = (form.querySelector('[name="dni"]')?.value || '').trim();
    const plan = (form.querySelector('[name="plan"]')?.value || 'mensual');
    const payment = (form.querySelector('[name="payment"]')?.value || 'card');
    const price = parseFloat(form.querySelector('[name="price"]')?.value || '0');

    if (!name || !dni) {
      notificationManager.error('Faltan datos', 'Introduce tu nombre y DNI.');
      return;
    }

    // Simulate payment processing (client-side)
    notificationManager.info('Procesando pago', 'Simulando pago...');

    setTimeout(() => {
      const code = generateCardCode();
      const start = new Date();
      const months = monthsForPlan(plan);
      const expiry = new Date(start.getFullYear(), start.getMonth() + months, start.getDate());

      const card = {
        code,
        name,
        dni,
        plan,
        paymentMethod: payment,
        price: price,
        startDate: start.toISOString(),
        expiryDate: expiry.toISOString(),
        address: '',
        shipped: false
      };

      saveCard(card);

      // Show success and the visual card + prompt to add address for envío
      const container = document.getElementById('gym-register-result');
      if (container) {
        container.innerHTML = `
          <h3>Registro completado ✅</h3>
          <p>Tu tarjeta física será enviada a la dirección que indiques. Código generado: <strong>${code}</strong></p>
          ${createCardVisual(card)}
          <div style="margin-top:12px; display:flex; gap:8px;">
            <button class="btn" id="add-address-btn">Añadir dirección para envío</button>
            <a class="btn ghost" href="jalfits.html">Volver a JalFits</a>
          </div>
          <div id="address-form-container" style="margin-top:12px;"></div>
        `;

        document.getElementById('add-address-btn').onclick = () => renderAddressForm(code);
      }

      notificationManager.success('Registro OK', `Tu tarjeta ${code} fue creada`);
    }, 900);
  }

  function renderAddressForm(code) {
    const container = document.getElementById('address-form-container');
    if (!container) return;
    container.innerHTML = `
      <h4>Añadir dirección de envío</h4>
      <div class="form-group">
        <label>Dirección completa</label>
        <input type="text" id="ship-address" placeholder="Calle, número, CP, ciudad" style="width:100%;">
      </div>
      <div style="display:flex; gap:8px; margin-top:8px;">
        <button class="btn" id="save-address-btn">Guardar y solicitar envío</button>
        <button class="btn ghost" id="cancel-address-btn">Cancelar</button>
      </div>
    `;

    document.getElementById('save-address-btn').onclick = () => saveAddressForCard(code);
    document.getElementById('cancel-address-btn').onclick = () => { container.innerHTML = ''; };
  }

  function saveAddressForCard(code) {
    const addr = document.getElementById('ship-address')?.value.trim();
    if (!addr) { notificationManager.error('Dirección vacía', 'Introduce una dirección válida.'); return; }

    const raw = localStorage.getItem('gym_cards');
    let cards = [];
    try { cards = JSON.parse(raw) || []; } catch(e) { cards = []; }

    const idx = cards.findIndex(c => c.code === code);
    if (idx === -1) { notificationManager.error('Error', 'No se encontró la tarjeta.'); return; }

    cards[idx].address = addr;
    cards[idx].shipped = true;
    localStorage.setItem('gym_cards', JSON.stringify(cards));

    const container = document.getElementById('address-form-container');
    if (container) container.innerHTML = `<p>Dirección guardada. Envío programado a: <strong>${addr}</strong></p>`;
    notificationManager.success('Dirección guardada', 'Enviaremos tu tarjeta lo antes posible.');
  }

  return {
    registerFromForm,
    generateCardCode
  };
})();

// Export to global for inline usage
window.Gym = Gym;
