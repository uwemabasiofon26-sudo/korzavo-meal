// Vercel serverless function — POST /api/contact
// Emails website enquiries (general and corporate/gym partnerships) to the
// team through Resend. Requires RESEND_API_KEY and ORDER_NOTIFICATION_FROM;
// customer enquiries go to CONTACT_NOTIFICATION_EMAIL (uwem@korzavo.com) and
// corporate / gym partnership enquiries to CORPORATE_NOTIFICATION_EMAIL (info@korzavo.com).

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const esc = (v = '') => String(v).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.ORDER_NOTIFICATION_FROM;
  const customerInbox = (process.env.CONTACT_NOTIFICATION_EMAIL || 'uwem@korzavo.com').split(',').map((x) => x.trim()).filter(Boolean);
  const corporateInbox = (process.env.CORPORATE_NOTIFICATION_EMAIL || 'info@korzavo.com').split(',').map((x) => x.trim()).filter(Boolean);
  if (!apiKey || !from) {
    console.error('Contact form not configured (RESEND_API_KEY, ORDER_NOTIFICATION_FROM).');
    return res.status(500).json({ error: 'Messaging is not set up yet. Please email us directly.' });
  }

  const { name, email, topic, message } = req.body || {};
  if (!name || !message || !email || !EMAIL_RE.test(email)) {
    return res.status(400).json({ error: 'Please include your name, a valid email and a message.' });
  }
  if (String(message).length > 5000) {
    return res.status(400).json({ error: 'Message is too long.' });
  }

  // Partnership enquiries go to the official inbox; everything else to customer enquiries.
  const to = /corporate|partnership/i.test(String(topic || '')) ? corporateInbox : customerInbox;

  const r = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from,
      to,
      reply_to: email,
      subject: `KORZAVO MEALS enquiry — ${topic || 'General'} — ${String(name).slice(0, 60)}`,
      html: `<h2>New website enquiry</h2>
        <p><b>Name:</b> ${esc(name)}<br/><b>Email:</b> ${esc(email)}<br/><b>Topic:</b> ${esc(topic || 'General')}</p>
        <p style="white-space:pre-wrap">${esc(message)}</p>`,
    }),
  });

  if (!r.ok) {
    console.error('Resend contact error', r.status, await r.text().catch(() => ''));
    return res.status(500).json({ error: 'Unable to send your message right now. Please email us directly.' });
  }
  return res.status(200).json({ sent: true });
}
