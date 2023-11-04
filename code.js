const optionsBtn = document.querySelectorAll(".options__info .btn");

const summaryPopup = document.querySelector(".modal--completed");

let payContainer = document.querySelector("#collect-money");
let backerContainer = document.querySelector("#total-backers");

// Function hide all options
function removeSelectedOption(container) {
  const parentElement = container.parentElement;
  const activeElement = parentElement.querySelectorAll(".active");

  activeElement.forEach((el) => {
    el.classList.remove("active");
  });
}

// Show last modal
function showSummaryPopup() {
  const optionsContainer = document.querySelector(".options");
  removeSelectedOption(optionsContainer);
  const actuallyPositionScroll = window.scrollY;

  // Add class to popup
  summaryPopup.querySelector(".modal__complete").style.top =
    actuallyPositionScroll + 100 + "px";
  summaryPopup.classList.add("show");
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
    payContainer.textContent = Number(payContainer.textContent) + inputValue;
    backerContainer.textContent = Number(backerContainer.textContent) + 1;
    leftValue.textContent = Number(leftValue.textContent) - 1;
    showSummaryPopup();
  } else {
    inputContainer.classList.add("error");
  }
}

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
  // option.addEventListener("click", function () {
  //   hideAllOptions();
  //   const container = this.parentElement.parentElement;
  //   container.classList.toggle("active");

  //   const btnContinue = container.querySelector(".options__pays .btn");
  //   const input = container.querySelector("#ammount");
  //   const productLeft = document.querySelector(".left");
  //   btnContinue.addEventListener("click", () => {
  //     showSummary();
  //     payContainer.textContent =
  //       Number(payContainer.textContent) + Number(input.value);
  //     backerContainer.textContent = Number(backerContainer.textContent) + 1;
  //     productLeft.textContent = Number(productLeft.textContent) - 1;

  //     if (Number(productLeft.textContent <= 0)) {
  //       option.classList.add("options__option--finish");
  //     }
  //   });
  // });
});

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
