// src/controllers/useLeadersController.js
import { useState, useEffect, useCallback } from 'react';
import { fetchLeadersFromApi } from '../api/employeeApi';

export default function useLeadersController() {
  const [leaders, setLeaders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchLeaders = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      // Model layer fetches leaders from database
      const leadersData = await fetchLeadersFromApi();
      setLeaders(leadersData);
    } catch (err) {
      console.error('Error fetching leaders from database:', err);
      setError(err.message || 'Error loading leaders.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLeaders();
  }, [fetchLeaders]);

  return { leaders, loading, error };
}
