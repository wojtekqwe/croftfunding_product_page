const bookmark = document.querySelector(".bookmark");
const optionsBtn = document.querySelectorAll(".options__info .btn");
const optionsBtnModal = document.querySelectorAll(".options__option--modal");

// Function select bookmark button
function changeBtnColor() {
  this.classList.toggle("active");
  if (this.classList.contains("active")) {
    this.querySelector("p").textContent = "Bookmarked";
  } else {
    this.querySelector("p").textContent = "Bookmark";
  }
}

// Function hide all options
function hideAllOptions() {
  optionsBtn.forEach((option) => {
    option.parentElement.parentElement.classList.remove("active");
  });
}

bookmark.addEventListener("click", changeBtnColor);

// Option in main view
optionsBtn.forEach((option) => {
  option.addEventListener("click", function () {
    hideAllOptions();
    const container = this.parentElement.parentElement;

    container.classList.toggle("active");
  });
});

// Option in modal
optionsBtnModal.forEach((option) => {
  option.addEventListener("click", function () {
    optionsBtnModal.forEach((option) => {
      option.classList.remove("active");
    });
    this.classList.toggle("active");
  });
});
