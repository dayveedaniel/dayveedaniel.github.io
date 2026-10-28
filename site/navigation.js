const menuButton = document.querySelector("[data-menu]");
const navigation = document.querySelector("[data-nav]");
const navigationLinks = [...(navigation?.querySelectorAll('a[href^="#"]') ?? [])];
const sections = navigationLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

const setActiveSection = (sectionId) => {
  navigationLinks.forEach((link) => {
    const active = link.getAttribute("href") === `#${sectionId}`;
    link.classList.toggle("is-active", active);
    if (active) link.setAttribute("aria-current", "location");
    else link.removeAttribute("aria-current");
  });
};

const updateActiveSection = () => {
  if (!sections.length) return;

  const marker = window.scrollY + Math.min(window.innerHeight * 0.35, 320);
  let activeSection = sections[0];

  sections.forEach((section) => {
    if (section.offsetTop <= marker) activeSection = section;
  });

  const atPageEnd = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
  if (atPageEnd) activeSection = sections.at(-1);

  setActiveSection(activeSection.id);
};

let scrollFrame;
const requestSectionUpdate = () => {
  if (scrollFrame) return;
  scrollFrame = window.requestAnimationFrame(() => {
    updateActiveSection();
    scrollFrame = undefined;
  });
};

const syncSectionFromLocation = () => {
  const sectionId = window.location.hash.slice(1);
  const hashMatchesSection = sections.some((section) => section.id === sectionId);
  if (hashMatchesSection) setActiveSection(sectionId);
  else updateActiveSection();
};

menuButton?.addEventListener("click", () => {
  const open = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!open));
  navigation?.classList.toggle("is-open", !open);
});

navigationLinks.forEach((link) => {
  link.addEventListener("click", () => {
    setActiveSection(link.getAttribute("href").slice(1));
    menuButton?.setAttribute("aria-expanded", "false");
    navigation.classList.remove("is-open");
  });
});

window.addEventListener("scroll", requestSectionUpdate, { passive: true });
window.addEventListener("resize", requestSectionUpdate);
window.addEventListener("hashchange", syncSectionFromLocation);
window.addEventListener("load", () => {
  syncSectionFromLocation();
  window.setTimeout(syncSectionFromLocation, 200);
});

syncSectionFromLocation();
document.querySelector("[data-year]").textContent = new Date().getFullYear();
