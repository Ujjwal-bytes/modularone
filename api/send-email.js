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

  // Template with FORCED white background (works in dark mode)
  const htmlContent = `
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml" lang="en">
    <head>
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <meta name="color-scheme" content="light only"/>
      <meta name="supported-color-schemes" content="light"/>
      <title>${subject}</title>
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&display=swap" rel="stylesheet">
      
      <style type="text/css">
        /* Force light mode / white background - Dark mode override */
        body, 
        table, 
        td, 
        a, 
        div, 
        span, 
        p, 
        h1, h2, h3, h4, 
        .card, 
        .container,
        .wrapper {
          -webkit-text-size-adjust: 100%;
          -ms-text-size-adjust: 100%;
        }
        
        /* Dark mode强制覆盖 */
        @media (prefers-color-scheme: dark) {
          body, .body, .email-body, .main-container {
            background-color: #ffffff !important;
          }
          .card-white, .main-card {
            background-color: #ffffff !important;
            color: #111111 !important;
          }
        }
        
        table, td { 
          mso-table-lspace: 0pt; 
          mso-table-rspace: 0pt; 
          border-collapse: collapse !important; 
          border: 0 !important; 
        }
        
        body { 
          height: 100% !important; 
          margin: 0 !important; 
          padding: 0 !important; 
          width: 100% !important; 
          background-color: #ffffff !important;
          -webkit-font-smoothing: antialiased;
        }
        
        /* Mobile styles */
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
            font-weight: 600 !important;
            line-height: 1.4 !important;
            text-align: center !important;
            background-color: #111111 !important;
            border-radius: 12px !important;
            width: auto !important;
          }
          .budget-value { font-size: 28px !important; }
          .message-box { padding: 12px 16px !important; font-size: 13px !important; }
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
    <body style="margin: 0; padding: 40px 16px; background-color: #ffffff !important; font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, Arial, sans-serif;">

      <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #ffffff !important;">
        <tr>
          <td align="center" style="padding: 0;">
            
            <!-- Main Card - FORCED WHITE BACKGROUND even in dark mode -->
            <table class="wrapper-table" border="0" cellpadding="0" cellspacing="0" width="500" style="background-color: #ffffff !important; border-radius: 28px; box-shadow: 0px 20px 35px -8px rgba(0, 0, 0, 0.08); width: 100%; max-width: 500px; border-collapse: separate !important;">
              <tr>
                <td class="card-padding" style="padding: 32px 32px 36px; border-radius: 28px; background-color: #ffffff !important;">
                  
                  <!-- Header with Logo and Tag -->
                  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #ffffff !important;">
                    <tr>
                      <td class="header-left" valign="middle" width="60" style="background-color: #ffffff !important;">
                        <table border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate !important;">
                          <tr>
                            <td align="center" valign="middle" width="52" height="52" style="background-color: #f8f7fc; border: 1px solid #EFEBF5; border-radius: 26px; overflow: hidden;">
                              ${logoPath ? `<img src="cid:logo@modularone.com" alt="Logo" style="width: 100%; height: 100%; max-width: 52px; max-height: 52px; object-fit: cover; display: block; border-radius: 26px;">` : '<span style="font-size: 20px; font-weight: 800; color: #111111;">M1</span>'}
                            </td>
                          </tr>
                        </table>
                      </td>
                      <td class="header-right" align="right" valign="middle" style="background-color: #ffffff !important;">
                        <div style="background-color: #F0EDF6; padding: 6px 14px; border-radius: 40px; font-size: 11px; font-weight: 600; color: #4F4462; letter-spacing: 0.3px; display: inline-block;">
                          ${isQuote ? 'Quote Request' : 'New Request'}
                        </div>
                      </td>
                    </tr>
                  </table>

                  <!-- Title Section -->
                  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-top: 24px; background-color: #ffffff !important;">
                    <tr>
                      <td style="padding: 0; background-color: #ffffff !important;">
                        <div style="font-size: 12px; font-weight: 600; color: #8B7BA3; margin-bottom: 10px; letter-spacing: 0.4px;">
                          MODULAR ONE • INBOUND LEAD
                        </div>
                        <h2 style="margin: 0; font-size: 24px; font-weight: 700; color: #111111; letter-spacing: -0.3px; line-height: 1.3;">
                          ${service ? service : 'General Consultation'}
                        </h2>
                        <div style="font-size: 14px; font-weight: 500; color: #5A4D6E; margin-top: 12px; line-height: 1.5;">
                          Client: <span style="font-weight: 700; color: #111111;">${fullName}</span>
                        </div>
                      </td>
                    </tr>
                  </table>

                  ${details ? `
                  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-top: 16px; background-color: #ffffff !important;">
                    <tr>
                      <td style="background-color: #ffffff !important;">
                        <div style="display: inline-block; background-color: #F4F1FA; padding: 6px 14px; border-radius: 40px; font-size: 12px; font-weight: 600; color: #4A3A62;">
                          ${details}
                        </div>
                      </td>
                    </tr>
                  </table>
                  ` : ''}

                  <!-- Contact Information -->
                  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-top: 20px; border-top: 1px solid #F0EDF6; padding-top: 18px; background-color: #ffffff !important;">
                    <tr>
                      <td style="font-size: 14px; color: #4A4A52; padding: 4px 0; line-height: 1.5; background-color: #ffffff !important;">
                        <span style="font-weight: 600; color: #111111;">Email:</span> <a href="mailto:${email}" style="color: #6F58A3; text-decoration: none; word-break: break-all;">${email}</a>
                      </td>
                    </tr>
                    <tr>
                      <td style="font-size: 14px; color: #4A4A52; padding: 4px 0 8px 0; line-height: 1.5; background-color: #ffffff !important;">
                        <span style="font-weight: 600; color: #111111;">Phone:</span> <a href="tel:${phone}" style="color: #6F58A3; text-decoration: none;">${phone}</a>
                      </td>
                    </tr>
                  </table>

                  ${message ? `
                  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-top: 8px; margin-bottom: 8px; background-color: #ffffff !important;">
                    <tr>
                      <td style="font-size: 14px; color: #4D4460; line-height: 1.6; font-weight: 400; background-color: #FAF9FE; padding: 16px 20px; border-radius: 20px; border: 1px solid #F0EBFA;">
                        ${message.replace(/\n/g, '<br>')}
                      </td>
                    </tr>
                  </table>
                  ` : ''}

                  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-top: 28px; margin-bottom: 24px; background-color: #ffffff !important;">
                    <tr>
                      <td style="border-top: 1px solid #F0EDF6; font-size: 1px; line-height: 1px; background-color: #ffffff !important;">&nbsp;</td>
                    </tr>
                  </table>

                  <!-- Footer: Budget & Action Button -->
                  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #ffffff !important;">
                    <tr>
                      <td class="footer-section" valign="middle" width="50%" style="background-color: #ffffff !important;">
                        <div class="budget-value" style="font-size: 30px; font-weight: 800; color: #111111; letter-spacing: -0.5px; line-height: 1.2;">
                          ${budget ? `₹${budget.toLocaleString()}` : 'Enquiry Matrix'}
                        </div>
                        <div style="font-size: 12px; color: #9B90AE; font-weight: 500; margin-top: 6px;">
                          Vasai, Mumbai
                        </div>
                      </td>
                      
                      <td class="footer-right" align="right" valign="middle" width="50%" style="background-color: #ffffff !important;">
                        <table border="0" cellpadding="0" cellspacing="0" class="btn-container" style="border-collapse: separate !important; width: auto;">
                          <tr>
                            <td class="btn-cell" align="center" valign="middle" style="background-color: #111111; border-radius: 16px;">
                              <a href="tel:${phone}" class="btn-spacing" style="display: inline-block; padding: 12px 26px; font-size: 13px; font-weight: 600; color: #ffffff; text-decoration: none; letter-spacing: -0.1px; line-height: 1.2; border-radius: 16px;">
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

            <!-- Footer Note -->
            <table border="0" cellpadding="0" cellspacing="0" width="500" style="margin-top: 28px; text-align: center; width: 100%; max-width: 500px; background-color: #ffffff !important;">
              <tr>
                <td style="font-size: 11px; color: #B1A6C4; font-weight: 500;">
                  Internal Distribution • <a href="https://modularone.vercel.app" style="color: #7D6B9B; text-decoration: none; font-weight: 600;">System Router</a>
                </td>
              </tr>
            </table>

          </td>
        </tr>
      </table>

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