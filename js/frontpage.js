const scrollTrigger = document.querySelector(".frontpage-scroll");
const revealItems = document.querySelectorAll("#frontpage .reveal");
const youtubePlayerFrame = document.querySelector("#frontpage-youtube-player");
const frontpageSections = Array.from(
  document.querySelectorAll("#frontpage main > section"),
);
const frontpageHeader = document.querySelector("#frontpage header");

let frontpageYoutubePlayer = null;

function scrollToNextFrontpageSection() {
  if (!frontpageSections.length) return;

  const headerHeight = frontpageHeader ? frontpageHeader.offsetHeight : 0;
  const currentMarker = window.scrollY + headerHeight + 24;

  const nextSection = frontpageSections.find(
    (section) => section.offsetTop > currentMarker + 8,
  );

  const targetTop = nextSection ? nextSection.offsetTop - headerHeight - 16 : 0;

  window.scrollTo({
    top: Math.max(0, targetTop),
    behavior: "smooth",
  });
}

if (scrollTrigger) {
  scrollTrigger.addEventListener("click", scrollToNextFrontpageSection);
}

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
