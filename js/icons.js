/**
 * ================================================================
 * ICON SYSTEM - SVG Icons
 * ================================================================
 * Sistema de iconos SVG reutilizables para toda la aplicación
 */

const Icons = {
  // Hamburguesas y Comida
  burger: () => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="icon"><circle cx="12" cy="11" r="9"/><path d="M5 11h14M6 8l2-2h4l2 2M6 14l2 2h4l2-2"/></svg>`,
  
  // Bebidas
  drink: () => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 4h12l-1 14H7L6 4Z"/><path d="M9 9h6"/><path d="M8 13h8"/></svg>`,
  
  // Postres
  cake: () => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><rect x="3" y="8" width="18" height="12" rx="2"/><path d="M6 8V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v3"/><circle cx="8" cy="5" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="16" cy="5" r="1"/></svg>`,
  
  // Puntos/Recompensas
  points: () => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>`,
  
  // Descuentos
  discount: () => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="7" cy="7" r="2"/><circle cx="17" cy="17" r="2"/><path d="M7 9v8l10-10"/></svg>`,
  
  // Dinero/Precio
  money: () => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><ellipse cx="12" cy="12" rx="9" ry="7"/><path d="M12 9v6M10 12h4"/></svg>`,
  
  // Carrito de compras
  cart: () => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M9 2C8.45 2 8 2.45 8 3v1H4c-1.11 0-2 .89-2 2v2h20V6c0-1.11-.89-2-2-2h-4V3c0-.55-.45-1-1-1s-1 .45-1 1v1h-2V3c0-.55-.45-1-1-1zm-1 8c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm8 0c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2z"/></svg>`,
  
  // Gimnasio/Músculos
  dumbbell: () => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><rect x="2" y="10" width="4" height="4"/><rect x="18" y="10" width="4" height="4"/><rect x="8" y="9" width="8" height="6" rx="1"/></svg>`,
  
  // Calendario/Plan
  calendar: () => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><rect x="2" y="4" width="20" height="18" rx="2"/><path d="M7 2v4M17 2v4M2 10h20"/></svg>`,
  
  // Usuario/Perfil
  user: () => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.5-7 8-7s8 3 8 7"/></svg>`,
  
  // Corazón/Favorito
  heart: () => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>`,
  
  // Estrella
  star: () => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>`,
  
  // Fuego/Hot
  fire: () => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M13 2L3 14h8l-2 8 10-10h-8l2-10z"/></svg>`,
  
  // Reloj
  clock: () => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>`,
  
  // Ubicación
  location: () => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C7.58 2 4 5.58 4 10c0 5.25 8 13 8 13s8-7.75 8-13c0-4.42-3.58-8-8-8zm0 11c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z"/></svg>`,
  
  // Teléfono
  phone: () => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z"/></svg>`,
  
  // Correo
  email: () => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>`,
  
  // Verificado
  check: () => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/></svg>`,
  
  // Carrito/Compra
  shopping: () => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/></svg>`,

  // Logo/Marca
  logo: () => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10"/><path d="M8 12a4 4 0 1 0 8 0 4 4 0 0 0-8 0z" fill="white"/></svg>`,

  // Flechas
  arrowRight: () => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M5 12h14M13 7l5 5-5 5"/></svg>`,
  
  arrowLeft: () => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M19 12H5M11 7L6 12l5 5"/></svg>`,
  
  // Menú
  menu: () => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/></svg>`,
  
  // Cerrar
  close: () => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/></svg>`,

  // Video
  play: () => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>`,
  
  // Imágenes
  image: () => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/></svg>`,

  // Plus/Agregar
  plus: () => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>`,

  // Menos
  minus: () => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M19 13H5v-2h14v2z"/></svg>`,

  // Más opciones
  moreOptions: () => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><circle cx="6" cy="12" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="18" cy="12" r="2"/></svg>`,
};

// Función auxiliar para usar iconos en HTML
function icon(name, className = 'icon-default') {
  if (Icons[name]) {
    const svg = Icons[name]();
    return `<span class="icon-wrapper ${className}">${svg}</span>`;
  }
  return '';
}

// CSS para los iconos
const iconStyles = `
<style>
.icon-wrapper {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.2em;
  height: 1.2em;
  vertical-align: -0.2em;
  color: currentColor;
}

.icon-wrapper svg {
  width: 100%;
  height: 100%;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.icon-lg {
  width: 2em;
  height: 2em;
}

.icon-xl {
  width: 3em;
  height: 3em;
}

.icon-sm {
  width: 0.8em;
  height: 0.8em;
}
</style>
`;

// Inyectar estilos de iconos cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  if (!document.getElementById('icon-styles')) {
    const style = document.createElement('div');
    style.id = 'icon-styles';
    style.innerHTML = iconStyles;
    document.head.appendChild(style);
  }
});
