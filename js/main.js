import { initNav } from './nav.js';
import { initCounters } from './counters.js';
import { initFaq } from './faq.js';
import { initAlerts } from './alerts.js';

document.addEventListener("DOMContentLoaded", () => {
  console.log("🐾 Patitas a Casa — Home inicializado");
  
  initNav();
  initCounters();
  initFaq();
  initAlerts();
});