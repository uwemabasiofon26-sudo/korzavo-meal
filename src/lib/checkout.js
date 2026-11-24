// Sends the cart, the customer's free-extras choices and their delivery
// details to the server. The server re-checks prices, the free-extras rules,
// the delivery area and where the customer is before creating the payment.
export async function startCheckout({ items, extras, delivery }) {
  const res = await fetch('/api/create-checkout-session', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      items: items.map((i) => ({ slug: i.slug, qty: i.qty })),
      extras,
      delivery,
      origin: window.location.origin,
    }),
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data.error || 'Unable to start checkout. Please try again.');
  }

  window.location.href = data.url;
}
