const themeToggle = document.querySelector("#theme-toggle");
const root = document.documentElement;
const storedTheme = localStorage.getItem("theme");

if (storedTheme === "dark" || storedTheme === "light") {
  root.dataset.theme = storedTheme;
} else {
  root.dataset.theme = "light";
}

function updateThemeButton() {
  if (!themeToggle) return;

  const isDark = root.dataset.theme === "dark";

  themeToggle.setAttribute("aria-checked", String(isDark));
  themeToggle.setAttribute(
    "aria-label",
    isDark ? "Skift til light mode" : "Skift til dark mode",
  );
}

if (themeToggle) {
  updateThemeButton();

  themeToggle.addEventListener("click", () => {
    root.dataset.theme = root.dataset.theme === "dark" ? "light" : "dark";
    localStorage.setItem("theme", root.dataset.theme);
    updateThemeButton();
  });
}
