document.addEventListener('DOMContentLoaded', function() {
  // Smooth scrolling for navigation links
  const navLinks = document.querySelectorAll('nav a');
  navLinks.forEach(link => {
    link.addEventListener('click', smoothScroll);
  });

  function smoothScroll(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 50, // Adjust for header height if needed
        behavior: 'smooth'
      });
    }
  }

  // Highlight active section in navigation (basic implementation)
  window.addEventListener('scroll', highlightNavigation);

  function highlightNavigation() {
    const scrollPosition = window.scrollY;

    document.querySelectorAll('section').forEach(section => {
      const sectionTop = section.offsetTop - 60; // Account for header height
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      const navLink = document.querySelector(`nav a[href="#${sectionId}"]`);

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        if (navLink) {
          document.querySelectorAll('nav a').forEach(link => link.classList.remove('active'));
          navLink.classList.add('active');
        }
      } else {
        if (navLink) {
          navLink.classList.remove('active');
        }
      }
    });
  }

  // Basic form validation (example)
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      let isValid = true;
      const nameInput = document.getElementById('name');
      const emailInput = document.getElementById('email');
      const messageInput = document.getElementById('message');

      if (!nameInput.value.trim()) {
        alert('Please enter your name.');
        isValid = false;
      }

      if (!emailInput.value.trim()) {
        alert('Please enter your email.');
        isValid = false;
      } else if (!isValidEmail(emailInput.value.trim())) {
        alert('Please enter a valid email address.');
        isValid = false;
      }

      if (!messageInput.value.trim()) {
        alert('Please enter your message.');
        isValid = false;
      }

      if (!isValid) {
        e.preventDefault();
      }
    });
  }

  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
});