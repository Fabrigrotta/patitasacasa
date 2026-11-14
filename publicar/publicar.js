// publicar.js - Wizard y vista previa en tiempo real para Publicar Alerta

let currentStep = 1;

document.addEventListener('DOMContentLoaded', () => {
  initWizard();
  updateLivePreview();
  initFormListeners();
});

function initWizard() {
  window.setStep = setStep;
  window.nextStep = nextStep;
  window.previousStep = previousStep;
  window.submitAlert = submitAlert;
}

function setStep(step) {
  currentStep = step;
  
  // Ocultar / Mostrar paneles
  for (let i = 1; i <= 4; i++) {
    const panel = document.getElementById('step-content-' + i);
    const btnNum = document.getElementById('step-num-' + i);
    
    if (panel) {
      if (i === step) {
        panel.classList.remove('hidden');
        panel.style.opacity = '0';
        setTimeout(() => {
          panel.style.transition = 'opacity 0.25s ease';
          panel.style.opacity = '1';
        }, 20);
      } else {
        panel.classList.add('hidden');
      }
    }

    if (btnNum) {
      if (i <= step) {
        btnNum.className = "w-11 h-11 rounded-full bg-primary text-on-primary flex items-center justify-center font-label-md text-label-md font-black shadow-md transition-colors";
      } else {
        btnNum.className = "w-11 h-11 rounded-full bg-surface-container text-on-surface-variant flex items-center justify-center font-label-md text-label-md font-bold shadow-sm transition-colors";
      }
    }
  }

  // Barra de progreso animada
  const progressBar = document.getElementById('wizard-progress-bar');
  if (progressBar) {
    progressBar.style.width = (step * 25) + '%';
  }

  // Botones de navegación
  const btnBack = document.getElementById('btn-back');
  const btnNext = document.getElementById('btn-next');
  const btnSubmit = document.getElementById('btn-submit');

  if (btnBack) {
    if (step > 1) {
      btnBack.classList.remove('hidden');
    } else {
      btnBack.classList.add('hidden');
    }
  }

  if (step === 4) {
    if (btnNext) btnNext.classList.add('hidden');
    if (btnSubmit) btnSubmit.classList.remove('hidden');
  } else {
    if (btnNext) btnNext.classList.remove('hidden');
    if (btnSubmit) btnSubmit.classList.add('hidden');
  }

  window.scrollTo({ top: 100, behavior: 'smooth' });
}

function nextStep() {
  if (currentStep < 4) {
    setStep(currentStep + 1);
  }
}

function previousStep() {
  if (currentStep > 1) {
    setStep(currentStep - 1);
  }
}

function initFormListeners() {
  const inputs = ['pet_name', 'pet_gender', 'pet_size', 'pet_color', 'pet_address', 'event_date', 'event_time', 'collar_status', 'distinctive_marks', 'urgent_medication', 'reward_amount'];
  
  inputs.forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener('input', updateLivePreview);
      el.addEventListener('change', updateLivePreview);
    }
  });

  document.querySelectorAll('input[name="report_type"]').forEach(r => {
    r.addEventListener('change', updateLivePreview);
  });

  document.querySelectorAll('input[name="species"]').forEach(r => {
    r.addEventListener('change', updateLivePreview);
  });
}

