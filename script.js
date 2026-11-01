
(() => {
  const root = document.querySelector('.wrap');

  if (!root || root.dataset.init) return;

  root.dataset.init = '1';

  const pages = [
    'home',
    'about',
    'skills',
    'career',
    'work',
    'credentials',
    'connect',
    'resume'
  ];

  function go(p) {
    if (!pages.includes(p)) return;

    root.querySelectorAll('.section').forEach(s => {
      s.classList.toggle('active', s.id === 'page-' + p);
    });

    root.querySelectorAll('.navbtn').forEach(b => {
      b.classList.toggle('active', b.dataset.page === p);
    });
  }

  // Navigation buttons
  root.querySelectorAll('[data-page]').forEach(b => {
    b.addEventListener('click', () => go(b.dataset.page));
  });

  // Go to another page
  root.querySelectorAll('[data-go]').forEach(b => {
    b.addEventListener('click', () => go(b.dataset.go));
  });

  // Expand and collapse details
  root.querySelectorAll('[data-expand]').forEach(b => {
    b.addEventListener('click', () => {
      const e = root.querySelector('#' + b.dataset.expand);

      e.classList.toggle('open');

      b.textContent =
        (e.classList.contains('open') ? 'Hide' : 'View') +
        ' details ' +
        (e.classList.contains('open') ? '−' : '+');
    });
  });

  // Filter categories
  root.querySelectorAll('[data-filter]').forEach(b => {
    b.addEventListener('click', () => {
      const f = b.dataset.filter;

      root.querySelectorAll('[data-category]').forEach(x => {
        x.style.display =
          f === 'all' || x.dataset.category === f ? '' : 'none';
      });

      root.querySelectorAll('[data-filter]').forEach(x => {
        x.style.borderColor = x === b ? '#58e5ef' : '';
      });
    });
  });

  // Copy email address
  root.querySelector('#copyemail').addEventListener('click', async () => {
    const f = root.querySelector('#feedback');

    try {
      await navigator.clipboard.writeText('tejareddypalle123@gmail.com');
      f.textContent = 'Email address copied.';
    } catch (e) {
      f.textContent =
        'Clipboard unavailable here; copy the address from the contact link.';
    }
  });

  // Prepare email draft
  root.querySelector('#draft').addEventListener('click', () => {
    const s = root.querySelector('#topic').value;

    const m =
      root.querySelector('#message').value.trim() ||
      'Hi Teja,\n\nI would like to connect with you.\n\nBest,';

    location.href =
      'mailto:tejareddypalle123@gmail.com?subject=' +
      encodeURIComponent(s) +
      '&body=' +
      encodeURIComponent(m);

    root.querySelector('#feedback').textContent =
      'Your email application should open with a prepared draft. Review before sending.';
  });
})();
