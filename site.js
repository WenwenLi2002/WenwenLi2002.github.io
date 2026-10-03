(() => {
  const dialog = document.getElementById('figure-dialog');
  const image = document.getElementById('enlarged-figure');
  const caption = document.getElementById('figure-caption');
  const close = document.getElementById('close-figure');
  let opener = null;
  for (const button of document.querySelectorAll('[data-figure]')) {
    button.addEventListener('click', () => {
      const text = button.dataset.caption || '';
      image.src = button.dataset.figure;
      image.alt = text;
      caption.textContent = text;
      opener = button;
      if (typeof dialog.showModal === 'function') {
        dialog.showModal();
        close.focus();
      } else {
        window.open(button.dataset.figure, '_blank', 'noopener');
      }
    });
  }
  close.addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    if (event.target === dialog) {
      const r = dialog.getBoundingClientRect();
      if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) dialog.close();
    }
  });
  dialog.addEventListener('close', () => {
    image.removeAttribute('src');
    if (opener) opener.focus();
  });
})();
