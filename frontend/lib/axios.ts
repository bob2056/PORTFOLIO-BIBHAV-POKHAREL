import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 60000,
});

// Request interceptor: attach admin JWT token if present
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("bibhav_admin_token");
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);

// Response interceptor: centralized error handling
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError<{ message?: string }>) => {
    const message =
      error.response?.data?.message ||
      error.message ||
      "An unexpected error occurred";

    // Automatically clear token if unauthorized
    if (error.response?.status === 401 && typeof window !== "undefined") {
      if (window.location.pathname.startsWith("/admin")) {
        // Keep or handle in admin component
      }
    }

    return Promise.reject({
      status: error.response?.status || 500,
      message,
      originalError: error,
    });
  },
);

export default api;
