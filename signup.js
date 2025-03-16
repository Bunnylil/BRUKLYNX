document.addEventListener("DOMContentLoaded", () => {
  const togglePassword = document.querySelector("#togglePassword");
  const passwordInput = document.querySelector("#passwordInput");
  const signupButton = document.querySelector(".form-container button");
  const googleButton = document.querySelector(".google-button");
  const termsCheckbox = document.getElementById("termsCheckbox");

  // Toggle password visibility
  togglePassword.addEventListener("click", () => {
    const type =
      passwordInput.getAttribute("type") === "password" ? "text" : "password";
    passwordInput.setAttribute("type", type);

    // Toggle eye icon
    togglePassword.classList.toggle("fa-eye");
    togglePassword.classList.toggle("fa-eye-slash");
  });

  // Handle custom signup
  signupButton.addEventListener("click", async (e) => {
    e.preventDefault();

    const name = document
      .querySelector('input[placeholder="Your name"]')
      .value.trim();
    const username = document
      .querySelector('input[placeholder="Username"]')
      .value.trim();
    const email = document
      .querySelector('input[placeholder="Email address"]')
      .value.trim();
    const password = document
      .querySelector('input[placeholder="Password"]')
      .value.trim();

    // Validate fields
    if (!name || !username || !email || !password) {
      alert("All fields are required.");
      return;
    }

    if (!termsCheckbox.checked) {
      alert("You must agree to the terms and conditions.");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    // Password validation
    if (password.length < 6) {
      alert("Password must be at least 6 characters long.");
      return;
    }

    try {
      // Check if username exists
      const usernameCheckResponse = await fetch(
        `http://localhost:3000/api/auth/check-username?username=${username}`
      );
      const usernameCheckData = await usernameCheckResponse.json();

      if (usernameCheckData.exists) {
        alert("Username already exists. Please choose a different username.");
        return;
      }

      // Check if email exists
      const emailCheckResponse = await fetch(
        `http://localhost:3000/api/auth/check-email?email=${email}`
      );
      const emailCheckData = await emailCheckResponse.json();

      if (emailCheckData.exists) {
        alert("Email already exists. Please use a different email address.");
        return;
      }

      // If username and email are unique, proceed with Firebase signup
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(userCredential.user, { displayName: name });

      // Save user data to your backend
      const response = await fetch("http://localhost:3000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, username, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Sign up successful!");
        window.location.href = "index.html";
      } else {
        throw new Error("Sign up failed. Please try again.");
      }
    } catch (error) {
      alert(error.message);
    }
  });

  // Handle Google signup
  googleButton.addEventListener("click", async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Extract Google user details
      const googleId = user.uid;
      const name = user.displayName || "Unknown";
      const email = user.email || "";
      const profilePicture = user.photoURL || "";

      // Send Google user data to your backend
      const response = await fetch(
        "http://localhost:3000/api/auth/google-signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            googleId,
            name,
            email,
            profilePicture,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert("Sign-up successful with Google!");
        window.location.href = "index.html";
      } else {
        throw new Error(data.message || "Failed to sign up with Google.");
      }
    } catch (error) {
      alert(error.message);
    }
  });
  // Image slider
  const images = ["images/a (1).png", "images/a (2).png", "images/a (3).png"];

  let currentImageIndex = 0;
  const imageElement = document.getElementById("dynamicImage");

  function changeImage() {
    currentImageIndex = (currentImageIndex + 1) % images.length;
    imageElement.src = images[currentImageIndex];
  }

  setInterval(changeImage, 5000);
});

// Firebase initialization
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithPopup,
  GoogleAuthProvider,
} from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyBbjwB8BGzzGeg3hYkNDMTIWY5kQ6xaTZQ",
  authDomain: "inceptor-7c036.firebaseapp.com",
  projectId: "inceptor-7c036",
  storageBucket: "inceptor-7c036.appspot.com",
  messagingSenderId: "251784547484",
  appId: "1:251784547484:web:46ce4a6da235ac75723159",
  measurementId: "G-10BE1RRDC2",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
