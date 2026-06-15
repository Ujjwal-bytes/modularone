import nodemailer from 'nodemailer';
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

  // Cloudinary CDN URL for instant loading
  const logoUrl = "https://res.cloudinary.com/ddhotct77/image/upload/v1780938506/logoss_mtf9qo.png";

  // ULTRA RESPONSIVE & PREMIUM EMAIL TEMPLATE
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
          .responsive-padding { padding: 24px 16px !important; }
          
          /* Un-congesting Content Rows on Mobile */
          .detail-row { display: block !important; width: 100% !important; padding: 12px 0 !important; }
          .detail-label { display: block !important; width: 100% !important; text-align: left !important; padding-bottom: 4px !important; font-size: 11px !important; text-transform: uppercase !important; letter-spacing: 0.5px !important; }
          .detail-value { display: block !important; width: 100% !important; text-align: left !important; font-size: 15px !important; line-height: 1.4 !important; }
          
          /* Budget Row Special Handling */
          .budget-label { display: block !important; width: 100% !important; text-align: left !important; padding-bottom: 4px !important; }
          .budget-value { display: block !important; width: 100% !important; text-align: left !important; font-size: 20px !important; }

          /* Button Stacking Logic */
          .btn-container { display: block !important; width: 100% !important; padding: 0 !important; }
          .btn-stack { display: block !important; width: 100% !important; padding-right: 0 !important; padding-left: 0 !important; margin-bottom: 12px !important; }
          .btn-stack-last { display: block !important; width: 100% !important; padding-right: 0 !important; padding-left: 0 !important; }
        }
      </style>
    </head>
    <body style="margin: 0; padding: 24px 8px; background-color: #f5f5f5; font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, Arial, sans-serif;">

      <table border="0" cellpadding="0" cellspacing="0" width="100%">
        <tr>
          <td align="center">
            
            <table class="wrapper-table" border="0" cellpadding="0" cellspacing="0" width="520" style="background-color: #ffffff; border-radius: 24px; box-shadow: 0px 8px 24px rgba(0,0,0,0.04); width: 100%; max-width: 520px; overflow: hidden; border-collapse: separate !important;">
              
              <tr>
                <td style="background-color: #9D00FF; padding: 36px 20px; text-align: center;">
                  <img src="${logoUrl}" alt="Modular One" style="height: 40px; width: auto; display: inline-block;">
                  <div style="font-size: 11px; font-weight: 600; color: rgba(255,255,255,0.85); margin-top: 8px; letter-spacing: 1px; text-transform: uppercase;">
                    PREMIUM MODULAR SOLUTIONS
                  </div>
                </td>
              </tr>

              <tr>
                <td class="responsive-padding" style="padding: 40px 40px 24px 40px;">
                  
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
                        <p style="margin: 0; color: #777777; font-size: 13px;">
                          Received on ${new Date().toLocaleDateString('en-IN')}
                        </p>
                      </td>
                    </tr>
                  </table>

                  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-top: 32px; border: 1px solid #EAEAEA; border-radius: 16px; border-collapse: separate !important;">
                    <tr>
                      <td style="padding: 8px 20px;">
                        
                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-bottom: 1px solid #F5F5F5;">
                          <tr>
                            <td class="detail-row" style="padding: 14px 0;">
                              <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                <tr>
                                  <td class="detail-label" width="35%" style="font-size: 13px; color: #888888; font-weight: 500;">Full Name</td>
                                  <td class="detail-value" align="right" style="font-size: 14px; color: #1a1a1a; font-weight: 600;">${fullName}</td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </table>

                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-bottom: 1px solid #F5F5F5;">
                          <tr>
                            <td class="detail-row" style="padding: 14px 0;">
                              <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                <tr>
                                  <td class="detail-label" width="35%" style="font-size: 13px; color: #888888; font-weight: 500;">Email Address</td>
                                  <td class="detail-value" align="right" style="font-size: 14px; font-weight: 600;">
                                    <a href="mailto:${email}" style="color: #9D00FF; text-decoration: none; word-break: break-all;">${email}</a>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </table>

                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-bottom: 1px solid #F5F5F5;">
                          <tr>
                            <td class="detail-row" style="padding: 14px 0;">
                              <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                <tr>
                                  <td class="detail-label" width="35%" style="font-size: 13px; color: #888888; font-weight: 500;">Phone Number</td>
                                  <td class="detail-value" align="right" style="font-size: 14px; color: #1a1a1a; font-weight: 600;">${phone}</td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </table>

                        ${service ? `
                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-bottom: 1px solid #F5F5F5;">
                          <tr>
                            <td class="detail-row" style="padding: 14px 0;">
                              <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                <tr>
                                  <td class="detail-label" width="35%" style="font-size: 13px; color: #888888; font-weight: 500;">Service Type</td>
                                  <td class="detail-value" align="right" style="font-size: 14px; color: #1a1a1a; font-weight: 600;">${service}</td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </table>
                        ` : ''}

                        <table border="0" cellpadding="0" cellspacing="0" width="100%">
                          <tr>
                            <td class="detail-row" style="padding: 16px 0 12px 0;">
                              <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                <tr>
                                  <td class="budget-label" style="font-size: 13px; font-weight: 700; color: #1a1a1a;">Estimated Budget</td>
                                  <td class="budget-value" align="right" style="font-size: 18px; font-weight: 700; color: #9D00FF;">
                                    ${budget ? `₹${parseInt(budget).toLocaleString('en-IN')}` : 'To Be Discussed'}
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </table>

                      </td>
                    </tr>
                  </table>

                  ${details ? `
                  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-top: 20px;">
                    <tr>
                      <td>
                        <div style="background-color: #FAFAFA; border-radius: 14px; padding: 16px 20px; border-left: 4px solid #9D00FF;">
                          <div style="font-size: 11px; font-weight: 700; color: #777777; text-transform: uppercase; letter-spacing: 0.6px; margin-bottom: 6px;">Project Scope</div>
                          <div style="font-size: 13px; color: #1a1a1a; line-height: 1.6; font-weight: 500;">${details}</div>
                        </div>
                      </td>
                    </tr>
                  </table>
                  ` : ''}

                  ${message ? `
                  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-top: 20px;">
                    <tr>
                      <td>
                        <div style="background-color: #FAFAFA; border-radius: 14px; padding: 16px 20px;">
                          <div style="font-size: 11px; font-weight: 700; color: #777777; text-transform: uppercase; letter-spacing: 0.6px; margin-bottom: 6px;">Client Message</div>
                          <div style="font-size: 13px; color: #333333; line-height: 1.6; font-style: italic;">
                            "${message.substring(0, 300)}${message.length > 300 ? '...' : ''}"
                          </div>
                        </div>
                      </td>
                    </tr>
                  </table>
                  ` : ''}

                  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-top: 36px;">
                    <tr>
                      <td align="center" class="btn-container">
                        <table border="0" cellpadding="0" cellspacing="0" width="100%">
                          <tr>
                            <td class="btn-stack" width="50%" style="padding-right: 8px;">
                              <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                <tr>
                                  <td align="center" bgcolor="#9D00FF" style="border-radius: 12px; box-shadow: 0 4px 12px rgba(157, 0, 255, 0.2);">
                                    <a href="tel:${phone}" style="font-size: 13px; font-weight: 700; color: #ffffff; text-decoration: none; padding: 15px 20px; display: block; text-align: center; letter-spacing: 1px; text-transform: uppercase;">
                                      Call Client
                                    </a>
                                  </td>
                                </tr>
                              </table>
                            </td>
                            <td class="btn-stack-last" width="50%" style="padding-left: 8px;">
                              <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                <tr>
                                  <td align="center" bgcolor="#ffffff" style="border-radius: 12px; border: 2px solid #9D00FF;">
                                    <a href="https://wa.me/${phone.replace(/[^0-9]/g, '')}" style="font-size: 13px; font-weight: 700; color: #9D00FF; text-decoration: none; padding: 13px 20px; display: block; text-align: center; letter-spacing: 1px; text-transform: uppercase;">
                                      WhatsApp
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

                  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-top: 36px;">
                    <tr>
                      <td style="background: linear-gradient(90deg, transparent, #9D00FF, transparent); height: 1px; font-size: 1px; line-height: 1px;">&nbsp;</td>
                    </tr>
                  </table>

                </td>
              </tr>

              <tr>
                <td style="padding: 10px 20px 36px 20px; text-align: center;">
                  <div style="font-size: 12px; color: #666666; margin-bottom: 4px;">Need assistance? Contact support</div>
                  <a href="mailto:support@modularone.com" style="color: #9D00FF; font-size: 12px; text-decoration: none; font-weight: 600;">support@modularone.com</a>
                  <div style="font-size: 10px; color: #999999; margin-top: 24px; letter-spacing: 0.3px;">
                    Modular One • Golani Naka, Vasai East
                  </div>
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
      from: `"Modular One  <${process.env.SMTP_USER}>`,
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