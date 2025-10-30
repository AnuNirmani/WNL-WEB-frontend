// src/controllers/usePublicationsController.js
<<<<<<< HEAD
import { useState, useEffect, useCallback } from 'react';
=======
import { useState, useEffect, useMemo, useCallback } from 'react';
>>>>>>> 3bf38029520358042b1159c55c28b9333ea714b5
import { fetchPublicationsFromApi } from '../api/publicationsApi';

export default function usePublicationsController() {
  const [publications, setPublications] = useState([]);
<<<<<<< HEAD
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
=======
  const [activeFilter, setActiveFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadPublications = useCallback(async () => {
    try {
      setLoading(true);
      const data = await fetchPublicationsFromApi();
      setPublications(data);
    } catch (err) {
      setError(err.message);
>>>>>>> 3bf38029520358042b1159c55c28b9333ea714b5
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
<<<<<<< HEAD
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

=======
    loadPublications();
  }, [loadPublications]);

  // Handle filter button clicks
  const handleFilterClick = (filter) => setActiveFilter(filter);

  // Compute filtered results
  const filteredPublications = useMemo(() => {
    if (activeFilter === 'all') return publications;
    return publications.filter((pub) => pub.category === activeFilter);
  }, [activeFilter, publications]);

  return {
    publications,
    filteredPublications,
    activeFilter,
    handleFilterClick,
    loading,
    error,
  };
}
>>>>>>> 3bf38029520358042b1159c55c28b9333ea714b5
