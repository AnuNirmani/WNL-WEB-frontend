// src/controllers/useFacesController.js
import { useState, useEffect, useMemo, useCallback } from 'react';
import { fetchFacesFromApi } from '../api/employeeApi';

export default function useFacesController() {
  const [faces, setFaces] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchFaces = useCallback(async () => {
    try {
      setLoading(true);
      setError(false);
      const employees = await fetchFacesFromApi();

      // filter active "faces"
      const facesData = employees.filter(emp =>
        (emp.position?.toLowerCase().includes('faces') ||
         emp.department?.toLowerCase().includes('faces')) &&
        emp.status?.toLowerCase() === 'active'
      );

      setFaces(facesData);
    } catch (err) {
      console.error('Error fetching employees:', err);
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFaces();
  }, [fetchFaces]);

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
