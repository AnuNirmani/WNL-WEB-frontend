// src/controllers/usePublicationsController.js
import { useState, useEffect, useMemo, useCallback } from 'react';
import { fetchPublicationsFromApi } from '../api/publicationsApi';

export default function usePublicationsController() {
  const [publications, setPublications] = useState([]);
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
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
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
