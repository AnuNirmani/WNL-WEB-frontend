// test-email.js
// Simple script to test SMTP email functionality
import { sendContactEmail, verifyConnection } from './server/contactEmailHandler.js';

async function testEmail() {
  console.log('🧪 Testing SMTP Email Configuration...\n');

  // Step 1: Verify SMTP connection
  console.log('Step 1: Verifying SMTP connection...');
  const isConnected = await verifyConnection();
  
  if (!isConnected) {
    console.error('❌ SMTP connection failed. Please check your credentials.');
    process.exit(1);
  }
  
  console.log('✅ SMTP connection successful!\n');

  // Step 2: Send test email
  console.log('Step 2: Sending test email...');
  
  const testFormData = {
    name: 'Test User',
    email: 'test@example.com',
    subject: 'Test Email from WNL Contact Form',
    message: 'This is a test message to verify the email functionality is working correctly.'
  };

  try {
    const result = await sendContactEmail(testFormData);
    console.log('✅ Test email sent successfully!');
    console.log('📧 Admin notification ID:', result.adminMessageId);
    console.log('📧 User confirmation ID:', result.userMessageId);
    console.log('\n✨ All tests passed! Email system is working correctly.');
  } catch (error) {
    console.error('❌ Failed to send test email:', error.message);
    process.exit(1);
  }
}

// Run the test
testEmail();

