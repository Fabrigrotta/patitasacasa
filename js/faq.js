export function initFaq() {
  const faqs = document.querySelectorAll('.faq-item');

  faqs.forEach(faq => {
    faq.addEventListener('toggle', (e) => {
      if (faq.open) {
        // Si se abre una, cerramos las demás
        faqs.forEach(other => {
          if (other !== faq) other.removeAttribute('open');
        });
      }
    });
  });
}