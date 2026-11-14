/**
 * Patitas a Casa - Quiénes Somos & Impacto Comunitario
 * Lógica interactiva
 */

document.addEventListener('DOMContentLoaded', () => {
  // Manejo de detalles/FAQ acordeón
  const allDetails = document.querySelectorAll('details');
  allDetails.forEach(targetDetail => {
    targetDetail.addEventListener('click', () => {
      allDetails.forEach(detail => {
        if (detail !== targetDetail) {
          detail.removeAttribute('open');
        }
      });
    });
  });
});
