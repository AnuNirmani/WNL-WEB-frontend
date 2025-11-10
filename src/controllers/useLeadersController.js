// src/controllers/useLeadersController.js
import { useState, useEffect, useCallback } from 'react';
import { fetchLeadersFromApi } from '../api/employeeApi';

export default function useLeadersController() {
  const [leaders, setLeaders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [totalLeaders, setTotalLeaders] = useState(0);
  const perPage = 12;

  const fetchLeaders = useCallback(async (page = 1, append = false) => {
    try {
      if (append) {
        setLoadingMore(true);
      } else {
        setLoading(true);
      }
      setError(null);
      
      const response = await fetchLeadersFromApi(page, perPage);
      const employees = response.data || [];

      // Ensure employees is an array
      if (!Array.isArray(employees)) {
        if (!append) setLeaders([]);
        return;
      }

      // filter: only active leaders (status === true for active, false for inactive)
      // Position is "Leader" (singular, capitalized) to identify leaders
      const filtered = employees.filter(emp => {
        const position = String(emp?.position || '').toLowerCase().trim();
        const status = emp?.status;
        
        // Check if status is active (can be true, 1, or '1')
        const isActive = status === true || status === 1 || status === '1';
        
        // Check if position is "leader" (singular, case-insensitive)
        const isLeader = position === 'leader' || position.includes('leader');
        
        return isActive && isLeader;
      });

      if (append) {
        setLeaders(prev => [...prev, ...filtered]);
      } else {
        setLeaders(filtered);
      }

      // Update pagination info
      setCurrentPage(response.current_page || page);
      const totalPages = response.last_page || 1;
      setHasMore(page < totalPages);
      setTotalLeaders(response.total || filtered.length);
    } catch (err) {
      console.error('Error fetching leaders:', err);
      setError(`Error loading leaders: ${err.message || 'Unknown error'}`);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, [perPage]);

  const loadMore = useCallback(() => {
    if (!loadingMore && hasMore) {
      fetchLeaders(currentPage + 1, true);
    }
  }, [currentPage, hasMore, loadingMore, fetchLeaders]);

  // Initial load
  useEffect(() => {
    fetchLeaders(1, false);
  }, []);
  

  return { 
    leaders, 
    loading, 
    loadingMore,
    error, 
    loadMore,
    hasMore,
    totalLeaders,
  };
}
