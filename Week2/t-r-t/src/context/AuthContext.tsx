import React, { createContext, useContext, useState } from "react";

interface AuthContextType {
    isAuthenticated: boolean;
    accessToken?: string;
    refreshToken?: string;
    login: (accessToken: string, refreshToken: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [accessToken, setAccessToken] = useState<string | undefined>(() => localStorage.getItem("accessToken") || undefined);
    const [refreshToken, setRefreshToken] = useState<string | undefined>(() => localStorage.getItem("refreshToken") || undefined);
    const isAuthenticated = !!accessToken;

    const login = (accessToken: string, refreshToken: string) => {
        setAccessToken(accessToken);
        setRefreshToken(refreshToken);
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
    };

    const logout = () => {
        setAccessToken(undefined);
        setRefreshToken(undefined);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, accessToken, refreshToken, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used within AuthProvider");
    return ctx;
}
