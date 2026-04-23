const scrollButtons = document.querySelectorAll(".frontpage-scroll");
const revealItems = document.querySelectorAll("#frontpage .reveal");
const youtubePlayerFrame = document.querySelector("#frontpage-youtube-player");
const pageHeader = document.querySelector("header");
const pageSections = Array.from(document.querySelectorAll("main > *")).filter(
  (section) => section.tagName !== "H1",
);

let frontpageYoutubePlayer = null;

function atPageBottom() {
  return (
    window.innerHeight + window.scrollY >=
    document.documentElement.scrollHeight - 16
  );
}

function updateScrollButtons() {
  const bottom = atPageBottom();

  scrollButtons.forEach((button) => {
    button.textContent = bottom ? "Back to top" : "Scroll to content";
    button.classList.toggle("is-top", bottom);
    button.setAttribute(
      "aria-label",
      bottom ? "Back to top" : "Scroll to next section",
    );
  });
}

function scrollPage() {
  const headerHeight = pageHeader ? pageHeader.offsetHeight : 0;

  if (atPageBottom()) {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }

  const currentMarker = window.scrollY + headerHeight + 24;
  const nextSection = pageSections.find(
    (section) => section.offsetTop > currentMarker + 8,
  );

  const targetTop = nextSection ? nextSection.offsetTop - headerHeight - 16 : 0;

  window.scrollTo({
    top: Math.max(0, targetTop),
    behavior: "smooth",
  });
}

scrollButtons.forEach((button) => {
  button.addEventListener("click", scrollPage);
});

window.addEventListener("scroll", updateScrollButtons, { passive: true });
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
