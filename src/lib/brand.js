// KORZAVO MEALS — central brand settings.
// Anything marked CONFIRM is a placeholder until the final details are agreed.

export const SITE_NAME = "KORZAVO MEALS";
export const BRAND_TAGLINE = "Healthy Meals. Real Results.";
export const CURRENCY = "NZD";

// CONFIRM: final domain and email addresses.
export const SITE_URL = import.meta.env.VITE_SITE_URL || "https://korzavomeals.com";
// Customer questions and support enquiries from the website go to this address.
export const CONTACT_EMAIL = import.meta.env.VITE_CONTACT_EMAIL || "uwem@korzavo.com";
// Official / business address (corporate and gym partnerships, the CEO's outreach).
export const CORPORATE_EMAIL = import.meta.env.VITE_CORPORATE_EMAIL || "info@korzavo.com";

// The dedicated agent who handles customer questions and inquiries.
export const INQUIRY_AGENT = "Uwem";

export const LAUNCH_LOCATION = "Tauranga, New Zealand";

export const formatNZD = (n) => `$${Number(n || 0).toFixed(2)}`;

export const NAV_LINKS = [
  { label: "Menu", to: "/shop" },
  { label: "Weekly Plans", to: "/weekly-plans" },
  { label: "Corporate", to: "/corporate" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

// Where ordering is open. Browsing is open to everyone; orders are only for
// people in Tauranga, New Zealand.
export const SERVICE_AREA_NAME = "Tauranga, New Zealand";
// Postcodes we deliver to. CONFIRM this list against your real delivery zone.
// (The server uses DELIVERY_POSTCODES from the Vercel settings if it is set.)
export const DELIVERY_POSTCODES = (import.meta.env.VITE_DELIVERY_POSTCODES || "3110,3112,3116,3118")
  .split(",").map((p) => p.trim()).filter(Boolean);
