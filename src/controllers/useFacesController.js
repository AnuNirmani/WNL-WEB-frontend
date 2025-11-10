// src/controllers/useFacesController.js
import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { fetchFacesFromApi } from '../api/employeeApi';

export default function useFacesController() {
  const [faces, setFaces] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [totalFaces, setTotalFaces] = useState(0);
  const perPage = 12;

  const fetchFaces = useCallback(async (page = 1, append = false) => {
    try {
      if (append) {
        setLoadingMore(true);
      } else {
        setLoading(true);
      }
      setError(false);
      
      const response = await fetchFacesFromApi(page, perPage);
      const employees = response.data || [];

      // Ensure employees is an array
      if (!Array.isArray(employees)) {
        if (!append) setFaces([]);
        return;
      }

      // filter active "faces" (status === true for active, false for inactive)
      // Position is "Faces" (capitalized) to identify faces
      const facesData = employees.filter(emp => {
        const position = String(emp?.position || '').toLowerCase().trim();
        const department = String(emp?.department || '').toLowerCase().trim();
        const status = emp?.status;
        
        // Check if status is active (can be true, 1, or '1')
        const isActive = status === true || status === 1 || status === '1';
        
        // Check if position or department contains "faces" (case-insensitive)
        const isFace = position.includes('faces') || department.includes('faces');
        
        return isActive && isFace;
      });

      if (append) {
        setFaces(prev => [...prev, ...facesData]);
      } else {
        setFaces(facesData);
      }

      // Update pagination info
      setCurrentPage(response.current_page || page);
      const totalPages = response.last_page || 1;
      setHasMore(page < totalPages);
      setTotalFaces(response.total || facesData.length);
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, [perPage]);

  const loadMore = useCallback(() => {
    if (!loadingMore && hasMore) {
      fetchFaces(currentPage + 1, true);
    }
  }, [currentPage, hasMore, loadingMore, fetchFaces]);

  // Initial load
  useEffect(() => {
    fetchFaces(1, false);
  }, []);

  // Reset and reload when search/filter changes
  useEffect(() => {
    if (searchTerm !== '' || selectedDepartment !== '') {
      // For now, filter client-side. In production, you might want to reset and fetch from server
      return;
    }
  }, [searchTerm, selectedDepartment]);

  const filteredFaces = useMemo(() => {
    return faces.filter(face => {
      const name = String(face?.name || '').toLowerCase();
      const department = String(face?.department || '').toLowerCase();
      const searchLower = searchTerm.toLowerCase();
      const deptLower = selectedDepartment.toLowerCase();
      
      const matchesName = name.includes(searchLower);
      const matchesDept = selectedDepartment === '' || department === deptLower;
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
    loadingMore,
    error,
    loadMore,
    hasMore,
    totalFaces,
  };
}

