// src/api/locationsApi.js
const API_URL = 'http://127.0.0.1:8000/api';

export async function fetchLocationsFromApi() {
  try {
    const response = await fetch(`${API_URL}/departments`);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const errorMessage =
        errorData.error || `HTTP ${response.status}: ${response.statusText}`;
      throw new Error(`Failed to fetch locations: ${errorMessage}`);
    }

    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Error fetching locations from database:', error);
    throw error;
  }
}
