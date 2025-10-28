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
      const employees = await fetchLeadersFromApi();

      // filter: only active leaders
      const filtered = employees.filter(emp =>
        emp.position?.toLowerCase().includes('leader') &&
        emp.status?.toLowerCase() === 'active'
      );

      setLeaders(filtered);
    } catch (err) {
      console.error('Error fetching leaders:', err);
      setError('Error loading leaders.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLeaders();
  }, [fetchLeaders]);

  return { leaders, loading, error };
}
