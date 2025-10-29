// src/controllers/usePressReleaseController.js
import { useState, useEffect, useMemo, useCallback } from 'react';
import { fetchPressReleasesFromApi } from '../api/postsApi';

export default function usePressReleaseController() {
  const [pressReleases, setPressReleases] = useState([]);
  const [selectedYear, setSelectedYear] = useState('');
  const [searchTitle, setSearchTitle] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPressReleases = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const posts = await fetchPressReleasesFromApi();

      const filtered = posts.filter(item => {
        const isPressRelease =
          (item.categories && Array.isArray(item.categories) && item.categories.includes('Press Release')) ||
          item.category_name === 'Press Release';
        const isVisible = item.status && item.status.toLowerCase() === 'visible';
        return isPressRelease && isVisible;
      });

      setPressReleases(filtered);
    } catch (err) {
      console.error('Error fetching press releases:', err);
      setError('Failed to load press releases.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPressReleases();
  }, [fetchPressReleases]);

  // Unique years (from end_date or created_at)
  const years = useMemo(() => {
    return Array.from(
      new Set(
        pressReleases
          .map(item => (item.end_date ? item.end_date.split('-')[0] : ''))
          .filter(Boolean)
      )
    ).sort((a, b) => b - a);
  }, [pressReleases]);

  // Filtered press releases
  const filteredPressReleases = useMemo(() => {
    return pressReleases.filter(release => {
      const releaseYear = release.end_date ? release.end_date.split('-')[0] : '';
      const matchYear = !selectedYear || releaseYear === selectedYear;
      const matchTitle =
        !searchTitle ||
        (release.title && release.title.toLowerCase().includes(searchTitle.toLowerCase()));
      return matchYear && matchTitle;
    });
  }, [pressReleases, selectedYear, searchTitle]);

  return {
    filteredPressReleases,
    years,
    selectedYear,
    setSelectedYear,
    searchTitle,
    setSearchTitle,
    loading,
    error,
  };
}
