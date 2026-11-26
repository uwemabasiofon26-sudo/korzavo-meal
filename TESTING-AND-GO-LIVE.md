# KORZAVO MEALS — Stripe test mode and go-live guide

## A. Set up the preview for test orders (Vercel → Project → Settings → Environment Variables)
Tick the **Preview** box for each one. Website settings that start with `VITE_` are baked in when the site
is built, so **redeploy the preview after changing them** (Deployments → ⋯ → Redeploy).

| Name | Value for testing |
|---|---|
| `ORDERING_OPEN` | `true` |
| `VITE_ORDERING_OPEN` | `true` |
| `VITE_TEST_MODE` | `true` (shows the test-card hint in the cart) |
| `ORDER_LOCATION_CHECK` | `off` (lets you test from outside New Zealand) |
| `DELIVERY_FEE_NZD` | any number, e.g. `6` (use `0` for free delivery). Checkout will not start if this is empty |
| `DELIVERY_POSTCODES` and `VITE_DELIVERY_POSTCODES` | `3110,3112,3116,3118` (confirm your real zone before launch) |
| `STRIPE_SECRET_KEY` | your **test** key, starts with `sk_test_` |
| `STRIPE_WEBHOOK_SECRET` | the `whsec_...` signing secret from step B (only needed for emails) |
| `RESEND_API_KEY` etc. | optional for now. Without it, orders and payments still work, only the emails are skipped |

## B. Stripe (switch the dashboard to **Test mode**)
1. Developers → API keys → copy the **Secret key** (`sk_test_...`) into `STRIPE_SECRET_KEY`.
2. Developers → Webhooks → Add endpoint:
   - URL: `https://YOUR-PREVIEW-URL/api/stripe-webhook`
   - Event: `checkout.session.completed`
   - Copy its **Signing secret** into `STRIPE_WEBHOOK_SECRET`, then redeploy.
3. Vercel previews are usually password-protected, which blocks Stripe. Either turn off Deployment Protection
   for previews while testing, or create a *Protection Bypass for Automation* secret (Settings → Deployment
   Protection) and add `?x-vercel-protection-bypass=THE_SECRET` to the end of the webhook URL.

## C. Run a test order
1. Add 5 lunches and 3 dinners, choose the free breakfasts, soup and 2 desserts.
2. Enter a delivery address with postcode 3110, then Proceed to Checkout.
3. Pay with card `4242 4242 4242 4242`, any future date, any CVC. (Declined test: `4000 0000 0000 0002`.)
4. You should land on the Order Confirmed page showing your free extras and delivery address.
5. Stripe (Test mode) → Payments → open the payment: the free extras and delivery details are in its metadata.
6. With Resend set up, two emails go out: the customer confirmation and a "new order" email to support@korzavo.com.

Also try: 4 lunches only (no breakfast picker), 2 dinners (no soup), a postcode like 2000 (blocked).

## D. Going live (production)
1. Stripe: switch to **Live** mode, copy the live secret key, create a **live** webhook for
   `https://korzavomeals.com/api/stripe-webhook`, copy its signing secret.
2. Vercel → Production environment variables: live `STRIPE_SECRET_KEY` and `STRIPE_WEBHOOK_SECRET`,
   `ORDERING_OPEN=true`, `VITE_ORDERING_OPEN=true`, the real `DELIVERY_FEE_NZD`, the real postcodes,
   `SITE_URL` and `VITE_SITE_URL` = `https://korzavomeals.com`. **Do not** set `ORDER_LOCATION_CHECK=off`
   or `VITE_TEST_MODE` on production.
3. Resend: add and verify the korzavo.com domain (DNS records), create an API key, set `RESEND_API_KEY`,
   `ORDER_NOTIFICATION_FROM`, `ORDER_NOTIFICATION_EMAIL` (support@), `CONTACT_NOTIFICATION_EMAIL` (uwem@),
   `CORPORATE_NOTIFICATION_EMAIL` (info@), and `RESEND_AUDIENCE_ID` for the newsletter.
4. Vercel → Domains: add korzavomeals.com, then merge the `preview` branch into `main`.
5. Make one small real order with a real card to confirm, then refund it in Stripe.
