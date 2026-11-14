// cartel.js - Lógica interactiva para el Generador de Carteles A4 e Historias para Redes

document.addEventListener('DOMContentLoaded', () => {
  initViewSwitcher();
  initFormInputs();
  initPrintAndDownload();
});

function initViewSwitcher() {
  window.setViewMode = function (mode) {
    const a4Panel = document.getElementById('poster-a4-preview');
    const storyPanel = document.getElementById('poster-story-preview');
    const btns = document.querySelectorAll('.view-btn');

    btns.forEach(b => {
      b.classList.remove('bg-surface-container-lowest', 'text-primary', 'shadow-md', 'font-black');
      b.classList.add('text-on-surface-variant', 'font-semibold');
    });

    const activeBtn = document.getElementById(`btn-view-${mode}`);
    if (activeBtn) {
      activeBtn.classList.remove('text-on-surface-variant', 'font-semibold');
      activeBtn.classList.add('bg-surface-container-lowest', 'text-primary', 'shadow-md', 'font-black');
    }

    if (mode === 'split') {
      if (a4Panel) a4Panel.classList.remove('hidden');
      if (storyPanel) storyPanel.classList.remove('hidden');
    } else if (mode === 'a4') {
      if (a4Panel) a4Panel.classList.remove('hidden');
      if (storyPanel) storyPanel.classList.add('hidden');
    } else if (mode === 'story') {
      if (a4Panel) a4Panel.classList.add('hidden');
      if (storyPanel) storyPanel.classList.remove('hidden');
    }
  };
}

function initFormInputs() {
  const rewardInput = document.getElementById('input-reward');
  const phoneInput = document.getElementById('input-phone');

  if (rewardInput) {
    rewardInput.addEventListener('input', (e) => {
      const val = e.target.value.trim();
      document.querySelectorAll('.preview-reward-text').forEach(el => {
        el.textContent = val ? `$ ${val}` : '$ 150.000';
      });
    });
  }

  if (phoneInput) {
    phoneInput.addEventListener('input', (e) => {
      const val = e.target.value.trim();
      document.querySelectorAll('.preview-phone-text').forEach(el => {
        el.textContent = val || '+54 9 11 5123-4567';
      });
    });
  }
}

function initPrintAndDownload() {
  const printBtn = document.getElementById('btn-print-poster');
  if (printBtn) {
    printBtn.addEventListener('click', () => {
      window.print();
    });
  }

  const downloadStoryBtn = document.getElementById('btn-download-story');
  if (downloadStoryBtn) {
    downloadStoryBtn.addEventListener('click', () => {
      showToast('📥 Descargando placa Stories (1080x1920 px)...');
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

  toast.innerHTML = `<span class="material-symbols-outlined text-primary-fixed text-[22px]">print</span><span>${message}</span>`;
  toast.classList.remove('translate-y-10', 'opacity-0');

  setTimeout(() => {
    toast.classList.add('translate-y-10', 'opacity-0');
  }, 3500);
}
