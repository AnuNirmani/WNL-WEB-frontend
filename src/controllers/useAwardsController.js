import { useState, useEffect, useCallback } from 'react';
import { fetchAwardsFromApi, fetchYearsFromApi } from '../api/postsApi';

export default function useAwardsController() {
  const [awards, setAwards] = useState([]);
  const [filteredAwards, setFilteredAwards] = useState([]);
  const [years, setYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedTitle, setSelectedTitle] = useState('');
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const ITEMS_PER_PAGE = 12;

  // ✅ Fetch unique years
  useEffect(() => {
    const loadYears = async () => {
      try {
        const data = await fetchYearsFromApi();
        setYears(data);
      } catch (err) {
        console.error('Failed to fetch years', err);
      }
    };
    loadYears();
  }, []);

  // ✅ Fetch awards
  const fetchAwards = useCallback(async (pageNum = 1, isLoadMore = false, year = '') => {
    try {
      if (isLoadMore) setLoadingMore(true);
      else setLoading(true);
      setError(null);

      const posts = await fetchAwardsFromApi(pageNum, ITEMS_PER_PAGE, year);

      if (posts.length < ITEMS_PER_PAGE) setHasMore(false);

      if (isLoadMore) setAwards(prev => [...prev, ...posts]);
      else setAwards(posts);

      setFilteredAwards(posts);
    } catch (err) {
      setError('Failed to load Awards.');
      setHasMore(false);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, []);

  // ✅ Initial fetch
  useEffect(() => {
    fetchAwards(1, false, selectedYear);
  }, [fetchAwards, selectedYear]);

  // ✅ Load more for infinite scroll
  const loadMore = useCallback(() => {
    if (!loadingMore && !loading && hasMore && !selectedTitle) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchAwards(nextPage, true, selectedYear);
    }
  }, [loadingMore, loading, hasMore, page, selectedYear, selectedTitle, fetchAwards]);

  // ✅ Title filtering (local)
  useEffect(() => {
    if (!selectedTitle) {
      setFilteredAwards(awards);
    } else {
      setFilteredAwards(
        awards.filter(a => a.title?.toLowerCase().includes(selectedTitle.toLowerCase()))
      );
    }
  }, [selectedTitle, awards]);

  return {
    filteredAwards,
    years,
    selectedYear,
    selectedTitle,
    setSelectedYear,
    setSelectedTitle,
    loading,
    loadingMore,
    error,
    hasMore,
    loadMore,
  };
}
