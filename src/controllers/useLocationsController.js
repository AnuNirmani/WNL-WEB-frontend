// src/controllers/useLocationsController.js
import { useState, useEffect, useCallback } from 'react';
import { fetchLocationsFromApi } from '../api/locationsApi';

export default function useLocationsController() {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadLocations = useCallback(async () => {
    try {
      setLoading(true);
      setError('');
      const data = await fetchLocationsFromApi();

      // ✅ Filter out deleted departments (soft deletes or is_active flag)
      const activeDepartments = data.filter(dep => !dep.deleted_at && dep.is_active !== false);

      // ✅ Format Laravel data into usable structure
      const formatted = activeDepartments.map((dep) => ({
        id: dep.id,
        title: dep.department_name,
        address: dep.address ? dep.address.split('\n') : [],
        contact: dep.telephone ? dep.telephone.split('\n') : [],
        fax: dep.fax ? dep.fax.split('\n') : [],
      }));

      setLocations(formatted);
    } catch (err) {
      console.error('Error fetching locations:', err);
      setError(err?.message || 'Failed to load locations.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadLocations();
  }, [loadLocations]);

  return { locations, loading, error };
}
