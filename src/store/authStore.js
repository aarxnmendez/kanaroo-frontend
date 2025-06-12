import { create } from "zustand";

export const useAuthStore = create((set, get) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  initialize: () => {
    try {
      const token = localStorage.getItem("authToken");
      const userString = localStorage.getItem("user");
      const user = userString ? JSON.parse(userString) : null;

      set({
        user,
        token,
        isAuthenticated: !!(token && user),
        isLoading: false,
      });
    } catch (error) {
      console.error("Error initializing auth store:", error);
      set({
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
      });
    }
  },
  login: async (credentials) => {
    set({ isLoading: true, error: null });

    try {
      const { authService } = await import("../services/authService.js");
      const response = await authService.login(credentials);

      set({
        user: response.user,
        token: response.token,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
      return response;
    } catch (error) {
      let errorMessage = "Error de autenticación";

      if (error.response?.data) {
        const errorData = error.response.data;

        if (errorData.message) {
          errorMessage = errorData.message;
        } else if (errorData.errors) {
          const firstErrorField = Object.keys(errorData.errors)[0];
          errorMessage = errorData.errors[firstErrorField][0];
        }
      } else if (error.message) {
        errorMessage = error.message;
      }

      set({
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
        error: errorMessage,
      });
      throw error;
    }
  },
  register: async (userData) => {
    set({ isLoading: true, error: null });

    try {
      const { authService } = await import("../services/authService.js");
      const response = await authService.register(userData);

      set({
        user: response.user,
        token: response.token,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });

      return response;
    } catch (error) {
      let errorMessage = "Error en el registro";

      if (error.response?.data) {
        const errorData = error.response.data;

        if (errorData.errors) {
          const firstErrorField = Object.keys(errorData.errors)[0];
          errorMessage = errorData.errors[firstErrorField][0];
        } else if (errorData.message) {
          errorMessage = errorData.message;
        }
      } else if (error.message) {
        errorMessage = error.message;
      }

      set({
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
        error: errorMessage,
      });
      throw error;
    }
  },

  logout: async () => {
    set({ isLoading: true });

    try {
      const { authService } = await import("../services/authService.js");
      await authService.logout();
    } catch (error) {
      console.error("Error during logout:", error);
    } finally {
      set({
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      });
    }
  },

  refreshUser: async () => {
    const { isAuthenticated } = get();

    if (!isAuthenticated) return;

    try {
      const { authService } = await import("../services/authService.js");
      const user = await authService.getUserInfo();
      set({ user });
      return user;
    } catch (error) {
      console.error("Error refreshing user:", error);
      get().logout();
      throw error;
    }
  },

  clearError: () => {
    set({ error: null });
  },

  handleUnauthorized: () => {
    set({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: "Sesión expirada",
    });
  },
}));
