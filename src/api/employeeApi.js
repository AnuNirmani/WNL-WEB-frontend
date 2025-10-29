const API_URL = 'http://127.0.0.1:8000/api';

// Model: Faces API - Fetches faces from database
export async function fetchFacesFromApi(search = '', department = '') {
  try {
    let url = `${API_URL}/faces`;
    const params = new URLSearchParams();
    
    if (search) params.append('search', search);
    if (department) params.append('department', department);
    
    if (params.toString()) {
      url += `?${params.toString()}`;
    }
    
    const response = await fetch(url);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const errorMessage = errorData.error || `HTTP ${response.status}: ${response.statusText}`;
      throw new Error(`Failed to fetch faces: ${errorMessage}`);
    }
    
    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Error fetching faces from database:', error);
    throw error;
  }
}

// Model: Leaders API - Fetches leaders from database
export async function fetchLeadersFromApi() {
  try {
    const response = await fetch(`${API_URL}/leaders`);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const errorMessage = errorData.error || `HTTP ${response.status}: ${response.statusText}`;
      throw new Error(`Failed to fetch leaders: ${errorMessage}`);
    }
    
    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Error fetching leaders from database:', error);
    throw error;
  }
}
