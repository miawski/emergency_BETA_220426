const scrollButtons = document.querySelectorAll(".frontpage-scroll");
const revealItems = document.querySelectorAll("#frontpage .reveal");
const youtubePlayerFrame = document.querySelector("#frontpage-youtube-player");
const pageHeader = document.querySelector("header");
const pageFooter = document.querySelector("footer");
const pageId = document.body?.id || "";

const frontpageSections = Array.from(
  document.querySelectorAll("#frontpage main > section"),
);

const finalFrontpageSection =
  frontpageSections[frontpageSections.length - 1] || null;

let frontpageYoutubePlayer = null;

function maxScrollY() {
  return Math.max(
    0,
    document.documentElement.scrollHeight - window.innerHeight,
  );
}

function atPageBottom() {
  return window.scrollY >= maxScrollY() - 24;
}

function footerOffset() {
  if (!pageFooter) return 24;

  const footerRect = pageFooter.getBoundingClientRect();
  const overlap = window.innerHeight - footerRect.top + 16;

  return Math.max(24, overlap);
}

function isTopMode() {
  if (pageId === "frontpage" && finalFrontpageSection) {
    const rect = finalFrontpageSection.getBoundingClientRect();
    return rect.top < window.innerHeight - 120;
  }

  return atPageBottom();
}

function updateScrollButtons() {
  const topMode = isTopMode();
  const bottomPx = footerOffset();

  scrollButtons.forEach((button) => {
    button.textContent = topMode ? "Back to top" : "Scroll to content";
    button.classList.toggle("is-top", topMode);
    button.setAttribute(
      "aria-label",
      topMode ? "Back to top" : "Scroll to next content section",
    );
    button.style.bottom = `${bottomPx}px`;
  });
}

function scrollFrontpage() {
  const headerHeight = pageHeader ? pageHeader.offsetHeight : 0;
  const currentMarker = window.scrollY + headerHeight + 24;

  const nextSection = frontpageSections.find(
    (section) => section.offsetTop > currentMarker + 8,
  );

  const targetTop = nextSection
    ? nextSection.offsetTop - headerHeight - 16
    : maxScrollY();

  window.scrollTo({
    top: Math.min(maxScrollY(), Math.max(0, targetTop)),
    behavior: "smooth",
  });
}

function scrollStepPage() {
  const step = Math.max(260, Math.round(window.innerHeight * 0.72));
  const targetTop = Math.min(maxScrollY(), window.scrollY + step);

  window.scrollTo({
    top: targetTop,
    behavior: "smooth",
  });
}

function scrollPage() {
  if (isTopMode()) {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }

  if (pageId === "frontpage") {
    scrollFrontpage();
    return;
  }

  scrollStepPage();
}

scrollButtons.forEach((button) => {
  button.addEventListener("click", scrollPage);
});

window.addEventListener("scroll", updateScrollButtons, { passive: true });
window.addEventListener("resize", updateScrollButtons);
window.addEventListener("load", updateScrollButtons);
updateScrollButtons();

// youtube api

function loadYouTubeIframeApi() {
  if (window.YT && window.YT.Player) {
    setupFrontpageYoutubePlayer();
    return;
  }

  if (
    document.querySelector('script[src="https://www.youtube.com/iframe_api"]')
  ) {
    return;
  }

  const tag = document.createElement("script");
  tag.src = "https://www.youtube.com/iframe_api";
  document.head.appendChild(tag);
}

function setupFrontpageYoutubePlayer() {
  if (!youtubePlayerFrame || !window.YT || !window.YT.Player) return;
  if (frontpageYoutubePlayer) return;

  frontpageYoutubePlayer = new YT.Player("frontpage-youtube-player", {
    events: {
      onReady: (event) => {
        event.target.mute();
        event.target.setVolume(0);
      },
    },
  });
}

window.onYouTubeIframeAPIReady = function () {
  setupFrontpageYoutubePlayer();
};

if (youtubePlayerFrame) {
  loadYouTubeIframeApi();
}

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      });
    },
    {
      threshold: 0.2,
      rootMargin: "0px 0px -8% 0px",
    },
  );

  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}
