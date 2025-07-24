const transporter = require('../config/mailer');
require('dotenv').config();

exports.sendDemoRequestEmail = async (req, res) => {
  const { name, email, phone, organizationName, message = '' } = req.body;

  // Validation (you can adjust as needed)
  if (!name || !email || !phone || !organizationName) {
    return res.status(400).json({ success: false, msg: 'Please fill all required fields.' });
  }

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_RECEIVER,
    subject: `Request A Demo : ${organizationName}`,
    html: `
      <div style="font-family: 'Segoe UI', sans-serif; border:1px solid #ddd; max-width:600px; margin:0 auto; padding:20px; background:#fff; border-radius:8px;">
       <div style="">
         <p class="mx-auto" style="font-size: 1.8rem; margin-bottom: 16px; margin-top: 0px; line-height: 1.6; font-weight: 400 !important; text-align: left;">
          <b><span style="color: #0051C8;">Cred</span><span style="color: #FF6B35;">Ahead</span> </b>
        </p>
        </div>
        <h2 style="color:#FF6B35; border-bottom:2px solid #FF6B35; padding-bottom:10px;">Request a Demo</h2>
        <table style="width:100%; margin-top:20px; border-collapse:collapse;">
          <tr>
            <td style="padding:8px; font-weight:bold;">Name:</td>
            <td style="padding:8px;">${name}</td>
          </tr>
          <tr style="background:#f9f9f9;">
            <td style="padding:8px; font-weight:bold;">Email:</td>
            <td style="padding:8px;">${email}</td>
          </tr>
          <tr>
            <td style="padding:8px; font-weight:bold;">Phone:</td>
            <td style="padding:8px;">${phone}</td>
          </tr>
          <tr style="background:#f9f9f9;">
            <td style="padding:8px; font-weight:bold;">Organization:</td>
            <td style="padding:8px;">${organizationName}</td>
          </tr>
          ${message ? `
          <tr style="background:#f9f9f9;">
            <td style="padding:8px; font-weight:bold; vertical-align:top;">Message:</td>
            <td style="padding:8px; white-space:pre-line;">${message}</td>
          </tr>` : ''}
        </table>
        <div style="margin-top:30px; text-align:center; color:#999; font-size:12px;">
          This message was sent from the "Request a Demo" form on <strong>Your Website</strong>.
        </div>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, msg: 'Thank you for reaching out. We will get back to you as soon as possible.' });
  } catch (error) {
    console.error('Demo email failed:', error);
    res.status(500).json({ success: false, msg: 'Failed to send demo request.' });
  }
};
