export function initCounters() {
  const counters = document.querySelectorAll('.counter');
  
  // Función para animar un número
  const animate = (el) => {
    const target = +el.getAttribute('data-target');
    const duration = 2000; // 2 segundos
    const stepTime = Math.abs(Math.floor(duration / target));
    let current = 0;
    
    // Ajuste para que los números grandes no duren 10 minutos
    const increment = target > 1000 ? Math.ceil(target / 100) : 1;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        el.textContent = target.toLocaleString('es-AR'); // Formato 1.842
        clearInterval(timer);
      } else {
        el.textContent = current.toLocaleString('es-AR');
      }
    }, 20);
  };

  // Intersection Observer para que cuenten solo cuando entran en pantalla
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animate(entry.target);
        observer.unobserve(entry.target); // Solo animar una vez
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => observer.observe(counter));
}