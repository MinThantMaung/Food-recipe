
import { useEffect } from "react";
import axios from "axios";
import { authApi } from "@/api";
import { useAuthUserStore } from "@/features/auth/stores/authUserStore";
import type { AuthUser } from "@/features/auth/stores/authUserStore";

export function AuthInitializer() {
  const setUser = useAuthUserStore((state) => state.setUser);
  const clearUser = useAuthUserStore((state) => state.clearUser);

  useEffect(() => {
    let active = true;

    const checkAuth = async () => {
      try {
        const response = await authApi.get<AuthUser>("auth-check");

        if (active) setUser(response.data);
      } catch (error) {
        if (!active) return;

        if (axios.isAxiosError(error) && error.response?.status === 401) {
          clearUser();
        } else {
          console.error("Auth check failed:", error);
          // Keep the session status unresolved on unexpected errors.
          // A production app should expose an error/retry state.
        }
      }
    };

    void checkAuth();

    return () => {
      active = false;
    };
  }, [setUser, clearUser]);

  return null;
}
