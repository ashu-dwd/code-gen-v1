document.addEventListener('DOMContentLoaded', function() {
  const checkoutForm = document.getElementById('checkout-form');

  if (checkoutForm) {
    checkoutForm.addEventListener('submit', function(event) {
      event.preventDefault();

      const formData = new FormData(checkoutForm);
      const checkoutData = {};

      for (let [key, value] of formData.entries()) {
        checkoutData[key] = value;
      }

      console.log('Checkout Data:', checkoutData);

      // Simulate checkout process
      setTimeout(() => {
        alert('Checkout successful! Thank you for your order.');
        checkoutForm.reset();
      }, 1000); // Simulate processing time
    });
  } else {
    console.error('Checkout form not found.');
  }
});