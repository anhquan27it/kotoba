const preferenceKey = "learnnova:theme";

// Runs before the first paint so a saved dark theme does not flash white.
export const themeInitScript = `(() => {
  let theme;
  try { theme = localStorage.getItem("${preferenceKey}"); } catch {}
  const dark = theme === "dark" || (theme !== "light" && window.matchMedia("(prefers-color-scheme: dark)").matches);
  document.documentElement.dataset.theme = dark ? "dark" : "light";
})();`;
