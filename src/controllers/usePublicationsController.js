// src/controllers/usePublicationsController.js
import { useState, useEffect, useCallback } from 'react';
import { fetchPublicationsFromApi } from '../api/publicationsApi';

export default function usePublicationsController() {
  const [publications, setPublications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPublications = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      // Model layer fetches publications from database
      const publicationsData = await fetchPublicationsFromApi();
      setPublications(publicationsData);
    } catch (err) {
      console.error('Error fetching publications from database:', err);
      setError(err.message || 'Error loading publications.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPublications();
  }, [fetchPublications]);

  // Get unique categories from publications
  const categories = Array.from(
    new Set(publications.map(pub => pub.category).filter(Boolean))
  );

  return { 
    publications, 
    loading, 
    error, 
    categories,
    refetch: fetchPublications 
  };
}

