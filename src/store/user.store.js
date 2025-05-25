import { create } from "zustand";
import { apiClient } from "@/lib/apiClient";
import { API_MESSAGES } from "@/lib/constants/apiMessages";

const useUserStore = create((set, get) => ({
  currentUser: null,
  isLoadingUser: false,
  errorUser: null,

  projects: [],
  isLoadingProjects: false,
  errorProjects: null,

  fetchCurrentUser: async () => {
    const token = localStorage.getItem("authToken");
    set({ isLoadingUser: true, errorUser: null });

    if (!token) {
      set({ currentUser: null, isLoadingUser: false });
      return null;
    }

    try {
      const userData = await apiClient.get("/user");
      if (
        userData &&
        typeof userData === "object" &&
        Object.keys(userData).length > 0
      ) {
        set({ currentUser: userData, isLoadingUser: false });
        return userData;
      } else {
        set({
          currentUser: null,
          isLoadingUser: false,
          errorUser: API_MESSAGES.UNEXPECTED_USER_DATA,
        });
        return null;
      }
    } catch (error) {
      let errorMessage = API_MESSAGES.GENERIC_ERROR;
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.isNetworkError) {
        errorMessage = API_MESSAGES.NETWORK_ERROR;
      } else if (error.message) {
        errorMessage = error.message;
      }
      set({ errorUser: errorMessage, isLoadingUser: false, currentUser: null });
      return null;
    }
  },

  fetchUserProjects: async () => {
    if (get().isLoadingProjects) {
      return;
    }
    set({ isLoadingProjects: true, errorProjects: null });
    try {
      const response = await apiClient.get("/projects");

      const projectData = response && response.data ? response.data : [];

      set({
        projects: Array.isArray(projectData) ? projectData : [],
        isLoadingProjects: false,
      });
      return projectData;
    } catch (error) {
      let errorMessage = API_MESSAGES.GENERIC_ERROR;
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.isNetworkError) {
        errorMessage = API_MESSAGES.NETWORK_ERROR;
      } else if (error.message) {
        errorMessage = error.message;
      }
      set({
        errorProjects: errorMessage,
        isLoadingProjects: false,
        projects: [],
      });
      return null;
    }
  },

  clearUser: () => {
    set({
      currentUser: null,
      isLoadingUser: false,
      errorUser: null,
      projects: [],
      isLoadingProjects: false,
      errorProjects: null,
    });
  },
}));

export { useUserStore };
