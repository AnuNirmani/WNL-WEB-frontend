<<<<<<< HEAD
const API_URL = 'http://127.0.0.1:8000/api';

// Model: Publications API - Fetches publications from database
export async function fetchPublicationsFromApi() {
  try {
    const response = await fetch(`${API_URL}/publications`);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const errorMessage = errorData.error || `HTTP ${response.status}: ${response.statusText}`;
      throw new Error(`Failed to fetch publications: ${errorMessage}`);
    }
    
    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Error fetching publications from database:', error);
    throw error;
  }
}

=======
// src/api/publicationsApi.js
export async function fetchPublicationsFromApi() {
  const API_URL = 'http://127.0.0.1:8000/api/publications';

  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('Failed to fetch publications');
    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Error fetching publications:', error);
    throw error;
  }
}
>>>>>>> 3bf38029520358042b1159c55c28b9333ea714b5
