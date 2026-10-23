
/* ============================================
   WOMEN RECLAIMING AI
   GAN PORTRAIT ANIMATION
   ============================================ */

(() => {

  const items = [
    ...document.querySelectorAll('#myList li')
  ];

  const photos = items
    .map(li => li.querySelector('img')?.src)
    .filter(Boolean);

  if (items.length < 81) return;

  /* ==========================================
     ANIMATION SETTINGS
     ========================================== */

  const desktopVisible = 80;
  const mobileVisible = 25;
   
const changeInterval = 1800;
const fadeDuration = 650;
const minChanging = 7;
const maxChanging = 13;

  let photoIndex = desktopVisible;

  const busy = new WeakSet();

  const reduceMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  );

  /* ==========================================
     CHANGE A SINGLE PORTRAIT
     ========================================== */

  async function changePortrait(li) {

    if (busy.has(li)) return;

    const original = li.querySelector('img');

    if (!original) return;

    busy.add(li);

    const nextPhoto =
      photos[photoIndex++ % photos.length];

    /* Load next portrait before animating */

    const preload = new Image();
    preload.src = nextPhoto;

    try {
      if (preload.decode) {
        await preload.decode();
      } else {
        await new Promise((resolve, reject) => {
          if (preload.complete && preload.naturalWidth) {
            resolve();
          } else {
            preload.onload = resolve;
            preload.onerror = reject;
          }
        });
      }

      /* Place new portrait over existing one */

      const overlay = document.createElement('img');

      overlay.className = 'portrait-crossfade';
      overlay.src = nextPhoto;
      overlay.alt = '';
      overlay.setAttribute('aria-hidden', 'true');

      li.appendChild(overlay);

      /* Fade new portrait in */

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          overlay.style.opacity = '1';
        });
      });

      await new Promise(resolve => {
        setTimeout(resolve, fadeDuration + 80);
      });

      /* Make replacement permanent */

      original.src = nextPhoto;

      overlay.remove();

    } catch (error) {

      /* Keep existing image if loading fails */

    } finally {

      busy.delete(li);

    }
  }

  /* ==========================================
     CHANGE RANDOM GROUP OF PORTRAITS
     ========================================== */

  function animateGrid() {

    if (reduceMotion.matches) return;

    const isMobile = window.matchMedia(
      '(max-width: 600px)'
    ).matches;

    const countVisible = isMobile
      ? mobileVisible
      : desktopVisible;

    const visible = items.slice(0, countVisible);

    const available = visible.filter(
      li => !busy.has(li)
    );

    if (!available.length) return;

    /* Randomly change 1 to 13 portraits */

  const count = Math.min(
  available.length,
  Math.floor(Math.random() * (maxChanging - minChanging + 1))
    + minChanging
);

    /* Shuffle without duplicate selections */

    for (let i = available.length - 1; i > 0; i--) {

      const j = Math.floor(Math.random() * (i + 1));

      [available[i], available[j]] =
        [available[j], available[i]];

    }

    available.slice(0, count).forEach(
      changePortrait
    );
  }

  /* ==========================================
     START ANIMATION
     ========================================== */

  setInterval(animateGrid, changeInterval);

})();

