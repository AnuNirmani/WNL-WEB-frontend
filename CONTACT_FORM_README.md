# 📧 Contact Form with SMTP Email - Complete Implementation

## ✨ What's Been Implemented

### 1. Backend Email Server (Node.js + Express)
- **Location**: `server/` directory
- **Files**:
  - `server.js` - Express server handling API requests
  - `contactEmailHandler.js` - SMTP email logic with Nodemailer

### 2. Frontend Contact Form (React)
- **Location**: `src/More/ContactUs.jsx`
- **Features**:
  - Form validation
  - Loading states
  - Error handling
  - Beautiful "Thank You" modal with animations

### 3. Email Functionality
- ✅ **Admin Notification**: Email sent to `vinujak777@gmail.com` with form details
- ✅ **User Confirmation**: Auto-reply email sent to user with thank you message
- ✅ **Professional HTML Templates**: Branded email designs
- ✅ **SMTP Configuration**: Oracle Cloud Email Service

## 🎯 Features

### Thank You Modal
When the user submits the form successfully:
1. ✅ Animated success icon appears
2. ✅ "Thank You for Contacting Us!" message
3. ✅ Confirmation that team will respond within 1-2 business days
4. ✅ Shows the email address where confirmation was sent
5. ✅ Smooth animations and professional design

### Email Templates

#### Admin Email Includes:
- User's full name
- User's email address
- Subject line
- Complete message
- Timestamp (Sri Lanka time)
- Professional HTML formatting

#### User Confirmation Email Includes:
- Personalized greeting with user's name
- Copy of their submitted message
- Company contact information
- Professional branding
- "Thank you" message

## 🚀 How to Use

### Quick Start

```bash
# Start both frontend and backend
npm run dev:all
```

This runs:
- Frontend: http://localhost:5174
- Backend: http://localhost:3001

### Alternative: Run Separately

**Terminal 1 - Frontend:**
```bash
npm run dev
```

**Terminal 2 - Backend:**
```bash
npm run server
```

### Test the Form

1. Navigate to: `http://localhost:5174/contact`
2. Fill out the form:
   - Name: Your name
   - Email: Your email
   - Subject: Test subject
   - Message: Your message
3. Click "Send Message"
4. See the thank you modal appear
5. Check emails:
   - Admin email at `vinujak777@gmail.com`
   - User confirmation at the email you entered

## 📋 SMTP Configuration

### Current Settings (Oracle Cloud Email)

```javascript
Host: smtp.email.ap-singapore-1.oci.oraclecloud.com
Port: 587
Security: TLS
```

### Credentials
- Username: `ocid1.user.oc1..aaaaaaaab5apok4girjw5emsvk6kn6mnqonokmb2xfgg2xzpfh4wvbvprr4a@ocid1.tenancy.oc1..aaaaaaaatfckrwydrgbytnvccyc44p3jkuk3du2qlbkfwappocrssg224bva.mi.com`
- Password: `wv35Hxqm([EJ}W}+CrGi`

**⚠️ Security Note**: In production, move these to environment variables!

## 🎨 Customization Guide

### Change Admin Email

Edit `server/contactEmailHandler.js`:

```javascript
const adminMailOptions = {
  to: 'your-email@example.com', // Line 62
  // ...
};
```

### Change From Email

Edit `server/contactEmailHandler.js`:

```javascript
from: '"Your Company Name" <noreply@yourdomain.com>', // Lines 60 & 92
```

### Modify Email Templates

Both admin and user email templates are in `server/contactEmailHandler.js`:
- Admin template: Lines 64-114
- User template: Lines 96-164

### Customize Modal

Edit `src/More/ContactUs.css`:
- Modal styles: Lines 393-520
- Colors, animations, and layout

### Change Modal Message

Edit `src/More/ContactUs.jsx`:
- Modal content: Lines 97-124

## 📁 File Structure

```
WNL-WEB-frontend/
├── server/
│   ├── server.js                    # Express API server
│   ├── contactEmailHandler.js       # SMTP email logic
│   └── config.example.js            # Configuration template
│
├── src/
│   └── More/
│       ├── ContactUs.jsx             # Contact form component
│       └── ContactUs.css             # Styles + modal
│
├── test-email.js                     # Test script
├── CONTACT_FORM_SETUP.md            # Detailed setup guide
├── QUICK_START_CONTACT_FORM.md      # Quick start guide
└── package.json                      # Dependencies
```

## 🧪 Testing

### Test SMTP Connection

```bash
node test-email.js
```

