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
import fs from 'fs';
import path from 'path';

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

  // SIMPLE CLEAN EMAIL UI - CHANGE KARNE KE LIYE YAHAN EDIT KAR
  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 550px; margin: 0 auto; border: 1px solid #ddd;">
      <!-- Header -->
      <div style="background: #1a2a4f; padding: 25px; text-align: center;">
        <h2 style="color: #c9a03d; margin: 0;">MODULAR ONE</h2>
        <p style="color: #fff; margin: 5px 0 0; font-size: 12px;">Premium Modular Furniture</p>
      </div>
      
      <!-- Content -->
      <div style="padding: 25px;">
        <h3 style="margin: 0 0 5px;">Hello Team,</h3>
        <p style="color: #666; margin-bottom: 20px;">New enquiry received from <strong>${fullName}</strong></p>
        
        <table style="width: 100%; border-collapse: collapse;">
          <tr style="background: #f5f5f5;"><td style="padding: 10px;"><strong>Name</strong></td><td style="padding: 10px;">${fullName}</td></tr>
          <tr><td style="padding: 10px;"><strong>Email</strong></td><td style="padding: 10px;">${email}</td></tr>
          <tr style="background: #f5f5f5;"><td style="padding: 10px;"><strong>Phone</strong></td><td style="padding: 10px;">${phone}</td></tr>
          ${budget ? `<tr><td style="padding: 10px;"><strong>Budget</strong></td><td style="padding: 10px;">₹${budget}</td></tr>` : ''}
          ${service ? `<tr style="background: #f5f5f5;"><td style="padding: 10px;"><strong>Service</strong></td><td style="padding: 10px;">${service}</td></tr>` : ''}
        </table>
        
        ${message ? `<div style="background: #f5f5f5; padding: 15px; margin-top: 20px;"><strong>Message:</strong><br>${message}</div>` : ''}
        
        <div style="margin-top: 25px; padding-top: 15px; border-top: 1px solid #ddd; text-align: center;">
          <a href="tel:${phone}" style="color: #1a2a4f; margin: 0 10px;">📞 Call</a>
          <a href="https://wa.me/${phone}" style="color: #1a2a4f; margin: 0 10px;">💬 WhatsApp</a>
          <a href="mailto:${email}" style="color: #1a2a4f; margin: 0 10px;">✉️ Reply</a>
        </div>
      </div>
      
      <!-- Footer -->
      <div style="background: #f5f5f5; padding: 15px; text-align: center; font-size: 11px; color: #888;">
        Modular One | Golani Naka, Vasai East | www.modularone.vercel.app
      </div>
    </div>
  `;

  // Try logo
  let logoPath = null;
  const possiblePaths = [
    path.join(process.cwd(), 'public', 'logo.png'),
    path.join(process.cwd(), 'public', 'modularone-logo.png'),
  ];

  for (const p of possiblePaths) {
    if (fs.existsSync(p)) {
      logoPath = p;
      break;
    }
  }

  const attachments = [];
  if (logoPath) {
    attachments.push({
      filename: path.basename(logoPath),
      path: logoPath,
      cid: 'logo',
    });
  }

  try {
    await transporter.sendMail({
      from: `"Modular One" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_EMAIL || process.env.SMTP_USER,
      subject: subject,
      html: htmlContent,
      replyTo: email,
      attachments: attachments,
    });

    return res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Nodemailer Error:', error);
    return res.status(500).json({ message: 'Failed to send email' });
  }
}