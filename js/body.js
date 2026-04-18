const chest = document.querySelector("#chest");
const head = document.querySelector("#head");
const lips = document.querySelector("#lips");

function clearBodyStates() {
  if (head) head.classList.remove("active-head");
  if (chest) chest.classList.remove("active-chest");
  if (lips) lips.classList.remove("visible-lips");
}

function toggleHead(event) {
  const isActive = head.classList.contains("active-head");

  clearBodyStates();

  if (!isActive) {
    head.classList.add("active-head");
    if (lips) lips.classList.add("visible-lips");
  }
}

function toggleChest(event) {
  const isActive = chest.classList.contains("active-chest");

  clearBodyStates();

  if (!isActive) {
    chest.classList.add("active-chest");
  }
}

if (head) {
  head.addEventListener("click", toggleHead);
}

if (chest) {
  chest.addEventListener("click", toggleChest);
}

document.addEventListener("click", (event) => {
  const clickedInsideSvg = event.target.closest("#won svg");

  if (!clickedInsideSvg) {
    clearBodyStates();
  }
});
