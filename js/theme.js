/**
 * Giao diện sáng/tối.
 * Chạy sớm trong <head> để gắn data-theme trước khi trang vẽ,
 * tránh bị nháy màu khi người dùng đã chọn giao diện trước đó.
 */
(function () {
  "use strict";

  const STORAGE_KEY = "portfolio-theme";
  const THEMES = ["dark", "light"];
  const root = document.documentElement;

  function readSavedTheme() {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      return THEMES.indexOf(saved) === -1 ? null : saved;
    } catch (error) {
      return null;
    }
  }

  const savedTheme = readSavedTheme();
  if (savedTheme) {
    root.dataset.theme = savedTheme;
  }

  /* Giữ màu thanh trình duyệt khớp với nền trang */
  function updateThemeColor() {
    const meta = document.querySelector('meta[name="theme-color"]');
    if (!meta) return;

    const background = window.getComputedStyle(root).getPropertyValue("--bg").trim();
    if (background) {
      meta.setAttribute("content", background);
    }
  }

  function bindToggle() {
    const toggle = document.querySelector("[data-theme-toggle]");
    if (!toggle) return;

    toggle.hidden = false;
    toggle.setAttribute("aria-pressed", String(root.dataset.theme === "dark"));

    toggle.addEventListener("click", function () {
      const nextTheme = root.dataset.theme === "dark" ? "light" : "dark";
      root.dataset.theme = nextTheme;
      toggle.setAttribute("aria-pressed", String(nextTheme === "dark"));

      try {
        window.localStorage.setItem(STORAGE_KEY, nextTheme);
      } catch (error) {
        // Trình duyệt chặn localStorage thì chỉ đổi giao diện trong phiên hiện tại.
      }

      updateThemeColor();
    });

    updateThemeColor();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bindToggle);
  } else {
    bindToggle();
  }
})();
