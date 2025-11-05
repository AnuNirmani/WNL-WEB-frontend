import { useState, useEffect, useRef, useCallback } from 'react';
import { fetchPressReleases } from '../api/postsApi';

/**
 * Controller hook for managing Press Release list logic
 */
export const usePressReleaseDbController = () => {
  const [pressReleases, setPressReleases] = useState([]);
  const [allPressReleases, setAllPressReleases] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [serverPaginated, setServerPaginated] = useState(true);

  const observerRef = useRef(null);
  const ITEMS_PER_PAGE = 6;

  /**
   * Fetch a specific page of press releases
   */
  const fetchPage = useCallback(async (pageNum = 1, isLoadMore = false) => {
    try {
      if (isLoadMore) setLoadingMore(true);
      else setLoading(true);

      const data = await fetchPressReleases(pageNum, ITEMS_PER_PAGE);

      // If server ignored pagination and returned a big list on first page
      if (!isLoadMore && pageNum === 1 && data.length > ITEMS_PER_PAGE) {
        setServerPaginated(false);
        setAllPressReleases(data);
        setPressReleases(data.slice(0, ITEMS_PER_PAGE));
        setHasMore(data.length > ITEMS_PER_PAGE);
        return;
      }

      // Server-side paginated path
      setServerPaginated(true);
      if (data.length < ITEMS_PER_PAGE) setHasMore(false);

      if (isLoadMore) setPressReleases((prev) => [...prev, ...data]);
      else setPressReleases(data);
    } catch (error) {
      console.error('Error fetching latest press releases:', error);
      setHasMore(false);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, []);

  /**
   * Load initial data
   */
  useEffect(() => {
    fetchPage(1, false);
  }, [fetchPage]);

  /**
   * Load more press releases
   */
  const loadMore = useCallback(() => {
    if (loading || loadingMore || !hasMore) return;

    // Client-side slicing fallback
    if (!serverPaginated) {
      const nextPage = page + 1;
      const start = (nextPage - 1) * ITEMS_PER_PAGE;
      const end = start + ITEMS_PER_PAGE;
      const nextSlice = allPressReleases.slice(start, end);
      setPage(nextPage);
      setPressReleases((prev) => [...prev, ...nextSlice]);
      setHasMore(end < allPressReleases.length);
      return;
    }

    // Server-side paginated path
    const nextPage = page + 1;
    setPage(nextPage);
    fetchPage(nextPage, true);
  }, [loading, loadingMore, hasMore, serverPaginated, page, allPressReleases, fetchPage]);

  /**
   * Callback ref for IntersectionObserver
   */
  const lastItemRef = useCallback(
    (node) => {
      if (loading || loadingMore) return;
      if (observerRef.current) observerRef.current.disconnect();
      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadMore();
        }
      });
      if (node) observerRef.current.observe(node);
    },
    [loading, loadingMore, hasMore, loadMore]
  );

  return {
    pressReleases,
    loading,
    loadingMore,
    hasMore,
    lastItemRef,
  };
};
