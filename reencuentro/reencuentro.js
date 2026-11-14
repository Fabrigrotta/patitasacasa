/**
 * Patitas a Casa - Final Feliz & Reencuentro Confirmado
 * Lógica interactiva de celebración y reconocimiento cívico
 */

document.addEventListener('DOMContentLoaded', () => {
  // Inicialización de calificaciones por defecto
  setRating(5);
});

function confirmReward() {
  const banner = document.getElementById('reward-status-banner');
  const btn = document.getElementById('btn-recompensa');
  if (banner && btn) {
    banner.classList.remove('hidden');
    btn.innerHTML = `
      <span class="material-symbols-outlined text-[20px]">check</span>
      <span>Liberada ($150.000)</span>
    `;
    btn.disabled = true;
    btn.classList.add('opacity-70', 'cursor-not-allowed');
  }
}

function sendTip() {
  alert('Redirigiendo a pasarela solidaria para transferir propina adicional a Martín Gómez (vía Mercado Pago sin comisión).');
}

function setRating(rating) {
  const starBtns = document.querySelectorAll('.star-btn');
  const ratingText = document.getElementById('rating-text');
  starBtns.forEach((btn, index) => {
    if (index < rating) {
      btn.style.fontVariationSettings = "'FILL' 1";
      btn.classList.add('text-tertiary-fixed-dim');
      btn.classList.remove('text-outline-variant');
    } else {
      btn.style.fontVariationSettings = "'FILL' 0";
      btn.classList.remove('text-tertiary-fixed-dim');
      btn.classList.add('text-outline-variant');
    }
  });

  if (ratingText) {
    const labels = [
      '',
      'Auxilio básico (1/5)',
      'Buen auxilio (2/5)',
      'Gran auxilio (3/5)',
      'Excelente auxilio (4/5)',
      'Héroe Vecinal Sobresaliente (5/5)'
    ];
    ratingText.innerText = labels[rating] || `Calificación: ${rating}/5`;
  }
}

function publishReview() {
  const input = document.getElementById('review-input');
  const successMsg = document.getElementById('review-success');
  if (input && input.value.trim().length > 0) {
    input.value = '';
    if (successMsg) successMsg.classList.remove('hidden');
  } else {
    alert('Por favor escribí unas palabras antes de publicar tu agradecimiento.');
  }
}

function shareWhatsApp() {
  const text = encodeURIComponent('¡Gran noticia vecinos! Milo ya apareció sano y salvo en Café Le Blé (Costa Rica y Malabia). ¡Muchas gracias a todos los que compartieron en Palermo!');
  window.open('https://api.whatsapp.com/send?text=' + text, '_blank');
}

function shareStories() {
  alert('Generando y descargando flyer de celebración en alta resolución formato vertical 9:16 para Instagram Stories.');
}

function guardarRecuerdo() {
  alert('Descargando fotografía oficial del reencuentro en alta calidad.');
}
