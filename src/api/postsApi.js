// src/api/postsApi.js
import { authFetch } from './client';

export async function fetchAwardsFromApi(page = 1, limit = 12, year = '') {
  try {
    let path = `/awards?page=${page}&limit=${limit}&category_name=Awards`;
    if (year) path += `&year=${year}`;
    return await authFetch(path);
  } catch (error) {
    console.error('Error fetching awards:', error);
    throw error;
  }
}

export async function fetchYearsFromApi() {
  try {
    return await authFetch('/years');
  } catch (error) {
    console.error('Error fetching years:', error);
    return [];
  }
}

// src/api/careersApi.js
export async function fetchCareersFromApi() {
  try {
    // Fetch careers from dedicated careers endpoint with category filter
    const data = await authFetch('/careers?category_name=Careers');
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
    let path = `/posts?page=${page}&limit=${limit}&category_name=Press Release`;
    if (year) path += `&year=${year}`;
    const data = await authFetch(path);
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

  try {
    const data = await authFetch(`/posts/${id}`);
    return data;
  } catch (error) {
    console.error('Error fetching award:', error);
    throw error;
  }
}

// src/api/pressReleaseDetailsApi.js
export async function fetchPressReleaseDetails(id) {
  try {
    const data = await authFetch(`/posts/${id}`);

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
    const data = await authFetch(`/posts/${id}`);

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
  const data = await authFetch(`/press/latest?page=${page}&limit=${limit}`);
  const normalizedData = normalizeImages(Array.isArray(data) ? data : []);
  
  return normalizedData;
};

