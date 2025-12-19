// src/utils/jobTitlePriority.js
import { authFetch } from '../api/client';

// Default job title priority mapping (fallback if API doesn't provide it)
const DEFAULT_JOB_TITLE_PRIORITY = {
  // Top Management (highest priority)
  'Managing Director': 1,
  'Director': 2,
  'Deputy Director': 2,
  'Assistant Director': 2,
  'Director of': 2,
  'Director of': 2,
  'Chairman': 3,
  'CEO': 4,
  'COO': 5,
  'CFO': 6,
  'Chief Technology Officer': 7,
  'Chief Marketing Officer': 7,
  'Chief Human Resources Officer': 7,
  'Chief Information Officer': 7,
  'Chief Legal Officer': 7,
  'Chief Customer Officer': 7,
  'Chief Product Officer': 7,
  'Senior Vice President': 7,
  'Director Editorial': 8,
  'Group Director': 9,
  'Board Members': 10,
  'Board Member': 10,
  
  // Middle Management (medium priority - will be assigned dynamically)
  // Other titles will get priority 100+ (lower priority)
};

// Cache for job title priorities
let jobTitlePriorityCache = null;
let priorityCachePromise = null;
const ENDPOINT_NOT_FOUND_KEY = 'job-title-priorities-endpoint-not-found';

/**
 * Fetches job title priorities from the API
 * Falls back to default mapping if API doesn't provide it
 */
export async function fetchJobTitlePriorities() {
  // Return cached data if available
  if (jobTitlePriorityCache) {
    return jobTitlePriorityCache;
  }

  // Check if we've already determined the endpoint doesn't exist (persisted across page reloads)
  const endpointNotFound = localStorage.getItem(ENDPOINT_NOT_FOUND_KEY) === 'true';
  if (endpointNotFound) {
    // Use default mapping without making a request
    jobTitlePriorityCache = DEFAULT_JOB_TITLE_PRIORITY;
    return jobTitlePriorityCache;
  }

  // If a request is already in progress, wait for it
  if (priorityCachePromise) {
    return priorityCachePromise;
  }

  // Create new request
  priorityCachePromise = (async () => {
    try {
      // Try to fetch from API endpoint (allow404=true means it returns null instead of throwing on 404)
      const data = await authFetch('/job-title-priorities', { allow404: true });
      
      if (data && typeof data === 'object') {
        // If API returns priorities, use them
        jobTitlePriorityCache = { ...DEFAULT_JOB_TITLE_PRIORITY, ...data };
        // Clear the "not found" flag since endpoint exists
        localStorage.removeItem(ENDPOINT_NOT_FOUND_KEY);
        return jobTitlePriorityCache;
      } else {
        // Endpoint returned null (404), mark it as not found
        localStorage.setItem(ENDPOINT_NOT_FOUND_KEY, 'true');
      }
    } catch (error) {
      // Only log non-404 errors
      if (error.status !== 404) {
        console.warn('Could not fetch job title priorities from API, using default mapping:', error);
      } else {
        // Mark endpoint as not found for 404 errors
        localStorage.setItem(ENDPOINT_NOT_FOUND_KEY, 'true');
      }
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
    'director',
    'deputy director',
    'assistant director',
    'director of',
    'director of',
    'chairman',
    'ceo',
    'coo',
    'cfo',
    'chief technology officer',
    'chief marketing officer',
    'chief human resources officer',
    'chief information officer',
    'chief legal officer',
    'chief customer officer',
    'chief product officer',
    'senior vice president',
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







