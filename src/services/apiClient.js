const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api";

let globalNavigate = null;

export const initializeFetchClient = (navigate) => {
  globalNavigate = navigate;
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

  try {
    const response = await fetch(url, config);

    if (!response.ok) {
      let errorData;
      try {
        errorData = await response.json();
      } catch (_parseError) {
        errorData = { message: response.statusText };
      }

      const error = new Error(errorData.message || response.statusText);
      error.response = {
        status: response.status,
        data: errorData,
        statusText: response.statusText,
        url: response.url,
      };

      if (globalNavigate) {
        switch (response.status) {
          case 401:
            globalNavigate("/error-401");
            break;
          case 403:
            globalNavigate("/error-403");
            break;
          case 404:
            globalNavigate("/error-404");
            break;
          case 500:
            globalNavigate("/error-500");
            break;
          case 503:
            globalNavigate("/error-503");
            break;
          default:
            break;
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
  } catch (error) {
    if (globalNavigate && !error.response) {
      globalNavigate("/error-generic");
    }
    throw error;
  }
};
