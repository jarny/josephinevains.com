/* ==========================================================================
   Josephine Vains — shared page script
   - Draws the menu bar and contact footer on every page
   - Fills in the decorative background shapes
   - Builds the event and project lists from js/data.js
   ========================================================================== */

const CONFIG = {
  // The contact form is handled by Netlify Forms. This name must match the hidden
  // <form name="contact" data-netlify="true"> in index.html. Messages appear in the
  // Netlify dashboard under Forms (turn on email notifications there).
  // It only works on the live Netlify site, not when previewing locally.
  netlifyFormName: "contact",
  phone: "0412 957 510",
  youtube: "https://www.youtube.com/channel/UC4umbrupB8ld-JDPsCaHlJw",
  pastEventsPerPage: 9,
};

/* ---------- SVG artwork ---------- */
const SHAPES = {
  a: '<svg aria-hidden="true" focusable="false" viewBox="0 0 416.54 782.23"><path fill="currentColor" d="M6.4,472.19c51.91,247.25,288.76,310,288.76,310S181.6,660.57,171.87,515.36,416.54,305.08,416.54,305.08,297,232.18,241.84,178.62C166.35,105.28,164,0,164,0c-61.29,215.28,71.36,278.91,71.36,278.91S-45.51,224.94,6.4,472.19Z"/></svg>',
  b: '<svg aria-hidden="true" focusable="false" viewBox="0 0 282.29 724.9"><path fill="currentColor" d="M167.76,433.12C145.56,224.69,140.74,153.4,92.05,0c0,0,121.22,100.12,174,170.22C155.53,350.7,282.29,724.9,282.29,724.9s-263-51.41-279.85-157C-13.27,469.69,47.55,434.15,167.76,433.12Z"/></svg>',
  c: '<svg aria-hidden="true" focusable="false" viewBox="0 0 1885.67 1950.51"><path d="M1719.09,125.34c-199.68-172.22-527.48-171-698.73,28.75-127.9,149.18-176,308.68-167.28,450.47,15.77,257.26,309.66,776.45,308.81,776.14C769.24,1239.32,331.3,881.7,330.44,882,169.59,941.81,0,936.85,0,936.85L1734.21,1950.51s-83.63-197.73-139-450.24c-259.47-205.2-398-415.86-512-663.35,194.91,108.83,534.37,141.37,685.88-34.28C1942.31,601.8,1919.92,298.56,1719.09,125.34Z" fill="currentColor"/></svg>',
};
const ICONS = {
  calendar: '<svg aria-hidden="true" focusable="false" viewBox="0 0 15.02 13.38"><path d="M13.19,1.34H10.85V.75a.75.75,0,0,0-1.5,0v.59H5.67V.75a.75.75,0,0,0-1.5,0v.59H1.83A1.83,1.83,0,0,0,0,3.17v8.38a1.83,1.83,0,0,0,1.83,1.83H13.19A1.83,1.83,0,0,0,15,11.55V3.17A1.83,1.83,0,0,0,13.19,1.34ZM1.83,2.84H4.17v.51a.75.75,0,0,0,1.5,0V2.84H9.35v.51a.75.75,0,1,0,1.5,0V2.84h2.34a.33.33,0,0,1,.33.33v2H1.5v-2A.33.33,0,0,1,1.83,2.84Zm11.36,9H1.83a.33.33,0,0,1-.33-.33V6.67h12v4.88A.33.33,0,0,1,13.19,11.88Z" fill="currentColor"/></svg>',
  pin: '<svg aria-hidden="true" focusable="false" viewBox="0 0 12.1 15.25"><path d="M10.34,1.75A5.87,5.87,0,0,0,6.05,0,5.89,5.89,0,0,0,1.76,1.75,6,6,0,0,0,0,6.21a7.32,7.32,0,0,0,1.45,4,27,27,0,0,0,4.09,4.61l.51.47.51-.47a25.06,25.06,0,0,0,4.13-4.62A7.45,7.45,0,0,0,12.1,6.21,6,6,0,0,0,10.34,1.75Zm-.91,7.6A22,22,0,0,1,6.06,13.2,23.77,23.77,0,0,1,2.7,9.34,6,6,0,0,1,1.5,6.21a4.54,4.54,0,0,1,1.32-3.4A4.37,4.37,0,0,1,6.05,1.5,4.4,4.4,0,0,1,9.29,2.81a4.57,4.57,0,0,1,1.31,3.4A6.13,6.13,0,0,1,9.43,9.35Z" fill="currentColor"/><path d="M4.56,4.62a2,2,0,0,0-.62,1.49A2.12,2.12,0,0,0,6.05,8.23,2.12,2.12,0,0,0,8.17,6.11a2.08,2.08,0,0,0-.62-1.49A2.14,2.14,0,0,0,4.56,4.62ZM6.49,6.55a.6.6,0,0,1-.87,0,.57.57,0,0,1-.18-.44.61.61,0,0,1,.61-.61.61.61,0,0,1,.62.61A.6.6,0,0,1,6.49,6.55Z" fill="currentColor"/></svg>',
  event: '<svg aria-hidden="true" focusable="false" viewBox="0 0 72.46 64.2"><path d="M66.54,5.66H57.27V4.6a4.6,4.6,0,1,0-9.2,0V5.66H24.43V4.6a4.6,4.6,0,0,0-9.2,0V5.66H5.92A6.12,6.12,0,0,0,0,12V57.9a6.12,6.12,0,0,0,5.92,6.3H66.54a6.12,6.12,0,0,0,5.92-6.3V12A6.12,6.12,0,0,0,66.54,5.66ZM51.07,4.6a1.6,1.6,0,1,1,3.2,0V9.72a1.6,1.6,0,0,1-3.2,0V4.6Zm-32.84,0a1.6,1.6,0,0,1,3.2,0V9.72a1.6,1.6,0,0,1-3.2,0V4.6ZM3,12a3.13,3.13,0,0,1,2.92-3.3h9.31V9.72a4.6,4.6,0,0,0,9.2,0V8.66H48.07V9.72a4.6,4.6,0,0,0,4.6,4.6,4.73,4.73,0,0,0,.93-.09,4.61,4.61,0,0,0,3.67-4.51V8.66h9.27A3.13,3.13,0,0,1,69.46,12v5.57H3ZM66.54,61.2H5.92A3.13,3.13,0,0,1,3,57.9V20.53H69.46V57.9A3.13,3.13,0,0,1,66.54,61.2Z" fill="currentColor"/><path d="M29.35,28.08h-.09a5,5,0,1,0,.09,0Zm-.09,6.86a1.93,1.93,0,0,1,0-3.86h.09a1.93,1.93,0,1,1-.09,3.86Z" fill="currentColor"/><path d="M43.3,28.08h-.1a5,5,0,1,0,.1,0Zm-.1,6.86a1.93,1.93,0,1,1,0-3.86h.1a1.93,1.93,0,1,1-.1,3.86Z" fill="currentColor"/><path d="M57.24,28.08h-.09a5,5,0,1,0,.09,0Zm-.09,6.86a1.93,1.93,0,0,1,0-3.86h.09a1.93,1.93,0,1,1-.09,3.86Z" fill="currentColor"/><path d="M29.35,42.69h-.09a5,5,0,1,0,.09,0Zm-.09,6.86a1.93,1.93,0,0,1,0-3.86h.09a1.93,1.93,0,1,1-.09,3.86Z" fill="currentColor"/><path d="M43.3,42.69h-.1a5,5,0,1,0,.1,0Zm-.1,6.86a1.93,1.93,0,1,1,0-3.86h.1a1.93,1.93,0,1,1-.1,3.86Z" fill="currentColor"/><path d="M15.31,28.08h-.09a5,5,0,1,0,.09,0Zm-.09,6.86a1.93,1.93,0,0,1,0-3.86h.09a1.93,1.93,0,1,1-.09,3.86Z" fill="currentColor"/><path d="M15.31,42.69h-.09a5,5,0,1,0,.09,0Zm-.09,6.86a1.93,1.93,0,0,1,0-3.86h.09a1.93,1.93,0,1,1-.09,3.86Z" fill="currentColor"/></svg>',
  project: '<svg aria-hidden="true" focusable="false" viewBox="0 0 47.82 56.54"><path d="M26.22,47H21.53a4.31,4.31,0,0,1-4.3-4.31V40.92a9.54,9.54,0,0,0-3-6.74,14.38,14.38,0,0,1-3.94-9.9A13.41,13.41,0,0,1,23.71,10.89H24A13.41,13.41,0,0,1,37.43,24.28a14.38,14.38,0,0,1-3.94,9.9,10.62,10.62,0,0,0-3,7.55v1A4.31,4.31,0,0,1,26.22,47ZM23.71,13.89A10.4,10.4,0,0,0,13.32,24.28a11.26,11.26,0,0,0,3.06,7.77,12.53,12.53,0,0,1,3.85,8.87v1.81A1.31,1.31,0,0,0,21.53,44h4.69a1.31,1.31,0,0,0,1.3-1.31v-1a13.69,13.69,0,0,1,3.85-9.68,11.26,11.26,0,0,0,3.06-7.77A10.4,10.4,0,0,0,24,13.89Zm5.85,36.65a1.5,1.5,0,0,0-1.5-1.5H19.69a1.5,1.5,0,0,0,0,3h8.37A1.5,1.5,0,0,0,29.56,50.54ZM28.07,55a1.5,1.5,0,0,0-1.5-1.5H21.18a1.5,1.5,0,0,0,0,3h5.39A1.5,1.5,0,0,0,28.07,55ZM25.49,5.94V1.5a1.5,1.5,0,0,0-3,0V5.94a1.5,1.5,0,1,0,3,0ZM47.82,24.28a1.5,1.5,0,0,0-1.5-1.5H41.88a1.5,1.5,0,1,0,0,3h4.44A1.51,1.51,0,0,0,47.82,24.28Zm-40.38,0a1.5,1.5,0,0,0-1.5-1.5H1.5a1.5,1.5,0,0,0,0,3H5.94A1.5,1.5,0,0,0,7.44,24.28Zm33.37,16.9a1.49,1.49,0,0,0,0-2.12l-3.14-3.14A1.5,1.5,0,0,0,35.55,38l3.14,3.14a1.51,1.51,0,0,0,1.06.44A1.49,1.49,0,0,0,40.81,41.18ZM12.26,12.63a1.49,1.49,0,0,0,0-2.12L9.12,7.37A1.5,1.5,0,1,0,7,9.49l3.14,3.14a1.51,1.51,0,0,0,1.06.44A1.49,1.49,0,0,0,12.26,12.63Zm25.41,0,3.14-3.14a1.49,1.49,0,0,0,0-2.12,1.51,1.51,0,0,0-2.12,0l-3.14,3.14a1.51,1.51,0,0,0,0,2.12,1.53,1.53,0,0,0,1.06.44A1.49,1.49,0,0,0,37.67,12.63ZM9.12,41.18,12.26,38a1.49,1.49,0,0,0,0-2.12,1.51,1.51,0,0,0-2.12,0L7,39.06a1.51,1.51,0,0,0,0,2.12,1.53,1.53,0,0,0,1.06.44A1.49,1.49,0,0,0,9.12,41.18Z" fill="currentColor"/></svg>',
};

