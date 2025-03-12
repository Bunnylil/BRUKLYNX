// Fetch products and display them dynamically
function fetchAndDisplayProducts() {
  fetch("http://localhost:3000/api/products")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((products) => {
      const productList = document.getElementById("product-list");

      if (!productList) {
        console.error("Product list container not found.");
        return;
      }

      products.forEach((product) => {
        const productDiv = document.createElement("div");
        productDiv.classList.add("product");

        const productLink = document.createElement("a");
        productLink.href = product.productUrl;
        const img = document.createElement("img");
        img.src = product.image;
        img.alt = product.name;
        productLink.appendChild(img);

        const categoryTag = document.createElement("a");
        categoryTag.href = product.categoryUrl;
        categoryTag.classList.add("category-tag");
        categoryTag.textContent = product.category;

        productDiv.appendChild(productLink);
        productDiv.appendChild(categoryTag);

        productList.appendChild(productDiv);
      });
    })
    .catch((error) => console.error("Error fetching products:", error));
}

// Function to fetch and update the image
function fetchAndUpdateImage() {
  fetch("http://localhost:3000/api/image")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.text();
    })
    .then((imageData) => {
      const imgElement = document.getElementById("DrinksImage");
      imgElement.src = imageData; // Set the image source
    })
    .catch((error) => {
      console.error("Error fetching image:", error);
    });
}

// Timer functionality for product offer
function startProductOfferTimer() {
  const productImage = document.getElementById("product-image");
  const daysElement = document.getElementById("days");
  const hoursElement = document.getElementById("hours");
  const minutesElement = document.getElementById("minutes");
  const secondsElement = document.getElementById("seconds");

  fetch("http://localhost:3000/api/product")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      productImage.src = data.imageUrl;
      document.querySelector(".discount").textContent = data.discount;
      startTimer(new Date(data.offerEndsAt));
    })
    .catch((error) => console.error("Error fetching product:", error));

  function startTimer(endTime) {
    const updateTimer = () => {
      const now = new Date();
      const timeDifference = endTime - now;

      if (timeDifference <= 0) {
        clearInterval(timerInterval);
        alert("Offer has expired!");
        return;
      }

      const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor(
        (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
      );
      const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

      daysElement.textContent = String(days).padStart(2, "0");
      hoursElement.textContent = String(hours).padStart(2, "0");
      minutesElement.textContent = String(minutes).padStart(2, "0");
      secondsElement.textContent = String(seconds).padStart(2, "0");
    };

    updateTimer(); // Initial call
    const timerInterval = setInterval(updateTimer, 1000); // Update every second
  }
}

// Hamburger menu toggle functionality
function setupHamburgerMenu() {
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");
  const hamburgerMenu = document.querySelector(".hamburger-menu");

  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
      navLinks.classList.toggle("active");
      const isMenuVisible = hamburgerMenu.style.display === "flex";
      hamburgerMenu.style.display = isMenuVisible ? "none" : "flex";
    });
  }
}

document.getElementById('signupButton').addEventListener('click', async function (event) {
  event.preventDefault(); // Prevent the default link behavior

  const emailInput = document.getElementById('emailInput');
  const errorMessage = document.getElementById('errorMessage');
  const successMessage = document.getElementById('message');

  const email = emailInput.value.trim();

  
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
      errorMessage.textContent = 'Please enter a valid email address.';
      errorMessage.style.display = 'block';
      successMessage.style.display = 'none';
      return;
  }

  try {
      
      const response = await fetch('http://localhost:3000/subscribe', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
          successMessage.textContent = data.message;
          successMessage.style.display = 'block';
          errorMessage.style.display = 'none';
      } else {
          errorMessage.textContent = data.message;
          errorMessage.style.display = 'block';
          successMessage.style.display = 'none';
      }
  } catch (error) {
      console.error('Error:', error);
      errorMessage.textContent = 'An error occurred. Please try again later.';
      errorMessage.style.display = 'block';
      successMessage.style.display = 'none';
  }
});

// Initialize all functionalities when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  fetchAndDisplayProducts();
  fetchAndUpdateImage();
  setInterval(fetchAndUpdateImage, 5000); // Update image every 5 seconds
  startProductOfferTimer();
  setupHamburgerMenu();
  setupEmailSignup();
});