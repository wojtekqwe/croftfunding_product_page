import { Stats } from "./Stats.js";

// Input data
let priceTotal = 89914;
let backers = 5007;
let dayLeft = 56;

// Stats container
let payContainer = document.querySelector("#collect-money");
let backerContainer = document.querySelector("#total-backers");
let timeLeftContainer = document.querySelector("#days-left");

let positionY;
const optionsBtn = document.querySelectorAll(".options__info .btn");
const summaryPopup = document.querySelector(".modal--completed");

// Function that generates data after the page is loaded
window.addEventListener("DOMContentLoaded", function () {
  const stats = new Stats(priceTotal, backers, dayLeft);
  payContainer.textContent = stats.price;
  backerContainer.textContent = stats.backers;
  timeLeftContainer.textContent = stats.day;
});

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
    top: 530,
    left: 0,
    behavior: "smooth",
  });
  this.closest(".modal").classList.remove("show");
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

    leftValue.textContent = Number(leftValue.textContent) - 1;
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
  btnContinue.addEventListener("click", updateData);
}

// Option in main view
optionsBtn.forEach((option) => {
  option.addEventListener("click", checkOption);
});

window.addEventListener("scroll", changePopupPosition);

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
// const optionsBtnModal = document.querySelectorAll(".options__option--modal");
// Option in modal
// optionsBtnModal.forEach((option) => {
//   option.addEventListener("click", function () {
//     optionsBtnModal.forEach((option) => {
//       option.classList.remove("active");
//     });
//     this.classList.toggle("active");
//   });
// });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
// const bookmark = document.querySelector(".bookmark");
// Function select bookmark button
// function changeBtnColor() {
//   this.classList.toggle("active");
//   if (this.classList.contains("active")) {
//     this.querySelector("p").textContent = "Bookmarked";
//   } else {
//     this.querySelector("p").textContent = "Bookmark";
//   }
// }
// Reaction for click icon bookmarks
// bookmark.addEventListener("click", changeBtnColor);