/* ---------- Helpers ---------- */
const DATA = window.SITE_DATA || { events: [], projects: [] };
const PAGE = document.body.dataset.page || "";

function esc(value) {
  return String(value ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}
function todayISO() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}
function isUpcoming(ev) {
  return Boolean(ev.date) && ev.date >= todayISO();
}
function upcomingEvents() {
  return DATA.events.filter(isUpcoming).sort((a, b) => a.date.localeCompare(b.date));
}
function pastEvents() {
  return DATA.events.filter((ev) => !isUpcoming(ev)).sort((a, b) => (b.date || "").localeCompare(a.date || ""));
}
function findEvent(slug) { return DATA.events.find((ev) => ev.slug === slug); }
function findProject(slug) { return DATA.projects.find((p) => p.slug === slug); }
function param(name) { return new URLSearchParams(location.search).get(name); }
function externalAttrs(url) {
  return /^https?:/.test(url) ? ' target="_blank" rel="noopener"' : "";
}

/* ---------- Menu bar ---------- */
function renderHeader() {
  const slot = document.getElementById("site-header");
  if (!slot) return;
  const current = (name) => (PAGE === name ? ' aria-current="page"' : "");
  const sep = '<span class="navigation-separator" aria-hidden="true">•</span>';
  slot.outerHTML = `
  <header class="navbar" id="navbar">
    <div class="navbar-inner">
      <a class="header-link" href="index.html" aria-label="Josephine Vains, home"><div class="header-brand">Josephine Vains</div></a>
      <nav class="navigation-items" id="nav-items" aria-label="Main">
        <a class="navigation-item home-nav" href="index.html"${current("home")}>Home</a>
        <a class="navigation-item" href="about.html"${current("about")}>About</a>${sep}
        <a class="navigation-item" href="index.html#projects"${current("project")}>Projects</a>${sep}
        <a class="navigation-item" href="events.html"${current("events")}>Events</a>${sep}
        <a class="navigation-item" href="teaching.html"${current("teaching")}>Teaching</a>${sep}
        <a class="navigation-item" href="${CONFIG.youtube}" target="_blank" rel="noopener">Media</a>${sep}
        <a class="button button-menu-bar" href="#contact"><span class="navigation-item-button">Contact</span></a>
      </nav>
      <button class="menu-button" id="menu-button" type="button" aria-expanded="false" aria-controls="nav-items">
        <img src="images/menu-icon.svg" alt="Menu">
      </button>
    </div>
  </header>`;

  const navbar = document.getElementById("navbar");
  const button = document.getElementById("menu-button");
  button.addEventListener("click", () => {
    const open = navbar.classList.toggle("menu-open");
    button.setAttribute("aria-expanded", String(open));
  });
  navbar.querySelectorAll("#nav-items a").forEach((a) =>
    a.addEventListener("click", () => {
      navbar.classList.remove("menu-open");
      button.setAttribute("aria-expanded", "false");
    })
  );
  const onScroll = () => navbar.classList.toggle("is-scrolled", window.scrollY > 40);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

/* ---------- Contact footer ---------- */
function renderFooter() {
  const slot = document.getElementById("site-footer");
  if (!slot) return;
  const tel = CONFIG.phone.replace(/\s/g, "");
  slot.outerHTML = `
  <footer class="footer-section" id="contact">
    <div class="section-bg-container">
      <span class="shape footer-shape-c-l" data-shape="c"></span>
      <span class="shape footer-shape-a-r" data-shape="a"></span>
    </div>
    <div class="container">
      <div class="footer-content-container">
        <img class="footer-image" src="images/footer.png" alt="Josephine Vains with her cello" loading="lazy">
        <div class="footer-text-container">
          <h1 class="heading-footer">Contact</h1>
          <div class="contact-message">
            I’d love to hear from you. Do leave your message below and I’ll be in touch!<br>
            Or you can call me on <a href="tel:${tel}">${CONFIG.phone}</a>
          </div>
          <form class="contact-form" id="contact-form" name="${CONFIG.netlifyFormName}" novalidate>
            <input type="hidden" name="form-name" value="${CONFIG.netlifyFormName}">
            <p class="visually-hidden" aria-hidden="true">
              <label>Leave this empty: <input name="bot-field" tabindex="-1" autocomplete="off"></label>
            </p>
            <label class="contact-form-label" for="name">Name</label>
            <input class="contact-form-field" id="name" name="name" type="text" maxlength="256" placeholder="Enter your first and last name" autocomplete="name" required>
            <label class="contact-form-label" for="email">Email address</label>
            <input class="contact-form-field" id="email" name="email" type="email" maxlength="256" placeholder="Enter your email address" autocomplete="email" required>
            <label class="contact-form-label" for="message">Message</label>
            <textarea class="contact-form-field message-field" id="message" name="message" maxlength="5000" placeholder="Enter your message" required></textarea>
            <button class="button-large button-pink" type="submit">Submit</button>
          </form>
          <div class="form-status" id="form-status" role="status" hidden></div>
        </div>
      </div>
    </div>
  </footer>`;
  setupContactForm();
}

function setupContactForm() {
  const form = document.getElementById("contact-form");
  const status = document.getElementById("form-status");
  if (!form) return;
  const show = (msg) => { status.textContent = msg; status.hidden = false; };
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (!form.reportValidity()) return;
    const button = form.querySelector("button");
    button.disabled = true;
    try {
      // Netlify Forms expects a URL-encoded POST to any page of the site
      const res = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(new FormData(form)).toString(),
      });
      if (!res.ok) throw new Error(res.status);
      form.hidden = true;
      show("Thank you! Your message has been received.");
    } catch {
      show(`Oops! Something went wrong while sending your message. Please try again, or call ${CONFIG.phone}.`);
    } finally {
      button.disabled = false;
    }
  });
}

