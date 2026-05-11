/* ═══ Hotel Los Angeles Country ═══ */
(function () {
  'use strict';

  var WA_NUMBER = '573023022707';

  /* ── Pricing rules ──
   * 1 room for 1 person  = 50,000 COP / night
   * 1 room for 2 persons = 60,000 COP / night
   * Max 2 persons per room. 3+ guests => auto-increase rooms.
   * Max 8 guests total (6 rooms max).
   */
  var PRICE_SINGLE = 50000; // 1 person in a room
  var PRICE_DOUBLE = 60000; // 2 persons in a room
  var MAX_GUESTS = 8;
  var MAX_ROOMS = 6;
  var MAX_PER_ROOM = 2;

  var fpInstance = null;
  var fpInlineInstance = null;

  /* ── i18n translations ── */
  var TRANSLATIONS = {
    es: {
      skip: 'Saltar al contenido principal',
      menu: 'MENÚ',
      book: 'Reservar',
      nav_home: 'Inicio',
      nav_about: 'Nosotros',
      nav_rooms: 'Habitaciones',
      nav_popayan: 'Popayán',
      nav_location: 'Ubicación',
      hero_eyebrow: 'Popayán · Cauca · Colombia',
      hero_tagline_full: 'Su refugio en el corazón de <em>Popayán</em>',
      hero_subtitle: 'Confort, tranquilidad y la mejor ubicación para descubrir la Ciudad Blanca de Colombia.',
      hero_btn: 'Descubrir habitaciones',
      discover: 'Descubrir',
      booking_title: 'Reserva ahora',
      book_now_short: 'Reserva ahora',
      room_individual: 'Habitación Individual',
      room_doble: 'Habitación Doble',
      room_confort: 'Habitación Confort',
      roomTypeDesc: 'Seleccione el tipo de habitación',
      arrival: 'Llegada',
      departure: 'Salida',
      month_placeholder: 'Mes',
      year_placeholder: 'Año',
      checkinDesc: 'Seleccione fecha de llegada',
      checkoutDesc: 'Seleccione fecha de salida',
      guests: 'Huéspedes',
      rooms_label: 'Habitaciones',
      estimated_total: 'Total estimado',
      view_rooms: 'Reservar ahora',
      about_eyebrow: 'Bienvenidos',
      about_title: 'Un lugar pensado para su comodidad',
      about_desc_1: 'Hotel Los Angeles Country le ofrece 6 habitaciones confortables, cada una con baño privado y la mejor atención personalizada. Nuestro hotel semifamiliar es ideal para estadías cortas, pasadías o alojamiento mientras visita los centros médicos cercanos.',
      about_desc_2: 'Ubicados en la Carrera 6 #16N-30, estamos a pocos minutos del centro histórico de Popayán, la Galería Bolívar, y los principales centros hospitalarios de la ciudad.',
      feat_rooms: '6 Habitaciones privadas',
      feat_hospitals: 'Cerca a hospitales',
      feat_service: 'Excelente atención',
      feat_location: 'Ubicación céntrica',
      rooms_eyebrow: 'Alojamiento',
      rooms_title: 'Nuestras Habitaciones',
      rooms_subtitle: 'Habitaciones limpias y confortables con baño privado, pensadas para su descanso y bienestar.',
      room_price_ind: 'Desde $50.000 COP / noche',
      room_details_ind: 'Baño privado · 1 persona · WiFi disponible',
      room_price_doble: 'Desde $60.000 COP / noche',
      room_details_doble: 'Baño privado · 2 personas · Cama doble',
      room_price_confort: 'Desde $60.000 COP / noche',
      room_details_confort: 'Baño privado · Pareja · Ambiente tranquilo',
      cta_title: '¿Listo para su estadía en Popayán?',
      cta_text: 'Contáctenos directamente y reserve su habitación hoy mismo.',
      footer_copy: '© 2026 Hotel Los Angeles Country. Todos los derechos reservados.',
      lang_label: 'Idioma',
      night_singular: 'noche',
      night_plural: 'noches',
      guest_singular: 'persona',
      guest_plural: 'personas',
      room_singular: 'habitación',
      room_plural: 'habitaciones',
      price_per_room_night: '/ hab / noche'
    },
    en: {
      skip: 'Skip to main content',
      menu: 'MENU',
      book: 'Book Now',
      nav_home: 'Home',
      nav_about: 'About',
      nav_rooms: 'Rooms',
      nav_popayan: 'Popayán',
      nav_location: 'Location',
      hero_eyebrow: 'Popayán · Cauca · Colombia',
      hero_tagline_full: 'Your retreat in the heart of <em>Popayán</em>',
      hero_subtitle: 'Comfort, tranquility and the best location to discover the White City of Colombia.',
      hero_btn: 'Discover rooms',
      discover: 'Discover',
      booking_title: 'Book Now',
      book_now_short: 'Book Now',
      room_individual: 'Single Room',
      room_doble: 'Double Room',
      room_confort: 'Comfort Room',
      roomTypeDesc: 'Select room type',
      arrival: 'Arrival',
      departure: 'Departure',
      month_placeholder: 'Month',
      year_placeholder: 'Year',
      checkinDesc: 'Select arrival date',
      checkoutDesc: 'Select departure date',
      guests: 'Guests',
      rooms_label: 'Rooms',
      estimated_total: 'Estimated total',
      view_rooms: 'Book Now',
      about_eyebrow: 'Welcome',
      about_title: 'A place designed for your comfort',
      about_desc_1: 'Hotel Los Angeles Country offers 6 comfortable rooms, each with private bathroom and excellent personalized attention. Our semi-family hotel is ideal for short stays or accommodation while visiting nearby medical centers.',
      about_desc_2: 'Located at Carrera 6 #16N-30, we are just minutes from Popayan\'s historic center, Bolivar Market, and the city\'s main hospital centers.',
      feat_rooms: '6 Private rooms',
      feat_hospitals: 'Near hospitals',
      feat_service: 'Excellent service',
      feat_location: 'Central location',
      rooms_eyebrow: 'Accommodation',
      rooms_title: 'Our Rooms',
      rooms_subtitle: 'Clean and comfortable rooms with private bathroom, designed for your rest and well-being.',
      room_price_ind: 'From $50,000 COP / night',
      room_details_ind: 'Private bathroom · 1 person · WiFi available',
      room_price_doble: 'From $60,000 COP / night',
      room_details_doble: 'Private bathroom · 2 people · Double bed',
      room_price_confort: 'From $60,000 COP / night',
      room_details_confort: 'Private bathroom · Couples · Quiet atmosphere',
      cta_title: 'Ready for your stay in Popayán?',
      cta_text: 'Contact us directly and book your room today.',
      footer_copy: '© 2026 Hotel Los Angeles Country. All rights reserved.',
      lang_label: 'Language',
      night_singular: 'night',
      night_plural: 'nights',
      guest_singular: 'guest',
      guest_plural: 'guests',
      room_singular: 'room',
      room_plural: 'rooms',
      price_per_room_night: '/ room / night'
    }
  };

  var currentLang = 'es';

  function applyTranslations(lang) {
    var t = TRANSLATIONS[lang];
    if (!t) return;
    currentLang = lang;
    document.documentElement.lang = lang;

    /* data-i18n elements */
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      if (t[key] !== undefined) el.textContent = t[key];
    });

    /* data-i18n-html elements */
    document.querySelectorAll('[data-i18n-html]').forEach(function (el) {
      var key = el.getAttribute('data-i18n-html');
      if (t[key] !== undefined) el.innerHTML = t[key];
    });

    /* update visual dates immediately on switch */
    updateVisualDates();
    updatePriceEstimate();

    /* lang buttons state */
    document.querySelectorAll('.nav-lang-btn').forEach(function (btn) {
      var active = btn.id === 'lang' + lang.charAt(0).toUpperCase() + lang.slice(1);
      btn.classList.toggle('active', active);
      btn.setAttribute('aria-pressed', String(active));
    });

    /* Flatpickr language swap */
    if (typeof flatpickr !== 'undefined') {
      var loc = (lang === 'en') ? 'default' : (flatpickr.l10ns[lang] || 'default');
      if (fpInstance) fpInstance.set('locale', loc);
      if (fpInlineInstance) fpInlineInstance.set('locale', loc);
    }
  }

  /* Wire lang buttons */
  var btnLangEs = document.getElementById('langEs');
  var btnLangEn = document.getElementById('langEn');
  if (btnLangEs) btnLangEs.addEventListener('click', function () { applyTranslations('es'); });
  if (btnLangEn) btnLangEn.addEventListener('click', function () { applyTranslations('en'); });


  /* ── Nav scroll ── */
  var nav = document.querySelector('.nav');
  if (nav) {
    var handleScroll = function () {
      nav.classList.toggle('scrolled', window.scrollY > window.innerHeight * 0.3);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // run immediately
  }

  /* ── Mobile menu ── */
  var hamburger = document.getElementById('hamburger');
  var mobileMenu = document.getElementById('mobileMenu');
  var mobileClose = document.getElementById('mobileClose');

  function openMobileMenu() {
    if (!mobileMenu) return;
    mobileMenu.classList.add('active');
    document.body.classList.add('menu-active');
    if (hamburger) hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    var firstLink = mobileMenu.querySelector('a');
    if (firstLink) firstLink.focus();
  }

  function closeMobileMenu() {
    if (!mobileMenu) return;
    mobileMenu.classList.remove('active');
    document.body.classList.remove('menu-active');
    if (hamburger) hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  function toggleMobileMenu() {
    if (!mobileMenu) return;
    var isActive = mobileMenu.classList.contains('active');
    if (isActive) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  }

  var navLogo = document.querySelector('.nav-logo');

  if (hamburger) hamburger.addEventListener('click', toggleMobileMenu);
  if (mobileClose) mobileClose.addEventListener('click', closeMobileMenu);
  if (navLogo) navLogo.addEventListener('click', closeMobileMenu);
  if (mobileMenu) {
    mobileMenu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', closeMobileMenu);
    });
  }

  /* ── Hero loaded ── */
  window.addEventListener('load', function () {
    var hero = document.querySelector('.hero');
    if (hero) hero.classList.add('loaded');
  });

  /* ── Scroll reveal ── */
  var reveals = document.querySelectorAll('.reveal');
  if (reveals.length) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) e.target.classList.add('visible');
      });
    }, { threshold: 0.15 });
    reveals.forEach(function (el) { revealObserver.observe(el); });
  }

  /* ── Booking State ── */
  var guests = 1;
  var rooms = 1;

  var guestCountEl = document.getElementById('guestCount');
  var btnGuestMinus = document.getElementById('guestMinus');
  var btnGuestPlus = document.getElementById('guestPlus');

  var roomCountEl = document.getElementById('roomCount');
  var btnRoomMinus = document.getElementById('roomMinus');
  var btnRoomPlus = document.getElementById('roomPlus');

  /* Calculate minimum rooms needed for N guests */
  function minRoomsForGuests(g) {
    return Math.ceil(g / MAX_PER_ROOM);
  }

  /* Calculate price per room per night based on occupancy */
  function calcPriceBreakdown(totalGuests, totalRooms) {
    // Distribute guests across rooms as evenly as possible
    // Rooms with 2 guests cost 60K, rooms with 1 guest cost 50K
    var roomsWith2 = totalGuests - totalRooms; // how many rooms get a 2nd guest
    if (roomsWith2 < 0) roomsWith2 = 0;
    var roomsWith1 = totalRooms - roomsWith2;

    var totalPerNight = (roomsWith2 * PRICE_DOUBLE) + (roomsWith1 * PRICE_SINGLE);
    return {
      totalPerNight: totalPerNight,
      roomsWith1: roomsWith1,
      roomsWith2: roomsWith2
    };
  }

  function updateGuestAndRoomUI() {
    if (guestCountEl) guestCountEl.textContent = guests;
    if (roomCountEl) roomCountEl.textContent = rooms;

    // Button states
    if (btnGuestMinus) btnGuestMinus.disabled = guests <= 1;
    if (btnGuestPlus) btnGuestPlus.disabled = guests >= MAX_GUESTS;
    if (btnRoomMinus) btnRoomMinus.disabled = rooms <= minRoomsForGuests(guests);
    if (btnRoomPlus) btnRoomPlus.disabled = rooms >= MAX_ROOMS || rooms >= guests;

    updatePriceEstimate();
  }

  // Guest counter
  if (btnGuestMinus) {
    btnGuestMinus.addEventListener('click', function () {
      if (guests > 1) {
        guests--;
        // Auto-reduce rooms if we have more than needed
        var minR = minRoomsForGuests(guests);
        // Keep rooms at least at min, but don't force down if user manually set higher
        // unless rooms > guests (can't have more rooms than guests)
        if (rooms > guests) rooms = guests;
        if (rooms < minR) rooms = minR;
        updateGuestAndRoomUI();
      }
    });
  }

  if (btnGuestPlus) {
    btnGuestPlus.addEventListener('click', function () {
      if (guests < MAX_GUESTS) {
        guests++;
        // Auto-increase rooms if needed
        var minR = minRoomsForGuests(guests);
        if (rooms < minR) rooms = minR;
        // Check room cap
        if (rooms > MAX_ROOMS) rooms = MAX_ROOMS;
        updateGuestAndRoomUI();
      }
    });
  }

  // Room counter
  if (btnRoomMinus) {
    btnRoomMinus.addEventListener('click', function () {
      var minR = minRoomsForGuests(guests);
      if (rooms > minR) {
        rooms--;
        updateGuestAndRoomUI();
      }
    });
  }

  if (btnRoomPlus) {
    btnRoomPlus.addEventListener('click', function () {
      // Can't have more rooms than guests or more than MAX_ROOMS
      if (rooms < MAX_ROOMS && rooms < guests) {
        rooms++;
        updateGuestAndRoomUI();
      }
    });
  }

  /* ── Set default dates & Flatpickr ── */
  var checkinInput = document.getElementById('checkin');
  var checkoutInput = document.getElementById('checkout');
  var dateContainer = document.getElementById('dateRangeContainer');
  var fpTrigger = document.getElementById('flatpickrTrigger');
  var calendarInline = document.getElementById('calendarInline');

  function formatDate(d) {
    var year = d.getFullYear();
    var month = String(d.getMonth() + 1).padStart(2, '0');
    var day = String(d.getDate()).padStart(2, '0');
    return year + '-' + month + '-' + day;
  }

  /* ── Update Visual Lux Dates ── */
  var MONTH_NAMES = {
    es: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
    en: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  };

  function updateVisualDates() {
    if (!checkinInput || !checkoutInput || !checkinInput.value || !checkoutInput.value) return;

    var partsIn = checkinInput.value.split('-');
    var dIn = new Date(partsIn[0], partsIn[1] - 1, partsIn[2]);

    var partsOut = checkoutInput.value.split('-');
    var dOut = new Date(partsOut[0], partsOut[1] - 1, partsOut[2]);

    var mon = MONTH_NAMES[currentLang] || MONTH_NAMES['es'];

    var elInDay = document.getElementById('visualInDay');
    var elInMonth = document.getElementById('visualInMonth');
    var elInYear = document.getElementById('visualInYear');
    var elOutDay = document.getElementById('visualOutDay');
    var elOutMonth = document.getElementById('visualOutMonth');
    var elOutYear = document.getElementById('visualOutYear');

    if (!isNaN(dIn.getTime()) && elInDay && elInMonth && elInYear) {
      elInDay.textContent = dIn.getDate() + '.';
      elInMonth.textContent = mon[dIn.getMonth()];
      elInYear.textContent = dIn.getFullYear();
    }
    if (!isNaN(dOut.getTime()) && elOutDay && elOutMonth && elOutYear) {
      elOutDay.textContent = dOut.getDate() + '.';
      elOutMonth.textContent = mon[dOut.getMonth()];
      elOutYear.textContent = dOut.getFullYear();
    }
  }

  /* ── Price estimate in widget ── */
  function updatePriceEstimate() {
    var ci = checkinInput ? checkinInput.value : '';
    var co = checkoutInput ? checkoutInput.value : '';
    var nights = 1;
    if (ci && co) {
      nights = calcNights(ci, co);
    }

    var breakdown = calcPriceBreakdown(guests, rooms);
    var total = breakdown.totalPerNight * nights;

    var estimateEl = document.getElementById('priceEstimateValue');
    if (estimateEl) {
      estimateEl.textContent = formatCOP(total);
    }
  }

  /* Helper: detect if we are on desktop */
  function isDesktop() {
    return window.innerWidth > 968;
  }

  function handleDateSelection(selectedDates) {
    if (selectedDates.length === 2) {
      checkinInput.value = formatDate(selectedDates[0]);
      checkoutInput.value = formatDate(selectedDates[1]);
      updateVisualDates();
      updatePriceEstimate();
      var calBox = document.getElementById('calendarBox');
      if (calBox) {
        calBox.classList.remove('active');
      }
    }
  }

  if (typeof flatpickr !== 'undefined' && fpTrigger) {
    var today = new Date();
    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    // Default hidden input load
    checkinInput.value = formatDate(today);
    checkoutInput.value = formatDate(tomorrow);
    updateVisualDates();

    // Desktop: inline 2-month calendar
    if (isDesktop() && calendarInline) {
      fpInlineInstance = flatpickr(calendarInline, {
        mode: "range",
        minDate: "today",
        dateFormat: "Y-m-d",
        defaultDate: [today, tomorrow],
        showMonths: 1,
        inline: true,
        locale: typeof flatpickr.l10ns !== 'undefined' ? flatpickr.l10ns.es : "default",
        onChange: handleDateSelection
      });
    }

    // Mobile fallback: popup picker (also used by date cards click)
    fpInstance = flatpickr(fpTrigger, {
      mode: "range",
      minDate: "today",
      dateFormat: "Y-m-d",
      defaultDate: [today, tomorrow],
      showMonths: 1,
      position: isDesktop() ? "left" : "above",
      locale: typeof flatpickr.l10ns !== 'undefined' ? flatpickr.l10ns.es : "default",
      onClose: function (selectedDates) {
        handleDateSelection(selectedDates);
        // Sync inline picker if desktop
        if (fpInlineInstance && selectedDates.length === 2) {
          fpInlineInstance.setDate(selectedDates, false);
        }
      },
      onChange: function (selectedDates) {
        handleDateSelection(selectedDates);
      }
    });

    // On date cards click, open the popup picker (mobile) or focus inline (desktop)
    if (dateContainer) {
      dateContainer.addEventListener('click', function (e) {
        if (!isDesktop()) {
          fpInstance.open();
        } else {
          var calBox = document.getElementById('calendarBox');
          if (calBox) {
            calBox.classList.toggle('active');
            e.stopPropagation();
          }
        }
      });
    }
    
    // Close desktop calendar when clicking outside
    document.addEventListener('click', function(e) {
      var calBox = document.getElementById('calendarBox');
      if (calBox && calBox.classList.contains('active')) {
        if (!calBox.contains(e.target) && (!dateContainer || !dateContainer.contains(e.target))) {
          calBox.classList.remove('active');
        }
      }
    });
  }

  // Initial UI state
  updateGuestAndRoomUI();
  updatePriceEstimate();

  /* ── Booking modal ── */
  var modal = document.getElementById('bookingModal');
  var viewBtn = document.getElementById('viewRoomsBtn');

  function calcNights(ci, co) {
    var d1 = new Date(ci);
    var d2 = new Date(co);
    return Math.max(1, Math.round((d2 - d1) / 86400000));
  }

  function formatCOP(n) {
    return new Intl.NumberFormat(currentLang === 'en' ? 'en-US' : 'es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(n);
  }

  function formatDateLocalized(dateStr) {
    var d = new Date(dateStr + 'T12:00:00');
    var locale = currentLang === 'en' ? 'en-US' : 'es-CO';
    return d.toLocaleDateString(locale, { day: 'numeric', month: 'long', year: 'numeric' });
  }

  if (viewBtn && modal) {
    viewBtn.addEventListener('click', function (e) {
      e.preventDefault();
      var ci = checkinInput ? checkinInput.value : '';
      var co = checkoutInput ? checkoutInput.value : '';
      if (!ci || !co) return;

      var t = TRANSLATIONS[currentLang];
      var nights = calcNights(ci, co);
      var breakdown = calcPriceBreakdown(guests, rooms);
      var totalPerNight = breakdown.totalPerNight;
      var total = totalPerNight * nights;

      var elCheckin = document.getElementById('modalCheckin');
      var elCheckout = document.getElementById('modalCheckout');
      var elNights = document.getElementById('modalNights');
      var elGuests = document.getElementById('modalGuests');
      var elRooms = document.getElementById('modalRooms');
      var elPriceNight = document.getElementById('modalPriceNight');
      var elTotal = document.getElementById('modalTotal');

      if (elCheckin) elCheckin.textContent = formatDateLocalized(ci);
      if (elCheckout) elCheckout.textContent = formatDateLocalized(co);
      if (elNights) elNights.textContent = nights + ' ' + (nights === 1 ? t.night_singular : t.night_plural);
      if (elGuests) elGuests.textContent = guests + ' ' + (guests === 1 ? t.guest_singular : t.guest_plural);
      if (elRooms) elRooms.textContent = rooms + ' ' + (rooms === 1 ? t.room_singular : t.room_plural);
      if (elPriceNight) elPriceNight.textContent = formatCOP(totalPerNight) + ' ' + t.price_per_room_night;
      if (elTotal) elTotal.textContent = formatCOP(total);

      var isEn = currentLang === 'en';
      var msg = isEn ?
        'Hello, I would like to book at Hotel Los Angeles Country:\n' +
        '*Check-in:* ' + formatDateLocalized(ci) + '\n' +
        '*Check-out:* ' + formatDateLocalized(co) + '\n' +
        '*Nights:* ' + nights + '\n' +
        '*Guests:* ' + guests + '\n' +
        '*Rooms:* ' + rooms + '\n' +
        '*Estimated Total:* ' + formatCOP(total) + '\n' +
        'Is availability confirmed?'
        :
        'Hola, quiero reservar en Hotel Los Angeles Country:\n' +
        '*Check-in:* ' + formatDateLocalized(ci) + '\n' +
        '*Check-out:* ' + formatDateLocalized(co) + '\n' +
        '*Noches:* ' + nights + '\n' +
        '*Huéspedes:* ' + guests + '\n' +
        '*Habitaciones:* ' + rooms + '\n' +
        '*Total estimado:* ' + formatCOP(total) + '\n' +
        '¿Hay disponibilidad?';

      var waBtn = document.getElementById('modalWaBtn');
      if (waBtn) waBtn.href = 'https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(msg);

      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
      trapFocus(modal);
    });
  }

  /* ── Close modal ── */
  function closeModal() {
    if (!modal) return;
    modal.classList.remove('active');
    document.body.style.overflow = '';
    if (viewBtn) viewBtn.focus();
  }

  var modalClose = document.getElementById('modalClose');
  if (modalClose) modalClose.addEventListener('click', closeModal);
  if (modal) modal.addEventListener('click', function (e) { if (e.target === modal) closeModal(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeModal(); });

  /* ── Focus trap for modal ── */
  function trapFocus(element) {
    var focusable = element.querySelectorAll('a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])');
    if (!focusable.length) return;
    var first = focusable[0];
    var last = focusable[focusable.length - 1];

    function handler(e) {
      if (e.key !== 'Tab') return;
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last.focus(); }
      } else {
        if (document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    }
    element.addEventListener('keydown', handler);
    first.focus();
  }

  /* ── Smooth scroll for nav links ── */
  document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var href = this.getAttribute('href');
      if (!href || href === '#') return;
      var target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        if (typeof prefersReducedMotion !== 'undefined' && prefersReducedMotion) {
          target.scrollIntoView();
        } else {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });

})();
