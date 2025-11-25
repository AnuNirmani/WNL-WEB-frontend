import { authFetch } from './client';

// Model: Publications API - Fetches publications from database
export async function fetchPublicationsFromApi() {
  try {
    const data = await authFetch('/publications');
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

// Model: Latest Posts API - Fetches latest posts from database
export async function fetchLatestPosts() {
  try {
    const data = await authFetch('/latest-posts');
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Error fetching latest posts:', error);
    throw error;
  }
}