/* ---------- Background shapes ---------- */
function renderShapes() {
  document.querySelectorAll("[data-shape]").forEach((el) => {
    el.innerHTML = SHAPES[el.dataset.shape] || "";
    el.setAttribute("aria-hidden", "true");
  });
}

/* ---------- Cards ---------- */
function eventCard(ev) {
  const upcoming = isUpcoming(ev);
  const image = ev.image
    ? `<img class="event-image" src="${esc(ev.image)}" alt="" loading="lazy">`
    : `<div class="event-image"><span class="event-icon">${ICONS.event}</span></div>`;
  const book = upcoming && ev.book
    ? `<a class="button button-pink" href="${esc(ev.book)}"${externalAttrs(ev.book)}>Book now</a>` : "";
  return `
  <li>
    <article class="event-item-wrapper${ev.dateText ? "" : " no-date"}">
      ${image}
      <div class="event-info-container">
        ${ev.dateText ? `<div class="event-date">${esc(ev.dateText)}</div>` : ""}
        <h2 class="event-title">${esc(ev.title)}</h2>
        ${ev.location ? `<div class="event-location">${esc(ev.location)}</div>` : ""}
        <p class="event-description">${esc(ev.description)}</p>
        <div class="event-card-cta-container">
          ${book}
          <a class="button button-pink-outline" href="event.html?e=${encodeURIComponent(ev.slug)}">View event<span class="visually-hidden">: ${esc(ev.title)}</span></a>
        </div>
      </div>
    </article>
  </li>`;
}

