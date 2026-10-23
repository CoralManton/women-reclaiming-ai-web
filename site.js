
/* Animated GAN portraits — Women Reclaiming AI */

(() => {
  const items = [...document.querySelectorAll('#myList li')];
  const photos = items.map(li => li.querySelector('img').src);

  if (items.length < 51) return;

  let idx = 50;

  const changeInterval = 100;  // Change every 0.5 seconds
  const fadeDuration = 250;    // Fade transition in milliseconds

  items.forEach(li => {
    const img = li.querySelector('img');
    img.style.transition = `opacity ${fadeDuration}ms ease`;
  });

  setInterval(() => {
    const isMobile = window.matchMedia('(max-width:600px)').matches;
    const visible = items.slice(0, isMobile ? 25 : 50);

    const cell = visible[
      Math.floor(Math.random() * visible.length)
    ].querySelector('img');

    cell.style.opacity = '0.1';

    setTimeout(() => {
      cell.src = photos[idx++ % photos.length];
      cell.style.opacity = '1';
    }, fadeDuration);

  }, changeInterval);
})();
