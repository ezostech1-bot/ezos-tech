export default async function handler(req, res) {
  const origin = req.headers.origin || '';
  const allowedOrigins = [
    'https://ezostech.com',
    'https://ezos-tech.vercel.app',
    'http://localhost:5173',
    'http://127.0.0.1:5173',
    'http://localhost:5174',
    'http://127.0.0.1:5174'
  ];
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;
  const to = process.env.RESEND_TO_EMAIL;

  if (!apiKey || !from || !to) {
    res.status(500).json({ error: 'Missing email configuration' });
    return;
  }

  try {
    const { pdfBase64, filename, meta, signerEmail, isPaid } = req.body || {};

    if (!pdfBase64 || !filename) {
      res.status(400).json({ error: 'Missing PDF payload' });
      return;
    }

    const subject = `Signed Contract PDF: ${meta?.companyName || 'Client'} – ${meta?.contractLabel || 'EZOS TECH'}`;
    const timestamp = new Date().toISOString();
    const clientIp = (req.headers['x-forwarded-for'] || '').toString().split(',')[0].trim() || req.socket?.remoteAddress || 'unknown';
    const text = [
      'A signed contract PDF was generated.',
      '',
      `Company: ${meta?.companyName || '—'}`,
      `Signer: ${meta?.signerName || '—'}`,
      `Email: ${meta?.email || '—'}`,
      `Tier: ${meta?.contractLabel || '—'}`,
      `Setup Fee: ${meta?.setupFee || '—'}`,
      `Monthly: ${meta?.monthlyFee || '—'}`,
      `Date: ${meta?.date || '—'}`,
      `PDF Size: ${meta?.pdfSizeKB ? `${meta.pdfSizeKB} KB` : '—'}`,
      `Timestamp: ${timestamp}`,
      `IP: ${clientIp}`
    ].join('\n');

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from,
        to: signerEmail && isPaid ? [signerEmail] : [to],
        bcc: signerEmail && isPaid ? [to] : undefined,
        subject,
        text,
        attachments: [
          {
            filename,
            content: pdfBase64
          }
        ]
      })
    });

    if (!response.ok) {
      const errText = await response.text();
      res.status(500).json({ error: 'Resend error', details: errText });
      return;
    }

    res.status(200).json({ ok: true });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
}
