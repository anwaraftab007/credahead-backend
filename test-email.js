// Simple email test for help@divinnesciences.com
// Make sure to run: npm install nodemailer

const nodemailer = require('nodemailer');

// First, let's verify nodemailer is working
console.log('Nodemailer version:', nodemailer.version || 'Unknown');
console.log('Testing email for: help@divinnesciences.com\n');

async function testEmailCredentials() {
  try {
    // Create transporter with your credentials
    const transporter = nodemailer.createTransport({
      host: 'smtp.hostinger.com',
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: 'help@divinnesciences.com',
        pass: '1Moc.@pleH//:sptth'
      },
      // Add debugging
      debug: true,
      logger: true
    });

    console.log('1. Testing SMTP connection...');
    
    // Test connection
    const isConnected = await transporter.verify();
    console.log('✅ SMTP connection successful!');

    console.log('\n2. Sending test email...');
    
    // Send test email
    const info = await transporter.sendMail({
      from: 'help@divinnesciences.com',
      to: 'anwaraftab007@gmail.com', // sending to yourself
      subject: 'Test Email - ' + new Date().toISOString(),
      text: 'This is a test email to verify your SMTP configuration is working.',
      html: `
        <h2>✅ Email Test Successful!</h2>
        <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
        <p><strong>From:</strong> help@divinnesciences.com</p>
        <p><strong>SMTP Server:</strong> smtp.hostinger.com:465</p>
        <p>Your email configuration is working correctly!</p>
      `
    });

    console.log('✅ Email sent successfully!');
    console.log('Message ID:', info.messageId);
    console.log('\n🎉 SUCCESS! Check your help@divinnesciences.com inbox.');

  } catch (error) {
    console.log('\n❌ Test failed:');
    console.log('Error:', error.message);
    
    // Provide specific troubleshooting
    if (error.code === 'EAUTH') {
      console.log('\n💡 Authentication Error Solutions:');
      console.log('   - Double-check your email password');
      console.log('   - Make sure the email account exists in Hostinger');
      console.log('   - Try resetting the email password');
    } else if (error.code === 'ECONNREFUSED') {
      console.log('\n💡 Connection Error Solutions:');
      console.log('   - Check if smtp.hostinger.com is the correct server');
      console.log('   - Try port 587 instead of 465');
      console.log('   - Check your firewall/network settings');
    } else if (error.code === 'ETIMEDOUT') {
      console.log('\n💡 Timeout Error Solutions:');
      console.log('   - Your ISP might be blocking SMTP ports');
      console.log('   - Try using a VPN');
      console.log('   - Contact Hostinger support');
    }
  }
}

// Alternative test with port 587
async function testAlternativeConfig() {
  console.log('\n--- Testing Alternative Configuration (Port 587) ---');
  
  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.hostinger.com',
      port: 587,
      secure: false, // false for 587
      auth: {
        user: 'help@divinnesciences.com',
        pass: '1Moc.@pleH//:sptth'
      }
    });

    await transporter.verify();
    console.log('✅ Alternative configuration (port 587) also works!');
    
  } catch (error) {
    console.log('❌ Alternative configuration failed:', error.message);
  }
}

// Run the tests
async function runTest() {
  console.log('🧪 Email Test Starting...\n');
  
  await testEmailCredentials();
  await testAlternativeConfig();
  
  console.log('\n--- Test Complete ---');
}

runTest();