function projectCard(p) {
  const image = p.image
    ? `<img class="event-image" src="${esc(p.image)}" alt="" loading="lazy">`
    : `<div class="event-image project-accent"><span class="project-default-icon">${ICONS.project}</span></div>`;
  return `
  <li>
    <article class="event-item-wrapper project-accent no-date">
      ${image}
      <div class="event-info-container">
        <h2 class="event-title">${esc(p.title)}</h2>
        <p class="event-description">${esc(p.summary)}</p>
        <a class="button button-yellow" href="project.html?p=${encodeURIComponent(p.slug)}">Read more<span class="visually-hidden">: ${esc(p.title)}</span></a>
      </div>
    </article>
  </li>`;
}

/* ---------- Page: home ---------- */
function renderHome() {
  const list = document.getElementById("home-events");
  const note = document.getElementById("home-events-note");
  if (list) {
    let events = upcomingEvents().slice(0, 6);
    if (!events.length) {
      events = pastEvents().slice(0, 3);
      if (note) { note.textContent = "No upcoming events just now. Here are the most recent."; note.hidden = false; }
    }
    list.innerHTML = events.map(eventCard).join("");
  }
  const projects = document.getElementById("home-projects");
  if (projects) projects.innerHTML = DATA.projects.map(projectCard).join("");
}

