const FROM = "Transdel Set-Up Services <transdelsetups@gmail.com>";

export async function sendQuotationStatusEmail({
  to,
  name,
  service,
  status,
}: {
  to: string;
  name: string;
  service: string;
  status: string;
}) {
  if (!process.env.BREVO_API_KEY) return;

  const statusLabels: Record<string, string> = {
    pending: "Pending Review",
    reviewed: "Under Review",
    approved: "Approved ✓",
    rejected: "Declined",
  };

  const messages: Record<string, string> = {
    approved: `Great news! Your quotation request for ${service} has been approved. Our team will contact you shortly to discuss next steps.`,
    rejected: `Thank you for your interest in ${service}. After careful review, we are unable to proceed with your quotation at this time.`,
    reviewed: `Your quotation request for ${service} has been reviewed and is being processed. We'll update you as soon as a decision is made.`,
  };

  const res = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      accept: "application/json",
      "api-key": process.env.BREVO_API_KEY,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      sender: { name: "Transdel Set-Up Services", email: "transdelsetups@gmail.com" },
      to: [{ email: to, name }],
      subject: `Quotation ${statusLabels[status] ?? status} — Transdel Set-Up Services`,
      htmlContent: `
        <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto;">
          <h2 style="color: #0f172a;">Quotation Update</h2>
          <p>Hi ${name},</p>
          <p>${messages[status] ?? `Your quotation status has been updated to "${status}".`}</p>
          <p style="color: #64748b; font-size: 14px;">Service: <strong>${service}</strong></p>
          <hr style="border: none; border-top: 1px solid #e2e8f0;" />
          <p style="color: #94a3b8; font-size: 12px;">Transdel Set-Up Services &bull; Tema, Ghana</p>
        </div>
      `,
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Brevo API ${res.status}: ${text}`);
  }
}
