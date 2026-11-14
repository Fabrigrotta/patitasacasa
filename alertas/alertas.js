// alertas.js - Lógica interactiva para el Feed de Alertas de Patitas a Casa

document.addEventListener('DOMContentLoaded', () => {
  initSpeciesFilters();
  initStatusFilters();
  initActionFeedback();
});

// 1. Filtro interactivo por especie
function initSpeciesFilters() {
  const filterButtons = document.querySelectorAll('.filter-species');
  const petCards = document.querySelectorAll('.pet-card');

  filterButtons.forEach(button => {
    button.addEventListener('click', function () {
      // Estado activo visual en botones
      filterButtons.forEach(btn => {
        btn.classList.remove('bg-surface-container-lowest', 'text-primary', 'shadow-sm', 'font-bold');
        btn.classList.add('text-on-surface-variant');
      });
      this.classList.add('bg-surface-container-lowest', 'text-primary', 'shadow-sm', 'font-bold');
      this.classList.remove('text-on-surface-variant');

      const selectedSpecies = this.getAttribute('data-species');

      // Filtrado con animación suave
      petCards.forEach(card => {
        const cardSpecies = card.getAttribute('data-species');
        if (selectedSpecies === 'all' || cardSpecies === selectedSpecies) {
          card.classList.remove('hidden');
          card.style.opacity = '0';
          card.style.transform = 'translateY(8px)';
          setTimeout(() => {
            card.style.transition = 'opacity 0.25s ease, transform 0.25s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 30);
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
}

// 2. Filtro interactivo por estado (Perdidos, Vistos, Encontrados)
function initStatusFilters() {
  const statusButtons = document.querySelectorAll('.filter-status');
  const petCards = document.querySelectorAll('.pet-card');

  statusButtons.forEach(btn => {
    btn.addEventListener('click', function () {
      const status = this.getAttribute('data-status');
      
      // Toggle visual
      statusButtons.forEach(b => b.classList.remove('ring-2', 'ring-primary', 'font-bold'));
      this.classList.add('ring-2', 'ring-primary', 'font-bold');

      petCards.forEach(card => {
        const cardStatus = card.getAttribute('data-status');
        if (!status || status === 'all' || cardStatus === status) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
}

// 3. Feedback visual (Toast) para acciones clave
function initActionFeedback() {
  // Botones de avistamiento
  document.querySelectorAll('.btn-avistamiento').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const petName = btn.getAttribute('data-pet') || 'la mascota';
      showToast(`📍 ¡Gracias! Tu reporte sobre ${petName} se está enviando a la red barrial.`);
    });
  });

  // Botón de compartir
  document.querySelectorAll('.btn-share').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (navigator.share) {
        navigator.share({
          title: 'Patitas a Casa - Alerta Barrial',
          text: 'Ayudanos a encontrar a esta mascota perdida en Palermo Soho.',
          url: window.location.href,
        }).catch(() => {});
      } else {
        navigator.clipboard.writeText(window.location.href);
        showToast('📋 ¡Enlace copiado al portapapeles!');
      }
    });
  });
}

// Notificación flotante accesible
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
