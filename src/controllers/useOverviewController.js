// src/controllers/useOverviewController.js
import { useState, useEffect, useCallback } from 'react';
import { fetchPostById } from '../api/postsApi';

export default function useOverviewController(id) {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadPost = useCallback(async () => {
    if (!id) {
      setError('No post ID provided.');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const data = await fetchPostById(id);
      setPost(data);
    } catch (err) {
      setError(err.message || 'Failed to load post details.');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    loadPost();
  }, [loadPost]);

  return { post, loading, error };
}
