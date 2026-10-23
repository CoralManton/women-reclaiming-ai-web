
/* Women Reclaiming AI - Animated GAN Grid */

(() => {
  const items = [...document.querySelectorAll('#myList li')];
  const photos = items.map(li => li.querySelector('img').src);

  if (items.length < 51) return;

  let idx = 50;

  /* Animation settings */
  const changeInterval = 500;
  const fadeDuration = 250;
  const maxChanging = 10;

  items.forEach(li => {
    const img = li.querySelector('img');
    img.style.transition = `opacity ${fadeDuration}ms ease`;
  });

  setInterval(() => {
    const isMobile =
      window.matchMedia('(max-width:600px)').matches;

    const visible = items.slice(0, isMobile ? 25 : 50);

    /* Pick up to 10 different portraits */
    const count = Math.floor(Math.random() * maxChanging) + 1;

    const shuffled = [...visible].sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, count);

    selected.forEach(li => {
      const img = li.querySelector('img');

      img.style.opacity = '0.1';

      setTimeout(() => {
        img.src = photos[idx++ % photos.length];
        img.style.opacity = '1';
      }, fadeDuration);
    });

  }, changeInterval);
})();
