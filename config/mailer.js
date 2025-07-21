// config/mailer.js
const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  host: 'smtp.hostinger.com',
  port: 465,
  secure: true, // Use true for port 465
  auth: {
    user: process.env.EMAIL_USER, // e.g. help@divinnesciences.com
    pass: process.env.EMAIL_PASS  // password of the Hostinger email
  }
});

module.exports = transporter;
