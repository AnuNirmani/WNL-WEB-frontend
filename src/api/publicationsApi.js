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
