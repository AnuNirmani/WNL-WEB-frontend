# Contact Form Troubleshooting Guide

## Current Setup
- **PHP Endpoint**: `http://localhost/WNL-Web4/WNL-WEB-frontend/public/api/contact_handler.php`
- **Database**: `wnl_db` → `emails` table
- **React App**: Running on `localhost:5174`

## If you see "Failed to fetch" or "Not Found" errors:

### Step 1: Verify XAMPP is Running
1. Open XAMPP Control Panel
2. Make sure **Apache** is running (green)
3. Make sure **MySQL** is running (green)

### Step 2: Test PHP Endpoint Directly
Open in browser:
```
http://localhost/WNL-Web4/WNL-WEB-frontend/public/api/test.php
```
You should see JSON output. If you see "Not Found", the path is wrong.

### Step 3: Test Contact Handler
Open:
```
http://localhost/WNL-Web4/WNL-WEB-frontend/public/test_contact.html
```
Fill and submit the form. Check if it saves to database.

### Step 4: Check Browser Console
1. Open DevTools (F12)
2. Go to Console tab
3. Submit the contact form
4. Look for:
   - CORS errors
   - Network errors
   - The URL being called

### Step 5: Check Network Tab
1. Open DevTools (F12)
2. Go to Network tab
3. Submit the form
4. Find the request to `contact_handler.php`
5. Click on it to see:
   - Request URL
   - Status code
   - Response

### Step 6: Check Log File
After submitting, check:
```
public/api/contact_log.txt
```
This shows what the PHP file received.

### Step 7: Verify Database
```sql
SELECT * FROM emails ORDER BY id DESC LIMIT 5;
```

## Common Issues:

1. **CORS Error**: PHP file has CORS headers, but browser might still block. Solution: Make sure XAMPP Apache is running.

2. **404 Not Found**: The URL path is wrong. Check:
   - Is XAMPP running?
   - Is the path correct? Try: `http://localhost/WNL-Web4/WNL-WEB-frontend/public/api/test.php`

3. **Database Error**: Check:
   - Is MySQL running in XAMPP?
   - Database name: `wnl_db`
   - Table name: `emails`

4. **No Data Saved**: Check `contact_log.txt` to see if PHP received the data.


