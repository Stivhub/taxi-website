document.addEventListener('DOMContentLoaded', () => {

  // 1. Mobile Menu Toggle
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('active');
    });

    // Close menu when link is clicked
    const links = document.querySelectorAll('.nav-links a');
    links.forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
      });
    });
  }

  // 2. Sticky Navbar & Scroll Effects
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // 3. Scroll Reveal Animation (Intersection Observer)
  const revealElements = document.querySelectorAll('.reveal');

  const revealOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
  };

  const revealObserver = new IntersectionObserver(function (entries, observer) {
    entries.forEach(entry => {
      if (!entry.isIntersecting) {
        return;
      } else {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, revealOptions);

  revealElements.forEach(el => {
    revealObserver.observe(el);
  });

  // 4. Booking Form - Service Toggle & WhatsApp Integration
  var currentService = 'taxi';
  var toggleTaxi = document.getElementById('toggle-taxi');
  var toggleHotel = document.getElementById('toggle-hotel');
  var taxiFields = document.getElementById('taxi-fields');
  var hotelFields = document.getElementById('hotel-fields');
  var bookingBtn = document.getElementById('booking-btn');
  var bookingHeading = document.getElementById('booking-heading');

  function switchService(service) {
    currentService = service;

    // Update toggle buttons
    if (service === 'taxi') {
      toggleTaxi.classList.add('active');
      toggleHotel.classList.remove('active');
      taxiFields.classList.remove('hidden');
      taxiFields.classList.add('visible');
      hotelFields.classList.remove('visible');
      hotelFields.classList.add('hidden');
      bookingBtn.textContent = 'Book Taxi via WhatsApp';
      if (bookingHeading) bookingHeading.textContent = 'Book Your Ride';
    } else {
      toggleHotel.classList.add('active');
      toggleTaxi.classList.remove('active');
      hotelFields.classList.remove('hidden');
      hotelFields.classList.add('visible');
      taxiFields.classList.remove('visible');
      taxiFields.classList.add('hidden');
      bookingBtn.textContent = 'Book Hotel via WhatsApp';
      if (bookingHeading) bookingHeading.textContent = 'Book Your Stay';
    }
  }

  if (toggleTaxi && toggleHotel) {
    toggleTaxi.addEventListener('click', function() { switchService('taxi'); });
    toggleHotel.addEventListener('click', function() { switchService('hotel'); });
  }

  var bookingForm = document.getElementById('main-booking-form');
  if (bookingForm) {
    bookingForm.addEventListener('submit', function(e) {
      e.preventDefault();

      var btn = document.getElementById('booking-btn');
      var status = document.getElementById('booking-status');
      var originalText = btn.textContent;

      // Collect shared fields
      var name = document.getElementById('name').value.trim();
      var phone = document.getElementById('phone').value.trim();

      // Shared validation
      if (!name || !phone) {
        status.style.display = 'block';
        status.style.color = '#c0392b';
        status.textContent = 'Please fill in your name and phone number.';
        setTimeout(function() { status.style.display = 'none'; }, 3000);
        return;
      }

      var message = '';
      var waNumber = '917728057171';

      if (currentService === 'taxi') {
        // Taxi fields
        var pickup = document.getElementById('pickup').value.trim();
        var drop = document.getElementById('drop').value.trim();
        var date = document.getElementById('date').value;
        var type = document.getElementById('type').value;
        var car = document.getElementById('car').value;

        if (!pickup || !drop || !date || !car) {
          status.style.display = 'block';
          status.style.color = '#c0392b';
          status.textContent = 'Please fill in all taxi booking fields.';
          setTimeout(function() { status.style.display = 'none'; }, 3000);
          return;
        }

        message = 'New Cab Booking Request' + '\n\n' +
          'Name: ' + name + '\n' +
          'Phone: ' + phone + '\n' +
          'Pickup: ' + pickup + '\n' +
          'Drop: ' + drop + '\n' +
          'Date: ' + date + '\n' +
          'Trip Type: ' + type + '\n' +
          'Car Type: ' + car;

      } else {
        // Hotel fields
        var checkin = document.getElementById('checkin').value;
        var checkout = document.getElementById('checkout').value;
        var guests = document.getElementById('guests').value;
        var hotelType = document.getElementById('hotel-type').value;
        var requests = document.getElementById('special-requests').value.trim();

        if (!checkin || !checkout || !guests || !hotelType) {
          status.style.display = 'block';
          status.style.color = '#c0392b';
          status.textContent = 'Please fill in all hotel booking fields.';
          setTimeout(function() { status.style.display = 'none'; }, 3000);
          return;
        }

        message = 'New Hotel Booking Request' + '\n\n' +
          'Name: ' + name + '\n' +
          'Phone: ' + phone + '\n' +
          'Check-in: ' + checkin + '\n' +
          'Check-out: ' + checkout + '\n' +
          'Guests: ' + guests + '\n' +
          'Hotel Type: ' + hotelType;

        if (requests) {
          message += '\n' + 'Special Requests: ' + requests;
        }
      }

      var waLink = 'https://wa.me/' + waNumber + '?text=' + encodeURIComponent(message);

      // Button animation: processing state
      btn.textContent = 'Processing...';
      btn.style.opacity = '0.7';
      btn.style.pointerEvents = 'none';

      setTimeout(function() {
        btn.textContent = 'Redirecting to WhatsApp...';
        btn.style.backgroundColor = '#25D366';
        btn.style.opacity = '1';

        status.style.display = 'block';
        status.style.color = '#25D366';
        status.textContent = 'Opening WhatsApp...';

        setTimeout(function() {
          window.open(waLink, '_blank');

          setTimeout(function() {
            btn.textContent = originalText;
            btn.style.backgroundColor = '';
            btn.style.pointerEvents = '';
            status.style.display = 'none';
            bookingForm.reset();
            // Reset to taxi after form submission
            switchService('taxi');
          }, 2000);
        }, 800);

      }, 1000);
    });
  }

  // Contact Form
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = contactForm.querySelector('button');
      btn.textContent = "Message Sent! We will contact you soon.";
      btn.style.backgroundColor = "#25D366";
      setTimeout(() => {
        btn.textContent = "Send Message";
        btn.style.backgroundColor = "";
        contactForm.reset();
      }, 3000);
    });
  }

  // 5. FAQ Accordion Toggle
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (question) {
      question.addEventListener('click', () => {
        // Toggle active class
        item.classList.toggle('active');
        const answer = item.querySelector('.faq-answer');

        // Adjust maxHeight for smooth CSS transition
        if (item.classList.contains('active')) {
          answer.style.maxHeight = answer.scrollHeight + "px";
        } else {
          answer.style.maxHeight = null;
        }
      });
    }
  });
  // 6. Testimonial Carousel
  var track = document.getElementById("testimonial-track");
  var dotsContainer = document.getElementById("carousel-dots");
  var prevBtn = document.getElementById("carousel-prev");
  var nextBtn = document.getElementById("carousel-next");

  if (track && dotsContainer) {
    var cards = track.querySelectorAll(".testimonial-card");
    var totalCards = cards.length;
    var currentIndex = 0;
    var autoSlideTimer = null;

    // Determine how many cards visible based on screen width
    function getVisibleCount() {
      if (window.innerWidth <= 640) return 1;
      if (window.innerWidth <= 1024) return 2;
      return 3;
    }

    // Calculate max index
    function getMaxIndex() {
      var visible = getVisibleCount();
      var max = totalCards - visible;
      return max > 0 ? max : 0;
    }

    // Build dots
    function buildDots() {
      dotsContainer.innerHTML = "";
      var count = getMaxIndex() + 1;
      for (var i = 0; i < count; i++) {
        var dot = document.createElement("button");
        dot.className = "carousel-dot";
        dot.setAttribute("aria-label", "Go to slide " + (i + 1));
        if (i === currentIndex) dot.classList.add("active");
        dot.addEventListener("click", (function(idx) {
          return function() {
            currentIndex = idx;
            updateCarousel();
            resetAutoSlide();
          };
        })(i));
        dotsContainer.appendChild(dot);
      }
    }

    // Update carousel position
    function updateCarousel() {
      var visible = getVisibleCount();
      var maxIdx = getMaxIndex();
      if (currentIndex > maxIdx) currentIndex = 0;
      if (currentIndex < 0) currentIndex = maxIdx;

      var cardWidth = 100 / visible;
      var offset = currentIndex * cardWidth;
      track.style.transform = "translateX(-" + offset + "%)";

      // Update dots
      var dots = dotsContainer.querySelectorAll(".carousel-dot");
      for (var i = 0; i < dots.length; i++) {
        dots[i].classList.remove("active");
      }
      if (dots[currentIndex]) dots[currentIndex].classList.add("active");
    }

    // Auto-slide
    function startAutoSlide() {
      autoSlideTimer = setInterval(function() {
        currentIndex++;
        updateCarousel();
      }, 4000);
    }

    function resetAutoSlide() {
      clearInterval(autoSlideTimer);
      startAutoSlide();
    }

    // Prev / Next buttons
    if (prevBtn) {
      prevBtn.addEventListener("click", function() {
        currentIndex--;
        updateCarousel();
        resetAutoSlide();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", function() {
        currentIndex++;
        updateCarousel();
        resetAutoSlide();
      });
    }

    // Pause on hover
    var carousel = document.getElementById("testimonial-carousel");
    if (carousel) {
      carousel.addEventListener("mouseenter", function() {
        clearInterval(autoSlideTimer);
      });
      carousel.addEventListener("mouseleave", function() {
        startAutoSlide();
      });
    }

    // Handle resize
    window.addEventListener("resize", function() {
      buildDots();
      updateCarousel();
    });

    // Init
    buildDots();
    updateCarousel();
    startAutoSlide();
  }

});
