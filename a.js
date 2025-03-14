const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});
hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });
  
  document.addEventListener('DOMContentLoaded', () => {
          const hamburger = document.querySelector('.hamburger');
          const hamburgerMenu = document.querySelector('.hamburger-menu');
  
          hamburger.addEventListener('click', () => {
              const isMenuVisible = hamburgerMenu.style.display === 'flex';
              hamburgerMenu.style.display = isMenuVisible ? 'none' : 'flex';
          });
      });



document.addEventListener('DOMContentLoaded', function () {
    const addToBasketButton = document.getElementById('add-to-basket');
    const buyNowButton = document.getElementById('buy-now');
    const cartIcon = document.getElementById('cart-icon');
    const mainImage = document.getElementById('main-image');
    const colorCircles = document.querySelectorAll('.color-circle');
    const thumbnails = document.querySelectorAll('.thumbnail');
    let cart = JSON.parse(localStorage.getItem('cart')) || []; 

    
    function updateCartIcon() {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartIcon.setAttribute('data-count', totalItems); 
    }

    
    function updateBuyNowButtonAndImage(drinkType, imageSrc, price) {
        buyNowButton.innerText = `Buy Now - ${drinkType}`;
        buyNowButton.setAttribute('data-product-name', drinkType);
        buyNowButton.setAttribute('data-product-image', imageSrc);
        buyNowButton.setAttribute('data-product-price', price);
        mainImage.src = imageSrc; 
    }

    // Add click event listeners to color circles
    colorCircles.forEach(circle => {
        circle.addEventListener('click', function () {
            const drinkType = this.getAttribute('data-drink-type');
            const imageSrc = this.getAttribute('data-image');
            const price = parseFloat(this.getAttribute('data-price')); 
            updateBuyNowButtonAndImage(drinkType, imageSrc, price);
        });
    });

   
    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', function () {
            const drinkType = this.getAttribute('data-drink-type');
            const imageSrc = this.src; 
            const price = parseFloat(this.getAttribute('data-price')); 
            updateBuyNowButtonAndImage(drinkType, imageSrc, price);
        });
    });

    
    addToBasketButton.addEventListener('click', function () {
        
        const productName = buyNowButton.getAttribute('data-product-name');
        const productPrice = parseFloat(buyNowButton.getAttribute('data-product-price'));
        const productImage = buyNowButton.getAttribute('data-product-image');

        // Create a product object
        const product = {
            name: productName,
            price: productPrice,
            image: productImage,
            quantity: 1 
        };

        
        const existingProduct = cart.find(item => item.name === product.name);
        if (existingProduct) {
            existingProduct.quantity += 1; 
        } else {
            cart.push(product); 
        }

       
        localStorage.setItem('cart', JSON.stringify(cart));

        // Update the cart icon
        updateCartIcon();

       
        alert(`${product.name} added to cart!`);
    });

  
    updateCartIcon();
});

document.addEventListener("DOMContentLoaded", () => {
    const productImage = document.getElementById("product-image");
    const daysElement = document.getElementById("days");
    const hoursElement = document.getElementById("hours");
    const minutesElement = document.getElementById("minutes");
    const secondsElement = document.getElementById("seconds");

    const images = [
      "images/a (1).png",
      "images/a (3).png",
      "images/a (2).png",
      
    ];

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
      const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
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



const emailInput = document.getElementById('emailInput');
const signupButton = document.getElementById('signupButton');
const message = document.getElementById('message');
const errorMessage = document.getElementById('errorMessage');

const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};

emailInput.addEventListener('keyup', () => {
    if (validateEmail(emailInput.value)) {
        errorMessage.style.display = 'none';
    }
});

signupButton.addEventListener('click', function (e) {
    e.preventDefault();
    const email = emailInput.value.trim();

    if (validateEmail(email)) {
        message.style.display = 'block';
        message.innerText = 'Thank you for subscribing!';
        errorMessage.style.display = 'none';
        emailInput.value = '';
    } else {
        errorMessage.style.display = 'block';
        errorMessage.innerText = 'Please enter a valid email address.';
        message.style.display = 'none';
    }
});
document.addEventListener("DOMContentLoaded", function () {
    const circles = document.querySelectorAll(".color-circle");

    circles.forEach(circle => {
        circle.addEventListener("click", function () {
            
            circles.forEach(c => c.classList.remove("selected"));
            
            
            this.classList.add("selected");
        });
    });
});

// Global variable to store the selected product details
let selectedProduct = {
    image: document.getElementById('main-image').src,
    title: document.querySelector('.product-title').innerText,
    price: document.querySelector('.price').innerText.replace('$', ''),
    color: document.querySelector('.color-circle[data-color="color1"]').getAttribute('data-drink-type'), // Default selection
    drinkType: document.querySelector('.color-circle[data-color="color1"]').getAttribute('data-drink-type') // Default selection
};

// Function to update the selected product details
function updateSelectedProduct(image, price, color, drinkType) {
    selectedProduct = {
        image: image,
        title: document.querySelector('.product-title').innerText,
        price: price,
        color: color,
        drinkType: drinkType
    };

    // Update the main image and price on the product page
    document.getElementById('main-image').src = image;
    document.querySelector('.price').textContent = `$${price}`;
}

// Add event listeners to thumbnails
document.querySelectorAll('.thumbnail').forEach(thumbnail => {
    thumbnail.addEventListener('click', function () {
        const image = thumbnail.getAttribute('data-image');
        const price = thumbnail.getAttribute('data-price');
        const color = thumbnail.getAttribute('data-color');
        const drinkType = thumbnail.getAttribute('data-drink-type');

        updateSelectedProduct(image, price, color, drinkType);
    });
});

// Add event listeners to color circles
document.querySelectorAll('.color-circle').forEach(circle => {
    circle.addEventListener('click', function () {
        const image = circle.getAttribute('data-image');
        const price = circle.getAttribute('data-price');
        const color = circle.getAttribute('data-color');
        const drinkType = circle.getAttribute('data-drink-type');

        updateSelectedProduct(image, price, color, drinkType);
    });
});

// Function to add the selected product to the cart
function addToCart() {
    // Create a cart item object
    const cartItem = {
        image: selectedProduct.image,
        title: selectedProduct.title,
        price: selectedProduct.price,
        color: selectedProduct.color,
        drinkType: selectedProduct.drinkType,
        quantity: 1
    };

    // Retrieve existing cart items from localStorage or initialize an empty array
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    // Add the new item to the cart
    cartItems.push(cartItem);

    // Save the updated cart back to localStorage
    localStorage.setItem('cartItems', JSON.stringify(cartItems));

    // Optional: Notify the user that the item has been added
    alert('Item added to cart!');
}

// Add event listener to the "Add to basket" button
document.addEventListener('DOMContentLoaded', function () {
    const addToBasketButton = document.getElementById('add-to-basket');
    if (addToBasketButton) {
        addToBasketButton.addEventListener('click', addToCart);
    }
});