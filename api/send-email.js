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

  // UPDATED: Dark Mode Resistant Template
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta name="color-scheme" content="light only">
      <meta name="supported-color-schemes" content="light">
      <title>${subject}</title>
      <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&display=swap" rel="stylesheet">
      
      <style>
        /* GLOBAL DARK MODE OVERRIDES - Most Important */
        .yshortcuts a,
        .ReadMsgBody,
        .ExternalClass,
        .email-body,
        .main-container {
          width: 100%;
          background-color: #ffffff !important;
        }
        
        /* Force background in all major email clients */
        body, 
        body *,
        .body-content,
        .email-container {
          background-color: #ffffff !important;
        }
        
        /* Dark mode specific overrides */
        @media (prefers-color-scheme: dark) {
          body, .body, .email-body, .container, .main-card {
            background-color: #ffffff !important;
          }
          
          /* Force all text colors */
          div, p, h1, h2, h3, h4, span, a {
            color: inherit !important;
          }
          
          /* Remove any automatic dark mode background */
          .card, .wrapper, .content {
            background-color: #ffffff !important;
          }
        }
        
        /* Apple Mail dark mode fix */
        @media (prefers-color-scheme: dark) {
          .dark-mode-fix {
            background-color: #ffffff !important;
          }
        }
        
        /* Outlook and Windows Mail fixes */
        body {
          background-color: #ffffff !important;
        }
        
        table, td, tr {
          background-color: transparent;
        }
        
        /* Mobile responsive */
        @media screen and (max-width: 600px) {
          .wrapper-table { width: 100% !important; max-width: 100% !important; }
          .card-padding { padding: 24px 20px !important; }
          .header-left, .header-right { display: block !important; width: 100% !important; text-align: left !important; }
          .header-right { padding-top: 16px !important; text-align: left !important; }
          .footer-section { display: block !important; width: 100% !important; text-align: left !important; }
          .footer-right { padding-top: 20px !important; text-align: left !important; }
          .btn-container { display: block !important; width: 100% !important; }
          .btn-spacing { 
            display: inline-block !important; 
            padding: 12px 24px !important; 
            font-size: 14px !important; 
            line-height: 1.4 !important;
            width: auto !important;
          }
          .budget-value { font-size: 28px !important; }
          .btn-cell { text-align: left !important; }
        }

        @media screen and (max-width: 380px) {
          .card-padding { padding: 20px 16px !important; }
          .btn-spacing { 
            padding: 10px 20px !important; 
            font-size: 13px !important; 
            display: block !important; 
            width: 100% !important; 
            text-align: center !important; 
          }
          .btn-cell { display: block !important; width: 100% !important; }
          .budget-value { font-size: 24px !important; }
        }
      </style>
    </head>
    
    <!-- ALL BACKGROUND COLORS ARE EXPLICITLY SET TO WHITE -->
    <body style="margin: 0; padding: 40px 16px; background-color: #ffffff; font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, Arial, sans-serif;">
      
      <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #ffffff;">
        <tr>
          <td align="center" style="padding: 0; background-color: #ffffff;">
            
            <!-- Main Card -->
            <table border="0" cellpadding="0" cellspacing="0" width="500" style="background-color: #ffffff; border-radius: 28px; box-shadow: 0px 20px 35px -8px rgba(0, 0, 0, 0.08); width: 100%; max-width: 500px;">
              <tr>
                <td style="padding: 32px 32px 36px; border-radius: 28px; background-color: #ffffff;">
                  
                  <!-- Header -->
                  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #ffffff;">
                    <tr>
                      <td valign="middle" width="60" style="background-color: #ffffff;">
                        <table border="0" cellpadding="0" cellspacing="0">
                          <tr>
                            <td align="center" valign="middle" width="52" height="52" style="background-color: #f8f7fc; border: 1px solid #EFEBF5; border-radius: 26px;">
                              ${logoPath ? `<img src="cid:logo@modularone.com" alt="Logo" width="52" height="52" style="display: block; border-radius: 26px;">` : '<span style="font-size: 20px; font-weight: 800; color: #111111;">M1</span>'}
                            </td>
                          </tr>
                        </table>
                      </td>
                      <td align="right" valign="middle" style="background-color: #ffffff;">
                        <div style="background-color: #F0EDF6; padding: 6px 14px; border-radius: 40px; font-size: 11px; font-weight: 600; color: #4F4462; display: inline-block;">
                          ${isQuote ? 'Quote Request' : 'New Request'}
                        </div>
                      </td>
                    </tr>
                  </table>

                  <!-- Title -->
                  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-top: 24px; background-color: #ffffff;">
                    <tr>
                      <td style="background-color: #ffffff;">
                        <div style="font-size: 12px; font-weight: 600; color: #8B7BA3; margin-bottom: 10px;">
                          MODULAR ONE • INBOUND LEAD
                        </div>
                        <h2 style="margin: 0; font-size: 24px; font-weight: 700; color: #111111; letter-spacing: -0.3px;">
                          ${service ? service : 'General Consultation'}
                        </h2>
                        <div style="font-size: 14px; font-weight: 500; color: #5A4D6E; margin-top: 12px;">
                          Client: <span style="font-weight: 700; color: #111111;">${fullName}</span>
                        </div>
                      </td>
                    </tr>
                  </table>

                  ${details ? `
                  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-top: 16px; background-color: #ffffff;">
                    <tr>
                      <td style="background-color: #ffffff;">
                        <div style="display: inline-block; background-color: #F4F1FA; padding: 6px 14px; border-radius: 40px; font-size: 12px; font-weight: 600; color: #4A3A62;">
                          ${details}
                        </div>
                      </td>
                    </tr>
                  </table>
                  ` : ''}

                  <!-- Contact Info -->
                  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-top: 20px; border-top: 1px solid #F0EDF6; padding-top: 18px; background-color: #ffffff;">
                    <tr>
                      <td style="font-size: 14px; color: #4A4A52; padding: 4px 0; background-color: #ffffff;">
                        <span style="font-weight: 600; color: #111111;">Email:</span> <a href="mailto:${email}" style="color: #6F58A3; text-decoration: none;">${email}</a>
                      </td>
                    </tr>
                    <tr>
                      <td style="font-size: 14px; color: #4A4A52; padding: 4px 0 8px 0; background-color: #ffffff;">
                        <span style="font-weight: 600; color: #111111;">Phone:</span> <a href="tel:${phone}" style="color: #6F58A3; text-decoration: none;">${phone}</a>
                      </td>
                    </tr>
                  </table>

                  ${message ? `
                  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-top: 8px; background-color: #ffffff;">
                    <tr>
                      <td style="font-size: 14px; color: #4D4460; background-color: #FAF9FE; padding: 16px 20px; border-radius: 20px; border: 1px solid #F0EBFA;">
                        ${message.replace(/\n/g, '<br>')}
                      </td>
                    </tr>
                  </table>
                  ` : ''}

                  <!-- Divider -->
                  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-top: 28px; margin-bottom: 24px; background-color: #ffffff;">
                    <tr>
                      <td style="border-top: 1px solid #F0EDF6; background-color: #ffffff;">&nbsp;</td>
                    </tr>
                  </table>

                  <!-- Budget & Button -->
                  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #ffffff;">
                    <tr>
                      <td valign="middle" width="50%" style="background-color: #ffffff;">
                        <div style="font-size: 30px; font-weight: 800; color: #111111;">
                          ${budget ? `₹${budget.toLocaleString()}` : 'Enquiry Matrix'}
                        </div>
                        <div style="font-size: 12px; color: #9B90AE; margin-top: 6px;">
                          Vasai, Mumbai
                        </div>
                      </td>
                      
                      <td align="right" valign="middle" width="50%" style="background-color: #ffffff;">
                        <table border="0" cellpadding="0" cellspacing="0">
                          <tr>
                            <td align="center" style="background-color: #111111; border-radius: 16px;">
                              <a href="tel:${phone}" style="display: inline-block; padding: 12px 26px; font-size: 13px; font-weight: 600; color: #ffffff; text-decoration: none; border-radius: 16px;">
                                Review Lead
                              </a>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>

                </td>
              </tr>
            </table>

            <!-- Footer -->
            <table border="0" cellpadding="0" cellspacing="0" width="500" style="margin-top: 28px; text-align: center; width: 100%; max-width: 500px;">
              <tr>
                <td style="font-size: 11px; color: #B1A6C4;">
                  Internal Distribution • <a href="https://modularone.vercel.app" style="color: #7D6B9B; text-decoration: none;">System Router</a>
                </td>
              </tr>
            </table>

          </td>
        </tr>
      </table>
      
    </body>
    </html>
  `;

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