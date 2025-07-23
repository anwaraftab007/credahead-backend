// const transporter = require('../config/mailer');
// require('dotenv').config();

// exports.sendContactEmail = async (req, res) => {
//   const { name, email, phone, subject, message } = req.body;

//   if (!name || !email || !message) {
//     return res.status(400).json({ success: false, msg: 'Please fill all required fields.' });
//   }

//   const mailOptions = {
//     from: `${process.env.EMAIL_USER}`, // Use the email user as the sender
//     to: process.env.EMAIL_RECEIVER,
//     subject: 'Get in Touch',
//     html: `
//       <div style="font-family: 'Segoe UI', sans-serif; border:1px solid #ddd; max-width:600px; margin:0 auto; padding:20px; background:#fff; border-radius:8px;">
//         <div style="text-align:center; margin-bottom:20px;">
//           <img src="https://credahead.netlify.app/assets/img/logo/preloader.png" alt="Logo" style="height:50px;" />
//         </div>
//         <h2 style="color:#FF6B35; border-bottom:2px solid #FF6B35; padding-bottom:10px;">Get in Touch</h2>
//         <table style="width:100%; margin-top:20px; border-collapse:collapse;">
//         <tr>
//             <td style="padding:8px; font-weight:bold; color:#333;">Subject:</td>
//             <td style="padding:8px; color:#555;">${subject}</td>
//           </tr>
//           <tr>
//             <td style="padding:8px; font-weight:bold; color:#333;">Name:</td>
//             <td style="padding:8px; color:#555;">${name}</td>
//           </tr>
//           <tr style="background:#f9f9f9;">
//             <td style="padding:8px; font-weight:bold; color:#333;">Email:</td>
//             <td style="padding:8px; color:#555;">${email}</td>
//           </tr>
//           <tr>
//             <td style="padding:8px; font-weight:bold; color:#333;">Phone:</td>
//             <td style="padding:8px; color:#555;">${phone}</td>
//           </tr>
//           <tr>
//             <td style="padding:8px; font-weight:bold; color:#333; vertical-align:top;">Message:</td>
//             <td style="padding:8px; color:#555; white-space:pre-line;">${message}</td>
//           </tr>
//         </table>
//         <div style="margin-top:30px; text-align:center; color:#999; font-size:12px;">
//           This message was sent from the contact form on <strong>Your Website</strong>.
//         </div>
//       </div>
//     `,
//   };
  

//   try {
//     await transporter.sendMail(mailOptions);
//     res.status(200).json({ success: true, msg: 'Message sent successfully!' });
//   } catch (error) {
//     console.error('Email sending failed:', error);
//     res.status(500).json({ success: false, msg: 'Failed to send message.' });
//   }
// };




const transporter = require('../config/mailer');
require('dotenv').config();

exports.sendContactEmail = async (req, res) => {
  const { name, email, phone, subject, message } = req.body;

  if (!name || !email) {
    return res.status(400).json({ success: false, msg: 'Please fill all required fields.' });
  }

  const mailOptions = {
    from: `${process.env.EMAIL_USER}`,
    to: process.env.EMAIL_RECEIVER,
    subject: `Get In Touch : ${name}`,
    html: `
      <div style="font-family: 'Segoe UI', sans-serif; border:1px solid #ddd; max-width:600px; margin:0 auto; padding:20px; background:#fff; border-radius:8px;">
        <div style="text-align:center; margin-bottom:20px;">
          <img src="https://credahead.netlify.app/assets/img/logo/preloader.png" alt="Logo" style="height:50px;" />
        </div>
        <h2 style="color:#FF6B35; border-bottom:2px solid #FF6B35; padding-bottom:10px;">Get in Touch</h2>
        <table style="width:100%; margin-top:20px; border-collapse:collapse;">
          <tr>
            <td style="padding:8px; font-weight:bold; color:#333;">Subject:</td>
            <td style="padding:8px; color:#555;">${subject}</td>
          </tr>
          <tr>
            <td style="padding:8px; font-weight:bold; color:#333;">Name:</td>
            <td style="padding:8px; color:#555;">${name}</td>
          </tr>
          <tr style="background:#f9f9f9;">
            <td style="padding:8px; font-weight:bold; color:#333;">Email:</td>
            <td style="padding:8px; color:#555;">${email}</td>
          </tr>
          <tr>
            <td style="padding:8px; font-weight:bold; color:#333;">Phone:</td>
            <td style="padding:8px; color:#555;">${phone || 'N/A'}</td>
          </tr>
          ${message ? `
          <tr>
            <td style="padding:8px; font-weight:bold; color:#333; vertical-align:top;">Message:</td>
            <td style="padding:8px; color:#555; white-space:pre-line;">${message}</td>
          </tr>
          ` : ''}
        </table>
        <div style="margin-top:30px; text-align:center; color:#999; font-size:12px;">
          This message was sent from the contact form on <strong>Your Website</strong>.
        </div>
      </div>
    `,
  };

  try {
    // console.log('\n--- Sending Contact Email ---');
    // console.log('From:', mailOptions.from);
    // console.log('To:', mailOptions.to);
    // console.log('Subject:', mailOptions.subject);
    // console.log('Sending via transporter:', transporter.transporterName || 'default');

    const result = await transporter.sendMail(mailOptions);
    
    // console.log('✅ Email sent successfully!');
    // console.log('Message ID:', result.messageId);
    // console.log('Response:', result.response);

    res.status(200).json({ success: true, msg: 'Message sent successfully!' });
  } catch (error) {
    console.error('❌ Email sending failed!');
    console.error('Error message:', error.message);
    console.error('Full error:', error);
    
    res.status(500).json({ success: false, msg: 'Failed to send message.' });
  }
};
