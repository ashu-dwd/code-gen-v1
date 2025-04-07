document.addEventListener('DOMContentLoaded', function() {
  const addToCartButtons = document.querySelectorAll('.add-to-cart');
  const cartItemsContainer = document.getElementById('cart-items');
  const cartTotalElement = document.getElementById('cart-total');
  const menuSection = document.getElementById('menu');
  const contactForm = document.getElementById('contact-form');

  let cart = [];

  function updateCartDisplay() {
    cartItemsContainer.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
      const cartItemElement = document.createElement('div');
      cartItemElement.classList.add('cart-item');
      cartItemElement.innerHTML = `
        <span>${item.name}</span>
        <span>$${item.price.toFixed(2)}</span>
      `;
      cartItemsContainer.appendChild(cartItemElement);
      total += item.price;
    });

    cartTotalElement.textContent = total.toFixed(2);
  }

  addToCartButtons.forEach(button => {
    button.addEventListener('click', function() {
      const pizzaName = this.parentNode.querySelector('h3').textContent;
      const pizzaPrice = parseFloat(this.parentNode.querySelector('.price').textContent.slice(1));

      const item = { name: pizzaName, price: pizzaPrice };
      cart.push(item);
      updateCartDisplay();
    });
  });


  if (menuSection) {
        // Example: Adding a simple animation on scroll
        window.addEventListener('scroll', () => {
            if (isElementInViewport(menuSection)) {
                menuSection.classList.add('menu-visible');
            } else {
                 menuSection.classList.remove('menu-visible');
            }
        });
    }


    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            // Basic form validation (can be improved)
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const messageInput = document.getElementById('message');

            if (!nameInput.value || !emailInput.value || !messageInput.value) {
                alert('Please fill in all fields.');
                return;
            }

            // Simulate form submission (replace with actual API call)
            alert('Form submitted successfully!');
            contactForm.reset();
        });
    }
});