/* ---------- Page: events ---------- */
function renderEvents() {
  const up = document.getElementById("upcoming-events");
  const upcoming = upcomingEvents();
  if (up) {
    up.innerHTML = upcoming.length
      ? `<ul class="collection-list">${upcoming.map(eventCard).join("")}</ul>`
      : '<p class="no-events">No upcoming events just now. Check back soon!</p>';
  }

  const pastList = document.getElementById("past-events");
  const more = document.getElementById("past-more");
  if (!pastList) return;
  const past = pastEvents();
  let shown = 0;
  const showMore = () => {
    const next = past.slice(shown, shown + CONFIG.pastEventsPerPage);
    pastList.insertAdjacentHTML("beforeend", next.map(eventCard).join(""));
    shown += next.length;
    if (more) more.hidden = shown >= past.length;
  };
  if (more) more.querySelector("button").addEventListener("click", showMore);
  showMore();
}

/* ---------- Page: single event ---------- */
function renderEvent() {
  const root = document.getElementById("event-root");
  const ev = findEvent(param("e"));
  if (!root) return;
  if (!ev) { renderNotFound(root, "event", "events.html", "Back to events list"); return; }

  document.title = `${ev.title} • Josephine Vains`;
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.setAttribute("content", ev.description);
  const project = ev.project && findProject(ev.project);
  const book = isUpcoming(ev) && ev.book
    ? `<a class="button-large button-pink" href="${esc(ev.book)}"${externalAttrs(ev.book)}>Book now</a>` : "";
  const projectLink = project
    ? `<a class="button-large button-yellow" href="project.html?p=${encodeURIComponent(project.slug)}">View project</a>` : "";

  root.innerHTML = `
    <div class="post-h1">${isUpcoming(ev) ? "Event" : "Past event"}</div>
    <h1 class="page-header event-header">${esc(ev.title)}</h1>
    <div class="intro-highlight hero-intro">${esc(ev.description)}</div>
    <div style="height:24px"></div>
    ${ev.dateText ? `<div class="event-details-container"><span class="event-details-icon">${ICONS.calendar}</span><div>${esc(ev.dateText)}</div></div>` : ""}
    ${ev.location ? `<div class="event-details-container"><span class="event-details-icon location">${ICONS.pin}</span><div>${esc(ev.location)}</div></div>` : ""}
    ${book || projectLink ? `<div class="event-cta-container">${book}${projectLink}</div>` : ""}
    ${ev.image ? `<img class="project-image event-image" src="${esc(ev.image)}" alt="">` : ""}
    <div class="back-cta-container"><a class="button button-back" href="events.html">Back to events list</a></div>`;
}

