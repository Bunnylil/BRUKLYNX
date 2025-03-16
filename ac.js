const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});
hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".hamburger");
  const hamburgerMenu = document.querySelector(".hamburger-menu");

  hamburger.addEventListener("click", () => {
    const isMenuVisible = hamburgerMenu.style.display === "flex";
    hamburgerMenu.style.display = isMenuVisible ? "none" : "flex";
  });
});

const images = [
  "images/a (1).png",
  "images/a (2).png",
  "images/a (3).png",
  "images/a (4).png",
  "images/a (5).png",
  "images/a (6).png",
];

let index = 0;
const drinksImage = document.getElementById("DrinksImage");

function changeImage() {
  index = (index + 1) % images.length;
  drinksImage.src = images[index];
}

setInterval(changeImage, 5000);

document.addEventListener("DOMContentLoaded", () => {
  const productImage = document.getElementById("product-image");
  const daysElement = document.getElementById("days");
  const hoursElement = document.getElementById("hours");
  const minutesElement = document.getElementById("minutes");
  const secondsElement = document.getElementById("seconds");

  const images = ["images/a (1).png", "images/a (3).png", "images/a (2).png"];

  let currentImageIndex = 0;

  function updateTimer() {
    const now = new Date();
    const endTime = new Date(now);
    endTime.setHours(24, 0, 0, 0);

    if (now > endTime) {
      endTime.setDate(endTime.getDate() + 1);
    }

    const timeDifference = endTime - now;

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

    if (timeDifference <= 0) {
      currentImageIndex = (currentImageIndex + 1) % images.length;
      productImage.src = images[currentImageIndex];
      endTime.setDate(endTime.getDate() + 1);
    }
  }

  setInterval(updateTimer, 1000);
  updateTimer();
});

document.addEventListener("DOMContentLoaded", function () {
  const addToCartButtons = document.querySelectorAll(".add-to-cart");
  const cartCount = document.getElementById("cart-count");
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  addToCartButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const productElement = button.closest(".product");
      const productId = productElement.getAttribute("data-id");
      const productName = productElement.querySelector("h3").innerText;
      const productPrice = productElement.querySelector(".price").innerText;

      const product = {
        id: productId,
        name: productName,
        price: productPrice,
      };

      cart.push(product);
      localStorage.setItem("cart", JSON.stringify(cart));
      cartCount.innerText = cart.length;
      alert(`${productName} added to cart!`);
    });
  });

  cartCount.innerText = cart.length;

  const emailInput = document.getElementById("emailInput");
  const signupButton = document.getElementById("signupButton");
  const message = document.getElementById("message");
  const errorMessage = document.getElementById("errorMessage");

  signupButton.addEventListener("click", function (e) {
    e.preventDefault();
    const email = emailInput.value;

    if (validateEmail(email)) {
      message.style.display = "block";
      message.innerText = "Thank you for subscribing!";
      errorMessage.style.display = "none";
      emailInput.value = "";
    } else {
      errorMessage.style.display = "block";
      errorMessage.innerText = "Please enter a valid email address.";
      message.style.display = "none";
    }
  });

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };
});
