document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".hamburger");
  const hamburgerMenu = document.querySelector(".hamburger-menu");

  hamburger.addEventListener("click", () => {
    const isMenuVisible = hamburgerMenu.style.display === "flex";
    hamburgerMenu.style.display = isMenuVisible ? "none" : "flex";
  });
});
