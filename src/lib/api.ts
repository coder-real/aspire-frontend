import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('aspire:token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Only intercept 401s for non-login endpoints
    if (
      error.response?.status === 401 && 
      typeof window !== 'undefined' &&
      !error.config?.url?.includes('/auth/login')
    ) {
      localStorage.removeItem('aspire:token');
      // Keep schoolCode so they don't have to re-select the school when session expires
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
