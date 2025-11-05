import React, { useEffect, useState, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';

const PressRelease = () => {
  // Visible items
  const [pressReleases, setPressReleases] = useState([]);
  // Full dataset when server doesn't paginate
  const [allPressReleases, setAllPressReleases] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [serverPaginated, setServerPaginated] = useState(true);

  const ITEMS_PER_PAGE = 6;

  const normalizeImages = (list) =>
    list.map((item) => ({
      ...item,
      image: item.image?.startsWith('/storage')
        ? `http://127.0.0.1:8000${item.image}`
        : item.image,
    }));

  const fetchPage = useCallback(async (pageNum = 1, isLoadMore = false) => {
    try {
      if (isLoadMore) setLoadingMore(true);
      else setLoading(true);

      // Try server-side pagination first
      const url = `http://127.0.0.1:8000/api/press/latest?page=${pageNum}&limit=${ITEMS_PER_PAGE}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error(`Error ${res.status}`);
      const data = await res.json();
      const fixedData = normalizeImages(Array.isArray(data) ? data : []);

      // If server ignored pagination and returned a big list on first page, fallback to client slicing
      if (!isLoadMore && pageNum === 1 && fixedData.length > ITEMS_PER_PAGE) {
        setServerPaginated(false);
        setAllPressReleases(fixedData);
        setPressReleases(fixedData.slice(0, ITEMS_PER_PAGE));
        setHasMore(fixedData.length > ITEMS_PER_PAGE);
        return;
      }

      // Server-side paginated path
      setServerPaginated(true);
      if (fixedData.length < ITEMS_PER_PAGE) setHasMore(false);

      if (isLoadMore) setPressReleases((prev) => [...prev, ...fixedData]);
      else setPressReleases(fixedData);
    } catch (error) {
      console.error('Error fetching latest press releases:', error);
      setHasMore(false);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, []);

  useEffect(() => {
    fetchPage(1, false);
  }, [fetchPage]);

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

  // IntersectionObserver sentinel
  const observerRef = useRef(null);
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

  return (
    <section id="press-release" className="press">
      <div className="container" data-aos="fade-up">
        <div className="section-title">
          <h2>Press Release</h2>
        </div>

        <div className="row" id="pressList">
          {loading && pressReleases.length === 0 ? (
            <div className="text-center py-5">Loading press releases...</div>
          ) : pressReleases.length > 0 ? (
            pressReleases.map((press, index) => (
              <div
                className="col-lg-4 col-md-6 mb-4 press-item"
                key={press.post_id}
                ref={index === pressReleases.length - 1 ? lastItemRef : null}
              >
                <div className="card h-100 shadow-sm">
                  <img
                    src={press.image}
                    className="card-img-top"
                    alt={press.title}
                    onError={(e) =>
                      (e.target.src = '/assets/img/press/default.jpg')
                    }
                  />
                  <div className="card-body">
                    <h5 className="card-title">{press.title}</h5>
                    {press.sub_topic && (
                      <p className="text-muted small">{press.sub_topic}</p>
                    )}
                    <Link
                      to={`/press-release/${press.post_id}`}
                      state={press}
                      className="btn-view-more"
                    >
                      View More
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-5">No press releases available.</div>
          )}
        </div>
      </div>
    </section>
  );
};

export default PressRelease;
