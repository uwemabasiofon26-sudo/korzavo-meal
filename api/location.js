// Vercel serverless function — GET /api/location
// Tells the website where the visitor is (from Vercel's IP lookup) so it can
// show "ordering is for Tauranga, New Zealand only" to visitors elsewhere.
// Anyone can still browse. The server repeats this check when an order starts.
//
// ORDER_LOCATION_CHECK=off switches the country check off (for testing from
// outside New Zealand). Leave it unset in production.

export default function handler(req, res) {
  const country = String(req.headers['x-vercel-ip-country'] || '').toUpperCase();
  const checkOn = (process.env.ORDER_LOCATION_CHECK || 'on') !== 'off';
  // No header at all means local development; Vercel always sends it in production.
  const unknown = !country;
  const allowed = !checkOn || country === 'NZ' || (unknown && process.env.VERCEL !== '1');
  res.setHeader('Cache-Control', 'private, no-store');
  return res.status(200).json({ country, allowed, checkOn });
}
