// server/contactEmailHandler.js
// Backend API handler for contact form with SMTP email functionality

import nodemailer from 'nodemailer';
import { body, validationResult } from 'express-validator';
import validator from 'validator';

// SMTP Configuration (Oracle Cloud Email)
const SMTP_CONFIG = {
  host: 'smtp.email.ap-singapore-1.oci.oraclecloud.com',
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: 'ocid1.user.oc1..aaaaaaaab5apok4girjw5emsvk6kn6mnqonokmb2xfgg2xzpfh4wvbvprr4a@ocid1.tenancy.oc1..aaaaaaaatfckrwydrgbytnvccyc44p3jkuk3du2qlbkfwappocrssg224bva.mi.com',
    pass: 'wv35Hxqm([EJ}W}+CrGi'
  },
  tls: {
    rejectUnauthorized: false // For development; set to true in production
  }
};

// Create reusable transporter object using SMTP transport
const transporter = nodemailer.createTransport(SMTP_CONFIG);

/**
 * Verify SMTP connection configuration
 */
export async function verifyConnection() {
  try {
    await transporter.verify();
    console.log('✅ SMTP Server is ready to send emails');
    return true;
  } catch (error) {
    console.error('❌ SMTP Server connection error:', error);
    return false;
  }
}

/**
 * Send contact form email
 * @param {Object} formData - Contact form data
 * @returns {Promise<Object>} - Result of email sending
 */
