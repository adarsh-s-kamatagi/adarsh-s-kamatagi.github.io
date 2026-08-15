// ---------------------------------------------------------------------------
// Theme toggle (persisted in localStorage, respects system preference on
// first visit)
// ---------------------------------------------------------------------------
(function () {
  const root = document.documentElement;
  const KEY = "blog-theme";

  function apply(theme) {
    if (theme === "dark") {
      root.setAttribute("data-theme", "dark");
    } else {
      root.removeAttribute("data-theme");
    }
  }

  const saved = localStorage.getItem(KEY);
  const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  apply(saved || (systemDark ? "dark" : "light"));

  window.addEventListener("DOMContentLoaded", () => {
    const btn = document.getElementById("theme-toggle");
    if (!btn) return;

    const setLabel = () => {
      const isDark = root.getAttribute("data-theme") === "dark";
      btn.textContent = isDark ? "light mode" : "dark mode";
    };
    setLabel();

    btn.addEventListener("click", () => {
      const isDark = root.getAttribute("data-theme") === "dark";
      const next = isDark ? "light" : "dark";
      apply(next);
      localStorage.setItem(KEY, next);
      setLabel();
    });
  });
})();
