// detalle.js - Galería interactiva, reporte de avistamiento y mapa para Ficha de Mascota

const petPhotos = [
  {
    url: "https://lh3.googleusercontent.com/aida-public/AB6AXuB3SKFwQcy99ohE9kSzw-9xNycfS5_ws4Af6Nd5kEu8xJ7q5W43puoodMg-ymNYl6EyIw9sIu7iDt8VTGOUvaFEeypTbeSzx5v4K_JX24kVNW5aoE-Fn0XBlmvmb9in7-I-EQ-L8I0X5A9OWMer2Ei1OiqP1ePtfMsDdBi0hGubhFSjR3eCt0RUyAcZOziSW6s-mBdqYI9NZV-XJa2clgtYSfFwD20QPWk5I3Y-nT8",
    label: "Vista 1: Retrato frontal (mirada y expresión)"
  },
  {
    url: "https://lh3.googleusercontent.com/aida-public/AB6AXuB88-F0vRGLWgtgl5_9G8LwSO-lH5MUlge2ARRXtajUoIerD2TtyP97esigRtWbZUm6o4Ytv4TG1pZmCbaJfdjh1w3k9SckZ1Hj0guUcoPn1kXc_6AkX9NWxofRYtwIbWo7ivnALBZe2kSQb5RRkmUiyAkC8gpTGWqmQP3c14MduuMiiNWuzgiHWQl9HPX1MYekL1e26G1L1eIZZ08n0GADV9MJq4uBuPTtcoX6dpw",
    label: "Vista 2: Cuerpo entero con collar azul marino y chapita reflectiva"
  },
  {
    url: "https://lh3.googleusercontent.com/aida-public/AB6AXuAUgrJchDKXLA-JiU2LqVIya0RuSftraIe-BfDg2W16olOheM9YaG5EV9Yc7yx1Eu9WbQTJYfPnsOcvzaKtV-mPuACKzPqczu-k4Sc9suv5rI0HDAoYpeJzC551xUmTVlVqgBpZM85FO_mr-PPSHGTqKu2F0plVzWkuNc__whgtltPitYgyU1FvUlo-IqdgyGmHRrQHH692AF5G78iumN23fSvVnit1BaPrg-hqyIU",
    label: "Vista 3: Seña particular - Mancha blanca en el pecho"
  }
];

document.addEventListener('DOMContentLoaded', () => {
  initGallery();
  initCopyLink();
  initSightingReportForm();
});

function initGallery() {
  window.switchPhoto = function (index, label) {
    const mainImg = document.getElementById('mainPetPhoto');
    const photoLabel = document.getElementById('photoLabel');
    const thumbs = document.querySelectorAll('.gallery-thumb');

    if (mainImg && petPhotos[index]) {
      mainImg.style.opacity = '0';
      setTimeout(() => {
        mainImg.src = petPhotos[index].url;
        mainImg.style.opacity = '1';
      }, 150);
    }

    if (photoLabel && label) {
      photoLabel.innerHTML = `<span class="material-symbols-outlined text-[18px] text-tertiary-fixed">photo_camera</span><span>${label}</span>`;
    }

    thumbs.forEach((th, i) => {
      if (i === index) {
        th.classList.add('ring-4', 'ring-primary', 'opacity-100');
        th.classList.remove('opacity-75');
      } else {
        th.classList.remove('ring-4', 'ring-primary', 'opacity-100');
        th.classList.add('opacity-75');
      }
    });
  };
}

function initCopyLink() {
  const btn = document.getElementById('copyLinkBtn');
  if (btn) {
    btn.addEventListener('click', () => {
      navigator.clipboard.writeText(window.location.href);
      showToast('📋 ¡Enlace a la ficha de Milo copiado al portapapeles!');
    });
  }
}

function initSightingReportForm() {
  const form = document.getElementById('sightingForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      showToast('📍 ¡Avistamiento recibido! Se alertó a Sofía y a los rescatistas de la zona.');
      form.reset();
    });
  }
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
