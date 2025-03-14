// Global variables
let cartItems = JSON.parse(localStorage.getItem('cartItems')) || []; // Load cart items from localStorage
const FREE_SHIPPING_THRESHOLD = 200.00;

// Function to calculate the subtotal
function calculateSubtotal() {
    let subtotal = 0;
    cartItems.forEach(item => {
        subtotal += parseFloat(item.price) * item.quantity;
    });
    return subtotal;
}

// Function to update the cart summary (subtotal, total, and progress bar)
function updateCartSummary() {
    const subtotal = calculateSubtotal();

    // Calculate shipping cost
    const shippingOption = document.querySelector('input[name="shipping"]:checked')?.value;
    let shippingCost = 0;

    if (shippingOption === 'express') {
        shippingCost = 15.00;
    }

    // Calculate total
    const total = subtotal + shippingCost;

    // Update the DOM
    document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('total').textContent = `$${total.toFixed(2)}`;

    // Update the progress bar
    updateProgressBar(subtotal);
}

// Function to update the progress bar for free shipping
function updateProgressBar(subtotal) {
    const progressBar = document.getElementById('progress-bar');
    const progressAmount = document.getElementById('progress-amount');

    const remainingAmount = FREE_SHIPPING_THRESHOLD - subtotal;

    if (remainingAmount <= 0) {
        progressBar.style.width = '100%';
        progressAmount.textContent = 'You have free shipping!';
    } else {
        const progressPercentage = (subtotal / FREE_SHIPPING_THRESHOLD) * 100;
        progressBar.style.width = `${progressPercentage}%`;
        progressAmount.textContent = `Shop for $${remainingAmount.toFixed(2)} more to enjoy FREE Shipping`;
    }
}

// Function to remove an item from the cart
function removeItem(index) {
    cartItems.splice(index, 1); // Remove the item
    saveCartToLocalStorage(); // Save updated cart to localStorage
    renderCartItems(); // Re-render the cart
    updateCartSummary(); // Update the cart summary
}

// Function to update the quantity of an item
function updateQuantity(index, change) {
    cartItems[index].quantity = Math.max(cartItems[index].quantity + change, 1); // Ensure quantity is at least 1
    saveCartToLocalStorage(); // Save updated cart to localStorage
    renderCartItems(); // Re-render the cart
    updateCartSummary(); // Update the cart summary
}

// Function to render cart items
function renderCartItems() {
    const cartItemsContainer = document.getElementById('cart-items');
    if (!cartItemsContainer) return; // Exit if the container doesn't exist

    // Clear the container
    cartItemsContainer.innerHTML = '';

    // Loop through the cart items and create table rows
    cartItems.forEach((item, index) => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>
                <img src="${item.image}" alt="${item.title}">
                <div class="product-info">
                    <p>${item.title}</p>
                    <p>Drink Type: ${item.drinkType}</p>
                    <p>Color: ${item.color}</p>
                    <span class="remove-text" onclick="removeItem(${index})">Remove</span>
                </div>
            </td>
            <td>
                <div class="quantity-controls">
                    <button onclick="updateQuantity(${index}, -1)">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="updateQuantity(${index}, 1)">+</button>
                </div>
            </td>
            <td>$${parseFloat(item.price).toFixed(2)}</td>
            <td>$${(parseFloat(item.price) * item.quantity).toFixed(2)}</td>
        `;

        cartItemsContainer.appendChild(row);
    });
}

// Function to apply a coupon
function applyCoupon() {
    const couponCode = document.getElementById('coupon-input').value.trim();

    if (couponCode === 'DISCOUNT10') {
        const subtotal = calculateSubtotal();
        const discount = subtotal * 0.10;
        const discountedTotal = subtotal - discount;
        document.getElementById('total').textContent = `$${discountedTotal.toFixed(2)}`;
        alert('Coupon applied!');
    } else {
        alert('Invalid coupon code');
    }
}

// Function to handle shipping option changes
function handleShippingChange() {
    updateCartSummary();
}

// Function to save cart items to localStorage
function saveCartToLocalStorage() {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
}

// Initialize the cart page
function initializeCartPage() {
    renderCartItems(); // Render cart items
    updateCartSummary(); // Update the cart summary

    // Add event listeners for shipping options
    const shippingOptions = document.querySelectorAll('input[name="shipping"]');
    shippingOptions.forEach(option => {
        option.addEventListener('change', handleShippingChange);
    });
}

// Run the initialization when the page loads
document.addEventListener('DOMContentLoaded', function () {
    if (window.location.pathname.includes('cart.html')) {
        initializeCartPage(); // Initialize the cart page
    }
});