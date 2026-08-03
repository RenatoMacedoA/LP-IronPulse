/* =============== OBSERVER =============== */
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      entry.target.classList.toggle("show", entry.isIntersecting);
    });
  },
  {
    threshold: 0.15,
  }
);

document
  .querySelectorAll(".hidden, .hidden-left, .hidden-right, .pop")
  .forEach((el) => observer.observe(el));

/* =============== OBSERVER ANIMAÇÃO =============== */
document.querySelectorAll("section").forEach((section) => {
  const items = section.querySelectorAll(
    ".hidden, .hidden-left, .hidden-right, .pop"
  );

  items.forEach((item, index) => {
    const delay = `${index * 120}ms`;
    
    // 💡 CORREÇÃO: Aplica delay SOMENTE para opacity e transform do aparecimento, 
    // sem travar a transição de hover!
    item.style.transitionProperty = "opacity, transform";
    item.style.transitionDelay = delay;
  });
});



/* =============== ANIMAÇÃO ROLETA DE NÚMEROS =============== */
function animateSlotNumbers() {
  const statElements = document.querySelectorAll(".stats__number");

  statElements.forEach((el) => {
    // Salva o texto original exato (ex: "+2.500", "24/7", "4,9 ★")
    const originalText = el.innerText;
    const duration = 1500; // Duração total da animação em milissegundos
    const intervalTime = 40; // Velocidade de troca dos dígitos
    const totalSteps = duration / intervalTime;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;

      // Gera o texto embaralhado trocando apenas os dígitos por números aleatórios
      const randomText = originalText.replace(/\d/g, () =>
        Math.floor(Math.random() * 10)
      );

      el.innerText = randomText;

      // Quando atinge o tempo final, restaura o texto original exato
      if (currentStep >= totalSteps) {
        clearInterval(timer);
        el.innerText = originalText;
      }
    }, intervalTime);
  });
}

/* Integrado ao IntersectionObserver do seu site */
const statsObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateSlotNumbers();
        observer.unobserve(entry.target); // Executa 1 vez ao aparecer na tela
      }
    });
  },
  { threshold: 0.3 }
);

const heroStats = document.querySelector(".hero__stats");
if (heroStats) {
  statsObserver.observe(heroStats);
}
