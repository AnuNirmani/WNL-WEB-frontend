// src/controllers/usePressReleaseDetailsController.js
import { useState, useEffect, useCallback } from 'react';
import { fetchPressReleaseDetails } from '../api/postsApi';
import { sanitizeHtml } from '../utils/sanitize';
import { formatFriendlyError } from '../utils/formatError';

export default function usePressReleaseDetailsController(id) {
  const [release, setRelease] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadRelease = useCallback(async () => {
    try {
      setLoading(true);
      const data = await fetchPressReleaseDetails(id);
      
      // Sanitize description HTML
      if (data.description) {
        data.description = sanitizeHtml(data.description);
      }
      
      setRelease(data);
    } catch (err) {
      setError(formatFriendlyError(err));
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (id) loadRelease();
  }, [id, loadRelease]);

  return { release, loading, error };
}
