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

  // Refined Premium UI Template
  const htmlContent = `
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml" lang="en">
    <head>
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <title>${subject}</title>
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
      
      <style type="text/css">
        body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
        table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-collapse: collapse !important; border: 0 !important; }
        body { height: 100% !important; margin: 0 !important; padding: 0 !important; width: 100% !important; background-color: #F8F6FC; }

        @media screen and (max-width: 600px) {
          .wrapper-table { width: 100% !important; max-width: 100% !important; }
          .card-padding { padding: 30px 20px !important; }
          .inner-padding { padding: 20px 16px !important; }
          .btn-block { display: block !important; width: 100% !important; text-align: center !important; }
          .btn-spacing { padding: 14px 24px !important; display: block !important; margin-bottom: 12px !important; }
          .btn-spacing-secondary { padding: 14px 24px !important; display: block !important; }
          .footer-column { display: block !important; width: 100% !important; padding-left: 0 !important; margin-bottom: 24px !important; }
          .detail-row { display: block !important; width: 100% !important; text-align: left !important; }
          .detail-val { display: block !important; width: 100% !important; text-align: left !important; padding-top: 4px !important; }
        }
      </style>
    </head>
    <body style="margin: 0; padding: 40px 16px; background-color: #F8F6FC; font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, Arial, sans-serif;">

      <table border="0" cellpadding="0" cellspacing="0" width="100%">
        <tr>
          <td align="center">
            
            <table class="wrapper-table" border="0" cellpadding="0" cellspacing="0" width="540" style="background-color: #ffffff; border-radius: 28px; box-shadow: 0px 16px 40px rgba(157, 0, 255, 0.05); width: 100%; max-width: 540px; border-collapse: separate !important; overflow: hidden;">
              
              <tr>
                <td style="background-color: #9D00FF; padding: 40px 30px; text-align: center;">
                  ${logoPath ? 
                    `<img src="cid:logo@modularone.com" alt="Modular One" style="height: 48px; width: auto; display: inline-block;">` : 
                    `<div style="font-size: 22px; font-weight: 900; letter-spacing: 3px; color: #ffffff;">MODULAR ONE</div>`
                  }
                  <div style="font-size: 11px; font-weight: 600; color: rgba(255,255,255,0.8); margin-top: 10px; letter-spacing: 1.5px; text-transform: uppercase;">
                    Premium Modular Solutions
                  </div>
                </td>
              </tr>

              <tr>
                <td class="card-padding" style="padding: 40px 45px 20px 45px;">
                  
                  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="text-align: center;">
                    <tr>
                      <td>
                        <div style="display: inline-block; background-color: rgba(157, 0, 255, 0.08); padding: 6px 16px; border-radius: 40px; margin-bottom: 16px;">
                          <span style="font-size: 11px; font-weight: 700; color: #9D00FF; text-transform: uppercase; letter-spacing: 0.5px;">
                            ${isQuote ? 'New Quote Request' : 'New Lead Alert'}
                          </span>
                        </div>
                        <h1 style="margin: 0 0 10px 0; font-size: 26px; font-weight: 800; color: #1A1A1A; letter-spacing: -0.5px;">
                          Client Enquiry
                        </h1>
                        <p style="margin: 0; color: #666666; font-size: 14px; line-height: 1.5;">
                          A new inbound lead has been received. Review the client specifications below.
                        </p>
                      </td>
                    </tr>
                  </table>

                  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-top: 32px; border: 1px solid #EAEAEA; border-radius: 20px; border-collapse: separate !important;">
                    <tr>
                      <td class="inner-padding" style="padding: 24px 28px;">
                        
                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-bottom: 1px solid #F0F0F0; padding-bottom: 14px; margin-bottom: 14px;">
                          <tr>
                            <td class="detail-row" style="font-size: 13px; font-weight: 800; color: #9D00FF; text-transform: uppercase; letter-spacing: 0.5px;">
                              Client Specifications
                            </td>
                            <td class="detail-val" align="right" style="font-size: 12px; color: #999999; font-weight: 500;">
                              ${new Date().toLocaleDateString('en-IN')}
                            </td>
                          </tr>
                        </table>

                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-bottom: 1px solid #F8F8F8; padding: 10px 0;">
                          <tr>
                            <td class="detail-row" style="font-size: 13px; color: #777777; font-weight: 500;">Full Name</td>
                            <td class="detail-val" align="right" style="font-size: 14px; color: #1A1A1A; font-weight: 700;">${fullName}</td>
                          </tr>
                        </table>

                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-bottom: 1px solid #F8F8F8; padding: 10px 0;">
                          <tr>
                            <td class="detail-row" style="font-size: 13px; color: #777777; font-weight: 500;">Email Address</td>
                            <td class="detail-val" align="right" style="font-size: 13px; font-weight: 600;">
                              <a href="mailto:${email}" style="color: #9D00FF; text-decoration: none; word-break: break-all;">${email}</a>
                            </td>
                          </tr>
                        </table>

                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-bottom: 1px solid #F8F8F8; padding: 10px 0;">
                          <tr>
                            <td class="detail-row" style="font-size: 13px; color: #777777; font-weight: 500;">Phone Number</td>
                            <td class="detail-val" align="right" style="font-size: 14px; color: #1A1A1A; font-weight: 600;">${phone}</td>
                          </tr>
                        </table>

                        ${service ? `
                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-bottom: 1px solid #F8F8F8; padding: 10px 0;">
                          <tr>
                            <td class="detail-row" style="font-size: 13px; color: #777777; font-weight: 500;">Service Type</td>
                            <td class="detail-val" align="right" style="font-size: 13px; color: #1A1A1A; font-weight: 600;">${service}</td>
                          </tr>
                        </table>
                        ` : ''}

                        ${details ? `
                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-bottom: 1px solid #F8F8F8; padding: 10px 0;">
                          <tr>
                            <td class="detail-row" valign="top" style="font-size: 13px; color: #777777; font-weight: 500; padding-bottom: 4px;">Project Scope</td>
                            <td class="detail-val" align="right" style="font-size: 13px; color: #555555; font-weight: 500; max-width: 240px;">${details}</td>
                          </tr>
                        </table>
                        ` : ''}

                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-top: 14px; padding-top: 14px;">
                          <tr>
                            <td style="font-size: 13px; font-weight: 800; color: #1A1A1A;">Budget Estimate</td>
                            <td align="right" style="font-size: 22px; font-weight: 900; color: #9D00FF;">
                              ${budget ? `₹${parseInt(budget).toLocaleString('en-IN')}` : 'To Be Discussed'}
                            </td>
                          </tr>
                        </table>

                      </td>
                    </tr>
                  </table>

                  ${message ? `
                  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-top: 24px;">
                    <tr>
                      <td>
                        <div style="font-size: 11px; font-weight: 800; color: #9D00FF; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px;">
                          Client Message
                        </div>
                        <div style="background-color: #FAF9FD; border-radius: 16px; padding: 18px 22px; border-left: 4px solid #9D00FF;">
                          <p style="margin: 0; font-size: 13px; color: #444444; line-height: 1.6; font-weight: 500;">
                            ${message.replace(/\n/g, '<br>')}
                          </p>
                        </div>
                      </td>
                    </tr>
                  </table>
                  ` : ''}

                  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-top: 32px; text-align: center;">
                    <tr>
                      <td>
                        <table border="0" cellpadding="0" cellspacing="0" class="btn-block" style="display: inline-block; vertical-align: middle; border-collapse: separate !important;">
                          <tr>
                            <td align="center" valign="middle" style="background-color: #9D00FF; border-radius: 40px;">
                              <a href="tel:${phone}" class="btn-spacing" style="display: inline-block; padding: 14px 36px; font-size: 13px; font-weight: 700; color: #ffffff; text-decoration: none; text-transform: uppercase; letter-spacing: 0.5px;">
                                Call Client
                              </a>
                            </td>
                          </tr>
                        </table>

                        <span class="btn-block" style="display: inline-block; width: 12px; height: 10px;"></span>

                        <table border="0" cellpadding="0" cellspacing="0" class="btn-block" style="display: inline-block; vertical-align: middle; border-collapse: separate !important;">
                          <tr>
                            <td align="center" valign="middle" style="border: 2px solid #9D00FF; border-radius: 40px; background-color: transparent;">
                              <a href="https://wa.me/${phone.replace(/[^0-9]/g, '')}" class="btn-spacing-secondary" style="display: inline-block; padding: 12px 34px; font-size: 13px; font-weight: 700; color: #9D00FF; text-decoration: none; text-transform: uppercase; letter-spacing: 0.5px;">
                                WhatsApp
                              </a>
                            </td>
                          </tr>
                        </table>
                        
                        </td>
                    </tr>
                  </table>

                  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-top: 36px; margin-bottom: 10px;">
                    <tr>
                      <td style="background: linear-gradient(90deg, transparent, #9D00FF, transparent); height: 1px; font-size: 1px; line-height: 1px;">&nbsp;</td>
                    </tr>
                  </table>

                </td>
              </tr>

              <tr>
                <td class="card-padding" style="padding: 10px 45px 36px 45px;">
                  <table border="0" cellpadding="0" cellspacing="0" width="100%">
                    <tr>
                      <td class="footer-column" width="50%" valign="top" style="font-size: 12px; line-height: 1.6; font-family: 'Montserrat', Arial, sans-serif;">
                        <strong style="font-size: 12px; color: #9D00FF; text-transform: uppercase; letter-spacing: 0.5px; display: block; margin-bottom: 4px;">Need Help?</strong>
                        <span style="color: #888888; font-weight: 500;">Contact support team</span><br />
                        <a href="mailto:support@modularone.com" style="color: #9D00FF; text-decoration: none; font-weight: 600;">support@modularone.com</a>
                      </td>
                      
                      <td class="footer-column" width="50%" valign="top" style="padding-left: 20px; font-size: 12px; line-height: 1.6; font-family: 'Montserrat', Arial, sans-serif;">
                        <strong style="font-size: 12px; color: #9D00FF; text-transform: uppercase; letter-spacing: 0.5px; display: block; margin-bottom: 4px;">Location</strong>
                        <span style="color: #888888; font-weight: 500;">Golani Naka, Vasai East<br />Mumbai - 401208</span>
                      </td>
                    </tr>
                  </table>

                  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-top: 30px; border-top: 1px solid #F0F0F0; padding-top: 20px; text-align: center;">
                    <tr>
                      <td style="font-size: 11px; color: #A1A1A1; font-weight: 500; letter-spacing: 0.2px;">
                        Modular One • Premium Modular Solutions
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

            </table> </td>
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
    ${budget ? `Budget: ₹${parseInt(budget).toLocaleString('en-IN')}` : ''}
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