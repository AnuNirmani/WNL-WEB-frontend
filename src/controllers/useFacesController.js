// src/controllers/useFacesController.js
import { useState, useEffect, useMemo, useCallback } from 'react';
import { fetchFacesFromApi } from '../api/employeeApi';

export default function useFacesController() {
  const [faces, setFaces] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchFaces = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      // Model layer fetches from database with filters
      const facesData = await fetchFacesFromApi(searchTerm, selectedDepartment);
      setFaces(facesData);
    } catch (err) {
      console.error('Error fetching faces from database:', err);
      setError(err.message || 'Error loading faces.');
    } finally {
      setLoading(false);
    }
  }, [searchTerm, selectedDepartment]);

  useEffect(() => {
    fetchFaces();
  }, [fetchFaces]);

  // Filter is now done on server-side, but we keep this for client-side search
  const filteredFaces = useMemo(() => {
    return faces.filter(face => {
      const matchesName = face.name?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesDept =
        selectedDepartment === '' ||
        face.department?.toLowerCase() === selectedDepartment.toLowerCase();
      return matchesName && matchesDept;
    });
  }, [faces, searchTerm, selectedDepartment]);

  // extract unique departments for dropdown
  const departments = useMemo(
    () => Array.from(new Set(faces.map(f => f.department).filter(Boolean))),
    [faces]
  );

  return {
    faces,
    filteredFaces,
    departments,
    searchTerm,
    setSearchTerm,
    selectedDepartment,
    setSelectedDepartment,
    loading,
    error,
  };
}
