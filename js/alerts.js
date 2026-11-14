export function initAlerts() {
  const ticker = document.getElementById('alert-ticker');
  if (!ticker) return;

  const barrios = ['Palermo', 'Villa Crespo', 'Belgrano', 'Caballito', 'Recoleta', 'Flores', 'San Telmo'];
  let index = 0;

  setInterval(() => {
    index = (index + 1) % barrios.length;
    
    // Efecto de transición suave
    ticker.style.opacity = 0;
    setTimeout(() => {
      ticker.textContent = `Alerta activa en ${barrios[index]}`;
      ticker.style.opacity = 1;
    }, 300);
    
  }, 4000); // Cambia cada 4 segundos
}