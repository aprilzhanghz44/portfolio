const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const revealItems = document.querySelectorAll('.reveal');

if (reducedMotion || !('IntersectionObserver' in window)) {
  revealItems.forEach((item) => item.classList.add('is-visible'));
} else {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -6% 0px' });
  revealItems.forEach((item) => revealObserver.observe(item));
}

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

const timedVideos = document.querySelectorAll('video[data-start-time]');
timedVideos.forEach((video) => {
  const setInitialTime = () => {
    const startTime = Number(video.dataset.startTime);
    if (Number.isFinite(startTime)) {
      video.currentTime = Math.min(startTime, Math.max(0, video.duration - 0.1));
    }
  };

  if (video.readyState >= 1) {
    setInitialTime();
  } else {
    video.addEventListener('loadedmetadata', setInitialTime, { once: true });
  }
});
