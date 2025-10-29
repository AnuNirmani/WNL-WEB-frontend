// src/controllers/useAwardsController.js
import { useState, useEffect, useCallback } from 'react';
import { fetchAwardsFromApi } from '../api/postsApi';

export default function useAwardsController() {
  const [awards, setAwards] = useState([]);
  const [filteredAwards, setFilteredAwards] = useState([]);
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedTitle, setSelectedTitle] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAwards = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const posts = await fetchAwardsFromApi();

      const awardsData = posts.filter(item => {
        const hasAwards =
          (item.categories && Array.isArray(item.categories) && item.categories.includes('Awards')) ||
          item.category_name === 'Awards';
        const isVisible = item.status && item.status.toLowerCase() === 'visible';
        return hasAwards && isVisible;
      });

      setAwards(awardsData);
      setFilteredAwards(awardsData);
    } catch (err) {
      setError('Failed to load Awards.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAwards();
  }, [fetchAwards]);

  useEffect(() => {
    if (!selectedYear && !selectedTitle) {
      setFilteredAwards(awards);
      return;
    }

    const filtered = awards.filter(award => {
      const matchesYear = !selectedYear || (award.sub_topic && award.sub_topic.includes(selectedYear));
      const matchesTitle = !selectedTitle || (award.title && award.title.toLowerCase().includes(selectedTitle.toLowerCase()));
      return matchesYear && matchesTitle;
    });

    setFilteredAwards(filtered);
  }, [selectedYear, selectedTitle, awards]);

  return {
    filteredAwards,
    selectedYear,
    selectedTitle,
    setSelectedYear,
    setSelectedTitle,
    loading,
    error,
  };
}
