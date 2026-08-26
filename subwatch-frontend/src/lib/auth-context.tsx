import { createContext, useContext, useState, type ReactNode } from "react";

type AuthContextType = {
    isAuthenticated: boolean,
    login: (token: string) => void;
    logout: () => void;
}

type AuthProviderProps = {
    children: ReactNode
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function useAuth() {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error("Auth context undefined")
    }
    return context
}

export function AuthProvider({children}: AuthProviderProps) {
    const [isAuthenticated, setIsAuthenticated] = useState(() => localStorage.getItem("jwt_token") ? true : false)

    const login = (token: string) => {
        localStorage.setItem("jwt_token", token)
        setIsAuthenticated(true)
    } 
    const logout = () => {
        localStorage.removeItem("jwt_token")
        setIsAuthenticated(false)
    }

    const value = {
        isAuthenticated,
        login,
        logout,
    }

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    )
}