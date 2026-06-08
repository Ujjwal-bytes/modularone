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

  let logoPath = null;
  const possiblePaths = [
    path.join(process.cwd(), 'public', 'logoss.png'),
    path.join(process.cwd(), 'public', 'logoss.webp'),
    path.join(process.cwd(), 'public', 'modularone-logoss.png'),
    path.join(process.cwd(), 'src', 'assets', 'logoss.png'),
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
      cid: 'logo@modularone.com',
      contentType: 'image/png',
    });
  }

  // COMPACT & RESPONSIVE TEMPLATE - Full width, minimal scroll
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${subject}</title>
      <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&display=swap" rel="stylesheet">
      
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, Arial, sans-serif;
          background: #f5f5f5;
          padding: 20px;
        }
        
        .email-container {
          max-width: 100%;
          width: 100%;
          background: #ffffff;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 2px 8px rgba(0,0,0,0.05);
        }
        
        /* Desktop styles */
        @media (min-width: 768px) {
          body {
            padding: 40px;
          }
          .email-container {
            max-width: 650px;
            margin: 0 auto;
          }
          .flex-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
        }
        
        /* Mobile styles */
        @media (max-width: 767px) {
          body {
            padding: 10px;
          }
          .mobile-stack {
            flex-direction: column;
            align-items: flex-start !important;
          }
          .btn-group {
            flex-direction: column;
            gap: 10px;
          }
          .btn {
            width: 100%;
            text-align: center;
          }
        }
        
        .bg-purple { background: #9D00FF; }
        .text-purple { color: #9D00FF; }
        .text-white { color: #ffffff; }
        .text-dark { color: #1a1a1a; }
        .text-gray { color: #666666; }
        .text-light-gray { color: #999999; }
        
        .p-3 { padding: 16px; }
        .p-4 { padding: 20px; }
        .p-5 { padding: 30px; }
        
        .mb-2 { margin-bottom: 8px; }
        .mb-3 { margin-bottom: 12px; }
        .mb-4 { margin-bottom: 16px; }
        .mt-3 { margin-top: 12px; }
        .mt-4 { margin-top: 16px; }
        
        .border-bottom { border-bottom: 1px solid #f0f0f0; }
        .border-purple { border-left: 3px solid #9D00FF; }
        
        .rounded-lg { border-radius: 12px; }
        .rounded-full { border-radius: 40px; }
        
        .font-bold { font-weight: 700; }
        .font-semibold { font-weight: 600; }
        .font-medium { font-weight: 500; }
        
        .text-sm { font-size: 12px; }
        .text-base { font-size: 14px; }
        .text-lg { font-size: 16px; }
        .text-xl { font-size: 20px; }
        .text-2xl { font-size: 24px; }
        
        .btn {
          display: inline-block;
          padding: 12px 24px;
          font-size: 13px;
          font-weight: 600;
          text-decoration: none;
          border-radius: 40px;
          text-align: center;
        }
        
        .btn-primary {
          background: #9D00FF;
          color: #ffffff;
        }
        
        .btn-outline {
          background: transparent;
          color: #9D00FF;
          border: 2px solid #9D00FF;
        }
        
        .info-row {
          display: flex;
          justify-content: space-between;
          padding: 10px 0;
          border-bottom: 1px solid #f5f5f5;
        }
        
        .info-label {
          font-size: 13px;
          color: #888888;
          font-weight: 500;
        }
        
        .info-value {
          font-size: 14px;
          color: #1a1a1a;
          font-weight: 600;
          text-align: right;
        }
      </style>
    </head>
    
    <body>
      <div class="email-container">
        
        <!-- Header -->
        <div class="bg-purple p-5" style="text-align: center;">
          ${logoPath ? 
            `<img src="cid:logo@modularone.com" alt="Modular One" style="height: 45px; width: auto;">` : 
            `<div class="text-white font-bold" style="font-size: 22px; letter-spacing: 3px;">MODULAR ONE</div>`
          }
          <div class="text-sm text-white mt-3" style="opacity: 0.9;">PREMIUM MODULAR SOLUTIONS</div>
        </div>
        
        <!-- Badge & Title -->
        <div class="p-5" style="text-align: center; padding-bottom: 0;">
          <div style="display: inline-block; background: rgba(157,0,255,0.08); padding: 5px 12px; border-radius: 40px; margin-bottom: 12px;">
            <span class="text-sm font-bold text-purple">${isQuote ? 'QUOTE REQUEST' : 'NEW LEAD'}</span>
          </div>
          <h2 class="text-xl font-bold text-dark mb-2">New Client Enquiry</h2>
          <p class="text-sm text-gray">Received on ${new Date().toLocaleDateString('en-IN')}</p>
        </div>
        
        <!-- Client Details Card -->
        <div class="p-5" style="padding-top: 16px;">
          <div style="border: 1px solid #e0e0e0; border-radius: 16px; overflow: hidden;">
            <div class="p-4">
              
              <div class="info-row">
                <span class="info-label">Full Name</span>
                <span class="info-value">${fullName}</span>
              </div>
              
              <div class="info-row">
                <span class="info-label">Email</span>
                <span class="info-value" style="word-break: break-all; max-width: 60%;">
                  <a href="mailto:${email}" class="text-purple" style="text-decoration: none;">${email}</a>
                </span>
              </div>
              
              <div class="info-row">
                <span class="info-label">Phone</span>
                <span class="info-value">${phone}</span>
              </div>
              
              ${service ? `
              <div class="info-row">
                <span class="info-label">Service</span>
                <span class="info-value">${service}</span>
              </div>
              ` : ''}
              
              <div class="info-row" style="border-bottom: none;">
                <span class="info-label font-bold">Budget</span>
                <span class="text-purple font-bold text-lg">${budget ? `₹${parseInt(budget).toLocaleString()}` : 'To Be Discussed'}</span>
              </div>
              
            </div>
          </div>
        </div>
        
        <!-- Project Scope (if any) -->
        ${details ? `
        <div class="p-5" style="padding-top: 0; padding-bottom: 0;">
          <div style="background: #fafafa; border-radius: 12px; padding: 12px 16px; border-left: 3px solid #9D00FF;">
            <div class="text-sm text-gray mb-1 font-semibold">PROJECT SCOPE</div>
            <div class="text-sm text-dark">${details}</div>
          </div>
        </div>
        ` : ''}
        
        <!-- Client Message (if any) -->
        ${message ? `
        <div class="p-5" style="padding-top: 0; padding-bottom: 0;">
          <div style="background: #fafafa; border-radius: 12px; padding: 12px 16px;">
            <div class="text-sm text-gray mb-1 font-semibold">CLIENT MESSAGE</div>
            <div class="text-sm text-dark">"${message.substring(0, 150)}${message.length > 150 ? '...' : ''}"</div>
          </div>
        </div>
        ` : ''}
        
        <!-- Action Buttons -->
        <div class="p-5">
          <div class="btn-group" style="display: flex; gap: 12px; justify-content: center;">
            <a href="tel:${phone}" class="btn btn-primary btn" style="flex: 1;">📞 Call Client</a>
            <a href="https://wa.me/${phone.replace(/[^0-9]/g, '')}" class="btn btn-outline btn" style="flex: 1;">💬 WhatsApp</a>
          </div>
        </div>
        
        <!-- Divider -->
        <div style="padding: 0 20px;">
          <div style="height: 1px; background: linear-gradient(90deg, transparent, #9D00FF, transparent);"></div>
        </div>
        
        <!-- Footer -->
        <div class="p-4" style="text-align: center;">
          <div class="text-sm text-gray mb-2">Need assistance? Contact support</div>
          <a href="mailto:support@modularone.com" class="text-purple text-sm" style="text-decoration: none;">support@modularone.com</a>
          <div class="text-sm text-light-gray mt-3" style="font-size: 10px;">Modular One • Golani Naka, Vasai East</div>
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
      from: `"Modular One" <${process.env.SMTP_USER}>`,
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