import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const THEME_STORAGE_KEY = "kanaroo-app-theme";

const getSystemTheme = () => {
  if (
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  ) {
    return "dark";
  }
  return "light";
};

export const useThemeStore = create(
  persist(
    (set, get) => ({
      theme: "system", // 'light', 'dark', or 'system'
      resolvedTheme: getSystemTheme(), // 'light' or 'dark'

      // Action to initialize and set the theme
      initializeTheme: () => {
        const storedTheme = get().theme; // Get theme possibly restored by persist middleware
        let currentTheme = storedTheme;
        let currentResolvedTheme = getSystemTheme();

        if (currentTheme === "light" || currentTheme === "dark") {
          currentResolvedTheme = currentTheme;
        } else {
          // 'system' or initial load without specific theme
          currentTheme = "system"; // Ensure theme state is 'system' if resolved from system
          // resolvedTheme is already set by getSystemTheme()
        }

        if (currentResolvedTheme === "dark") {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }
        set({ theme: currentTheme, resolvedTheme: currentResolvedTheme });
      },

      // Action to manually set the theme by user
      setTheme: (newTheme) => {
        let newResolvedTheme = newTheme;
        if (newTheme === "system") {
          newResolvedTheme = getSystemTheme();
        }

        if (newResolvedTheme === "dark") {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }
        set({ theme: newTheme, resolvedTheme: newResolvedTheme });
      },
    }),
    {
      name: THEME_STORAGE_KEY, // Name for localStorage key
      storage: createJSONStorage(() => localStorage), // Use localStorage
      partialize: (state) => ({ theme: state.theme }), // Only persist the 'theme' preference
      onRehydrateStorage: (state) => {
        // This is called when the store is rehydrated from localStorage
        // We can trigger initialization here, but it's better to do it explicitly in App.jsx
        // to ensure document.documentElement is available.
        console.log("Theme store rehydrated");
      },
    }
  )
);

// Helper to apply theme on system preference change when theme is 'system'
if (typeof window !== "undefined") {
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", (e) => {
      const storeState = useThemeStore.getState();
      if (storeState.theme === "system") {
        storeState.setTheme("system"); // Re-evaluate and apply system theme
      }
    });
}
