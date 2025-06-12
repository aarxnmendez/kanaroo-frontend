import { customFetch } from "./apiClient.js";

export const authService = {
  async login(credentials) {
    const response = await customFetch("/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    });

    if (response.token) {
      localStorage.setItem("authToken", response.token);
    }
    if (response.user) {
      localStorage.setItem("user", JSON.stringify(response.user));
    }

    return response;
  },

  async register(userData) {
    const response = await customFetch("/register", {
      method: "POST",
      body: JSON.stringify(userData),
    });

    if (response.token) {
      localStorage.setItem("authToken", response.token);
    }
    if (response.user) {
      localStorage.setItem("user", JSON.stringify(response.user));
    }

    return response;
  },

  async logout() {
    try {
      await customFetch("/logout", {
        method: "POST",
      });
    } catch (error) {
      console.error("Error during logout:", error);
    } finally {
      // Limpiar localStorage
      localStorage.removeItem("authToken");
      localStorage.removeItem("user");
    }
  },
  isAuthenticated() {
    const token = localStorage.getItem("authToken");
    const user = localStorage.getItem("user");
    return !!(token && user);
  },

  getCurrentUser() {
    try {
      const user = localStorage.getItem("user");
      return user ? JSON.parse(user) : null;
    } catch (error) {
      console.error("Error parsing user data:", error);
      return null;
    }
  },

  getToken() {
    return localStorage.getItem("authToken");
  },
  async getUserInfo() {
    const response = await customFetch("/user", {
      method: "GET",
    });

    if (response) {
      localStorage.setItem("user", JSON.stringify(response));
    }

    return response;
  },

  async resendEmailVerification() {
    return await customFetch("/email/verification-notification", {
      method: "POST",
    });
  },

  async forgotPassword(email) {
    return await customFetch("/forgot-password", {
      method: "POST",
      body: JSON.stringify({ email }),
    });
  },

  async resetPassword(resetData) {
    return await customFetch("/reset-password", {
      method: "POST",
      body: JSON.stringify(resetData),
    });
  },
};
