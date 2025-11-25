# Quick Fix for "Failed to fetch" Error

## The Problem
The React app (localhost:5174) cannot reach the PHP endpoint (localhost:80). This is usually because:

1. **XAMPP Apache is not running**
2. **The URL path is incorrect**
3. **CORS is blocking (even with headers)**

## Solution Steps

### Step 1: Verify XAMPP is Running
1. Open **XAMPP Control Panel**
2. **Apache** must be **GREEN** (running)
3. **MySQL** must be **GREEN** (running)
4. If not running, click **Start** for both

### Step 2: Test PHP Endpoint Directly
Open this URL in your browser:
```
http://localhost/WNL-Web4/WNL-WEB-frontend/public/api/simple_contact.php
```

**Expected Result:**
- If you see JSON like `{"success":false,"message":"All fields required"}` → PHP is working! ✅
- If you see "Not Found" → The path is wrong or Apache isn't running ❌

### Step 3: If Path is Wrong
If you see "Not Found", try these URLs to find the correct path:
- `http://localhost/WNL-Web4/WNL-WEB-frontend/public/api/test.php`
- `http://localhost/api/simple_contact.php`
- Check your XAMPP htdocs folder structure

### Step 4: Update API URL if Needed
If the path is different, update `src/api/contactApi.js` line 8-11 with the correct URL.

### Step 5: Test the Form Again
After confirming PHP works:
1. Refresh your React app
2. Fill out the contact form
3. Submit
4. Check browser console (F12) for detailed logs

## Alternative: Use Test Page
If React form still doesn't work, use the standalone test page:
```
http://localhost/WNL-Web4/WNL-WEB-frontend/public/test_contact.html
```
This will help isolate if it's a React/CORS issue or a PHP issue.

## Still Not Working?
Check:
1. Browser console (F12) - What exact error?
2. Network tab (F12 → Network) - Is the request being made?
3. XAMPP error logs: `C:\xampp1\apache\logs\error.log`


