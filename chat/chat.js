/**
 * Patitas a Casa - Chat de Emergencia
 * Lógica interactiva en tiempo real
 */

document.addEventListener('DOMContentLoaded', () => {
  const sendBtn = document.getElementById('send-msg-btn');
  const chatInput = document.getElementById('chat-input');
  const chatStream = document.getElementById('chat-stream');

  function sendMessage() {
    if (!chatInput || !chatStream) return;
    const text = chatInput.value.trim();
    if (!text) return;

    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const msgWrapper = document.createElement('div');
    msgWrapper.className = 'flex flex-col items-end max-w-[85%] self-end animate-fade-in';
    msgWrapper.innerHTML = `
      <div class="bg-primary text-on-primary p-4 rounded-2xl rounded-tr-none shadow-md flex flex-col gap-2">
        <p class="text-body-md leading-relaxed">${escapeHtml(text)}</p>
        <div class="flex items-center justify-end gap-1 text-primary-fixed text-label-sm font-bold">
          <span>${timeStr}</span>
          <span class="material-symbols-outlined text-[16px]">done</span>
        </div>
      </div>
    `;

    chatStream.appendChild(msgWrapper);
    chatInput.value = '';
    chatStream.scrollTop = chatStream.scrollHeight;

    // Simular respuesta rápida de Martín
    setTimeout(() => {
      const respWrapper = document.createElement('div');
      respWrapper.className = 'flex flex-col items-start max-w-[85%] animate-fade-in';
      respWrapper.innerHTML = `
        <div class="bg-surface-container-lowest p-4 rounded-2xl rounded-tl-none shadow-md border border-outline-variant/30 flex flex-col gap-2">
          <p class="text-body-md text-on-surface leading-relaxed">
            ¡Te veo venir por la vereda! Milo acaba de levantar las orejitas y mirar hacia vos. ¡Acá estamos! 🐕✨
          </p>
          <div class="flex items-center justify-between text-on-surface-variant text-label-sm pt-1">
            <span class="font-bold">Martín Gómez</span>
            <span>${timeStr}</span>
          </div>
        </div>
      `;
      chatStream.appendChild(respWrapper);
      chatStream.scrollTop = chatStream.scrollHeight;
    }, 1800);
  }

  if (sendBtn && chatInput) {
    sendBtn.addEventListener('click', sendMessage);
    chatInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') sendMessage();
    });
  }

  // Interacción de Audio Play / Pause
  const audioToggleBtn = document.getElementById('audio-toggle-btn');
  const audioIcon = document.getElementById('audio-icon');
  let isPlaying = false;

  if (audioToggleBtn && audioIcon) {
    audioToggleBtn.addEventListener('click', () => {
      isPlaying = !isPlaying;
      audioIcon.textContent = isPlaying ? 'pause' : 'play_arrow';
    });
  }
});

function insertQuickMessage(text) {
  const input = document.getElementById('chat-input');
  if (input) {
    input.value = text;
    input.focus();
  }
}

function confirmarReencuentro() {
  const modal = document.getElementById('modal-confirmacion');
  if (modal) {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
  }
}

function cerrarModal() {
  const modal = document.getElementById('modal-confirmacion');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
}

function finalizarReencuentro() {
  cerrarModal();
  const btnCerrar = document.getElementById('btn-cerrar-operativo');
  if (btnCerrar) {
    btnCerrar.className = 'w-full py-4 px-6 rounded-2xl bg-primary-container text-on-primary text-headline-sm font-extrabold flex items-center justify-center gap-3 cursor-default';
    btnCerrar.innerHTML = `
      <span class="material-symbols-outlined text-[28px]">verified</span>
      <span>Reencuentro Certificado Exitosamente</span>
    `;
  }

  // Redirigir a la celebración oficial
  setTimeout(() => {
    window.location.href = '../reencuentro/index.html';
  }, 1200);
}

function escapeHtml(string) {
  const div = document.createElement('div');
  div.innerText = string;
  return div.innerHTML;
}
