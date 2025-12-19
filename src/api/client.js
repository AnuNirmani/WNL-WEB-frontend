// src/api/client.js
// In development, use the Vite proxy to avoid CORS issues
// In production, use the full API URL from environment variable
const API_BASE = import.meta.env.DEV 
  ? '/api' 
  : (import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api');

// Helper to read token; tokens come from login and are saved to localStorage
export function getAuthToken() {
  return localStorage.getItem('auth_token') || null;
}

// Standardized error factory
async function parseErrorResponse(res) {
  const clone = res.clone();
  try {
    const json = await clone.json();
    // backend might send { message } or { error } or other
    return json.message || json.error || JSON.stringify(json);
  } catch {
    return res.statusText || `HTTP ${res.status}`;
  }
}

/**
 * authFetch - wrapper around fetch which automatically sets Authorization header if token exists,
 * uses API base URL, and throws on non-OK with parsed message.
 *
 * @param {string} path   - path relative to API base, e.g. '/posts' or '/posts/123'
 * @param {Object} opts   - fetch options (method, body, headers, etc.)
 */
export async function authFetch(path, opts = {}) {
  const url = path.startsWith('http') ? path : `${API_BASE}${path.startsWith('/') ? '' : '/'}${path}`;

  const token = getAuthToken();

  const headers = {
    Accept: 'application/json',
    ...(opts.headers || {})
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  // If body is provided as object, stringify and set content-type
  let body = opts.body;
  if (body && typeof body === 'object' && !(body instanceof FormData)) {
    body = JSON.stringify(body);
    headers['Content-Type'] = 'application/json';
  }

  const response = await fetch(url, {
    credentials: opts.credentials || 'same-origin', // adjust if you want cookies
    ...opts,
    headers,
    body
  });

  if (!response.ok) {
    const msg = await parseErrorResponse(response);
    const errorMsg = msg || `HTTP ${response.status}`;
    const err = new Error(errorMsg);
    err.status = response.status;
    err.url = url;
    // Log detailed error information for debugging
    console.error(`API Error [${response.status}]:`, {
      url,
      status: response.status,
      statusText: response.statusText,
      message: errorMsg
    });
    throw err;
  }

  // Some endpoints return no body (204), so handle that
  const text = await response.text();
  if (!text) return null;
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}
