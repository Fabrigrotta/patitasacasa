/**
 * Patitas a Casa - Iniciar Sesión / Portal Guardianes
 * Lógica interactiva de autenticación
 */

document.addEventListener('DOMContentLoaded', () => {
  // Toggle password visibility
  const toggleBtn = document.getElementById('toggle-password-btn');
  const passwordInput = document.getElementById('password');
  const eyeIcon = document.getElementById('eye-icon');

  if (toggleBtn && passwordInput && eyeIcon) {
    toggleBtn.addEventListener('click', () => {
      const isPassword = passwordInput.getAttribute('type') === 'password';
      passwordInput.setAttribute('type', isPassword ? 'text' : 'password');
      eyeIcon.textContent = isPassword ? 'visibility_off' : 'visibility';
    });
  }

  // Alternancia de Pestañas (Contraseña vs Código SMS/WhatsApp)
  const tabPassword = document.getElementById('tab-password');
  const tabOtp = document.getElementById('tab-otp');
  const passwordContainer = document.getElementById('password-container');

  if (tabPassword && tabOtp && passwordContainer) {
    tabOtp.addEventListener('click', () => {
      tabOtp.classList.add('bg-primary', 'text-on-primary', 'shadow-sm');
      tabOtp.classList.remove('text-on-surface-variant');
      tabPassword.classList.remove('bg-primary', 'text-on-primary', 'shadow-sm');
      tabPassword.classList.add('text-on-surface-variant');
      passwordContainer.style.display = 'none';
      if (passwordInput) passwordInput.removeAttribute('required');
    });

    tabPassword.addEventListener('click', () => {
      tabPassword.classList.add('bg-primary', 'text-on-primary', 'shadow-sm');
      tabPassword.classList.remove('text-on-surface-variant');
      tabOtp.classList.remove('bg-primary', 'text-on-primary', 'shadow-sm');
      tabOtp.classList.add('text-on-surface-variant');
      passwordContainer.style.display = 'block';
      if (passwordInput) passwordInput.setAttribute('required', 'true');
    });
  }

  // Form submit
  const loginForm = document.getElementById('login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const identifier = document.getElementById('identifier').value;
      
      const submitBtn = loginForm.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.innerHTML = `
          <span class="material-symbols-outlined text-[22px] animate-spin">refresh</span>
          <span>Iniciando sesión...</span>
        `;
        submitBtn.disabled = true;
      }

      setTimeout(() => {
        window.location.href = '../perfil/index.html';
      }, 1000);
    });
  }
});

function loginSocial(provider) {
  alert(`Iniciando conexión segura con ${provider}...`);
  setTimeout(() => {
    window.location.href = '../perfil/index.html';
  }, 800);
}

function loginWhatsApp() {
  const identifier = document.getElementById('identifier');
  const tel = identifier ? identifier.value : '';
  alert(`Enviando código de 6 dígitos con token de un solo uso por WhatsApp a: ${tel || 'tu número registrado'}`);
  setTimeout(() => {
    window.location.href = '../alertas/index.html';
  }, 1000);
}
