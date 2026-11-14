// mapa.js - Lógica interactiva para el Mapa en Vivo y Radar de Patitas a Casa

document.addEventListener('DOMContentLoaded', () => {
  initRadiusButtons();
  initMapPins();
});

function initRadiusButtons() {
  window.setRadius = function (radiusText, buttonEl) {
    const buttons = document.querySelectorAll('.radius-btn');
    buttons.forEach(btn => {
      btn.classList.remove('bg-primary', 'text-on-primary', 'font-black', 'shadow-md');
      btn.classList.add('text-on-surface-variant', 'font-semibold');
    });

    buttonEl.classList.remove('text-on-surface-variant', 'font-semibold');
    buttonEl.classList.add('bg-primary', 'text-on-primary', 'font-black', 'shadow-md');

    const label = document.getElementById('current-radius-label');
    if (label) {
      label.textContent = radiusText + ' de alcance';
    }

    showToast(`🎯 Radio de búsqueda ajustado a ${radiusText}.`);
  };
}

function initMapPins() {
  document.querySelectorAll('.map-pin-btn').forEach(pin => {
    pin.addEventListener('click', () => {
      const location = pin.getAttribute('data-loc') || 'Ubicación seleccionada';
      const detailModal = document.getElementById('floating-sighting-modal');
      const locationTitle = document.getElementById('modal-location-title');

      if (detailModal && locationTitle) {
        locationTitle.textContent = location;
        detailModal.classList.remove('hidden');
        detailModal.style.opacity = '0';
        setTimeout(() => {
          detailModal.style.transition = 'opacity 0.2s ease';
          detailModal.style.opacity = '1';
        }, 10);
      }
    });
  });
}

function showToast(message) {
  let toast = document.getElementById('patitas-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'patitas-toast';
    toast.className = 'fixed bottom-6 right-6 z-50 bg-inverse-surface text-inverse-on-surface px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 transition-all duration-300 transform translate-y-10 opacity-0 font-label-md';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `<span class="material-symbols-outlined text-primary-fixed text-[22px]">radar</span><span>${message}</span>`;
  toast.classList.remove('translate-y-10', 'opacity-0');

  setTimeout(() => {
    toast.classList.add('translate-y-10', 'opacity-0');
  }, 3500);
}
