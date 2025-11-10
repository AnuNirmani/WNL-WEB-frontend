// src/controllers/useHeroController.js
import { useState, useEffect, useCallback } from 'react';
import { fetchLatestPosts } from '../api/homeApi';

export default function useHeroController() {
  const [newsItems, setNewsItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadNews = useCallback(async () => {
    try {
      setLoading(true);
      setError('');
      const data = await fetchLatestPosts();

      const formatted = data.map(item => ({
        id: item.id,
        title: item.title,
        sub_topic: item.sub_topic,
        image: item.image,
        date: item.created_at
          ? new Date(item.created_at).toLocaleDateString()
          : ''
      }));

      setNewsItems(formatted);
    } catch (err) {
      setError(err.message || 'Failed to load latest posts');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadNews();
  }, [loadNews]);

  return { newsItems, loading, error };
}
