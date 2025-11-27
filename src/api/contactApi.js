// src/api/contactApi.js
// Configure the contact API endpoint.
// By default this hits the Laravel backend route `/api/contact`,
// which is proxied in `vite.config.js` to http://127.0.0.1:8000.
// You can override it with VITE_CONTACT_API_URL in your .env file.
const CONTACT_API_URL =
  import.meta.env.VITE_CONTACT_API_URL || '/api/contact';

/**
 * Submit contact form data to the backend API
 * @param {Object} formData - Contact form data containing name, email, subject, and message
 * @returns {Promise<Object>} - Response from the API
 */
export async function submitContactForm(formData) {
  try {
    const response = await fetch(CONTACT_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const errorMessage =
        errorData.error ||
        errorData.message ||
        `HTTP ${response.status}: ${response.statusText}`;
      throw new Error(`Failed to submit contact form: ${errorMessage}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

