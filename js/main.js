const headline = document.querySelector("h1");

if (headline) {
  headline.addEventListener("click", changeColor);

  function changeColor() {
    headline.style.color = "red";
  }
}

// personlig test

const ringtone = document.querySelector("#ringtone");

if (ringtone) {
  ringtone.addEventListener("click", stylediv);
}

function stylediv() {
  const won = document.querySelector("#won");

  if (won) {
    // won.classList.add("active");
    won.classList.toggle("active");
  }
}