This will:
1. Verify SMTP connection
2. Send a test email
3. Show success/failure messages

### Manual Testing

1. Start servers: `npm run dev:all`
2. Open: `http://localhost:5174/contact`
3. Submit form with valid data
4. Check console logs for:
   - ✅ `SMTP Server is ready to send emails`
   - ✅ `Admin notification sent: <id>`
   - ✅ `User confirmation sent: <id>`

## 🔧 Troubleshooting

### Issue: Backend won't start

**Error**: `Port 3001 already in use`

**Solution**:
```bash
# Windows
netstat -ano | findstr :3001
taskkill /PID <process-id> /F

# Then restart
npm run server
```

### Issue: Emails not sending

**Check**:
1. Server console for errors
2. SMTP credentials are correct
3. Port 587 is not blocked
4. Internet connection is active

### Issue: Modal not appearing

**Check**:
1. Browser console (F12) for errors
2. Form submission was successful (200 status)
3. CSS file is loaded properly

### Issue: CORS errors

**Solution**:
- Verify backend is running on port 3001
- Check `server/server.js` CORS configuration
- Ensure frontend URL is in allowed origins

## 📦 Dependencies

```json
{
  "nodemailer": "^7.0.11",      // SMTP email sending
  "express": "^5.1.0",          // Backend server
  "cors": "^2.8.5",             // Cross-origin requests
  "concurrently": "^9.1.2"      // Run multiple servers
}
```

## 🔒 Security Recommendations

### For Production:

1. **Environment Variables**
   ```javascript
   // Use .env file
   SMTP_USER=your-username
   SMTP_PASS=your-password
   ```

2. **Rate Limiting**
   ```bash
   npm install express-rate-limit
   ```

3. **Input Sanitization**
   - Already implemented in form validation
   - Server-side validation active

4. **HTTPS**
   - Use HTTPS in production
   - Update CORS origins

5. **Email Validation**
   - Regex validation active
   - Required field checks

## 📊 API Documentation

### Endpoint: POST `/api/contact`

**URL**: `http://localhost:3001/api/contact`

**Headers**:
```
Content-Type: application/json
```

**Request Body**:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Inquiry about services",
  "message": "I would like to know more about..."
}
```

**Success Response (200)**:
```json
{
  "success": true,
  "message": "Thank you for contacting us! Our team will reach out to you soon.",
  "data": {
    "adminMessageId": "<unique-id>",
    "userMessageId": "<unique-id>"
  }
}
```

**Error Response (400/500)**:
```json
{
  "success": false,
  "error": "All fields are required",
  "details": "Additional error information"
}
```

## 🎓 How It Works

### Flow Diagram

```
User fills form
    ↓
Clicks "Send Message"
    ↓
Frontend validates input
    ↓
POST request to backend (/api/contact)
    ↓
Backend validates data
    ↓
Nodemailer sends 2 emails:
    ├─→ Admin notification
    └─→ User confirmation
    ↓
Success response to frontend
    ↓
Thank You modal appears
    ↓
Form resets
```

## 📞 Support

### Documentation Files
- `CONTACT_FORM_SETUP.md` - Detailed setup guide
- `QUICK_START_CONTACT_FORM.md` - Quick start guide
- `CONTACT_FORM_README.md` - This file

### Need Help?
1. Check server console for errors
2. Check browser console (F12)
3. Review the troubleshooting section
4. Test SMTP with `test-email.js`

## 🎉 Success Indicators

When everything is working correctly, you'll see:

**Backend Console**:
```
🚀 Contact form server running on http://localhost:3001
📧 SMTP email service is active
✅ Ready to handle contact form submissions
✅ SMTP Server is ready to send emails
```

**On Form Submission**:
```
✅ Admin notification sent: <message-id>
✅ User confirmation sent: <message-id>
```

**Frontend**:
- ✅ Beautiful modal with success message
- ✅ Form clears automatically
- ✅ No console errors

**Emails**:
- ✅ Admin receives notification
- ✅ User receives confirmation

---

## 📝 Notes

- The form uses React hooks for state management
- Email templates are responsive and mobile-friendly
- Modal has smooth animations using CSS keyframes
- Server automatically verifies SMTP connection on startup
- All email addresses are validated before sending

## 🚀 Ready to Go!

Your contact form with SMTP email is fully set up and ready to use!

**Quick Start**: `npm run dev:all`

---

**Version**: 1.0.0  
**Last Updated**: December 2025  
**Created by**: WNL Development Team

