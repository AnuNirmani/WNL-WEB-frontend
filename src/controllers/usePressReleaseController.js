import { useState, useEffect, useCallback } from 'react';
import { fetchPressReleasesFromApi, fetchYearsFromApi } from '../api/postsApi';

export default function usePressReleaseController() {
  const [pressReleases, setPressReleases] = useState([]);
  const [filteredPressReleases, setFilteredPressReleases] = useState([]);
  const [years, setYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState('');
  const [searchTitle, setSearchTitle] = useState('');
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const ITEMS_PER_PAGE = 12;

  // ✅ Fetch all available years from backend
  useEffect(() => {
    const loadYears = async () => {
      try {
        const data = await fetchYearsFromApi();
        setYears(data || []);
      } catch (err) {
        console.error('Error loading years:', err);
      }
    };
    loadYears();
  }, []);

  // ✅ Fetch press releases
  const fetchPressReleases = useCallback(async (pageNum = 1, yearFilter = '', isLoadMore = false) => {
    try {
      if (isLoadMore) setLoadingMore(true);
      else setLoading(true);
      setError(null);

      const posts = await fetchPressReleasesFromApi(pageNum, ITEMS_PER_PAGE, yearFilter);

      // Filter only visible press releases (API already filters by category)
      // Status can be 1 (visible) or "visible" string
      const filtered = posts.filter(item => {
        if (typeof item.status === 'number') return item.status === 1;
        if (typeof item.status === 'string') return item.status.toLowerCase() === 'visible';
        return false;
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

  // ✅ Initial load
  useEffect(() => {
    fetchPressReleases(1, '');
  }, [fetchPressReleases]);

  // ✅ Refetch when year changes
  useEffect(() => {
    // When the year filter changes, reset pagination and reload
    setPage(1);
    setHasMore(true);
    if (selectedYear) {
      fetchPressReleases(1, selectedYear);
    } else {
      fetchPressReleases(1, '');
    }
  }, [selectedYear, fetchPressReleases]);

  // ✅ Filter by title (frontend)
  useEffect(() => {
    if (searchTitle) {
      setFilteredPressReleases(
        pressReleases.filter(release =>
          release.title?.toLowerCase().includes(searchTitle.toLowerCase())
        )
      );
    } else {
      setFilteredPressReleases(pressReleases);
    }
  }, [searchTitle, pressReleases]);

  // ✅ Load more for infinite scroll
  const loadMore = useCallback(() => {
    if (loading || loadingMore || !hasMore) return;
    const nextPage = page + 1;
    setPage(nextPage);
    fetchPressReleases(nextPage, selectedYear, true);
  }, [loading, loadingMore, hasMore, page, fetchPressReleases, selectedYear]);

  return {
    filteredPressReleases,
    years,
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
