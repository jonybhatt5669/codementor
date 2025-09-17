import {create} from "zustand";
import {persist} from "zustand/middleware";

// @ts-expect-error: it should work
export enum UserRole {
    STUDENT = "STUDENT", MENTOR = "MENTOR", ADMIN = "ADMIN",
}

type User = {
    id: string; email: string; role: UserRole; onboard: boolean; firstName: string; avatar?: string
};

type AuthState = {
    user: User | null;
    accessToken: string | null;
    refreshToken: string | null;
    isAuthenticated: boolean;
    login: (accessToken: string, refreshToken: string) => void;
    logout: () => void;
    setUser: (user: User | null) => void;
    refreshTokenRefreshRequest: () => Promise<void>;
};

export const useAuthStore = create<AuthState>()(persist((set, get) => ({
        user: null, accessToken: null, refreshToken: null, isAuthenticated: false,

        login: (accessToken, refreshToken) => set(() => ({
            refreshToken: refreshToken, accessToken: accessToken, isAuthenticated: true,
        })),

        logout: () => {

            set(() => ({
                user: null, accessToken: null, refreshToken: null, isAuthenticated: false,
            }));


            localStorage.removeItem("auth-storage");
        },

        setUser: (user) => set((state) => ({
            ...state, user, isAuthenticated: !!user,
        })),

        refreshTokenRefreshRequest: async () => {
            const refreshToken = get().refreshToken;
            if (!refreshToken) return;

            try {
                const res = await fetch("http://localhost:8080/api/auth/refresh-token", {
                    method: "POST", headers: {
                        "Content-Type": "application/json",
                    }, body: JSON.stringify({refresh_token: refreshToken}),
                });

                if (!res.ok) throw new Error("Failed to refresh token");

                const data = await res.json();
                set(() => ({
                    accessToken: data.access_token, refreshToken: data.refresh_token, isAuthenticated: true,
                }));
            } catch (err) {
                console.error("Refresh failed", err);
                get().logout(); // auto-logout if refresh fails
            }
        },

    }),

    {
        name: "auth-storage", // storage key
        partialize: (state) => ({
            user: state.user,
            accessToken: state.accessToken,
            refreshToken: state.refreshToken,
            isAuthenticated: state.isAuthenticated,
        }),
    }));
