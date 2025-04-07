document.addEventListener('DOMContentLoaded', function() {
  const menuItems = document.querySelectorAll('.menu-item');
  menuItems.forEach(item => {
    item.addEventListener('click', function() {
      // Example: Show a detailed view or add to order
      console.log(`Selected item: ${this.querySelector('h3').textContent}`);
    });
  });

  const orderForm = document.getElementById('order-form');
  if (orderForm) {
      orderForm.addEventListener('submit', function(event) {
          event.preventDefault();
          // Handle form submission (e.g., send data to server)
          console.log('Order submitted!');
          // Optionally, display a confirmation message
          alert('Order submitted successfully!');
          orderForm.reset();
      });
  }
  // Add more interactive functionalities as needed (e.g., smooth scrolling, dynamic content loading)

  // Example of smooth scrolling to sections
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
          e.preventDefault();

          document.querySelector(this.getAttribute('href')).scrollIntoView({
              behavior: 'smooth'
          });
      });
  });
});