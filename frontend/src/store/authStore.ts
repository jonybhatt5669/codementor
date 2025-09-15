import { create } from "zustand";
import { persist } from "zustand/middleware";

// @ts-expect-error: it should work
export enum UserRole {
    STUDENT = "STUDENT",
    MENTOR = "MENTOR",
    ADMIN = "ADMIN",
}

type User = {
    id: string;
    email: string;
    role:UserRole;
    onboard:boolean;
    firstName:string;
    avatar?:string
};

type AuthState = {
    user: User | null;
    accessToken: string | null;
    refreshToken: string | null;
    isAuthenticated: boolean;
    login: ( accessToken: string, refreshToken:string) => void;
    logout: () => void;
    setUser: (user: User | null) => void;
};

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            accessToken: null,
            refreshToken: null,
            isAuthenticated: false,

            login: ( accessToken, refreshToken) =>
                set(() => ({
                    refreshToken: refreshToken,
                    accessToken: accessToken,
                    isAuthenticated: true,
                })),

            logout: () =>
                set(() => ({
                    user: null,
                    accessToken: null,
                    isAuthenticated: false,
                })),

            setUser: (user) =>
                set((state) => ({
                    ...state,
                    user,
                    isAuthenticated: !!user,
                })),
        }),
        {
            name: "auth-storage", // storage key
            partialize: (state) => ({
                user: state.user,
                accessToken: state.accessToken,
                refreshToken:state.refreshToken,
                isAuthenticated: state.isAuthenticated,
            }),
        }
    )
);
