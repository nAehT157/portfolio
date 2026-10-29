/**
 * Tương tác giao diện: menu mobile, mục đang xem, hiệu ứng hiện dần, năm ở footer.
 * Không phụ thuộc thư viện ngoài.
 */
(function () {
  "use strict";

  const MOBILE_BREAKPOINT = "(max-width: 820px)";

  function setupMobileNav() {
    const toggle = document.querySelector("[data-nav-toggle]");
    const nav = document.getElementById("site-nav");
    if (!toggle || !nav) return;

    toggle.hidden = false;

    function setOpen(isOpen) {
      nav.classList.toggle("is-open", isOpen);
      toggle.classList.toggle("is-active", isOpen);
      toggle.setAttribute("aria-expanded", String(isOpen));
    }

    toggle.addEventListener("click", function () {
      setOpen(toggle.getAttribute("aria-expanded") !== "true");
    });

    nav.addEventListener("click", function (event) {
      if (event.target.closest("a")) {
        setOpen(false);
      }
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    });

    const mediaQuery = window.matchMedia(MOBILE_BREAKPOINT);
    const closeOnDesktop = function (event) {
      if (!event.matches) setOpen(false);
    };

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", closeOnDesktop);
    } else {
      mediaQuery.addListener(closeOnDesktop);
    }
  }

  function setupHeaderState() {
    const header = document.querySelector("[data-header]");
    if (!header) return;

    let waitingForFrame = false;

    function update() {
      header.classList.toggle("is-scrolled", window.scrollY > 8);
      waitingForFrame = false;
    }

    window.addEventListener(
      "scroll",
      function () {
        if (waitingForFrame) return;
        waitingForFrame = true;
        window.requestAnimationFrame(update);
      },
      { passive: true }
    );

    update();
  }

  function setupActiveSection() {
    const links = Array.from(document.querySelectorAll("[data-nav-link]"));
    if (links.length === 0 || !("IntersectionObserver" in window)) return;

    const linkBySection = new Map();

    links.forEach(function (link) {
      const sectionId = link.getAttribute("href").replace("#", "");
      const section = document.getElementById(sectionId);
      if (section) linkBySection.set(section, link);
    });

    const hero = document.getElementById("hero");
    if (hero) linkBySection.set(hero, null);
    if (linkBySection.size === 0) return;

    function clearCurrent() {
      links.forEach(function (link) {
        link.removeAttribute("aria-current");
      });
    }

    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;

          clearCurrent();
          const link = linkBySection.get(entry.target);
          if (link) link.setAttribute("aria-current", "location");
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );

    linkBySection.forEach(function (_link, section) {
      observer.observe(section);
    });
  }

  function setupReveal() {
    const elements = Array.from(document.querySelectorAll(".reveal"));
    if (elements.length === 0) return;

    if (!("IntersectionObserver" in window)) {
      elements.forEach(function (element) {
        element.classList.add("is-visible");
      });
      return;
    }

    const observer = new IntersectionObserver(
      function (entries, currentObserver) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          currentObserver.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.1 }
    );

    elements.forEach(function (element) {
      observer.observe(element);
    });
  }

  function setupYear() {
    const year = String(new Date().getFullYear());
    document.querySelectorAll("[data-current-year]").forEach(function (element) {
      element.textContent = year;
    });
  }

  function setupImageScroll() {
    document.querySelectorAll(".image-scroll").forEach(function (container) {
      let isDown = false;
      let startX;
      let scrollLeft;

      container.addEventListener("mousedown", function (e) {
        isDown = true;
        startX = e.pageX - container.offsetLeft;
        scrollLeft = container.scrollLeft;
      });

      container.addEventListener("mouseleave", function () {
        isDown = false;
      });

      container.addEventListener("mouseup", function () {
        isDown = false;
      });

      container.addEventListener("mousemove", function (e) {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - container.offsetLeft;
        const walk = (x - startX) * 2;
        container.scrollLeft = scrollLeft - walk;
      });
    });
  }

  function init() {
    setupMobileNav();
    setupHeaderState();
    setupActiveSection();
    setupReveal();
    setupYear();
    setupImageScroll();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
