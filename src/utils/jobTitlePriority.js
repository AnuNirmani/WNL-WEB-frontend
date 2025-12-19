// src/utils/jobTitlePriority.js
import { authFetch } from '../api/client';

// Default job title priority mapping (fallback if API doesn't provide it)
const DEFAULT_JOB_TITLE_PRIORITY = {
  // Top Management (highest priority)
  'Managing Director': 1,
  'Chairman': 2,
  'CEO': 3,
  'COO': 4,
  'CFO': 5,
  'Director Editorial': 6,
  'Group Director': 7,
  'Board Members': 8,
  'Board Member': 8,
  
  // Middle Management (medium priority - will be assigned dynamically)
  // Other titles will get priority 100+ (lower priority)
};

// Cache for job title priorities
let jobTitlePriorityCache = null;
let priorityCachePromise = null;

/**
 * Fetches job title priorities from the API
 * Falls back to default mapping if API doesn't provide it
 */
export async function fetchJobTitlePriorities() {
  // Return cached data if available
  if (jobTitlePriorityCache) {
    return jobTitlePriorityCache;
  }

  // If a request is already in progress, wait for it
  if (priorityCachePromise) {
    return priorityCachePromise;
  }

  // Create new request
  priorityCachePromise = (async () => {
    try {
      // Try to fetch from API endpoint
      const data = await authFetch('/job-title-priorities');
      
      if (data && typeof data === 'object') {
        // If API returns priorities, use them
        jobTitlePriorityCache = { ...DEFAULT_JOB_TITLE_PRIORITY, ...data };
        return jobTitlePriorityCache;
      }
    } catch (error) {
      console.warn('Could not fetch job title priorities from API, using default mapping:', error);
    }

    // Fallback to default mapping
    jobTitlePriorityCache = DEFAULT_JOB_TITLE_PRIORITY;
    return jobTitlePriorityCache;
  })();

  return priorityCachePromise;
}

/**
 * Gets the priority for a job title
 * @param {string} jobTitle - The job title to get priority for
 * @param {Object} priorityMap - The priority mapping object
 * @returns {number} - Priority number (lower = higher priority)
 */
export function getJobTitlePriority(jobTitle, priorityMap = null) {
  if (!jobTitle) return 999; // No title = lowest priority
  
  const title = String(jobTitle).trim();
  const map = priorityMap || DEFAULT_JOB_TITLE_PRIORITY;
  
  // Exact match
  if (map[title]) {
    return map[title];
  }
  
  // Case-insensitive match
  const titleLower = title.toLowerCase();
  for (const [key, priority] of Object.entries(map)) {
    if (key.toLowerCase() === titleLower) {
      return priority;
    }
  }
  
  // Partial match for titles containing key phrases
  const topManagementTitles = [
    'managing director',
    'chairman',
    'ceo',
    'coo',
    'cfo',
    'director editorial',
    'group director',
    'board member'
  ];
  
  for (let i = 0; i < topManagementTitles.length; i++) {
    if (titleLower.includes(topManagementTitles[i])) {
      return i + 1; // Return priority based on order in array
    }
  }
  
  // Check for "director" in title (middle management)
  if (titleLower.includes('director') && !titleLower.includes('group director') && !titleLower.includes('director editorial')) {
    return 50; // Middle management priority
  }
  
  // Check for "manager" in title (middle management)
  if (titleLower.includes('manager')) {
    return 75; // Middle management priority
  }
  
  // Default: lower priority
  return 100;
}

/**
 * Sorts employees by job title priority
 * @param {Array} employees - Array of employee objects
 * @param {Object} priorityMap - Optional priority mapping (will fetch if not provided)
 * @returns {Array} - Sorted array of employees
 */
export async function sortEmployeesByJobTitlePriority(employees, priorityMap = null) {
  if (!Array.isArray(employees) || employees.length === 0) {
    return employees;
  }

  // Get priority map if not provided
  let priorities = priorityMap;
  if (!priorities) {
    priorities = await fetchJobTitlePriorities();
  }

  // Create a copy to avoid mutating the original array
  const sorted = [...employees].sort((a, b) => {
    const jobTitleA = a.job_title || a.title || '';
    const jobTitleB = b.job_title || b.title || '';
    
    const priorityA = getJobTitlePriority(jobTitleA, priorities);
    const priorityB = getJobTitlePriority(jobTitleB, priorities);
    
    // Sort by priority (lower number = higher priority)
    if (priorityA !== priorityB) {
      return priorityA - priorityB;
    }
    
    // If same priority, maintain original order or sort alphabetically by name
    const nameA = (a.name || '').toLowerCase();
    const nameB = (b.name || '').toLowerCase();
    return nameA.localeCompare(nameB);
  });

  return sorted;
}

/**
 * Synchronous version that uses default priority map
 * Use this when you already have the priority map cached
 */
export function sortEmployeesByJobTitlePrioritySync(employees, priorityMap = DEFAULT_JOB_TITLE_PRIORITY) {
  if (!Array.isArray(employees) || employees.length === 0) {
    return employees;
  }

  const sorted = [...employees].sort((a, b) => {
    const jobTitleA = a.job_title || a.title || '';
    const jobTitleB = b.job_title || b.title || '';
    
    const priorityA = getJobTitlePriority(jobTitleA, priorityMap);
    const priorityB = getJobTitlePriority(jobTitleB, priorityMap);
    
    if (priorityA !== priorityB) {
      return priorityA - priorityB;
    }
    
    const nameA = (a.name || '').toLowerCase();
    const nameB = (b.name || '').toLowerCase();
    return nameA.localeCompare(nameB);
  });

  return sorted;
}






