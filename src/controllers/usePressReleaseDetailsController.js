// src/controllers/usePressReleaseDetailsController.js
import { useState, useEffect, useCallback } from 'react';
import { fetchPressReleaseDetails } from '../api/postsApi';

export default function usePressReleaseDetailsController(id) {
  const [release, setRelease] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadRelease = useCallback(async () => {
    try {
      setLoading(true);
      const data = await fetchPressReleaseDetails(id);
      setRelease(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (id) loadRelease();
  }, [id, loadRelease]);

  return { release, loading, error };
}