function updateLivePreview() {
  // Tipo de reporte
  const reportType = document.querySelector('input[name="report_type"]:checked')?.value || 'lost';
  const previewBadge = document.getElementById('preview-badge');
  const previewStatusText = document.getElementById('preview-status-text');

  if (previewBadge && previewStatusText) {
    if (reportType === 'lost') {
      previewBadge.className = 'absolute top-3 left-3 px-space-md py-1.5 rounded-full font-label-sm text-label-sm bg-secondary text-on-secondary font-extrabold shadow-md flex items-center gap-1.5';
      previewStatusText.textContent = 'PERDIDO URGENTE';
    } else {
      previewBadge.className = 'absolute top-3 left-3 px-space-md py-1.5 rounded-full font-label-sm text-label-sm bg-primary text-on-primary font-extrabold shadow-md flex items-center gap-1.5';
      previewStatusText.textContent = 'ENCONTRADO / EN TRÁNSITO';
    }
  }

  // Nombre
  const petName = document.getElementById('pet_name')?.value || 'Sin nombre especificado';
  const previewName = document.getElementById('preview-name');
  if (previewName) previewName.textContent = petName;

  // Especie y Sexo
  const species = document.querySelector('input[name="species"]:checked')?.value || 'Perro';
  const gender = document.getElementById('pet_gender')?.value || 'Macho';
  const previewSpeciesGender = document.getElementById('preview-species-gender');
  if (previewSpeciesGender) previewSpeciesGender.textContent = `${species} · ${gender}`;

  // Dirección
  const address = document.getElementById('pet_address')?.value || 'Zona no especificada';
  const previewLocation = document.getElementById('preview-location');
  if (previewLocation) previewLocation.textContent = address;

  // Hora
  const eventTime = document.getElementById('event_time')?.value || 'Recientemente';
  const previewTime = document.getElementById('preview-time');
  if (previewTime) previewTime.textContent = eventTime;

  // Medicación urgente
  const urgentMed = document.getElementById('urgent_medication')?.checked;
  const previewUrgentNote = document.getElementById('preview-urgent-note');
  if (previewUrgentNote) {
    if (urgentMed) {
      previewUrgentNote.classList.remove('hidden');
    } else {
      previewUrgentNote.classList.add('hidden');
    }
  }

  // Recompensa
  const rewardVal = document.getElementById('reward_amount')?.value.trim();
  const previewRewardBadge = document.getElementById('preview-reward-badge');
  const previewRewardVal = document.getElementById('preview-reward-val');
  if (previewRewardBadge && previewRewardVal) {
    if (rewardVal && rewardVal.length > 0) {
      previewRewardVal.textContent = 'Recompensa: $' + rewardVal;
      previewRewardBadge.classList.remove('hidden');
    } else {
      previewRewardBadge.classList.add('hidden');
    }
  }
}

function submitAlert() {
  const petName = document.getElementById('pet_name')?.value || 'la mascota';
  showModalSuccess(petName);
}

function showModalSuccess(petName) {
  let modal = document.getElementById('modal-alerta-exitosa');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'modal-alerta-exitosa';
    modal.className = 'fixed inset-0 z-50 bg-on-surface/60 backdrop-blur-sm flex items-center justify-center p-4';
    document.body.appendChild(modal);
  }

  modal.innerHTML = `
    <div class="bg-surface-container-lowest max-w-lg w-full rounded-3xl p-8 shadow-2xl border border-surface-container flex flex-col items-center text-center animate-in fade-in zoom-in duration-200">
      <div class="w-20 h-20 rounded-3xl bg-primary-fixed text-primary flex items-center justify-center mb-4 shadow-inner">
        <span class="material-symbols-outlined text-[44px]">verified</span>
      </div>
      <h3 class="font-headline-md text-headline-md font-black text-on-surface">¡Alerta Barrial Activada!</h3>
      <p class="font-body-md text-body-md text-on-surface-variant mt-2 leading-relaxed">
        El reporte de <strong>${petName}</strong> fue despachado al radar de vecinos activos y 25 veterinarias de guardia en Palermo Soho.
      </p>
      <div class="flex flex-col sm:flex-row gap-3 w-full mt-6">
        <a href="../cartel/index.html" class="flex-1 h-12 rounded-2xl bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md font-bold flex items-center justify-center gap-2 transition-all">
          <span class="material-symbols-outlined text-[20px]">print</span>
          <span>Ver Cartel A4</span>
        </a>
        <a href="../alertas/index.html" class="flex-1 h-12 rounded-2xl bg-primary text-on-primary hover:bg-primary-container font-label-md text-label-md font-bold flex items-center justify-center gap-2 shadow-lg transition-all">
          <span class="material-symbols-outlined text-[20px]">feed</span>
          <span>Ir al Feed de Alertas</span>
        </a>
      </div>
    </div>
  `;
}
