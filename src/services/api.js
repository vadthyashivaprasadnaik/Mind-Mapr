/**
 * Mind Mapr — Centralized API Service
 * 
 * Provides a unified HTTP client for communicating with the Spring Boot backend.
 * Configured via VITE_API_BASE_URL (defaults to http://localhost:8080/api).
 * Designed for modular extension (auth, materials, ai, summaries, mind maps, quizzes, progress).
 */

const RAW_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';
// Remove trailing slash if present
const API_BASE_URL = RAW_BASE_URL.replace(/\/+$/, '');

/**
 * Standardized API Error class for frontend error handling.
 */
export class ApiError extends Error {
  constructor(message, status = 0, data = null) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
  }
}

/**
 * Normalizes endpoint paths to prevent duplicate /api segments
 * @param {string} endpoint - Path like '/health', '/api/health', 'health'
 * @returns {string} Fully qualified URL
 */
function buildUrl(endpoint) {
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;

  // If the base URL already ends with /api and endpoint starts with /api/, prevent /api/api/
  if (API_BASE_URL.endsWith('/api') && cleanEndpoint.startsWith('/api/')) {
    return `${API_BASE_URL.slice(0, -4)}${cleanEndpoint}`;
  }

  return `${API_BASE_URL}${cleanEndpoint}`;
}

/**
 * Core Request Dispatcher
 * @param {string} endpoint - API path (e.g. '/health' or '/api/health')
 * @param {RequestInit} [options={}] - Fetch options
 * @returns {Promise<any>} Response JSON or text
 */
export async function apiRequest(endpoint, options = {}) {
  const url = buildUrl(endpoint);

  const headers = {
    'Accept': 'application/json',
    ...(options.body && typeof options.body === 'string' ? { 'Content-Type': 'application/json' } : {}),
    ...options.headers,
  };

  try {
    const response = await fetch(url, {
      ...options,
      headers,
    });

    // Parse JSON if response is JSON, otherwise extract text
    const contentType = response.headers.get('content-type') || '';
    let data = null;
    if (contentType.includes('application/json')) {
      data = await response.json();
    } else {
      data = await response.text();
    }

    if (!response.ok) {
      const errorMsg =
        (data && typeof data === 'object' && data.message) ||
        `Request to ${endpoint} failed with HTTP ${response.status}`;
      throw new ApiError(errorMsg, response.status, data);
    }

    return data;
  } catch (err) {
    if (err instanceof ApiError) {
      throw err;
    }
    // Handle network disconnects, server down, or CORS failure
    throw new ApiError(
      err.message || 'Unable to connect to Mind Mapr backend server.',
      0,
      null
    );
  }
}

/**
 * Centralized API Client methods
 */
export const apiClient = {
  get: (endpoint, options = {}) => apiRequest(endpoint, { ...options, method: 'GET' }),
  post: (endpoint, body, options = {}) =>
    apiRequest(endpoint, {
      ...options,
      method: 'POST',
      body: body ? JSON.stringify(body) : undefined,
    }),
  put: (endpoint, body, options = {}) =>
    apiRequest(endpoint, {
      ...options,
      method: 'PUT',
      body: body ? JSON.stringify(body) : undefined,
    }),
  delete: (endpoint, options = {}) => apiRequest(endpoint, { ...options, method: 'DELETE' }),
  patch: (endpoint, body, options = {}) =>
    apiRequest(endpoint, {
      ...options,
      method: 'PATCH',
      body: body ? JSON.stringify(body) : undefined,
    }),
};

/**
 * Health Check API
 * Performs GET http://localhost:8080/api/health
 * @returns {Promise<{ status: string, application: string, message: string }>}
 */
export async function getHealthStatus() {
  return apiClient.get('/health');
}

export default apiClient;
