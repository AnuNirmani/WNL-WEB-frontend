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

      const posts = await fetchCareersFromApi();

      // filter: only Careers + Visible
      const filtered = posts.filter(item => {
        const hasCareer =
          (item.categories && Array.isArray(item.categories) && item.categories.includes('Careers')) ||
          item.category_name === 'Careers';
        const isVisible = item.status && item.status.toLowerCase() === 'visible';
        return hasCareer && isVisible;
      });

      setCareers(filtered);
    } catch (err) {
      setError('Failed to load career listings.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCareers();
  }, [fetchCareers]);

  return { careers, loading, error };
}
