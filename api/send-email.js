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

  // Check if logo exists in public folder
  let logoPath = null;
  const possiblePaths = [
    path.join(process.cwd(), 'public', 'logo.png'),
    path.join(process.cwd(), 'public', 'logo.webp'),
    path.join(process.cwd(), 'public', 'modularone-logo.png'),
    path.join(process.cwd(), 'src', 'assets', 'logo.png'),
  ];

  for (const p of possiblePaths) {
    if (fs.existsSync(p)) {
      logoPath = p;
      break;
    }
  }

  // Prepare attachments
  const attachments = [];
  if (logoPath) {
    attachments.push({
      filename: path.basename(logoPath),
      path: logoPath,
      cid: 'logo@modularone.com',
      contentType: 'image/png',
    });
  }

  // Professional Email UI with Logo Support
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${subject}</title>
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
          background-color: #f0f2f5;
          padding: 40px 20px;
        }
        .email-wrapper {
          max-width: 600px;
          margin: 0 auto;
          background: #ffffff;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
        }
        /* Header */
        .email-header {
          background: linear-gradient(135deg, #1a2a4f 0%, #0f1a30 100%);
          padding: 32px 24px;
          text-align: center;
        }
        .logo-container {
          margin-bottom: 16px;
        }
        .logo {
          max-width: 160px;
          height: auto;
        }
        .company-name {
          font-size: 28px;
          font-weight: 700;
          color: #ffffff;
          letter-spacing: -0.5px;
          margin-top: 8px;
        }
        .company-tagline {
          font-size: 11px;
          color: #c9a03d;
          text-transform: uppercase;
          letter-spacing: 2px;
          margin-top: 6px;
        }
        /* Badge */
        .badge {
          display: inline-block;
          background: #c9a03d;
          color: #1a2a4f;
          font-size: 10px;
          font-weight: 800;
          padding: 4px 12px;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-top: 16px;
        }
        /* Content */
        .email-content {
          padding: 32px;
        }
        .greeting {
          font-size: 20px;
          font-weight: 600;
          color: #1a2a4f;
          margin-bottom: 8px;
        }
        .greeting-sub {
          color: #64748b;
          font-size: 14px;
          margin-bottom: 28px;
          padding-bottom: 20px;
          border-bottom: 1px solid #e8ecf0;
        }
        /* Info Card */
        .info-card {
          background: #f8fafc;
          border-radius: 12px;
          padding: 20px;
          margin-bottom: 24px;
        }
        .info-title {
          font-size: 11px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          color: #c9a03d;
          margin-bottom: 16px;
          padding-bottom: 8px;
          border-bottom: 2px solid #c9a03d;
          display: inline-block;
        }
        .info-row {
          display: flex;
          padding: 10px 0;
          border-bottom: 1px solid #e8ecf0;
        }
        .info-row:last-child {
          border-bottom: none;
        }
        .info-label {
          width: 100px;
          font-size: 12px;
          font-weight: 600;
          color: #475569;
        }
        .info-value {
          flex: 1;
          font-size: 13px;
          color: #0f172a;
          font-weight: 500;
        }
        /* Message Box */
        .message-box {
          background: #fff8e7;
          padding: 16px;
          border-radius: 12px;
          border-left: 3px solid #c9a03d;
          margin-top: 16px;
        }
        .message-text {
          font-size: 13px;
          color: #334155;
          line-height: 1.6;
        }
        /* Action Buttons */
        .action-buttons {
          margin-top: 24px;
          padding-top: 20px;
          border-top: 1px solid #e8ecf0;
          text-align: center;
        }
        .action-btn {
          display: inline-block;
          background: #1a2a4f;
          color: #ffffff;
          text-decoration: none;
          padding: 10px 20px;
          margin: 0 6px;
          font-size: 12px;
          font-weight: 600;
          border-radius: 8px;
        }
        .action-btn-wa {
          background: #25d366;
        }
        .action-btn-call {
          background: #1a2a4f;
        }
        /* Footer */
        .email-footer {
          background: #f8fafc;
          padding: 24px;
          text-align: center;
          border-top: 1px solid #e8ecf0;
        }
        .footer-text {
          font-size: 11px;
          color: #94a3b8;
          line-height: 1.6;
        }
        .footer-links {
          margin-top: 12px;
        }
        .footer-links a {
          color: #1a2a4f;
          text-decoration: none;
          font-size: 11px;
          margin: 0 8px;
        }
        @media (max-width: 600px) {
          .info-row {
            flex-direction: column;
          }
          .info-label {
            width: 100%;
            margin-bottom: 4px;
          }
          .action-btn {
            display: block;
            margin: 8px 0;
          }
        }
      </style>
    </head>
    <body>
      <div class="email-wrapper">
        <!-- Header with Logo -->
        <div class="email-header">
          <div class="logo-container">
            ${logoPath ? '<img src="cid:logo@modularone.com" alt="Modular One Logo" class="logo">' : '<div style="font-size: 32px;">🏠</div>'}
          </div>
          <div class="company-name">MODULAR ONE</div>
          <div class="company-tagline">Premium Modular Furniture Solutions</div>
          <div class="badge">${isQuote ? '📋 QUOTE REQUEST' : '📧 NEW ENQUIRY'}</div>
        </div>

        <!-- Content -->
        <div class="email-content">
          <div class="greeting">Hello Team,</div>
          <div class="greeting-sub">You have received a new ${isQuote ? 'quote request' : 'contact message'} from <strong>${fullName}</strong>.</div>

          <div class="info-card">
            <div class="info-title">📝 CLIENT DETAILS</div>
            
            <div class="info-row">
              <div class="info-label">Full Name</div>
              <div class="info-value">${fullName}</div>
            </div>
            
            <div class="info-row">
              <div class="info-label">Email Address</div>
              <div class="info-value">
                <a href="mailto:${email}" style="color: #1a2a4f;">${email}</a>
              </div>
            </div>
            
            <div class="info-row">
              <div class="info-label">Phone Number</div>
              <div class="info-value">
                <a href="tel:${phone}" style="color: #1a2a4f;">${phone}</a>
              </div>
            </div>
            
            ${budget ? `
            <div class="info-row">
              <div class="info-label">Budget Range</div>
              <div class="info-value">₹${budget}</div>
            </div>
            ` : ''}
            
            ${service ? `
            <div class="info-row">
              <div class="info-label">Service Type</div>
              <div class="info-value">${service}</div>
            </div>
            ` : ''}
            
            ${details ? `
            <div class="info-row">
              <div class="info-label">Project Details</div>
              <div class="info-value">${details}</div>
            </div>
            ` : ''}
          </div>

          ${message ? `
          <div class="info-title">💬 MESSAGE</div>
          <div class="message-box">
            <p class="message-text">${message.replace(/\n/g, '<br>')}</p>
          </div>
          ` : ''}

          <div class="action-buttons">
            <a href="tel:${phone}" class="action-btn action-btn-call">📞 Call Client</a>
            <a href="https://wa.me/${phone}" class="action-btn action-btn-wa">💬 WhatsApp</a>
            <a href="mailto:${email}" class="action-btn action-btn-call">✉️ Reply via Email</a>
          </div>
        </div>

        <!-- Footer -->
        <div class="email-footer">
          <div class="footer-text">
            <strong>Modular One</strong><br>
            Golani Naka, Vasai East, Vasai-Virar<br>
            Maharashtra - 401208
          </div>
          <div class="footer-links">
            <a href="https://modularone.vercel.app">🌐 Website</a> •
            <a href="https://instagram.com">📸 Instagram</a> •
            <a href="https://facebook.com">📘 Facebook</a>
          </div>
          <div class="footer-text" style="margin-top: 16px; font-size: 10px;">
            This is an automated message from Modular One contact form.<br>
            Please respond within 24 hours.
          </div>
        </div>
      </div>
    </body>
    </html>
  `;

  // Plain text fallback
  const textContent = `
    ${subject}
    
    Name: ${fullName}
    Email: ${email}
    Phone: ${phone}
    ${budget ? `Budget: ₹${budget}` : ''}
    ${service ? `Service: ${service}` : ''}
    ${details ? `Details: ${details}` : ''}
    ${message ? `Message: ${message}` : ''}
    
    ---
    Modular One | Golani Naka, Vasai East
    Website: https://modularone.vercel.app
  `;

  try {
    await transporter.sendMail({
      from: `"Modular One Website" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_EMAIL || process.env.SMTP_USER,
      subject: subject,
      html: htmlContent,
      text: textContent,
      replyTo: email,
      attachments: attachments,
    });

    return res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Nodemailer Error:', error);
    return res.status(500).json({ message: 'Failed to send email', error: error.message });
  }
}