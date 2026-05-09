/* ═══ Hotel Los Angeles Country ═══ */
(function () {
  'use strict';

  const WA_NUMBER = '573023022707';
  const PRICES = {
    individual: 50000,
    doble: 60000,
    confort: 60000
  };
  const ROOM_NAMES = {
    individual: 'Habitación Individual',
    doble: 'Habitación Doble',
    confort: 'Habitación Confort'
  };

  /* ── Nav scroll ── */
  const nav = document.querySelector('.nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  });

  /* ── Mobile menu ── */
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
  });
  mobileMenu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      mobileMenu.classList.remove('active');
      document.body.style.overflow = '';
    });
  });

  /* ── Hero loaded ── */
  window.addEventListener('load', () => {
    document.querySelector('.hero').classList.add('loaded');
  });

  /* ── Scroll reveal ── */
  const reveals = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); } });
  }, { threshold: 0.15 });
  reveals.forEach(el => revealObserver.observe(el));

  /* ── Guest counter ── */
  const guestCount = document.getElementById('guestCount');
  const btnMinus = document.getElementById('guestMinus');
  const btnPlus = document.getElementById('guestPlus');
  let guests = 1;

  function updateGuests() {
    guestCount.textContent = guests;
    btnMinus.disabled = guests <= 1;
  }

  btnMinus.addEventListener('click', () => { if (guests > 1) { guests--; updateGuests(); } });
  btnPlus.addEventListener('click', () => { if (guests < 4) { guests++; updateGuests(); } });

  /* ── Set default dates ── */
  const checkinInput = document.getElementById('checkin');
  const checkoutInput = document.getElementById('checkout');
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  function formatDate(d) {
    return d.toISOString().split('T')[0];
  }
  checkinInput.value = formatDate(today);
  checkinInput.min = formatDate(today);
  checkoutInput.value = formatDate(tomorrow);
  checkoutInput.min = formatDate(tomorrow);

  checkinInput.addEventListener('change', () => {
    const minOut = new Date(checkinInput.value);
    minOut.setDate(minOut.getDate() + 1);
    checkoutInput.min = formatDate(minOut);
    if (new Date(checkoutInput.value) <= new Date(checkinInput.value)) {
      checkoutInput.value = formatDate(minOut);
    }
  });

  /* ── Booking modal ── */
  const modal = document.getElementById('bookingModal');
  const viewBtn = document.getElementById('viewRoomsBtn');

  function calcNights(ci, co) {
    const d1 = new Date(ci);
    const d2 = new Date(co);
    return Math.max(1, Math.round((d2 - d1) / 86400000));
  }

  function formatCOP(n) {
    return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(n);
  }

  function formatDateES(dateStr) {
    const d = new Date(dateStr + 'T12:00:00');
    return d.toLocaleDateString('es-CO', { day: 'numeric', month: 'long', year: 'numeric' });
  }

  viewBtn.addEventListener('click', () => {
    const ci = checkinInput.value;
    const co = checkoutInput.value;
    const nights = calcNights(ci, co);
    const roomType = document.getElementById('roomType').value;
    const pricePerNight = PRICES[roomType];
    const total = pricePerNight * nights;
    const roomName = ROOM_NAMES[roomType];

    document.getElementById('modalRoomType').textContent = roomName;
    document.getElementById('modalCheckin').textContent = formatDateES(ci);
    document.getElementById('modalCheckout').textContent = formatDateES(co);
    document.getElementById('modalNights').textContent = nights + (nights === 1 ? ' noche' : ' noches');
    document.getElementById('modalGuests').textContent = guests + (guests === 1 ? ' persona' : ' personas');
    document.getElementById('modalPriceNight').textContent = formatCOP(pricePerNight) + ' / noche';
    document.getElementById('modalTotal').textContent = formatCOP(total);

    const msg = `Hola, quiero reservar en Hotel Los Angeles Country:\n` +
      `*Habitación:* ${roomName}\n` +
      `*Check-in:* ${formatDateES(ci)}\n` +
      `*Check-out:* ${formatDateES(co)}\n` +
      `*Noches:* ${nights}\n` +
      `*Huéspedes:* ${guests}\n` +
      `*Total estimado:* ${formatCOP(total)}\n` +
      `¿Hay disponibilidad?`;

    const waUrl = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;
    document.getElementById('modalWaBtn').href = waUrl;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  });

  // Close modal
  document.getElementById('modalClose').addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  /* ── Smooth scroll for nav links ── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

})();
