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

  // Clean template - NO FORCED COLORS, follows system preference
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${subject}</title>
      <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
      
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, Arial, sans-serif;
          line-height: 1.6;
        }
        
        .container {
          max-width: 560px;
          margin: 0 auto;
          width: 100%;
        }
        
        /* Responsive */
        @media screen and (max-width: 600px) {
          .padding-large { padding: 30px 20px !important; }
          .padding-medium { padding: 20px 16px !important; }
          .btn-stack { 
            display: block !important; 
            width: 100% !important; 
            margin: 10px 0 !important; 
          }
          .stack-column { 
            display: block !important; 
            width: 100% !important; 
            text-align: left !important; 
            padding-left: 0 !important;
            border-left: none !important;
          }
          .budget-text { font-size: 28px !important; }
        }
        
        @media screen and (max-width: 380px) {
          .padding-large { padding: 20px 16px !important; }
          .padding-medium { padding: 16px 12px !important; }
        }
      </style>
    </head>
    
    <body style="margin: 0; padding: 30px 16px;">
      
      <div class="container">
        
        <!-- Main Card with #9D00FF Accent -->
        <div style="border-radius: 28px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.1);">
          
          <!-- Purple Accent Header -->
          <div style="background-color: #9D00FF; padding: 40px 20px 35px 20px; text-align: center;">
            ${logoPath ? 
              `<img src="cid:logo@modularone.com" alt="Modular One" style="height: 50px; width: auto; margin-bottom: 15px;">` : 
              `<div style="font-size: 24px; font-weight: 900; letter-spacing: 4px; color: #ffffff;">
                MODULAR ONE
              </div>`
            }
            <div style="font-size: 13px; font-weight: 500; color: rgba(255,255,255,0.85); margin-top: 12px; letter-spacing: 1px;">
              PREMIUM MODULAR SOLUTIONS
            </div>
          </div>
          
          <!-- White Card Content (No force - will adapt to dark mode) -->
          <div style="background-color: #ffffff;">
            
            <!-- Hero Section -->
            <div class="padding-large" style="padding: 45px 45px 25px 45px; text-align: center;">
              <div style="display: inline-block; background-color: rgba(157, 0, 255, 0.08); padding: 6px 16px; border-radius: 40px; margin-bottom: 20px;">
                <span style="font-size: 11px; font-weight: 700; color: #9D00FF; text-transform: uppercase; letter-spacing: 1px;">
                  ${isQuote ? 'New Quote Request' : 'New Lead Alert'}
                </span>
              </div>
              <h1 style="margin: 0 0 15px 0; font-size: 28px; font-weight: 800; color: #1a1a1a; letter-spacing: -0.5px;">
                Client Enquiry
              </h1>
              <p style="margin: 0; color: #666666; font-size: 14px;">
                A new inbound lead has been received. Review the client specifications below.
              </p>
            </div>
            
            <!-- Client Details Card -->
            <div class="padding-large" style="padding: 15px 45px;">
              <div style="border: 1px solid #e0e0e0; border-radius: 20px; overflow: hidden;">
                <div class="padding-medium" style="padding: 28px 30px;">
                  
                  <!-- Header -->
                  <div style="border-bottom: 1px solid #f0f0f0; padding-bottom: 18px; margin-bottom: 22px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap;">
                    <span style="font-size: 14px; font-weight: 800; color: #9D00FF; text-transform: uppercase; letter-spacing: 1px;">Client Specifications</span>
                    <span style="font-size: 11px; color: #999999; font-weight: 500;">${new Date().toLocaleDateString('en-IN')}</span>
                  </div>
                  
                  <!-- Details -->
                  <div style="border-bottom: 1px solid #f5f5f5; display: flex; justify-content: space-between; padding: 12px 0;">
                    <span style="font-size: 13px; color: #888888; font-weight: 500;">Full Name</span>
                    <span style="font-size: 14px; color: #1a1a1a; font-weight: 700;">${fullName}</span>
                  </div>
                  
                  <div style="border-bottom: 1px solid #f5f5f5; display: flex; justify-content: space-between; padding: 12px 0;">
                    <span style="font-size: 13px; color: #888888; font-weight: 500;">Email Address</span>
                    <span style="font-size: 13px; font-weight: 500;">
                      <a href="mailto:${email}" style="color: #9D00FF; text-decoration: none;">${email}</a>
                    </span>
                  </div>
                  
                  <div style="border-bottom: 1px solid #f5f5f5; display: flex; justify-content: space-between; padding: 12px 0;">
                    <span style="font-size: 13px; color: #888888; font-weight: 500;">Phone Number</span>
                    <span style="font-size: 14px; color: #1a1a1a; font-weight: 600;">${phone}</span>
                  </div>
                  
                  ${service ? `
                  <div style="border-bottom: 1px solid #f5f5f5; display: flex; justify-content: space-between; padding: 12px 0;">
                    <span style="font-size: 13px; color: #888888; font-weight: 500;">Service Type</span>
                    <span style="font-size: 13px; color: #1a1a1a; font-weight: 500;">${service}</span>
                  </div>
                  ` : ''}
                  
                  ${details ? `
                  <div style="border-bottom: 1px solid #f5f5f5; display: flex; justify-content: space-between; padding: 12px 0;">
                    <span style="font-size: 13px; color: #888888; font-weight: 500;">Project Scope</span>
                    <span style="font-size: 13px; color: #555555; text-align: right; max-width: 250px;">${details}</span>
                  </div>
                  ` : ''}
                  
                  <!-- Budget -->
                  <div style="border-top: 1px solid rgba(157, 0, 255, 0.2); margin-top: 12px; padding-top: 18px; display: flex; justify-content: space-between; align-items: center;">
                    <span style="font-size: 13px; font-weight: 800; color: #1a1a1a;">Budget Estimate</span>
                    <span class="budget-text" style="font-size: 22px; font-weight: 900; color: #9D00FF;">
                      ${budget ? `₹${parseInt(budget).toLocaleString()}` : 'To Be Discussed'}
                    </span>
                  </div>
                  
                </div>
              </div>
            </div>
            
            <!-- Client Message -->
            ${message ? `
            <div class="padding-large" style="padding: 25px 45px 15px 45px;">
              <div style="margin-bottom: 12px;">
                <span style="font-size: 11px; font-weight: 800; color: #9D00FF; text-transform: uppercase; letter-spacing: 1px;">Client Message</span>
              </div>
              <div style="background-color: #fafafa; border-radius: 20px; padding: 20px 24px; border-left: 3px solid #9D00FF;">
                <p style="margin: 0; font-size: 13px; color: #444444; line-height: 1.7;">${message.replace(/\n/g, '<br>')}</p>
              </div>
            </div>
            ` : ''}
            
            <!-- Action Buttons -->
            <div class="padding-large" style="padding: 20px 45px 45px 45px;">
              <div style="display: flex; gap: 12px; justify-content: center; flex-wrap: wrap;">
                <a href="tel:${phone}" class="btn-stack" style="display: inline-block; background-color: #9D00FF; color: #ffffff; font-weight: 700; text-decoration: none; padding: 14px 32px; font-size: 13px; border-radius: 40px; text-transform: uppercase; letter-spacing: 1px;">
                  Call Client
                </a>
                <a href="https://wa.me/${phone.replace(/[^0-9]/g, '')}" class="btn-stack" style="display: inline-block; background-color: transparent; color: #9D00FF; font-weight: 600; text-decoration: none; padding: 14px 32px; font-size: 13px; border-radius: 40px; border: 2px solid #9D00FF; text-transform: uppercase; letter-spacing: 1px;">
                  WhatsApp
                </a>
              </div>
            </div>
            
            <!-- Divider -->
            <div style="padding: 0 45px;">
              <div style="height: 1px; background: linear-gradient(90deg, transparent, #9D00FF, transparent);"></div>
            </div>
            
            <!-- Footer -->
            <div style="padding: 35px 45px;">
              <div style="display: flex; justify-content: space-between; flex-wrap: wrap;">
                <div class="stack-column" style="font-size: 12px; line-height: 1.8;">
                  <strong style="font-size: 13px; color: #9D00FF; text-transform: uppercase; letter-spacing: 1px;">Need Help?</strong><br />
                  <span style="color: #888888;">Contact support team</span><br />
                  <a href="mailto:support@modularone.com" style="color: #9D00FF; text-decoration: none; font-weight: 600;">support@modularone.com</a>
                </div>
                <div class="stack-column" style="font-size: 12px; line-height: 1.8;">
                  <strong style="font-size: 13px; color: #9D00FF; text-transform: uppercase; letter-spacing: 1px;">Location</strong><br />
                  <span style="color: #888888;">Golani Naka, Vasai East<br />Mumbai - 401208</span>
                </div>
              </div>
              <div style="text-align: center; margin-top: 25px; padding-top: 20px; border-top: 1px solid #f0f0f0;">
                <span style="font-size: 10px; color: #aaaaaa;">Modular One • Premium Modular Solutions</span>
              </div>
            </div>
            
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