// src/controllers/useAwardsController.js
import { useState, useEffect, useCallback, useRef } from 'react';
import { fetchAwardsFromApi } from '../api/postsApi';

export default function useAwardsController() {
  const [awards, setAwards] = useState([]);
  const [filteredAwards, setFilteredAwards] = useState([]);
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedTitle, setSelectedTitle] = useState('');
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const previousFiltersRef = useRef({ year: '', title: '' });

  const ITEMS_PER_PAGE = 12;

  const fetchAwards = useCallback(async (pageNum = 1, isLoadMore = false) => {
    try {
      if (isLoadMore) {
        setLoadingMore(true);
      } else {
        setLoading(true);
      }
      setError(null);

      const posts = await fetchAwardsFromApi(pageNum, ITEMS_PER_PAGE);

      const awardsData = posts.filter(item => {
        const hasAwards =
          (item.categories && Array.isArray(item.categories) && item.categories.includes('Awards')) ||
          item.category_name === 'Awards';
        const isVisible = item.status && item.status.toLowerCase() === 'visible';
        return hasAwards && isVisible;
      });

      // Check if we got fewer items than requested (means no more data)
      if (awardsData.length < ITEMS_PER_PAGE) {
        setHasMore(false);
      }

      if (isLoadMore) {
        setAwards(prev => [...prev, ...awardsData]);
      } else {
        setAwards(awardsData);
      }
    } catch (err) {
      setError('Failed to load Awards.');
      setHasMore(false);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, []);

  // Initial load
  useEffect(() => {
    fetchAwards(1, false);
  }, [fetchAwards]);

  // Load more function to be called when scrolling
  const loadMore = useCallback(() => {
    if (!loadingMore && !loading && hasMore && !selectedYear && !selectedTitle) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchAwards(nextPage, true);
    }
  }, [loadingMore, loading, hasMore, page, selectedYear, selectedTitle, fetchAwards]);

  // Apply filters
  useEffect(() => {
    const filtersChanged = 
      previousFiltersRef.current.year !== selectedYear ||
      previousFiltersRef.current.title !== selectedTitle;

    // If filters changed, reset to first page
    if (filtersChanged && (selectedYear || selectedTitle)) {
      previousFiltersRef.current = { year: selectedYear, title: selectedTitle };
      setPage(1);
      setHasMore(false); // Disable infinite scroll when filtering
    } else if (!selectedYear && !selectedTitle && filtersChanged) {
      // If filters are cleared, reset and allow infinite scroll
      previousFiltersRef.current = { year: '', title: '' };
      setPage(1);
      setHasMore(true);
      setAwards([]);
      fetchAwards(1, false);
      return;
    }

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
  }, [selectedYear, selectedTitle, awards, fetchAwards]);

  return {
    filteredAwards,
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
