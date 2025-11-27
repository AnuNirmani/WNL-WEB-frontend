# Final Setup Instructions - Contact Form Saving to wnl_db.emails

## Current Status
✅ Database table `emails` exists in `wnl_db`  
✅ PHP file `public/contact_save.php` is created  
✅ DB config file `public/db_config.php` is created  
✅ Form is updated to use fetch with FormData  

## To Make It Work:

### Step 1: Verify XAMPP is Running
1. Open XAMPP Control Panel
2. **Apache** must be GREEN (running)
3. **MySQL** must be GREEN (running)

### Step 2: Test PHP Endpoint Directly
Open in browser:
```
http://localhost/WNL-Web4/WNL-WEB-frontend/public/test_save.html
```

Fill and submit the form. You should see:
- **Success message** if it works
- **Error message** if something is wrong

### Step 3: Check Browser Console
1. Open your React app
2. Open DevTools (F12)
3. Go to Console tab
4. Submit the contact form
5. Look for:
   - Any error messages
   - The fetch request being made
   - The response received

### Step 4: Check Network Tab
1. In DevTools, go to Network tab
2. Submit the form
3. Find the request to `contact_save.php`
4. Click on it to see:
   - Request URL
   - Status code
   - Response

### Step 5: Verify Database
After submitting, check:
```sql
SELECT * FROM emails ORDER BY id DESC LIMIT 5;
```

## If Still Not Working:

**Check these:**
1. Is Apache running? (XAMPP Control Panel)
2. Can you access `http://localhost/WNL-Web4/WNL-WEB-frontend/public/test_save.html`?
3. What error appears in browser console?
4. What status code appears in Network tab?

## Files Created:
- `public/contact_save.php` - Saves to database
- `public/db_config.php` - DB credentials
- `public/test_save.html` - Test page to verify PHP works


