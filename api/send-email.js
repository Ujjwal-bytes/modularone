import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { fullName, email, phone, budget, service, details, message, type } = req.body;

  // Create a transporter using SMTP
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const isQuote = type === 'quote';
  const subject = isQuote 
    ? `New Quote Request from ${fullName}` 
    : `New Contact Message from ${fullName}`;

  const htmlContent = `
    <h2>${subject}</h2>
    <p><strong>Name:</strong> ${fullName}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Phone:</strong> ${phone}</p>
    ${budget ? `<p><strong>Budget:</strong> ${budget}</p>` : ''}
    ${service ? `<p><strong>Service:</strong> ${service}</p>` : ''}
    ${details ? `<p><strong>Details:</strong> ${details}</p>` : ''}
    ${message ? `<p><strong>Message:</strong> ${message}</p>` : ''}
    <hr />
    <p>Sent from Modular One Website</p>
  `;

  try {
    await transporter.sendMail({
      from: `"${fullName}" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_EMAIL || process.env.SMTP_USER,
      subject: subject,
      html: htmlContent,
      replyTo: email,
    });

    return res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Nodemailer Error:', error);
    return res.status(500).json({ message: 'Failed to send email', error: error.message });
  }
}
