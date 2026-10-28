/**
 * Chuyển đổi song ngữ Việt–Anh.
 * Bản tiếng Việt nằm trong index.html, file này chỉ chứa bản tiếng Anh
 * nên khi tắt JavaScript trang vẫn hiển thị đầy đủ nội dung tiếng Việt.
 */
(function () {
  "use strict";

  const STORAGE_KEY = "portfolio-language";
  const DEFAULT_LANGUAGE = "vi";
  const SUPPORTED_LANGUAGES = ["vi", "en"];

  /* Nhãn của nút chuyển ngữ: hiển thị ngôn ngữ sẽ chuyển tới */
  const TOGGLE_LABELS = {
    vi: { text: "EN", ariaLabel: "EN – Chuyển sang tiếng Anh" },
    en: { text: "VI", ariaLabel: "VI – Switch to Vietnamese" }
  };

  const ATTRIBUTE_KEYS = {
    "data-i18n-aria-label": "aria-label",
    "data-i18n-content": "content"
  };

  const TRANSLATIONS = {
    en: {
      "meta.title": "Nguyen Van A — Full-stack Developer",
      "meta.description": "Portfolio of Nguyen Van A, a third-year student at HCMUTE learning full-stack web development with Java, React and SQL.",

      "a11y.skip": "Skip to content",
      "a11y.theme": "Toggle light and dark theme",
      "a11y.newTab": "(opens in a new tab)",

      "nav.label": "Main navigation",
      "nav.about": "About",
      "nav.skills": "Skills",
      "nav.projects": "Projects",
      "nav.contact": "Contact",

      "hero.status": "Open to internship opportunities",
      "hero.greeting": "Hi, I'm",
      "hero.tagline": "Third-year student at HCMUTE, learning to build web products from the interface down to the database.",
      "hero.ctaProjects": "View projects",
      "hero.ctaContact": "Get in touch",
      "hero.badge": "Java · React · SQL",

      "about.eyebrow": "01 — About",
      "about.title": "About me",
      "about.p1": "I'm a third-year student at HCMUTE, currently focusing on full-stack web development. I like working on a feature from database design and backend code to the finished interface.",
      "about.p2": "I have used Java Servlet/JSP, JDBC and MySQL in course projects, and I am now learning React, TypeScript and PostgreSQL.",
      "about.p3": "My next goal is an internship where I can work on a real product, learn how a team works and write code that is covered by tests.",
      "about.cta": "Send me an email",
      "about.factRoleLabel": "Focus",
      "about.factRole": "Full-stack Developer",
      "about.factSchoolLabel": "Education",
      "about.factSchool": "Third-year student, HCMUTE",
      "about.factLocationLabel": "Location",
      "about.factLocation": "Ho Chi Minh City, Vietnam",
      "about.factFocusLabel": "Currently learning",

      "skills.eyebrow": "02 — Skills",
      "skills.title": "Skills",
      "skills.lead": "Technologies I have used in coursework and projects, plus a few I am learning.",
      "skills.backend": "Backend",
      "skills.frontend": "Frontend",
      "skills.database": "Database",
      "skills.tools": "Tools",

      "projects.eyebrow": "03 — Projects",
      "projects.title": "Projects",
      "projects.lead": "A few selected projects. Descriptions, screenshots and source links are still being updated.",
      "projects.p1Title": "Hotel booking website",
      "projects.p1Desc": "Course project: search for rooms, book a room and manage bookings. The backend uses Servlet/JSP and stores data in MySQL.",
      "projects.p2Title": "Task management app",
      "projects.p2Desc": "Self-taught project: create, edit and filter tasks by status. The interface is being finished with React and TypeScript.",
      "projects.p3Title": "Personal portfolio",
      "projects.p3Desc": "The page you are viewing: plain HTML, CSS and JavaScript with no libraries, plus light/dark mode and Vietnamese–English switching.",
      "projects.code": "View on GitHub",

      "contact.eyebrow": "04 — Contact",
      "contact.title": "Contact",
      "contact.lead": "I am looking for an internship. If you have a question or want to talk, send me an email or reach out on GitHub.",
      "contact.emailLabel": "Email",
      "contact.githubLabel": "GitHub",

      "footer.note": "Built with plain HTML, CSS and JavaScript.",
      "footer.top": "Back to top"
    }
  };

  const textEntries = [];
  const attributeEntries = [];
  let currentLanguage = DEFAULT_LANGUAGE;

  function collectEntries() {
    document.querySelectorAll("[data-i18n]").forEach(function (element) {
      textEntries.push({
        element: element,
        key: element.dataset.i18n,
        original: element.textContent
      });
    });

    Object.keys(ATTRIBUTE_KEYS).forEach(function (selector) {
      const attribute = ATTRIBUTE_KEYS[selector];

      document.querySelectorAll("[" + selector + "]").forEach(function (element) {
        attributeEntries.push({
          element: element,
          attribute: attribute,
          key: element.getAttribute(selector),
          original: element.getAttribute(attribute) || ""
        });
      });
    });
  }

  function translate(key) {
    const dictionary = TRANSLATIONS.en;
    return Object.prototype.hasOwnProperty.call(dictionary, key) ? dictionary[key] : null;
  }

  function applyTranslations(language) {
    textEntries.forEach(function (entry) {
      const translated = language === "en" ? translate(entry.key) : null;
      entry.element.textContent = translated === null ? entry.original : translated;
    });

    attributeEntries.forEach(function (entry) {
      const translated = language === "en" ? translate(entry.key) : null;
      entry.element.setAttribute(entry.attribute, translated === null ? entry.original : translated);
    });
  }

  function syncToggle(language) {
    const toggle = document.querySelector("[data-lang-toggle]");
    if (!toggle) return;

    const labels = TOGGLE_LABELS[language];
    toggle.textContent = labels.text;
    toggle.setAttribute("aria-label", labels.ariaLabel);
    toggle.hidden = false;
  }

  function setLanguage(language, shouldPersist) {
    if (SUPPORTED_LANGUAGES.indexOf(language) === -1) return;

    currentLanguage = language;
    document.documentElement.lang = language;
    applyTranslations(language);
    syncToggle(language);

    if (!shouldPersist) return;

    try {
      window.localStorage.setItem(STORAGE_KEY, language);
    } catch (error) {
      // Trình duyệt chặn localStorage thì chỉ đổi ngôn ngữ trong phiên hiện tại.
    }
  }

  function readSavedLanguage() {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      return SUPPORTED_LANGUAGES.indexOf(saved) === -1 ? DEFAULT_LANGUAGE : saved;
    } catch (error) {
      return DEFAULT_LANGUAGE;
    }
  }

  function setupToggle() {
    const toggle = document.querySelector("[data-lang-toggle]");
    if (!toggle) return;

    toggle.addEventListener("click", function () {
      const nextLanguage = currentLanguage === "vi" ? "en" : "vi";
      setLanguage(nextLanguage, true);
    });
  }

  function init() {
    collectEntries();
    setLanguage(readSavedLanguage(), false);
    setupToggle();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
