document.addEventListener('DOMContentLoaded', () => {
  // Initialize animations (example)
  const elementsToAnimate = document.querySelectorAll('.fade-in');
  elementsToAnimate.forEach((element) => {
    element.classList.add('animate');
  });

  // Example: Fetch product data (replace with actual data source)
  const products = [
    { id: 1, name: 'Green T-Shirt', description: 'A comfortable green t-shirt.', price: 20 },
    { id: 2, name: 'Olive Pants', description: 'Stylish olive green pants.', price: 45 },
  ];

  // Render product cards (example)
  const productContainer = document.getElementById('product-container'); // Assuming you have a container with this ID

  if (productContainer) {
    products.forEach(product => {
      const productCard = document.createElement('div');
      productCard.classList.add('product-card'); // You'll need corresponding CSS

      productCard.innerHTML = `
          <h3>${product.name}</h3>
          <p>${product.description}</p>
          <p>$${product.price}</p>
          <button class="add-to-cart" data-product-id="${product.id}">Add to Cart</button>
      `;
      productContainer.appendChild(productCard);
    });

    // Add to cart functionality (example)
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
      button.addEventListener('click', (event) => {
        const productId = event.target.dataset.productId;
        console.log(`Added product ${productId} to cart`);
        // Implement actual cart logic here (e.g., store in local storage, update cart counter)
      });
    });
  }

  // Navbar interactions (example)
  const navbarToggle = document.getElementById('navbar-toggle'); // Ensure you have a toggle button
  const navbarMenu = document.getElementById('navbar-menu'); // Ensure you have a menu element

  if (navbarToggle && navbarMenu) {
    navbarToggle.addEventListener('click', () => {
      navbarMenu.classList.toggle('active'); // Toggle a class to show/hide the menu
    });
  }
});