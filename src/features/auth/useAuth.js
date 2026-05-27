import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { clearAuthError, loginUser, logout } from "@/features/auth/authSlice";
import {
  selectAuthError,
  selectAuthLoading,
  selectCurrentUser,
  selectIsAuthenticated,
} from "@/features/auth/authSelectors";

export const useAuth = () => {
  const dispatch = useAppDispatch();

  return {
    user: useAppSelector(selectCurrentUser),
    isAuthenticated: useAppSelector(selectIsAuthenticated),
    loading: useAppSelector(selectAuthLoading),
    error: useAppSelector(selectAuthError),
    login: (credentials) => dispatch(loginUser(credentials)),
    logout: () => dispatch(logout()),
    clearError: () => dispatch(clearAuthError()),
  };
};
