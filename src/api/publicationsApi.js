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
    // Handle both array format and object with value property
    if (Array.isArray(data)) {
      return data;
    } else if (data && Array.isArray(data.value)) {
      return data.value;
    }
    return [];
  } catch (error) {
    console.error('Error fetching publications from database:', error);
    throw error;
  }
}
