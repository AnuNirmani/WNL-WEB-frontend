// src/controllers/useAwardsController.js
import { useState, useEffect, useCallback } from 'react';
import { fetchAwardsFromApi } from '../api/postsApi';

export default function useAwardsController() {
  const [awards, setAwards] = useState([]);
  const [filteredAwards, setFilteredAwards] = useState([]);
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAwards = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const posts = await fetchAwardsFromApi();

      // filter visible awards
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
    if (!selectedYear && !selectedDepartment) {
      setFilteredAwards(awards);
      return;
    }

    const filtered = awards.filter(award => {
      const matchesYear = !selectedYear || (award.sub_topic && award.sub_topic.includes(selectedYear));
      const matchesDept = !selectedDepartment ||
        (award.description && award.description.toLowerCase().includes(selectedDepartment.toLowerCase()));
      return matchesYear && matchesDept;
    });

    setFilteredAwards(filtered);
  }, [selectedYear, selectedDepartment, awards]);

  return {
    filteredAwards,
    selectedYear,
    selectedDepartment,
    setSelectedYear,
    setSelectedDepartment,
    loading,
    error,
  };
}
