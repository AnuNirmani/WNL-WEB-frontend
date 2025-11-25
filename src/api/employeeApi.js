import { authFetch } from './client';

// src/api/facesApi.js
export async function fetchFacesFromApi(page = 1, perPage = 12) {
  try {
    const data = await authFetch(`/employees?page=${page}&per_page=${perPage}`);
    // Handle paginated response or regular array
    if (data.data && Array.isArray(data.data)) {
      return {
        data: data.data,
        current_page: data.current_page || page,
        last_page: data.last_page || 1,
        per_page: data.per_page || perPage,
        total: data.total || data.data.length,
      };
    }
    // If not paginated, return as regular array for backward compatibility
    const employees = Array.isArray(data) ? data : data.value || [];
    return {
      data: employees,
      current_page: 1,
      last_page: 1,
      per_page: employees.length,
      total: employees.length,
    };
  } catch (error) {
    console.error('Error fetching faces:', error);
    throw error;
  }
}


// src/api/leadersApi.js
export async function fetchLeadersFromApi(page = 1, perPage = 12) {
  
  try {
    const data = await authFetch(`/employees?page=${page}&per_page=${perPage}`);
    // Handle paginated response or regular array
    if (data.data && Array.isArray(data.data)) {
      return {
        data: data.data,
        current_page: data.current_page || page,
        last_page: data.last_page || 1,
        per_page: data.per_page || perPage,
        total: data.total || data.data.length,
      };
    }
    // If not paginated, return as regular array for backward compatibility
    const employees = Array.isArray(data) ? data : data.value || [];
    return {
      data: employees,
      current_page: 1,
      last_page: 1,
      per_page: employees.length,
      total: employees.length,
    };
  } catch (error) {
    console.error('Error fetching leaders:', error);
    throw error;
  }
}
