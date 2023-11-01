const bookmark = document.querySelector(".bookmark");
const optionsBtn = document.querySelectorAll(".options__info .btn");

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
    option.parentElement.nextElementSibling.style.display = "none";
  });
}

//Function to show available option
function showOptionsElement() {
  hideAllOptions();
  this.parentElement.nextElementSibling.style.display = "flex";
}

bookmark.addEventListener("click", changeBtnColor);

optionsBtn.forEach((option) => {
  option.addEventListener("click", showOptionsElement);
});
