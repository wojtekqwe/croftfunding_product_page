import { ProductAmmount, Stats } from "./Stats.js";

// Input data
let priceTotal = 89914;
let backers = 5007;
let dayLeft = 56;

//Ammount in offer
let bambooLeft = 101;
let blackEditionLeft = 64;
let mahoganyLeft = 1;

// Stats container
let payContainer = document.querySelector("#collect-money");
let backerContainer = document.querySelector("#total-backers");
let timeLeftContainer = document.querySelector("#days-left");

// Product containers
let bambooContainer = document.querySelectorAll(".bamboo-left");
let blackEditionContainer = document.querySelectorAll(".black-edition-left");
let mahoganyContainer = document.querySelectorAll(".mahogany-left");

const bookmark = document.querySelector(".bookmark");
const menuBtn = document.querySelector(".nav__hamburger");
const menu = document.querySelector(".nav__main");

let positionY;
const optionsBtn = document.querySelectorAll(".options__info .btn");
const summaryPopup = document.querySelector(".modal--completed");
const btnBackProject = document.querySelector(".btn--back");
const offerPopup = document.querySelector("#offer-popup");

// Change position POPUP after scroll
function changePopupPosition() {
  if (summaryPopup.classList.contains("show")) {
    positionY = window.scrollY;
    summaryPopup.querySelector(".modal__complete").style.top =
      positionY + 100 + "px";
  }
}

// Close popup
function closePopup() {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
  this.closest(".modal").classList.remove("show");
  offerPopup.classList.remove("show");
}

// Show last modal
function showSummaryPopup() {
  const optionsContainer = document.querySelector(".options");
  removeSelectedOption(optionsContainer);

  // Add class to popup - class changePopupPosition change position popup
  positionY = window.scrollY;
  summaryPopup.classList.add("show");
  summaryPopup.querySelector(".modal__complete").style.top =
    positionY + 100 + "px";

  const btn = summaryPopup.querySelector(".btn");
  btn.addEventListener("click", closePopup);
}

// Change ammount products
function changeAmmountProduct(product) {
  if (product.classList.contains("bamboo-left")) {
    bambooLeft--;
  } else if (product.classList.contains("black-edition-left")) {
    blackEditionLeft--;
  } else if (product.classList.contains("mahogany-left")) {
    mahoganyLeft--;
  }

  generateProduct(bambooContainer, bambooLeft);
  generateProduct(blackEditionContainer, blackEditionLeft);
  generateProduct(mahoganyContainer, mahoganyLeft);
}

// Update data in stats and product section
function updateData() {
  const inputContainer = this.previousElementSibling.querySelector("input");
  const inputValue = Number(inputContainer.value);
  const minValue = Number(inputContainer.min);
  const leftValue = this.closest(".active").querySelector(".left");

  // Error handling
  if (inputValue >= minValue) {
    inputContainer.classList.remove("error");

    // Change values in site
    priceTotal += inputValue;
    backers++;
    payContainer.textContent = priceTotal;
    backerContainer.textContent = backers;

    changeAmmountProduct(leftValue);
    showSummaryPopup();
  } else {
    inputContainer.classList.add("error");
  }
}

// Function hide all options
function removeSelectedOption(container) {
  const parentElement = container.parentElement;
  const activeElement = parentElement.querySelectorAll(".active");

  activeElement.forEach((el) => {
    el.classList.remove("active");
  });
}

//Select available option
function checkOption(element) {
  const productContainer = element.target.closest(".options__option");
  removeSelectedOption(productContainer);

  productContainer.classList.add("active");

  // Find button 'Continue'
  const btnContinue = productContainer.querySelector(".options__pays .btn");
  if (productContainer.querySelector("#ammount")) {
    btnContinue.addEventListener("click", updateData);
  } else {
    backers++;
    backerContainer.textContent = backers;
    btnContinue.addEventListener("click", showSummaryPopup);
  }
}

// Function select bookmark button
function changeBtnColor() {
  this.classList.toggle("active");
  if (this.classList.contains("active")) {
    this.querySelector("p").textContent = "Bookmarked";
  } else {
    this.querySelector("p").textContent = "Bookmark";
  }
}

function showOfferPopup() {
  const offers = offerPopup.querySelectorAll(".options__option");
  const btnClose = offerPopup.querySelector(".options__title div");

  offerPopup.classList.add("show");
  window.scrollTo({
    top: 10,
    left: 0,
    behavior: "smooth",
  });
  offers.forEach((offer) => {
    offer.addEventListener("click", checkOption);
  });

  btnClose.addEventListener("click", closePopup);
}

function generateProduct(products, ammount) {
  products.forEach((product) => {
    product.textContent = ammount;
    // Change the color unavailable products
    if (ammount <= 0) {
      const btn = product
        .closest(".options__option")
        .querySelector(".options__info button");
      const container = product.closest(".options__option");
      container.classList.add("options__option--finish");

      // Delayed function to make the border disappear
      setTimeout(() => {
        container.classList.remove("active");
      }, 100);

      if (btn !== null) {
        btn.textContent = "Out of stock";
      }
    }
  });
}

// Generate data
function generateData() {
  const stats = new Stats(priceTotal, backers, dayLeft);
  payContainer.textContent = stats.price;
  backerContainer.textContent = stats.backers;
  timeLeftContainer.textContent = stats.day;

  const products = new ProductAmmount(
    bambooLeft,
    blackEditionLeft,
    mahoganyLeft
  );

  generateProduct(bambooContainer, bambooLeft);
  generateProduct(blackEditionContainer, blackEditionLeft);
  generateProduct(mahoganyContainer, mahoganyLeft);
}

function showMobileMenu() {
  const menu = this.closest(".nav__main");
  const btn = this.querySelector("img");

  menu.classList.toggle("active");
  if (menu.classList.contains("active")) {
    btn.src = "./images/icon-close-menu.svg";
  } else {
    btn.src = "./images/icon-hamburger.svg";
  }

  // Click other place than menu close the menu
  this.parentElement
    .querySelector(".modal__bg")
    .addEventListener("click", () => {
      menu.classList.remove("active");
      btn.src = "./images/icon-hamburger.svg";
    });
}

// Show mobile menu after click hamburger
menuBtn.addEventListener("click", showMobileMenu);

// Option in main view
optionsBtn.forEach((option) => {
  option.addEventListener("click", checkOption);
});

// Function after click 'Back this project'
btnBackProject.addEventListener("click", showOfferPopup);

// Reaction for click icon bookmarks
bookmark.addEventListener("click", changeBtnColor);

//Change position scroll
window.addEventListener("scroll", changePopupPosition);

// Function that generates data after the page is loaded
window.addEventListener("DOMContentLoaded", generateData);

// Delete mobile menu after resize window
window.addEventListener("resize", () => {
  if (window.screen.width > 992) {
    menu.classList.remove("active");
    menuBtn.querySelector("img").src = "./images/icon-hamburger.svg";
  }
});
