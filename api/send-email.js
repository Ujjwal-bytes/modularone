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

  // NEW DESIGN WITH #9D00FF ACCENT COLOR
  const htmlContent = `
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml" lang="en">
    <head>
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <meta name="color-scheme" content="light only">
      <meta name="supported-color-schemes" content="light">
      <title>${subject}</title>
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
      
      <style type="text/css">
        body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
        table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-collapse: collapse !important; }
        body { 
          height: 100% !important; 
          margin: 0 !important; 
          padding: 0 !important; 
          width: 100% !important; 
          background-color: #0A0A0A !important;
          font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, Arial, sans-serif !important;
        }
        
        /* Dark mode override to keep dark background */
        @media (prefers-color-scheme: dark) {
          body {
            background-color: #0A0A0A !important;
          }
        }
        
        /* Force all text colors */
        .force-white {
          color: #ffffff !important;
        }
        
        .force-dark {
          color: #0A0A0A !important;
        }

        @media screen and (max-width: 600px) {
          .wrapper-table { width: 100% !important; max-width: 100% !important; }
          .content-padding { padding: 30px 20px !important; }
          .card-padding { padding: 20px 16px !important; }
          .btn-stack { 
            display: block !important; 
            width: 100% !important; 
            margin: 10px 0 !important; 
            text-align: center !important;
            box-sizing: border-box !important;
          }
          .stack-column { 
            display: block !important; 
            width: 100% !important; 
            text-align: left !important; 
            padding-left: 0 !important;
            border-left: none !important;
          }
          .budget-text { font-size: 28px !important; }
          .heading-large { font-size: 18px !important; }
        }
        
        @media screen and (max-width: 380px) {
          .content-padding { padding: 20px 16px !important; }
          .card-padding { padding: 16px 12px !important; }
          .btn-stack { padding: 12px 20px !important; font-size: 13px !important; }
          .budget-text { font-size: 24px !important; }
        }
      </style>
    </head>
    
    <body style="margin: 0; padding: 30px 0; background-color: #0A0A0A; font-family: 'Montserrat', Arial, sans-serif;">
      
      <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #0A0A0A;">
        <tr>
          <td align="center" style="padding: 0 10px;">
            
            <!-- Main Email Container -->
            <table class="wrapper-table" border="0" cellpadding="0" cellspacing="0" width="560" style="background-color: #0A0A0A; max-width: 560px; width: 100%;">
              
              <!-- TOP PURPLE ACCENT BANNER - #9D00FF -->
              <tr>
                <td style="background-color: #9D00FF; padding: 40px 20px 35px 20px; text-align: center; border-radius: 28px 28px 0 0;">
                  ${logoPath ? 
                    `<img src="cid:logo@modularone.com" alt="Modular One" style="height: 48px; width: auto; margin-bottom: 15px;">` : 
                    `<div style="font-size: 24px; font-weight: 900; color: #ffffff; letter-spacing: 6px; text-transform: uppercase;">
                      MODULAR ONE
                    </div>`
                  }
                  <div style="font-size: 13px; font-weight: 500; color: rgba(255,255,255,0.85); margin-top: 12px; letter-spacing: 1px;">
                    PREMIUM MODULAR SOLUTIONS
                  </div>
                </td>
              </tr>

              <!-- HERO SECTION -->
              <tr>
                <td class="content-padding" style="padding: 45px 45px 25px 45px; text-align: center; background-color: #0A0A0A;">
                  <div style="display: inline-block; background-color: rgba(157, 0, 255, 0.12); padding: 6px 16px; border-radius: 40px; margin-bottom: 20px;">
                    <span style="font-size: 11px; font-weight: 700; color: #9D00FF; text-transform: uppercase; letter-spacing: 1px;">
                      ${isQuote ? 'New Quote Request' : 'New Lead Alert'}
                    </span>
                  </div>
                  <h1 style="margin: 0 0 15px 0; font-size: 28px; font-weight: 800; color: #ffffff; letter-spacing: -0.5px;">
                    Client Enquiry
                  </h1>
                  <p style="margin: 0; color: #A0A0A0; font-size: 14px; line-height: 1.6; font-weight: 400;">
                    A new inbound lead has been received from the modular one platform. Review the client specifications below.
                  </p>
                </td>
              </tr>

              <!-- MAIN DETAILS CARD WITH GLASS MORPHISM -->
              <tr>
                <td class="content-padding" style="padding: 15px 45px; background-color: #0A0A0A;">
                  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background: linear-gradient(135deg, #141414 0%, #111111 100%); border: 1px solid rgba(157, 0, 255, 0.2); border-radius: 24px; box-shadow: 0 20px 35px -12px rgba(0,0,0,0.5);">
                    <tr>
                      <td class="card-padding" style="padding: 28px 30px;">
                        
                        <!-- Header with Icon and Date -->
                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-bottom: 1px solid rgba(157, 0, 255, 0.2); padding-bottom: 18px; margin-bottom: 22px;">
                          <tr>
                            <td>
                              <span style="font-size: 14px; font-weight: 800; color: #9D00FF; text-transform: uppercase; letter-spacing: 1px;">Client Specifications</span>
                            </td>
                            <td align="right">
                              <span style="font-size: 11px; color: #666666; font-weight: 500;">${new Date().toLocaleDateString('en-IN')}</span>
                            </td>
                          </tr>
                        </table>

                        <!-- Client Details -->
                        <table border="0" cellpadding="0" cellspacing="0" width="100%">
                          <!-- Name -->
                          <tr style="border-bottom: 1px solid rgba(255,255,255,0.05);">
                            <td style="padding: 12px 0; font-size: 13px; color: #888888; font-weight: 500; width: 130px;">Full Name</td>
                            <td align="right" style="padding: 12px 0; font-size: 14px; color: #ffffff; font-weight: 700;">${fullName}</td>
                          </tr>
                          
                          <!-- Email -->
                          <tr style="border-bottom: 1px solid rgba(255,255,255,0.05);">
                            <td style="padding: 12px 0; font-size: 13px; color: #888888; font-weight: 500;">Email Address</td>
                            <td align="right" style="padding: 12px 0; font-size: 13px; color: #9D00FF; font-weight: 500;">
                              <a href="mailto:${email}" style="color: #9D00FF; text-decoration: none;">${email}</a>
                            </td>
                          </tr>
                          
                          <!-- Phone -->
                          <tr style="border-bottom: 1px solid rgba(255,255,255,0.05);">
                            <td style="padding: 12px 0; font-size: 13px; color: #888888; font-weight: 500;">Phone Number</td>
                            <td align="right" style="padding: 12px 0; font-size: 14px; color: #ffffff; font-weight: 600;">${phone}</td>
                          </tr>
                          
                          ${service ? `
                          <!-- Service Type -->
                          <tr style="border-bottom: 1px solid rgba(255,255,255,0.05);">
                            <td style="padding: 12px 0; font-size: 13px; color: #888888; font-weight: 500;">Service Type</td>
                            <td align="right" style="padding: 12px 0; font-size: 13px; color: #ffffff; font-weight: 500;">${service}</td>
                          </tr>
                          ` : ''}
                          
                          ${details ? `
                          <!-- Project Scope -->
                          <tr style="border-bottom: 1px solid rgba(255,255,255,0.05);">
                            <td valign="top" style="padding: 12px 0; font-size: 13px; color: #888888; font-weight: 500;">Project Scope</td>
                            <td align="right" style="padding: 12px 0; font-size: 13px; color: #cccccc; line-height: 1.5;">${details}</td>
                          </tr>
                          ` : ''}
                          
                          <!-- Budget Highlight -->
                          <tr>
                            <td style="padding: 18px 0 12px 0; border-top: 1px solid rgba(157, 0, 255, 0.2); font-size: 13px; color: #ffffff; font-weight: 800;">Budget Estimate</td>
                            <td align="right" style="padding: 18px 0 12px 0; border-top: 1px solid rgba(157, 0, 255, 0.2);">
                              <span class="budget-text" style="font-size: 22px; font-weight: 900; color: #9D00FF;">
                                ${budget ? `₹${parseInt(budget).toLocaleString()}` : 'To Be Discussed'}
                              </span>
                            </td>
                          </tr>
                        </table>

                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

              <!-- CLIENT MESSAGE SECTION -->
              ${message ? `
              <tr>
                <td class="content-padding" style="padding: 25px 45px 15px 45px; background-color: #0A0A0A;">
                  <table border="0" cellpadding="0" cellspacing="0" width="100%">
                    <tr>
                      <td style="padding-bottom: 12px;">
                        <span style="font-size: 11px; font-weight: 800; color: #9D00FF; text-transform: uppercase; letter-spacing: 1px;">Client Message</span>
                      </td>
                    </tr>
                    <tr>
                      <td style="background-color: #141414; border-radius: 20px; padding: 20px 24px; border-left: 3px solid #9D00FF;">
                        <p style="margin: 0; font-size: 13px; color: #e0e0e0; line-height: 1.7; font-style: normal;">
                          "${message.replace(/\n/g, '<br>')}"
                        </p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              ` : ''}

              <!-- ACTION BUTTONS - PURPLE THEME -->
              <tr>
                <td class="content-padding" style="padding: 20px 45px 40px 45px; background-color: #0A0A0A;">
                  <table border="0" cellpadding="0" cellspacing="0" width="100%">
                    <tr>
                      <td align="center">
                        <a href="tel:${phone}" class="btn-stack" style="display: inline-block; background-color: #9D00FF; color: #ffffff; font-weight: 700; text-decoration: none; padding: 14px 32px; font-size: 13px; border-radius: 40px; margin: 0 6px; text-transform: uppercase; letter-spacing: 1px; box-shadow: 0 4px 15px rgba(157, 0, 255, 0.3);">
                          Call Client
                        </a>
                        <a href="https://wa.me/${phone.replace(/[^0-9]/g, '')}" class="btn-stack" style="display: inline-block; background-color: transparent; color: #9D00FF; font-weight: 600; text-decoration: none; padding: 13px 32px; font-size: 13px; border-radius: 40px; border: 2px solid #9D00FF; margin: 0 6px; text-transform: uppercase; letter-spacing: 1px;">
                          WhatsApp
                        </a>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

              <!-- DIVIDER -->
              <tr>
                <td style="padding: 0 45px;">
                  <div style="height: 1px; background: linear-gradient(90deg, transparent, #9D00FF, transparent);"></div>
                </td>
              </tr>

              <!-- FOOTER SECTION -->
              <tr>
                <td class="content-padding" style="background: linear-gradient(135deg, #0F0F0F 0%, #0A0A0A 100%); padding: 35px 45px; border-radius: 0 0 28px 28px;">
                  <table border="0" cellpadding="0" cellspacing="0" width="100%">
                    <tr>
                      <td class="stack-column" valign="top" style="font-size: 12px; line-height: 1.8; padding-bottom: 20px;">
                        <strong style="font-size: 13px; color: #9D00FF; text-transform: uppercase; letter-spacing: 1px;">Need Help?</strong><br />
                        <span style="color: #888888;">Contact support team</span><br />
                        <a href="mailto:support@modularone.com" style="color: #9D00FF; text-decoration: none; font-weight: 600;">support@modularone.com</a>
                      </td>
                      <td class="stack-column" valign="top" align="right" style="font-size: 12px; line-height: 1.8; border-left: 1px solid rgba(157, 0, 255, 0.2); padding-left: 25px;">
                        <strong style="font-size: 13px; color: #9D00FF; text-transform: uppercase; letter-spacing: 1px;">Location</strong><br />
                        <span style="color: #888888;">Golani Naka, Vasai East<br />Mumbai, Maharashtra - 401208</span>
                      </td>
                    </tr>
                  </table>
                  <div style="text-align: center; margin-top: 25px; padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.05);">
                    <span style="font-size: 10px; color: #555555;">Modular One • Premium Modular Solutions • System Generated Email</span>
                  </div>
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