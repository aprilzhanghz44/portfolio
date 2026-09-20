const sections = document.querySelectorAll('.project[id]');
const navLinks = [...document.querySelectorAll('nav a')];

if ('IntersectionObserver' in window) {
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((link) => link.classList.toggle('is-active', link.hash === `#${entry.target.id}`));
    });
  }, { rootMargin: '-30% 0px -58% 0px', threshold: 0 });
  sections.forEach((section) => sectionObserver.observe(section));
}
