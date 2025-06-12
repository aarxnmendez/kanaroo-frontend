const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api";

let authStore = null;

export const initializeFetchClient = (authStoreInstance) => {
  authStore = authStoreInstance;
};

export const customFetch = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;

  const defaultHeaders = {
    "Content-Type": "application/json",
  };

  const token = localStorage.getItem("authToken");

  const config = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  };

  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(url, config);

  if (!response.ok) {
    let errorData;
    try {
      errorData = await response.json();
    } catch {
      errorData = { message: response.statusText };
    }

    const error = new Error(errorData.message || response.statusText);
    error.response = {
      status: response.status,
      data: errorData,
      statusText: response.statusText,
      url: response.url,
    };

    if (response.status === 401 && token) {
      localStorage.removeItem("authToken");
      localStorage.removeItem("user");

      if (authStore && authStore.handleUnauthorized) {
        authStore.handleUnauthorized();
      }
    }

    throw error;
  }

  if (response.headers.get("content-type")?.includes("application/json")) {
    return await response.json();
  }

  if (response.status === 204) {
    return null;
  }
  return response;
};
