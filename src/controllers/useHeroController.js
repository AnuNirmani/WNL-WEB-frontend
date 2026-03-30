// src/controllers/useHeroController.js
import { useState, useEffect, useCallback } from 'react';
import { fetchPressReleasesFromApi } from '../api/postsApi';
import { formatFriendlyError } from '../utils/formatError';

const BACKEND_ORIGIN = import.meta.env.VITE_BACKEND_ORIGIN || 'http://127.0.0.1:8000';

const normalizeImageUrl = (image) => {
  if (!image || typeof image !== 'string') return '';
  if (image.startsWith('http://') || image.startsWith('https://')) return image;
  const normalizedPath = image.startsWith('/') ? image : `/${image}`;
  return `${BACKEND_ORIGIN}${normalizedPath}`;
};

export default function useHeroController() {
  const [newsItems, setNewsItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadNews = useCallback(async () => {
    try {
      setLoading(true);
      setError('');

      const PAGE_SIZE = 50;
      let page = 1;
      let hasMore = true;
      const allPressReleases = [];

      while (hasMore) {
        const pageData = await fetchPressReleasesFromApi(page, PAGE_SIZE);
        const visibleItems = (Array.isArray(pageData) ? pageData : []).filter((item) => {
          if (typeof item.status === 'number') return item.status === 1;
          if (typeof item.status === 'string') return item.status.toLowerCase() === 'visible';
          return true;
        });

        allPressReleases.push(...visibleItems);

        if (!Array.isArray(pageData) || pageData.length < PAGE_SIZE) {
          hasMore = false;
        } else {
          page += 1;
        }
      }

      const formatted = allPressReleases.map((item, index) => ({
        id: item.id ?? item.post_id ?? `${index}`,
        title: item.title,
        sub_topic: item.sub_topic,
        image: normalizeImageUrl(item.image),
        date: item.created_at
          ? new Date(item.created_at).toLocaleDateString()
          : ''
      }));

      setNewsItems(formatted);
    } catch (err) {
      setError(formatFriendlyError(err));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadNews();
  }, [loadNews]);

  return { newsItems, loading, error };
}
