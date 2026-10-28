const header = document.querySelector("[data-header]");
const navToggle = document.querySelector("[data-nav-toggle]");
const nav = document.querySelector("[data-nav]");

navToggle?.addEventListener("click", () => {
  const open = navToggle.getAttribute("aria-expanded") === "true";
  navToggle.setAttribute("aria-expanded", String(!open));
  nav?.classList.toggle("is-open", !open);
  document.body.classList.toggle("nav-open", !open);
});

nav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navToggle?.setAttribute("aria-expanded", "false");
    nav.classList.remove("is-open");
    document.body.classList.remove("nav-open");
  });
});

const revealItems = document.querySelectorAll("[data-reveal]");
if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

const filterButtons = document.querySelectorAll("[data-filter]");
const projects = document.querySelectorAll("[data-category]");
const filterStatus = document.querySelector("[data-filter-status]");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;
    let visible = 0;

    filterButtons.forEach((item) => {
      const active = item === button;
      item.classList.toggle("is-active", active);
      item.setAttribute("aria-pressed", String(active));
    });

    projects.forEach((project) => {
      const categories = project.dataset.category?.split(" ") ?? [];
      const show = filter === "all" || categories.includes(filter);
      project.hidden = !show;
      if (show) visible += 1;
    });

    if (filterStatus) filterStatus.textContent = `${visible} projects shown.`;
  });
});

const copyButton = document.querySelector("[data-copy-email]");
const copyStatus = document.querySelector("[data-copy-status]");
copyButton?.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText("dayveed.d@gmail.com");
    if (copyStatus) copyStatus.textContent = "Email copied to clipboard.";
  } catch {
    if (copyStatus) copyStatus.textContent = "Copy failed. Email: dayveed.d@gmail.com";
  }
});

document.querySelector("[data-year]").textContent = new Date().getFullYear();

let lastScroll = 0;
window.addEventListener("scroll", () => {
  const current = window.scrollY;
  if (header) header.style.boxShadow = current > 24 ? "0 10px 35px rgba(0, 0, 0, .16)" : "none";
  lastScroll = current;
}, { passive: true });
