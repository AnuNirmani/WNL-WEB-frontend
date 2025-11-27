# Contact Form Setup Check

## Steps to Verify:

1. **Make sure XAMPP is running:**
   - Apache should be running
   - MySQL should be running

2. **Test the PHP endpoint directly:**
   - Open browser and go to: `http://localhost/WNL-Web4/WNL-WEB-frontend/public/api/contact_handler.php`
   - You should see a JSON response (even if it's an error, that means PHP is working)

3. **Check the log file:**
   - After submitting the form, check: `public/api/contact_log.txt`
   - This will show what data was received

4. **Check browser console:**
   - Open browser DevTools (F12)
   - Go to Console tab
   - Submit the form
   - Look for messages starting with "==="
   - Check for any red error messages

5. **Check Network tab:**
   - In DevTools, go to Network tab
   - Submit the form
   - Look for a request to `contact_handler.php`
   - Click on it to see the request/response details

6. **Verify database:**
   ```sql
   SELECT * FROM emails ORDER BY id DESC LIMIT 5;
   ```

## If still not working:

1. Check if the URL path is correct for your XAMPP setup
2. Check XAMPP error logs: `C:\xampp1\apache\logs\error.log`
3. Check the contact_log.txt file in public/api/ folder
4. Share the browser console errors


