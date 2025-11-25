// src/api/locationsApi.js
import { authFetch } from './client';

export async function fetchLocationsFromApi() {
  try {
    const data = await authFetch('/departments');
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Error fetching locations from database:', error);
    throw error;
  }
}
