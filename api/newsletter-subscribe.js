// Vercel serverless function — POST /api/newsletter-subscribe
//
// Adds an email address to a Resend Audience (your subscriber list) and
// sends a branded "you're subscribed" confirmation email.
//
// Requires these environment variables in Vercel:
//   RESEND_API_KEY       (already set up for order emails)
//   RESEND_AUDIENCE_ID   (create an Audience in the Resend dashboard,
//                         then copy its ID here — see setup notes)

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

async function addToAudience(email) {
  const audienceId = process.env.RESEND_AUDIENCE_ID;
  const resendApiKey = process.env.RESEND_API_KEY;

  const res = await fetch(`https://api.resend.com/audiences/${audienceId}/contacts`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, unsubscribed: false }),
  });

  // Resend returns 409-style errors if the contact already exists —
  // that's fine, treat it as success rather than a failure.
  if (!res.ok) {
    const errText = await res.text().catch(() => '');
    if (!errText.toLowerCase().includes('already exists') && res.status !== 409) {
      throw new Error(`Resend audience error ${res.status}: ${errText}`);
    }
  }
}

async function sendWelcomeEmail(email) {
  const resendApiKey = process.env.RESEND_API_KEY;
  const fromAddress = process.env.ORDER_NOTIFICATION_FROM || 'support@korzavo.com';
  const siteUrl = process.env.SITE_URL || 'https://korzavomeals.com';

  const html = `
    <div style="font-family: -apple-system, sans-serif; background:#05070D; padding: 40px 24px; color:#F4F7FA;">
      <div style="max-width: 480px; margin: 0 auto;">
        <div style="font-family: 'Arial Black', Arial, sans-serif; font-size: 22px; letter-spacing: 2px; margin-bottom: 32px;">KORZAVO MEALS</div>
        <h1 style="font-family: 'Arial Black', Arial, sans-serif; font-weight: 400; font-size: 26px; margin-bottom: 12px;">You're on the list.</h1>
        <p style="color:#C5CFD9; line-height: 1.6; font-size: 15px;">
          Thanks for subscribing — you'll hear about new menus, weekly plans and launch news from KORZAVO MEALS. No spam.
        </p>
        <a href="${siteUrl}/shop" style="display:inline-block; margin-top: 24px; padding: 12px 28px; border: 1px solid #FF2A2A; color:#F4F7FA; text-decoration:none; font-size: 12px; letter-spacing: 2px; text-transform: uppercase;">
          Explore the Menu
        </a>
        <p style="color:#57534e; font-size: 11px; margin-top: 40px;">
          You're receiving this because you subscribed at korzavomeals.com. You can unsubscribe from any newsletter email at any time.
        </p>
      </div>
    </div>
  `;

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: fromAddress,
      to: email,
      subject: "You're on the list — KORZAVO MEALS",
      html,
    }),
  });

  if (!res.ok) {
    const errText = await res.text().catch(() => '');
    throw new Error(`Resend send error ${res.status}: ${errText}`);
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const resendApiKey = process.env.RESEND_API_KEY;
  const audienceId = process.env.RESEND_AUDIENCE_ID;

  if (!resendApiKey || !audienceId) {
    console.error('Newsletter signup not configured (missing RESEND_API_KEY or RESEND_AUDIENCE_ID).');
    return res.status(500).json({ error: 'Newsletter signup is not configured yet.' });
  }

  const { email } = req.body || {};

  if (!email || !EMAIL_RE.test(email)) {
    return res.status(400).json({ error: 'Please enter a valid email address.' });
  }

  try {
    await addToAudience(email);
  } catch (err) {
    console.error('Failed to add contact to Resend audience:', err);
    return res.status(500).json({ error: 'Unable to subscribe right now. Please try again.' });
  }

  try {
    await sendWelcomeEmail(email);
  } catch (err) {
    // Don't fail the whole request over the welcome email — they're on
    // the list either way, just log it for visibility.
    console.error('Failed to send welcome email:', err);
  }

  return res.status(200).json({ subscribed: true });
}
