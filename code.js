const bookmark = document.querySelector(".bookmark");

function changeBtnColor() {
  this.classList.toggle("active");
  if (this.classList.contains("active")) {
    this.querySelector("p").textContent = "Bookmarked";
  } else {
    this.querySelector("p").textContent = "Bookmark";
  }
}

bookmark.addEventListener("click", changeBtnColor);
