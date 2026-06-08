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

  // BULLETPROOF & COMPACT EMAIL TEMPLATE
  const htmlContent = `
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml" lang="en">
    <head>
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <title>${subject}</title>
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&display=swap" rel="stylesheet">
      
      <style type="text/css">
        body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
        table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-collapse: collapse !important; }
        body { height: 100% !important; margin: 0 !important; padding: 0 !important; width: 100% !important; background-color: #f5f5f5; }

        @media screen and (max-width: 600px) {
          .wrapper-table { width: 100% !important; max-width: 100% !important; }
          .responsive-padding { padding: 20px 15px !important; }
          .btn-stack { display: block !important; width: 100% !important; margin-bottom: 12px !important; padding-right: 0 !important; }
          .btn-stack-last { display: block !important; width: 100% !important; }
          .detail-label { display: block !important; width: 100% !important; text-align: left !important; padding-bottom: 2px; }
          .detail-value { display: block !important; width: 100% !important; text-align: left !important; }
        }
      </style>
    </head>
    <body style="margin: 0; padding: 30px 12px; background-color: #f5f5f5; font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, Arial, sans-serif;">

      <table border="0" cellpadding="0" cellspacing="0" width="100%">
        <tr>
          <td align="center">
            
            <!-- Main Card Container -->
            <table class="wrapper-table" border="0" cellpadding="0" cellspacing="0" width="550" style="background-color: #ffffff; border-radius: 20px; box-shadow: 0px 4px 12px rgba(0,0,0,0.03); width: 100%; max-width: 550px; overflow: hidden; border-collapse: separate !important;">
              
              <!-- Brand Header -->
              <tr>
                <td style="background-color: #9D00FF; padding: 32px 20px; text-align: center;">
                  ${logoPath ? 
                    `<img src="cid:logo@modularone.com" alt="Modular One" style="height: 42px; width: auto; display: inline-block;">` : 
                    `<div style="font-size: 20px; font-weight: 800; letter-spacing: 2px; color: #ffffff; margin: 0;">MODULAR ONE</div>`
                  }
                  <div style="font-size: 11px; font-weight: 600; color: rgba(255,255,255,0.8); margin-top: 8px; letter-spacing: 1px;">
                    PREMIUM MODULAR SOLUTIONS
                  </div>
                </td>
              </tr>

              <!-- Inner Body Padding Wrapper -->
              <tr>
                <td class="responsive-padding" style="padding: 32px 36px 20px 36px;">
                  
                  <!-- Badge Component -->
                  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="text-align: center;">
                    <tr>
                      <td>
                        <div style="display: inline-block; background-color: rgba(157, 0, 255, 0.08); padding: 5px 14px; border-radius: 40px; margin-bottom: 12px;">
                          <span style="font-size: 11px; font-weight: 700; color: #9D00FF; letter-spacing: 0.5px; text-transform: uppercase;">
                            ${isQuote ? 'Quote Request' : 'New Lead'}
                          </span>
                        </div>
                        <h2 style="margin: 0 0 6px 0; font-size: 22px; font-weight: 700; color: #1a1a1a;">
                          New Client Enquiry
                        </h2>
                        <p style="margin: 0; color: #666666; font-size: 13px;">
                          Received on ${new Date().toLocaleDateString('en-IN')}
                        </p>
                      </td>
                    </tr>
                  </table>

                  <!-- Specifications Sheet Grid -->
                  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-top: 24px; border: 1px solid #EAEAEA; border-radius: 16px; border-collapse: separate !important;">
                    <tr>
                      <td style="padding: 16px 20px;">
                        
                        <!-- Row: Full Name -->
                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-bottom: 1px solid #F5F5F5; padding: 10px 0;">
                          <tr>
                            <td class="detail-label" style="font-size: 13px; color: #888888; font-weight: 500;">Full Name</td>
                            <td class="detail-value" align="right" style="font-size: 14px; color: #1a1a1a; font-weight: 600;">${fullName}</td>
                          </tr>
                        </table>

                        <!-- Row: Email -->
                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-bottom: 1px solid #F5F5F5; padding: 10px 0;">
                          <tr>
                            <td class="detail-label" style="font-size: 13px; color: #888888; font-weight: 500;">Email Address</td>
                            <td class="detail-value" align="right" style="font-size: 13px; font-weight: 600;">
                              <a href="mailto:${email}" style="color: #9D00FF; text-decoration: none; word-break: break-all;">${email}</a>
                            </td>
                          </tr>
                        </table>

                        <!-- Row: Phone -->
                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-bottom: 1px solid #F5F5F5; padding: 10px 0;">
                          <tr>
                            <td class="detail-label" style="font-size: 13px; color: #888888; font-weight: 500;">Phone Number</td>
                            <td class="detail-value" align="right" style="font-size: 14px; color: #1a1a1a; font-weight: 600;">${phone}</td>
                          </tr>
                        </table>

                        <!-- Row: Service (Optional) -->
                        ${service ? `
                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-bottom: 1px solid #F5F5F5; padding: 10px 0;">
                          <tr>
                            <td class="detail-label" style="font-size: 13px; color: #888888; font-weight: 500;">Service Requested</td>
                            <td class="detail-value" align="right" style="font-size: 13px; color: #1a1a1a; font-weight: 600;">${service}</td>
                          </tr>
                        </table>
                        ` : ''}

                        <!-- Row: Budget Highlight -->
                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="padding-top: 10px;">
                          <tr>
                            <td style="font-size: 13px; font-weight: 700; color: #1a1a1a;">Estimated Budget</td>
                            <td align="right" style="font-size: 16px; font-weight: 700; color: #9D00FF;">
                              ${budget ? `₹${parseInt(budget).toLocaleString('en-IN')}` : 'To Be Discussed'}
                            </td>
                          </tr>
                        </table>

                      </td>
                    </tr>
                  </table>

                  <!-- Dynamic Project Scope Card -->
                  ${details ? `
                  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-top: 16px;">
                    <tr>
                      <td>
                        <div style="background-color: #FAFAFA; border-radius: 12px; padding: 14px 18px; border-left: 3px solid #9D00FF;">
                          <div style="font-size: 11px; font-weight: 700; color: #666666; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px;">Project Scope</div>
                          <div style="font-size: 13px; color: #1a1a1a; line-height: 1.5; font-weight: 500;">${details}</div>
                        </div>
                      </td>
                    </tr>
                  </table>
                  ` : ''}

                  <!-- Dynamic Client Message Message Box -->
                  ${message ? `
                  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-top: 16px;">
                    <tr>
                      <td>
                        <div style="background-color: #FAFAFA; border-radius: 12px; padding: 14px 18px;">
                          <div style="font-size: 11px; font-weight: 700; color: #666666; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px;">Client Message</div>
                          <div style="font-size: 13px; color: #333333; line-height: 1.5; font-style: italic;">
                            "${message.substring(0, 200)}${message.length > 200 ? '...' : ''}"
                          </div>
                        </div>
                      </td>
                    </tr>
                  </table>
                  ` : ''}

                  <!-- Control Action Buttons Layout Grid -->
                  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-top: 28px;">
                    <tr>
                      <td align="center">
                        <table border="0" cellpadding="0" cellspacing="0" width="100%">
                          <tr>
                            <!-- CTA: Phone Line Callout -->
                            <td class="btn-stack" width="50%" style="padding-right: 6px;">
                              <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                <tr>
                                  <td align="center" bgcolor="#9D00FF" style="border-radius: 40px;">
                                    <a href="tel:${phone}" style="font-size: 13px; font-weight: 600; color: #ffffff; text-decoration: none; padding: 12px 18px; display: block; text-align: center;">
                                      📞 Call Client
                                    </a>
                                  </td>
                                </tr>
                              </table>
                            </td>
                            <!-- CTA: Realtime WhatsApp Routing -->
                            <td class="btn-stack-last" width="50%" style="padding-left: 6px;">
                              <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                <tr>
                                  <td align="center" bgcolor="#ffffff" style="border-radius: 40px; border: 2px solid #9D00FF;">
                                    <a href="https://wa.me/${phone.replace(/[^0-9]/g, '')}" style="font-size: 13px; font-weight: 600; color: #9D00FF; text-decoration: none; padding: 10px 18px; display: block; text-align: center;">
                                      💬 WhatsApp
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

                  <!-- Footer Dynamic Gradient Line -->
                  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-top: 32px;">
                    <tr>
                      <td style="background: linear-gradient(90deg, transparent, #9D00FF, transparent); height: 1px; font-size: 1px; line-height: 1px;">&nbsp;</td>
                    </tr>
                  </table>

                </td>
              </tr>

              <!-- Footer Core Area -->
              <tr>
                <td style="padding: 12px 20px 28px 20px; text-align: center;">
                  <div style="font-size: 12px; color: #666666; margin-bottom: 4px;">Need assistance? Contact support</div>
                  <a href="mailto:support@modularone.com" style="color: #9D00FF; font-size: 12px; text-decoration: none; font-weight: 600;">support@modularone.com</a>
                  <div style="font-size: 10px; color: #999999; margin-top: 16px; letter-spacing: 0.2px;">
                    Modular One • Golani Naka, Vasai East
                  </div>
                </td>
              </tr>

            </table> <!-- End Main Layout Card Container -->

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