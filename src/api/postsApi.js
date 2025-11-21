// src/api/postsApi.js
const API_URL = 'http://127.0.0.1:8000/api/posts';

// src/api/awardsApi.js
const API_BASE = "http://127.0.0.1:8000/api";


// src/api/overviewApi.js
const API_BASE_URL = 'http://127.0.0.1:8000/api';


export async function fetchAwardsFromApi(page = 1, limit = 12, year = '') {
  try {
    let url = `${API_BASE}/awards?page=${page}&limit=${limit}&category_name=Awards`;
    if (year) url += `&year=${year}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network error');
    return await response.json();
  } catch (error) {
    console.error('Error fetching awards:', error);
    throw error;
  }
}

export async function fetchYearsFromApi() {
  try {
    const response = await fetch(`${API_BASE}/years`);
    if (!response.ok) throw new Error('Network error');
    return await response.json();
  } catch (error) {
    console.error('Error fetching years:', error);
    return [];
  }
}

// src/api/careersApi.js
export async function fetchCareersFromApi() {
  try {
    // Fetch careers from dedicated careers endpoint with category filter
    const response = await fetch(`${API_BASE}/careers?category_name=Careers`);
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const errorMessage = errorData.error || `HTTP ${response.status}: ${response.statusText}`;
      throw new Error(`Failed to fetch careers: ${errorMessage}`);
    }
    const data = await response.json();
    // Handle both array and single object responses
    if (Array.isArray(data)) {
      return data;
    } else if (data && typeof data === 'object') {
      // If single object returned, wrap in array
      return [data];
    }
    return data.value || data.data || [];
  } catch (error) {
    console.error('Error fetching careers:', error);
    throw error;
  }
}

// src/api/pressReleaseApi.js
// src/api/postsApi.js


// Fetch press releases with optional year filter
export async function fetchPressReleasesFromApi(page = 1, limit = 12, year = '') {
  try {
    let url = `${API_BASE}/posts?page=${page}&limit=${limit}&category_name=Press Release`;
    if (year) url += `&year=${year}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network error');
    const data = await response.json();
    // Handle Laravel pagination response format
    return data.value || data.data || (Array.isArray(data) ? data : []);
  } catch (error) {
    console.error('Error fetching press releases:', error);
    throw error;
  }
}


// src/api/awardDetailsApi.js
export async function fetchAwardById(id) {
  if (!id) throw new Error('No award ID provided');

  const API_URL = `http://127.0.0.1:8000/api/posts/${id}`;

  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error(`Network error: ${response.status}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching award:', error);
    throw error;
  }
}

// src/api/pressReleaseDetailsApi.js
export async function fetchPressReleaseDetails(id) {
  const API_URL = `http://127.0.0.1:8000/api/posts/${id}`;

  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('Failed to fetch press release details');
    const data = await response.json();

    let description = data.description || '';

    // If JSON or array-like text, flatten it
    if (typeof description === 'string' && description.startsWith('[')) {
      try {
        description = JSON.parse(description).join(' ');
      } catch {
        // leave as is
      }
    }

    return {
      title: data.title,
      sub_topic: data.sub_topic,
      description,
      image: data.image,
    };
  } catch (error) {
    console.error('Error fetching press release details:', error);
    throw error;
  }
}

//Fetch a single post by ID
export async function fetchPostById(id) {
  if (!id) throw new Error('No post ID provided.');

  try {
    const response = await fetch(`${API_BASE_URL}/posts/${id}`);
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const errorMessage =
        errorData.error || `HTTP ${response.status}: ${response.statusText}`;
      throw new Error(`Failed to fetch post: ${errorMessage}`);
    }

    const data = await response.json();

    // ✅ Fix relative image paths inside the description
    if (data.description) {
      data.description = data.description.replace(
        /src=["'](\/storage[^"']+)["']/g,
        `src="http://127.0.0.1:8000$1"`
      );
    }

    return data;
  } catch (error) {
    console.error('Error fetching post by ID:', error);
    throw error;
  }
}


// API functions for Press Release data
// Normalize image URLs
export const normalizeImages = (list) =>
  list.map((item) => ({
    ...item,
    image: item.image?.startsWith('/storage')
      ? `http://127.0.0.1:8000${item.image}`
      : item.image,
  }));

/**
 * Fetch paginated press releases from the server
 * @param {number} page - Page number
 * @param {number} limit - Items per page
 * @returns {Promise<Array>} - Array of press releases
 */
export const fetchPressReleases = async (page = 1, limit = 6) => {
  const url = `${API_BASE_URL}/press/latest?page=${page}&limit=${limit}`;
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error(`Error ${response.status}`);
  }
  
  const data = await response.json();
  const normalizedData = normalizeImages(Array.isArray(data) ? data : []);
  
  return normalizedData;
};

