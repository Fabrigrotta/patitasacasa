/**
 * Patitas a Casa - Red de Hogares de Tránsito
 * Módulo de interactividad y filtrado
 */

document.addEventListener('DOMContentLoaded', () => {
  // Modal de Postulación
  const modalPostulacion = document.getElementById('modal-postulacion');
  const btnAbrirModal = document.getElementById('btn-abrir-postulacion');
  const btnCerrarModal = document.getElementById('btn-cerrar-modal');
  const formPostulacion = document.getElementById('form-postulacion');
  const btnUrgenciaTransito = document.getElementById('btn-urgencia-transito');

  if (btnAbrirModal && modalPostulacion) {
    btnAbrirModal.addEventListener('click', () => {
      modalPostulacion.classList.remove('hidden');
      modalPostulacion.classList.add('flex');
    });
  }

  if (btnCerrarModal && modalPostulacion) {
    btnCerrarModal.addEventListener('click', () => {
      modalPostulacion.classList.add('hidden');
      modalPostulacion.classList.remove('flex');
    });
  }

  if (modalPostulacion) {
    modalPostulacion.addEventListener('click', (e) => {
      if (e.target === modalPostulacion) {
        modalPostulacion.classList.add('hidden');
        modalPostulacion.classList.remove('flex');
      }
    });
  }

  if (formPostulacion) {
    formPostulacion.addEventListener('submit', (e) => {
      e.preventDefault();
      modalPostulacion.classList.add('hidden');
      modalPostulacion.classList.remove('flex');
      mostrarToast('¡Solicitud de hogar de tránsito enviada! Un coordinador te escribirá por WhatsApp.');
      formPostulacion.reset();
    });
  }

  if (btnUrgenciaTransito) {
    btnUrgenciaTransito.addEventListener('click', () => {
      window.location.href = '../publicar/index.html';
    });
  }

  // Filtros de Especies
  const filterPills = document.querySelectorAll('.btn-filter-pill');
  const caseCards = document.querySelectorAll('.case-card');

  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      filterPills.forEach(p => {
        p.classList.remove('bg-primary', 'text-on-primary');
        p.classList.add('bg-surface-container', 'text-on-surface');
      });
      pill.classList.remove('bg-surface-container', 'text-on-surface');
      pill.classList.add('bg-primary', 'text-on-primary');

      const filter = pill.getAttribute('data-filter');
      caseCards.forEach(card => {
        if (filter === 'todos') {
          card.style.display = 'flex';
        } else {
          const category = card.getAttribute('data-category');
          if (category === filter) {
            card.style.display = 'flex';
          } else {
            card.style.display = 'none';
          }
        }
      });
    });
  });

  // Filtros secundarios (Tags interactivos)
  const tagBtns = document.querySelectorAll('.tag-toggle-btn');
  tagBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      btn.classList.toggle('bg-primary-fixed');
      btn.classList.toggle('text-primary');
      btn.classList.toggle('border-primary');
    });
  });

  const btnResetFiltros = document.getElementById('btn-reset-filtros');
  if (btnResetFiltros) {
    btnResetFiltros.addEventListener('click', () => {
      const btnTodos = document.querySelector('[data-filter="todos"]');
      if (btnTodos) btnTodos.click();
      tagBtns.forEach(btn => {
        btn.classList.remove('bg-primary-fixed', 'text-primary', 'border-primary');
      });
      mostrarToast('Filtros restablecidos');
    });
  }
});

// Funciones globales expuestas para las cards
function solicitarAcogida(nombre) {
  mostrarToast(`Iniciando contacto de acogida para ${nombre}. ¡Muchas gracias por tu compromiso!`);
}

function verFichaProvisoria(nombre) {
  mostrarToast(`Abriendo ficha técnica provisoria de ${nombre}...`);
  setTimeout(() => {
    window.location.href = '../detalle/index.html';
  }, 900);
}

function ofrecerDonacion() {
  mostrarToast('¡Gracias! Coordinando entrega de balanceado y mamadera con el fondo solidario.');
}

function difundirBarrio(nombre) {
  const text = encodeURIComponent(`🚨 ¡Urgente! Necesitamos hogar de tránsito para ${nombre} en Palermo. ¿Podés ayudar o difundir?`);
  window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
}

function seleccionarHogar(nombre) {
  mostrarToast(`Hogar seleccionado: ${nombre}. Abriendo canal directo...`);
}

function solicitarGuardaDirecta(nombreVoluntario) {
  mostrarToast(`Enviando notificación prioritaria a ${nombreVoluntario}...`);
}

function derivarUrgencia(nombreClinica) {
  mostrarToast(`Contactando con guardia de ${nombreClinica}... Tel: 0800-PATITAS`);
}

// Toast System
function mostrarToast(mensaje) {
  const toast = document.getElementById('toast');
  const toastText = document.getElementById('toast-text');
  if (toast && toastText) {
    toastText.textContent = mensaje;
    toast.classList.remove('translate-y-24', 'opacity-0');
    toast.classList.add('translate-y-0', 'opacity-100');

    setTimeout(() => {
      toast.classList.remove('translate-y-0', 'opacity-100');
      toast.classList.add('translate-y-24', 'opacity-0');
    }, 3800);
  }
}