export async function sendContactEmail(formData) {
  const { name, email, subject, message } = formData;

  // Email to admin (you receive the contact form submission)
  const adminMailOptions = {
    from: '"WNL Contact Form" <noreply@dailymirror.lk>',
    to: 'vinujak777@gmail.com', // Admin email
    subject: `Contact Form: ${subject}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #2c3e50; color: white; padding: 20px; text-align: center; }
          .content { background-color: #f9f9f9; padding: 20px; border: 1px solid #ddd; }
          .field { margin-bottom: 15px; }
          .label { font-weight: bold; color: #2c3e50; }
          .value { margin-top: 5px; padding: 10px; background-color: white; border-left: 3px solid #3498db; }
          .footer { text-align: center; margin-top: 20px; color: #777; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>New Contact Form Submission</h2>
            <p>Wijeya Newspapers Limited</p>
          </div>
          <div class="content">
            <div class="field">
              <div class="label">From:</div>
              <div class="value">${name}</div>
            </div>
            <div class="field">
              <div class="label">Email:</div>
              <div class="value"><a href="mailto:${email}">${email}</a></div>
            </div>
            <div class="field">
              <div class="label">Subject:</div>
              <div class="value">${subject}</div>
            </div>
            <div class="field">
              <div class="label">Message:</div>
              <div class="value">${message.replace(/\n/g, '<br>')}</div>
            </div>
          </div>
          <div class="footer">
            <p>This email was sent from the WNL website contact form</p>
            <p>Received on: ${new Date().toLocaleString('en-US', { timeZone: 'Asia/Colombo' })}</p>
          </div>
        </div>
      </body>
      </html>
    `,
    text: `
      New Contact Form Submission
      
      From: ${name}
      Email: ${email}
      Subject: ${subject}
      
      Message:
      ${message}
      
      Received on: ${new Date().toLocaleString()}
    `
  };

  // Auto-reply email to user (confirmation)
  const userMailOptions = {
    from: '"Wijeya Newspapers Limited" <noreply@dailymirror.lk>',
    to: email,
    subject: 'Thank you for contacting Wijeya Newspapers Limited',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #2c3e50; color: white; padding: 30px; text-align: center; }
          .content { background-color: #f9f9f9; padding: 30px; border: 1px solid #ddd; }
          .message { background-color: white; padding: 20px; border-left: 4px solid #3498db; margin: 20px 0; }
          .footer { text-align: center; margin-top: 20px; padding: 20px; background-color: #ecf0f1; }
          .contact-info { margin-top: 20px; }
          .contact-info p { margin: 5px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Thank You for Contacting Us!</h1>
            <p>Wijeya Newspapers Limited</p>
          </div>
          <div class="content">
            <p>Dear ${name},</p>
            <p>Thank you for reaching out to Wijeya Newspapers Limited. We have received your message and our team will review it shortly.</p>
            
            <div class="message">
              <h3>Your Message:</h3>
              <p><strong>Subject:</strong> ${subject}</p>
              <p><strong>Message:</strong></p>
              <p>${message.replace(/\n/g, '<br>')}</p>
            </div>
            
            <p>One of our team members will get back to you as soon as possible, typically within 1-2 business days.</p>
            
            <div class="contact-info">
              <h4>Contact Information:</h4>
              <p><strong>Address:</strong> No. 8, Hunupitiya Cross Road, Colombo 02, Sri Lanka</p>
              <p><strong>Phone:</strong> +94 11 247 9479</p>
              <p><strong>Email:</strong> wnlgen@wijeya.lk</p>
            </div>
          </div>
          <div class="footer">
            <p><strong>Wijeya Newspapers Limited</strong></p>
            <p>Sri Lanka's Premier Media Organization</p>
            <p style="font-size: 12px; color: #777; margin-top: 10px;">
              This is an automated message. Please do not reply to this email.
            </p>
          </div>
        </div>
      </body>
      </html>
    `,
    text: `
      Dear ${name},
      
      Thank you for contacting Wijeya Newspapers Limited!
      
      We have received your message:
      Subject: ${subject}
      Message: ${message}
      
      Our team will review your message and get back to you as soon as possible, typically within 1-2 business days.
      
      Contact Information:
      Address: No. 8, Hunupitiya Cross Road, Colombo 02, Sri Lanka
      Phone: +94 11 247 9479
      Email: wnlgen@wijeya.lk
      
      Best regards,
      Wijeya Newspapers Limited
      Sri Lanka's Premier Media Organization
    `
  };

  try {
    // Send email to admin
    const adminInfo = await transporter.sendMail(adminMailOptions);
    console.log('✅ Admin notification sent:', adminInfo.messageId);

    // Send auto-reply to user
    const userInfo = await transporter.sendMail(userMailOptions);
    console.log('✅ User confirmation sent:', userInfo.messageId);

    return {
      success: true,
      message: 'Email sent successfully',
      adminMessageId: adminInfo.messageId,
      userMessageId: userInfo.messageId
    };
  } catch (error) {
    console.error('❌ Error sending email:', error);
    throw error;
  }
}

/**
 * Send advertise form email
 * @param {Object} formData - Advertise form data
 * @returns {Promise<Object>} - Result of email sending
 */
export async function sendAdvertiseEmail(formData) {
  const { name, email, subject, message } = formData;

  // Email to admin (you receive the advertise form submission)
  const adminMailOptions = {
    from: '"WNL Advertise Form" <noreply@dailymirror.lk>',
    to: 'vinujak777@gmail.com', // Admin email
    subject: `[ADVERTISE WITH US FORM] ${subject}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #e67e22; color: white; padding: 20px; text-align: center; }
          .content { background-color: #f9f9f9; padding: 20px; border: 1px solid #ddd; }
          .field { margin-bottom: 15px; }
          .label { font-weight: bold; color: #e67e22; }
          .value { margin-top: 5px; padding: 10px; background-color: white; border-left: 3px solid #e67e22; }
          .footer { text-align: center; margin-top: 20px; color: #777; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>New Advertise With Us Form Submission</h2>
            <p>Wijeya Newspapers Limited</p>
          </div>
          <div class="content">
            <div class="field">
              <div class="label">From:</div>
              <div class="value">${name}</div>
            </div>
            <div class="field">
              <div class="label">Email:</div>
              <div class="value"><a href="mailto:${email}">${email}</a></div>
            </div>
            <div class="field">
              <div class="label">Subject:</div>
              <div class="value">${subject}</div>
            </div>
            <div class="field">
              <div class="label">Message:</div>
              <div class="value">${message.replace(/\n/g, '<br>')}</div>
            </div>
          </div>
          <div class="footer">
            <p>This email was sent from the WNL website advertise with us form</p>
            <p>Form Type: Advertise With Us Form</p>
            <p>Received on: ${new Date().toLocaleString('en-US', { timeZone: 'Asia/Colombo' })}</p>
          </div>
        </div>
      </body>
      </html>
    `,
    text: `
      New Advertise With Us Form Submission
      
      From: ${name}
      Email: ${email}
      Subject: ${subject}
      
      Message:
      ${message}
      
      Form Type: Advertise With Us Form
      Received on: ${new Date().toLocaleString()}
    `
  };

  // Auto-reply email to user (confirmation)
  const userMailOptions = {
    from: '"Wijeya Newspapers Limited" <noreply@dailymirror.lk>',
    to: email,
    subject: 'Thank you for your advertising inquiry - Wijeya Newspapers Limited',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #e67e22; color: white; padding: 30px; text-align: center; }
          .content { background-color: #f9f9f9; padding: 30px; border: 1px solid #ddd; }
          .message { background-color: white; padding: 20px; border-left: 4px solid #e67e22; margin: 20px 0; }
          .footer { text-align: center; margin-top: 20px; padding: 20px; background-color: #ecf0f1; }
          .contact-info { margin-top: 20px; }
          .contact-info p { margin: 5px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Thank You for Your Advertising Inquiry!</h1>
            <p>Wijeya Newspapers Limited</p>
          </div>
          <div class="content">
            <p>Dear ${name},</p>
            <p>Thank you for your interest in advertising with Wijeya Newspapers Limited. We have received your inquiry and our advertising team will review it shortly.</p>
            
            <div class="message">
              <h3>Your Message:</h3>
              <p><strong>Subject:</strong> ${subject}</p>
              <p><strong>Message:</strong></p>
              <p>${message.replace(/\n/g, '<br>')}</p>
            </div>
            
            <p>Our advertising team will get back to you as soon as possible with information about our advertising packages, rates, and opportunities, typically within 1-2 business days.</p>
            
            <div class="contact-info">
              <h4>Contact Information:</h4>
              <p><strong>Address:</strong> No. 8, Hunupitiya Cross Road, Colombo 02, Sri Lanka</p>
              <p><strong>Phone:</strong> +94 11 247 9479</p>
              <p><strong>Email:</strong> wnlgen@wijeya.lk</p>
            </div>
          </div>
          <div class="footer">
            <p><strong>Wijeya Newspapers Limited</strong></p>
            <p>Sri Lanka's Premier Media Organization</p>
            <p style="font-size: 12px; color: #777; margin-top: 10px;">
              This is an automated message. Please do not reply to this email.
            </p>
          </div>
        </div>
      </body>
      </html>
    `,
    text: `
      Dear ${name},
      
      Thank you for your interest in advertising with Wijeya Newspapers Limited!
      
      We have received your inquiry:
      Subject: ${subject}
      Message: ${message}
      
      Our advertising team will review your inquiry and get back to you as soon as possible with information about our advertising packages, rates, and opportunities, typically within 1-2 business days.
      
      Contact Information:
      Address: No. 8, Hunupitiya Cross Road, Colombo 02, Sri Lanka
      Phone: +94 11 247 9479
      Email: wnlgen@wijeya.lk
      
      Best regards,
      Wijeya Newspapers Limited
      Sri Lanka's Premier Media Organization
    `
  };

  try {
    // Send email to admin
    const adminInfo = await transporter.sendMail(adminMailOptions);
    console.log('✅ Admin notification sent (Advertise):', adminInfo.messageId);

    // Send auto-reply to user
    const userInfo = await transporter.sendMail(userMailOptions);
    console.log('✅ User confirmation sent (Advertise):', userInfo.messageId);

    return {
      success: true,
      message: 'Email sent successfully',
      adminMessageId: adminInfo.messageId,
      userMessageId: userInfo.messageId
    };
  } catch (error) {
    console.error('❌ Error sending email:', error);
    throw error;
  }
}

/**
 * Handle contact form submission
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 */
export const contactValidation = [
  body('name').trim().notEmpty().withMessage('Name is required').escape(),
  body('email').trim().notEmpty().withMessage('Email is required').isEmail().withMessage('Invalid email format').normalizeEmail(),
  body('subject').trim().notEmpty().withMessage('Subject is required').escape(),
  body('message').trim().notEmpty().withMessage('Message is required').escape()
];

export async function handleContactSubmission(req, res) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }
    let { name, email, subject, message } = req.body;
    // Additional sanitization
    name = validator.escape(name);
    subject = validator.escape(subject);
    message = validator.escape(message);

    const result = await sendContactEmail({ name, email, subject, message });
    return res.status(200).json({
      success: true,
      message: 'Thank you for contacting us! Our team will reach out to you soon.',
      data: result
    });
  } catch (error) {
    console.error('Error handling contact submission:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to send email. Please try again later.'
    });
  }
}

/**
 * Handle advertise form submission
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 */
export const advertiseValidation = [
  body('name').trim().notEmpty().withMessage('Name is required').escape(),
  body('email').trim().notEmpty().withMessage('Email is required').isEmail().withMessage('Invalid email format').normalizeEmail(),
  body('subject').trim().notEmpty().withMessage('Subject is required').escape(),
  body('message').trim().notEmpty().withMessage('Message is required').escape()
];

export async function handleAdvertiseSubmission(req, res) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }
    let { name, email, subject, message } = req.body;
    // Additional sanitization
    name = validator.escape(name);
    subject = validator.escape(subject);
    message = validator.escape(message);

    const result = await sendAdvertiseEmail({ name, email, subject, message });
    return res.status(200).json({
      success: true,
      message: 'Thank you for your advertising inquiry! Our team will reach out to you soon.',
      data: result
    });
  } catch (error) {
    console.error('Error handling advertise submission:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to send email. Please try again later.'
    });
  }
}

// Verify connection on module load
verifyConnection();

