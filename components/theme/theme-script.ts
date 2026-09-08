/**
 * Runs before first paint (injected inline in <head>) so the correct theme
 * class is on <html> immediately — no flash of the wrong palette.
 *
 * Resolution order: `?theme=` query param (also persisted) → saved choice →
 * dark (site default). Light is only used when the visitor picks it.
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
      try { localStorage.setItem('ct-theme-v2', q); } catch (e) {}
    }
    var stored = q || localStorage.getItem('ct-theme-v2');
    var theme = stored === 'light' ? 'light' : 'dark';
    var root = document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    root.style.colorScheme = theme;
  } catch (e) {}
})();
`;
