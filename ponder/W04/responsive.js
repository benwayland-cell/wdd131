
let menuButton = document.querySelector(".menu-btn");
let nav = document.querySelector("nav");

menuButton.addEventListener('click', handleMenuButtonClick);

function handleMenuButtonClick() {
    nav.classList.toggle("show");
    menuButton.classList.toggle("change");
}