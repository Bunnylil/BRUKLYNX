// Fetch products and display them dynamically
function fetchAndDisplayProducts() {
  fetch('http://localhost:3000/api/products')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(products => {
      const productList = document.getElementById('product-list');

      if (!productList) {
        console.error('Product list container not found.');
        return;
      }

      products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');

        const productLink = document.createElement('a');
        productLink.href = product.productUrl;
        const img = document.createElement('img');
        img.src = product.image;
        img.alt = product.name;
        productLink.appendChild(img);

        const categoryTag = document.createElement('a');
        categoryTag.href = product.categoryUrl;
        categoryTag.classList.add('category-tag');
        categoryTag.textContent = product.category;

        productDiv.appendChild(productLink);
        productDiv.appendChild(categoryTag);

        productList.appendChild(productDiv);
      });
    })
    .catch(error => console.error('Error fetching products:', error));
}

// Function to fetch and update the image
function fetchAndUpdateImage() {
  fetch('http://localhost:3000/api/image')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.text();
    })
    .then(imageData => {
      const imgElement = document.getElementById('DrinksImage');
      imgElement.src = imageData; // Set the image source
    })
    .catch(error => {
      console.error('Error fetching image:', error);
    });
}

// Fetch and update the image immediately
fetchAndUpdateImage();

// Set an interval to fetch and update the image every 5 seconds
setInterval(fetchAndUpdateImage, 5000); // 5000 milliseconds = 5 seconds

// Timer functionality for product offer
function startProductOfferTimer() {
  const productImage = document.getElementById('product-image');
  const daysElement = document.getElementById('days');
  const hoursElement = document.getElementById('hours');
  const minutesElement = document.getElementById('minutes');
  const secondsElement = document.getElementById('seconds');

  fetch('http://localhost:3000/api/product')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      productImage.src = data.imageUrl;
      document.querySelector('.discount').textContent = data.discount;
      startTimer(new Date(data.offerEndsAt));
    })
    .catch(error => console.error('Error fetching product:', error));

  function startTimer(endTime) {
    const updateTimer = () => {
      const now = new Date();
      const timeDifference = endTime - now;

      if (timeDifference <= 0) {
        clearInterval(timerInterval);
        alert('Offer has expired!');
        return;
      }

      const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

      daysElement.textContent = String(days).padStart(2, '0');
      hoursElement.textContent = String(hours).padStart(2, '0');
      minutesElement.textContent = String(minutes).padStart(2, '0');
      secondsElement.textContent = String(seconds).padStart(2, '0');
    };

    updateTimer(); // Initial call
    const timerInterval = setInterval(updateTimer, 1000); // Update every second
  }
}

// Hamburger menu toggle functionality
function setupHamburgerMenu() {
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  const hamburgerMenu = document.querySelector('.hamburger-menu');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      const isMenuVisible = hamburgerMenu.style.display === 'flex';
      hamburgerMenu.style.display = isMenuVisible ? 'none' : 'flex';
    });
  }
}

// Email signup validation functionality
function setupEmailSignup() {
  const emailInput = document.getElementById('emailInput');
  const signupButton = document.getElementById('signupButton');
  const message = document.getElementById('message');
  const errorMessage = document.getElementById('errorMessage');

  if (signupButton) {
    signupButton.addEventListener('click', e => {
      e.preventDefault();
      const email = emailInput.value;

      if (validateEmail(email)) {
        message.style.display = 'block';
        message.textContent = 'Thank you for subscribing!';
        errorMessage.style.display = 'none';
        emailInput.value = '';

        setTimeout(() => {
          message.style.display = 'none';
        }, 3000);
      } else {
        errorMessage.style.display = 'block';
        errorMessage.textContent = 'Please enter a valid email address.';
        message.style.display = 'none';
      }
    });
  }

  const validateEmail = email => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };
}

// Initialize all functionalities when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  fetchAndDisplayProducts();
  fetchAndRotateImages();
  startProductOfferTimer();
  setupHamburgerMenu();
  setupEmailSignup();
});