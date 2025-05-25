const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

async function request(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;

  const defaultHeaders = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  const token = localStorage.getItem("authToken");
  if (token && options.authenticated !== false) {
    defaultHeaders["Authorization"] = `Bearer ${token}`;
  }

  const config = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, config);

    let data = null;
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.indexOf("application/json") !== -1) {
      if (response.status !== 204) {
        data = await response.json();
      }
    } else {
      if (response.status !== 204) {
        console.warn(
          "La respuesta no es un JSON, cuerpo no parseado automáticamente para URL:",
          url
        );
      }
    }

    if (!response.ok) {
      const errorMessage =
        data?.message || `Error ${response.status}: ${response.statusText}`;

      const error = new Error(errorMessage);
      error.response = response;
      error.status = response.status;
      error.data = data;
      throw error;
    }
    return data;
  } catch (error) {
    if (error.data || error.response) {
      throw error;
    }
    const networkError = new Error(
      error.message || "Error de red o al procesar la petición."
    );
    networkError.isNetworkError = true;
    throw networkError;
  }
}

export const apiClient = {
  get: (endpoint, options = {}) =>
    request(endpoint, { ...options, method: "GET" }),
  post: (endpoint, body, options = {}) =>
    request(endpoint, {
      ...options,
      method: "POST",
      body: JSON.stringify(body),
    }),
  put: (endpoint, body, options = {}) =>
    request(endpoint, {
      ...options,
      method: "PUT",
      body: JSON.stringify(body),
    }),
  patch: (endpoint, body, options = {}) =>
    request(endpoint, {
      ...options,
      method: "PATCH",
      body: JSON.stringify(body),
    }),
  delete: (endpoint, options = {}) =>
    request(endpoint, { ...options, method: "DELETE" }),
};
