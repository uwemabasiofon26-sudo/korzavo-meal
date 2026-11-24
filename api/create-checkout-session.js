// Vercel serverless function — POST /api/create-checkout-session
//
// Creates a Stripe Checkout Session for the customer's cart. Before it does:
//  - ordering must be switched on (ORDERING_OPEN=true)
//  - the visitor must be in New Zealand (Vercel's IP lookup), and the delivery
//    address must be in the Tauranga delivery area (postcode check)
//  - prices come from api/_menu.js, never from the browser
//  - the free breakfasts / soup / desserts the customer picked must match the rules
//
// Requires STRIPE_SECRET_KEY and DELIVERY_FEE_NZD in the Vercel project's
// environment variables. Never commit a real secret key to source control.

import Stripe from 'stripe';
import { MENU, BREAKFASTS, SOUPS, DESSERTS, breakfastsAllowed, soupsAllowed, dessertsAllowed, deliveryPostcodes } from './_menu.js';

const fail = (res, status, error) => res.status(status).json({ error });
const clean = (v, max) => String(v ?? '').replace(/[\u0000-\u001f]/g, ' ').trim().slice(0, max);

// Validate a { slug: qty } map of free extras against the allowed list.
function readExtras(raw, catalog) {
  const out = {};
  let total = 0;
  for (const [slug, qty] of Object.entries(raw || {})) {
    const n = parseInt(qty, 10);
    if (!n || n < 0) continue;
    if (!catalog[slug]) return null;
    out[slug] = n;
    total += n;
  }
  return { map: out, total };
}
const describe = (map, catalog) =>
  Object.entries(map).map(([slug, n]) => `${catalog[slug]} x${n}`).join('; ');

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return fail(res, 405, 'Method not allowed');
  }

  // Orders stay closed until delivery fees, areas and availability are confirmed.
  if (process.env.ORDERING_OPEN !== 'true') {
    return fail(res, 503, 'Ordering is not open yet. Please check back soon or contact us.');
  }

  // Ordering is for people in New Zealand only (the exact Tauranga check is the
  // delivery postcode below). ORDER_LOCATION_CHECK=off is for testing only.
  if ((process.env.ORDER_LOCATION_CHECK || 'on') !== 'off') {
    const country = String(req.headers['x-vercel-ip-country'] || '').toUpperCase();
    const local = !country && process.env.VERCEL !== '1';
    if (country !== 'NZ' && !local) {
      return fail(res, 403, 'Ordering is only available in Tauranga, New Zealand. You are welcome to keep browsing the menu.');
    }
  }

  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) return fail(res, 500, 'Payments are not configured yet.');

  const feeRaw = process.env.DELIVERY_FEE_NZD;
  const fee = feeRaw === undefined || feeRaw === '' ? NaN : Number(feeRaw);
  if (!Number.isFinite(fee) || fee < 0) {
    return fail(res, 503, 'Delivery is not configured yet. Please contact us to place an order.');
  }

  try {
    const { items = [], extras = {}, delivery = {} } = req.body || {};
    if (!Array.isArray(items) || items.length === 0 || items.length > 30) return fail(res, 400, 'Cart is empty.');

    // ---- items, prices, meal counts
    const line_items = [];
    let lunches = 0;
    let dinners = 0;
    const host = `https://${req.headers.host}`;
    for (const item of items) {
      const entry = MENU[item && item.slug];
      if (!entry) return fail(res, 400, 'One of the items in your cart is no longer available.');
      const qty = Math.min(Math.max(parseInt(item.qty, 10) || 1, 1), 50);
      const meals = qty * (entry.meals || 1);
      if (entry.type === 'lunch') lunches += meals;
      if (entry.type === 'dinner') dinners += meals;
      line_items.push({
        price_data: {
          currency: 'nzd',
          product_data: {
            name: entry.name,
            images: [new URL(`/images/meals/${item.slug}.jpg`, host).toString()],
            metadata: { slug: item.slug },
          },
          unit_amount: Math.round(entry.price * 100),
        },
        quantity: qty,
      });
    }

    // ---- free extras must match the rules exactly
    const wantB = breakfastsAllowed(lunches);
    const wantS = soupsAllowed(dinners);
    const wantD = dessertsAllowed(lunches, dinners);
    const b = readExtras(extras.breakfasts, BREAKFASTS);
    const s = readExtras(extras.soups, SOUPS);
    const ds = readExtras(extras.desserts, DESSERTS);
    if (!b || !s || !ds) return fail(res, 400, 'One of the free extras you chose is not available.');
    if (b.total !== wantB) {
      return fail(res, 400, wantB ? `Please choose exactly ${wantB} free breakfasts.` : 'Free breakfasts come with orders of 5 or more lunch meals.');
    }
    if (s.total !== wantS) {
      return fail(res, 400, wantS ? `Please choose your ${wantS} free soup.` : 'A free soup comes with orders of 3 or more dinners.');
    }
    if (ds.total !== wantD) {
      return fail(res, 400, wantD ? `Please choose exactly ${wantD} free dessert cups.` : 'Free dessert cups come with a full week of orders: 5 or more lunches and 3 or more dinners.');
    }

    // ---- delivery details and area
    const d = {
      name: clean(delivery.name, 100),
      phone: clean(delivery.phone, 30),
      line1: clean(delivery.line1, 120),
      suburb: clean(delivery.suburb, 60),
      postcode: clean(delivery.postcode, 4),
    };
    if (d.name.length < 2 || d.phone.replace(/\D/g, '').length < 7 || d.line1.length < 3 || d.suburb.length < 2) {
      return fail(res, 400, 'Please add your name, phone number and delivery address.');
    }
    if (!deliveryPostcodes().includes(d.postcode)) {
      return fail(res, 403, 'Sorry, we currently deliver to Tauranga, New Zealand only.');
    }

    // ---- delivery fee as a line item (set DELIVERY_FEE_NZD in Vercel; 0 = free)
    if (fee > 0) {
      line_items.push({
        price_data: { currency: 'nzd', product_data: { name: 'Delivery' }, unit_amount: Math.round(fee * 100) },
        quantity: 1,
      });
    }

    const stripe = new Stripe(secretKey);
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items,
      currency: 'nzd',
      allow_promotion_codes: true,
      customer_creation: 'always',
      // Our own form collected the address, so Stripe doesn't ask for it again.
      payment_intent_data: {
        shipping: {
          name: d.name,
          phone: d.phone,
          address: { line1: d.line1, city: d.suburb, postal_code: d.postcode, country: 'NZ' },
        },
      },
      metadata: {
        delivery_name: d.name,
        delivery_phone: d.phone,
        delivery_address: `${d.line1}, ${d.suburb} ${d.postcode}, New Zealand`,
        lunch_meals: String(lunches),
        dinner_meals: String(dinners),
        free_breakfasts: describe(b.map, BREAKFASTS).slice(0, 480),
        free_soups: describe(s.map, SOUPS).slice(0, 480),
        free_desserts: describe(ds.map, DESSERTS).slice(0, 480),
      },
      success_url: `${host}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${host}/checkout/cancel`,
    });

    return res.status(200).json({ url: session.url });
  } catch (err) {
    console.error('Stripe checkout session error:', err);
    return fail(res, 500, 'Unable to start checkout. Please try again or contact us.');
  }
}
