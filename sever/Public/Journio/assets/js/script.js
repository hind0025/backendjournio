'use strict';

/**
 * navbar toggle
 */

const overlay = document.querySelector("[data-overlay]");
const navOpenBtn = document.querySelector("[data-nav-open-btn]");
const navbar = document.querySelector("[data-navbar]");
const navCloseBtn = document.querySelector("[data-nav-close-btn]");
const navLinks = document.querySelectorAll("[data-nav-link]");

const navElemArr = [navOpenBtn, navCloseBtn, overlay];

const navToggleEvent = function (elem) {
  for (let i = 0; i < elem.length; i++) {
    elem[i].addEventListener("click", function () {
      navbar.classList.toggle("active");
      overlay.classList.toggle("active");
    });
  }
}

navToggleEvent(navElemArr);
navToggleEvent(navLinks);



/**
 * header sticky & go to top
 */

const header = document.querySelector("[data-header]");
const goTopBtn = document.querySelector("[data-go-top]");

window.addEventListener("scroll", function () {

  if (window.scrollY >= 200) {
    header.classList.add("active");
    goTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    goTopBtn.classList.remove("active");
  }

});


document.addEventListener("DOMContentLoaded", () => {
  const bookNowButtons = document.querySelectorAll(".book-now-btn");

  bookNowButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const price = button.getAttribute("data-price"); // Get price from the button
      const title = button.getAttribute("data-title"); // Get package title

      // Redirect to the payment page or open the payment modal
      openPaymentModal(price, title);
    });
  });
});

function openPaymentModal(price, title) {
  // Store price and title for the payment process
  sessionStorage.setItem("selectedPrice", price);
  sessionStorage.setItem("selectedTitle", title);

  // Redirect to the payment page (or show a modal)
  window.location.href = "stripe-check.html";
}