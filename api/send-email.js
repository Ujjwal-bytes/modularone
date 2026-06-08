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

  // Fixed Spacing & Logo Cover View Integration
  const htmlContent = `
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml" lang="en">
    <head>
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <title>${subject}</title>
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
      
      <style type="text/css">
        body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
        table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-collapse: collapse !important; border: 0 !important; }
        body { height: 100% !important; margin: 0 !important; padding: 0 !important; width: 100% !important; background-color: #F8F9FA; }

        @media screen and (max-width: 600px) {
          .wrapper-table { width: 100% !important; max-width: 100% !important; }
          .card-padding { padding: 24px !important; }
          .header-left, .header-right { display: block !important; width: 100% !important; text-align: left !important; }
          .header-right { padding-top: 14px !important; }
          .footer-left, .footer-right { display: block !important; width: 100% !important; text-align: left !important; }
          .footer-right { padding-top: 24px !important; }
          .btn-block { display: block !important; width: 100% !important; text-align: center !important; }
          .btn-spacing { padding: 14px 32px !important; font-size: 14px !important; }
        }
      </style>
    </head>
    <body style="margin: 0; padding: 40px 0; background-color: #F8F9FA; font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, Arial, sans-serif;">

      <table border="0" cellpadding="0" cellspacing="0" width="100%">
        <tr>
          <td align="center" style="padding: 0 12px;">
            
            <table class="wrapper-table" border="0" cellpadding="0" cellspacing="0" width="460" style="background-color: #ffffff; border-radius: 24px; box-shadow: 0px 16px 48px rgba(0, 0, 0, 0.04); width: 100%; max-width: 460px; border-collapse: separate !important;">
              <tr>
                <td class="card-padding" style="padding: 36px; border-radius: 24px;">
                  
                  <table border="0" cellpadding="0" cellspacing="0" width="100%">
                    <tr>
                      <td class="header-left" valign="middle">
                        <table border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate !important;">
                          <tr>
                            <td align="center" valign="middle" width="48" height="48" style="background-color: #F8F9FA; border: 1px solid #EAEAEF; border-radius: 50%; font-size: 15px; font-weight: 800; color: #111111; overflow: hidden;">
                              ${logoPath ? `<img src="cid:logo@modularone.com" alt="M1" style="width: 100%; height: 100%; max-width: 48px; max-height: 48px; object-fit: cover; display: block; border-radius: 50%;">` : 'M1'}
                            </td>
                          </tr>
                        </table>
                      </td>
                      <td class="header-right" align="right" valign="middle">
                        <table border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate !important;">
                          <tr>
                            <td style="background-color: #ECECEF; padding: 6px 14px; border-radius: 8px; font-size: 11px; font-weight: 600; color: #4A4A52; letter-spacing: 0.2px; display: inline-block;">
                              ${isQuote ? 'Quote Request' : 'New Request'}
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>

                  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-top: 24px;">
                    <tr>
                      <td>
                        <div style="font-size: 13px; font-weight: 600; color: #6C6C78; margin-bottom: 6px;">
                          Modular One <span style="font-weight: 400; color: #A1A1AA; margin-left: 4px;">• Inbound</span>
                        </div>
                        <h2 style="margin: 0; font-size: 22px; font-weight: 700; color: #111111; letter-spacing: -0.5px; line-height: 1.3;">
                          ${service ? service : 'General Consultation'}
                        </h2>
                        <div style="font-size: 13px; font-weight: 500; color: #4A4A52; margin-top: 8px; line-height: 1.4;">
                          Client: <span style="font-weight: 700; color: #111111;">${fullName}</span>
                        </div>
                      </td>
                    </tr>
                  </table>

                  ${details ? `
                  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-top: 16px;">
                    <tr>
                      <td style="font-size: 0; line-height: 0;">
                        <div style="display: inline-block; background-color: #F1F1F4; padding: 6px 14px; border-radius: 10px; font-size: 12px; font-weight: 500; color: #2D2D35; margin-right: 8px; margin-bottom: 4px;">
                          ${details}
                        </div>
                      </td>
                    </tr>
                  </table>
                  ` : ''}

                  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-top: 12px; border-top: 1px dashed #EAEAEF; padding-top: 12px;">
                    <tr>
                      <td style="font-size: 13px; color: #4A4A52; padding: 3px 0; line-height: 1.4;">
                        <span style="font-weight: 600; color: #111111;">Email:</span> <a href="mailto:${email}" style="color: #6C6C78; text-decoration: none; word-break: break-all;">${email}</a>
                      </td>
                    </tr>
                  </table>

                  ${message ? `
                  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-top: 14px; margin-bottom: 4px;">
                    <tr>
                      <td style="font-size: 13px; color: #6C6C78; line-height: 1.6; font-weight: 400; background-color: #F8F9FA; padding: 14px 18px; border-radius: 12px; border: 1px solid #EAEAEF;">
                        ${message.replace(/\n/g, '<br>')}
                      </td>
                    </tr>
                  </table>
                  ` : ''}

                  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-top: 24px; margin-bottom: 24px;">
                    <tr>
                      <td style="border-top: 1px solid #EAEAEF; font-size: 1px; line-height: 1px;">&nbsp;</td>
                    </tr>
                  </table>

                  <table border="0" cellpadding="0" cellspacing="0" width="100%">
                    <tr>
                      <td class="footer-left" valign="middle">
                        <div style="font-size: 22px; font-weight: 700; color: #111111; letter-spacing: -0.5px; line-height: 1.2;">
                          ${budget ? `₹${budget}` : 'Enquiry Matrix'}
                        </div>
                        <div style="font-size: 12px; color: #A1A1AA; font-weight: 500; margin-top: 4px;">
                          Vasai, Mumbai
                        </div>
                      </td>
                      
                      <td class="footer-right" align="right" valign="middle">
                        <table border="0" cellpadding="0" cellspacing="0" class="btn-block" style="border-collapse: separate !important; width: auto;">
                          <tr>
                            <td align="center" valign="middle" style="background-color: #111111; border-radius: 12px;">
                              <a href="tel:${phone}" class="btn-block btn-spacing" style="display: inline-block; padding: 12px 28px; font-size: 13px; font-weight: 600; color: #ffffff; text-decoration: none; letter-spacing: -0.1px; min-width: 120px;">
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
            </table> <table border="0" cellpadding="0" cellspacing="0" width="460" style="margin-top: 24px; text-align: center; width: 100%; max-width: 460px;">
              <tr>
                <td style="font-size: 12px; color: #A1A1AA; font-weight: 400;">
                  Internal Distribution • <a href="https://modularone.vercel.app" style="color: #6C6C78; text-decoration: none; font-weight: 500;">System Router</a>
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