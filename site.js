/* Women Reclaiming AI — GAN portrait animation */
(() => {
  const items = [...document.querySelectorAll('#myList li')];
  const images = items.map(li => li.querySelector('img')).filter(Boolean);
  if (images.length < 49) return;

  const sources = images.map(img => img.currentSrc || img.src);
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const mobile = window.matchMedia('(max-width: 600px)');
  const INTERVAL_MS = 1800;
  const FADE_MS = 650;
  const MAX_PER_CYCLE = 3;
  const busy = new Set();
  let next = 48;

  const replacePortrait = img => {
    if (busy.has(img)) return;
    busy.add(img);
    const nextSource = sources[next++ % sources.length];
    const preload = new Image();
    preload.onload = () => {
      // Overlay the incoming photo; the old photo stays fully visible below.
      const tile = img.closest('li');
      if (!tile || !tile.contains(img) || motion.matches) {
        busy.delete(img);
        return;
      }
      const overlay = document.createElement('img');
      overlay.src = nextSource;
      overlay.alt = '';
      overlay.setAttribute('aria-hidden', 'true');
      overlay.className = 'portrait-crossfade';
      tile.appendChild(overlay);
      // Trigger transition after the overlay has entered the document.
      requestAnimationFrame(() => requestAnimationFrame(() => {
        overlay.style.opacity = '1';
      }));
      const finish = () => {
        if (!tile.contains(overlay)) return;
        img.src = nextSource;
        overlay.remove();
        busy.delete(img);
      };
      overlay.addEventListener('transitionend', finish, { once: true });
      setTimeout(finish, FADE_MS + 150);
    };
    preload.onerror = () => busy.delete(img);
    preload.src = nextSource;
  };

  const tick = () => {
    if (motion.matches || document.hidden) return;
    const shown = images.slice(0, mobile.matches ? 25 : 48).filter(img => !busy.has(img));
    if (!shown.length) return;
    const count = Math.min(shown.length, 2 + Math.floor(Math.random() * 2), MAX_PER_CYCLE);
    for (let i = 0; i < count; i++) {
      const index = Math.floor(Math.random() * shown.length);
      const [selected] = shown.splice(index, 1);
      replacePortrait(selected);
    }
  };

  setInterval(tick, INTERVAL_MS);
})();

