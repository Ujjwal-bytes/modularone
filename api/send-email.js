import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { fullName, email, phone, budget, service, message, type } = req.body;

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

  // Brand Configuration
  const BRAND_COLOR = '#001fae';
  const logoUrl = "https://res.cloudinary.com/ddhotct77/image/upload/v1780938506/logoss_mtf9qo.png";

  // CLEAN PHONE VALUE FOR ACTIONABLE LINKS
  const cleanPhone = phone ? phone.replace(/[^0-9+]/g, '') : '';
  const whatsappPhone = cleanPhone.replace('+', '');

  // COMPACT & PREMIUM BRANDED EMAIL TEMPLATE (FLAT EDGES + MOBILE FONT FIX)
  const htmlContent = `
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml" lang="en">
    <head>
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <title>${subject}</title>
      
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" rel="stylesheet">
      
      <style type="text/css">
        /* Hard-linking fonts inside style blocks makes mobile clients register them reliably */
        @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');

        body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
        table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-collapse: collapse !important; }
        body { height: 100% !important; margin: 0 !important; padding: 0 !important; width: 100% !important; background-color: #f8fafc; }

        /* Global Font Override to ensure rendering across responsive shifts */
        body, table, td, p, a, span, h2 {
          font-family: 'Google Sans', 'Roboto', RobotoDraft, Helvetica, Arial, sans-serif !important;
        }

        @media screen and (max-width: 600px) {
          body { padding: 10px 4px !important; }
          .wrapper-table { width: 100% !important; max-width: 100% !important; }
          
          /* Tight padding for mobile view corner layout */
          .header-cell { padding: 14px 14px !important; }
          .responsive-padding { padding: 20px 14px !important; }
          .footer-cell { padding: 12px 14px 20px 14px !important; }
          
          /* Prevents centering or collapsing; keeps elements pinned to corners */
          .mobile-left { text-align: left !important; }
          .mobile-right { text-align: right !important; }
        }
      </style>
    </head>
    <body style="margin: 0; padding: 20px 12px; background-color: #f8fafc; font-family: 'Google Sans', 'Roboto', RobotoDraft, Helvetica, Arial, sans-serif;">

      <table border="0" cellpadding="0" cellspacing="0" width="100%">
        <tr>
          <td align="center">
            
            <table class="wrapper-table" border="0" cellpadding="0" cellspacing="0" width="560" style="background-color: #ffffff; box-shadow: 0px 6px 24px rgba(148, 163, 184, 0.1); width: 100%; max-width: 560px; overflow: hidden; border-collapse: separate !important;">
              
              <tr>
                <td class="header-cell" style="background: ${BRAND_COLOR}; padding: 20px 24px;">
                  <table border="0" cellpadding="0" cellspacing="0" width="100%">
                    <tr>
                      <td class="mobile-left" align="left" valign="middle">
                        <img src="${logoUrl}" alt="Modular One" style="height: 26px; width: auto; display: inline-block; vertical-align: middle;">
                      </td>
                      <td class="mobile-right" align="right" valign="middle">
                        <span style="font-size: 12px; font-weight: 500; color: #ffffff; background-color: rgba(255,255,255,0.15); padding: 4px 12px; display: inline-block; vertical-align: middle; font-family: 'Google Sans', 'Roboto', RobotoDraft, Helvetica, Arial, sans-serif;">
                          ${isQuote ? 'Quote request' : 'New lead'}
                        </span>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

              <tr>
                <td class="responsive-padding" style="padding: 24px 32px;">
                  
                  <h2 style="margin: 0 0 16px 0; font-size: 18px; font-weight: 700; color: #0f172a; letter-spacing: -0.3px; font-family: 'Google Sans', 'Roboto', RobotoDraft, Helvetica, Arial, sans-serif;">
                    New Client Enquiry
                  </h2>

                  <table border="0" cellpadding="0" cellspacing="0" width="100%">
                    <tr>
                      <td width="48%" valign="top">
                        <table border="0" cellpadding="0" cellspacing="0" width="100%">
                          <tr>
                            <td style="padding: 6px 0;">
                              <div style="font-size: 12px; color: #64748b; font-weight: 500; margin-bottom: 2px; font-family: 'Google Sans', 'Roboto', RobotoDraft, Helvetica, Arial, sans-serif;">Full Name</div>
                              <div style="font-size: 14px; color: #0f172a; font-weight: 600; font-family: 'Google Sans', 'Roboto', RobotoDraft, Helvetica, Arial, sans-serif;">${fullName}</div>
                            </td>
                          </tr>
                          <tr>
                            <td style="padding: 6px 0;">
                              <div style="font-size: 12px; color: #64748b; font-weight: 500; margin-bottom: 2px; font-family: 'Google Sans', 'Roboto', RobotoDraft, Helvetica, Arial, sans-serif;">Email Address</div>
                              <div style="font-size: 14px; font-weight: 600; font-family: 'Google Sans', 'Roboto', RobotoDraft, Helvetica, Arial, sans-serif;">
                                <a href="mailto:${email}" style="color: ${BRAND_COLOR}; text-decoration: none; word-break: break-all;">${email}</a>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td style="padding: 6px 0;">
                              <div style="font-size: 12px; color: #64748b; font-weight: 500; margin-bottom: 2px; font-family: 'Google Sans', 'Roboto', RobotoDraft, Helvetica, Arial, sans-serif;">Phone Number</div>
                              <div style="font-size: 14px; color: #0f172a; font-weight: 600; font-family: 'Google Sans', 'Roboto', RobotoDraft, Helvetica, Arial, sans-serif;">${phone}</div>
                            </td>
                          </tr>
                        </table>
                      </td>
                      
                      <td width="4%">&nbsp;</td>
                      
                      <td width="48%" valign="top">
                        <table border="0" cellpadding="0" cellspacing="0" width="100%">
                          ${service ? `
                          <tr>
                            <td style="padding: 6px 0;">
                              <div style="font-size: 12px; color: #64748b; font-weight: 500; margin-bottom: 2px; font-family: 'Google Sans', 'Roboto', RobotoDraft, Helvetica, Arial, sans-serif;">Service Type</div>
                              <div style="font-size: 14px; color: #0f172a; font-weight: 600; font-family: 'Google Sans', 'Roboto', RobotoDraft, Helvetica, Arial, sans-serif;">${service}</div>
                            </td>
                          </tr>
                          ` : ''}
                          <tr>
                            <td style="padding: 6px 0;">
                              <div style="font-size: 12px; color: #0f172a; font-weight: 700; margin-bottom: 2px; font-family: 'Google Sans', 'Roboto', RobotoDraft, Helvetica, Arial, sans-serif;">Estimated Budget</div>
                              <div style="font-size: 16px; font-weight: 700; color: ${BRAND_COLOR}; font-family: 'Google Sans', 'Roboto', RobotoDraft, Helvetica, Arial, sans-serif;">
                                ${budget ? `₹${parseInt(budget).toLocaleString('en-IN')}` : 'To Be Discussed'}
                              </div>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>

                  ${message ? `
                  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-top: 16px;">
                    <tr>
                      <td>
                        <div style="background-color: #f8fafc; padding: 12px 16px;">
                          <div style="font-size: 12px; font-weight: 700; color: #64748b; margin-bottom: 4px; font-family: 'Google Sans', 'Roboto', RobotoDraft, Helvetica, Arial, sans-serif;">Client message</div>
                          <div style="font-size: 13px; color: #334155; line-height: 1.5; font-style: italic; font-family: 'Google Sans', 'Roboto', RobotoDraft, Helvetica, Arial, sans-serif;">
                            "${message.substring(0, 300)}${message.length > 300 ? '...' : ''}"
                          </div>
                        </div>
                      </td>
                    </tr>
                  </table>
                  ` : ''}

                  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-top: 20px;">
                    <tr>
                      <td align="left">
                        <table border="0" cellpadding="0" cellspacing="0">
                          <tr>
                            <td bgcolor="${BRAND_COLOR}">
                              <a href="tel:${cleanPhone}" style="font-size: 13px; font-weight: 700; color: #ffffff; text-decoration: none; padding: 10px 18px; display: block; text-align: center; font-family: 'Google Sans', 'Roboto', RobotoDraft, Helvetica, Arial, sans-serif;">
                                Call Client
                              </a>
                            </td>
                            <td width="12">&nbsp;</td>
                            <td bgcolor="#ffffff" style="border: 1.5px solid #e2e8f0;">
                              <a href="https://wa.me/${whatsappPhone}" style="font-size: 13px; font-weight: 700; color: #0f172a; text-decoration: none; padding: 8.5px 18px; display: block; text-align: center; font-family: 'Google Sans', 'Roboto', RobotoDraft, Helvetica, Arial, sans-serif;">
                                WhatsApp Chat
                              </a>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>

                </td>
              </tr>

              <tr>
                <td class="footer-cell" style="padding: 12px 32px 24px 32px; text-align: center; background-color: #ffffff;">
                  <div style="background: #e2e8f0; height: 1px; font-size: 1px; line-height: 1px; margin-bottom: 16px; width: 100%;">&nbsp;</div>
                  <div style="font-size: 11px; color: #94a3b8; letter-spacing: 0.1px; line-height: 1.4; font-family: 'Google Sans', 'Roboto', RobotoDraft, Helvetica, Arial, sans-serif;">
                    Modular One • Golani Naka, Vasai East • <a href="mailto:support@modularone.com" style="color: ${BRAND_COLOR}; text-decoration: none; font-weight: 600;">support@modularone.com</a>
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
    ${budget ? `Budget: ₹${parseInt(budget).toLocaleString('en-IN')}` : ''}
    ${service ? `Service: ${service}` : ''}
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
    });

    return res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Nodemailer Error:', error);
    return res.status(500).json({ message: 'Failed to send email', error: error.message });
  }
}