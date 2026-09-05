/**
 * Runs before first paint (injected inline in <head>) so the correct theme
 * class is on <html> immediately — no flash of the wrong palette.
 *
 * Resolution order: `?theme=` query param (also persisted) → saved choice →
 * OS preference.
 */
export const themeScript = `
(function () {
  try {
    var q = null;
    try {
      var p = new URLSearchParams(window.location.search).get('theme');
      if (p === 'light' || p === 'dark') q = p;
    } catch (e) {}
    if (q) {
      try { localStorage.setItem('ct-theme', q); } catch (e) {}
    }
    var stored = q || localStorage.getItem('ct-theme');
    var system = window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
    var theme = stored === 'light' || stored === 'dark' ? stored : system;
    var root = document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    root.style.colorScheme = theme;
  } catch (e) {}
})();
`;
