// src/controllers/usePressReleaseController.js
import { useState, useEffect, useCallback, useRef } from 'react';
import { fetchPressReleasesFromApi } from '../api/postsApi';

export default function usePressReleaseController() {
  const [pressReleases, setPressReleases] = useState([]);
  const [filteredPressReleases, setFilteredPressReleases] = useState([]);
  const [selectedYear, setSelectedYear] = useState('');
  const [searchTitle, setSearchTitle] = useState('');
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const previousFiltersRef = useRef({ year: '', title: '' });

  const ITEMS_PER_PAGE = 12;

  // 🔹 Fetch press releases (paginated)
  const fetchPressReleases = useCallback(async (pageNum = 1, isLoadMore = false) => {
    try {
      if (isLoadMore) setLoadingMore(true);
      else setLoading(true);

      setError(null);
      const posts = await fetchPressReleasesFromApi(pageNum, ITEMS_PER_PAGE);

      const filtered = posts.filter(item => {
        const isPressRelease =
          (item.categories && Array.isArray(item.categories) && item.categories.includes('Press Release')) ||
          item.category_name === 'Press Release';
        const isVisible = item.status && item.status.toLowerCase() === 'visible';
        return isPressRelease && isVisible;
      });

      if (filtered.length < ITEMS_PER_PAGE) setHasMore(false);

      if (isLoadMore) {
        setPressReleases(prev => [...prev, ...filtered]);
      } else {
        setPressReleases(filtered);
      }
    } catch (err) {
      console.error('Error fetching press releases:', err);
      setError('Failed to load press releases.');
      setHasMore(false);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, []);

  // Initial load
  useEffect(() => {
    fetchPressReleases(1, false);
  }, [fetchPressReleases]);

  // 🔹 Load more when scrolling
  const loadMore = useCallback(() => {
    if (!loadingMore && !loading && hasMore && !selectedYear && !searchTitle) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchPressReleases(nextPage, true);
    }
  }, [loadingMore, loading, hasMore, page, selectedYear, searchTitle, fetchPressReleases]);

  // 🔹 Filtering logic
  useEffect(() => {
    const filtersChanged =
      previousFiltersRef.current.year !== selectedYear ||
      previousFiltersRef.current.title !== searchTitle;

    if (filtersChanged && (selectedYear || searchTitle)) {
      previousFiltersRef.current = { year: selectedYear, title: searchTitle };
      setPage(1);
      setHasMore(false); // disable infinite scroll while filtering
    } else if (!selectedYear && !searchTitle && filtersChanged) {
      // filters cleared
      previousFiltersRef.current = { year: '', title: '' };
      setPage(1);
      setHasMore(true);
      setPressReleases([]);
      fetchPressReleases(1, false);
      return;
    }

    if (!selectedYear && !searchTitle) {
      setFilteredPressReleases(pressReleases);
      return;
    }

    const filtered = pressReleases.filter(release => {
      const releaseYear = release.end_date ? release.end_date.split('-')[0] : '';
      const matchesYear = !selectedYear || releaseYear === selectedYear;
      const matchesTitle =
        !searchTitle ||
        (release.title && release.title.toLowerCase().includes(searchTitle.toLowerCase()));
      return matchesYear && matchesTitle;
    });

    setFilteredPressReleases(filtered);
  }, [selectedYear, searchTitle, pressReleases, fetchPressReleases]);

  return {
    filteredPressReleases,
    selectedYear,
    searchTitle,
    setSelectedYear,
    setSearchTitle,
    loading,
    loadingMore,
    error,
    hasMore,
    loadMore,
  };
}
