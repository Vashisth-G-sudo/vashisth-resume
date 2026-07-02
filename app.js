// Data-driven resume: fetch data.json and render every section from it.
const $ = (sel) => document.querySelector(sel);
const el = (tag, cls, html) => {
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  if (html !== undefined) n.innerHTML = html;
  return n;
};

async function render() {
  let data;
  try {
    const res = await fetch("data.json", { cache: "no-store" });
    data = await res.json();
  } catch (e) {
    $("#app").innerHTML =
      "<p style='padding:40px;text-align:center'>Could not load resume data.</p>";
    return;
  }

  document.title = `${data.profile.name} — ${data.profile.title}`;

  // --- Hero ---
  $("#hero-eyebrow").textContent = data.profile.eyebrow;
  $("#hero-name").textContent = data.profile.name;
  $("#hero-title").textContent = data.profile.title;
  $("#hero-tagline").textContent = data.profile.tagline;
  $("#hero-email").href = `mailto:${data.contact.email}`;

  const contact = $("#contact-row");
  contact.innerHTML = "";
  contact.appendChild(
    Object.assign(el("a", null, `✉️ ${data.contact.email}`), {
      href: `mailto:${data.contact.email}`,
    })
  );
  contact.appendChild(
    Object.assign(el("a", null, "in LinkedIn"), {
      href: data.contact.linkedin,
      target: "_blank",
      rel: "noopener",
    })
  );
  contact.appendChild(
    Object.assign(el("a", null, "⌨ GitHub"), {
      href: data.contact.github,
      target: "_blank",
      rel: "noopener",
    })
  );

  // --- About ---
  $("#about-text").textContent = data.about;

  // --- Skills ---
  const skills = $("#skills-grid");
  skills.innerHTML = "";
  data.skills.forEach((s) => {
    const card = el("div", "skill-card");
    card.appendChild(el("h4", null, s.group));
    card.appendChild(el("p", null, s.items));
    skills.appendChild(card);
  });

  // --- Experience ---
  const tl = $("#timeline");
  tl.innerHTML = "";
  data.experience.forEach((job) => {
    const j = el("div", "job");
    const head = el("div", "job-head");
    head.appendChild(el("h4", null, job.role));
    head.appendChild(el("span", "company", job.company));
    head.appendChild(el("span", "dates", job.dates));
    j.appendChild(head);
    if (job.note) j.appendChild(el("p", "roles", job.note));
    const ul = el("ul");
    job.points.forEach((pt) => ul.appendChild(el("li", null, pt)));
    j.appendChild(ul);
    tl.appendChild(j);
  });

  // --- Projects ---
  const pg = $("#project-grid");
  pg.innerHTML = "";
  data.projects.forEach((p) => {
    const card = el("article", "project-card");
    card.appendChild(el("div", "pc-emoji", p.emoji));
    card.appendChild(el("h4", null, p.name));
    card.appendChild(el("p", null, p.desc));
    const tags = el("div", "tags");
    p.tags.forEach((t) => tags.appendChild(el("span", null, t)));
    card.appendChild(tags);
    const links = el("div", "pc-links");
    p.links.forEach((l) => {
      const a = Object.assign(el("a", null, l.label), {
        href: l.url,
        target: "_blank",
        rel: "noopener",
      });
      links.appendChild(a);
    });
    card.appendChild(links);
    pg.appendChild(card);
  });

  // --- Academic projects ---
  const ag = $("#academic-grid");
  ag.innerHTML = "";
  data.academicProjects.forEach((p) => {
    const card = el("article", "project-card muted");
    card.appendChild(el("h4", null, p.name));
    card.appendChild(el("p", null, p.desc));
    ag.appendChild(card);
  });

  // --- Education ---
  $("#edu-school").textContent = data.education.school;
  $("#edu-degree").textContent = data.education.degree;
  $("#edu-spec").textContent = data.education.specialization;

  // --- Footer ---
  $("#footer-line").innerHTML =
    `${data.profile.name} · <a href="mailto:${data.contact.email}">${data.contact.email}</a>`;
}

// --- Theme toggle (dynamic touch) ---
function initTheme() {
  const saved = localStorage.getItem("theme");
  if (saved === "light") document.body.classList.add("light");
  const btn = $("#theme-toggle");
  const setLabel = () =>
    (btn.textContent = document.body.classList.contains("light") ? "🌙" : "☀️");
  setLabel();
  btn.addEventListener("click", () => {
    document.body.classList.toggle("light");
    localStorage.setItem(
      "theme",
      document.body.classList.contains("light") ? "light" : "dark"
    );
    setLabel();
  });
}

// --- Nav behavior ---
function initNav() {
  const nav = $("#nav");
  window.addEventListener("scroll", () =>
    nav.classList.toggle("scrolled", window.scrollY > 40)
  );
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const t = document.querySelector(a.getAttribute("href"));
      if (t) {
        e.preventDefault();
        t.scrollIntoView({ behavior: "smooth" });
      }
    });
  });
}

render();
initTheme();
initNav();
