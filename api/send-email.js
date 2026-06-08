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

  // Premium White & Luxury Minimal UI
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
          border-radius: 0 !important;
        }
        body {
          font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif;
          background-color: #ffffff;
          color: #000000;
          padding: 40px 20px;
          -webkit-font-smoothing: antialiased;
        }
        .email-wrapper {
          width: 100%;
          max-width: 600px;
          margin: 0 auto;
          background: #ffffff;
          border: 2px solid #000000;
          padding: 40px;
        }
        /* Header Section */
        .email-header {
          border-bottom: 2px solid #000000;
          padding-bottom: 24px;
          margin-bottom: 24px;
        }
        .logo-container {
          margin-bottom: 16px;
        }
        .logo {
          max-width: 140px;
          height: auto;
        }
        .company-name {
          font-size: 32px;
          font-weight: 900;
          letter-spacing: -1px;
          color: #000000;
          text-transform: uppercase;
          line-height: 1.1;
        }
        .company-tagline {
          font-size: 11px;
          color: #444444;
          text-transform: uppercase;
          letter-spacing: 2px;
          margin-top: 6px;
          font-weight: 400;
        }
        .premium-badge {
          display: inline-block;
          border: 1px solid #000000;
          color: #000000;
          background: #D4A373;
          padding: 5px 14px;
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 2px;
          text-transform: uppercase;
          margin-top: 16px;
        }
        /* Content Mapping */
        .email-content {
          margin-bottom: 24px;
        }
        .greeting {
          font-size: 18px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: #000000;
          margin-bottom: 8px;
        }
        .greeting-sub {
          color: #444444;
          font-size: 13px;
          line-height: 1.5;
          margin-bottom: 24px;
        }
        /* Data Matrix Box */
        .info-card {
          border: 1px solid #000000;
          background: #ffffff;
          padding: 24px;
          margin-bottom: 24px;
        }
        .info-title {
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          color: #000000;
          border-left: 4px solid #D4A373;
          padding-left: 10px;
          margin-bottom: 16px;
        }
        .info-row {
          display: flex;
          padding: 10px 0;
          border-bottom: 1px solid #e5e5e5;
        }
        .info-row:last-child {
          border-bottom: none;
        }
        .info-label {
          width: 130px;
          font-size: 12px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: #000000;
        }
        .info-value {
          flex: 1;
          font-size: 13px;
          color: #111111;
          font-weight: 400;
        }
        .info-value a {
          color: #000000;
          text-decoration: underline;
        }
        /* Clean Message Space */
        .message-box {
          background: rgba(212, 163, 115, 0.06);
          padding: 20px;
          border-left: 4px solid #D4A373;
          margin-top: 12px;
        }
        .message-text {
          font-size: 13px;
          color: #222222;
          line-height: 1.6;
        }
        /* CTA Link Triggers */
        .action-buttons {
          margin-top: 32px;
          padding-top: 24px;
          border-top: 1px solid #e5e5e5;
          text-align: center;
        }
        .action-btn {
          display: inline-block;
          background: #000000;
          color: #ffffff;
          text-decoration: none;
          padding: 12px 22px;
          margin: 6px;
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
          border: 1px solid #000000;
          transition: all 0.2s ease;
        }
        .action-btn-secondary {
          background: #ffffff;
          color: #000000;
        }
        /* Footer Protocol */
        .email-footer {
          border-top: 2px solid #000000;
          padding-top: 24px;
          text-align: center;
        }
        .footer-text {
          font-size: 11px;
          color: #444444;
          line-height: 1.6;
        }
        .footer-links {
          margin-top: 12px;
        }
        .footer-links a {
          color: #000000;
          text-decoration: none;
          font-size: 11px;
          font-weight: 600;
          margin: 0 8px;
        }
        @media (max-width: 600px) {
          .email-wrapper {
            padding: 20px;
          }
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
            text-align: center;
          }
        }
      </style>
    </head>
    <body>
      <div class="email-wrapper">
        <div class="email-header">
          <div class="logo-container">
            ${logoPath ? '<img src="cid:logo@modularone.com" alt="Modular One Logo" class="logo">' : ''}
          </div>
          <div class="company-name">MODULAR ONE</div>
          <div class="company-tagline">Premium Modular Furniture Solutions</div>
          <div class="premium-badge">${isQuote ? 'Quote Request' : 'New Enquiry'}</div>
        </div>

        <div class="email-content">
          <div class="greeting">System Alert</div>
          <div class="greeting-sub">An inbound platform form transaction has occurred. Details for individual client <strong>${fullName}</strong> have been cataloged below.</div>

          <div class="info-card">
            <div class="info-title">Client Specifications</div>
            
            <div class="info-row">
              <div class="info-label">Full Name</div>
              <div class="info-value">${fullName}</div>
            </div>
            
            <div class="info-row">
              <div class="info-label">Email Address</div>
              <div class="info-value">
                <a href="mailto:${email}">${email}</a>
              </div>
            </div>
            
            <div class="info-row">
              <div class="info-label">Phone Number</div>
              <div class="info-value">
                <a href="tel:${phone}">${phone}</a>
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
              <div class="info-label">Project Scope</div>
              <div class="info-value">${details}</div>
            </div>
            ` : ''}
          </div>

          ${message ? `
          <div class="info-title">Client Statement</div>
          <div class="message-box">
            <p class="message-text">${message.replace(/\n/g, '<br>')}</p>
          </div>
          ` : ''}

          <div class="action-buttons">
            <a href="tel:${phone}" class="action-btn">Call Client</a>
            <a href="https://wa.me/${phone}" class="action-btn action-btn-secondary">WhatsApp</a>
            <a href="mailto:${email}" class="action-btn action-btn-secondary">Email Response</a>
          </div>
        </div>

        <div class="email-footer">
          <div class="footer-text">
            <strong>Modular One HQ</strong><br>
            Golani Naka, Vasai East, Vasai-Virar<br>
            Maharashtra - 401208
          </div>
          <div class="footer-links">
            <a href="https://modularone.vercel.app">Website</a> •
            <a href="https://instagram.com">Instagram</a> •
            <a href="https://facebook.com">Facebook</a>
          </div>
          <div class="footer-text" style="margin-top: 16px; font-size: 10px; opacity: 0.6;">
            Automated internal transaction transmission routing. Please handle within regular service window matrices.
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