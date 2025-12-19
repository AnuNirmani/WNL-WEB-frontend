// src/controllers/useLeadersController.js
import { useState, useEffect, useCallback } from 'react';
import { fetchLeadersFromApi } from '../api/employeeApi';
import { formatFriendlyError } from '../utils/formatError';
import { sortEmployeesByJobTitlePriority, fetchJobTitlePriorities, sortEmployeesByJobTitlePrioritySync } from '../utils/jobTitlePriority';

export default function useLeadersController() {
  const [leaders, setLeaders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [totalLeaders, setTotalLeaders] = useState(0);
  const [jobTitlePriorities, setJobTitlePriorities] = useState(null);
  const perPage = 12;

  // Fetch job title priorities on mount
  useEffect(() => {
    fetchJobTitlePriorities().then(priorities => {
      setJobTitlePriorities(priorities);
    }).catch(err => {
      console.warn('Failed to fetch job title priorities:', err);
    });
  }, []);

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
      let filtered = employees.filter(emp => {
        const position = String(emp?.position || '').toLowerCase().trim();
        const status = emp?.status;
        
        // Check if status is active (can be true, 1, or '1')
        const isActive = status === true || status === 1 || status === '1';
        
        // Check if position is "leader" (singular, case-insensitive)
        const isLeader = position === 'leader' || position.includes('leader');
        
        return isActive && isLeader;
      });

      // Sort by job title priority
      if (filtered.length > 0) {
        filtered = await sortEmployeesByJobTitlePriority(filtered, jobTitlePriorities);
      }

      if (append) {
        setLeaders(prev => {
          const combined = [...prev, ...filtered];
          // Re-sort the combined array to maintain priority order (use sync version since priorities are cached)
          return sortEmployeesByJobTitlePrioritySync(combined, jobTitlePriorities || null);
        });
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
      setError(formatFriendlyError(err));
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, [perPage, jobTitlePriorities]);

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
