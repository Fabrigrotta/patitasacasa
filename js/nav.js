export function initNav() {
  const btn = document.getElementById('mobile-menu-btn');
  const menu = document.getElementById('mobile-menu');
  const icon = btn.querySelector('span');

  if (!btn || !menu) return;

  btn.addEventListener('click', () => {
    menu.classList.toggle('hidden');
    // Cambiar icono de hamburguesa a cruz
    if (menu.classList.contains('hidden')) {
      icon.textContent = 'menu';
    } else {
      icon.textContent = 'close';
    }
  });
}