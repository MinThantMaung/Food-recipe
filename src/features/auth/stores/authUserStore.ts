
import { create } from "zustand";

export type AuthUser = {
  userId: number;
  username: string | null;
  image: string | null;
};

type AuthStatus = "loading" | "authenticated" | "guest";

type AuthState = {
  user: AuthUser | null;
  status: AuthStatus;
  setUser: (user: AuthUser) => void;
  clearUser: () => void;
  setLoading: () => void;
};

export const useAuthUserStore = create<AuthState>((set) => ({
  user: null,
  status: "loading",

  setUser: (user) =>
    set({ user, status: "authenticated" }),

  clearUser: () =>
    set({ user: null, status: "guest" }),

  setLoading: () =>
    set({ status: "loading" }),
}));
