const API_URL = 'http://127.0.0.1:8000/api/employees';

// src/api/facesApi.js
export async function fetchFacesFromApi() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('Network error while fetching employees');
    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Error fetching faces:', error);
    throw error;
  }
}


// src/api/leadersApi.js
export async function fetchLeadersFromApi() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Error fetching leaders:', error);
    throw error;
  }
}