/* ---------- Page: single project ---------- */
function renderProject() {
  const hero = document.getElementById("project-hero");
  const body = document.getElementById("project-body");
  const p = findProject(param("p"));
  if (!hero) return;
  if (!p) {
    document.getElementById("project-image-wrap")?.remove();
    renderNotFound(hero, "project", "index.html#projects", "Back to project list");
    if (body) body.innerHTML = "";
    return;
  }

  document.title = `${p.title} • Josephine Vains`;
  hero.innerHTML = `
    <div class="post-h1">Project</div>
    <h1 class="page-header project-header">${esc(p.title)}</h1>
    <div class="intro-highlight hero-intro">${esc(p.summary)}</div>`;

  const imgWrap = document.getElementById("project-image-wrap");
  if (imgWrap) {
    imgWrap.innerHTML = p.image ? `<img class="project-image" src="${esc(p.image)}" alt="">` : "";
    if (!p.image) imgWrap.style.marginTop = "0";
  }

  const related = p.relatedEvent && findEvent(p.relatedEvent);
  body.innerHTML = `
    <div class="container">
      ${p.book || p.moreInfo ? `
      <div class="proj-more-info-box">
        ${p.moreInfo ? `<div class="more-information-box-heading">More information</div><div class="more-info-body">${esc(p.moreInfo)}</div>` : ""}
        ${p.book ? `<a class="button-large button-yellow" href="${esc(p.book)}"${externalAttrs(p.book)}>Book now</a>` : ""}
      </div>` : ""}
      <h2 class="single-col-heading">About the project</h2>
      <div class="rich-text">${(p.body || []).map((para) => `<p>${esc(para)}</p>`).join("")}</div>
    </div>
    <div class="back-cta-container"><a class="button button-back" href="index.html#projects">Back to project list</a></div>
    ${related ? `
    <div class="container">
      <h2 class="related-event-heading">Related event</h2>
      <ul class="collection-list related-event-card-wrapper" style="grid-template-columns:1fr;margin:0 auto">${eventCard(related)}</ul>
    </div>` : ""}`;
}

function renderNotFound(root, kind, href, label) {
  root.innerHTML = `
    <h1 class="page-header">Not found</h1>
    <div class="intro-highlight hero-intro">Sorry, that ${kind} couldn’t be found.</div>
    <div class="back-cta-container"><a class="button button-back" href="${href}">${label}</a></div>`;
}

/* ---------- Start ---------- */
renderHeader();
renderFooter();
renderShapes();
({ home: renderHome, events: renderEvents, event: renderEvent, project: renderProject }[PAGE] || (() => {}))();
