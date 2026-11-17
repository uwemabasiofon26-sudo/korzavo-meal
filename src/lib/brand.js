// KORZAVO MEALS — central brand settings.
// Anything marked CONFIRM is a placeholder until the final details are agreed.

export const SITE_NAME = "KORZAVO MEALS";
export const BRAND_TAGLINE = "Eat Better. Feel Stronger. Live Healthier.";
export const CURRENCY = "NZD";

// CONFIRM: final domain and email addresses.
export const SITE_URL = import.meta.env.VITE_SITE_URL || "https://korzavomeals.co.nz";
export const CONTACT_EMAIL = import.meta.env.VITE_CONTACT_EMAIL || "hello@korzavomeals.co.nz";
export const CORPORATE_EMAIL = import.meta.env.VITE_CORPORATE_EMAIL || "corporate@korzavomeals.co.nz";

export const LAUNCH_LOCATION = "Tauranga, New Zealand";

export const formatNZD = (n) => `$${Number(n || 0).toFixed(2)}`;

export const NAV_LINKS = [
  { label: "Menu", to: "/shop" },
  { label: "Weekly Plans", to: "/weekly-plans" },
  { label: "Corporate", to: "/corporate" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];
