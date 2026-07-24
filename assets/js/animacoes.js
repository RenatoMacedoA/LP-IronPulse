/* =============== OBSERVER =============== */
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      entry.target.classList.toggle("show", entry.isIntersecting);
    });
  },
  {
    threshold: 0.15,
  },
);

document.querySelectorAll(".hidden, .hidden-left, .hidden-right, .pop").forEach((el) => observer.observe(el));



/* =============== OBSERVER ANIMAÇÃO =============== */
document.querySelectorAll("section").forEach((section) => {
  const items = section.querySelectorAll(".hidden, .hidden-left, .hidden-right, .pop");

  items.forEach((item, index) => {
    item.style.transitionDelay = `${index * 120}ms`;
  });
});
