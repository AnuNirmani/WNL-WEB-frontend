// src/controllers/useAwardDetailsController.js
import { useState, useEffect, useCallback } from 'react';
import { fetchAwardById } from '../api/postsApi';
import { sanitizeHtml } from '../utils/sanitize';
import { formatFriendlyError } from '../utils/formatError';

export default function useAwardDetailsController(id) {
  const [award, setAward] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const fetchAward = useCallback(async () => {
    if (!id) {
      setError('No award ID provided');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const data = await fetchAwardById(id);
      
      // Sanitize description HTML
      if (data.description) {
        const safeDescription = sanitizeHtml(
          Array.isArray(data.description) ? data.description.join(' ') : data.description
        );
        data.description = safeDescription;
      }
      
      setAward(data);
    } catch (err) {
      setError(formatFriendlyError(err));
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchAward();
  }, [fetchAward]);

  // carousel controls
  const handlePrevSlide = () => {
    if (!award?.images) return;
    setActiveIndex((prev) =>
      prev === 0 ? award.images.length - 1 : prev - 1
    );
  };

  const handleNextSlide = () => {
    if (!award?.images) return;
    setActiveIndex((prev) =>
      prev === award.images.length - 1 ? 0 : prev + 1
    );
  };

  return { award, loading, error, activeIndex, handlePrevSlide, handleNextSlide };
}
