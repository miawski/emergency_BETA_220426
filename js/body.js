const chest = document.querySelector("#chest");
const head = document.querySelector("#head");
const lips = document.querySelector("#lips");

const btnHead = document.querySelector("#btn_head");
const btnChest = document.querySelector("#btn_chest");
const btnLips = document.querySelector("#btn_lips");
const btnReset = document.querySelector("#btn_reset");

function clearBodyStates() {
  if (head) head.classList.remove("active-head");
  if (chest) chest.classList.remove("active-chest");
  if (lips) lips.classList.remove("visible-lips");
  updatePressedStates();
}

function updatePressedStates() {
  if (btnHead) {
    btnHead.setAttribute(
      "aria-pressed",
      head && head.classList.contains("active-head") ? "true" : "false",
    );
  }

  if (btnChest) {
    btnChest.setAttribute(
      "aria-pressed",
      chest && chest.classList.contains("active-chest") ? "true" : "false",
    );
  }

  if (btnLips) {
    btnLips.setAttribute(
      "aria-pressed",
      lips &&
        lips.classList.contains("visible-lips") &&
        !head?.classList.contains("active-head")
        ? "true"
        : "false",
    );
  }
}

function toggleHead() {
  const isActive = head && head.classList.contains("active-head");

  clearBodyStates();

  if (!isActive && head) {
    head.classList.add("active-head");

    if (lips) {
      lips.classList.add("visible-lips");
    }
  }

  updatePressedStates();
}

function toggleChest() {
  const isActive = chest && chest.classList.contains("active-chest");

  clearBodyStates();

  if (!isActive && chest) {
    chest.classList.add("active-chest");
  }

  updatePressedStates();
}

function toggleLips() {
  const isActive =
    lips &&
    lips.classList.contains("visible-lips") &&
    !(head && head.classList.contains("active-head"));

  clearBodyStates();

  if (!isActive && lips) {
    lips.classList.add("visible-lips");
  }

  updatePressedStates();
}

function resetBody() {
  clearBodyStates();
}

if (head) {
  head.addEventListener("click", toggleHead);
}

if (chest) {
  chest.addEventListener("click", toggleChest);
}

if (lips) {
  lips.addEventListener("click", toggleLips);
}

btnHead?.addEventListener("click", toggleHead);
btnChest?.addEventListener("click", toggleChest);
btnLips?.addEventListener("click", toggleLips);
btnReset?.addEventListener("click", resetBody);

document.addEventListener("click", (event) => {
  const clickedInsideSvg = event.target.closest("#won svg");
  const clickedInsideButtons = event.target.closest(".buttons-wrapper");

  if (!clickedInsideSvg && !clickedInsideButtons) {
    clearBodyStates();
  }
});

updatePressedStates();
