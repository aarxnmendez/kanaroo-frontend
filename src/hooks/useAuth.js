import { useAuthStore } from "../store/authStore.js";

export const useAuth = () => {
  const {
    user,
    token,
    isAuthenticated,
    isLoading,
    error,
    login,
    register,
    logout,
    refreshUser,
    clearError,
  } = useAuthStore();

  return {
    user,
    token,
    isAuthenticated,
    isLoading,
    error,
    login,
    register,
    logout,
    refreshUser,
    clearError,
  };
};

export const useRole = (requiredRole) => {
  const { user, isAuthenticated } = useAuthStore();

  if (!isAuthenticated || !user) return false;

  return user.role === requiredRole;
};

export const usePermission = (permission) => {
  const { user, isAuthenticated } = useAuthStore();

  if (!isAuthenticated || !user) return false;

  return user.permissions?.includes(permission) || false;
};
