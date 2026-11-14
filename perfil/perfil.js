// perfil.js - Lógica interactiva para Mi Perfil y Logros Comunitarios

document.addEventListener('DOMContentLoaded', () => {
  initMedalFilters();
  initPatrolControls();
  initActionButtons();
});

// 1. Filtrado de Medallas Comunitarias
function initMedalFilters() {
  const filterButtons = document.querySelectorAll('.medal-filter-btn');
  const medalCards = document.querySelectorAll('.medal-card');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', function () {
      const filterType = this.getAttribute('data-filter');

      // Actualizar estilos activos de los botones
      filterButtons.forEach(b => {
        b.classList.remove('bg-primary', 'text-on-primary', 'shadow-sm');
        b.classList.add('text-on-surface-variant');
      });
      this.classList.add('bg-primary', 'text-on-primary', 'shadow-sm');
      this.classList.remove('text-on-surface-variant');

      // Filtrado suave con animación
      medalCards.forEach(card => {
        let shouldShow = false;

        if (filterType === 'all') {
          shouldShow = true;
        } else if (filterType === 'unlocked' && card.classList.contains('unlocked')) {
          shouldShow = true;
        } else if (filterType === 'progress' && card.classList.contains('progress')) {
          shouldShow = true;
        } else if (filterType === 'special' && card.classList.contains('special')) {
          shouldShow = true;
        }

        if (shouldShow) {
          card.classList.remove('hidden');
          card.style.opacity = '0';
          card.style.transform = 'scale(0.97)';
          setTimeout(() => {
            card.style.transition = 'opacity 0.2s ease, transform 0.2s ease';
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 30);
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
}

// 2. Controles de Radar de Patrullaje Voluntario
function initPatrolControls() {
  const slider = document.getElementById('patrol-range-slider');
  const display = document.getElementById('range-value-display');
  const toggle = document.getElementById('patrol-toggle');
  const statusBadge = document.getElementById('patrol-status-badge');

  if (slider && display) {
    slider.addEventListener('input', (e) => {
      display.textContent = `${e.target.value} km a la redonda`;
    });
  }

  if (toggle && statusBadge) {
    toggle.addEventListener('change', (e) => {
      if (e.target.checked) {
        statusBadge.textContent = 'MODO ACTIVO';
        statusBadge.className = 'px-3 py-1 rounded-full bg-primary-fixed text-on-primary-fixed font-label-sm text-label-sm font-extrabold';
        showToast('🟢 Radar de Patrullaje activado para recibir alertas barriales.');
      } else {
        statusBadge.textContent = 'PAUSADO';
        statusBadge.className = 'px-3 py-1 rounded-full bg-surface-container text-on-surface-variant font-label-sm text-label-sm font-extrabold';
        showToast('⏸️ Radar en pausa. No recibirás notificaciones sonoras.');
      }
    });
  }
}

// 3. Feedback visual para botones de acción
function initActionButtons() {
  document.querySelectorAll('.btn-toast').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const msg = btn.getAttribute('data-msg') || 'Acción completada con éxito.';
      showToast(msg);
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

  toast.innerHTML = `<span class="material-symbols-outlined text-primary-fixed text-[22px]">info</span><span>${message}</span>`;
  toast.classList.remove('translate-y-10', 'opacity-0');

  setTimeout(() => {
    toast.classList.add('translate-y-10', 'opacity-0');
  }, 3500);
}
