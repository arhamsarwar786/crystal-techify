export const CALENDLY_URL = "https://calendly.com/arhamsarwar786/30min";

declare global {
  interface Window {
    Calendly?: {
      initPopupWidget: (options: { url: string }) => void;
    };
  }
}

/** Opens the Calendly scheduling popup. No-op until the widget script has loaded. */
export function openCalendly() {
  if (typeof window !== "undefined" && window.Calendly) {
    window.Calendly.initPopupWidget({ url: CALENDLY_URL });
  }
}
