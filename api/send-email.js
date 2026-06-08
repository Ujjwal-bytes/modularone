// import nodemailer from 'nodemailer';

// export default async function handler(req, res) {
//   if (req.method !== 'POST') {
//     return res.status(405).json({ message: 'Method not allowed' });
//   }

//   const { fullName, email, phone, budget, service, details, message, type } = req.body;

//   // Create a transporter using SMTP
//   const transporter = nodemailer.createTransport({
//     host: process.env.SMTP_HOST,
//     port: process.env.SMTP_PORT,
//     secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
//     auth: {
//       user: process.env.SMTP_USER,
//       pass: process.env.SMTP_PASS,
//     },
//   });

//   const isQuote = type === 'quote';
//   const subject = isQuote 
//     ? `New Quote Request from ${fullName}` 
//     : `New Contact Message from ${fullName}`;

//   const htmlContent = `
//     <h2>${subject}</h2>
//     <p><strong>Name:</strong> ${fullName}</p>
//     <p><strong>Email:</strong> ${email}</p>
//     <p><strong>Phone:</strong> ${phone}</p>
//     ${budget ? `<p><strong>Budget:</strong> ${budget}</p>` : ''}
//     ${service ? `<p><strong>Service:</strong> ${service}</p>` : ''}
//     ${details ? `<p><strong>Details:</strong> ${details}</p>` : ''}
//     ${message ? `<p><strong>Message:</strong> ${message}</p>` : ''}
//     <hr />
//     <p>Sent from Modular One Website</p>
//   `;

//   try {
//     await transporter.sendMail({
//       from: `"${fullName}" <${process.env.SMTP_USER}>`,
//       to: process.env.CONTACT_EMAIL || process.env.SMTP_USER,
//       subject: subject,
//       html: htmlContent,
//       replyTo: email,
//     });

//     return res.status(200).json({ message: 'Email sent successfully' });
//   } catch (error) {
//     console.error('Nodemailer Error:', error);
//     return res.status(500).json({ message: 'Failed to send email', error: error.message });
//   }
// }


import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { fullName, email, phone, budget, service, details, message, type } = req.body;

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const isQuote = type === 'quote';
  const subject = isQuote 
    ? `New Quote Request from ${fullName}` 
    : `New Contact Message from ${fullName}`;

  // ✅ SIMPLE EMAIL UI - YAHAN CHANGE KAR
  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto; border: 1px solid #ddd;">
      <div style="background: #1a2a4f; padding: 20px; text-align: center;">
        <h1 style="color: #c9a03d; margin: 0;">🏠 MODULAR ONE</h1>
        <p style="color: white; font-size: 12px;">Premium Modular Furniture</p>
      </div>
      
      <div style="padding: 20px;">
        <p><strong>Hello Team,</strong></p>
        <p style="color: #555;">New enquiry from <strong>${fullName}</strong></p>
        
        <table style="width: 100%; margin: 15px 0; border-collapse: collapse;">
          <tr><td style="padding: 8px;"><strong>📛 Name:</strong> ${fullName}</td></tr>
          <tr><td style="padding: 8px;"><strong>📧 Email:</strong> ${email}</td></tr>
          <tr><td style="padding: 8px;"><strong>📞 Phone:</strong> ${phone}</td></tr>
          ${budget ? `<tr><td style="padding: 8px;"><strong>💰 Budget:</strong> ₹${budget}</td></tr>` : ''}
          ${service ? `<tr><td style="padding: 8px;"><strong>🛠️ Service:</strong> ${service}</td></tr>` : ''}
        </table>
        
        ${message ? `<div style="background: #f0f0f0; padding: 12px; margin-top: 10px;"><strong>💬 Message:</strong><br>${message}</div>` : ''}
        
        <div style="margin-top: 20px; padding-top: 12px; border-top: 1px solid #ddd; text-align: center; font-size: 12px;">
          <a href="tel:${phone}" style="color: #1a2a4f;">📞 Call</a> &nbsp;|&nbsp;
          <a href="https://wa.me/${phone}" style="color: #1a2a4f;">💬 WhatsApp</a> &nbsp;|&nbsp;
          <a href="mailto:${email}" style="color: #1a2a4f;">✉️ Reply</a>
        </div>
      </div>
      
      <div style="background: #f5f5f5; padding: 12px; text-align: center; font-size: 11px; color: #888;">
        Modular One | Golani Naka, Vasai East
      </div>
    </div>
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