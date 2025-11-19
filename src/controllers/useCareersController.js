// src/controllers/useCareersController.js
import { useState, useEffect, useCallback } from 'react';
import { fetchCareersFromApi } from '../api/postsApi';

export default function useCareersController() {
  const [careers, setCareers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCareers = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const careers = await fetchCareersFromApi();

      // Filter only visible careers (status = 1 means visible/active)
      const filtered = careers.filter(item => 
        item.status === 1 || item.status === '1'
      );

      setCareers(filtered);
    } catch (err) {
      setError('Failed to load career listings.');
      console.error('Error in fetchCareers:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCareers();
  }, [fetchCareers]);

  return { careers, loading, error };
}
